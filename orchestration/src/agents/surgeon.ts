import { v4 as uuidv4 } from "uuid";
import type { PipelineStateType } from "../graph.js";
import type { EvidenceRecord } from "../state/types.js";
import { getLLM } from "../llm/provider.js";
import { computeBlastRadius } from "../tools/blastRadius.js";
import { langfuseTrace } from "../observability/langfuse.js";

const SURGEON_SYSTEM_PROMPT = `You are the Surgeon agent in EpiCenter's TDAR pipeline.

Your responsibility is to write the SMALLEST possible code patch that:
1. Makes the failing regression test pass
2. Does NOT modify any code outside the explicitly provided blast radius (implicated files and functions)
3. Does NOT change unrelated behavior or add new features
4. Follows the existing code style and conventions of the target files

You are a precise, minimalist patcher. You make surgical cuts only.

Respond with a JSON object:
{
  "patchedFiles": [
    {
      "path": "path/to/file.ts",
      "originalCode": "the exact code block being replaced",
      "patchedCode": "the corrected replacement code",
      "explanation": "why this specific change fixes the root cause"
    }
  ],
  "patchSummary": "one-paragraph summary of what was changed and why"
}`;

/**
 * Surgeon Agent — third node in the EpiCenter LangGraph pipeline.
 *
 * Responsibilities:
 * - Compute the blast radius (set of files/functions the patch may legally touch)
 * - Generate a minimal patch scoped strictly within the blast radius
 * - Detect and reject any patch that violates the computed blast radius bounds
 */
export async function surgeonAgent(
  state: PipelineStateType
): Promise<Partial<PipelineStateType>> {
  const evidence: EvidenceRecord[] = [];

  if (!state.regressionTestCode || !state.testFailureVerified) {
    return {
      pipelineStatus: "HALTED_FOR_REVIEW",
      haltReason: "Surgeon: no verified failing test received from Test Writer",
    };
  }

  try {
    await langfuseTrace("surgeon.start", {
      incidentId: state.incidentId,
      implicatedFiles: state.implicatedFiles,
    });

    // ── Step 1: Compute Blast Radius ──────────────────────────────────────
    const blastRadius = await computeBlastRadius({
      repository: state.repository,
      implicatedFiles: state.implicatedFiles,
      implicatedFunctions: state.implicatedFunctions,
    });

    evidence.push({
      id: uuidv4(),
      incidentId: state.incidentId,
      type: "BLAST_RADIUS",
      label: `Blast radius: ${blastRadius.files.length} files, ${blastRadius.functions.length} functions`,
      content: JSON.stringify(blastRadius, null, 2),
      createdAt: new Date().toISOString(),
    });

    // ── Step 2: Generate Minimal Patch via LLM ────────────────────────────
    const llm = getLLM();

    const response = await llm.invoke([
      { role: "system", content: SURGEON_SYSTEM_PROMPT },
      {
        role: "user",
        content: buildSurgeonPrompt(state, blastRadius),
      },
    ]);

    const rawContent =
      typeof response.content === "string"
        ? response.content
        : JSON.stringify(response.content);

    const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Surgeon LLM returned non-JSON response");
    }
    const parsed = JSON.parse(jsonMatch[0]);

    // ── Step 3: Blast Radius Violation Check ─────────────────────────────
    const patchedFilePaths: string[] = parsed.patchedFiles.map(
      (f: { path: string }) => f.path
    );

    const violations = patchedFilePaths.filter(
      (fp) => !blastRadius.files.includes(fp)
    );
    const blastRadiusViolation = violations.length > 0;

    if (blastRadiusViolation) {
      await langfuseTrace("surgeon.blastRadiusViolation", {
        incidentId: state.incidentId,
        violations,
        allowed: blastRadius.files,
      });
    }

    // Build unified patch string
    const patchCode = parsed.patchedFiles
      .map(
        (f: { path: string; patchedCode: string; explanation: string }) =>
          `# File: ${f.path}\n# Reason: ${f.explanation}\n\n${f.patchedCode}`
      )
      .join("\n\n---\n\n");

    evidence.push({
      id: uuidv4(),
      incidentId: state.incidentId,
      type: "PATCH_DIFF",
      label: `Surgeon patch: ${patchedFilePaths.join(", ")}`,
      content: patchCode,
      createdAt: new Date().toISOString(),
    });

    await langfuseTrace("surgeon.complete", {
      incidentId: state.incidentId,
      patchedFiles: patchedFilePaths,
      blastRadiusViolation,
    });

    return {
      patchCode,
      patchedFiles: patchedFilePaths,
      blastRadiusFiles: blastRadius.files,
      blastRadiusViolation,
      evidence,
      haltReason: blastRadiusViolation
        ? `Patch scope violation: edited files ${violations.join(", ")} are outside the computed blast radius`
        : null,
    };
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return {
      pipelineStatus: "ERROR",
      errors: [`Surgeon agent failed: ${errorMsg}`],
      evidence,
    };
  }
}

function buildSurgeonPrompt(
  state: PipelineStateType,
  blastRadius: { files: string[]; functions: string[] }
): string {
  return `
## Root-Cause Hypothesis
${state.hypothesis}

## Confirmed Failing Regression Test
**File:** ${state.regressionTestPath}
\`\`\`
${state.regressionTestCode}
\`\`\`

## BLAST RADIUS CONSTRAINT — You MAY ONLY edit these files:
${blastRadius.files.map((f) => `- ${f}`).join("\n")}

## BLAST RADIUS CONSTRAINT — You MAY ONLY edit these functions:
${blastRadius.functions.map((f) => `- ${f}`).join("\n")}

## CodeQL Corroboration
${state.codeqlFindings.join("\n") || "None available"}

Write the MINIMAL patch that makes the regression test pass without modifying anything outside the blast radius.
  `.trim();
}
