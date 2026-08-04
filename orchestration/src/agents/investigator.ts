import { v4 as uuidv4 } from "uuid";
import type { PipelineStateType } from "../graph.js";
import type { EvidenceRecord } from "../state/types.js";
import { getLLM } from "../llm/provider.js";
import { runCodeQL } from "../tools/codeql.js";
import { searchQdrant } from "../tools/qdrant.js";
import { parseASTContext } from "../tools/treesitter.js";
import { langfuseTrace } from "../observability/langfuse.js";

const INVESTIGATOR_SYSTEM_PROMPT = `You are the Investigator agent in EpiCenter's TDAR (Test-Driven Autonomous Repair) pipeline.

Your job is to analyze a production incident and produce a precise, well-reasoned root-cause hypothesis.

Given a stack trace and error context, you must:
1. Identify the most likely root cause (null dereference, race condition, off-by-one, missing null check, resource leak, etc.)
2. Name the specific file(s) and function(s) implicated by the stack trace
3. Consider all available evidence: AST context, CodeQL findings, and similar historical fixes
4. Rate your confidence in the hypothesis from 0-100

Respond ONLY with a valid JSON object matching this schema:
{
  "hypothesis": "concise description of the root cause",
  "rootCauseType": "NULL_DEREFERENCE | RACE_CONDITION | OFF_BY_ONE | MISSING_NULL_CHECK | RESOURCE_LEAK | UNHANDLED_EXCEPTION | OTHER",
  "implicatedFiles": ["path/to/file.ts"],
  "implicatedFunctions": ["functionName"],
  "reasoning": "step-by-step reasoning that led to this hypothesis",
  "confidence": 75
}`;

/**
 * Investigator Agent — the first node in the EpiCenter LangGraph pipeline.
 *
 * Responsibilities:
 * - Map the raw stack trace to precise AST locations via Tree-sitter
 * - Query Qdrant for semantically similar historical incidents and fixes
 * - Run CodeQL to obtain a deterministic, non-LLM corroboration signal
 * - Synthesize all evidence into a structured root-cause hypothesis
 */
