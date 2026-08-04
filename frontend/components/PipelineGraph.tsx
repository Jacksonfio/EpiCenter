"use client";

import { useCallback, useMemo } from "react";
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import { Search, TestTube, Syringe, Gavel, CheckCircle2, XCircle, Loader2, Circle } from "lucide-react";
import type { PipelineStateSnapshot } from "@/hooks/usePipelineSSE";

const AGENT_CONFIGS = [
  {
    id: "investigator",
    label: "Investigator",
    sublabel: "AST · CodeQL · Qdrant",
    icon: Search,
    color: "#818cf8",
    position: { x: 60, y: 200 },
  },
  {
    id: "testWriter",
    label: "Test Writer",
    sublabel: "Regression test → sandbox",
    icon: TestTube,
    color: "#fb923c",
    position: { x: 320, y: 200 },
  },
  {
    id: "surgeon",
    label: "Surgeon",
    sublabel: "Blast radius · minimal patch",
    icon: Syringe,
    color: "#34d399",
    position: { x: 580, y: 200 },
  },
  {
    id: "judge",
    label: "Judge",
    sublabel: "Score ≥75% · open PR",
    icon: Gavel,
    color: "#f472b6",
    position: { x: 840, y: 200 },
  },
];

function getNodeStatus(
  agentId: string,
  pipelineState: PipelineStateSnapshot
): "idle" | "running" | "done" | "halted" | "error" {
  const status = pipelineState.pipelineStatus;
  const order = ["investigator", "testWriter", "surgeon", "judge"];
  const idx = order.indexOf(agentId);
  const currentIdx = order.indexOf(pipelineState.currentAgent ?? "");

  if (status === "COMPLETED" || (status !== "RUNNING" && currentIdx > idx)) return "done";
  if (pipelineState.currentAgent === agentId && status === "RUNNING") return "running";
  if (idx < currentIdx) return "done";
  if (status === "HALTED_FOR_REVIEW" && pipelineState.currentAgent === agentId) return "halted";
  if (status === "ERROR" && pipelineState.currentAgent === agentId) return "error";
  return "idle";
}

function AgentNode({ data }: { data: typeof AGENT_CONFIGS[0] & { status: string } }) {
  const { label, sublabel, icon: Icon, color, status } = data;

  const statusIcon = {
    idle:    <Circle className="w-3.5 h-3.5 text-muted-foreground/40" />,
    running: <Loader2 className="w-3.5 h-3.5 animate-spin" style={{ color }} />,
    done:    <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />,
    halted:  <XCircle className="w-3.5 h-3.5 text-yellow-400" />,
    error:   <XCircle className="w-3.5 h-3.5 text-red-400" />,
  }[status] ?? null;

  return (
    <div
      className={`w-52 rounded-xl glass border-2 p-4 transition-all duration-500 ${status === "running" ? "scale-105" : ""}`}
      style={{
        borderColor: status === "idle" ? "rgba(255,255,255,0.08)" : color,
        boxShadow: status === "running" ? `0 0 24px ${color}50` : status === "done" ? `0 0 12px ${color}25` : "none",
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ background: `${color}20`, border: `1px solid ${color}40` }}
        >
          <Icon className="w-4.5 h-4.5" style={{ color }} />
        </div>
        {statusIcon}
      </div>
      <div className="text-sm font-semibold text-white">{label}</div>
      <div className="text-xs text-muted-foreground mt-0.5">{sublabel}</div>
    </div>
  );
}

const nodeTypes = { agentNode: AgentNode };

interface PipelineGraphProps {
  pipelineState: PipelineStateSnapshot;
}

export function PipelineGraph({ pipelineState }: PipelineGraphProps) {
  const nodes: Node[] = useMemo(
    () =>
      AGENT_CONFIGS.map((cfg) => ({
        id: cfg.id,
        type: "agentNode",
        position: cfg.position,
        data: { ...cfg, status: getNodeStatus(cfg.id, pipelineState) },
        draggable: false,
      })),
    [pipelineState]
  );

  const edges: Edge[] = useMemo(
    () => [
      {
        id: "inv-tw",
        source: "investigator",
        target: "testWriter",
        animated: pipelineState.currentAgent === "testWriter",
        markerEnd: { type: MarkerType.ArrowClosed, color: "#ffffff30" },
        style: { stroke: pipelineState.currentAgent === "testWriter" ? "#4ade80" : "#ffffff20" },
      },
      {
        id: "tw-surg",
        source: "testWriter",
        target: "surgeon",
        animated: pipelineState.currentAgent === "surgeon",
        markerEnd: { type: MarkerType.ArrowClosed, color: "#ffffff30" },
        style: { stroke: pipelineState.currentAgent === "surgeon" ? "#4ade80" : "#ffffff20" },
      },
      {
        id: "surg-judge",
        source: "surgeon",
        target: "judge",
        animated: pipelineState.currentAgent === "judge",
        markerEnd: { type: MarkerType.ArrowClosed, color: "#ffffff30" },
        style: { stroke: pipelineState.currentAgent === "judge" ? "#4ade80" : "#ffffff20" },
      },
    ],
    [pipelineState]
  );

  return (
    <div className="glass rounded-2xl border border-white/8 overflow-hidden">
      <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-white">Live Pipeline Graph</h2>
          <p className="text-xs text-muted-foreground mt-0.5">4-agent TDAR execution — LangGraph state machine</p>
        </div>
        <PipelineStatusBadge status={pipelineState.pipelineStatus} />
      </div>

      <div style={{ height: 380 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.3 }}
          proOptions={{ hideAttribution: true }}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
        >
          <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="rgba(255,255,255,0.04)" />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>

      {/* Halt reason banner */}
      {pipelineState.haltReason && (
        <div className="px-6 py-3 border-t border-yellow-500/20 bg-yellow-500/5 flex items-start gap-3">
          <XCircle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-yellow-300">
            <span className="font-semibold">Halted for review:</span> {pipelineState.haltReason}
          </div>
        </div>
      )}
    </div>
  );
}

function PipelineStatusBadge({ status }: { status: string }) {
  const map: Record<string, { cls: string; label: string }> = {
    QUEUED:            { cls: "badge-queued",   label: "Queued" },
    RUNNING:           { cls: "badge-running",  label: "Running" },
    COMPLETED:         { cls: "badge-completed", label: "Completed" },
    HALTED_FOR_REVIEW: { cls: "badge-halted",   label: "Halted for Review" },
    ERROR:             { cls: "badge-error",    label: "Error" },
  };
  const { cls, label } = map[status] ?? { cls: "badge-queued", label: status };
  return (
    <span className={`text-xs font-medium px-3 py-1.5 rounded-full border ${cls}`}>{label}</span>
  );
}
