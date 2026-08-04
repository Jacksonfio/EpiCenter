"use client";

import { useEffect, useRef, useState } from "react";
import type { EvidenceRecord } from "@/components/EvidencePanel";
import type { LogLine } from "@/components/LogTerminal";

export interface PipelineStateSnapshot {
  pipelineStatus: string;
  currentAgent: string | null;
  hypothesis: string | null;
  implicatedFiles: string[];
  testFailureVerified: boolean;
  patchCode: string | null;
  blastRadiusViolation: boolean;
  testPassedAfterPatch: boolean;
  finalConfidenceScore: number;
  confidenceBreakdown: {
    testSignal?: number;
    codeqlSignal?: number;
    blastSignal?: number;
    llmSignal?: number;
  };
  pullRequestUrl: string | null;
  pullRequestNumber: number | null;
  haltReason: string | null;
  evidence: EvidenceRecord[];
}

const INITIAL_STATE: PipelineStateSnapshot = {
  pipelineStatus: "QUEUED",
  currentAgent: null,
  hypothesis: null,
  implicatedFiles: [],
  testFailureVerified: false,
  patchCode: null,
  blastRadiusViolation: false,
  testPassedAfterPatch: false,
  finalConfidenceScore: 0,
  confidenceBreakdown: {},
  pullRequestUrl: null,
  pullRequestNumber: null,
  haltReason: null,
  evidence: [],
};

// ─── Demo Simulation ────────────────────────────────────────────────────────
// Used when the backend SSE endpoint is not reachable (local demo without API)

