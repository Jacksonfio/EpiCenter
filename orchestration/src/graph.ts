import { Annotation, StateGraph, START, END } from "@langchain/langgraph";
import { investigatorAgent } from "./agents/investigator.js";
import { testWriterAgent } from "./agents/testWriter.js";
import { surgeonAgent } from "./agents/surgeon.js";
import { judgeAgent } from "./agents/judge.js";
import type { EvidenceRecord } from "./state/types.js";

// ─── LangGraph State Schema ───────────────────────────────────────────────────

export const PipelineState = Annotation.Root({
  // Input
  incidentId: Annotation<string>(),
  projectId: Annotation<string>(),
  repository: Annotation<string>(),
  branch: Annotation<string>(),
  errorMessage: Annotation<string>(),
  stackTrace: Annotation<string>(),
  contextLogs: Annotation<string[]>(),

  // Investigator outputs
  hypothesis: Annotation<string | null>({ default: () => null }),
  implicatedFiles: Annotation<string[]>({ default: () => [] }),
  implicatedFunctions: Annotation<string[]>({ default: () => [] }),
  astContext: Annotation<string | null>({ default: () => null }),
  codeqlFindings: Annotation<string[]>({ default: () => [] }),
  qdrantHits: Annotation<string[]>({ default: () => [] }),
  investigatorConfidence: Annotation<number>({ default: () => 0 }),

  // Test Writer outputs
  regressionTestCode: Annotation<string | null>({ default: () => null }),
  regressionTestPath: Annotation<string | null>({ default: () => null }),
  testFailureVerified: Annotation<boolean>({ default: () => false }),
  sandboxTestRunId: Annotation<string | null>({ default: () => null }),

  // Surgeon outputs
  patchCode: Annotation<string | null>({ default: () => null }),
  patchedFiles: Annotation<string[]>({ default: () => [] }),
  blastRadiusFiles: Annotation<string[]>({ default: () => [] }),
  blastRadiusViolation: Annotation<boolean>({ default: () => false }),

  // Judge outputs
  testPassedAfterPatch: Annotation<boolean>({ default: () => false }),
  finalConfidenceScore: Annotation<number>({ default: () => 0 }),
  confidenceBreakdown: Annotation<Record<string, number>>({ default: () => ({}) }),
  pullRequestUrl: Annotation<string | null>({ default: () => null }),
  pullRequestNumber: Annotation<number | null>({ default: () => null }),

  // Pipeline control
  pipelineStatus: Annotation<string>({ default: () => "RUNNING" }),
  haltReason: Annotation<string | null>({ default: () => null }),
  evidence: Annotation<EvidenceRecord[]>({
    default: () => [],
    reducer: (a, b) => [...a, ...b],
  }),
  errors: Annotation<string[]>({
    default: () => [],
    reducer: (a, b) => [...a, ...b],
  }),
});

export type PipelineStateType = typeof PipelineState.State;

// ─── Routing Logic ────────────────────────────────────────────────────────────

/**
 * After the Test Writer, decide whether to proceed to Surgeon or halt.
 * The pipeline halts if the regression test could not be verified as failing.
 */
function routeAfterTestWriter(state: PipelineStateType): string {
  if (!state.testFailureVerified) {
    return "halt";
  }
  return "surgeon";
}

/**
 * After the Surgeon, decide whether to proceed to Judge or halt.
 * The pipeline halts if the patch violates the computed blast radius.
 */
function routeAfterSurgeon(state: PipelineStateType): string {
  if (state.blastRadiusViolation || !state.patchCode) {
    return "halt";
  }
  return "judge";
}

/**
 * A terminal halt node that marks the run for manual review.
 */
async function haltNode(state: PipelineStateType): Promise<Partial<PipelineStateType>> {
  return {
    pipelineStatus: "HALTED_FOR_REVIEW",
  };
}

// ─── Build LangGraph State Machine ───────────────────────────────────────────

export function buildEpiCenterGraph() {
  const graph = new StateGraph(PipelineState)
    .addNode("investigator", investigatorAgent)
    .addNode("testWriter", testWriterAgent)
    .addNode("surgeon", surgeonAgent)
    .addNode("judge", judgeAgent)
    .addNode("halt", haltNode)
    // Edges
    .addEdge(START, "investigator")
    .addEdge("investigator", "testWriter")
    .addConditionalEdges("testWriter", routeAfterTestWriter, {
      surgeon: "surgeon",
      halt: "halt",
    })
    .addConditionalEdges("surgeon", routeAfterSurgeon, {
      judge: "judge",
      halt: "halt",
    })
    .addEdge("judge", END)
    .addEdge("halt", END);

  return graph.compile();
}
