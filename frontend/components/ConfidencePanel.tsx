"use client";

import { useMemo } from "react";
import { TestTube, FlaskConical, Ruler, Brain, TrendingUp } from "lucide-react";

interface ConfidenceBreakdown {
  testSignal?: number;
  codeqlSignal?: number;
  blastSignal?: number;
  llmSignal?: number;
}

interface ConfidencePanelProps {
  breakdown: ConfidenceBreakdown;
  total: number;
  status: string;
}

const SIGNALS = [
  {
    key: "testSignal" as const,
    label: "Regression Test",
    sublabel: "Sandbox verified",
    icon: TestTube,
    color: "#4ade80",
    maxRaw: 35,
    weight: "35%",
  },
  {
    key: "codeqlSignal" as const,
    label: "CodeQL Analysis",
    sublabel: "Deterministic corroboration",
    icon: FlaskConical,
    color: "#60a5fa",
    maxRaw: 30,
    weight: "30%",
  },
  {
    key: "blastSignal" as const,
    label: "Blast Radius",
    sublabel: "Patch within bounds",
    icon: Ruler,
    color: "#f59e0b",
    maxRaw: 15,
    weight: "15%",
  },
  {
    key: "llmSignal" as const,
    label: "Agent Assessment",
    sublabel: "LLM self-confidence",
    icon: Brain,
    color: "#c084fc",
    maxRaw: 20,
    weight: "20%",
  },
];

const THRESHOLD = 75;

export function ConfidencePanel({ breakdown, total, status }: ConfidencePanelProps) {
  const isCompleted = status === "COMPLETED";
  const isRunning = status === "RUNNING";
  const displayTotal = total ?? 0;

  // Ring circumference
  const R = 54;
  const C = 2 * Math.PI * R;
  const progress = (displayTotal / 100) * C;

  const ringColor = displayTotal >= THRESHOLD ? "#22c55e" : displayTotal >= 50 ? "#f59e0b" : "#ef4444";

  return (
    <div className="glass rounded-2xl border border-white/8 overflow-hidden">
      <div className="px-6 py-4 border-b border-white/5">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-epicenter-400" />
          <h2 className="text-base font-semibold text-white">Confidence Score</h2>
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">
          Multi-signal weighted formula · ≥75% required for PR
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Score ring */}
        <div className="flex items-center gap-6">
          <div className="relative flex-shrink-0">
            <svg width={128} height={128} viewBox="0 0 128 128">
              {/* Track */}
              <circle
                cx={64} cy={64} r={R}
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth={10}
              />
              {/* Progress */}
              <circle
                cx={64} cy={64} r={R}
                fill="none"
                stroke={ringColor}
                strokeWidth={10}
                strokeLinecap="round"
                strokeDasharray={`${progress} ${C}`}
                strokeDashoffset={C * 0.25}
                className="confidence-ring transition-all duration-700"
                style={{ filter: `drop-shadow(0 0 8px ${ringColor})` }}
              />
              {/* Threshold marker at 75% */}
              <circle
                cx={64 + R * Math.cos(2 * Math.PI * 0.75 - Math.PI / 2)}
                cy={64 + R * Math.sin(2 * Math.PI * 0.75 - Math.PI / 2)}
                r={3}
                fill="#ffffff60"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span
                className="text-2xl font-bold transition-all duration-700"
                style={{ color: ringColor }}
              >
                {isRunning && displayTotal === 0 ? "—" : `${displayTotal.toFixed(0)}%`}
              </span>
              <span className="text-[10px] text-muted-foreground">
                {displayTotal >= THRESHOLD ? "Above gate" : "Below gate"}
              </span>
            </div>
          </div>

          {/* Gate indicator */}
          <div className="flex-1 space-y-2">
            <div className="text-sm text-white font-medium">PR Gate Threshold</div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${Math.min(100, displayTotal)}%`,
                    background: `linear-gradient(90deg, ${ringColor}, ${ringColor}cc)`,
                  }}
                />
              </div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span className="text-white/50">75% threshold</span>
              <span>100%</span>
            </div>
            {isCompleted && displayTotal >= THRESHOLD && (
              <div className="flex items-center gap-2 text-xs text-green-400">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                Threshold cleared — PR authorized
              </div>
            )}
          </div>
        </div>

        {/* Signal breakdown */}
        <div className="space-y-3">
          <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
            Signal Breakdown
          </div>
          {SIGNALS.map((sig) => {
            const raw = breakdown?.[sig.key] ?? 0;
            const pct = (raw / sig.maxRaw) * 100;
            return (
              <div key={sig.key} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <sig.icon className="w-3.5 h-3.5" style={{ color: sig.color }} />
                    <span className="text-white">{sig.label}</span>
                    <span className="text-muted-foreground">{sig.sublabel}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">{sig.weight}</span>
                    <span className="font-mono font-semibold" style={{ color: sig.color }}>
                      {raw.toFixed(1)}
                    </span>
                  </div>
                </div>
                <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${pct}%`, background: sig.color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
