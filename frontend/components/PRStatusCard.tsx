"use client";

import { GitPullRequest, ExternalLink, CheckCircle2, Clock, Shield } from "lucide-react";

interface PRStatusCardProps {
  prUrl: string | null;
  prNumber: number | null;
  confidenceScore: number;
}

export function PRStatusCard({ prUrl, prNumber, confidenceScore }: PRStatusCardProps) {
  if (!prUrl) return null;

  const scoreColor =
    confidenceScore >= 85 ? "#4ade80" :
    confidenceScore >= 75 ? "#fbbf24" : "#f87171";

  return (
    <div
      className="rounded-2xl border overflow-hidden animate-fade-up"
      style={{
        borderColor: `${scoreColor}30`,
        background: `linear-gradient(135deg, ${scoreColor}08, transparent)`,
      }}
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GitPullRequest className="w-4 h-4" style={{ color: scoreColor }} />
          <span className="text-sm font-semibold text-white">Pull Request Opened</span>
        </div>
        <CheckCircle2 className="w-4 h-4" style={{ color: scoreColor }} />
      </div>

      <div className="p-5 space-y-4">
        {/* PR link */}
        <a
          href={prUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/8 border border-white/10 hover:border-white/20 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: `${scoreColor}15`, border: `1px solid ${scoreColor}30` }}
            >
              <GitPullRequest className="w-4 h-4" style={{ color: scoreColor }} />
            </div>
            <div>
              <div className="text-sm font-medium text-white">
                {prNumber ? `PR #${prNumber}` : "View Pull Request"}
              </div>
              <div className="text-xs text-muted-foreground truncate max-w-48">
                {prUrl}
              </div>
            </div>
          </div>
          <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-white transition-colors" />
        </a>

        {/* Meta row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-2.5 rounded-xl bg-white/5">
            <div className="text-lg font-bold" style={{ color: scoreColor }}>
              {confidenceScore.toFixed(0)}%
            </div>
            <div className="text-[10px] text-muted-foreground">Confidence</div>
          </div>
          <div className="text-center p-2.5 rounded-xl bg-white/5">
            <div className="flex justify-center">
              <Clock className="w-5 h-5 text-blue-400 mt-0.5" />
            </div>
            <div className="text-[10px] text-muted-foreground mt-0.5">48h watch</div>
          </div>
          <div className="text-center p-2.5 rounded-xl bg-white/5">
            <div className="flex justify-center">
              <Shield className="w-5 h-5 text-purple-400 mt-0.5" />
            </div>
            <div className="text-[10px] text-muted-foreground mt-0.5">Scoped App</div>
          </div>
        </div>

        {/* Safety net message */}
        <div className="flex items-start gap-2 p-3 rounded-xl bg-blue-500/5 border border-blue-500/15">
          <Clock className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-blue-300">
            Observation Daemon is now watching this fix for 48 hours.
            If the same error fingerprint reappears, a Revert PR will be opened automatically.
          </p>
        </div>
      </div>
    </div>
  );
}
