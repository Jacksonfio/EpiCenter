/**
 * Confidence Engine — computes EpiCenter's multi-signal confidence score.
 *
 * Formula:
 *   C = (testSignal × 35%) + (codeqlSignal × 30%) + (blastSignal × 15%) + (llmSignal × 20%)
 *
 * Signals:
 *   testSignal     (0-100): Did the regression test fail before patch AND pass after?
 *   codeqlSignal   (0-100): Did CodeQL independently corroborate the LLM's hypothesis?
 *   blastSignal    (0-100): Did the patch remain strictly within the computed blast radius?
 *   llmSignal      (0-100): Investigator agent's own self-reported confidence score
 */

export interface ConfidenceInput {
  /** Whether the regression test passed after applying the patch */
  testPassed: boolean;
  /** Whether CodeQL produced findings that match the LLM hypothesis */
  codeqlCorroborated: boolean;
  /** Whether the patch stayed within the computed blast radius */
  blastRadiusRespected: boolean;
  /** Investigator agent's self-reported confidence (0–100) */
  llmSelfConfidence: number;
}

export interface ConfidenceResult {
  testSignal: number;
  codeqlSignal: number;
  blastSignal: number;
  llmSignal: number;
  total: number;
}

const WEIGHTS = {
  test: 0.35,
  codeql: 0.30,
  blast: 0.15,
  llm: 0.20,
} as const;

/**
 * Computes the normalized confidence score for a given pipeline run.
 * Each signal is evaluated on a 0–100 scale and combined using the fixed weight table.
 */
export function computeConfidence(input: ConfidenceInput): ConfidenceResult {
  // Test signal: binary — the patch either makes the regression test pass (100) or it doesn't (0)
  const testSignal = input.testPassed ? 100 : 0;

  // CodeQL signal: binary — CodeQL either corroborated the hypothesis (100) or was absent/contradictory (30)
  // 30 (not 0) because absence of CodeQL findings is weaker evidence than active contradiction
  const codeqlSignal = input.codeqlCorroborated ? 100 : 30;

  // Blast radius signal: binary — patch is scoped (100) or violated boundaries (0)
  const blastSignal = input.blastRadiusRespected ? 100 : 0;

  // LLM signal: normalized from the Investigator's self-reported confidence (already 0–100)
  const llmSignal = Math.min(100, Math.max(0, input.llmSelfConfidence));

  // Weighted sum
  const total =
    testSignal * WEIGHTS.test +
    codeqlSignal * WEIGHTS.codeql +
    blastSignal * WEIGHTS.blast +
    llmSignal * WEIGHTS.llm;

  return {
    testSignal: Math.round(testSignal * WEIGHTS.test * 100) / 100,
    codeqlSignal: Math.round(codeqlSignal * WEIGHTS.codeql * 100) / 100,
    blastSignal: Math.round(blastSignal * WEIGHTS.blast * 100) / 100,
    llmSignal: Math.round(llmSignal * WEIGHTS.llm * 100) / 100,
    total: Math.round(total * 100) / 100,
  };
}