export async function investigatorAgent(
  state: PipelineStateType
): Promise<Partial<PipelineStateType>> {
  const traceId = uuidv4();
  const evidence: EvidenceRecord[] = [];

  try {
    await langfuseTrace("investigator.start", {
      incidentId: state.incidentId,
      repository: state.repository,
    });

    // ── Step 1: Parse AST Context via Tree-sitter ─────────────────────────
    let astContext = "";
    try {
      const astResult = await parseASTContext({
        repository: state.repository,
        stackTrace: state.stackTrace,
        errorMessage: state.errorMessage,
      });
      astContext = astResult.contextSummary;
      evidence.push({
        id: uuidv4(),
        incidentId: state.incidentId,
        type: "AST_CONTEXT",
        label: "Tree-sitter AST scope map for implicated functions",
        content: astContext,
        citation: astResult.primaryLocation
          ? {
              filePath: astResult.primaryLocation.file,
              startLine: astResult.primaryLocation.startLine,
              endLine: astResult.primaryLocation.endLine,
            }
          : undefined,
        createdAt: new Date().toISOString(),
      });
    } catch (err) {
      console.warn("[Investigator] AST parsing failed, continuing:", err);
    }

    // ── Step 2: Query Qdrant for Similar Historical Context ───────────────
    let qdrantHits: string[] = [];
    try {
      const qdrantResults = await searchQdrant({
        query: `${state.errorMessage}\n${state.stackTrace}`,
        collectionName: "epicenter-incidents",
        limit: 5,
      });
      qdrantHits = qdrantResults.map((r) => r.payload?.summary || r.id);
      if (qdrantResults.length > 0) {
        evidence.push({
          id: uuidv4(),
          incidentId: state.incidentId,
          type: "QDRANT_HIT",
          label: `Found ${qdrantResults.length} semantically similar past incidents`,
          content: JSON.stringify(qdrantResults.slice(0, 3), null, 2),
          createdAt: new Date().toISOString(),
        });
      }
    } catch (err) {
      console.warn("[Investigator] Qdrant search failed, continuing:", err);
    }

    // ── Step 3: Run CodeQL Static Analysis ───────────────────────────────
    let codeqlFindings: string[] = [];
    try {
      const codeqlResult = await runCodeQL({
        repository: state.repository,
        stackTrace: state.stackTrace,
        errorMessage: state.errorMessage,
      });
      codeqlFindings = codeqlResult.findings.map(
        (f) => `[${f.ruleId}] ${f.message} at ${f.location}`
      );
      for (const finding of codeqlResult.findings) {
        evidence.push({
          id: uuidv4(),
          incidentId: state.incidentId,
          type: "CODEQL_FINDING",
          label: `CodeQL rule ${finding.ruleId}: ${finding.message}`,
          content: finding.message,
          codeqlRuleId: finding.ruleId,
          citation: finding.location
            ? {
                filePath: finding.location.split(":")[0],
                startLine: parseInt(finding.location.split(":")[1] || "0"),
                endLine: parseInt(finding.location.split(":")[1] || "0"),
              }
            : undefined,
          createdAt: new Date().toISOString(),
        });
      }
    } catch (err) {
      console.warn("[Investigator] CodeQL analysis failed, continuing:", err);
    }

    // ── Step 4: LLM Hypothesis Synthesis ─────────────────────────────────
    const llm = getLLM();
    const userPrompt = buildInvestigatorPrompt({
      errorMessage: state.errorMessage,
      stackTrace: state.stackTrace,
      contextLogs: state.contextLogs,
      astContext,
      codeqlFindings,
      qdrantHits,
    });

    const response = await llm.invoke([
      { role: "system", content: INVESTIGATOR_SYSTEM_PROMPT },
      { role: "user", content: userPrompt },
    ]);

    const rawContent =
      typeof response.content === "string"
        ? response.content
        : JSON.stringify(response.content);

    // Parse JSON response from LLM
    const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Investigator LLM returned non-JSON response");
    }
    const parsed = JSON.parse(jsonMatch[0]);

    await langfuseTrace("investigator.complete", {
      incidentId: state.incidentId,
      hypothesis: parsed.hypothesis,
      confidence: parsed.confidence,
    });

    return {
      hypothesis: parsed.hypothesis,
      implicatedFiles: parsed.implicatedFiles || [],
      implicatedFunctions: parsed.implicatedFunctions || [],
      astContext,
      codeqlFindings,
      qdrantHits,
      investigatorConfidence: parsed.confidence || 50,
      evidence,
    };
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return {
      pipelineStatus: "ERROR",
      errors: [`Investigator agent failed: ${errorMsg}`],
      evidence,
    };
  }
}

function buildInvestigatorPrompt(ctx: {
  errorMessage: string;
  stackTrace: string;
  contextLogs: string[];
  astContext: string;
  codeqlFindings: string[];
  qdrantHits: string[];
}): string {
  return `
## Incident Signal
**Error Message:** ${ctx.errorMessage}

**Stack Trace:**
\`\`\`
${ctx.stackTrace}
\`\`\`

**Context Logs:**
${ctx.contextLogs.map((l) => `- ${l}`).join("\n") || "None provided"}

## Available Evidence

### Tree-sitter AST Context
${ctx.astContext || "AST parsing unavailable for this run"}

### CodeQL Static Analysis Findings
${ctx.codeqlFindings.length > 0 ? ctx.codeqlFindings.map((f) => `- ${f}`).join("\n") : "No CodeQL findings available"}

### Semantically Similar Historical Incidents (Qdrant RAG)
${ctx.qdrantHits.length > 0 ? ctx.qdrantHits.slice(0, 3).map((h) => `- ${h}`).join("\n") : "No similar incidents found"}

Analyze the above and produce your root-cause hypothesis as JSON.
  `.trim();
}
