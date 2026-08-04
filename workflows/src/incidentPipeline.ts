import { task, retry } from "@trigger.dev/sdk/v3";
import { buildEpiCenterGraph } from "../../orchestration/src/graph.js";

export interface IncidentPipelinePayload {
  incidentId: string;
  projectId: string;
  repository: string;
  branch: string;
  errorMessage: string;
  stackTrace: string;
  contextLogs: string[];
  fingerprint: string;
}

/**
 * EpiCenter Incident Pipeline — durable Trigger.dev task.
 *
 * This task drives the full TDAR (Test-Driven Autonomous Repair) pipeline
 * from incident ingestion to GitHub Pull Request creation. Each step is
 * individually retryable, so transient LLM or sandbox timeouts do not
 * require restarting the entire run.
 */
export const incidentPipelineTask = task({
  id: "epicenter.incident-pipeline",
  maxDuration: 600, // 10 minutes max wall clock time

  retry: {
    maxAttempts: 3,
    factor: 2,
    minTimeoutInMs: 1000,
    maxTimeoutInMs: 30_000,
  },

  run: async (payload: IncidentPipelinePayload, { ctx }) => {
    const { incidentId } = payload;
    console.log(`[Pipeline] Starting TDAR pipeline for incident ${incidentId}`);

    // ── Build the LangGraph Agent Pipeline ──────────────────────────────
    const graph = buildEpiCenterGraph();

    // ── Execute the full agent pipeline ──────────────────────────────────
    const finalState = await graph.invoke({
      incidentId: payload.incidentId,
      projectId: payload.projectId,
      repository: payload.repository,
      branch: payload.branch || "main",
      errorMessage: payload.errorMessage,
      stackTrace: payload.stackTrace,
      contextLogs: payload.contextLogs || [],
    });

    const result = {
      incidentId,
      status: finalState.pipelineStatus,
      hypothesis: finalState.hypothesis,
      confidenceScore: finalState.finalConfidenceScore,
      confidenceBreakdown: finalState.confidenceBreakdown,
      pullRequestUrl: finalState.pullRequestUrl,
      pullRequestNumber: finalState.pullRequestNumber,
      haltReason: finalState.haltReason,
      evidenceCount: finalState.evidence?.length ?? 0,
      errors: finalState.errors,
    };

    console.log(`[Pipeline] Completed for incident ${incidentId}:`, result);
    return result;
  },
});
