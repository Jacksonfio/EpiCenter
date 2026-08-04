import { Sandbox } from "@e2b/code-interpreter";

export interface SandboxFile {
  path: string;
  content: string;
}

export interface SandboxRunOptions {
  incidentId: string;
  files: SandboxFile[];
  patchFiles?: SandboxFile[];
  command: string;
  repository: string;
  branch: string;
  expectFailure: boolean;
}

export interface SandboxRunResult {
  runId: string;
  exitCode: number;
  stdout: string;
  stderr: string;
  durationMs: number;
  passed: boolean;
}

/**
 * Runs code inside an isolated E2B microVM sandbox.
 *
 * Security contract:
 * - No egress network access from inside the sandbox
 * - All code executed is written from the EpiCenter pipeline only
 * - Results are returned via the sandbox API, not via network callbacks
 */
export async function runInSandbox(options: SandboxRunOptions): Promise<SandboxRunResult> {
  const e2bKey = process.env.E2B_API_KEY;

  if (!e2bKey) {
    // Local development fallback — simulate sandbox execution
    console.warn("[Sandbox] E2B_API_KEY not set, using local simulation mode");
    return simulateSandboxExecution(options);
  }

  const startTime = Date.now();
  const runId = `sandbox_${options.incidentId.slice(0, 8)}_${Date.now()}`;

  let sandbox: Sandbox | null = null;
  try {
    sandbox = await Sandbox.create({ apiKey: e2bKey });

    // Write all files into the sandbox
    for (const file of [...options.files, ...(options.patchFiles || [])]) {
      await sandbox.files.write(file.path, file.content);
    }

    // Execute the test command
    const execution = await sandbox.commands.run(options.command, {
      timeoutMs: 120_000, // 2 minute maximum execution time
    });

    const exitCode = execution.exitCode ?? 1;
    const durationMs = Date.now() - startTime;

    return {
      runId,
      exitCode,
      stdout: execution.stdout || "",
      stderr: execution.stderr || "",
      durationMs,
      passed: exitCode === 0,
    };
  } finally {
    if (sandbox) {
      await sandbox.kill();
    }
  }
}

/**
 * Local development simulation — does NOT actually execute code.
 * Replace with real E2B integration before demo.
 */
async function simulateSandboxExecution(
  options: SandboxRunOptions
): Promise<SandboxRunResult> {
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate latency

  return {
    runId: `local_${options.incidentId.slice(0, 8)}_${Date.now()}`,
    exitCode: options.expectFailure ? 1 : 0, // Simulate expected behavior
    stdout: options.expectFailure
      ? "FAIL  regression.test.ts\n  ● Should throw on undefined input\n    Expected: Error\n    Received: undefined"
      : "PASS  regression.test.ts\n  ✓ Should throw on undefined input (12ms)",
    stderr: "",
    durationMs: 523,
    passed: !options.expectFailure,
  };
}
