"use client";

import { ArrowRight, Shield, GitPullRequest, Zap, Search, TestTube, Syringe, Gavel } from "lucide-react";

const AGENTS = [
  { icon: Search,    color: "#818cf8", label: "Investigator", desc: "AST + CodeQL + Qdrant RAG" },
  { icon: TestTube,  color: "#fb923c", label: "Test Writer",  desc: "Verified failing regression test" },
  { icon: Syringe,   color: "#34d399", label: "Surgeon",      desc: "Blast-radius-bounded minimal patch" },
  { icon: Gavel,     color: "#f472b6", label: "Judge",        desc: "Confidence gate → GitHub PR" },
];

const STATS = [
  { value: "≥75%", label: "Confidence threshold for PR" },
  { value: "4",    label: "Independent AI agents" },
  { value: "48h",  label: "Post-merge regression watch" },
  { value: "0",    label: "Auto-merges to main — ever" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 px-6">
      {/* Background glow orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-epicenter-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto text-center space-y-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-epicenter-500/20 text-sm">
          <Zap className="w-3.5 h-3.5 text-epicenter-400" />
          <span className="text-epicenter-400 font-medium">Test-Driven Autonomous Repair</span>
          <span className="text-muted-foreground">— TDAR + Evidence Layer</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight">
          <span className="text-white">Find the Fault.</span>
          <br />
          <span className="bg-gradient-to-r from-epicenter-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent glow-text">
            Prove the Fix.
          </span>
        </h1>

        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Paste a stack trace. EpiCenter diagnoses the root cause, writes a reproducing regression test,
          crafts a minimal patch, and opens a GitHub PR — every claim cited back to evidence.
        </p>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {STATS.map((s) => (
            <div key={s.label} className="glass rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Agent pipeline preview */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
          {AGENTS.map((agent, i) => (
            <div key={agent.label} className="flex items-center gap-2">
              <div
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl glass border transition-all hover:scale-105"
                style={{ borderColor: `${agent.color}40` }}
              >
                <agent.icon className="w-4 h-4" style={{ color: agent.color }} />
                <div className="text-left">
                  <div className="text-sm font-semibold text-white">{agent.label}</div>
                  <div className="text-[10px] text-muted-foreground">{agent.desc}</div>
                </div>
              </div>
              {i < AGENTS.length - 1 && (
                <ArrowRight className="w-4 h-4 text-muted-foreground hidden sm:block flex-shrink-0" />
              )}
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          {[
            { icon: Shield,        text: "No auto-merge. Ever." },
            { icon: TestTube,      text: "Sandbox-verified proof" },
            { icon: GitPullRequest, text: "Cited evidence in every PR" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon className="w-4 h-4 text-epicenter-400" />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
