# EpiCenter: Find the Fault. Prove the Fix.

> **Test-Driven Autonomous Repair (TDAR) & Evidence-Backed Incident Remediation Platform**

![EpiCenter Architecture Banner](https://raw.githubusercontent.com/Jacksonfio/EpiCenter/main/docs/banner.png)

[![Go Version](https://img.shields.io/badge/Go-1.22+-00ADD8?style=flat-square&logo=go)](https://golang.org)
[![Node.js Version](https://img.shields.io/badge/Node.js-20+-339933?style=flat-square&logo=nodedotjs)](https://nodejs.org)
[![LangGraph](https://img.shields.io/badge/Orchestration-LangGraph-FF6F61?style=flat-square)](https://github.com/langchain-ai/langgraph)
[![Trigger.dev](https://img.shields.io/badge/Workflows-Trigger.dev_v3-000000?style=flat-square&logo=triggerdotdev)](https://trigger.dev)
[![E2B Sandbox](https://img.shields.io/badge/Sandbox-E2B_v1-5865F2?style=flat-square)](https://e2b.dev)
[![CodeQL Integration](https://img.shields.io/badge/Static_Analysis-CodeQL-2088FF?style=flat-square)](https://codeql.github.com)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

---

## 📋 Table of Contents

- [1. Executive Summary](#1-executive-summary)
- [2. Problem Statement & Research Gap](#2-problem-statement--research-gap)
- [3. Core Innovation: TDAR + Evidence Layer](#3-core-innovation-tdar--evidence-layer)
- [4. Complete System Architecture](#4-complete-system-architecture)
- [5. The 19-Layer Technology Stack](#5-the-19-layer-technology-stack)
- [6. AI Agent Pipeline (4-Agent Architecture)](#6-ai-agent-pipeline-4-agent-architecture)
- [7. Evidence Pipeline & Confidence Engine](#7-evidence-pipeline--confidence-engine)
- [8. Execution Environment & Sandboxing](#8-execution-environment--sandboxing)
- [9. Post-Merge Observation Daemon](#9-post-merge-observation-daemon)
- [10. Security & BYOK Architecture](#10-security--byok-architecture)
- [11. API Specifications](#11-api-specifications)
- [12. Project Structure](#12-project-structure)
- [13. Getting Started & Local Setup](#13-getting-started--local-setup)
- [14. Demo Flow](#14-demo-flow)
- [15. Production Vision & Roadmap](#15-production-vision--roadmap)
- [16. Comparison Matrix](#16-comparison-matrix)
- [17. License](#17-license)

---

## 1. Executive Summary

**EpiCenter** — *"Find the Fault. Prove the Fix."* — is an autonomous incident-to-patch platform that ingests production errors (stack traces, APM alerts, log excerpts), constructs a multi-source evidence chain around them, and produces a reviewable GitHub Pull Request containing:
1. A root-cause diagnosis backed by deterministic static analysis (CodeQL) and structural AST parsing (Tree-sitter).
2. A reproducing regression test executed in an isolated sandbox environment.
3. A minimal, blast-radius-scoped patch that fixes the bug without scope creep.
4. An auditable evidence chain with citations linked directly to exact code lines and commits.

EpiCenter's central thesis is that **an AI-generated patch is only trustworthy when it is accompanied by proof**: a failing test that reproduces the bug *before* the patch and passes *after* it, corroborated by non-LLM static analysis findings and transparent confidence scoring.

---

## 2. Problem Statement & Research Gap

### The Problem
When a production incident occurs, engineers spend up to 80% of their time finding the bug rather than fixing it:
- Correlating stack traces with recent commits.
- Reconstructing complex code execution paths across polyglot repositories.
- Proving to team reviewers that a proposed fix actually addresses the root cause rather than masking a symptom.

Existing AI pair programmers (GitHub Copilot, Cursor, generic LLM fixers) produce plausible-looking diffs quickly. However, **a plausible patch is not a proven patch**. Without automated regression testing and deterministic corroboration, reviewers must manually verify every AI suggestion, transferring the cognitive burden back to humans.

### Research Gap
Prior tools treat bug fixing as a single-shot text generation problem. EpiCenter fills this gap by treating remediation as an **evidence-gathering and adjudication problem**, combining:
1. **Multi-Agent Separation of Concerns**: An agent that generates a patch is never allowed to self-certify its correctness.
2. **Deterministic & LLM Fusion**: LLM hypotheses are independently validated against deterministic CodeQL query passes.
3. **Post-Merge Watchdog**: Active post-merge observation that automatically reverts regressions if the same error signature recurs within 48 hours.

---

## 3. Core Innovation: TDAR + Evidence Layer

### Test-Driven Autonomous Repair (TDAR)
No patch is ever proposed until a regression test exists that reproduces the error, and no patch is marked merge-ready until that same test passes against the updated code.

```
       [ Production Incident Ingested ]
                      │
                      ▼
       [ Investigator Agent Diagnoses ]
                      │
                      ▼
   ┌─────────────────────────────────────┐
   │ Test Writer Agent Creates Test     │
   └──────────────────┬──────────────────┘
                      │
                      ▼
   ┌─────────────────────────────────────┐
   │ E2B Sandbox: Verify Test FAILS     │ ◄── [Must fail on current codebase]
   └──────────────────┬──────────────────┘
                      │
                      ▼
   ┌─────────────────────────────────────┐
   │ Surgeon Agent Crafts Minimal Patch │
   └──────────────────┬──────────────────┘
                      │
                      ▼
   ┌─────────────────────────────────────┐
   │ E2B Sandbox: Verify Test PASSES    │ ◄── [Must pass on patched codebase]
   └──────────────────┬──────────────────┘
                      │
                      ▼
       [ Judge Agent Checks Confidence ]
                      │
                      ▼
   [ GitHub PR Created with Cited Proof ]
```

### The Evidence Layer
Persisted in PostgreSQL as append-only records, the Evidence Layer captures every artifact produced during a run:
- **AST Scope Maps** extracted by Tree-sitter.
- **CodeQL Rule Match** IDs corroborating the fault.
- **Qdrant Vector RAG Hits** from historical incident fixes.
- **Raw Sandbox Logs** & stdout/stderr execution captures.

---

## 4. Complete System Architecture

EpiCenter is organized into **six logical planes**:

```
 ┌────────────────────────────────────────────────────────────────────────────────────────┐
 │ 1. INGESTION PLANE (Go + Fiber)                                                         │
 │    • /v1/ingest API  • PII/Secret Redaction Engine  • SHA-256 Fingerprint Deduplication │
 └───────────────────────────────────┬────────────────────────────────────────────────────┘
                                     │
                                     ▼
 ┌────────────────────────────────────────────────────────────────────────────────────────┐
 │ 2. ORCHESTRATION PLANE (Trigger.dev + LangGraph)                                       │
 │    • Durable Workflow Engine  • LangGraph State Machine  • Agent Handoff Contracts       │
 └──────┬────────────────────────────┬─────────────────────────────┬──────────────────────┘
        │                            │                             │
        ▼                            ▼                             ▼
 ┌───────────────────────┐  ┌──────────────────────────┐  ┌───────────────────────────────┐
 │ 3. CODE INTELLIGENCE  │  │ 4. EXECUTION PLANE       │  │ 5. PERSISTENCE PLANE          │
 │ • Tree-sitter AST     │  │ • E2B MicroVM Sandboxes  │  │ • PostgreSQL (Source of Truth)│
 │ • CodeQL Static Engine│  │ • Zero-Egress Network    │  │ • Qdrant Vector Store         │
 │ • Qdrant RAG Store    │  │ • Replay Engine          │  │ • MinIO / S3 Logs             │
 └───────────────────────┘  └──────────────────────────┘  │ • HashiCorp Vault / KMS       │
                                                          └───────────────────────────────┘
                                     │
                                     ▼
 ┌────────────────────────────────────────────────────────────────────────────────────────┐
 │ 6. DELIVERY PLANE (GitHub App + Next.js Dashboard)                                     │
 │    • Scoped GitHub PRs  • SSE Real-Time Terminal  • Observation Daemon Watchdog        │
 └────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. The 19-Layer Technology Stack

| # | Layer | Technology | Justification & Responsibility |
|---|---|---|---|
| 1 | **Ingestion Service** | Go 1.22 + Fiber | High-throughput, sub-millisecond incident ingestion, secret redaction, and fingerprint hashing. |
| 2 | **Workflow Engine** | Trigger.dev v3 | Durable, retryable step execution for long-running workflows with zero state loss. |
| 3 | **Agent Orchestration** | Node.js + LangGraph | Stateful multi-agent graph management with strict node-to-node memory isolation. |
| 4 | **Execution Sandbox** | E2B (Docker fallback) | Isolated Firecracker microVM execution with strict zero-egress network policies. |
| 5 | **Static Analysis** | CodeQL | Deterministic, non-LLM AST rule checking for corroboration. |
| 6 | **AST Code Parsing** | Tree-sitter | Polyglot syntactic parsing to resolve stack trace frames to exact functions and line ranges. |
| 7 | **Semantic RAG Engine** | Qdrant | Dense vector search across historical codebases, past fixes, and AST embeddings. |
| 8 | **Relational Store** | PostgreSQL 16 | Primary transactional source of truth for incidents, evidence, confidence scores, and watchlists. |
| 9 | **Authentication** | Supabase Auth | OAuth 2.0 (GitHub / Google) session management. |
| 10 | **Artifact Storage** | MinIO / S3 | Blob storage for sandbox execution logs, patch diffs, and replay bundles. |
| 11 | **Secrets Management** | HashiCorp Vault / KMS | Envelope encryption for BYOK LLM provider keys. |
| 12 | **GitHub Integration** | GitHub App (Octokit) | Fine-grained, repository-scoped authentication using short-lived installation tokens. |
| 13 | **Post-Merge Monitor** | Observation Daemon | Trigger.dev background worker monitoring merged fixes for 48 hours. |
| 14 | **AI Observability** | Langfuse | Complete trace logging, prompt auditing, and token usage analytics across all 4 agents. |
| 15 | **Frontend Dashboard** | Next.js 14 + Tailwind | Modern React Server Component dashboard with shadcn/ui components. |
| 16 | **Pipeline Visualizer** | React Flow | Interactive real-time graph visualization of active agent execution nodes. |
| 17 | **Real-Time Streaming**| Server-Sent Events (SSE)| Unidirectional backend-to-frontend streaming for live logs and agent state changes. |
| 18 | **Local Deployment** | Docker Compose | One-command local orchestration setup for fast developer bring-up. |
| 19 | **LLM Provider Layer** | BYOK Abstraction | Provider-agnostic interface supporting Anthropic Claude, OpenAI GPT-4o, and Google Gemini. |

---

## 6. AI Agent Pipeline (4-Agent Architecture)

EpiCenter uses four specialized agents connected in a stateful LangGraph execution graph:

```
                  ┌──────────────────────┐
                  │  1. INVESTIGATOR     │
                  │  • AST Analysis      │
                  │  • CodeQL Query      │
                  │  • Qdrant Retrieval  │
                  └──────────┬───────────┘
                             │ Hypothesis & Context
                             ▼
                  ┌──────────────────────┐
                  │  2. TEST WRITER      │
                  │  • Generates Test    │
                  │  • Verifies Failure  │
                  └──────────┬───────────┘
                             │ Failing Test & Environment
                             ▼
                  ┌──────────────────────┐
                  │  3. SURGEON          │
                  │  • Blast Radius Check│
                  │  • Minimal Patch     │
                  └──────────┬───────────┘
                             │ Patch & Code Base
                             ▼
                  ┌──────────────────────┐
                  │  4. JUDGE            │
                  │  • Runs Test Suite   │
                  │  • Score Confidence  │
                  │  • Gates GitHub PR   │
                  └──────────────────────┘
```

1. **Investigator Agent**: Analyzes stack traces, pulls context using Tree-sitter AST, runs CodeQL queries, and queries Qdrant for past fixes. Outputs a structured root-cause hypothesis.
2. **Test Writer Agent**: Translates the hypothesis into a clean regression test file. Executes the test inside E2B sandbox to confirm it fails on the current codebase.
3. **Surgeon Agent**: Computes the exact symbol blast radius using Tree-sitter and writes the minimal patch necessary to resolve the failing test without impacting surrounding scope.
4. **Judge Agent**: Re-executes the test suite against the patched code inside the sandbox. Calculates the confidence score via the Confidence Engine and authorizes GitHub Pull Request creation if the threshold is met.

---

## 7. Evidence Pipeline & Confidence Engine

### Multi-Signal Confidence Formula

The **Confidence Engine** evaluates four distinct signals to compute a normalized confidence score ($C \in [0, 100]$):

$$C = w_{test} S_{test} + w_{codeql} S_{codeql} + w_{blast} S_{blast} + w_{llm} S_{llm}$$

| Signal ($S_i$) | Weight ($w_i$) | Description |
|---|---|---|
| **$S_{test}$ (Sandbox Test Pass)** | **35%** | Test fails before patch, passes after patch in isolated E2B sandbox. |
| **$S_{codeql}$ (CodeQL Corroboration)** | **30%** | Independent static analysis rule matches the diagnosed fault. |
| **$S_{blast}$ (Blast Radius Scope)** | **15%** | Patch changes remain strictly within AST-computed symbol boundaries. |
| **$S_{llm}$ (Agent Self-Assessment)** | **20%** | Investigator & Judge agent self-consistency score. |

> **Gate Threshold**: A score of $\ge 75\%$ is required to auto-open a GitHub Pull Request. Runs below threshold are flagged for manual human review with full evidence attached.

---

## 8. Execution Environment & Sandboxing

All generated code (regression tests and surgical patches) runs inside an **E2B isolated sandbox**:
- **MicroVM Isolation**: MicroVMs powered by Firecracker ensure complete kernel isolation.
- **Zero-Egress Network**: Network interfaces are blocked to prevent data exfiltration or unintended side-effects during test execution.
- **Replay Engine**: Every execution command, stdout, stderr, and filesystem diff is recorded to S3/MinIO for instant deterministic replay.

---

## 9. Post-Merge Observation Daemon

Once a PR created by EpiCenter is merged into `main`:
1. The **Observation Daemon** registers the incident's SHA-256 fingerprint on a **48-Hour Watchlist**.
2. If an incoming incident matches an active watchlist fingerprint within 48 hours, the daemon classifies the patch as a **Regression**.
3. EpiCenter automatically opens a **Revert PR** linking back to the original incident, evidence chain, and new failure log.

---

## 10. Security & BYOK Architecture

- **Scoped GitHub App Tokens**: Uses GitHub App installations with `contents:write` scoped only to specific feature branches (never `main`) and `pull_requests:write`. No personal access tokens (PATs) are used.
- **BYOK Envelope Encryption**: User-supplied API keys (Anthropic, OpenAI, Google) are encrypted using AES-256-GCM via HashiCorp Vault or Cloud KMS and decrypted in-memory strictly for the duration of the LLM call.
- **Boundary PII & Secret Redaction**: The Go Ingestion Service automatically redacts API keys, JWTs, DB connection strings, passwords, and PII before saving payloads to PostgreSQL or sending them to LLMs.

---

## 11. API Specifications

### Ingest Production Incident

`POST /v1/ingest`

#### Request Headers
```http
Content-Type: application/json
X-EpiCenter-Key: ep_live_98f21a7c...
```

#### Request Payload
```json
{
  "project_id": "proj_9921ab4c",
  "repository": "Jacksonfio/EpiCenter",
  "branch": "main",
  "environment": "production",
  "payload": {
    "error_message": "TypeError: Cannot read property 'user_id' of undefined",
    "stack_trace": "TypeError: Cannot read property 'user_id' of undefined\n    at AuthService.validateToken (/app/dist/auth/service.js:42:18)\n    at processTicksAndRejections (node:internal/process/task_queues:95:5)",
    "context_logs": [
      "2026-08-04T22:00:00Z [INFO] Incoming POST /auth/verify",
      "2026-08-04T22:00:01Z [ERROR] Unhandled exception in AuthService"
    ]
  }
}
```

#### Response Payload (`202 Accepted`)
```json
{
  "incident_id": "inc_7f8a9b1c",
  "fingerprint": "a3b9c8d7e6f543210123456789abcdefa3b9c8d7e6f543210123456789abcdef",
  "workflow_run_id": "wf_run_314159265",
  "status": "QUEUED",
  "dashboard_url": "https://epicenter.dev/incidents/inc_7f8a9b1c",
  "created_at": "2026-08-04T22:15:00Z"
}
```

---

## 12. Project Structure

```
EpiCenter/
├── .github/
│   └── workflows/          # CI/CD pipelines for Go, Node, and Next.js
├── cmd/
│   └── ingestion/          # Go Fiber Ingestion Service Entrypoint
├── pkg/
│   ├── scrubber/           # Go PII & Secret Redaction Engine
│   └── fingerprint/        # SHA-256 Error Fingerprinting
├── orchestration/          # Node.js + LangGraph Multi-Agent Engine
│   ├── src/
│   │   ├── agents/         # Investigator, Test Writer, Surgeon, Judge
│   │   ├── confidence/     # Multi-Signal Confidence Calculator
│   │   └── state/          # LangGraph Memory & State Schemas
│   ├── package.json
│   └── tsconfig.json
├── code-intel/             # Code Intelligence Services
│   ├── treesitter/         # AST Parsing & Scope Resolution
│   ├── codeql/             # CodeQL Query Runner & Rule Specs
│   └── qdrant/             # RAG Embeddings & Vector Operations
├── execution/              # E2B MicroVM Execution & Replay Engine
├── workflows/              # Trigger.dev Durable Workflow Definitions
│   └── src/
│       ├── incidentPipeline.ts
│       └── observationDaemon.ts
├── frontend/               # Next.js 14 Dashboard
│   ├── app/                # React Server Components & SSE Hooks
│   ├── components/         # React Flow Graph & Terminal Logs
│   └── package.json
├── db/                     # PostgreSQL Migrations & Prisma Schema
├── docker-compose.yml      # Local Infrastructure (Postgres, Qdrant, MinIO)
├── .env.example            # Environment variables template
├── LICENSE                 # MIT License
└── README.md               # Complete System Documentation
```

---

## 13. Getting Started & Local Setup

### Prerequisites
- **Docker & Docker Compose** (v24.0+)
- **Go** (v1.22+)
- **Node.js** (v20+) & `pnpm` / `npm`
- **E2B API Key** (for microVM sandboxing)
- **Trigger.dev Account / CLI**

### 1. Clone & Configure Environment
```bash
git clone https://github.com/Jacksonfio/EpiCenter.git
cd EpiCenter

cp .env.example .env
```

### 2. Start Core Infrastructure Services
```bash
docker compose up -d postgres qdrant minio
```

### 3. Run Ingestion Service (Go)
```bash
cd services/ingestion
go run main.go
# Server listening on http://localhost:8080
```

### 4. Start Trigger.dev & Agent Orchestrator
```bash
cd workflows
npm install
npx trigger.dev@latest dev
```

### 5. Launch Frontend Dashboard
```bash
cd frontend
npm install
npm run dev
# Dashboard available at http://localhost:3000
```

---

## 14. Demo Flow

1. **Ingest Bug**: Trigger an incident via cURL or dashboard simulator with a known stack trace.
2. **Observe Agent Graph**: Watch the Next.js React Flow dashboard render active execution steps across the Investigator, Test Writer, Surgeon, and Judge agents.
3. **Inspect CodeQL & AST Evidence**: View independent static analysis corroboration cards side-by-side with LLM hypotheses.
4. **Live Sandbox Output**: Stream real-time terminal output showing the regression test failing before the patch and passing after it.
5. **Review GitHub PR**: Open the generated GitHub Pull Request to view the cited proof and confidence score report.

---

## 15. Production Vision & Roadmap

While the hackathon demo leverages Docker Compose and E2B Cloud, the production architecture targets enterprise-scale deployment:

- **Infrastructure as Code**: Terraform modules for AWS EKS / GCP GKE provisioning.
- **Firecracker MicroVM Farm**: Self-hosted microVM worker pools for zero-trust sandbox execution.
- **Managed Vector & RAG**: Managed Qdrant Cloud cluster with automatic codebase indexing on every GitHub push.
- **Enterprise KMS**: Vault Enterprise with per-tenant encryption keys and HSM backing.

---

## 16. Comparison Matrix

| Feature | Generic AI Fixer | Sentry / Datadog | GitHub Copilot | **EpiCenter (TDAR)** |
|---|:---:|:---:|:---:|:---:|
| **Incident Ingestion** | ❌ | ✅ | ❌ | **✅** |
| **Reproducing Test Generation** | ❌ | ❌ | ❌ | **✅** |
| **Sandbox Execution Proof** | ❌ | ❌ | ❌ | **✅** |
| **Deterministic CodeQL Corroboration**| ❌ | ❌ | ❌ | **✅** |
| **Multi-Agent Judge Gate** | ❌ | ❌ | ❌ | **✅** |
| **Cited PR Evidence Chain** | ❌ | ❌ | ❌ | **✅** |
| **Post-Merge 48h Revert Daemon** | ❌ | ❌ | ❌ | **✅** |

---

## 17. License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.

---

<p align="center">
  <b>EpiCenter</b> • Find the Fault. Prove the Fix.
</p>
