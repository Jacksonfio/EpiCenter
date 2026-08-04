"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { IngestForm } from "@/components/IngestForm";
import { PipelineGraph } from "@/components/PipelineGraph";
import { ConfidencePanel } from "@/components/ConfidencePanel";
import { EvidencePanel } from "@/components/EvidencePanel";
import { LogTerminal } from "@/components/LogTerminal";
import { PRStatusCard } from "@/components/PRStatusCard";
import { usePipelineSSE } from "@/hooks/usePipelineSSE";

export default function HomePage() {
  const [activeIncidentId, setActiveIncidentId] = useState<string | null>(null);
  const [showDemo, setShowDemo] = useState(false);

  const { state, logs, isConnected } = usePipelineSSE(activeIncidentId);

  const handleIncidentSubmitted = (incidentId: string) => {
    setActiveIncidentId(incidentId);
    setShowDemo(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {!showDemo ? (
          <div className="flex flex-col">
            <HeroSection />
            <div className="max-w-3xl mx-auto w-full px-6 pb-24">
              <IngestForm onSubmitted={handleIncidentSubmitted} />
            </div>
          </div>
        ) : (
          <div className="max-w-[1600px] mx-auto px-6 py-8 space-y-6">
            {/* Top status bar */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Pipeline Run
                  <span className="ml-3 text-sm font-mono text-muted-foreground">
                    {activeIncidentId}
                  </span>
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  {isConnected ? (
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      Live · streaming pipeline events
                    </span>
                  ) : (
                    <span className="text-muted-foreground">Connecting…</span>
                  )}
                </p>
              </div>
              <button
                onClick={() => { setShowDemo(false); setActiveIncidentId(null); }}
                className="text-sm text-muted-foreground hover:text-white transition-colors border border-white/10 rounded-lg px-4 py-2 hover:border-white/20"
              >
                ← New Incident
              </button>
            </div>

            {/* Main grid */}
            <div className="grid grid-cols-12 gap-6">
              {/* Pipeline graph — spans 7 cols */}
              <div className="col-span-12 xl:col-span-7">
                <PipelineGraph pipelineState={state} />
              </div>

              {/* Confidence panel — spans 5 cols */}
              <div className="col-span-12 xl:col-span-5 space-y-6">
                <ConfidencePanel
                  breakdown={state.confidenceBreakdown}
                  total={state.finalConfidenceScore}
                  status={state.pipelineStatus}
                />
                {state.pullRequestUrl && (
                  <PRStatusCard
                    prUrl={state.pullRequestUrl}
                    prNumber={state.pullRequestNumber}
                    confidenceScore={state.finalConfidenceScore}
                  />
                )}
              </div>

              {/* Evidence panel — spans 6 cols */}
              <div className="col-span-12 xl:col-span-6">
                <EvidencePanel evidence={state.evidence ?? []} />
              </div>

              {/* Log terminal — spans 6 cols */}
              <div className="col-span-12 xl:col-span-6">
                <LogTerminal logs={logs} />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
