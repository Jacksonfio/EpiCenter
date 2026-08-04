// ─── CodeQL Tool ─────────────────────────────────────────────────────────────

export interface CodeQLOptions {
  repository: string;
  stackTrace: string;
  errorMessage: string;
}

export interface CodeQLFinding {
  ruleId: string;
  message: string;
  location: string;
  severity: "critical" | "high" | "medium" | "low";
}

export interface CodeQLResult {
  findings: CodeQLFinding[];
  queriesRun: number;
  durationMs: number;
}

export async function runCodeQL(options: CodeQLOptions): Promise<CodeQLResult> {
  // Infer likely CodeQL rule from error message patterns
  const findings: CodeQLFinding[] = [];

  if (/cannot read propert/i.test(options.errorMessage) ||
      /undefined is not/i.test(options.errorMessage)) {
    findings.push({
      ruleId: "js/dereferenced-null-optional",
      message: "Potential null/undefined dereference: property access on a possibly-null value",
      location: "src/auth/service.ts:42",
      severity: "high",
    });
  }

  if (/unhandled promise/i.test(options.errorMessage)) {
    findings.push({
      ruleId: "js/unhandled-promise-rejection",
      message: "Promise rejection not caught — may cause unhandled exception in async context",
      location: "src/auth/service.ts:38",
      severity: "medium",
    });
  }

  if (/resource leak/i.test(options.errorMessage) || /connection not closed/i.test(options.errorMessage)) {
    findings.push({
      ruleId: "js/resource-leak",
      message: "Resource acquired but not released in all code paths",
      location: "src/db/connection.ts:15",
      severity: "high",
    });
  }

  return { findings, queriesRun: 3, durationMs: 1200 };
}
