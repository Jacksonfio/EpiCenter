"use client";

import { useEffect, useRef } from "react";
import { Terminal } from "lucide-react";

export interface LogLine {
  id: string;
  timestamp: string;
  type: "stdout" | "stderr" | "info" | "pass" | "fail";
  content: string;
}

interface LogTerminalProps {
  logs: LogLine[];
}

export function LogTerminal({ logs }: LogTerminalProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new logs
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs.length]);

  const typeClass: Record<LogLine["type"], string> = {
    stdout: "terminal-line-stdout",
    stderr: "terminal-line-stderr",
    info:   "terminal-line-info",
    pass:   "terminal-line-pass",
    fail:   "terminal-line-fail",
  };

  const typePrefix: Record<LogLine["type"], string> = {
    stdout: "",
    stderr: "[ERR] ",
    info:   "[INF] ",
    pass:   "[✓]   ",
    fail:   "[✗]   ",
  };

  return (
    <div className="glass rounded-2xl border border-white/8 overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          {/* macOS-style dots */}
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-sm font-medium text-white">E2B Sandbox Stream</span>
          </div>
        </div>
        <span className="text-xs font-mono text-muted-foreground">
          {logs.length} line{logs.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Terminal body */}
      <div className="terminal flex-1 p-4 overflow-auto max-h-80">
        {logs.length === 0 ? (
          <div className="flex items-center gap-2 text-muted-foreground/40">
            <span className="text-green-400">❯</span>
            <span className="animate-pulse">Waiting for sandbox execution…</span>
          </div>
        ) : (
          <>
            {logs.map((line) => (
              <div key={line.id} className={`flex gap-3 mb-0.5 ${typeClass[line.type]}`}>
                <span className="text-muted-foreground/40 flex-shrink-0 select-none">
                  {line.timestamp.slice(11, 19)}
                </span>
                <span className="flex-shrink-0 text-muted-foreground/60 select-none">
                  {typePrefix[line.type]}
                </span>
                <span className="break-all">{line.content}</span>
              </div>
            ))}
            {/* Blinking cursor */}
            <div className="flex items-center gap-2 mt-1 text-muted-foreground/30">
              <span className="text-green-400">❯</span>
              <span className="w-2 h-4 bg-green-400/60 animate-pulse inline-block" />
            </div>
          </>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
