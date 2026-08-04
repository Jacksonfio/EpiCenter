// ─── Shared Type Definitions ──────────────────────────────────────────────────

/** Categories of evidence that can be collected during a pipeline run. */
export type EvidenceType =
  | "AST_CONTEXT"
  | "CODEQL_FINDING"
  | "QDRANT_HIT"
  | "SANDBOX_LOG"
  | "TEST_OUTPUT"
  | "PATCH_DIFF"
  | "BLAST_RADIUS";

/** A single piece of evidence produced by any agent or tool during a pipeline run. */
export interface EvidenceRecord {
  id: string;
  incidentId: string;
  type: EvidenceType;
  /** Human-readable description of what this evidence represents. */
  label: string;
  /** The raw evidence content (AST snippet, CodeQL rule match, log line, etc.). */
  content: string;
  /** Optional citation: file path and line range in the target repository. */
  citation?: {
    filePath: string;
    startLine: number;
    endLine: number;
  };
  /** Optional CodeQL rule ID that produced this finding. */
  codeqlRuleId?: string;
  createdAt: string;
}

/** Hypothesis formed by the Investigator agent. */
export interface RootCauseHypothesis {
  summary: string;
  rootCauseType: string;
  implicatedFiles: string[];
  implicatedFunctions: string[];
  confidence: number;
  evidenceRefs: string[]; // evidence IDs
}

/** Result from E2B sandbox test execution. */
export interface SandboxExecutionResult {
  runId: string;
  exitCode: number;
  stdout: string;
  stderr: string;
  durationMs: number;
  passed: boolean;
}

/** Confidence score breakdown from the Judge agent. */
export interface ConfidenceBreakdown {
  testSignal: number;    // 0-35 (35% weight)
  codeqlSignal: number;  // 0-30 (30% weight)
  blastSignal: number;   // 0-15 (15% weight)
  llmSignal: number;     // 0-20 (20% weight)
  total: number;         // 0-100
}
