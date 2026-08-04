import { v4 as uuidv4 } from "uuid";
import type { PipelineStateType } from "../graph.js";
import type { EvidenceRecord } from "../state/types.js";
import { getLLM } from "../llm/provider.js";
import { runInSandbox } from "../tools/sandbox.js";
import { langfuseTrace } from "../observability/langfuse.js";

const TEST_WRITER_SYSTEM_PROMPT = `You are the Test Writer agent in EpiCenter's TDAR pipeline.

Your sole responsibility is to write a regression test that:
1. FAILS on the current (buggy) codebase
2. Precisely reproduces the reported production error
3. Is minimal — tests only the implicated function(s), not unrelated code
4. Follows the project's existing test framework conventions

You will receive:
- The root-cause hypothesis from the Investigator agent
- The implicated files and functions
- The original error message and stack trace

Respond with a JSON object:
{
  "testFilePath": "path/to/regression.test.ts",
  "testCode": "full test file content as a string",
  "testFramework": "jest | vitest | pytest | go-test | mocha",
  "runCommand": "command to execute the test",
  "expectedFailureReason": "why this test should fail on the current code"
}`;

/**
 * Test Writer Agent — second node in the EpiCenter LangGraph pipeline.
 *
 * Responsibilities:
 * - Generate a regression test that reproduces the confirmed bug
 * - Execute the test in an E2B sandbox to verify it FAILS on the current code
 * - Only emit a confirmed-failing test downstream to the Surgeon agent
 */
export async function testWriterAgent(
  state: PipelineStateType
): Promise<Partial<PipelineStateType>> {
  const evidence: EvidenceRecord[] = [];

  if (!state.hypothesis) {
    return {
      pipelineStatus: "HALTED_FOR_REVIEW",
      haltReason: "Test Writer: no hypothesis received from Investigator",
      errors: ["Investigator produced no hypothesis — cannot generate regression test"],
    };
  }

  try {
    await langfuseTrace("testWriter.start", {
      incidentId: state.incidentId,
      hypothesis: state.hypothesis,
    });

    const llm = getLLM();

    // ── Step 1: Generate Regression Test via LLM ──────────────────────────
    const response = await llm.invoke([
      { role: "system", content: TEST_WRITER_SYSTEM_PROMPT },
      {
        role: "user",
        content: buildTestWriterPrompt(state),
      },
    ]);

    const rawContent =
      typeof response.content === "string"
        ? response.content
        : JSON.stringify(response.content);

    const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Test Writer LLM returned non-JSON response");
    }
    const parsed = JSON.parse(jsonMatch[0]);

    const { testFilePath, testCode, runCommand, expectedFailureReason } = parsed;

    // ── Step 2: Execute Test in E2B Sandbox — Must FAIL ───────────────────
    const sandboxResult = await runInSandbox({
      incidentId: state.incidentId,
      files: [{ path: testFilePath, content: testCode }],
      command: runCommand,
      repository: state.repository,
      branch: state.branch,
      expectFailure: true, // We WANT this to fail
    });

    evidence.push({
      id: uuidv4(),
      incidentId: state.incidentId,
      type: "TEST_OUTPUT",
      label: `Regression test execution: exit code ${sandboxResult.exitCode}`,
      content: `STDOUT:\n${sandboxResult.stdout}\n\nSTDERR:\n${sandboxResult.stderr}`,
      citation: {
        filePath: testFilePath,
        startLine: 1,
        endLine: testCode.split("\n").length,
      },
      createdAt: new Date().toISOString(),
    });

    // The test MUST fail on the current code — if it passes, our hypothesis is wrong
    const testFailureVerified = sandboxResult.exitCode !== 0;

    if (!testFailureVerified) {
      await langfuseTrace("testWriter.haltUnexpectedPass", {
        incidentId: state.incidentId,
        reason: "Regression test passed unexpectedly — hypothesis may be incorrect",
      });
    }

    await langfuseTrace("testWriter.complete", {
      incidentId: state.incidentId,
      testFailureVerified,
      sandboxRunId: sandboxResult.runId,
    });

    return {
      regressionTestCode: testCode,
      regressionTestPath: testFilePath,
      testFailureVerified,
      sandboxTestRunId: sandboxResult.runId,
      evidence,
      haltReason: !testFailureVerified
        ? `Regression test passed unexpectedly. Expected failure: ${expectedFailureReason}`
        : null,
    };
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return {
      pipelineStatus: "ERROR",
      errors: [`Test Writer agent failed: ${errorMsg}`],
      evidence,
    };
  }
}

function buildTestWriterPrompt(state: PipelineStateType): string {
  return `
## Root-Cause Hypothesis (from Investigator Agent)
${state.hypothesis}

## Implicated Files
${state.implicatedFiles.join("\n") || "Unknown — infer from stack trace"}

## Implicated Functions
${state.implicatedFunctions.join("\n") || "Unknown — infer from stack trace"}

## Original Error Signal
**Error:** ${state.errorMessage}

**Stack Trace:**
\`\`\`
${state.stackTrace}
\`\`\`

## CodeQL Corroboration
${state.codeqlFindings.join("\n") || "None available"}

Write a minimal regression test that WILL FAIL on the current codebase.
  `.trim();
}
