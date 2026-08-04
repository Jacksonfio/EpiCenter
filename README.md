<div align="center">

# EpiCenter
### *Find the Fault. Prove the Fix.*

**Autonomous incident-to-patch platform powered by Test-Driven Autonomous Repair (TDAR)**

[![Go Version](https://img.shields.io/badge/Go-1.22+-00ADD8?style=flat-square&logo=go)](https://golang.org)
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=flat-square&logo=nodedotjs)](https://nodejs.org)
[![LangGraph](https://img.shields.io/badge/LangGraph-0.2-FF6F61?style=flat-square)](https://github.com/langchain-ai/langgraph)
[![Trigger.dev](https://img.shields.io/badge/Trigger.dev-v3-000000?style=flat-square)](https://trigger.dev)
[![E2B Sandbox](https://img.shields.io/badge/E2B-Sandbox-5865F2?style=flat-square)](https://e2b.dev)
[![CodeQL](https://img.shields.io/badge/CodeQL-Static_Analysis-2088FF?style=flat-square)](https://codeql.github.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

</div>

---

## Complete System Design Document

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
3. [Motivation](#3-motivation)
4. [Existing Solutions and Their Limitations](#4-existing-solutions-and-their-limitations)
5. [Research Gap](#5-research-gap)
6. [Proposed Solution](#6-proposed-solution)
7. [Core Innovation (TDAR + Evidence Layer)](#7-core-innovation-tdar--evidence-layer)
8. [System Goals](#8-system-goals)
9. [Functional Requirements](#9-functional-requirements)
10. [Non-Functional Requirements](#10-non-functional-requirements)
11. [Complete System Architecture](#11-complete-system-architecture)
12. [Component Architecture](#12-component-architecture)
13. [Technology Stack (with Justification)](#13-technology-stack-with-justification)
14. [End-to-End Workflow](#14-end-to-end-workflow)
15. [AI Agent Architecture](#15-ai-agent-architecture)
16. [Investigator Agent](#16-investigator-agent)
17. [Test Writer Agent](#17-test-writer-agent)
18. [Surgeon Agent](#18-surgeon-agent)
19. [Judge Agent](#19-judge-agent)
20. [Trigger.dev Workflow](#20-triggerdev-workflow)
21. [Evidence Pipeline](#21-evidence-pipeline)
22. [Code Intelligence Engine](#22-code-intelligence-engine)
23. [Tree-sitter](#23-tree-sitter)
24. [CodeQL](#24-codeql)
25. [Qdrant](#25-qdrant)
26. [Confidence Engine](#26-confidence-engine)
27. [Blast Radius Analysis](#27-blast-radius-analysis)
28. [Evidence Citation System](#28-evidence-citation-system)
29. [GitHub Integration](#29-github-integration)
30. [Execution Environment (E2B)](#30-execution-environment-e2b)
31. [Replay Engine](#31-replay-engine)
32. [Regression Testing](#32-regression-testing)
33. [Observation Daemon](#33-observation-daemon)
34. [Security Architecture](#34-security-architecture)
35. [Authentication](#35-authentication)
36. [BYOK API Key Management](#36-byok-api-key-management)
37. [Database Design](#37-database-design)
38. [API Specifications](#38-api-specifications)
39. [Frontend Dashboard](#39-frontend-dashboard)
40. [Real-Time Communication](#40-real-time-communication)
41. [Deployment Architecture](#41-deployment-architecture)
42. [Production Architecture](#42-production-architecture)
43. [Scalability](#43-scalability)
44. [Fault Tolerance](#44-fault-tolerance)
45. [Cost Analysis](#45-cost-analysis)
46. [Demo Flow](#46-demo-flow)
47. [Novelty Analysis](#47-novelty-analysis)
48. [Comparison with Existing Tools](#48-comparison-with-existing-tools)
49. [Future Scope](#49-future-scope)
50. [Advantages](#50-advantages)
51. [Limitations](#51-limitations)
52. [Conclusion](#52-conclusion)
53. [Project Structure](#project-structure)
54. [Getting Started](#getting-started)

---

## 1. Executive Summary

EpiCenter — *"Find the Fault. Prove the Fix."* — is an autonomous incident-to-patch platform that ingests a production error (a stack trace, a log line, or an APM alert), builds a multi-source evidence chain around it, and produces a reviewable pull request containing a root-cause diagnosis, a reproducing regression test, and a minimal patch. The system's central thesis is that an AI-generated fix is only trustworthy when it is accompanied by proof: a failing test that reproduces the bug before the patch and passes after it, corroborating static-analysis evidence, and a transparent confidence score with citations back to the exact lines of code and commits that justify the diagnosis.

This document is a complete design record of EpiCenter as scoped for hackathon delivery, capturing the finalized 19-layer technology stack, the four-agent AI pipeline (Investigator, Test Writer, Surgeon, Judge), the durable workflow backbone, the evidence and confidence architecture, security posture, data model, APIs, frontend, deployment strategy for the demo, and the longer-term production roadmap.

---

## 2. Problem Statement

When a production incident fires, engineers spend a disproportionate amount of time not fixing the bug but finding it: correlating a stack trace with the right commit, reconstructing the code path that produced it, and convincing themselves (and their reviewers) that a proposed change actually addresses the root cause rather than papering over a symptom.

Existing AI coding assistants can generate a plausible-looking patch quickly, but a plausible patch is not a proven patch. Without a reproducing test and independent corroborating evidence, a reviewer has no fast way to distinguish a correct fix from a confident hallucination, which pushes the trust burden right back onto the human and can erode confidence in AI-assisted remediation altogether.

---

## 3. Motivation

On-call and incident response is one of the highest-stress, lowest-leverage activities in software engineering: the diagnostic work is repetitive and pattern-based, yet it still consumes senior engineering time because trust in automation is low.

EpiCenter is motivated by the observation that trust is not built by better patch generation alone, but by making the reasoning behind a patch auditable — showing the evidence, not just the answer — so that verification takes seconds instead of the twenty to forty minutes typically spent tracing an incident by hand.

---

## 4. Existing Solutions and Their Limitations

AI pair-programming and code-review assistants (GitHub Copilot, Cursor, Devin-style agents) are optimized for greenfield authoring or interactive editing, not for closing the loop from a live production error to a verified regression test and a scoped patch.

APM and observability platforms (Sentry, Datadog, New Relic) excel at surfacing and grouping errors but stop at detection — they do not diagnose root cause with cited evidence or generate a provably correct fix.

Generic "AI fixes my bug" tools typically produce a single-shot patch suggestion with no test-based proof of correctness, no static-analysis corroboration, and no post-merge safety net if the fix regresses.

---

## 5. Research Gap

There is no widely available system that treats bug-fixing as an evidence-gathering and adjudication problem rather than a single-shot generation problem. Specifically missing from the landscape is:

- **(a)** a multi-agent pipeline where one agent's output is independently checked by another before merge,
- **(b)** a fusion of LLM reasoning with deterministic static analysis (CodeQL) as a non-LLM corroborating evidence source, and
- **(c)** durable, replayable workflow execution paired with post-merge regression monitoring that can autonomously revert a bad fix.

EpiCenter's Test-Driven Autonomous Repair (TDAR) approach with an explicit Evidence Layer is designed to fill this gap.

---

## 6. Proposed Solution

EpiCenter accepts an incident payload at a single ingestion endpoint, redacts and deduplicates it, and hands it to a durable Trigger.dev workflow that drives a LangGraph-orchestrated, four-agent pipeline. The Investigator agent builds a root-cause hypothesis using Tree-sitter-derived AST context, Qdrant semantic retrieval, and CodeQL static-analysis corroboration. The Test Writer agent converts that hypothesis into a failing regression test executed inside an isolated E2B sandbox. The Surgeon agent proposes a minimal patch scoped by blast-radius analysis. The Judge agent re-runs the regression suite against the patch, checks confidence thresholds, and gates whether a pull request is opened. Every claim in the final PR is cited back to specific evidence — lines of code, commit history, static-analysis findings, and test output.

---

## 7. Core Innovation (TDAR + Evidence Layer)

The core innovation is **Test-Driven Autonomous Repair (TDAR)**: no patch is proposed until a test exists that reproduces the failure, and no patch is merged-ready until that same test passes against the patch. This inverts the usual "generate a fix, hope it's right" pattern into "prove the bug, then prove the fix."

```
       [ Production Incident Ingested ]
                      │
                      ▼
       [ Investigator Agent Diagnoses ]
       [ AST + CodeQL + Qdrant RAG   ]
                      │
                      ▼
   ┌─────────────────────────────────────┐
   │  Test Writer Agent Creates Test    │
   └──────────────────┬──────────────────┘
                      │
                      ▼
   ┌─────────────────────────────────────┐
   │  E2B Sandbox: Verify Test FAILS    │  ◄── Must fail on current (buggy) codebase
   └──────────────────┬──────────────────┘
                      │
                      ▼
   ┌─────────────────────────────────────┐
   │  Surgeon Agent Crafts Patch        │  ◄── Blast radius bounded
   └──────────────────┬──────────────────┘
                      │
                      ▼
   ┌─────────────────────────────────────┐
   │  E2B Sandbox: Verify Test PASSES   │  ◄── Must pass on patched codebase
   └──────────────────┬──────────────────┘
                      │
                      ▼
       [ Judge Agent Checks Confidence ]
       [ ≥75% threshold to open PR    ]
                      │
                      ▼
   [ GitHub PR with Cited Evidence Chain ]
```

Layered on top of TDAR is the **Evidence Layer**, a structured record — persisted in PostgreSQL — of every artifact that contributed to the diagnosis: the AST context Tree-sitter extracted, the CodeQL findings that corroborated (or contradicted) the LLM's hypothesis, the Qdrant-retrieved similar past fixes, and the sandbox execution logs. The Evidence Layer is what the Judge agent scores for confidence and what the final pull request cites, turning an opaque AI suggestion into an auditable, citation-backed decision.

---

## 8. System Goals

- Reduce mean time to a reviewable, evidence-backed patch for reproducible production bugs.
- Guarantee every proposed patch is accompanied by a reproducing regression test.
- Corroborate LLM diagnosis with at least one independent, deterministic evidence source (CodeQL).
- Keep humans in the approval loop via standard GitHub pull-request review — never auto-merge to main.
- Provide full observability into every agent's reasoning, tool calls, and token usage (Langfuse).
- Detect and automatically revert regressions introduced by a merged AI-generated fix.

---

## 9. Functional Requirements

| ID | Requirement |
|----|-------------|
| **FR1** | Accept incident payloads (stack trace, log excerpt, or APM alert) via a validated REST endpoint. |
| **FR2** | Redact PII and secrets from ingested payloads before persistence. |
| **FR3** | Deduplicate incoming incidents by a stable fingerprint hash to avoid redundant pipeline runs. |
| **FR4** | Map a stack trace to precise source locations using AST-level parsing. |
| **FR5** | Retrieve semantically similar historical context (past fixes, related functions) via vector search. |
| **FR6** | Run an independent static-analysis pass and reconcile its findings with the LLM hypothesis. |
| **FR7** | Generate a regression test that fails on the current codebase and encodes the reported bug. |
| **FR8** | Execute all generated code (tests and patches) inside an isolated, no-egress sandbox. |
| **FR9** | Generate a minimal patch scoped to the affected blast radius. |
| **FR10** | Score confidence and gate pull-request creation on a minimum threshold. |
| **FR11** | Open a GitHub pull request with the patch, regression test, and cited evidence chain. |
| **FR12** | Monitor merged fixes for 48 hours and auto-open a revert PR on regression. |
| **FR13** | Stream live pipeline progress and sandbox logs to the dashboard in real time. |

---

## 10. Non-Functional Requirements

| Attribute | Requirement |
|-----------|-------------|
| **Security** | No raw PAT usage; scoped GitHub App permissions only; envelope-encrypted BYOK keys; no network egress from the execution sandbox. |
| **Reliability** | Every workflow step is durable and retryable (Trigger.dev) so transient failures do not lose pipeline state. |
| **Auditability** | Every agent decision and tool call is traced end-to-end (Langfuse) and persisted as evidence (PostgreSQL). |
| **Observability** | Real-time progress visible to the user, not just a final result (SSE-driven dashboard). |
| **Portability** | LLM provider is abstracted behind one interface so BYOK users can choose Claude, GPT-4o, or Gemini. |
| **Reproducibility** | The demo environment stands up deterministically via Docker Compose. |

---

## 11. Complete System Architecture

EpiCenter is organized into **six logical planes**:

1. An **Ingestion plane** (Go + Fiber) at the system boundary
2. An **Orchestration plane** (Trigger.dev driving a LangGraph state machine) that owns pipeline durability and agent handoffs
3. A **Code Intelligence plane** (Tree-sitter, CodeQL, Qdrant) that supplies grounded context and corroboration
4. An **Execution plane** (E2B sandboxes) where all generated code actually runs
5. A **Persistence plane** (PostgreSQL for structured state, MinIO/S3 for artifacts, Vault/KMS for secrets)
6. A **Delivery plane** (GitHub App integration, Next.js dashboard over SSE)

```
 ┌────────────────────────────────────────────────────────────────────────────────────┐
 │  1. INGESTION PLANE  (Go + Fiber)                                                   │
 │  • POST /v1/ingest  • PII/Secret Redaction (12 patterns)  • SHA-256 Fingerprint    │
 └──────────────────────────────────┬─────────────────────────────────────────────────┘
                                    │
                                    ▼
 ┌────────────────────────────────────────────────────────────────────────────────────┐
 │  2. ORCHESTRATION PLANE  (Trigger.dev + LangGraph)                                  │
 │  • Durable Retryable Pipeline  • 4-Agent State Machine  • SSE Progress Streaming   │
 └─────────┬────────────────────────┬──────────────────────────┬──────────────────────┘
           │                        │                          │
           ▼                        ▼                          ▼
 ┌──────────────────────┐  ┌────────────────────────┐  ┌──────────────────────────────┐
 │  3. CODE INTELLIGENCE │  │  4. EXECUTION PLANE    │  │  5. PERSISTENCE PLANE        │
 │  • Tree-sitter AST   │  │  • E2B MicroVM Sandbox │  │  • PostgreSQL (6 tables)     │
 │  • CodeQL Queries    │  │  • Zero-Egress Network │  │  • Qdrant Vector Store       │
 │  • Qdrant RAG Engine │  │  • Replay Engine       │  │  • MinIO / S3 Artifacts      │
 └──────────────────────┘  └────────────────────────┘  │  • HashiCorp Vault / KMS     │
                                                        └──────────────────────────────┘
                                    │
                                    ▼
 ┌────────────────────────────────────────────────────────────────────────────────────┐
 │  6. DELIVERY PLANE  (GitHub App + Next.js + SSE)                                   │
 │  • Scoped Feature-Branch PRs  • React Flow Pipeline Graph  • Observation Daemon    │
 └────────────────────────────────────────────────────────────────────────────────────┘
```

**End-to-end flow:**
`Client → Go /v1/ingest → Trigger.dev Workflow → LangGraph Agents → E2B Execution Environment → GitHub PR → Observation Daemon`

---

## 12. Component Architecture

Each plane is composed of discrete, independently deployable components that communicate through well-defined boundaries: the Ingestion Service only ever writes validated, redacted incidents; the Orchestrator only ever reads/writes workflow and evidence state; the Code Intelligence services are stateless query surfaces over PostgreSQL/Qdrant; the Execution sandbox has no network egress and communicates results back to the orchestrator only; and the GitHub integration is the sole writer to source control, always via a branch-scoped GitHub App token. This separation keeps the blast radius of any single component's failure or compromise contained.

---

## 13. Technology Stack (with Justification)

| # | Layer | Technology | What it actually does |
|---|-------|------------|-----------------------|
| 1 | **Ingestion Service** | Go + Fiber | Single `/v1/ingest` REST endpoint. Validates schema, redacts PII/secrets, deduplicates by fingerprint hash. |
| 2 | **AI Workflow Orchestration** | Trigger.dev | Durable, retryable pipeline execution with a live execution dashboard — the backbone connecting every stage. |
| 3 | **AI Orchestration** | Node.js + LangGraph | Coordinates handoffs between the four agents (Investigator, Test Writer, Surgeon, Judge) as a stateful graph. |
| 4 | **Execution Environment** | E2B (Docker for local dev) | Isolated, no-egress environment where generated tests run, patches are applied, and replay/validation happens. |
| 5 | **Static Analysis** | CodeQL | Independent, deterministic corroboration of the AI's diagnosis — a second, non-LLM evidence source. |
| 6 | **Code Parsing** | Tree-sitter | Parses source into ASTs for precise stack-trace-to-code mapping and language-aware context extraction. |
| 7 | **Semantic Context Engine** | Qdrant | Vector store for AST chunks, function/commit summaries, and past-fix embeddings for RAG-style retrieval. |
| 8 | **Relational Database** | PostgreSQL | Projects, incidents, evidence, confidence scores, watchlist, patch citations — transactional source of truth. |
| 9 | **Authentication** | Supabase Auth | GitHub/Google OAuth for dashboard login. |
| 10 | **Object Storage** | MinIO / S3-compatible | Sandbox execution logs, generated regression tests, replay artifacts, downloadable reports. |
| 11 | **Secrets Management** | HashiCorp Vault / Cloud KMS | Envelope-encrypts the user's BYOK LLM key; decrypted only in-process per request. |
| 12 | **Repository Integration** | GitHub App (Octokit) | `contents:write` on feature branches only, no push to main, `pull_requests:write` — never a raw PAT. |
| 13 | **Post-Merge Monitoring** | Observation Daemon (Trigger.dev worker) | 48h fingerprint watchlist post-merge; auto-opens a Revert PR on regression. |
| 14 | **AI Observability** | Langfuse | Captures prompts, responses, token usage, and traces across the four agents — dogfoods the product's thesis. |
| 15 | **Frontend** | Next.js + Tailwind + shadcn/ui + React Flow | Dashboard with live pipeline graph, confidence breakdown, sandbox log stream, PR status. |
| 16 | **Real-Time Communication** | Server-Sent Events (SSE) | Streams workflow progress and sandbox logs to the dashboard. |
| 17 | **Demo Deployment** | Docker Compose + E2B + Trigger.dev Cloud | Fast, reproducible setup for the hackathon presentation. |
| 18 | **Production Vision** | Terraform + Kubernetes + Firecracker microVMs + managed PostgreSQL + managed Qdrant + Cloud KMS | Stated roadmap only — not yet implemented. |
| 19 | **LLM Provider** | User BYOK — Claude Sonnet 4.5 / GPT-4o / Gemini | Behind one provider-agnostic abstraction layer. |

---

## 14. End-to-End Workflow

1. An incident payload arrives at the Go `/v1/ingest` endpoint, is schema-validated, PII/secret-redacted, and deduplicated by fingerprint hash.
2. The Ingestion Service enqueues a Trigger.dev workflow run, which persists initial state to PostgreSQL and begins streaming progress over SSE.
3. The LangGraph state machine invokes the **Investigator agent**, which pulls AST context (Tree-sitter), semantic context (Qdrant), and static-analysis findings (CodeQL) to form a root-cause hypothesis with a preliminary confidence score.
4. The **Test Writer agent** converts the hypothesis into a regression test, executed inside an E2B sandbox to confirm it fails against the current (buggy) code.
5. The **Surgeon agent** proposes a minimal patch, scoped by blast-radius analysis of the affected symbols.
6. The **Judge agent** re-runs the regression suite and any existing test suite against the patch inside the sandbox, reconciles all evidence, and either raises the confidence score above threshold or halts the pipeline for manual review.
7. On success, the GitHub App opens a pull request on a feature branch containing the patch, the new regression test, and an evidence chain with citations.
8. Once merged, the **Observation Daemon** watches the incident's fingerprint for 48 hours and opens an automatic revert PR if the same fault signature recurs.

---

## 15. AI Agent Architecture

The four agents are modeled as nodes in a LangGraph stateful graph, each with a narrow responsibility and an explicit handoff contract, so that no single agent is trusted to both diagnose and self-certify a fix. State — including all gathered evidence — flows forward through the graph and is never silently discarded, which is what allows the Judge agent to make its final call using the full history rather than only the Surgeon's output.

```
┌─────────────────────────────────────────────────────────────────────┐
│                    LangGraph State Machine                           │
│                                                                     │
│  ┌─────────────────┐     ┌─────────────────┐                       │
│  │  1. INVESTIGATOR │────▶│ 2. TEST WRITER  │                       │
│  │  • AST Analysis  │     │ • Write Test    │                       │
│  │  • CodeQL Query  │     │ • Verify FAILS  │                       │
│  │  • Qdrant RAG    │     │   in Sandbox    │                       │
│  └─────────────────┘     └────────┬────────┘                       │
│                                   │ [test verified failing]         │
│                                   ▼                                 │
│                          ┌─────────────────┐                       │
│                          │  3. SURGEON     │                       │
│                          │ • Blast Radius  │                       │
│                          │ • Minimal Patch │                       │
│                          └────────┬────────┘                       │
│                                   │ [patch within bounds]           │
│                                   ▼                                 │
│                          ┌─────────────────┐                       │
│                          │  4. JUDGE       │                       │
│                          │ • Run Suite     │                       │
│                          │ • Score ≥75%?   │                       │
│                          │ • Open PR       │                       │
│                          └─────────────────┘                       │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 16. Investigator Agent

Responsible for root-cause analysis. Consumes the raw incident payload plus AST context from Tree-sitter and semantically similar history from Qdrant, then requests a CodeQL query pass to independently corroborate or contradict its working hypothesis before it is passed downstream. Outputs a structured hypothesis object: suspected root cause, implicated files/functions, supporting evidence references, and a preliminary confidence score.

**Inputs:** Raw incident payload (error message, stack trace, context logs)
**Tools:** `parseASTContext()`, `searchQdrant()`, `runCodeQL()`, BYOK LLM
**Outputs:** `{ hypothesis, rootCauseType, implicatedFiles, implicatedFunctions, confidence, evidenceRefs }`

---

## 17. Test Writer Agent

Consumes the Investigator's hypothesis and authors a regression test intended to fail on the current codebase in exactly the way the reported incident describes. The test is executed in the E2B sandbox as a gating step — if it does not fail for the expected reason, the Test Writer revises it or the pipeline flags the hypothesis as unproven rather than proceeding blind.

**Inputs:** Investigator hypothesis, implicated files/functions, original error signal
**Tools:** BYOK LLM, `runInSandbox()` (expectFailure: true)
**Gate:** Pipeline halts if the generated test unexpectedly passes on the current codebase

---

## 18. Surgeon Agent

Consumes the confirmed-failing regression test and the Investigator's evidence to author the smallest patch that makes the test pass without altering unrelated behavior. Patch scope is bounded by the Blast Radius Analysis component so the Surgeon cannot silently widen its change beyond the files implicated by the evidence chain.

**Inputs:** Verified failing regression test, Investigator hypothesis, blast radius bounds
**Tools:** `computeBlastRadius()`, BYOK LLM
**Gate:** Any edit outside the computed blast radius is rejected as scope creep

---

## 19. Judge Agent

The final adjudicator. Re-executes the full regression test (and any pre-existing relevant tests) against the Surgeon's patch inside the sandbox, cross-checks the patch against the original CodeQL finding, and computes the final confidence score from the Confidence Engine. Only if the score clears the configured threshold (≥75%) does the Judge authorize pull-request creation; otherwise the run is marked for manual engineering review with the full evidence chain attached.

**Inputs:** Patch, regression test, full evidence chain accumulated by prior agents
**Tools:** `runInSandbox()` (expectFailure: false), `computeConfidence()`, `openPullRequest()`
**Gate:** `finalConfidenceScore ≥ 75%` required to authorize PR; below threshold → HALTED_FOR_REVIEW

---

## 20. Trigger.dev Workflow

Trigger.dev is the durable execution backbone for the entire pipeline. Each pipeline stage (ingestion handoff, each agent invocation, sandbox execution, PR creation, post-merge watch) is modeled as a retryable step with persisted state, so a transient failure — an LLM timeout, a sandbox cold start, a GitHub API hiccup — resumes rather than restarts the whole run. Its live execution dashboard is also the source of the progress events streamed to the EpiCenter frontend over SSE.

```typescript
// Simplified — see workflows/src/incidentPipeline.ts
export const incidentPipelineTask = task({
  id: "epicenter.incident-pipeline",
  maxDuration: 600,
  retry: { maxAttempts: 3, factor: 2 },
  run: async (payload) => {
    const graph = buildEpiCenterGraph();
    return await graph.invoke(payload);
  },
});
```

---

## 21. Evidence Pipeline

Every piece of context gathered during a run — AST snippets, CodeQL findings, Qdrant retrieval results, sandbox logs, test output — is written to PostgreSQL as a structured, queryable Evidence record linked to the incident. The Evidence Pipeline is intentionally **additive and append-only** during a run: nothing is overwritten, so the Judge agent and, later, a human reviewer can see the complete provenance of the final patch rather than just its end state.

```
Evidence Record Types:
  AST_CONTEXT     — Tree-sitter scope map with file:line citations
  CODEQL_FINDING  — Deterministic rule match (ruleId, location, severity)
  QDRANT_HIT      — Semantically similar past incident/fix
  SANDBOX_LOG     — Raw stdout/stderr from E2B execution
  TEST_OUTPUT     — Regression test pass/fail result
  PATCH_DIFF      — Surgeon's proposed code changes
  BLAST_RADIUS    — Computed set of files/functions in scope
```

---

## 22. Code Intelligence Engine

The Code Intelligence Engine is the collective name for the three services that ground the agents in the actual codebase rather than the LLM's parametric memory: Tree-sitter for structural parsing, CodeQL for deterministic static analysis, and Qdrant for semantic retrieval over historical code and fixes.

---

## 23. Tree-sitter

Tree-sitter parses the target repository into per-file ASTs, enabling precise mapping from a raw stack-trace line to the exact function, class, and surrounding scope in source — far more reliable than naive line-number or regex matching, and language-aware across the polyglot codebases EpiCenter is designed to support.

**Why Tree-sitter?** It is an incremental, error-tolerant parser that produces concrete syntax trees in milliseconds for dozens of languages. Unlike a regex over raw text, it understands language grammar: the Investigator agent can ask "what function contains line 42 of auth/service.ts?" and get a structurally correct answer.

---

## 24. CodeQL

CodeQL runs targeted queries against the implicated code paths to produce a deterministic, non-LLM signal — for example, confirming a null-dereference or a resource leak pattern that the Investigator's hypothesis claims is present. When CodeQL corroborates the LLM's hypothesis, confidence rises; when it contradicts it, the pipeline treats that as a strong signal to revise or halt rather than proceed.

**Role in confidence scoring:** CodeQL corroboration contributes **30%** of the total confidence score — the largest single non-test signal — because it is a deterministic rule-based check that cannot hallucinate.

---

## 25. Qdrant

Qdrant stores vector embeddings of AST chunks, function- and commit-level summaries, and previously merged fixes. During investigation it is queried RAG-style to retrieve the most semantically similar past incidents and code regions, giving the Investigator agent grounded prior art instead of relying purely on the LLM's own recall.

**Collections:**
- `epicenter-incidents` — embeddings of past error messages, stack traces, and their confirmed fixes
- `epicenter-functions` — per-function AST summaries for targeted code retrieval
- `epicenter-commits` — commit message + diff embeddings for blame correlation

---

## 26. Confidence Engine

The Confidence Engine combines multiple weighted signals into a single score persisted alongside the Evidence record. This score is what the Judge agent checks against the merge-gate threshold, and it is what the dashboard surfaces to the human reviewer as a confidence breakdown rather than an opaque single number.

**Formula:**

$$C = (S_{test} \times 35\%) + (S_{codeql} \times 30\%) + (S_{blast} \times 15\%) + (S_{llm} \times 20\%)$$

| Signal | Weight | Scoring Logic |
|--------|--------|---------------|
| **$S_{test}$ — Sandbox Test Pass** | **35%** | Test fails pre-patch AND passes post-patch → 100. Either condition fails → 0. |
| **$S_{codeql}$ — CodeQL Corroboration** | **30%** | CodeQL finding matches hypothesis → 100. No finding (not contradiction) → 30. |
| **$S_{blast}$ — Blast Radius Compliance** | **15%** | Patch within computed bounds → 100. Violation detected → 0. |
| **$S_{llm}$ — LLM Self-Assessment** | **20%** | Investigator agent's self-reported confidence score (0–100), passed through directly. |

**Merge gate:** `C ≥ 75%` to authorize PR creation. Below threshold → `HALTED_FOR_REVIEW`.

---

## 27. Blast Radius Analysis

Before the Surgeon agent is allowed to write a patch, Blast Radius Analysis computes the set of files, functions, and call sites plausibly affected by the diagnosed root cause using the Tree-sitter AST graph. The Surgeon's patch is checked against this set; any edit outside the computed blast radius is treated as scope creep and rejected, keeping generated patches minimal and reviewable.

**Implementation:** Starting from the implicated files/functions identified by the Investigator, the blast radius expands ±1 hop through the Tree-sitter call graph — capturing direct callers and callees while bounding the patch surface area to a provably relevant set of symbols.

---

## 28. Evidence Citation System

Every claim written into the final pull-request description — "this null check is missing because X", "this matches CodeQL rule Y", "this regression test reproduces the reported stack trace" — is backed by a citation into the persisted Evidence record: a file path and line range, a CodeQL rule ID, or a sandbox log reference. This is what lets a human reviewer verify the chain of reasoning in the PR itself rather than trusting the AI's narrative on faith.

**Example PR citation format:**
```markdown
> **[CODEQL_FINDING]** Null dereference at `src/auth/service.ts:42`
> Rule: `js/dereferenced-null-optional`
> [View source →](../../blob/main/src/auth/service.ts#L38-L46)
```

---

## 29. GitHub Integration

All source-control interaction goes through a **GitHub App** (via Octokit) with narrowly scoped permissions: `contents:write` restricted to feature branches only (never `main`) and `pull_requests:write`. EpiCenter never uses a raw personal access token, which keeps the blast radius of a compromised credential limited to branch-level writes and PR creation, not repository administration.

**Branch naming:** `epicenter/fix-{incidentId[:8]}` — one branch per pipeline run, never reused.

**PR contents:**
- Surgeon's minimal patch committed to the feature branch
- Regression test file committed alongside the patch
- PR description containing the full confidence breakdown table and cited evidence chain

---

## 30. Execution Environment (E2B)

E2B provides the isolated, no-egress sandbox in which every piece of AI-generated code actually runs — the regression test against the original code, and later the same test suite against the patched code. Docker is used as the local-development equivalent of this sandbox. No generated code is ever executed against a live system or with outbound network access, which contains the risk of a malicious or malformed generation.

**Security properties of the E2B sandbox:**
- Firecracker microVM kernel isolation — full VM boundary, not just container namespacing
- Network interfaces blocked — no outbound connections possible from within the sandbox
- Filesystem is ephemeral — sandbox state does not persist between runs
- Maximum execution time enforced — 120 seconds per command, 10 minutes per pipeline run

---

## 31. Replay Engine

The Replay Engine re-executes a stored sandbox session — the exact commands, file diffs, and test runs from a prior pipeline stage — on demand, so a human reviewer or a later pipeline stage can deterministically reproduce a result without re-invoking the LLM. This underpins both reviewer trust ("I can replay this myself") and the Judge agent's re-verification step.

**Storage:** Every sandbox execution command, input files, stdout, stderr, and exit code are persisted as structured `SANDBOX_LOG` Evidence records and as raw artifacts in MinIO/S3, keyed by `runId`.

---

## 32. Regression Testing

Regression testing is the gating mechanism at the heart of TDAR: the Test Writer agent's output must fail against the original code, and the Surgeon agent's patch must make that same test (plus any pre-existing relevant suite) pass, both verified inside the E2B sandbox rather than asserted by the LLM. Regression tests are also persisted as durable artifacts (MinIO/S3) and shipped as part of the pull request.

**The two-gate model:**
1. **Pre-patch gate:** Test Writer's regression test must exit non-zero on the unpatched codebase. If it exits 0, the pipeline halts — the bug is not reproducible via this test, so no patch should be proposed.
2. **Post-patch gate:** Judge's re-run of the same test (and any related suite) must exit 0 on the patched codebase. If it exits non-zero, the patch does not fix the bug, and the pipeline halts.

---

## 33. Observation Daemon

A Trigger.dev worker that begins watching a merged fix's fault fingerprint for 48 hours. If the same fingerprint reappears in production during that window, the Observation Daemon automatically opens a Revert PR referencing the original incident and evidence chain, giving engineers a fast, evidence-linked rollback path rather than a fresh incident to re-diagnose from scratch.

**Polling interval:** Every 30 minutes for 48 hours (96 total checks per merged fix).
**Fingerprint match:** SHA-256 of `(repository, errorMessage, stackTrace)` — same computation as ingestion-time deduplication, so a recurrence is detected even if it arrives as a fresh incident.

---

## 34. Security Architecture

EpiCenter's security model rests on four pillars:

1. **Least-privilege source control** via a scoped GitHub App — never a raw PAT. Compromising the App token gives an attacker feature-branch write access only, not repository administration.
2. **No-egress execution sandbox** — generated code cannot exfiltrate data or reach external systems. The E2B microVM has no network interface outside the Firecracker host boundary.
3. **Envelope encryption** of user-supplied BYOK LLM credentials — keys are decrypted only in-process and only for the duration of the LLM call. Never logged, never persisted in plaintext, never included in Langfuse traces.
4. **Boundary PII and secret redaction** — the Go Ingestion Service applies 12 pattern-based redaction rules before any data reaches PostgreSQL or an LLM, containing the exposure surface for sensitive information in error payloads.

---

## 35. Authentication

Dashboard authentication is handled by **Supabase Auth** via GitHub or Google OAuth, so EpiCenter never stores or manages user passwords directly. Authenticated sessions scope which projects, incidents, and evidence a user can view, aligned with the GitHub repositories the underlying GitHub App installation grants access to.

---

## 36. BYOK API Key Management

Users bring their own LLM provider API key (Claude, GPT-4o, or Gemini). Keys are envelope-encrypted at rest using HashiCorp Vault or a cloud KMS, and are only ever decrypted in-process, per request, for the duration of the LLM call — never logged, never persisted in plaintext, and never included in Langfuse traces.

**Supported providers:** Anthropic Claude Sonnet 4.5 · OpenAI GPT-4o · Google Gemini 1.5 Pro

**Encryption scheme:** AES-256-GCM via Vault Transit engine. The DEK (data encryption key) is stored encrypted by the KEK (key encryption key) held in Vault. Only the calling process, for the duration of one LLM request, receives the plaintext DEK.

---

## 37. Database Design

PostgreSQL is the transactional source of truth, modeling the following tables:

| Table | Purpose |
|-------|---------|
| **`projects`** | Repository and GitHub App installation metadata |
| **`incidents`** | Ingested payloads, fingerprints, and workflow run IDs |
| **`evidence`** | Append-only records: AST snippets, CodeQL findings, Qdrant hits, sandbox logs |
| **`confidence_scores`** | Per-run signal breakdown (test, codeql, blast, llm) and total |
| **`patch_citations`** | Mapping from specific PR narrative claims to evidence record IDs |
| **`watchlist`** | Post-merge fingerprints monitored by the Observation Daemon |

**Design principle:** The `evidence` table is append-only. No evidence record is updated or deleted after insertion. This guarantees that the full audit trail for any pipeline run is always available for retrospective review.

---

## 38. API Specifications

### Primary External Surface

**`POST /v1/ingest`** — Submit a production incident for autonomous repair.

**Request:**
```http
POST /v1/ingest HTTP/1.1
Content-Type: application/json
X-EpiCenter-Key: ep_live_...

{
  "project_id": "proj_9921ab4c",
  "repository": "owner/repo",
  "branch": "main",
  "environment": "production",
  "payload": {
    "error_message": "TypeError: Cannot read property 'user_id' of undefined",
    "stack_trace": "TypeError: ...\n    at AuthService.validateToken (/app/src/auth/service.ts:42:18)",
    "context_logs": [
      "2026-08-04T22:00:00Z [INFO] Incoming POST /auth/verify",
      "2026-08-04T22:00:01Z [ERROR] Unhandled exception in AuthService"
    ]
  }
}
```

**Response `202 Accepted`:**
```json
{
  "incident_id": "inc_7f8a9b1c",
  "fingerprint": "a3b9c8d7e6f543210123456789abcdef...",
  "workflow_run_id": "wf_run_314159265",
  "status": "QUEUED",
  "dashboard_url": "http://localhost:3000/incidents/inc_7f8a9b1c",
  "created_at": "2026-08-04T22:15:00Z"
}
```

**`GET /healthz`** — Health check. Returns `{ "status": "ok" }`.

**`GET /v1/incidents/:id`** — Retrieve incident status, evidence, and confidence breakdown.

**`GET /v1/incidents/:id/stream`** — SSE stream of live pipeline progress and sandbox log lines.

---

## 39. Frontend Dashboard

Built with Next.js 14, Tailwind CSS, and shadcn/ui, with React Flow rendering the live pipeline graph as it executes. The dashboard surfaces, per run:

- **Current agent stage** — highlighted node in the React Flow pipeline graph
- **Confidence-score breakdown** — live-updating scorecards from the Confidence Engine (test / CodeQL / blast / LLM signals)
- **Live-tailing sandbox log stream** — SSE-driven terminal emulator showing stdout/stderr in real time
- **Evidence inspector** — expandable cards for each Evidence record type (AST, CodeQL, Qdrant, logs)
- **GitHub PR status** — PR number, URL, review status, and merge state

---

## 40. Real-Time Communication

Server-Sent Events (SSE) push workflow progress and sandbox log lines from the backend to the dashboard as they happen, chosen over WebSockets for this use case because:

1. The communication is **unidirectional** (server-to-client only) — clients never need to push data back over the same channel.
2. SSE's **built-in reconnection** handles dropped connections transparently without client-side logic.
3. SSE events are **plain HTTP** — they work through proxies, load balancers, and CDNs without special configuration.

**Event types streamed:**
- `agent:start` — agent node activation with agent name
- `agent:complete` — agent node completion with summary
- `sandbox:log` — individual stdout/stderr line from E2B execution
- `confidence:update` — confidence score recalculation after each evidence addition
- `pipeline:complete` — final status with PR URL or halt reason

---

## 41. Deployment Architecture

For the hackathon demo, EpiCenter runs via **Docker Compose** alongside E2B and Trigger.dev Cloud, chosen specifically for fast, reproducible bring-up during a live presentation rather than for production scale.

**Docker Compose services:**
- `postgres` — PostgreSQL 16 with schema auto-migration on startup
- `qdrant` — Qdrant vector store with persistent volume
- `minio` — S3-compatible artifact storage with web console at `:9001`
- `ingestion` — Go Fiber ingestion service at `:8080`

**External cloud services (no self-hosting required for demo):**
- Trigger.dev Cloud — durable workflow execution
- E2B Cloud — managed Firecracker microVM sandboxes

---

## 42. Production Architecture

The stated production roadmap — explicitly **not built for the demo** — targets:

- **Terraform** modules for AWS EKS / GCP GKE cluster provisioning
- **Kubernetes** with Horizontal Pod Autoscaler for agent worker pools
- **Firecracker microVM farm** — self-hosted for zero-trust sandbox isolation at scale
- **Managed PostgreSQL** — AWS RDS / Cloud SQL with read replicas and automated backups
- **Managed Qdrant Cloud** — with automatic codebase re-indexing on each GitHub push via webhook
- **Cloud KMS** — AWS KMS / GCP Cloud KMS with per-tenant encryption keys and HSM backing

> **Note:** This section describes design intentions only and should never be represented as already implemented.

---

## 43. Scalability

The architecture separates stateless compute (agents, ingestion) from stateful stores (PostgreSQL, Qdrant, object storage), so the production roadmap's Kubernetes-based horizontal scaling of agent workers and Firecracker-isolated sandboxes is a natural extension of the current design rather than a rearchitecture.

**Scaling levers:**
- **Ingestion Service** — stateless Go binary, scales horizontally behind a load balancer
- **Agent Workers** — stateless Node.js processes, scaled by Trigger.dev worker concurrency settings
- **Sandboxes** — E2B / Firecracker instances are ephemeral and independently schedulable
- **PostgreSQL** — vertical scale + read replicas for evidence/confidence read load
- **Qdrant** — horizontal shard expansion as the vector collection grows

---

## 44. Fault Tolerance

Trigger.dev's durable, retryable step model is the primary fault-tolerance mechanism: any step (LLM call, sandbox execution, GitHub API call) can fail and retry without losing upstream pipeline state. The Observation Daemon adds a second layer of fault tolerance after merge, catching regressions the pre-merge pipeline could not anticipate and auto-reverting them.

**Retry policy:** 3 maximum attempts, exponential backoff (factor 2, 1s–30s). Steps are idempotent by design — retrying an LLM call with the same inputs produces equivalent outputs, and sandbox runs are isolated so a retry does not inherit state from a failed prior attempt.

---

## 45. Cost Analysis

| Cost Driver | Borne By | Notes |
|-------------|----------|-------|
| **LLM inference** | User (BYOK) | EpiCenter never pays for LLM tokens — the user's own API key is used. |
| **E2B sandbox time** | EpiCenter (or user-hosted) | ~$0.10–0.25 per pipeline run for typical test execution durations. |
| **Qdrant storage/query** | EpiCenter | Predictable at ~$0.07/GB/month; scales with number of indexed repositories. |
| **Trigger.dev** | EpiCenter | Per-run pricing; typical pipeline run costs <$0.01 in workflow execution. |
| **PostgreSQL / MinIO** | EpiCenter | Fixed infrastructure cost; scales with incident volume not token pricing. |

Because users supply their own LLM key, EpiCenter's own operating costs center on orchestration, storage, and observability — which are comparatively predictable and scale with the number of incidents processed rather than with model token pricing.

---

## 46. Demo Flow

The live demonstration walks the full loop end-to-end:

1. **Submit** a real, reproducible bug's stack trace to `POST /v1/ingest` via the dashboard or cURL
2. **Watch** the dashboard's live React Flow pipeline graph as Investigator, Test Writer, Surgeon, and Judge agent nodes activate in sequence
3. **Inspect** the CodeQL corroboration and Qdrant retrieval hits feeding into the Investigator's evidence panel
4. **Stream** the regression test failing in the E2B sandbox, then the same test passing after the Surgeon's patch — visible line by line in the SSE log terminal
5. **Review** the confidence-score breakdown cards clearing the 75% threshold
6. **Open** the resulting GitHub Pull Request with its full cited evidence chain
7. **Narrate** the Observation Daemon's 48-hour post-merge safety net registration

---

## 47. Novelty Analysis

The novelty is not any single component — agentic pipelines, static analysis, vector retrieval, and sandboxed execution are each individually established — but their **fusion** into a single Test-Driven Autonomous Repair loop with an explicit, persisted Evidence Layer and a dedicated adjudication agent that can **halt the pipeline** rather than always producing an answer.

Most agentic repair tools are optimistic by design: they always produce a patch, leaving the trust evaluation to the human. EpiCenter is pessimistic by design: it will halt and surface the accumulated evidence for manual review rather than produce an unverified fix. The HALT path is a first-class outcome, not a failure mode.

---

## 48. Comparison with Existing Tools

| Feature | GitHub Copilot | Sentry / Datadog | Generic AI Fixer | **EpiCenter (TDAR)** |
|---------|:--------------:|:----------------:|:----------------:|:--------------------:|
| Incident ingestion | ❌ | ✅ | ❌ | **✅** |
| Root-cause diagnosis | ❌ | Partial | Partial | **✅ (multi-source)** |
| Reproducing test generation | ❌ | ❌ | ❌ | **✅** |
| Sandbox-verified test failure | ❌ | ❌ | ❌ | **✅** |
| Deterministic CodeQL corroboration | ❌ | ❌ | ❌ | **✅** |
| Multi-agent independent review | ❌ | ❌ | ❌ | **✅** |
| Blast-radius-bounded patch | ❌ | ❌ | ❌ | **✅** |
| Confidence score breakdown | ❌ | ❌ | ❌ | **✅** |
| Cited PR evidence chain | ❌ | ❌ | ❌ | **✅** |
| Post-merge 48h regression watchdog | ❌ | ❌ | ❌ | **✅** |
| Pipeline halt on low confidence | N/A | N/A | ❌ | **✅** |

---

## 49. Future Scope

- **Multi-repository and monorepo-aware blast-radius analysis** — spanning call graphs that cross package boundaries.
- **Learning from Judge-agent rejections** — using halted runs as negative-example training data to improve future Investigator hypotheses.
- **Expanded static-analysis coverage** — beyond CodeQL to Semgrep rules, Infer (for Java/C), and language-specific linters.
- **Production rollout** of the Terraform/Kubernetes/Firecracker architecture described in [Section 42](#42-production-architecture).
- **Team-level analytics** — recurring fault fingerprint heatmaps and mean-time-to-patch dashboards surfaced via the Confidence Engine's history.
- **Bi-directional APM integration** — direct Sentry/Datadog webhook receivers as ingestion sources without manual cURL.

---

## 50. Advantages

- **Every proposed patch is accompanied by a reproducing regression test**, not just a plausible diff — verifiable by any engineer in seconds.
- **Diagnosis is corroborated by a deterministic, non-LLM evidence source (CodeQL)**, which cannot hallucinate and adds independent confirmation weight.
- **Full evidence chain and agent reasoning is auditable** via persisted Evidence records and Langfuse traces — the reasoning is inspectable, not just the conclusion.
- **Scoped GitHub App permissions and a no-egress sandbox minimize the security blast radius** of any compromise in the AI pipeline.
- **Post-merge Observation Daemon provides a safety net** that most AI-fix tools lack — a bad merge is detected and rolled back autonomously rather than becoming a second incident.

---

## 51. Limitations

- **Effective only on reproducible faults** — issues that cannot be captured in a deterministic regression test (e.g., Heisenbugs, environment-specific failures, race conditions requiring precise timing) fall outside TDAR's guarantee.
- **CodeQL corroboration is only as strong as the query coverage available** for the target language — languages with limited CodeQL query packs produce weaker corroboration signals.
- **BYOK model means output quality and cost vary** with the user's chosen LLM provider — a weaker model may produce lower-quality hypotheses that lower the confidence score.
- **Production-scale architecture (Section 42) is a roadmap item**, not yet implemented or demonstrated — the current system runs on Docker Compose.
- **Confidence scoring is a heuristic aggregation of signals**, not a formal correctness proof — a score of 85% does not mean an 85% probability the patch is correct; it means four independent signals are aligned.

---

## 52. Conclusion

EpiCenter reframes AI-assisted incident remediation around **proof rather than plausibility**: a root-cause hypothesis is only acted on once it is corroborated by independent static analysis and encoded as a failing regression test, and a patch is only proposed once that same test passes. Combined with a persisted, citation-backed Evidence Layer, scoped GitHub App permissions, a no-egress execution sandbox, and a post-merge Observation Daemon, the system is designed so that every step from incident to merged fix is **durable, auditable, and reversible** — giving engineering teams a fast path to a fix they can actually verify rather than one they simply have to trust.

---

## Project Structure

```
EpiCenter/
├── .github/
│   └── workflows/
│       └── ci.yml                   # Go build+test · TypeScript typecheck · Next.js build
├── cmd/
│   └── ingestion/
│       ├── main.go                  # Go Fiber ingestion service (POST /v1/ingest)
│       └── Dockerfile               # Multi-stage production image
├── pkg/
│   ├── scrubber/
│   │   ├── scrubber.go              # 12-pattern PII & secret redaction engine
│   │   └── scrubber_test.go         # Unit tests for all redaction patterns
│   └── fingerprint/                 # SHA-256 fingerprint generation
├── orchestration/                   # Node.js + LangGraph multi-agent engine
│   ├── src/
│   │   ├── graph.ts                 # LangGraph state machine with conditional routing
│   │   ├── agents/
│   │   │   ├── investigator.ts      # AST + CodeQL + Qdrant → root-cause hypothesis
│   │   │   ├── testWriter.ts        # Regression test generation + sandbox verification
│   │   │   ├── surgeon.ts           # Blast-radius-bounded minimal patch
│   │   │   └── judge.ts             # Final adjudication + PR creation gate
│   │   ├── confidence/
│   │   │   └── engine.ts            # Weighted multi-signal confidence formula
│   │   ├── llm/
│   │   │   └── provider.ts          # BYOK abstraction (Claude · GPT-4o · Gemini)
│   │   ├── tools/
│   │   │   ├── sandbox.ts           # E2B microVM wrapper + local simulation fallback
│   │   │   ├── github.ts            # PR creation with cited evidence chain
│   │   │   ├── treesitter.ts        # AST parsing + stack trace → source location
│   │   │   ├── codeql.ts            # CodeQL query runner
│   │   │   ├── qdrant.ts            # Vector search for RAG retrieval
│   │   │   └── blastRadius.ts       # Blast radius computation from implicated symbols
│   │   ├── observability/
│   │   │   └── langfuse.ts          # Fire-and-forget Langfuse tracing wrapper
│   │   └── state/
│   │       └── types.ts             # Shared TypeScript types (EvidenceRecord, etc.)
│   └── package.json
├── workflows/                       # Trigger.dev durable workflow tasks
│   ├── src/
│   │   ├── incidentPipeline.ts      # Main TDAR pipeline task (max 10 min, 3 retries)
│   │   └── observationDaemon.ts     # 48h post-merge fingerprint watchdog
│   └── package.json
├── frontend/                        # Next.js 14 dashboard
│   ├── app/                         # React Server Components
│   ├── components/                  # React Flow graph · SSE terminal · Evidence cards
│   └── package.json
├── db/
│   └── migrations/
│       └── 001_initial_schema.sql   # PostgreSQL schema (6 tables)
├── docker-compose.yml               # Local: PostgreSQL + Qdrant + MinIO + Ingestion
├── .env.example                     # All 19 layers' environment variables
├── go.mod
└── README.md
```

---

## Getting Started

### Prerequisites

- **Docker & Docker Compose** (v24.0+)
- **Go** (v1.22+)
- **Node.js** (v20+) and `npm`
- **E2B API Key** — [e2b.dev](https://e2b.dev) (sandbox execution)
- **Trigger.dev account** — [trigger.dev](https://trigger.dev) (durable workflows)
- One of: **Anthropic / OpenAI / Google AI** API key (BYOK)

### 1. Clone and configure

```bash
git clone https://github.com/Jacksonfio/EpiCenter.git
cd EpiCenter
cp .env.example .env
# Edit .env and fill in your API keys
```

### 2. Start infrastructure

```bash
docker compose up -d postgres qdrant minio
```

### 3. Run the ingestion service

```bash
cd cmd/ingestion
go run main.go
# → Listening on http://localhost:8080
```

### 4. Start Trigger.dev workflows

```bash
cd workflows
npm install
npx trigger.dev@latest dev
```

### 5. Launch the dashboard

```bash
cd frontend
npm install
npm run dev
# → http://localhost:3000
```

### 6. Submit a test incident

```bash
curl -X POST http://localhost:8080/v1/ingest \
  -H "Content-Type: application/json" \
  -d '{
    "project_id": "proj_demo",
    "repository": "Jacksonfio/EpiCenter",
    "payload": {
      "error_message": "TypeError: Cannot read property '\''user_id'\'' of undefined",
      "stack_trace": "TypeError: Cannot read property '\''user_id'\'' of undefined\n    at AuthService.validateToken (/app/src/auth/service.ts:42:18)"
    }
  }'
```

Open the `dashboard_url` from the response to watch the pipeline execute in real time.

---

<div align="center">

**EpiCenter** · Find the Fault. Prove the Fix.

[GitHub](https://github.com/Jacksonfio/EpiCenter) · [MIT License](LICENSE)

</div>
