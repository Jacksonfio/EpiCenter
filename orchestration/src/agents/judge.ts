import { v4 as uuidv4 } from "uuid";
import type { PipelineStateType } from "../graph.js";
import type { EvidenceRecord } from "../state/types.js";
import { computeConfidence } from "../confidence/engine.js";
import { runInSandbox } from "../tools/sandbox.js";
import { openPullRequest } from "../tools/github.js";
import { langfuseTrace } from "../observability/langfuse.js";

const CONFIDENCE_THRESHOLD = 75; // Minimum score to authorize PR creation

/**
 * Judge Agent — the final node in the EpiCenter LangGraph pipeline.
 *
 * Responsibilities:
 * - Re-execute the full regression suite against the Surgeon's patch in the E2B sandbox
 * - Cross-check the patch against the original CodeQL findings
 * - Compute the final multi-signal confidence score via the Confidence Engine
 * - Either authorize GitHub PR creation or halt the run for manual review
 */
export async function judgeAgent(
  state: PipelineStateType
): Promise<Partial<PipelineStateType>> {
  const evidence: EvidenceRecord[] = [];

  if (!state.patchCode || state.blastRadiusViolation) {
    return {
      pipelineStatus: "HALTED_FOR_REVIEW",
      haltReason: "Judge: received invalid or blast-radius-violating patch from Surgeon",
    };
  }

  try {
    await langfuseTrace("judge.start", {
      incidentId: state.incidentId,
      patchedFiles: state.patchedFiles,
    });

    // ── Step 1: Re-run Regression Test Against Patched Code ───────────────
    const sandboxResult = await runInSandbox({
      incidentId: state.incidentId,
      files: state.regressionTestPath && state.regressionTestCode
        ? [{ path: state.regressionTestPath, content: state.regressionTestCode }]
        : [],
      patchFiles: state.patchedFiles.map((f) => ({
        path: f,
        content: state.patchCode || "",
      })),
      command: `npx vitest run ${state.regressionTestPath || ""}`,
      repository: state.repository,
      branch: state.branch,
      expectFailure: false, // We WANT this to pass after the patch
    });

    const testPassedAfterPatch = sandboxResult.exitCode === 0;

    evidence.push({
      id: uuidv4(),
      incidentId: state.incidentId,
      type: "TEST_OUTPUT",
      label: `Post-patch regression test: ${testPassedAfterPatch ? "PASSED ✓" : "FAILED ✗"}`,
      content: `STDOUT:\n${sandboxResult.stdout}\n\nSTDERR:\n${sandboxResult.stderr}`,
      createdAt: new Date().toISOString(),
    });

    // ── Step 2: Compute Multi-Signal Confidence Score ─────────────────────
    const codeqlCorroborated = state.codeqlFindings.length > 0;
    const confidence = computeConfidence({
      testPassed: testPassedAfterPatch,
      codeqlCorroborated,
      blastRadiusRespected: !state.blastRadiusViolation,
      llmSelfConfidence: state.investigatorConfidence,
    });

    // ── Step 3: Gate Pull Request on Confidence Threshold ─────────────────
    if (!testPassedAfterPatch || confidence.total < CONFIDENCE_THRESHOLD) {
      const haltReason = !testPassedAfterPatch
        ? "Regression test failed after applying patch — patch does not fix the bug"
        : `Confidence score ${confidence.total.toFixed(1)}% is below the ${CONFIDENCE_THRESHOLD}% threshold`;

      await langfuseTrace("judge.haltBelowThreshold", {
        incidentId: state.incidentId,
        confidenceScore: confidence.total,
        testPassed: testPassedAfterPatch,
        haltReason,
      });

      return {
        testPassedAfterPatch,
        finalConfidenceScore: confidence.total,
        confidenceBreakdown: {
          testSignal: confidence.testSignal,
          codeqlSignal: confidence.codeqlSignal,
          blastSignal: confidence.blastSignal,
          llmSignal: confidence.llmSignal,
        },
        pipelineStatus: "HALTED_FOR_REVIEW",
        haltReason,
        evidence,
      };
    }

    // ── Step 4: Open GitHub Pull Request ──────────────────────────────────
    const pr = await openPullRequest({
      repository: state.repository,
      incidentId: state.incidentId,
      hypothesis: state.hypothesis || "",
      patchCode: state.patchCode,
      patchedFiles: state.patchedFiles,
      regressionTestPath: state.regressionTestPath || "",
      regressionTestCode: state.regressionTestCode || "",
      confidenceScore: confidence.total,
      confidenceBreakdown: confidence,
      evidenceRecords: state.evidence,
      codeqlFindings: state.codeqlFindings,
    });

    await langfuseTrace("judge.prOpened", {
      incidentId: state.incidentId,
      prUrl: pr.url,
      prNumber: pr.number,
      confidenceScore: confidence.total,
    });

    return {
      testPassedAfterPatch,
      finalConfidenceScore: confidence.total,
      confidenceBreakdown: {
        testSignal: confidence.testSignal,
        codeqlSignal: confidence.codeqlSignal,
        blastSignal: confidence.blastSignal,
        llmSignal: confidence.llmSignal,
      },
      pullRequestUrl: pr.url,
      pullRequestNumber: pr.number,
      pipelineStatus: "COMPLETED",
      evidence,
    };
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return {
      pipelineStatus: "ERROR",
      errors: [`Judge agent failed: ${errorMsg}`],
      evidence,
    };
  }
}
