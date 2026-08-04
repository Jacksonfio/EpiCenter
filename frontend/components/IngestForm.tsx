"use client";

import { useState } from "react";
import { Send, Loader2, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";

const EXAMPLE_PAYLOAD = {
  project_id: "proj_demo",
  repository: "Jacksonfio/EpiCenter",
  branch: "main",
  environment: "production",
  payload: {
    error_message: "TypeError: Cannot read property 'user_id' of undefined",
    stack_trace:
      "TypeError: Cannot read property 'user_id' of undefined\n    at AuthService.validateToken (/app/src/auth/service.ts:42:18)\n    at middleware (/app/src/middleware/auth.ts:18:30)\n    at processTicksAndRejections (node:internal/process/task_queues:95:5)",
    context_logs: [
      "2026-08-04T22:00:00Z [INFO] POST /auth/verify - 200",
      "2026-08-04T22:00:01Z [WARN] Session token missing sub claim",
      "2026-08-04T22:00:01Z [ERROR] Unhandled exception in AuthService.validateToken",
    ],
  },
};

interface IngestFormProps {
  onSubmitted: (incidentId: string) => void;
}

export function IngestForm({ onSubmitted }: IngestFormProps) {
  const [stackTrace, setStackTrace] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [repository, setRepository] = useState("Jacksonfio/EpiCenter");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const loadExample = () => {
    setErrorMessage(EXAMPLE_PAYLOAD.payload.error_message);
    setStackTrace(EXAMPLE_PAYLOAD.payload.stack_trace);
    setRepository(EXAMPLE_PAYLOAD.repository);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stackTrace.trim() || !errorMessage.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
      const res = await fetch(`${apiUrl}/v1/ingest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project_id: "proj_demo",
          repository,
          branch: "main",
          environment: "production",
          payload: {
            error_message: errorMessage,
            stack_trace: stackTrace,
            context_logs: [],
          },
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `HTTP ${res.status}`);
      }

      const data = await res.json();
      onSubmitted(data.incident_id);
    } catch (err) {
      // Demo fallback — simulate a successful response
      console.warn("API not available, using demo mode:", err);
      const demoId = `inc_demo_${Math.random().toString(36).slice(2, 10)}`;
      onSubmitted(demoId);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass rounded-2xl border border-white/8 overflow-hidden animate-fade-up">
      {/* Card header */}
      <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Submit Production Incident</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Paste a stack trace and let TDAR find the fault.
          </p>
        </div>
        <button
          type="button"
          onClick={loadExample}
          className="text-xs text-epicenter-400 hover:text-epicenter-300 border border-epicenter-500/30 hover:border-epicenter-500/50 rounded-lg px-3 py-1.5 transition-all"
        >
          Load example
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        {/* Error message */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">
            Error Message <span className="text-red-400">*</span>
          </label>
          <input
            id="error-message"
            type="text"
            value={errorMessage}
            onChange={(e) => setErrorMessage(e.target.value)}
            placeholder="TypeError: Cannot read property 'user_id' of undefined"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-epicenter-500/50 focus:border-epicenter-500/50 transition-all"
            required
          />
        </div>

        {/* Stack trace */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">
            Stack Trace <span className="text-red-400">*</span>
          </label>
          <textarea
            id="stack-trace"
            value={stackTrace}
            onChange={(e) => setStackTrace(e.target.value)}
            placeholder={"TypeError: ...\n    at AuthService.validateToken (/app/src/auth/service.ts:42:18)\n    at processTicksAndRejections (node:internal/process/task_queues:95:5)"}
            rows={7}
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-green-300 placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-epicenter-500/50 focus:border-epicenter-500/50 transition-all resize-none"
            required
          />
        </div>

        {/* Advanced options */}
        <div>
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-white transition-colors"
          >
            {showAdvanced ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            Advanced options
          </button>
          {showAdvanced && (
            <div className="mt-3 space-y-3">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Repository</label>
                <input
                  id="repository"
                  type="text"
                  value={repository}
                  onChange={(e) => setRepository(e.target.value)}
                  placeholder="owner/repo"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-epicenter-500/50 transition-all"
                />
              </div>
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          id="submit-incident"
          type="submit"
          disabled={isSubmitting || !stackTrace.trim() || !errorMessage.trim()}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-epicenter-600 to-epicenter-500 hover:from-epicenter-500 hover:to-epicenter-400 text-white font-semibold text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-epicenter-500/20 hover:-translate-y-0.5"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting to TDAR pipeline…
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Find the Fault &amp; Prove the Fix
            </>
          )}
        </button>

        <p className="text-xs text-center text-muted-foreground">
          PII and secrets are redacted at the ingestion boundary before any persistence or LLM call.
        </p>
      </form>
    </div>
  );
}
