"use client";

import { useState } from "react";
import { FileCode, Search, FlaskConical, Database, Terminal, GitCompare, Maximize2, ChevronDown, ChevronUp } from "lucide-react";

export interface EvidenceRecord {
  id: string;
  type: string;
  label: string;
  content: string;
  citation?: { filePath: string; startLine: number; endLine: number };
  codeqlRuleId?: string;
  createdAt: string;
}

interface EvidencePanelProps {
  evidence: EvidenceRecord[];
}

const TYPE_CONFIG: Record<string, { icon: typeof FileCode; color: string; bg: string }> = {
  AST_CONTEXT:    { icon: FileCode,    color: "#818cf8", bg: "#818cf810" },
  CODEQL_FINDING: { icon: FlaskConical, color: "#60a5fa", bg: "#60a5fa10" },
  QDRANT_HIT:     { icon: Database,    color: "#34d399", bg: "#34d39910" },
  SANDBOX_LOG:    { icon: Terminal,    color: "#fb923c", bg: "#fb923c10" },
  TEST_OUTPUT:    { icon: Search,      color: "#f472b6", bg: "#f472b610" },
  PATCH_DIFF:     { icon: GitCompare,  color: "#22c55e", bg: "#22c55e10" },
  BLAST_RADIUS:   { icon: Maximize2,   color: "#f59e0b", bg: "#f59e0b10" },
};

function EvidenceCard({ record }: { record: EvidenceRecord }) {
  const [expanded, setExpanded] = useState(false);
  const cfg = TYPE_CONFIG[record.type] ?? TYPE_CONFIG.SANDBOX_LOG;
  const Icon = cfg.icon;
  const preview = record.content.slice(0, 120) + (record.content.length > 120 ? "…" : "");

  return (
    <div
      className="rounded-xl border transition-all duration-200 overflow-hidden"
      style={{ borderColor: `${cfg.color}25`, background: cfg.bg }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-start gap-3 p-4 text-left"
      >
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{ background: `${cfg.color}20`, border: `1px solid ${cfg.color}30` }}
        >
          <Icon className="w-3.5 h-3.5" style={{ color: cfg.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span
              className="text-[10px] font-mono font-semibold uppercase tracking-wider"
              style={{ color: cfg.color }}
            >
              {record.type.replace(/_/g, " ")}
            </span>
            <span className="text-[10px] text-muted-foreground flex-shrink-0">
              {new Date(record.createdAt).toLocaleTimeString()}
            </span>
          </div>
          <div className="text-xs text-white mt-0.5 font-medium">{record.label}</div>
          {!expanded && (
            <div className="text-xs text-muted-foreground mt-1 font-mono truncate">{preview}</div>
          )}
          {record.citation && (
            <div className="text-[10px] text-muted-foreground mt-1">
              📍 {record.citation.filePath}:{record.citation.startLine}–{record.citation.endLine}
            </div>
          )}
          {record.codeqlRuleId && (
            <div className="text-[10px] font-mono mt-0.5" style={{ color: cfg.color }}>
              Rule: {record.codeqlRuleId}
            </div>
          )}
        </div>
        <div className="flex-shrink-0 text-muted-foreground mt-1">
          {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4">
          <pre className="text-xs font-mono text-muted-foreground whitespace-pre-wrap break-all bg-black/30 rounded-lg p-3 max-h-48 overflow-auto">
            {record.content}
          </pre>
        </div>
      )}
    </div>
  );
}

export function EvidencePanel({ evidence }: EvidencePanelProps) {
  return (
    <div className="glass rounded-2xl border border-white/8 overflow-hidden h-full flex flex-col">
      <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between flex-shrink-0">
        <div>
          <h2 className="text-base font-semibold text-white">Evidence Chain</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Append-only audit trail — {evidence.length} record{evidence.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex gap-1.5">
          {["AST", "QL", "RAG", "LOG"].map((t) => (
            <span key={t} className="text-[10px] font-mono text-muted-foreground bg-white/5 rounded px-1.5 py-0.5">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-2">
        {evidence.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-center">
            <Database className="w-8 h-8 text-muted-foreground/30 mb-3" />
            <p className="text-sm text-muted-foreground">
              Evidence records will appear here as agents run.
            </p>
          </div>
        ) : (
          evidence.map((rec) => <EvidenceCard key={rec.id} record={rec} />)
        )}
      </div>
    </div>
  );
}