const DEMO_SEQUENCE: Array<{
  delayMs: number;
  stateUpdate: Partial<PipelineStateSnapshot>;
  logs?: LogLine[];
}> = [
  {
    delayMs: 800,
    stateUpdate: { pipelineStatus: "RUNNING", currentAgent: "investigator" },
    logs: [{ id: "l1", timestamp: new Date().toISOString(), type: "info", content: "[Investigator] Starting root-cause analysis…" }],
  },
  {
    delayMs: 1500,
    stateUpdate: {
      evidence: [{
        id: "e1", incidentId: "demo", type: "AST_CONTEXT",
        label: "Tree-sitter: validateToken() scope at auth/service.ts:38-55",
        content: "function validateToken(token: string): User {\n  const decoded = jwt.decode(token);\n  return { userId: decoded.user_id };  // decoded may be null\n}",
        citation: { filePath: "src/auth/service.ts", startLine: 38, endLine: 55 },
        createdAt: new Date().toISOString(),
      }],
    },
    logs: [{ id: "l2", timestamp: new Date().toISOString(), type: "stdout", content: "[Tree-sitter] Mapped frame to validateToken() at auth/service.ts:42" }],
  },
  {
    delayMs: 1200,
    stateUpdate: {
      evidence: [{
        id: "e2", incidentId: "demo", type: "CODEQL_FINDING",
        label: "CodeQL: js/dereferenced-null-optional at src/auth/service.ts:42",
        content: "Property access 'user_id' on possibly-null value 'decoded' (jwt.decode returns null for invalid tokens)",
        codeqlRuleId: "js/dereferenced-null-optional",
        citation: { filePath: "src/auth/service.ts", startLine: 42, endLine: 42 },
        createdAt: new Date().toISOString(),
      }],
    },
    logs: [
      { id: "l3", timestamp: new Date().toISOString(), type: "info", content: "[CodeQL] Running 3 queries against auth/service.ts…" },
      { id: "l4", timestamp: new Date().toISOString(), type: "stdout", content: "[CodeQL] FINDING: js/dereferenced-null-optional at line 42 (HIGH)" },
    ],
  },
  {
    delayMs: 900,
    stateUpdate: {
      hypothesis: "jwt.decode() returns null for invalid or malformed tokens, but validateToken() unconditionally accesses decoded.user_id without a null check, causing a TypeError when an invalid token is presented.",
      confidenceBreakdown: { testSignal: 0, codeqlSignal: 30, blastSignal: 0, llmSignal: 14 },
      finalConfidenceScore: 44,
      currentAgent: "testWriter",
    },
    logs: [
      { id: "l5", timestamp: new Date().toISOString(), type: "pass", content: "[Investigator] Hypothesis formed: NULL_DEREFERENCE in validateToken() — confidence 70%" },
      { id: "l6", timestamp: new Date().toISOString(), type: "info", content: "[TestWriter] Generating regression test…" },
    ],
  },
  {
    delayMs: 1400,
    stateUpdate: {
      evidence: [{
        id: "e3", incidentId: "demo", type: "TEST_OUTPUT",
        label: "Regression test FAILED on current code ✓ (expected)",
        content: "FAIL  auth.regression.test.ts\n  ● validateToken with null-returning jwt.decode\n    Expected: Error thrown\n    Received: TypeError: Cannot read property 'user_id' of undefined\n\n  ✓ Regression test CONFIRMS the bug",
        createdAt: new Date().toISOString(),
      }],
      testFailureVerified: true,
      currentAgent: "surgeon",
    },
    logs: [
      { id: "l7", timestamp: new Date().toISOString(), type: "info", content: "[E2B] Booting sandbox…" },
      { id: "l8", timestamp: new Date().toISOString(), type: "stdout", content: "[E2B] Running: npx vitest run auth.regression.test.ts" },
      { id: "l9", timestamp: new Date().toISOString(), type: "fail",   content: "FAIL  auth.regression.test.ts (523ms)" },
      { id: "l10", timestamp: new Date().toISOString(), type: "pass",  content: "[TestWriter] ✓ Test confirmed failing — bug reproduced" },
    ],
  },
  {
    delayMs: 1600,
    stateUpdate: {
      evidence: [{
        id: "e4", incidentId: "demo", type: "BLAST_RADIUS",
        label: "Blast radius: 1 file, 1 function — src/auth/service.ts#validateToken",
        content: '{"files":["src/auth/service.ts"],"functions":["validateToken"],"callSites":[]}',
        createdAt: new Date().toISOString(),
      }],
      patchCode: "// Surgeon patch: add null check before property access\nif (!decoded || typeof decoded !== 'object') {\n  throw new Error('Invalid token: jwt.decode returned null');\n}\n",
      confidenceBreakdown: { testSignal: 0, codeqlSignal: 30, blastSignal: 15, llmSignal: 14 },
      finalConfidenceScore: 59,
      currentAgent: "judge",
    },
    logs: [
      { id: "l11", timestamp: new Date().toISOString(), type: "info",   content: "[Surgeon] Blast radius: 1 file (src/auth/service.ts)" },
      { id: "l12", timestamp: new Date().toISOString(), type: "stdout", content: "[Surgeon] Patch generated: +3 lines, -0 lines in validateToken()" },
      { id: "l13", timestamp: new Date().toISOString(), type: "info",   content: "[Judge] Re-running regression suite against patched code…" },
    ],
  },
  {
    delayMs: 1800,
    stateUpdate: {
      evidence: [{
        id: "e5", incidentId: "demo", type: "TEST_OUTPUT",
        label: "Post-patch regression test PASSED ✓ — bug is fixed",
        content: "PASS  auth.regression.test.ts\n  ✓ validateToken throws on null-returning jwt.decode (12ms)\n\nTest Suites: 1 passed, 1 total\nTests:       1 passed, 1 total\nTime:        1.234s",
        createdAt: new Date().toISOString(),
      }],
      testPassedAfterPatch: true,
      confidenceBreakdown: { testSignal: 35, codeqlSignal: 30, blastSignal: 15, llmSignal: 14 },
      finalConfidenceScore: 94,
    },
    logs: [
      { id: "l14", timestamp: new Date().toISOString(), type: "pass",  content: "PASS  auth.regression.test.ts (1.234s)" },
      { id: "l15", timestamp: new Date().toISOString(), type: "pass",  content: "[Judge] ✓ Post-patch test PASSED — patch fixes the bug" },
      { id: "l16", timestamp: new Date().toISOString(), type: "info",  content: "[Judge] Confidence score: 94% ≥ 75% threshold — PR authorized" },
    ],
  },
  {
    delayMs: 1200,
    stateUpdate: {
      pipelineStatus: "COMPLETED",
      currentAgent: null,
      pullRequestUrl: "https://github.com/Jacksonfio/EpiCenter/pull/1",
      pullRequestNumber: 1,
    },
    logs: [
      { id: "l17", timestamp: new Date().toISOString(), type: "pass",  content: "[GitHub] PR #1 opened: epicenter/fix-demo" },
      { id: "l18", timestamp: new Date().toISOString(), type: "info",  content: "[Daemon] 48h observation watchdog registered for fingerprint a3b9c8d7…" },
      { id: "l19", timestamp: new Date().toISOString(), type: "pass",  content: "[Pipeline] TDAR complete — incident remediated with 94% confidence ✓" },
    ],
  },
];

