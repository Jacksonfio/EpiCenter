// ─── Blast Radius Analysis Tool ────────────────────────────────────────────────

export interface BlastRadiusOptions {
  repository: string;
  implicatedFiles: string[];
  implicatedFunctions: string[];
}

export interface BlastRadiusResult {
  files: string[];
  functions: string[];
  callSites: string[];
}

/**
 * Computes the set of files and functions the Surgeon may legally modify.
 * In production: uses the Tree-sitter AST call graph to expand from
 * directly-implicated symbols to their transitive callers/callees.
 */
export async function computeBlastRadius(
  options: BlastRadiusOptions
): Promise<BlastRadiusResult> {
  // For now: the blast radius is exactly the implicated files (no transitive expansion)
  // Production implementation: traverse Tree-sitter call graph ±1 hop
  return {
    files: options.implicatedFiles.length > 0
      ? options.implicatedFiles
      : ["src/auth/service.ts"],
    functions: options.implicatedFunctions.length > 0
      ? options.implicatedFunctions
      : ["validateToken"],
    callSites: [],
  };
}