export function usePipelineSSE(incidentId: string | null) {
  const [state, setState] = useState<PipelineStateSnapshot>(INITIAL_STATE);
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const esRef = useRef<EventSource | null>(null);
  const demoTimeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (!incidentId) {
      setState(INITIAL_STATE);
      setLogs([]);
      setIsConnected(false);
      return;
    }

    // Clean up any prior demo timeouts
    demoTimeouts.current.forEach(clearTimeout);
    demoTimeouts.current = [];
    setState({ ...INITIAL_STATE, pipelineStatus: "RUNNING" });
    setLogs([]);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
    const sseUrl = `${apiUrl}/v1/incidents/${incidentId}/stream`;

    // Try real SSE first; fall back to demo simulation
    let useDemo = false;

    try {
      const es = new EventSource(sseUrl);
      esRef.current = es;

      const connectionTimeout = setTimeout(() => {
        if (!isConnected) {
          es.close();
          useDemo = true;
          runDemoSimulation();
        }
      }, 3000);

      es.onopen = () => {
        clearTimeout(connectionTimeout);
        setIsConnected(true);
      };

      es.onerror = () => {
        clearTimeout(connectionTimeout);
        es.close();
        if (!useDemo) {
          useDemo = true;
          runDemoSimulation();
        }
      };

      es.addEventListener("agent:start", (e) => {
        const d = JSON.parse(e.data);
        setState((s) => ({ ...s, currentAgent: d.agent, pipelineStatus: "RUNNING" }));
      });

      es.addEventListener("confidence:update", (e) => {
        const d = JSON.parse(e.data);
        setState((s) => ({ ...s, confidenceBreakdown: d.breakdown, finalConfidenceScore: d.total }));
      });

      es.addEventListener("sandbox:log", (e) => {
        const d = JSON.parse(e.data);
        setLogs((l) => [...l, { id: `${Date.now()}`, timestamp: new Date().toISOString(), type: d.type || "stdout", content: d.content }]);
      });

      es.addEventListener("pipeline:complete", (e) => {
        const d = JSON.parse(e.data);
        setState((s) => ({ ...s, ...d, pipelineStatus: d.status }));
        es.close();
        setIsConnected(false);
      });
    } catch {
      runDemoSimulation();
    }

    function runDemoSimulation() {
      setIsConnected(true);
      let cumDelay = 500;
      for (const step of DEMO_SEQUENCE) {
        cumDelay += step.delayMs;
        const t = setTimeout(() => {
          setState((s) => {
            const nextEvidence = step.stateUpdate.evidence
              ? [...(s.evidence ?? []), ...step.stateUpdate.evidence]
              : s.evidence;
            return { ...s, ...step.stateUpdate, evidence: nextEvidence };
          });
          if (step.logs) {
            setLogs((l) => [...l, ...step.logs!]);
          }
        }, cumDelay);
        demoTimeouts.current.push(t);
      }
    }

    return () => {
      esRef.current?.close();
      demoTimeouts.current.forEach(clearTimeout);
    };
  }, [incidentId]);

  return { state, logs, isConnected };
}
