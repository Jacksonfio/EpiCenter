<div align="center">

<br/>

```
                                      ███████╗██████╗ ██╗ ██████╗███████╗███╗   ██╗████████╗███████╗██████╗
                                      ██╔════╝██╔══██╗██║██╔════╝██╔════╝████╗  ██║╚══██╔══╝██╔════╝██╔══██╗
                                      █████╗  ██████╔╝██║██║     █████╗  ██╔██╗ ██║   ██║   █████╗  ██████╔╝
                                      ██╔══╝  ██╔═══╝ ██║██║     ██╔══╝  ██║╚██╗██║   ██║   ██╔══╝  ██╔══██╗
                                      ███████╗██║     ██║╚██████╗███████╗██║ ╚████║   ██║   ███████╗██║  ██║
                                      ╚══════╝╚═╝     ╚═╝ ╚═════╝╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═╝  ╚═╝
```

### *Find the Fault. Prove the Fix.*

**The world's first Test-Driven Autonomous Repair platform.**<br/>
*From production stack trace to citation-backed GitHub Pull Request — fully automated, fully proven.*

<br/>

[![Go](https://img.shields.io/badge/Go-1.22+-00ADD8?style=for-the-badge&logo=go&logoColor=white)](https://golang.org)
[![Node.js](https://img.shields.io/badge/Node.js-20_LTS-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org)

[![LangGraph](https://img.shields.io/badge/LangGraph-0.2-FF6F61?style=for-the-badge)](https://github.com/langchain-ai/langgraph)
[![Trigger.dev](https://img.shields.io/badge/Trigger.dev-v3-6366F1?style=for-the-badge)](https://trigger.dev)
[![E2B](https://img.shields.io/badge/E2B_Sandbox-Firecracker-5865F2?style=for-the-badge)](https://e2b.dev)
[![CodeQL](https://img.shields.io/badge/CodeQL-Static_Analysis-2088FF?style=for-the-badge)](https://codeql.github.com)

[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://postgresql.org)
[![Qdrant](https://img.shields.io/badge/Qdrant-Vector_DB-DC143C?style=for-the-badge)](https://qdrant.tech)
[![MinIO](https://img.shields.io/badge/MinIO-S3_Storage-C72E49?style=for-the-badge&logo=minio&logoColor=white)](https://min.io)
[![Supabase](https://img.shields.io/badge/Supabase-Auth-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com)

[![Langfuse](https://img.shields.io/badge/Langfuse-AI_Observability-F97316?style=for-the-badge)](https://langfuse.com)
[![React Flow](https://img.shields.io/badge/React_Flow-11-FF0072?style=for-the-badge)](https://reactflow.dev)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://docker.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

<br/>

> **"A plausible patch is not a proven patch."**
>
> EpiCenter is the first platform to treat bug-fixing as an evidence-gathering and adjudication problem,
> not a single-shot generation problem. Every PR it opens is a proof, not a guess.

<br/>

</div>

---

## 📋 Complete System Design Document

---

## Table of Contents

<details>
<summary><strong>Click to expand full table of contents</strong></summary>

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
3. [Motivation](#3-motivation)
4. [Existing Solutions and Their Limitations](#4-existing-solutions-and-their-limitations)
5. [Research Gap](#5-research-gap)
6. [Proposed Solution](#6-proposed-solution)
7. [Core Innovation: TDAR + Evidence Layer](#7-core-innovation-tdar--evidence-layer)
8. [System Goals](#8-system-goals)
9. [Functional Requirements](#9-functional-requirements)
10. [Non-Functional Requirements](#10-non-functional-requirements)
11. [Complete System Architecture](#11-complete-system-architecture)
12. [Component Architecture](#12-component-architecture)
13. [Technology Stack — Full 28-Layer Breakdown](#13-technology-stack--full-28-layer-breakdown)
14. [End-to-End Workflow](#14-end-to-end-workflow)
15. [AI Agent Architecture](#15-ai-agent-architecture)
16. [Investigator Agent — Deep Dive](#16-investigator-agent--deep-dive)
17. [Test Writer Agent — Deep Dive](#17-test-writer-agent--deep-dive)
18. [Surgeon Agent — Deep Dive](#18-surgeon-agent--deep-dive)
19. [Judge Agent — Deep Dive](#19-judge-agent--deep-dive)
20. [Trigger.dev Workflow Engine](#20-triggerdev-workflow-engine)
21. [Evidence Pipeline](#21-evidence-pipeline)
22. [Code Intelligence Engine](#22-code-intelligence-engine)
23. [Tree-sitter — AST Parsing Layer](#23-tree-sitter--ast-parsing-layer)
24. [CodeQL — Static Analysis Layer](#24-codeql--static-analysis-layer)
25. [Qdrant — Semantic Retrieval Layer](#25-qdrant--semantic-retrieval-layer)
26. [Confidence Engine — Scoring System](#26-confidence-engine--scoring-system)
27. [Blast Radius Analysis](#27-blast-radius-analysis)
28. [Evidence Citation System](#28-evidence-citation-system)
29. [GitHub Integration](#29-github-integration)
30. [Execution Environment (E2B)](#30-execution-environment-e2b)
31. [Replay Engine](#31-replay-engine)
32. [Regression Testing Architecture](#32-regression-testing-architecture)
33. [Observation Daemon](#33-observation-daemon)
34. [Security Architecture](#34-security-architecture)
35. [Authentication & Authorization](#35-authentication--authorization)
36. [BYOK API Key Management](#36-byok-api-key-management)
37. [Database Design — Full Schema](#37-database-design--full-schema)
38. [API Specifications — Full Reference](#38-api-specifications--full-reference)
39. [Frontend Dashboard Architecture](#39-frontend-dashboard-architecture)
40. [Real-Time Communication (SSE)](#40-real-time-communication-sse)
41. [Deployment Architecture — Demo](#41-deployment-architecture--demo)
42. [Production Architecture — Roadmap](#42-production-architecture--roadmap)
43. [Scalability Design](#43-scalability-design)
44. [Fault Tolerance & Reliability](#44-fault-tolerance--reliability)
45. [Cost Analysis & Economics](#45-cost-analysis--economics)
46. [Demo Flow — Step by Step](#46-demo-flow--step-by-step)
47. [Novelty Analysis](#47-novelty-analysis)
48. [Comparison with Existing Tools](#48-comparison-with-existing-tools)
49. [Future Scope & Roadmap](#49-future-scope--roadmap)
50. [Advantages](#50-advantages)
51. [Limitations & Honest Tradeoffs](#51-limitations--honest-tradeoffs)
52. [Conclusion](#52-conclusion)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Configuration Reference](#configuration-reference)
- [Contributing](#contributing)
- [License](#license)

</details>

---

## 1. Executive Summary

**EpiCenter** — *"Find the Fault. Prove the Fix."* — is an autonomous incident-to-patch platform built on a fundamentally different principle than every existing AI debugging tool: **proof, not plausibility**.

When a production incident fires — whether a stack trace from Sentry, an APM alert from Datadog, or a raw log line from CloudWatch — EpiCenter does not simply ask an LLM "what should I do?" and hand you the answer. Instead, it builds a **multi-source evidence chain** around the incident by correlating the error signal with structural AST analysis, deterministic static-analysis rules (CodeQL), and semantically similar historical incidents retrieved via vector search (Qdrant). It then encodes that hypothesis as a **failing regression test**, executes the test inside an isolated Firecracker microVM sandbox (E2B) to confirm the bug is reproducible, generates the **minimal possible patch** bounded by a computed blast radius, re-executes the test suite against the patched code to confirm the fix, computes a **multi-signal confidence score**, and — only if the score clears the configured gate threshold — opens a **GitHub Pull Request** containing the patch, the regression test, and a cited evidence chain linking every claim in the PR description back to the specific lines of code, CodeQL rule IDs, and sandbox execution logs that justify it.

This document is a complete design record of EpiCenter covering the finalized 28-layer technology stack, the four-agent AI pipeline (Investigator, Test Writer, Surgeon, Judge), the durable Trigger.dev workflow backbone, the evidence accumulation and confidence architecture, security posture, full data model, complete API reference, frontend architecture, deployment strategy, and the longer-term production roadmap. Every section is written to serve as both a technical specification and a reference for engineers building on or contributing to EpiCenter.

### Key Metrics at a Glance

| Metric | Target |
|--------|--------|
| Time from incident ingest to PR open | < 8 minutes (p95) |
| Minimum confidence to authorize PR | 75% |
| Post-merge observation window | 48 hours |
| Max generated patch blast radius | Bounded to implicated AST symbols |
| Auto-merges to main | **Zero. Ever.** |
| LLM provider lock-in | None — BYOK abstraction layer |
| Network egress from sandbox | **Zero** (firewall enforced) |

---

## 2. Problem Statement

### The Incident Response Tax

When a production incident fires, the response lifecycle typically splits into two phases: **finding the bug** and **fixing the bug**. Engineering teams spend a disproportionate fraction of their time — commonly 70–80% of the total incident lifecycle — on the former. This is the incident response tax: hours of senior engineering time spent correlating stack traces with recent commits, reconstructing execution paths across polyglot service meshes, and building enough internal confidence in a proposed change to survive a code review.

This tax is paid repeatedly and often unnecessarily. The diagnostic work follows recognizable patterns — null dereferences, unhandled rejections, resource leaks, off-by-one errors, missing null checks in hot paths — that a well-instrumented system ought to be able to recognize and diagnose automatically. The knowledge required to map `AuthService.validateToken (/app/src/auth/service.ts:42:18)` to "jwt.decode() returns null for malformed tokens and we never check for it" already exists in the codebase's AST, in the CodeQL rule database, and in the history of similar incidents the team has resolved before. What has been missing is a system that aggregates these signals automatically, verifies the resulting diagnosis against a deterministic test, and presents the result with enough evidence to be trusted.

### The Trust Problem with Existing AI Tools

Existing AI coding assistants (GitHub Copilot, Cursor, Devin-style agents) can generate a patch quickly. The problem is not the speed of generation but the structure of the output: a diff with no attached proof. A reviewer looking at an AI-generated patch for a production bug must independently verify:

- That the LLM correctly understood the root cause from the stack trace
- That the proposed change actually addresses that root cause rather than a symptom
- That the change does not introduce regressions in adjacent code paths
- That the LLM did not hallucinate a plausible-looking but incorrect fix

This verification burden pushes the cognitive load back onto the human reviewer and can take 20–40 minutes for a non-trivial bug — comparable to the time it would have taken to diagnose and fix the bug manually. The AI-generated patch saved code-writing time but not thinking time. EpiCenter is designed to save thinking time by making the reasoning behind a fix verifiable, not just readable.

### The Missing Closure

APM and observability platforms (Sentry, Datadog, New Relic) are excellent at detecting and grouping errors. They surface the stack trace, the affected users, the error frequency, and the deployment timeline. They do not close the loop. A Sentry issue tells you *what* broke and *when*; EpiCenter tells you *why* and *how to fix it*, with proof attached.

---

## 3. Motivation

### Trust Through Evidence, Not Speed

The engineering community's trust in AI-assisted development tools is fragile and hard-won. Every time an AI-generated patch introduces a regression, it erodes the confidence of the team that uses it — often permanently. The teams most in need of AI assistance (small teams, on-call engineers handling unfamiliar services at 3 AM) are also the teams most likely to be harmed by an unproven AI fix that gets merged without thorough review.

EpiCenter is motivated by a specific insight: **trust in AI-generated code is not built by improving the LLM — it is built by making the LLM's reasoning auditable**. When a human reviewer can see not just the patch but also the CodeQL finding that corroborated it, the regression test that fails without it and passes with it, and the blast radius analysis that confirms it does not touch unrelated code paths, the cognitive burden of review drops from "is this correct?" to "do I trust this evidence chain?" The former is an open-ended question; the latter is a structured verification task that takes seconds.

### On-Call Is the Highest-Stress, Lowest-Leverage Activity in Software Engineering

On-call rotation places senior engineers in a reactive, time-pressured, context-switching environment where the diagnostic work is highly repetitive but the cost of mistakes is high. The diagnostic patterns that on-call engineers follow — "check the stack trace, find the implicated service, look for recent changes, write a reproducing test, propose a fix, get it reviewed" — are exactly the patterns that a well-designed automated system should be able to execute independently for the majority of incident types, escalating to humans only when the evidence is insufficient or the confidence score is too low.

EpiCenter is designed to be a force multiplier for on-call engineers: not a replacement for human judgment, but a system that does the pattern-matching and evidence-gathering work in the background so that when the engineer opens the Slack alert, there is already a PR waiting with a diagnosis they can verify in under two minutes instead of spending forty.

---

## 4. Existing Solutions and Their Limitations

### AI Pair-Programming Tools (GitHub Copilot, Cursor, Devin)

These tools are optimized for **greenfield authoring and interactive editing** — suggesting the next line of code, completing a function, or responding to a natural-language instruction in an editor context. They are not designed for the closed-loop workflow of incident → diagnosis → proof → PR. When applied to incident response, they require the engineer to:

1. Manually copy the stack trace into the chat interface
2. Provide context about the codebase that the LLM does not have
3. Evaluate the generated patch without any attached proof of correctness
4. Write a regression test themselves if they want one
5. Monitor the fix after merge manually

None of these limitations are incidental — they reflect the fundamental design of these tools as interactive assistants rather than autonomous incident responders.

### APM and Observability Platforms (Sentry, Datadog, New Relic, Honeycomb)

These platforms are exceptionally good at **error detection, grouping, and alerting**. They provide:
- Structured error grouping by fingerprint
- Stack trace capture and deduplication
- Deployment timeline correlation
- User impact quantification
- Alert routing and escalation policies

What they explicitly do not provide is a diagnosis of *why* the error occurs at the code level, a proposed fix, or a post-fix validation mechanism. They surface the signal and stop. EpiCenter picks up where they leave off.

### Single-Shot AI Auto-Fix Tools

Several newer tools attempt to automatically generate patches for issues detected by CI/CD pipelines or error trackers. The common limitations across these tools:

- **No regression test**: patches are proposed without a reproducing test, so there is no automated way to verify correctness before review
- **No independent corroboration**: the fix is generated by the same model that diagnosed the problem, with no second-opinion source
- **No blast radius guarantee**: patches may modify code outside the logically implicated area, introducing scope creep and merge risk
- **No confidence scoring**: the output is binary (patch or no patch), with no signal about how confident the system is
- **No post-merge safety net**: once a patch is merged, the tool provides no monitoring to detect regressions

---

## 5. Research Gap

There is no widely available system that treats bug-fixing as an **evidence-gathering and adjudication problem** rather than a single-shot generation problem. Specifically missing from the landscape:

**(a) Multi-Agent Separation of Concerns**: In EpiCenter, the agent that generates a patch (Surgeon) is explicitly prohibited from certifying its own correctness. A separate agent (Judge) performs independent verification. This is a fundamental architectural principle missing from single-agent auto-fix tools: the system that makes a claim should never be the same system that validates it.

**(b) LLM + Deterministic Evidence Fusion**: EpiCenter fuses LLM reasoning — which is fast and flexible but can hallucinate — with CodeQL static analysis — which is deterministic, rule-based, and cannot hallucinate — as a non-LLM corroborating evidence source. When both agree, confidence is high. When they disagree, the pipeline halts for human review rather than proceeding with a contradicted hypothesis.

**(c) Durable Replayable Workflow with Post-Merge Monitoring**: EpiCenter's Trigger.dev backbone ensures that every pipeline step is durable (retryable without losing state) and replayable (the exact sandbox execution can be re-run on demand). The post-merge Observation Daemon adds a safety net that no current AI-fix tool provides: if a merged fix regresses, EpiCenter detects it within 30 minutes and opens a Revert PR automatically.

**(d) Test-Gated Patch Generation**: The requirement that a regression test must exist and must be verified as failing before a patch is even generated inverts the usual workflow. Most tools: generate patch → optionally suggest test. EpiCenter: verify bug via test → generate patch → verify fix via same test.

**(e) The HALT Path as a First-Class Outcome**: Most agentic repair tools are optimistic by design — they always produce a patch. EpiCenter treats the HALT path as a legitimate, expected outcome. If the evidence chain is insufficient, the confidence score is below threshold, or the regression test cannot be verified, the pipeline halts and surfaces the accumulated evidence for manual review. This pessimistic design is what makes EpiCenter's output trustworthy when it does produce a fix.

---

## 6. Proposed Solution

EpiCenter is a **six-plane, 28-layer autonomous incident remediation platform** built around the TDAR (Test-Driven Autonomous Repair) principle. The system accepts an incident payload at a single validated REST endpoint, immediately redacts PII and secrets from the payload, deduplicates it against active pipeline runs using a SHA-256 fingerprint, and hands it to a Trigger.dev durable workflow.

The durable workflow drives a LangGraph-orchestrated four-agent pipeline:

1. **Investigator Agent**: Pulls structural AST context from Tree-sitter, retrieves semantically similar historical incidents and fixes from Qdrant via dense vector search, runs targeted CodeQL queries to produce a deterministic corroboration signal, and synthesizes all three evidence sources with the LLM to produce a structured root-cause hypothesis.

2. **Test Writer Agent**: Consumes the hypothesis and produces a regression test designed to fail on the current (buggy) codebase. The test is executed inside an E2B Firecracker microVM sandbox to confirm it fails for the expected reason. If the test passes unexpectedly (the bug is not reproducible), the pipeline halts — no patch is generated for an unverified bug.

3. **Surgeon Agent**: Consumes the confirmed-failing regression test and the Investigator's evidence. Computes the blast radius (the set of files and functions the patch may legally modify) using Tree-sitter AST call graph traversal. Generates the minimal patch that makes the regression test pass, bounded by the blast radius. If the proposed patch would modify any file outside the computed blast radius, it is rejected as scope creep and the pipeline halts for human review.

4. **Judge Agent**: Re-executes the full regression test suite against the Surgeon's patch inside a fresh E2B sandbox. Cross-checks the patch against the CodeQL findings from the Investigator's evidence chain. Computes the final multi-signal confidence score via the Confidence Engine. If the score is ≥75%, the GitHub App opens a Pull Request on a feature branch. If the score is below threshold or the test fails, the pipeline halts and surfaces the full evidence chain for human review.

Every claim in the final PR description is cited back to specific evidence records — file paths and line ranges from Tree-sitter, CodeQL rule IDs, Qdrant retrieval scores, and sandbox log line references — turning the PR into an auditable artifact rather than an AI-generated narrative.

After merge, the Observation Daemon registers the incident's fingerprint on a 48-hour watchlist and automatically opens a Revert PR if the same fault signature reappears in production.

---

## 7. Core Innovation: TDAR + Evidence Layer

### Test-Driven Autonomous Repair (TDAR)

TDAR is EpiCenter's central architectural principle and its primary differentiator. The principle is simple: **no patch is generated until a test exists that reproduces the failure, and no patch is merge-ready until that same test passes against it**.

This inverts the usual AI auto-fix pattern:

```
Traditional pattern:
  Incident → LLM generates patch → (maybe) suggest test → human verifies

TDAR pattern:
  Incident → diagnose → write test → verify test fails → generate patch
           → verify test passes → compute confidence → open PR if ≥75%
```

The TDAR loop creates two inviolable properties:

1. **Every open PR contains a regression test.** Not a suggested test — an executed, verified, sandbox-confirmed test that demonstrably reproduces the reported bug on the pre-patch codebase.

2. **Every open PR's patch has been verified to fix that test.** Not verified by the LLM asserting "this should work" — verified by a deterministic test runner inside an isolated sandbox that returned exit code 0.

These two properties are what turn a plausible AI suggestion into a proven fix.

### The TDAR Flow in Detail

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     TDAR EXECUTION FLOW                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  POST /v1/ingest                                                            │
│       │                                                                     │
│       ▼                                                                     │
│  ┌─────────────────┐   PII redact    ┌──────────────────┐                  │
│  │ Go Fiber        │ ──────────────▶ │ PostgreSQL       │                  │
│  │ Ingestion       │   fingerprint   │ incidents table  │                  │
│  │ Service         │ ──────────────▶ │ (dedup check)    │                  │
│  └────────┬────────┘                 └──────────────────┘                  │
│           │ dispatch                                                        │
│           ▼                                                                 │
│  ┌─────────────────────────────────────────────────────────────────┐       │
│  │                    Trigger.dev Durable Workflow                  │       │
│  │                                                                  │       │
│  │  ┌──────────────┐   hypothesis    ┌──────────────────┐          │       │
│  │  │ INVESTIGATOR │ ─────────────▶  │  TEST WRITER     │          │       │
│  │  │              │                 │                  │          │       │
│  │  │ • Tree-sitter│                 │ • Generate test  │          │       │
│  │  │ • CodeQL     │                 │ • E2B: must FAIL │──┐       │       │
│  │  │ • Qdrant RAG │                 │ • Verify failure │  │       │       │
│  │  └──────────────┘                 └──────────────────┘  │       │       │
│  │                                                          │ halt  │       │
│  │  ┌──────────────┐   patch         ┌──────────────────┐  │       │       │
│  │  │   SURGEON    │ ◀────────────── │ (blast radius ok)│  │       │       │
│  │  │              │                 └──────────────────┘  │       │       │
│  │  │ • Blast radius│                                       │       │       │
│  │  │ • Min patch  │                                        │       │       │
│  │  └──────┬───────┘                                        ▼       │       │
│  │         │ patch             ┌────────────────────┐               │       │
│  │         └──────────────────▶│      JUDGE         │               │       │
│  │                             │                    │               │       │
│  │                             │ • E2B: must PASS   │               │       │
│  │                             │ • Confidence ≥75%? │──────────────▶│       │
│  │                             │ • Open GitHub PR   │   halt if <75 │       │
│  │                             └────────────────────┘               │       │
│  └─────────────────────────────────────────────────────────────────-┘       │
│           │ PR opened                                                        │
│           ▼                                                                 │
│  ┌─────────────────┐                                                        │
│  │ GitHub Pull     │  ← patch + regression test + cited evidence chain      │
│  │ Request         │  ← confidence breakdown table                          │
│  │ (feature branch)│  ← never auto-merged                                   │
│  └────────┬────────┘                                                        │
│           │ merged by human                                                  │
│           ▼                                                                 │
│  ┌─────────────────┐                                                        │
│  │ Observation     │  ← 48h fingerprint watch                               │
│  │ Daemon          │  ← auto Revert PR on regression                        │
│  └─────────────────┘                                                        │
└─────────────────────────────────────────────────────────────────────────────┘
```

### The Evidence Layer

Layered on top of TDAR is the **Evidence Layer** — a structured, append-only record persisted in PostgreSQL of every artifact that contributed to the diagnosis:

| Evidence Type | Source | What it captures |
|---------------|--------|-----------------|
| `AST_CONTEXT` | Tree-sitter | Exact function scope, class hierarchy, and variable bindings around the implicated stack frame |
| `CODEQL_FINDING` | CodeQL | Deterministic rule match: rule ID, severity, precise location, CWE classification |
| `QDRANT_HIT` | Qdrant | Similar past incident ID, similarity score, the confirmed fix that resolved it |
| `SANDBOX_LOG` | E2B | Raw stdout/stderr, exit code, duration, and file system diff from each sandbox execution |
| `TEST_OUTPUT` | E2B + Test Runner | Full test result: which assertions failed, error message, diff from expected |
| `PATCH_DIFF` | Surgeon Agent | Unified diff of the proposed change with function context |
| `BLAST_RADIUS` | Tree-sitter Call Graph | Complete set of files, functions, and call sites within the computed scope |

The Evidence Layer is **intentionally append-only** during a run. Nothing is ever overwritten or deleted. This guarantees:
- The Judge agent sees the complete provenance of the hypothesis, not a summary
- A human reviewer can inspect every intermediate conclusion the system reached
- A failed run with a HALT outcome still produces a useful artifact: the accumulated evidence that explains why the system stopped

---

## 8. System Goals

### Primary Goals

| # | Goal | Metric |
|---|------|--------|
| G1 | Reduce mean time to a reviewable, evidence-backed patch | < 8 minutes from ingest to open PR (p95) |
| G2 | Guarantee every patch has a reproducing regression test | 100% of open PRs — enforced by pipeline gate |
| G3 | Corroborate LLM diagnosis with ≥1 non-LLM evidence source | CodeQL required for any PR with score ≥80% |
| G4 | Keep humans in the approval loop | Zero auto-merges — GitHub App has no merge permission |
| G5 | Full agent observability | 100% of LLM calls traced in Langfuse with prompt + tokens |
| G6 | Detect and revert post-merge regressions | Observation Daemon active for all merged PRs |

### Secondary Goals

| # | Goal |
|---|------|
| G7 | Support polyglot repositories (TypeScript, Python, Go, Java, Ruby) |
| G8 | Support multiple LLM providers under BYOK model |
| G9 | One-command local setup via Docker Compose |
| G10 | Full audit trail of every agent decision persisted in PostgreSQL |
| G11 | No sensitive data (PII, secrets) in LLM context |
| G12 | Demo environment brings up in < 2 minutes on any machine |

---

## 9. Functional Requirements

### Core Pipeline Requirements

| ID | Requirement | Priority | Implementation |
|----|-------------|----------|----------------|
| **FR1** | Accept incident payloads via validated REST endpoint | P0 | Go Fiber `/v1/ingest` |
| **FR2** | Redact PII and secrets before persistence | P0 | `pkg/scrubber` — 12 pattern classes |
| **FR3** | Deduplicate by stable SHA-256 fingerprint | P0 | PostgreSQL `incidents.fingerprint` index |
| **FR4** | Map stack trace frames to precise AST locations | P0 | Tree-sitter per-language parsers |
| **FR5** | Retrieve similar historical context via vector search | P1 | Qdrant dense retrieval, k=5 |
| **FR6** | Run independent static-analysis corroboration | P0 | CodeQL targeted queries |
| **FR7** | Generate regression test that fails on current code | P0 | Test Writer agent + sandbox gate |
| **FR8** | Execute all generated code in isolated, no-egress sandbox | P0 | E2B Firecracker microVM |
| **FR9** | Generate minimal patch bounded by blast radius | P0 | Surgeon agent + blast radius gate |
| **FR10** | Gate PR on multi-signal confidence score ≥75% | P0 | Confidence Engine + Judge gate |
| **FR11** | Open GitHub PR with cited evidence chain | P0 | GitHub App (Octokit) + PR builder |
| **FR12** | Monitor merged fixes 48h, auto-revert on regression | P1 | Observation Daemon (Trigger.dev) |
| **FR13** | Stream live pipeline progress to dashboard | P1 | SSE endpoint + React Flow |

### Dashboard Requirements

| ID | Requirement |
|----|-------------|
| **FR14** | Display real-time pipeline graph with per-agent status |
| **FR15** | Show live confidence score with per-signal breakdown |
| **FR16** | Tail sandbox logs in real time (stdout + stderr) |
| **FR17** | Inspect each evidence record with file citations |
| **FR18** | Display PR status and link on completion |
| **FR19** | Show halt reason with full evidence context on pipeline halt |

### Integration Requirements

| ID | Requirement |
|----|-------------|
| **FR20** | Support Sentry webhook as incident source |
| **FR21** | Support Datadog monitor alert as incident source |
| **FR22** | Support APM alert payload (generic JSON) |
| **FR23** | Support direct API submission for CI/CD integration |

---

## 10. Non-Functional Requirements

### Security

| Attribute | Requirement | Implementation |
|-----------|-------------|----------------|
| Source control access | Least-privilege — feature branches only | GitHub App with `contents:write` scoped to non-protected branches |
| Sandbox isolation | Full kernel isolation, no network egress | E2B Firecracker microVM with disabled network interface |
| Secret storage | Envelope encryption, in-process decryption only | HashiCorp Vault Transit engine |
| Payload sanitization | PII/secret redaction at ingestion boundary | Go scrubber before any persistence or LLM call |
| LLM API keys | Never logged, never persisted in plaintext | Vault-encrypted BYOK keys, decrypted in-process per request |
| Authentication | OAuth 2.0 only, no password storage | Supabase Auth (GitHub + Google OAuth) |

### Reliability

| Attribute | Requirement | Implementation |
|-----------|-------------|----------------|
| Pipeline durability | No step can lose state on transient failure | Trigger.dev durable task with state persistence |
| Retry semantics | All steps retryable with exponential backoff | `maxAttempts: 3, factor: 2, minTimeoutInMs: 1000` |
| Idempotency | Retrying a step produces equivalent output | Stateless agents; sandbox runs are isolated |
| Deduplication | Identical incidents do not spawn duplicate runs | Fingerprint-based dedup on ingest |

### Performance

| Attribute | Target |
|-----------|--------|
| Ingest endpoint latency | < 200ms p99 |
| Time to Investigator output | < 60s |
| Time to regression test verification | < 90s |
| Total pipeline duration (P50) | < 4 minutes |
| Total pipeline duration (P95) | < 8 minutes |
| Dashboard initial load | < 1.5s |
| SSE event delivery latency | < 100ms |

### Observability

| Attribute | Requirement |
|-----------|-------------|
| Agent tracing | 100% of LLM calls traced in Langfuse (prompt, response, tokens, latency) |
| Pipeline state | All workflow steps visible in Trigger.dev dashboard |
| Evidence audit | All evidence records queryable in PostgreSQL |
| Error alerting | All pipeline errors surfaced to dashboard in real time via SSE |

---

## 11. Complete System Architecture

### The Six Planes

EpiCenter's architecture is organized into six logical planes, each with a single, well-defined responsibility. No plane crosses another's boundary directly — all inter-plane communication goes through explicitly defined interfaces.

```
╔═══════════════════════════════════════════════════════════════════════════════╗
║                         EPICENTER SYSTEM ARCHITECTURE                         ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║                                                                               ║
║  ┌─────────────────────────────────────────────────────────────────────────┐  ║
║  │  PLANE 1: INGESTION  (Go 1.22 + Fiber v2)                               │  ║
║  │                                                                         │  ║
║  │  POST /v1/ingest                                                         │  ║
║  │       │                                                                  │  ║
║  │  ┌────▼─────┐   ┌───────────┐   ┌─────────────┐   ┌──────────────────┐ │  ║
║  │  │ Schema   │──▶│ PII/Secret│──▶│ SHA-256     │──▶│ Dedup Check      │ │  ║
║  │  │ Validate │   │ Redaction │   │ Fingerprint │   │ (PostgreSQL)     │ │  ║
║  │  └──────────┘   └───────────┘   └─────────────┘   └────────┬─────────┘ │  ║
║  │                                                              │ unique    │  ║
║  │                                                         ┌────▼──────┐   │  ║
║  │                                                         │ Trigger.dev│  │  ║
║  │                                                         │ dispatch  │   │  ║
║  │                                                         └───────────┘   │  ║
║  └─────────────────────────────────────────────────────────────────────────┘  ║
║                                        │                                       ║
║                                        ▼                                       ║
║  ┌─────────────────────────────────────────────────────────────────────────┐  ║
║  │  PLANE 2: ORCHESTRATION  (Trigger.dev v3 + Node.js + LangGraph 0.2)     │  ║
║  │                                                                         │  ║
║  │  ┌──────────────────────────────────────────────────────────────────┐  │  ║
║  │  │                   LangGraph State Machine                         │  │  ║
║  │  │                                                                  │  │  ║
║  │  │  [Investigator] ──▶ [Test Writer] ──▶ [Surgeon] ──▶ [Judge]     │  │  ║
║  │  │       │                  │               │             │          │  │  ║
║  │  │   [HALT?] ◀──────────[HALT?] ◀──────[HALT?] ◀──────[HALT?]     │  │  ║
║  │  └──────────────────────────────────────────────────────────────────┘  │  ║
║  └─────────────────────────────────────────────────────────────────────────┘  ║
║            │                │                  │                               ║
║            ▼                ▼                  ▼                               ║
║  ┌──────────────┐  ┌──────────────────┐  ┌──────────────────────────────────┐ ║
║  │  PLANE 3:    │  │  PLANE 4:        │  │  PLANE 5: PERSISTENCE            │ ║
║  │  CODE        │  │  EXECUTION       │  │                                  │ ║
║  │  INTELLIGENCE│  │                  │  │  ┌──────────┐  ┌───────────────┐ │ ║
║  │              │  │  E2B Firecracker │  │  │PostgreSQL│  │  Qdrant       │ │ ║
║  │  • Tree-sitter│  │  MicroVM Sandbox │  │  │(6 tables)│  │  (3 collections)│ ║
║  │  • CodeQL    │  │                  │  │  └──────────┘  └───────────────┘ │ ║
║  │  • Qdrant RAG│  │  • Zero-egress   │  │  ┌──────────┐  ┌───────────────┐ │ ║
║  │  • Embeddings│  │  • Replay engine │  │  │  MinIO   │  │  Vault / KMS  │ │ ║
║  └──────────────┘  └──────────────────┘  │  │  (S3)    │  │  (Secrets)    │ │ ║
║                                           │  └──────────┘  └───────────────┘ │ ║
║                                           └──────────────────────────────────┘ ║
║                                        │                                       ║
║                                        ▼                                       ║
║  ┌─────────────────────────────────────────────────────────────────────────┐  ║
║  │  PLANE 6: DELIVERY  (GitHub App + Next.js 14 + SSE)                     │  ║
║  │                                                                         │  ║
║  │  ┌────────────────────┐   ┌───────────────────────────────────────────┐ │  ║
║  │  │ GitHub App         │   │ Next.js Dashboard                         │ │  ║
║  │  │ (Octokit)          │   │ • React Flow pipeline graph                │ │  ║
║  │  │ feature branch only│   │ • Confidence ring + signal breakdown       │ │  ║
║  │  │ PR with citations  │   │ • SSE log terminal                        │ │  ║
║  │  └────────────────────┘   │ • Evidence inspector                      │ │  ║
║  │                            └───────────────────────────────────────────┘ │  ║
║  │  ┌─────────────────────────────────────────────────────────────────────┐ │  ║
║  │  │ Observation Daemon (Trigger.dev) — 48h post-merge watchdog           │ │  ║
║  │  └─────────────────────────────────────────────────────────────────────┘ │  ║
║  └─────────────────────────────────────────────────────────────────────────┘  ║
╚═══════════════════════════════════════════════════════════════════════════════╝
```

**End-to-end canonical flow:**
```
Client → Go /v1/ingest → Trigger.dev Workflow → LangGraph Agents
       → E2B Execution Environment → GitHub PR → Observation Daemon
```

---

## 12. Component Architecture

### Boundary Contracts

Each component in EpiCenter enforces strict boundary contracts. No component can write to another component's domain without going through a defined interface. This design contains the blast radius of any single component's failure, compromise, or incorrect behavior.

| Component | Can Read From | Can Write To | Cannot Touch |
|-----------|--------------|--------------|--------------|
| Ingestion Service | Client request body | `incidents` table, Trigger.dev queue | Evidence, agent state |
| Investigator Agent | Incident payload, AST, CodeQL, Qdrant | `evidence` table (append only) | Source control |
| Test Writer Agent | Investigator state, E2B sandbox | `evidence` table (append only) | Source control, DB writes |
| Surgeon Agent | Test Writer state, blast radius | `evidence` table (append only) | Source control |
| Judge Agent | All prior state | `confidence_scores`, GitHub API | DB schema, agent state |
| GitHub App | Branch-scoped token | Feature branches, PR comments | Protected branches, admin |
| Observation Daemon | `watchlist`, new incidents | `watchlist.status`, new Revert PRs | Pipeline state |

---

## 13. Technology Stack — Full 28-Layer Breakdown

EpiCenter's 28-layer stack was designed on the principle of **single-responsibility per layer**: each technology solves exactly one problem, and no technology is trusted with more than one concern. The layering below moves from the system boundary inward through execution, intelligence, persistence, delivery, and observability.

### Layer 1 — Ingestion Service: Go 1.22 + Fiber v2

**Why Go?** Go's combination of static typing, compiled performance, minimal runtime overhead, and straightforward concurrency model (goroutines + channels) makes it ideal for a high-throughput ingestion boundary. The ingestion service is the highest-volume entry point in the system — it must parse, validate, redact, and fingerprint every incident payload with minimal latency.

**Why Fiber?** Fiber is built on top of fasthttp, which is significantly faster than net/http for I/O-bound workloads. It provides an Express-style routing API that is familiar and concise, built-in middleware for CORS, rate limiting, request logging, and panic recovery, and a zero-allocation response builder for JSON endpoints.

**What it handles:**
- Schema validation of incoming `IncidentPayload` JSON
- 12-pattern PII/secret redaction via the `pkg/scrubber` engine
- SHA-256 fingerprint generation for deduplication
- PostgreSQL dedup check (prevents duplicate pipeline runs for the same error signature)
- Trigger.dev workflow dispatch
- Health check endpoint (`GET /healthz`) for load balancer probes

**Performance target:** < 200ms p99 for the full ingest path including DB write.

```go
// Ingestion service core handler (simplified)
func ingestHandler(db *pgxpool.Pool) fiber.Handler {
    return func(c *fiber.Ctx) error {
        var req IncidentPayload
        if err := c.BodyParser(&req); err != nil {
            return fiber.NewError(fiber.StatusBadRequest, err.Error())
        }
        // Redact → Fingerprint → Dedup → Persist → Dispatch
        s := scrubber.New()
        req.Payload.StackTrace = s.Scrub(req.Payload.StackTrace)
        fingerprint := generateFingerprint(req.Repository, req.Payload.ErrorMessage, req.Payload.StackTrace)
        // ... dedup check, persist, dispatch to Trigger.dev
    }
}
```

---

### Layer 2 — Secret Redaction: Go `pkg/scrubber` (12 Pattern Classes)

**Why a dedicated scrubber at the boundary?** Once a payload containing a secret reaches PostgreSQL or an LLM context, it is extremely difficult to fully remove. The scrubber acts as a security airgap at the ingestion boundary, ensuring that no sensitive data persists downstream.

**Pattern classes covered:**

| Pattern | Example Match | Replacement |
|---------|---------------|-------------|
| Generic API keys | `api_key=sk_live_abc123xyz` | `api_key=[REDACTED_KEY]` |
| AWS Access Key IDs | `AKIAIOSFODNN7EXAMPLE` | `[REDACTED_AWS_KEY_ID]` |
| AWS Secret Access Keys | `aws_secret_access_key=wJalrXUtnFEMI/K7MD...` | `aws_secret_access_key=[REDACTED]` |
| JWT tokens | `eyJhbGciOiJIUzI1NiJ9.eyJ...` | `[REDACTED_JWT]` |
| PostgreSQL/MySQL URLs | `postgres://user:pass@host/db` | `[REDACTED_DB_URL]` |
| GitHub Personal Access Tokens | `ghp_xxxxxxxxxxxxxxxxxxxx` | `[REDACTED_GITHUB_PAT]` |
| Slack tokens | `xoxb-123456789-abcdef` | `[REDACTED_SLACK_TOKEN]` |
| Generic passwords | `password=mysecret` | `password=[REDACTED]` |
| Email addresses | `user@example.com` | `[REDACTED_EMAIL]` |
| IPv4 addresses | `192.168.1.100` | `[REDACTED_IP]` |
| Credit card numbers | `4111111111111111` | `[REDACTED_CC]` |
| Private key headers | `-----BEGIN RSA PRIVATE KEY-----` | `[REDACTED_PRIVATE_KEY]` |

---

### Layer 3 — Workflow Orchestration: Trigger.dev v3

**Why Trigger.dev?** Durable workflow execution is the foundational reliability requirement for EpiCenter. A pipeline run that includes LLM calls, sandbox executions, and GitHub API interactions has many points of transient failure — rate limits, cold starts, network timeouts, model overload. Without a durable execution engine, a single timeout anywhere in the pipeline would require restarting the entire run from scratch, losing all accumulated evidence.

Trigger.dev v3 provides:

- **Durable step execution**: Each agent invocation, sandbox run, and GitHub API call is a separately checkpointed step. A failure at step N restores from step N-1's persisted state.
- **Configurable retry policy**: Per-task retry configuration with exponential backoff prevents thundering-herd effects on retries.
- **Real-time execution dashboard**: The Trigger.dev UI shows the live status of every workflow step, which SSE proxies to the EpiCenter frontend.
- **Background tasks**: The Observation Daemon runs as a long-lived Trigger.dev task without blocking the main pipeline.
- **Type-safe task definitions**: TypeScript-native task definitions with full type inference.

```typescript
// Trigger.dev task with retry configuration
export const incidentPipelineTask = task({
  id: "epicenter.incident-pipeline",
  maxDuration: 600,           // 10-minute hard ceiling
  retry: {
    maxAttempts: 3,
    factor: 2,
    minTimeoutInMs: 1000,
    maxTimeoutInMs: 30_000,
  },
  run: async (payload, { ctx }) => {
    const graph = buildEpiCenterGraph();
    return await graph.invoke(payload);
  },
});
```

---

### Layer 4 — Agent Orchestration: Node.js 20 + LangGraph 0.2

**Why LangGraph?** Multi-agent pipelines with shared state, conditional routing, and human-in-the-loop patterns are exactly what LangGraph is designed for. LangGraph's state machine model maps naturally to TDAR's requirements:

- Each agent is a node in the graph with a defined input/output contract
- Conditional edges implement the HALT routing logic
- The `Annotation.Root` schema enforces that all evidence is accumulated, not overwritten
- The state is serializable, enabling replay and inspection

**Why Node.js for the agent layer?** The LangChain/LangGraph ecosystem is most mature in the JavaScript/TypeScript ecosystem. The TypeScript agent code is strictly typed end-to-end, with Zod schemas validating LLM JSON outputs before they are trusted by downstream agents.

**State machine routing:**

```typescript
// Conditional routing — halt if test was not verified failing
function routeAfterTestWriter(state: PipelineStateType): string {
  if (!state.testFailureVerified) return "halt";
  return "surgeon";
}

// Conditional routing — halt if patch violates blast radius
function routeAfterSurgeon(state: PipelineStateType): string {
  if (state.blastRadiusViolation || !state.patchCode) return "halt";
  return "judge";
}
```

---

### Layer 5 — Execution Sandbox: E2B (Firecracker MicroVM)

**Why E2B?** E2B provides hosted Firecracker microVM sandboxes via a clean SDK. Firecracker is the same isolation technology used by AWS Lambda — it provides full virtual machine isolation at the kernel level, not just container-level namespace isolation. This means:

- Generated code runs in a fully isolated kernel context
- No process can escape the VM boundary
- The network interface can be fully disabled (zero-egress enforcement)
- The filesystem is ephemeral and never persists between runs

**Security properties enforced:**

```
┌─────────────────────────────────────────────────────────────┐
│  E2B Firecracker MicroVM Boundary                            │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Generated Code Execution Context                    │   │
│  │                                                     │   │
│  │  • Test Runner (vitest / pytest / go test)          │   │
│  │  • Patch application                                │   │
│  │  • No outbound network connections                  │   │
│  │  • Ephemeral filesystem (wiped after run)           │   │
│  │  • 120s maximum execution timeout                   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  VM exits → results returned via E2B API (not network)      │
└─────────────────────────────────────────────────────────────┘
```

**Docker fallback for local development:** When `E2B_API_KEY` is not set, the sandbox wrapper falls back to a simulation mode that returns deterministic mock outputs, enabling full pipeline development without E2B credentials.

---

### Layer 6 — Static Analysis: CodeQL

**Why CodeQL?** CodeQL provides something LLMs cannot: **deterministic, rule-based, non-probabilistic analysis**. A CodeQL query does not "think" a null dereference is present — it either finds the data-flow path that produces the null dereference or it does not. This makes CodeQL findings a qualitatively different type of evidence than LLM assertions: they are reproducible, inspectable, and cannot hallucinate.

**How CodeQL is used in EpiCenter:**

1. The Investigator agent identifies the implicated files from the stack trace
2. CodeQL runs targeted queries against those files:
   - `js/dereferenced-null-optional` — null/undefined property access
   - `js/unhandled-promise-rejection` — unhandled async rejections
   - `js/resource-leak` — resources not closed in all paths
   - `py/none-dereference` — Python None attribute access
   - `go/nil-dereference` — Go nil pointer dereference
3. If CodeQL findings match the LLM's hypothesis, confidence rises (+30%)
4. If CodeQL findings contradict the hypothesis, the pipeline halts

**CodeQL in the confidence formula:**

```
CodeQL corroborates hypothesis → S_codeql = 100 → contribution = 30 points
CodeQL finds nothing (neutral) → S_codeql = 30  → contribution = 9 points
CodeQL contradicts hypothesis  → pipeline halts immediately
```

---

### Layer 7 — AST Parsing: Tree-sitter

**Why Tree-sitter?** Stack traces contain file paths and line numbers — for example, `AuthService.validateToken (/app/src/auth/service.ts:42:18)`. Mapping this to "the `validateToken` function, which is a method on the `AuthService` class, which accepts a `string` parameter, which calls `jwt.decode()` at line 42" requires structural code understanding, not text search.

Tree-sitter provides:
- **Incremental parsing**: Parses only the changed portions of files during re-analysis
- **Error-tolerant parsing**: Produces a valid partial AST even for syntactically incorrect code
- **Language-specific grammars**: Distinct grammars for TypeScript, JavaScript, Python, Go, Java, Ruby, Rust, C/C++
- **Query language**: S-expression patterns for extracting functions, classes, imports, and variable bindings

**Stack trace → AST context pipeline:**

```
Stack frame: "at AuthService.validateToken (/app/src/auth/service.ts:42:18)"
                                           │
                           ┌───────────────┘
                           ▼
                Tree-sitter parses src/auth/service.ts
                           │
                           ▼
                Locates function node containing line 42:
                  • function: validateToken
                  • class: AuthService
                  • parameters: (token: string)
                  • return type: User
                  • body: lines 38–55
                  • local variables: decoded (jwt.JwtPayload | null)
                           │
                           ▼
                Extracts ±10 lines of structural context
                + caller/callee graph from AST
                           │
                           ▼
                EvidenceRecord { type: "AST_CONTEXT", citation: { file, 38, 55 } }
```

---

### Layer 8 — Semantic Retrieval: Qdrant (Dense Vector Store)

**Why Qdrant?** Qdrant is a purpose-built vector database optimized for similarity search over dense embeddings. Unlike general-purpose databases with vector extensions (PostgreSQL with pgvector), Qdrant provides:
- **HNSW indexing** for sub-millisecond k-NN search at scale
- **Payload filtering**: Combine vector similarity with structured filters (e.g., "similar to this error, in the same repository, resolved within the last 90 days")
- **Quantization**: Scalar and product quantization for memory-efficient storage of large embedding collections
- **REST + gRPC APIs**: Low-latency retrieval via gRPC for production, REST for development

**Qdrant collections in EpiCenter:**

| Collection | Content | Embedding Source | k for retrieval |
|------------|---------|-----------------|-----------------|
| `epicenter-incidents` | Past error messages, stack traces, and confirmed fix summaries | OpenAI `text-embedding-3-small` | 5 |
| `epicenter-functions` | AST-extracted function signatures and docstrings | Code embedding model | 10 |
| `epicenter-commits` | Commit messages + diffs for blame correlation | OpenAI `text-embedding-3-small` | 3 |

**RAG retrieval in the Investigator agent:**

```typescript
// Qdrant retrieval for similar past incidents
const qdrantResults = await searchQdrant({
  query: `${state.errorMessage}\n${state.stackTrace}`,
  collectionName: "epicenter-incidents",
  limit: 5,
  // Payload filter: same repository, resolved incidents only
  filter: {
    must: [
      { key: "repository", match: { value: state.repository } },
      { key: "status", match: { value: "RESOLVED" } },
    ],
  },
});
// Each hit: { score: 0.91, payload: { incidentId, hypothesis, patchSummary } }
```

---

### Layer 9 — Relational Database: PostgreSQL 16

**Why PostgreSQL?** PostgreSQL is the most capable open-source relational database for structured, queryable, transactional data — exactly what EpiCenter's Evidence Layer requires. Key PostgreSQL features used:

- **JSONB columns**: The `incidents.payload` column stores the full incident payload as structured JSON, enabling field-level querying without a rigid schema for every possible APM format
- **TIMESTAMPTZ**: All timestamps use timezone-aware types to avoid timezone ambiguity in distributed deployments
- **GIN indexes on JSONB**: Fast JSON field extraction for incident payload queries
- **Row-level security (production)**: Per-tenant data isolation via Supabase RLS policies
- **`gen_random_uuid()`**: Server-side UUID generation for all primary keys
- **Append-only `evidence` table**: Enforced at the application layer — no UPDATE or DELETE on evidence records

**Schema overview:**

```sql
-- Six core tables
projects          -- Repository and GitHub App installation metadata
incidents         -- Ingested, redacted incident payloads
evidence          -- Append-only evidence records (7 types)
confidence_scores -- Per-run weighted signal breakdown
patch_citations   -- PR claim → evidence record mappings
watchlist         -- Post-merge fingerprint monitoring
```

---

### Layer 10 — Authentication: Supabase Auth

**Why Supabase Auth?** Supabase Auth provides a complete, production-grade OAuth 2.0 implementation with GitHub and Google providers, JWT-based session tokens, and Row Level Security (RLS) policy integration out of the box. EpiCenter never stores passwords, never manages session rotation manually, and benefits from Supabase's existing security audit and compliance posture.

**Session scoping:** An authenticated Supabase session is mapped to a GitHub App installation, which determines which repositories the user can view incidents for. A user who authenticated with GitHub OAuth can only see incidents for repositories where they have the GitHub App installed — preventing cross-tenant data access.

---

### Layer 11 — Object Storage: MinIO (S3-Compatible)

**Why MinIO?** MinIO provides S3-compatible object storage that runs locally in Docker Compose (for development) and can be pointed at any S3-compatible cloud storage (AWS S3, Google Cloud Storage, Cloudflare R2) in production via a single endpoint configuration change.

**What is stored in MinIO:**

| Bucket Path | Content | Retention |
|-------------|---------|-----------|
| `artifacts/sandbox/{runId}/stdout.txt` | Raw sandbox stdout | 30 days |
| `artifacts/sandbox/{runId}/stderr.txt` | Raw sandbox stderr | 30 days |
| `artifacts/tests/{incidentId}/regression.test.ts` | Generated regression test file | Permanent |
| `artifacts/patches/{incidentId}/patch.diff` | Unified diff of Surgeon's patch | Permanent |
| `artifacts/replay/{runId}/session.json` | Complete Replay Engine session bundle | 30 days |
| `reports/{incidentId}/evidence.pdf` | Downloadable evidence report | 7 days |

---

### Layer 12 — Secrets Management: HashiCorp Vault / Cloud KMS

**Why Vault?** BYOK (Bring Your Own Key) means EpiCenter stores API keys on behalf of users. This is a high-responsibility operation that requires proper encryption-at-rest with key hierarchy separation. HashiCorp Vault's Transit engine provides:

- **Envelope encryption**: The user's API key is encrypted with a Data Encryption Key (DEK), which is itself encrypted with a Key Encryption Key (KEK) stored in Vault. The plaintext DEK never touches disk.
- **Audit log**: Every encrypt and decrypt operation is logged with the caller identity and timestamp.
- **Key rotation**: KEKs can be rotated without re-encrypting stored data (Vault re-wraps the DEK automatically).
- **In-process-only decryption**: The plaintext API key is decrypted in RAM, used for the duration of one LLM call, and then discarded.

**BYOK encryption flow:**

```
User provides API key
        │
        ▼
Ingestion Service → Vault Transit: encrypt(apiKey, keyName="epicenter/user/{userId}")
        │
        ▼
Vault returns ciphertext → stored in PostgreSQL users.llm_key_encrypted
        │
        ▼  (at LLM call time)
Agent process → Vault Transit: decrypt(ciphertext) → plaintext in RAM
        │
        ▼
LLM API call made with plaintext key
        │
        ▼
Plaintext key garbage collected — never logged, never persisted
```

---

### Layer 13 — GitHub Integration: GitHub App + Octokit

**Why GitHub App over PAT?** A Personal Access Token has the permissions of the user who created it — often repository admin or org admin level. A GitHub App installation token has only the permissions explicitly requested by the App manifest, scoped to the specific repositories the App is installed on. For EpiCenter:

**App permissions requested:**
```yaml
permissions:
  contents: write       # Allowed: feature branches only (protected branch rules enforced)
  pull_requests: write  # Allowed: create and update PRs
  checks: write         # Allowed: post check run status
  metadata: read        # Allowed: repository metadata

# Explicitly NOT requested:
# - administration: none
# - organization_administration: none
# - repository_hooks: none
# - secrets: none
```

**Branch protection:** EpiCenter enforces that the target `main` or `master` branch has protection rules enabled. The App cannot push to protected branches — only to `epicenter/fix-{incidentId[:8]}` feature branches that it creates.

---

### Layer 14 — Post-Merge Monitoring: Observation Daemon

**Why a post-merge daemon?** The pre-merge pipeline verifies the fix against a regression test, but no test suite is complete. A fix that passes the regression test may still regress other behavior not covered by the new test. The Observation Daemon addresses this by monitoring the real production error stream after merge.

**Implementation:** A Trigger.dev `task` with a 48-hour `maxDuration` that polls the `incidents` table every 30 minutes for new incidents with a fingerprint matching the merged fix. The SHA-256 fingerprint used for matching is identical to the one computed at ingestion time, ensuring that even if the error arrives via a different reporting path (Sentry webhook vs. direct API), it will be recognized as a recurrence of the same fault.

---

### Layer 15 — AI Observability: Langfuse

**Why Langfuse?** EpiCenter is an AI-powered product — its central thesis is that AI-generated code should be verifiable. It would be intellectually inconsistent to not apply the same principle to EpiCenter's own LLM usage. Langfuse provides:

- **Prompt tracing**: Every prompt sent to every LLM is recorded with its full content and the response received
- **Token accounting**: Per-agent token usage is tracked, enabling cost attribution per pipeline run
- **Latency profiling**: Identifies which agent's LLM calls are slowest and should be optimized
- **Session grouping**: All four agents' calls in a single pipeline run are grouped under one Langfuse session for easy correlation

**Langfuse in EpiCenter dogfoods the product's thesis:** Just as EpiCenter provides an audit trail for AI-generated patches, Langfuse provides an audit trail for EpiCenter's own AI reasoning. This is not accidental — it is a design principle.

---

### Layer 16 — Frontend Framework: Next.js 14 (App Router)

**Why Next.js 14?** The App Router (introduced in Next.js 13, stabilized in 14) provides React Server Components, which render on the server and stream HTML to the client — ideal for the initial dashboard load where the incident list and static UI elements do not need client-side JavaScript. Client Components (`"use client"`) are used only where interactivity is needed: the incident submission form, the React Flow pipeline graph, and the SSE log terminal.

---

### Layer 17 — Pipeline Visualization: React Flow 11

**Why React Flow?** The live pipeline graph is a key UX element of EpiCenter — it makes the otherwise abstract concept of a multi-agent AI pipeline tangible and inspectable. React Flow provides:

- **Custom node types**: The `AgentNode` component renders per-agent status (idle, running, done, halted, error) with colored borders and shadow glows
- **Animated edges**: Edges between nodes animate when the downstream agent is the current active node
- **Fit view**: The graph automatically fits to the viewport on initial render
- **Minimap and controls**: Built-in navigation UI that can be styled to match the dark theme

---

### Layer 18 — Styling: Tailwind CSS 3 + shadcn/ui

**Why Tailwind?** Tailwind's utility-first approach enables the rapid iteration required during a hackathon while producing a design system that is maintainable at scale. The custom `tailwind.config.js` extends the base palette with EpiCenter's design system: agent-specific colors (`agent-investigator`, `agent-testwriter`, `agent-surgeon`, `agent-judge`), glow animations, and glassmorphism utility classes.

**Why shadcn/ui over a component library?** shadcn/ui provides copy-pasteable, unstyled Radix UI primitives that EpiCenter owns fully — there is no external dependency to manage, no version conflicts, and no design constraints imposed by someone else's visual language.

---

### Layer 19 — Real-Time Communication: Server-Sent Events (SSE)

**Why SSE over WebSockets?** The dashboard-to-backend communication in EpiCenter is **unidirectional**: the backend pushes pipeline progress and sandbox log lines to the frontend. The frontend never needs to push data back over the same channel. SSE is architecturally simpler for this use case:

- **HTTP/1.1 and HTTP/2 compatible**: No special infrastructure (WebSocket proxy, sticky sessions) required
- **Built-in reconnection**: The browser's EventSource API reconnects automatically on connection loss
- **Firewall-friendly**: SSE uses standard HTTP, which passes through corporate firewalls and CDNs without special configuration
- **Native browser support**: No client-side library required

---

### Layer 20 — LLM Abstraction: Provider-Agnostic BYOK Layer

**Why abstract the LLM provider?** Locking EpiCenter to a single LLM provider would limit its usefulness for teams with existing API agreements, compliance requirements, or cost constraints. The BYOK abstraction layer (implemented in `orchestration/src/llm/provider.ts`) wraps three providers behind a single `BaseChatModel` interface from LangChain:

| Provider | Model | Strengths for EpiCenter use case |
|---------|-------|----------------------------------|
| Anthropic Claude | claude-sonnet-4-5 | Best-in-class instruction following; reliable JSON output |
| OpenAI | gpt-4o | Strong code understanding; well-documented |
| Google | gemini-1.5-pro | Long context window (useful for large files); competitive pricing |

The `temperature: 0.1` setting across all providers minimizes hallucination variance while preserving enough diversity for hypothesis generation.

---

### Layer 21 — Code Embedding: OpenAI text-embedding-3-small

**Why text-embedding-3-small for code?** The embedding model used to index code into Qdrant must produce representations where semantically similar errors map to geometrically nearby vectors. `text-embedding-3-small` (1536 dimensions) achieves strong code similarity performance at a cost of ~$0.02 per million tokens — substantially cheaper than `text-embedding-3-large` with acceptable accuracy for incident retrieval.

For production deployments with higher accuracy requirements, `text-embedding-3-large` or a dedicated code embedding model (CodeBERT, UniXcoder) can be substituted via the same Qdrant embedding interface.

---

### Layer 22 — Confidence Scoring: Multi-Signal Engine

The Confidence Engine is a standalone TypeScript module (`orchestration/src/confidence/engine.ts`) that computes a weighted aggregate of four independent signals. It is deliberately separate from any agent's LLM context — the confidence score is computed by deterministic arithmetic, not by asking the LLM "how confident are you?"

See [Section 26](#26-confidence-engine--scoring-system) for the complete scoring specification.

---

### Layer 23 — Container Orchestration: Docker Compose (Demo)

**Why Docker Compose for the demo?** Docker Compose provides a single-file, declarative infrastructure definition that brings up a consistent, reproducible environment on any machine with Docker installed. For a hackathon demo, reproducibility is paramount — the last thing you want is an environment setup failure during a live presentation.

**Services defined:**
```yaml
services:
  postgres:   # PostgreSQL 16 with schema auto-migration
  qdrant:     # Qdrant vector store
  minio:      # MinIO S3-compatible storage
  ingestion:  # Go Fiber service (multi-stage Dockerfile)
```

---

### Layer 24 — Production Container: Kubernetes + Firecracker (Roadmap)

For production scale, the Docker Compose infrastructure is replaced with:
- **Kubernetes** (EKS or GKE) for container orchestration with HPA for agent worker pools
- **Firecracker MicroVMs** self-hosted for sandbox isolation at high concurrency
- **Managed PostgreSQL** (AWS RDS Aurora / Cloud SQL) with read replicas
- **Managed Qdrant Cloud** with automatic codebase re-indexing

**Note:** This layer is a stated production roadmap, not implemented in the demo.

---

### Layer 25 — Infrastructure as Code: Terraform (Roadmap)

All production infrastructure is defined as Terraform modules targeting AWS or GCP, ensuring reproducible environment provisioning, state management, and cost visibility. Modules include: VPC, EKS cluster, RDS PostgreSQL, Cloud KMS, S3 buckets, and CloudFront distribution for the frontend.

---

### Layer 26 — CI/CD: GitHub Actions

**Three workflows:**
1. **`ci.yml`**: Go build + test, TypeScript typecheck, Next.js build — runs on every push and PR
2. **`deploy-staging.yml`** (roadmap): Automated deployment to staging environment on merge to `main`
3. **`codeql-scan.yml`** (roadmap): CodeQL analysis of EpiCenter's own codebase — dogfooding the product

---

### Layer 27 — Testing Framework: Vitest (Frontend/Orchestration) + Go test

**Go testing:** Standard `go test ./...` with race detection (`-race`) and coverage reporting. The `pkg/scrubber` package has unit tests for all 12 redaction patterns.

**TypeScript testing:** Vitest for the orchestration engine unit tests, covering:
- Confidence Engine scoring formula correctness
- LangGraph state machine routing logic
- Agent output parsing and schema validation

---

### Layer 28 — Monitoring & Alerting: Prometheus + Grafana (Roadmap)

In production, the ingestion service exposes a `/metrics` endpoint in Prometheus format. Key metrics:
- `epicenter_incidents_total{status}` — incident pipeline runs by status
- `epicenter_pipeline_duration_seconds` — histogram of end-to-end pipeline time
- `epicenter_confidence_score` — histogram of final confidence scores
- `epicenter_sandbox_duration_seconds` — E2B execution latency
- `epicenter_llm_tokens_total{agent,provider}` — LLM token usage by agent and provider

---

### Complete 28-Layer Stack Reference Table

| # | Layer | Technology | Version | Concern |
|---|-------|-----------|---------|---------|
| 1 | Ingestion Service | Go + Fiber | 1.22 / v2.52 | High-throughput HTTP ingestion |
| 2 | Secret Redaction | Go `pkg/scrubber` | custom | PII/secret removal at boundary |
| 3 | Workflow Orchestration | Trigger.dev | v3 | Durable, retryable pipeline execution |
| 4 | Agent Orchestration | Node.js + LangGraph | 20 LTS / 0.2 | Stateful multi-agent graph |
| 5 | Execution Sandbox | E2B (Firecracker) | latest | Isolated, no-egress code execution |
| 6 | Static Analysis | CodeQL | latest | Deterministic non-LLM corroboration |
| 7 | AST Parsing | Tree-sitter | 0.22 | Polyglot structural code parsing |
| 8 | Semantic Retrieval | Qdrant | latest | Dense vector k-NN for RAG |
| 9 | Relational Database | PostgreSQL | 16 | Transactional source of truth |
| 10 | Authentication | Supabase Auth | latest | OAuth 2.0 (GitHub + Google) |
| 11 | Object Storage | MinIO (S3) | latest | Artifact and log persistence |
| 12 | Secrets Management | HashiCorp Vault | 1.16 | Envelope encryption for BYOK keys |
| 13 | GitHub Integration | GitHub App + Octokit | latest | Scoped PR creation |
| 14 | Post-Merge Monitoring | Observation Daemon | custom | 48h regression watchdog |
| 15 | AI Observability | Langfuse | v3 | LLM prompt + token tracing |
| 16 | Frontend Framework | Next.js 14 | 14.2 | React Server + Client Components |
| 17 | Pipeline Visualization | React Flow | 11 | Live agent graph rendering |
| 18 | Styling | Tailwind CSS + shadcn/ui | 3.4 | Design system |
| 19 | Real-Time Communication | Server-Sent Events | native | Server-to-client push |
| 20 | LLM Abstraction | LangChain (BYOK) | 0.3 | Provider-agnostic LLM interface |
| 21 | Code Embedding | OpenAI text-embedding-3-small | latest | Semantic code indexing for Qdrant |
| 22 | Confidence Scoring | Custom Engine | custom | Multi-signal weighted scoring |
| 23 | Demo Orchestration | Docker Compose | v2.27 | One-command local environment |
| 24 | Production Containers | Kubernetes + Firecracker | roadmap | Production-scale isolation |
| 25 | Infrastructure as Code | Terraform | roadmap | Reproducible cloud provisioning |
| 26 | CI/CD | GitHub Actions | latest | Automated build, test, deploy |
| 27 | Testing | Vitest + Go test | latest | Unit and integration testing |
| 28 | Monitoring | Prometheus + Grafana | roadmap | Production metrics and alerting |

---

## 14. End-to-End Workflow

### Step 1: Incident Ingestion

An incident payload arrives at `POST /v1/ingest`. The Go Fiber server:
1. Parses and validates the JSON against the `IncidentPayload` schema
2. Checks that required fields (`project_id`, `repository`, `payload.error_message`) are present
3. Applies all 12 scrubber patterns to `error_message`, `stack_trace`, and each `context_log` entry
4. Computes `SHA-256(repository + "|" + errorMessage + "|" + stackTrace)` as the fingerprint
5. Checks PostgreSQL: does an active pipeline run already exist for this fingerprint? If yes, returns `409 Conflict` with the existing incident ID
6. Writes the incident to PostgreSQL with status `QUEUED`
7. Dispatches a Trigger.dev workflow run with the incident ID and metadata
8. Returns `202 Accepted` with `{ incident_id, fingerprint, workflow_run_id, dashboard_url }`

### Step 2: Workflow Initialization

The Trigger.dev `incidentPipeline` task starts. It:
1. Persists the initial workflow context to Trigger.dev's durable state store
2. Publishes `agent:start` SSE event to the dashboard: `{ agent: "investigator" }`
3. Invokes the LangGraph state machine via `graph.invoke(payload)`

### Step 3: Investigator Agent

The Investigator agent executes three parallel evidence-gathering operations:

**3a. Tree-sitter AST Parsing:**
- Fetches the implicated files from the repository via GitHub API (using the App installation token)
- Parses each file with the appropriate Tree-sitter grammar
- Locates the exact function node containing the stack-trace line number
- Extracts: function name, class name, parameters, return type, local variables, ±10 lines of structural context
- Records an `AST_CONTEXT` evidence record with file:line citation

**3b. Qdrant Semantic Retrieval:**
- Generates a dense embedding of `errorMessage + "\n" + stackTrace` using `text-embedding-3-small`
- Queries the `epicenter-incidents` Qdrant collection for the 5 most similar past incidents
- Queries the `epicenter-functions` collection for the 10 most similar function signatures
- Records `QDRANT_HIT` evidence records for each result above a similarity threshold of 0.75

**3c. CodeQL Static Analysis:**
- Runs targeted CodeQL queries against the implicated file paths
- Checks for patterns matching the error type (null dereference, resource leak, etc.)
- Records `CODEQL_FINDING` evidence records for each finding above severity `medium`

**3d. LLM Hypothesis Synthesis:**
- Constructs a structured prompt containing the error signal, AST context, CodeQL findings, and Qdrant hits
- Calls the BYOK LLM at `temperature: 0.1`
- Parses the JSON response: `{ hypothesis, rootCauseType, implicatedFiles, implicatedFunctions, confidence }`
- Validates the response with Zod schema before trusting it downstream
- Traces the full prompt + response in Langfuse

### Step 4: Test Writer Agent

1. Receives the Investigator's structured hypothesis + full evidence state
2. Calls the BYOK LLM to generate a regression test targeting the implicated function(s)
3. Validates the LLM response structure with Zod
4. Writes the generated test file to an E2B Firecracker sandbox
5. Executes the test with the appropriate test runner command
6. Checks exit code: **must be non-zero** (the test must fail on the current code)
7. Records `TEST_OUTPUT` evidence with full stdout/stderr
8. If test passes unexpectedly → update state: `testFailureVerified = false`, trigger halt routing

### Step 5: Surgeon Agent

1. Receives test-verified state + full evidence
2. Calls `computeBlastRadius()`: traverses the Tree-sitter call graph ±1 hop from implicated symbols to compute the allowable edit scope
3. Records `BLAST_RADIUS` evidence: `{ files: [...], functions: [...], callSites: [...] }`
4. Calls the BYOK LLM to generate a minimal patch, constrained by the blast radius
5. Validates the patch structure with Zod
6. Checks all patched file paths against the blast radius set: **any file outside the set triggers a halt**
7. Records `PATCH_DIFF` evidence with the unified diff
8. If blast radius violated → update state: `blastRadiusViolation = true`, trigger halt routing

### Step 6: Judge Agent

1. Receives patch + full evidence state
2. Writes patch files into a fresh E2B sandbox (isolated from the Test Writer's sandbox)
3. Re-executes the regression test against the patched code: **must exit 0**
4. If test fails → halt: `testPassedAfterPatch = false`
5. Calls `computeConfidence()` with all four signals
6. If `confidence.total < 75` → halt: `haltReason = "Confidence below threshold"`
7. If all gates pass → calls `openPullRequest()` via GitHub App

### Step 7: GitHub PR Creation

1. Gets a short-lived installation token from the GitHub App
2. Creates feature branch `epicenter/fix-{incidentId[:8]}` from `main` HEAD
3. Commits the regression test file to the branch
4. Commits the patch (individual file updates)
5. Constructs the PR body: hypothesis, confidence breakdown table, evidence chain citations
6. Opens the PR via Octokit: `base: main, head: epicenter/fix-{...}`
7. Records PR URL and number in pipeline state
8. Publishes `pipeline:complete` SSE event to dashboard

### Step 8: Post-Merge Monitoring

When the PR is merged (detected via GitHub webhook):
1. Observation Daemon task starts (or was pre-scheduled at PR creation time)
2. Registers fingerprint in `watchlist` table with `watch_until = NOW() + 48h`
3. Polls every 30 minutes: `SELECT id FROM incidents WHERE fingerprint = $1 AND created_at > $2 AND id != $3`
4. If recurrence found → opens Revert PR with link to original incident and evidence chain
5. If 48 hours elapse with no recurrence → marks watchlist entry as `EXPIRED`

---

## 15. AI Agent Architecture

### Design Principles

**Principle 1 — Narrow Responsibility:** Each agent has exactly one job. The Investigator does not generate code. The Test Writer does not diagnose. The Surgeon does not validate. The Judge does not generate. Narrow responsibility makes each agent's output testable and its failure modes predictable.

**Principle 2 — No Self-Certification:** The agent that generates a patch (Surgeon) is explicitly prohibited from certifying its own correctness. A separate agent (Judge) performs independent verification. This is the multi-agent equivalent of separation of duties.

**Principle 3 — Evidence Accumulation:** State flowing through the graph is additive. Each agent appends to the `evidence` array but never removes or overwrites a prior evidence record. The Judge agent makes its final decision with access to every piece of evidence gathered by the three preceding agents.

**Principle 4 — Halt is a First-Class Outcome:** Three out of four agents have a halt path. A HALT with the full evidence chain is a more valuable output than a low-confidence patch with no evidence.

**Principle 5 — JSON-Validated LLM Outputs:** Every LLM response is parsed as JSON and validated with a Zod schema before being trusted by the downstream agent. If the LLM returns malformed JSON or missing required fields, the agent retries with an explicit correction prompt before failing.

### State Schema

```typescript
// Full pipeline state — all agents read/write to this shared schema
const PipelineState = Annotation.Root({
  // Input fields (from ingestion)
  incidentId: Annotation<string>(),
  repository: Annotation<string>(),
  stackTrace: Annotation<string>(),
  errorMessage: Annotation<string>(),

  // Investigator outputs
  hypothesis: Annotation<string | null>({ default: () => null }),
  implicatedFiles: Annotation<string[]>({ default: () => [] }),
  implicatedFunctions: Annotation<string[]>({ default: () => [] }),
  codeqlFindings: Annotation<string[]>({ default: () => [] }),
  investigatorConfidence: Annotation<number>({ default: () => 0 }),

  // Test Writer outputs
  regressionTestCode: Annotation<string | null>({ default: () => null }),
  testFailureVerified: Annotation<boolean>({ default: () => false }),
  sandboxTestRunId: Annotation<string | null>({ default: () => null }),

  // Surgeon outputs
  patchCode: Annotation<string | null>({ default: () => null }),
  patchedFiles: Annotation<string[]>({ default: () => [] }),
  blastRadiusFiles: Annotation<string[]>({ default: () => [] }),
  blastRadiusViolation: Annotation<boolean>({ default: () => false }),

  // Judge outputs
  testPassedAfterPatch: Annotation<boolean>({ default: () => false }),
  finalConfidenceScore: Annotation<number>({ default: () => 0 }),
  confidenceBreakdown: Annotation<Record<string, number>>({ default: () => ({}) }),
  pullRequestUrl: Annotation<string | null>({ default: () => null }),

  // Pipeline control
  pipelineStatus: Annotation<string>({ default: () => "RUNNING" }),
  haltReason: Annotation<string | null>({ default: () => null }),

  // Evidence (reducer: additive only — never overwrites)
  evidence: Annotation<EvidenceRecord[]>({
    default: () => [],
    reducer: (existing, incoming) => [...existing, ...incoming],
  }),
});
```

---

## 16. Investigator Agent — Deep Dive

### System Prompt

```
You are the Investigator agent in EpiCenter's TDAR pipeline.

Your job is root-cause analysis, not patch generation. You will never write code.

Given a stack trace, error message, and multi-source evidence (AST context,
CodeQL findings, similar historical incidents), you must:

1. Identify the single most likely root cause category:
   NULL_DEREFERENCE | RACE_CONDITION | OFF_BY_ONE | MISSING_NULL_CHECK |
   RESOURCE_LEAK | UNHANDLED_EXCEPTION | IMPROPER_AUTH | TYPE_ERROR |
   ASYNC_ORDERING | MISSING_ERROR_HANDLING | OTHER

2. Name the specific file(s) and function(s) implicated by the stack trace
   and corroborated by the evidence.

3. Explain the mechanism by which the error occurs — the data flow that leads
   from a possible input or state to the observed failure.

4. Rate your confidence from 0-100. Be calibrated:
   - 90+: Stack trace points directly to the root cause, CodeQL confirms it,
     and a similar incident has been resolved with a matching fix before.
   - 70-89: Stack trace is clear, CodeQL confirms OR historical match exists,
     but not both.
   - 50-69: Stack trace is clear but no external corroboration.
   - Below 50: Stack trace is ambiguous; external corroboration is needed.

Respond ONLY with valid JSON. Do not include markdown fences or explanation text.
```

### Evidence Integration Logic

The Investigator synthesizes three independent evidence sources. The weight given to each source in the prompt is:

```
1. Stack trace + error message: HIGHEST WEIGHT
   — The literal error signal from production

2. Tree-sitter AST context: HIGH WEIGHT
   — Structural ground truth about the implicated code

3. CodeQL findings: HIGH WEIGHT (non-LLM source)
   — Deterministic rule match; cannot hallucinate

4. Qdrant RAG hits: MEDIUM WEIGHT
   — Historical prior art; may or may not apply to this exact case
```

### Output Contract

```typescript
interface InvestigatorOutput {
  hypothesis: string;           // Concise root-cause description (1-2 sentences)
  rootCauseType: RootCauseType; // Enum: NULL_DEREFERENCE, RACE_CONDITION, etc.
  implicatedFiles: string[];    // Relative file paths from repo root
  implicatedFunctions: string[];// Function/method names
  reasoning: string;            // Step-by-step reasoning chain
  confidence: number;           // 0-100 self-assessed confidence
}
```

---

## 17. Test Writer Agent — Deep Dive

### System Prompt

```
You are the Test Writer agent in EpiCenter's TDAR pipeline.

Your sole job is to write ONE regression test that:
1. WILL FAIL on the current (buggy) codebase
2. Precisely encodes the production error — same error type, same location
3. Is the MINIMUM test that demonstrates the bug — no unrelated assertions
4. Matches the project's existing test framework and style conventions

You will be given:
- The Investigator's root-cause hypothesis
- The implicated files and functions
- The original error message and stack trace

Rules:
- Do not write multiple tests. Write exactly one test function.
- The test must call the implicated function(s) with inputs that trigger the bug.
- The test must assert that the specific error no longer occurs after the fix.
- Use the existing test framework (jest/vitest/pytest/go-test) — do not introduce new ones.

Respond with valid JSON only.
```

### Two-Gate Verification

The Test Writer enforces a two-gate model:

**Gate 1 (must pass to continue):** Test exits non-zero on current codebase.
```
Exit code 0 on current code → HALT
  "Regression test passed unexpectedly. The bug may not be reproducible
   via this test vector. Hypothesis confidence is insufficient."
```

**Gate 2 (applied by Judge, not Test Writer):** Same test exits 0 on patched codebase.

### Test Framework Detection

The Test Writer detects the project's test framework from the repository's `package.json`, `pyproject.toml`, `go.mod`, or `pom.xml` to ensure the generated test is syntactically compatible with the existing suite and can be run without installing additional dependencies.

| Language | Detection File | Framework Candidates |
|----------|---------------|---------------------|
| TypeScript/JS | `package.json` | vitest, jest, mocha |
| Python | `pyproject.toml` / `requirements.txt` | pytest, unittest |
| Go | `go.mod` | `go test` (built-in) |
| Java | `pom.xml` / `build.gradle` | JUnit 5, TestNG |
| Ruby | `Gemfile` | RSpec, minitest |

---

## 18. Surgeon Agent — Deep Dive

### System Prompt

```
You are the Surgeon agent in EpiCenter's TDAR pipeline.

Your job is to write the SMALLEST possible patch that makes the failing
regression test pass without modifying unrelated code.

You are operating under strict scope constraints:
- You may ONLY edit files listed in the BLAST RADIUS
- You may ONLY modify functions listed in the BLAST RADIUS
- Any change outside the blast radius will be rejected automatically

Rules for a surgical patch:
- Add only what is necessary to fix the root cause
- Do not refactor surrounding code
- Do not rename variables or functions
- Do not add comments unless they are essential to understanding the fix
- Do not change function signatures unless the bug requires it
- Do not add logging or debugging statements

The patch must be minimal enough that a reviewer can verify it in under
60 seconds. If the fix requires extensive changes, the blast radius
computation is likely too broad — flag this rather than proceeding.

Respond with valid JSON only.
```

### Blast Radius Enforcement

The Surgeon receives the computed blast radius before generating the patch. After generation, the system enforces:

```typescript
const patchedFilePaths = parsed.patchedFiles.map(f => f.path);
const violations = patchedFilePaths.filter(fp => !blastRadius.files.includes(fp));

if (violations.length > 0) {
  return {
    blastRadiusViolation: true,
    haltReason: `Patch violates blast radius: attempted to edit ${violations.join(", ")} which are outside the computed scope [${blastRadius.files.join(", ")}]`,
  };
}
```

This check is performed by the orchestration layer, not by the LLM — it is a deterministic guard that the Surgeon cannot bypass.

---

## 19. Judge Agent — Deep Dive

### Adjudication Logic

The Judge agent is the only agent that does not call the LLM for its primary decision. The pass/fail determination is made deterministically:

```
1. Run regression test against patched code in E2B sandbox
2. Check exit code:
   - exit 0 → testPassedAfterPatch = true
   - exit ≠ 0 → halt: "Patch did not fix the regression test"

3. Compute confidence score (deterministic arithmetic):
   - testSignal = testPassedAfterPatch ? 100 : 0 (× 35% weight)
   - codeqlSignal = codeqlFindings.length > 0 ? 100 : 30 (× 30% weight)
   - blastSignal = !blastRadiusViolation ? 100 : 0 (× 15% weight)
   - llmSignal = investigatorConfidence (× 20% weight)
   - total = weighted sum

4. Check threshold:
   - total ≥ 75 → authorize PR
   - total < 75 → halt: "Confidence below threshold"

5. If authorized → open GitHub PR via Octokit
```

The Judge does call the LLM in one optional case: to generate a one-paragraph English summary of the evidence chain that is included in the PR description alongside the structured citation table. This is the only LLM call in the Judge that produces output included in the PR.

---

## 20. Trigger.dev Workflow Engine

### Durable Step Model

Every agent invocation in the pipeline is wrapped in a Trigger.dev `step.run()` call. This means:

1. The step's input and output are persisted to Trigger.dev's database before and after execution
2. If the step fails (LLM timeout, network error, sandbox cold start), Trigger.dev retries from the persisted input — no upstream work is lost
3. If the entire process crashes (OOM, deployment, spot instance preemption), the workflow resumes from the last completed step on restart
4. The Trigger.dev dashboard shows the live status of each step, which the EpiCenter SSE endpoint proxies to the frontend

### Retry Policy Detail

```typescript
retry: {
  maxAttempts: 3,
  factor: 2,           // Exponential backoff multiplier
  minTimeoutInMs: 1000, // First retry after 1 second
  maxTimeoutInMs: 30_000, // Maximum backoff: 30 seconds
  randomize: true,     // Jitter to prevent thundering herd
}
```

**Retry scenarios handled:**
- LLM provider rate limit (429) — backoff + retry
- LLM provider timeout — retry with fresh connection
- E2B sandbox cold start (first request latency) — retry after 5s
- GitHub API rate limit (403) — backoff + retry
- Transient PostgreSQL connection error — retry with connection pool

### Observation Daemon as a Long-Lived Task

```typescript
export const observationDaemonTask = task({
  id: "epicenter.observation-daemon",
  maxDuration: 3600 * 48, // 48 hours hard ceiling
  run: async (payload) => {
    // Poll every 30 minutes for 48 hours
    for (let check = 0; check < 96; check++) {
      const recurrence = await checkForRecurrence(payload.fingerprint, payload.mergedAt);
      if (recurrence) {
        await openRevertPR(payload, recurrence);
        return { status: "REGRESSION_DETECTED" };
      }
      await wait.for({ minutes: 30 }); // Trigger.dev durable sleep
    }
    return { status: "WATCH_EXPIRED" };
  },
});
```

The `wait.for({ minutes: 30 })` call is a Trigger.dev-native durable sleep — the task does not hold an active thread for 30 minutes; it is suspended and re-awakened by Trigger.dev at the scheduled time. This is why a 48-hour daemon can run cheaply without holding a persistent connection.

---

## 21. Evidence Pipeline

### Append-Only Design

The `evidence` table has no UPDATE or DELETE grants in the application's database user. All evidence records are `INSERT`-only. This is enforced at three levels:

1. **Database grants**: The application user has `INSERT SELECT` on `evidence`, no `UPDATE DELETE`
2. **LangGraph reducer**: The `evidence` field uses an additive reducer — `(existing, incoming) => [...existing, ...incoming]`
3. **Application code**: The `EvidenceRecord` TypeScript type is `Readonly<...>` — no mutation after creation

### Evidence Record Lifecycle

```
Agent executes tool call
         │
         ▼
Tool returns result
         │
         ▼
Agent creates EvidenceRecord {
  id: uuid(),
  incidentId: state.incidentId,
  type: "CODEQL_FINDING",
  label: "CodeQL: js/dereferenced-null-optional at auth/service.ts:42",
  content: "Property access on possibly-null value...",
  codeqlRuleId: "js/dereferenced-null-optional",
  citation: { filePath: "src/auth/service.ts", startLine: 42, endLine: 42 },
  createdAt: new Date().toISOString(),
}
         │
         ▼
Returns { evidence: [newRecord] } from agent node
         │
         ▼
LangGraph reducer appends to state.evidence[]
         │
         ▼
Trigger.dev persists updated state (durable checkpoint)
         │
         ▼
SSE event published: "evidence:added" → dashboard updates
         │
         ▼
On pipeline completion: all evidence bulk-inserted to PostgreSQL
```

### Evidence Citation in Pull Requests

Each Evidence record's citation is used by the PR builder to generate a hyperlinked reference:

```markdown
**[CODEQL_FINDING]** Null dereference confirmed
Rule: `js/dereferenced-null-optional` · Severity: HIGH
→ [src/auth/service.ts#L42](../../blob/main/src/auth/service.ts#L42)
```

This is what makes EpiCenter PRs different from AI-generated PRs from other tools — every claim is a clickable link to the exact evidence that supports it.

---

## 22. Code Intelligence Engine

The Code Intelligence Engine (CIE) is the collective name for the three services that ground the agents in **the actual codebase** rather than the LLM's parametric memory. The LLM's training data about a codebase is:

- **Stale**: training cutoffs mean the LLM has never seen recent commits
- **Incomplete**: most private codebases have never been in any training set
- **Hallucination-prone**: the LLM may confidently describe code that does not exist

The CIE addresses all three limitations by providing real-time, repository-specific, deterministic context at inference time.

### CIE Query Flow

```
Stack trace arrives at Investigator agent
                │
    ┌───────────┼────────────┐
    ▼           ▼            ▼
Tree-sitter   CodeQL      Qdrant
AST Parse     Query       k-NN Search
    │           │            │
    ▼           ▼            ▼
AST context  Findings    Historical hits
    │           │            │
    └───────────┼────────────┘
                ▼
     Unified evidence → LLM synthesis
```

---

## 23. Tree-sitter — AST Parsing Layer

### What Tree-sitter Provides That Regex Cannot

A regex-based stack trace mapper can find the file and line number. It cannot tell you:
- Whether line 42 is inside a `try` block
- Whether the variable accessed at line 42 has a `nullable` annotation in the type system
- Which other functions call `validateToken()` (the callers that might also need patching)
- Whether `decoded` at line 42 is the same variable as `decoded` at line 38 or a different binding

Tree-sitter's concrete syntax tree provides all of this structural information.

### Language Support Matrix

| Language | Grammar | Stack Trace Pattern | Test Framework |
|----------|---------|---------------------|----------------|
| TypeScript | `tree-sitter-typescript` | `at Cls.fn (file.ts:L:C)` | vitest, jest |
| JavaScript | `tree-sitter-javascript` | `at fn (file.js:L:C)` | vitest, jest, mocha |
| Python | `tree-sitter-python` | `File "file.py", line L` | pytest |
| Go | `tree-sitter-go` | `goroutine N: fn (file.go:L)` | go test |
| Java | `tree-sitter-java` | `at pkg.Cls.fn(File.java:L)` | JUnit 5 |
| Ruby | `tree-sitter-ruby` | `file.rb:L:in 'method'` | RSpec |
| Rust | `tree-sitter-rust` | `at file.rs:L:C` | cargo test |

### AST Query Example (TypeScript)

```scheme
; Tree-sitter query: find the function containing a specific line
(function_declaration
  name: (identifier) @fn-name
  body: (statement_block) @fn-body)

(method_definition
  name: (property_identifier) @method-name
  body: (statement_block) @method-body)
```

The query engine finds all function/method nodes, then filters to the one whose byte range contains the target line number. The result includes the full function source, its parent class, and its parameter types — exactly the context the Investigator needs.

---

## 24. CodeQL — Static Analysis Layer

### Why CodeQL is a Different Class of Evidence

A CodeQL finding is not an LLM opinion. It is a formally verified data-flow or control-flow path through the Abstract Syntax Tree of the code, checked against a rule that has been authored, reviewed, and tested by the CodeQL team at GitHub. When CodeQL says "there is a path from line 38 where `decoded` can be null to line 42 where `decoded.user_id` is accessed without a null check", it means the TypeScript compiler-level AST has a provable data-flow path through which null can reach that property access.

This is qualitatively different from an LLM saying "the code looks like it might have a null dereference" — one is a formal static analysis result, the other is pattern matching on token sequences.

### CodeQL Integration Architecture

```
Investigator agent identifies implicated files
              │
              ▼
CodeQL runner clones repo (ephemeral, sandbox-local)
              │
              ▼
Creates CodeQL database for target language
              │
              ▼
Runs targeted query set for the diagnosed root cause type:
  NULL_DEREFERENCE → js/dereferenced-null-optional
                   → js/null-dereference
  RESOURCE_LEAK    → js/resource-leak
  ASYNC_ERROR      → js/unhandled-promise-rejection
              │
              ▼
Returns SARIF-formatted results
              │
              ▼
Results parsed into EvidenceRecord { type: "CODEQL_FINDING", ... }
              │
              ▼
Confidence signal: findings.length > 0 ? 100 : 30
```

### CodeQL and Confidence Interaction

| CodeQL Result | Effect on Pipeline |
|---------------|-------------------|
| Findings that corroborate hypothesis | `codeqlSignal = 100`, pipeline continues |
| No findings (neutral) | `codeqlSignal = 30`, pipeline continues with lower confidence |
| Findings that contradict hypothesis (different root cause found) | Pipeline halts: "CodeQL contradicts LLM hypothesis" |

---

## 25. Qdrant — Semantic Retrieval Layer

### Why Vector Similarity for Incident Retrieval

Error messages and stack traces are not exact-match queries. Two incidents may be caused by the same root cause but surface with slightly different error messages (different object shapes, different call paths, different user inputs). Vector similarity search finds these semantically equivalent incidents even when the text differs.

### Embedding Strategy

```typescript
// Incident indexing pipeline (runs on each new RESOLVED incident)
const embedding = await openai.embeddings.create({
  model: "text-embedding-3-small",
  input: `
ERROR: ${incident.errorMessage}
STACK: ${incident.stackTrace}
ROOT CAUSE: ${incident.resolvedHypothesis}
FIX SUMMARY: ${incident.patchSummary}
  `.trim(),
});

await qdrant.upsert("epicenter-incidents", {
  points: [{
    id: incident.id,
    vector: embedding.data[0].embedding,
    payload: {
      repository: incident.repository,
      status: "RESOLVED",
      hypothesis: incident.resolvedHypothesis,
      patchSummary: incident.patchSummary,
      rootCauseType: incident.rootCauseType,
      resolvedAt: incident.resolvedAt,
    },
  }],
});
```

### Similarity Thresholds

```typescript
// Only return hits above a meaningful similarity threshold
const results = qdrantResults.filter(r => r.score >= 0.75);
// Score interpretation:
//   0.90+: Nearly identical error in the same codebase — high prior art value
//   0.80-0.89: Same root cause type in similar code — useful context
//   0.75-0.79: Related error pattern — marginal value
//   < 0.75: Not surfaced to the Investigator
```

### RAG in the Confidence Formula

Qdrant hits do not directly contribute to the confidence score. Instead, they increase the quality of the Investigator's hypothesis (via better LLM context), which indirectly raises the LLM self-confidence signal (`S_llm`). A well-corroborated hypothesis from the Investigator produces a higher `investigatorConfidence` value, which flows through to the Judge's final score calculation.

---

## 26. Confidence Engine — Scoring System

### Formula Specification

$$C = (S_{test} \times 0.35) + (S_{codeql} \times 0.30) + (S_{blast} \times 0.15) + (S_{llm} \times 0.20)$$

Where each signal $S_i \in [0, 100]$.

### Signal Definitions

| Signal | Symbol | Weight | Score = 100 when... | Score = 0 when... |
|--------|--------|--------|---------------------|-------------------|
| Regression Test | $S_{test}$ | 35% | Test fails pre-patch AND passes post-patch | Either condition fails |
| CodeQL | $S_{codeql}$ | 30% | ≥1 CodeQL finding corroborates hypothesis | Active contradiction found |
| Blast Radius | $S_{blast}$ | 15% | Patch within computed blast radius | Patch violates blast radius |
| LLM Assessment | $S_{llm}$ | 20% | Investigator self-confidence = 100 | Investigator self-confidence = 0 |

**Special cases:**

- `S_codeql = 30` when CodeQL runs but finds nothing (neutral, not contradiction) — acknowledges that no CodeQL finding is not the same as a contradicting finding
- `S_llm` is the raw Investigator confidence value (0–100), passed through without modification
- If `S_blast = 0` (blast radius violation), the pipeline halts before the Judge computes the score — so in practice, `S_blast` is always 100 in any PR that gets opened

### Score Interpretation

| Score Range | Interpretation | Action |
|-------------|---------------|--------|
| 90–100 | All four signals fully corroborated | PR opened — very high confidence |
| 80–89 | Test passes, CodeQL corroborates, LLM confident | PR opened — high confidence |
| 75–79 | Test passes, minor weakness in CodeQL or LLM signals | PR opened — threshold met, reviewers should check carefully |
| 65–74 | Test passes but CodeQL neutral and LLM below-average confidence | HALT — below threshold |
| 0–64 | Test fails, or blast radius violation, or very low LLM confidence | HALT — insufficient evidence |

### Worked Example

**Scenario:** Null dereference in `validateToken()`, CodeQL corroborates, Investigator confidence 80.

```
S_test   = 100 (test fails pre-patch, passes post-patch)
S_codeql = 100 (CodeQL found js/dereferenced-null-optional)
S_blast  = 100 (patch within src/auth/service.ts only)
S_llm    = 80  (Investigator reported 80% confidence)

C = (100 × 0.35) + (100 × 0.30) + (100 × 0.15) + (80 × 0.20)
C = 35 + 30 + 15 + 16
C = 96%

→ PR authorized (96% ≥ 75% threshold)
```

---

## 27. Blast Radius Analysis

### Definition

The blast radius of a bug fix is the **minimum set of files, functions, and call sites that must be modified to resolve the root cause without introducing regressions**. Computing this set prevents two failure modes:

1. **Too narrow**: The patch only fixes the immediate site but leaves related callers vulnerable
2. **Too broad**: The patch modifies unrelated code, increasing review surface and regression risk

### Computation Algorithm

```
1. Start with the Investigator's implicated_files and implicated_functions
   (these are the directly observed locations from the stack trace + AST)

2. Expand via Tree-sitter call graph (±1 hop):
   For each implicated function F:
     a. Find all callers of F in the repository
     b. Find all callees of F that the patch may affect
     c. Add to blast_radius if they share the same data-flow path
        as the diagnosed root cause

3. Filter: remove standard library functions, test files, generated files

4. Result: { files: [...], functions: [...], callSites: [...] }
```

### Example: Null Dereference in `validateToken`

```
Directly implicated:
  src/auth/service.ts → validateToken()

Callers (1 hop out):
  src/middleware/auth.ts → authMiddleware() (calls validateToken)
  src/routes/user.ts → userRoute() (calls authMiddleware)

Callees (1 hop in):
  jwt.decode() — external library, excluded from blast radius

Blast radius result:
  files: ["src/auth/service.ts", "src/middleware/auth.ts"]
  functions: ["validateToken", "authMiddleware"]
  callSites: ["src/middleware/auth.ts:18", "src/routes/user.ts:34"]
```

The Surgeon may only edit `src/auth/service.ts` and `src/middleware/auth.ts`. It cannot touch `src/routes/user.ts` without a blast radius violation — even though `userRoute` calls into the affected code path.

---

## 28. Evidence Citation System

### Citation Architecture

Every PR opened by EpiCenter includes a structured evidence table and citation links. The PR builder (`orchestration/src/tools/github.ts`) maps each claim in the PR description to a specific evidence record:

```typescript
// Citation mapping: PR claim → evidence record
interface PatchCitation {
  claimText: string;    // "jwt.decode() returns null for invalid tokens"
  evidenceId: string;   // UUID of the AST_CONTEXT or CODEQL_FINDING record
  evidenceType: string; // "CODEQL_FINDING"
  filePath?: string;    // "src/auth/service.ts"
  lineRange?: [number, number]; // [38, 55]
  codeqlRuleId?: string; // "js/dereferenced-null-optional"
}
```

### Generated PR Description Structure

```markdown
## 🟢 EpiCenter — Confidence: 96%

> *Every claim below is cited to a specific evidence record.*

### Root-Cause Hypothesis
jwt.decode() returns null for invalid or malformed tokens, but
validateToken() at auth/service.ts:42 accesses decoded.user_id
without a null check, producing a TypeError.

### Confidence Breakdown
| Signal | Result | Weight | Score |
|--------|--------|--------|-------|
| 🧪 Regression Test | PASS ✓ | 35% | 35.0 |
| 🔬 CodeQL | CORROBORATED ✓ | 30% | 30.0 |
| 📐 Blast Radius | WITHIN BOUNDS ✓ | 15% | 15.0 |
| 🤖 LLM Confidence | 80/100 | 20% | 16.0 |
| **Total** | | | **96.0%** |

### Evidence Chain (4 records)

- **[AST_CONTEXT]** validateToken() scope — [src/auth/service.ts#L38-L55](...)
- **[CODEQL_FINDING]** js/dereferenced-null-optional — [src/auth/service.ts#L42](...)
  Rule: `js/dereferenced-null-optional` · Severity: HIGH
- **[QDRANT_HIT]** Similar incident #inc_abc123 resolved 2026-07-18 with matching fix
- **[TEST_OUTPUT]** Regression test FAILED pre-patch, PASSED post-patch (1.234s)

### This PR Contains
1. **Patch**: `src/auth/service.ts` — adds null check before decoded.user_id access
2. **Regression Test**: `tests/auth.regression.test.ts` — reproduces the production error

### Post-Merge Safety
Observation Daemon will monitor this fingerprint for **48 hours**.
Auto-Revert PR will be opened if the same error recurs.
```

---

## 29. GitHub Integration

### App Manifest

```json
{
  "name": "EpiCenter",
  "description": "Test-Driven Autonomous Repair — Find the Fault. Prove the Fix.",
  "default_permissions": {
    "contents": "write",
    "pull_requests": "write",
    "checks": "write",
    "metadata": "read"
  },
  "default_events": ["push", "pull_request", "check_run"]
}
```

### Installation Token Flow

```
1. GitHub App installed on repository "owner/repo"
   → Stores installation_id in projects table

2. At PR creation time:
   a. Generate JWT from App private key (valid 10 minutes)
   b. POST /app/installations/{installation_id}/access_tokens
   c. Receive installation token (valid 1 hour, scoped to installation)
   d. Use token for all Octokit calls in this pipeline run
   e. Token expires — never persisted or reused

3. Branch operations:
   GET /repos/{owner}/{repo}/git/refs/heads/{base}   → get base SHA
   POST /repos/{owner}/{repo}/git/refs               → create feature branch
   PUT /repos/{owner}/{repo}/contents/{path}         → commit files
   POST /repos/{owner}/{repo}/pulls                  → open PR
```

### Branch Protection Enforcement

Before creating a PR, EpiCenter checks the repository's branch protection rules:
- If `main` branch requires PR reviews → good, human approval is guaranteed
- If `main` has no protection → EpiCenter adds a warning to the PR description: "⚠️ This repository has no branch protection on main. Please require at least one review before merging."
- EpiCenter never disables or bypasses branch protection rules — it has no admin permissions to do so

---

## 30. Execution Environment (E2B)

### Sandbox Lifecycle

```
Judge/TestWriter requests sandbox execution
              │
              ▼
E2B API: POST /sandboxes (template: base-ubuntu or language-specific)
              │
              ▼
Firecracker MicroVM boots (typically 300-800ms cold start)
              │
              ▼
Files written to sandbox filesystem:
  - Target source files (fetched from repository)
  - Generated test file
  - Patch files (for post-patch runs)
  - Required config files (package.json, tsconfig.json, etc.)
              │
              ▼
Command executed: "npx vitest run tests/regression.test.ts"
              │
              ▼
Output streams captured (stdout + stderr)
Max timeout: 120 seconds per command
              │
              ▼
Results returned: { exitCode, stdout, stderr, durationMs }
              │
              ▼
Sandbox killed (E2B API: DELETE /sandboxes/{id})
Filesystem wiped — no state persists
```

### Zero-Egress Enforcement

```
Inside the Firecracker MicroVM:
  - eth0 interface: DOWN (no packets can be sent or received)
  - DNS resolution: blocked
  - HTTP/HTTPS: blocked
  - Any outbound connection attempt: silently dropped

This means:
  - Generated code cannot send the repository contents anywhere
  - Generated code cannot download malicious payloads
  - Generated code cannot make API calls to external services
  - A malicious LLM-generated test cannot exfiltrate data
```

### Local Development Fallback

When `E2B_API_KEY` is not set, the sandbox wrapper returns a simulation:

```typescript
async function simulateSandboxExecution(options): Promise<SandboxRunResult> {
  return {
    exitCode: options.expectFailure ? 1 : 0,
    stdout: options.expectFailure
      ? "FAIL  regression.test.ts\n  ✗ Expected error was not thrown"
      : "PASS  regression.test.ts\n  ✓ Error no longer occurs",
    stderr: "",
    durationMs: 523,
    passed: !options.expectFailure,
  };
}
```

This allows full pipeline development and testing without E2B credentials.

---

## 31. Replay Engine

### What the Replay Engine Enables

The Replay Engine allows any sandbox execution session to be deterministically re-run on demand without re-invoking any LLM. This serves three use cases:

1. **Reviewer verification**: "I want to run this test myself, against the exact same code, to confirm the result." The reviewer can trigger a replay from the dashboard and see the same stdout/stderr the Judge agent saw.

2. **Judge re-verification**: The Judge agent does not trust the Test Writer's sandbox result — it runs the test again in a fresh sandbox against the patched code. The Replay Engine provides the exact command sequence and files from the Test Writer's session.

3. **Post-incident debugging**: If a PR is merged and then regresses, engineers can replay the original verification session to understand what inputs and environment state produced the passing result.

### Replay Bundle Schema

```json
{
  "replayId": "replay_abc123",
  "incidentId": "inc_xyz789",
  "agentStage": "testWriter",
  "sandboxTemplate": "base-ubuntu-22.04",
  "files": [
    { "path": "src/auth/service.ts", "contentHash": "sha256:abc...", "s3Key": "replay/abc123/src/auth/service.ts" },
    { "path": "tests/regression.test.ts", "contentHash": "sha256:def...", "s3Key": "replay/abc123/tests/regression.test.ts" }
  ],
  "commands": [
    { "seq": 1, "cmd": "npm install --frozen-lockfile", "exitCode": 0, "durationMs": 12450 },
    { "seq": 2, "cmd": "npx vitest run tests/regression.test.ts", "exitCode": 1, "durationMs": 523 }
  ],
  "createdAt": "2026-08-04T22:15:00Z",
  "s3Prefix": "artifacts/replay/replay_abc123/"
}
```

---

## 32. Regression Testing Architecture

### The Two-Gate Model in Detail

```
GATE 1: Pre-patch verification (Test Writer → E2B)
─────────────────────────────────────────────────
Command: <test_runner> run <regression_test_path>
Expected result: exit code ≠ 0

Possible outcomes:
  A. exit 1, stderr contains expected error → PASS GATE 1 → continue to Surgeon
  B. exit 0 (test passes unexpectedly)    → FAIL GATE 1 → HALT
     "Regression test passed on unpatched code. The bug may not be
      reproducible via this test vector."
  C. exit 1, wrong error type             → FAIL GATE 1 → HALT
     "Regression test failed for wrong reason — not the expected TypeError."

GATE 2: Post-patch verification (Judge → E2B)
─────────────────────────────────────────────
Command: <test_runner> run <regression_test_path>
Expected result: exit code = 0

Possible outcomes:
  A. exit 0 (test passes) → PASS GATE 2 → compute confidence
  B. exit 1 (test fails)  → FAIL GATE 2 → HALT
     "Regression test still fails after applying patch."
```

### Regression Test Persistence

After Gate 1 passes, the regression test is:
1. Stored in MinIO at `artifacts/tests/{incidentId}/regression.test.{ext}`
2. Referenced in the `evidence` table as a `TEST_OUTPUT` record
3. Included in the final PR commit (as a new test file in the repository)
4. Available for download from the dashboard evidence inspector

This means every incident that goes through TDAR contributes one new test to the repository's test suite — expanding coverage as a side effect of incident remediation.

---

## 33. Observation Daemon

### 48-Hour Watchdog Architecture

```
PR merged → GitHub webhook fires → merge handler triggered
                  │
                  ▼
      Extract fingerprint from incident record
                  │
                  ▼
      INSERT watchlist { fingerprint, watch_until, status: 'ACTIVE' }
                  │
                  ▼
      Trigger.dev: scheduleTask(observationDaemonTask, { fingerprint, ... })
                  │
                  ▼
      ┌─────────────────────────────────────────────────┐
      │                48-Hour Watch Loop               │
      │                                                 │
      │  for check in range(96):  # 96 × 30min = 48h   │
      │    new_incidents = query(fingerprint, after=merge)│
      │    if new_incidents:                            │
      │      openRevertPR(...)                          │
      │      return { status: "REGRESSION_DETECTED" }  │
      │    wait(minutes=30)                             │
      │                                                 │
      │  return { status: "WATCH_EXPIRED" }             │
      └─────────────────────────────────────────────────┘
```

### Revert PR Contents

When a regression is detected, the automatically opened Revert PR contains:

```markdown
## 🚨 EpiCenter: Regression Detected — Auto-Revert

The fix applied in PR #{original_pr_number} has been detected as
a **regression**. The same error fingerprint reappeared in production
{elapsed_minutes} minutes after merge.

### Original Fix
- Incident: inc_{id}
- PR: #{original_pr_number} merged {time_ago}
- Error fingerprint: `{fingerprint[:16]}...`

### Regression Evidence
- New incident: inc_{regression_id}
- Detected at: {detected_at}
- Error message: {new_incident.error_message}
- Stack trace: [View incident →](/incidents/{regression_id})

### Recommended Action
1. Review this revert PR immediately
2. Merge the revert to restore the previous behavior
3. Re-examine the original hypothesis — the root cause may have been
   misdiagnosed or the fix may have been incomplete

### Original Evidence Chain
[View full evidence from original pipeline run →](/incidents/{original_id})
```

---

## 34. Security Architecture

### Threat Model

EpiCenter operates at the intersection of three high-value target categories: production codebase access, LLM API credentials, and production error telemetry. The threat model addresses:

**Threat 1: Compromised LLM API Key**
- Mitigation: Envelope encryption via Vault. Even if the database is compromised, the API keys are encrypted with a key held in Vault — not in the database.
- Mitigation: In-process-only decryption. The plaintext key exists only in RAM for the duration of one LLM call.

**Threat 2: Compromised GitHub App Credential**
- Mitigation: App token has no admin permissions. The maximum damage of a compromised token is: create feature branches and open PRs.
- Mitigation: Installation tokens expire in 1 hour and are not persisted.

**Threat 3: Malicious LLM-Generated Code**
- Mitigation: Zero-egress sandbox. Generated code cannot communicate with the outside world.
- Mitigation: Ephemeral filesystem. Generated code cannot persist state between sandbox runs.
- Mitigation: 120s execution timeout. Infinite loops and resource exhaustion are bounded.

**Threat 4: Sensitive Data in LLM Prompts**
- Mitigation: Scrubber runs before any LLM call. The LLM never sees raw API keys, passwords, or PII from the incident payload.
- Mitigation: Langfuse traces are configured to mask the raw LLM API key field.

**Threat 5: Cross-Tenant Data Access**
- Mitigation: Supabase Row Level Security (RLS) policies scope all data access to the authenticated user's GitHub App installation.
- Mitigation: Incident fingerprints are keyed to `(repository, errorMessage, stackTrace)` — fingerprints from different repositories cannot collide.

### Security Checklist

| Control | Status | Implementation |
|---------|--------|----------------|
| No raw PAT usage | ✅ | GitHub App installation tokens only |
| Zero-egress sandbox | ✅ | E2B network interface disabled |
| Envelope encryption for BYOK keys | ✅ | Vault Transit engine |
| PII/secret redaction at boundary | ✅ | `pkg/scrubber` — 12 patterns |
| OAuth only (no passwords) | ✅ | Supabase Auth |
| Branch protection | ✅ | App cannot push to protected branches |
| SQL injection prevention | ✅ | pgx parameterized queries only |
| CORS policy | ✅ | Fiber CORS middleware — origin allowlist |
| Rate limiting | ✅ | Fiber limiter — 100 req/min per IP on `/v1/ingest` |
| Audit logging | ✅ | Vault audit log, Langfuse traces, PostgreSQL evidence table |

---

## 35. Authentication & Authorization

### Authentication Flow

```
User visits dashboard
       │
       ▼
Click "Sign in with GitHub"
       │
       ▼
Supabase Auth → GitHub OAuth 2.0 → User grants permissions
       │
       ▼
Supabase issues JWT session token (stored in httpOnly cookie)
       │
       ▼
Dashboard requests use JWT → Supabase validates → RLS policies applied
       │
       ▼
User can only view incidents for repositories where their
GitHub user has the EpiCenter App installed
```

### Authorization Model

```sql
-- Row Level Security policy example
CREATE POLICY "Users can only view their own projects"
ON projects
FOR SELECT
USING (
  installation_id IN (
    SELECT installation_id
    FROM user_installations
    WHERE github_user_id = auth.jwt() ->> 'sub'
  )
);
```

---

## 36. BYOK API Key Management

### Key Lifecycle

```
Key Provisioning (one-time setup):
  1. User provides API key in dashboard settings
  2. Frontend POSTs to /v1/settings/llm-key (authenticated)
  3. Go handler calls Vault Transit:
     POST /v1/transit/encrypt/epicenter-user-{userId}
     { "plaintext": base64(apiKey) }
  4. Vault returns: { "ciphertext": "vault:v1:abc..." }
  5. Ciphertext stored in PostgreSQL users.llm_key_encrypted
  6. Plaintext key never touches the database

Key Usage (per LLM call):
  1. Agent needs to make LLM call
  2. Fetches ciphertext from users table
  3. Calls Vault Transit:
     POST /v1/transit/decrypt/epicenter-user-{userId}
     { "ciphertext": "vault:v1:abc..." }
  4. Vault returns: { "plaintext": base64(apiKey) }
  5. Decodes base64 → plaintext key in RAM
  6. Initializes LLM client with key
  7. Makes LLM call
  8. LLM client garbage collected → key leaves RAM

Key Rotation:
  1. User provides new API key
  2. Vault re-encrypts with new key material
  3. Old ciphertext becomes invalid
```

---

## 37. Database Design — Full Schema

### Table Definitions

```sql
-- ────────────────────────────────────────────────────────────────────────────
-- projects: one row per GitHub repository with EpiCenter installed
-- ────────────────────────────────────────────────────────────────────────────
CREATE TABLE projects (
    id              UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
    name            TEXT    NOT NULL,
    repository      TEXT    NOT NULL UNIQUE,  -- "owner/repo"
    installation_id BIGINT,                   -- GitHub App installation ID
    default_branch  TEXT    NOT NULL DEFAULT 'main',
    languages       TEXT[],                   -- ["typescript","python"]
    test_framework  TEXT,                     -- "vitest" | "pytest" | etc.
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ────────────────────────────────────────────────────────────────────────────
-- incidents: one row per ingested error event
-- ────────────────────────────────────────────────────────────────────────────
CREATE TABLE incidents (
    id              UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id      UUID    REFERENCES projects(id) ON DELETE CASCADE,
    repository      TEXT    NOT NULL,
    branch          TEXT    NOT NULL DEFAULT 'main',
    environment     TEXT    NOT NULL DEFAULT 'production',
    payload         JSONB   NOT NULL,        -- Redacted incident payload
    fingerprint     TEXT    NOT NULL,        -- SHA-256(repo|error|stack)
    workflow_run_id TEXT,                    -- Trigger.dev run ID
    hypothesis      TEXT,                    -- Investigator's root cause
    root_cause_type TEXT,                    -- Enum: NULL_DEREFERENCE, etc.
    implicated_files TEXT[],
    status          TEXT    NOT NULL DEFAULT 'QUEUED'
                    CHECK (status IN (
                        'QUEUED', 'RUNNING', 'COMPLETED',
                        'HALTED_FOR_REVIEW', 'ERROR', 'RESOLVED',
                        'REJECTED', 'DUPLICATE'
                    )),
    halt_reason     TEXT,                    -- Set when status = HALTED
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_incidents_fingerprint ON incidents(fingerprint);
CREATE INDEX idx_incidents_status      ON incidents(status);
CREATE INDEX idx_incidents_project_id  ON incidents(project_id);
CREATE INDEX idx_incidents_created_at  ON incidents(created_at DESC);

-- ────────────────────────────────────────────────────────────────────────────
-- evidence: append-only audit trail — no UPDATE, no DELETE
-- ────────────────────────────────────────────────────────────────────────────
CREATE TABLE evidence (
    id             UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
    incident_id    UUID    NOT NULL REFERENCES incidents(id) ON DELETE CASCADE,
    type           TEXT    NOT NULL CHECK (type IN (
                       'AST_CONTEXT', 'CODEQL_FINDING', 'QDRANT_HIT',
                       'SANDBOX_LOG', 'TEST_OUTPUT', 'PATCH_DIFF', 'BLAST_RADIUS'
                   )),
    label          TEXT    NOT NULL,
    content        TEXT    NOT NULL,
    citation_file  TEXT,           -- Relative file path in repository
    citation_start INT,            -- Starting line number (1-indexed)
    citation_end   INT,            -- Ending line number (1-indexed)
    codeql_rule_id TEXT,           -- CodeQL rule ID (CODEQL_FINDING only)
    codeql_severity TEXT,          -- critical | high | medium | low
    qdrant_score   NUMERIC(5,4),   -- Similarity score (QDRANT_HIT only)
    sandbox_run_id TEXT,           -- E2B run ID (SANDBOX_LOG, TEST_OUTPUT)
    created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
    -- Note: NO updated_at — this table is append-only
);

CREATE INDEX idx_evidence_incident_id ON evidence(incident_id);
CREATE INDEX idx_evidence_type        ON evidence(type);

-- ────────────────────────────────────────────────────────────────────────────
-- confidence_scores: versioned scoring per pipeline run
-- ────────────────────────────────────────────────────────────────────────────
CREATE TABLE confidence_scores (
    id              UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
    incident_id     UUID    NOT NULL REFERENCES incidents(id) ON DELETE CASCADE,
    workflow_run_id TEXT,
    -- Raw signal scores (pre-weight application)
    test_raw        INT     NOT NULL DEFAULT 0 CHECK (test_raw BETWEEN 0 AND 100),
    codeql_raw      INT     NOT NULL DEFAULT 0 CHECK (codeql_raw BETWEEN 0 AND 100),
    blast_raw       INT     NOT NULL DEFAULT 0 CHECK (blast_raw BETWEEN 0 AND 100),
    llm_raw         INT     NOT NULL DEFAULT 0 CHECK (llm_raw BETWEEN 0 AND 100),
    -- Weighted contributions (raw × weight)
    test_signal     NUMERIC(5,2) NOT NULL DEFAULT 0,
    codeql_signal   NUMERIC(5,2) NOT NULL DEFAULT 0,
    blast_signal    NUMERIC(5,2) NOT NULL DEFAULT 0,
    llm_signal      NUMERIC(5,2) NOT NULL DEFAULT 0,
    -- Total score
    total_score     NUMERIC(5,2) NOT NULL DEFAULT 0,
    threshold_met   BOOLEAN     NOT NULL DEFAULT FALSE,
    threshold_value INT         NOT NULL DEFAULT 75,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ────────────────────────────────────────────────────────────────────────────
-- patch_citations: mapping from PR narrative claims to evidence records
-- ────────────────────────────────────────────────────────────────────────────
CREATE TABLE patch_citations (
    id          UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
    incident_id UUID    NOT NULL REFERENCES incidents(id) ON DELETE CASCADE,
    evidence_id UUID    NOT NULL REFERENCES evidence(id) ON DELETE CASCADE,
    pr_number   INT,
    pr_url      TEXT,
    claim_text  TEXT    NOT NULL,  -- The sentence in the PR backed by this evidence
    claim_type  TEXT    NOT NULL CHECK (claim_type IN (
                    'ROOT_CAUSE', 'CODE_LOCATION', 'CODEQL_RULE',
                    'REGRESSION_PROOF', 'FIX_PROOF', 'BLAST_RADIUS'
                )),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ────────────────────────────────────────────────────────────────────────────
-- watchlist: post-merge 48h regression monitoring
-- ────────────────────────────────────────────────────────────────────────────
CREATE TABLE watchlist (
    id                     UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
    incident_id            UUID    NOT NULL REFERENCES incidents(id),
    fingerprint            TEXT    NOT NULL UNIQUE,
    repository             TEXT    NOT NULL,
    pr_number              INT,
    pr_url                 TEXT,
    merged_at              TIMESTAMPTZ NOT NULL,
    watch_until            TIMESTAMPTZ NOT NULL,
    last_checked_at        TIMESTAMPTZ,
    check_count            INT     NOT NULL DEFAULT 0,
    status                 TEXT    NOT NULL DEFAULT 'ACTIVE'
                           CHECK (status IN (
                               'ACTIVE', 'REGRESSION_DETECTED',
                               'EXPIRED', 'CANCELLED'
                           )),
    regression_incident_id UUID    REFERENCES incidents(id),
    revert_pr_url          TEXT,
    created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_watchlist_fingerprint ON watchlist(fingerprint);
CREATE INDEX idx_watchlist_status      ON watchlist(status);
CREATE INDEX idx_watchlist_watch_until ON watchlist(watch_until);
```

---

## 38. API Specifications — Full Reference

### POST /v1/ingest

Submit a production incident for autonomous repair.

**Authentication:** `X-EpiCenter-Key` header (HMAC-signed ingestion key)

**Request Schema:**
```typescript
interface IncidentPayload {
  project_id: string;              // Required: "proj_{id}"
  repository: string;              // Required: "owner/repo"
  branch?: string;                 // Default: "main"
  environment?: string;            // Default: "production"
  payload: {
    error_message: string;         // Required: the error message text
    stack_trace?: string;          // Recommended: full stack trace
    context_logs?: string[];       // Optional: surrounding log lines
    metadata?: Record<string, unknown>; // Optional: APM-specific fields
  };
}
```

**Response 202 Accepted:**
```typescript
interface IngestResponse {
  incident_id: string;       // "inc_{uuid}"
  fingerprint: string;       // SHA-256 hex (64 chars)
  workflow_run_id: string;   // Trigger.dev run ID
  status: "QUEUED";
  dashboard_url: string;     // "https://epicenter.dev/incidents/{id}"
  created_at: string;        // ISO 8601
}
```

**Response 409 Conflict (duplicate):**
```json
{
  "incident_id": "inc_existing",
  "fingerprint": "a3b9c8d7...",
  "status": "DUPLICATE",
  "message": "Active pipeline run already exists for this error signature"
}
```

**Response 422 Unprocessable Entity:**
```json
{
  "error": "project_id, repository, and payload.error_message are required"
}
```

---

### GET /healthz

Returns service health status.

**Response 200 OK:**
```json
{
  "status": "ok",
  "service": "epicenter-ingestion",
  "version": "1.0.0",
  "timestamp": "2026-08-04T22:15:00Z"
}
```

---

### GET /v1/incidents/:id

Retrieve incident details, pipeline status, and evidence.

**Response 200 OK:**
```typescript
interface IncidentResponse {
  id: string;
  repository: string;
  status: string;
  fingerprint: string;
  hypothesis: string | null;
  workflowRunId: string | null;
  haltReason: string | null;
  confidence: {
    total: number;
    breakdown: {
      testSignal: number;
      codeqlSignal: number;
      blastSignal: number;
      llmSignal: number;
    };
  } | null;
  pullRequestUrl: string | null;
  pullRequestNumber: number | null;
  evidence: EvidenceRecord[];
  createdAt: string;
  updatedAt: string;
}
```

---

### GET /v1/incidents/:id/stream

SSE stream of live pipeline progress.

**Response:** `Content-Type: text/event-stream`

**Event types:**

```
event: agent:start
data: {"agent": "investigator", "timestamp": "2026-08-04T22:15:01Z"}

event: evidence:added
data: {"type": "CODEQL_FINDING", "label": "...", "id": "ev_abc"}

event: sandbox:log
data: {"type": "stdout", "content": "FAIL regression.test.ts", "timestamp": "..."}

event: confidence:update
data: {"total": 44.0, "breakdown": {"testSignal": 0, "codeqlSignal": 30, "blastSignal": 0, "llmSignal": 14}}

event: agent:complete
data: {"agent": "investigator", "hypothesis": "...", "confidence": 70}

event: pipeline:halt
data: {"reason": "Regression test passed unexpectedly", "evidence_count": 3}

event: pipeline:complete
data: {"status": "COMPLETED", "prUrl": "https://github.com/...", "prNumber": 42, "confidence": 96}
```

---

### POST /v1/webhooks/github

Receives GitHub App webhook events. Used for:
- `pull_request.closed` + `merged: true` → start Observation Daemon
- `check_run.completed` → update incident status

---

### POST /v1/webhooks/sentry (planned)

Receives Sentry issue alerts as incident payloads.

**Sentry payload mapping:**
```
event.title       → payload.error_message
event.stacktrace  → payload.stack_trace
event.breadcrumbs → payload.context_logs
event.tags.url    → metadata.url
```

---

## 39. Frontend Dashboard Architecture

### Component Tree

```
app/
├── layout.tsx          # Root layout, dark mode, Google Fonts
└── page.tsx            # Hero landing / Dashboard toggle

components/
├── Header.tsx          # Sticky nav with TDAR status indicator
├── HeroSection.tsx     # Landing: headline, stats, agent preview
├── IngestForm.tsx      # Incident submission form with example loader
├── PipelineGraph.tsx   # React Flow 4-agent graph with live states
├── ConfidencePanel.tsx # Animated SVG ring + signal breakdown bars
├── EvidencePanel.tsx   # Expandable evidence cards with file citations
├── LogTerminal.tsx     # Auto-scroll SSE log terminal (JetBrains Mono)
└── PRStatusCard.tsx    # PR link, confidence, 48h daemon notice

hooks/
└── usePipelineSSE.ts   # SSE client + 8-step demo simulation
```

### Design System

**Typography:**
- Headlines: Inter (800 weight) — strong, modern, legible at large sizes
- Body: Inter (400/500 weight) — optimized for screen readability
- Code/Terminal: JetBrains Mono — designed specifically for code display

**Color palette:**
```
Background:  hsl(222, 47%, 5%)   — deep navy-black
Card:        hsl(222, 47%, 7%)   — slightly lighter surface
Epicenter:   #22c55e (green-500) — primary brand color
Agent colors:
  Investigator: #818cf8 (indigo-400)
  Test Writer:  #fb923c (orange-400)
  Surgeon:      #34d399 (emerald-400)
  Judge:        #f472b6 (pink-400)
```

**Glassmorphism utility:**
```css
.glass {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.06);
}
```

### SSE Demo Simulation

The `usePipelineSSE` hook tries to connect to the real SSE endpoint. If the connection fails within 3 seconds, it falls back to an 8-step demo simulation that walks through the complete pipeline:

| Step | Delay | Agent Stage | Confidence |
|------|-------|-------------|------------|
| 1 | 800ms | Investigator starts | 0% |
| 2 | +1500ms | AST evidence added | 0% |
| 3 | +1200ms | CodeQL finding added | 0% |
| 4 | +900ms | Hypothesis formed, Test Writer starts | 44% |
| 5 | +1400ms | Regression test verified failing, Surgeon starts | 44% |
| 6 | +1600ms | Patch generated, Judge starts | 59% |
| 7 | +1800ms | Post-patch test passes | 94% |
| 8 | +1200ms | PR opened, pipeline complete | 94% |

---

## 40. Real-Time Communication (SSE)

### SSE Endpoint Implementation

```go
// Go Fiber SSE endpoint
app.Get("/v1/incidents/:id/stream", func(c *fiber.Ctx) error {
    incidentID := c.Params("id")

    c.Set("Content-Type", "text/event-stream")
    c.Set("Cache-Control", "no-cache")
    c.Set("Connection", "keep-alive")
    c.Set("X-Accel-Buffering", "no") // Disable nginx buffering

    // Subscribe to incident events from PostgreSQL LISTEN/NOTIFY
    // or from an in-memory pub/sub channel
    events := subscribeToIncident(incidentID)

    c.Context().SetBodyStreamWriter(fasthttp.StreamWriter(func(w *bufio.Writer) {
        for event := range events {
            fmt.Fprintf(w, "event: %s\n", event.Type)
            fmt.Fprintf(w, "data: %s\n\n", event.Data)
            w.Flush()
        }
    }))

    return nil
})
```

### Event Publishing from Agents

```typescript
// Publishing SSE events from within the LangGraph agent
async function publishSSEEvent(incidentId: string, eventType: string, data: unknown) {
  // In production: publish to Redis pub/sub channel → Go SSE server picks up
  // In demo: write to PostgreSQL NOTIFY
  await db.query(
    `SELECT pg_notify($1, $2)`,
    [`incident:${incidentId}`, JSON.stringify({ type: eventType, data })]
  );
}
```

---

## 41. Deployment Architecture — Demo

### Docker Compose Services

```yaml
services:
  postgres:
    image: postgres:16-alpine
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U epicenter"]
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./db/migrations:/docker-entrypoint-initdb.d  # Auto-migrate on startup

  qdrant:
    image: qdrant/qdrant:latest
    ports: ["6333:6333", "6334:6334"]  # REST and gRPC

  minio:
    image: minio/minio:latest
    command: server /data --console-address ":9001"
    ports: ["9000:9000", "9001:9001"]  # API and console

  ingestion:
    build: { context: ., dockerfile: ./cmd/ingestion/Dockerfile }
    depends_on:
      postgres: { condition: service_healthy }
    ports: ["8080:8080"]
    environment:
      DATABASE_URL: postgres://epicenter:secret@postgres:5432/epicenter_db
      TRIGGER_DEV_SECRET_KEY: ${TRIGGER_DEV_SECRET_KEY}
      E2B_API_KEY: ${E2B_API_KEY}
```

### Startup Sequence

```
docker compose up -d
        │
        ▼
postgres → qdrant → minio (all start in parallel)
        │
        ▼
postgres health check passes
        │
        ▼
ingestion service starts
Migrations run from /docker-entrypoint-initdb.d/001_initial_schema.sql
        │
        ▼
ingestion service ready on :8080
        │
        ▼
(In separate terminals):
  cd workflows && npx trigger.dev@latest dev
  cd frontend && npm run dev
        │
        ▼
Dashboard available at http://localhost:3000
API available at http://localhost:8080
```

---

## 42. Production Architecture — Roadmap

> **⚠️ This section describes design intentions only. Not implemented in the demo.**

### Target State (12-Month Roadmap)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    PRODUCTION ARCHITECTURE TARGET STATE                      │
│                                                                             │
│  CDN (CloudFront / Vercel Edge)                                             │
│    └── Next.js (Vercel deployment)                                          │
│         │                                                                   │
│  API Gateway (AWS ALB / GCP Load Balancer)                                  │
│    ├── Go Ingestion Service (EKS Deployment × 3 replicas, HPA)             │
│    ├── SSE Service (EKS Deployment × 2 replicas, sticky sessions)          │
│    └── Webhook Handler (EKS Deployment × 2 replicas)                       │
│         │                                                                   │
│  Agent Worker Pool (EKS)                                                   │
│    └── Trigger.dev workers × 10 (auto-scaled by queue depth)               │
│         │                                                                   │
│  Firecracker MicroVM Farm (dedicated nodes)                                 │
│    └── 50 concurrent sandbox slots (auto-scaled by pending sandbox reqs)   │
│         │                                                                   │
│  Data Tier                                                                  │
│    ├── Aurora PostgreSQL (multi-AZ, read replicas)                         │
│    ├── Qdrant Cloud (3-shard cluster)                                       │
│    ├── ElastiCache Redis (SSE pub/sub)                                      │
│    └── S3 (artifact storage with lifecycle policies)                        │
│         │                                                                   │
│  Security                                                                   │
│    ├── Vault Enterprise (HA, HSM-backed)                                    │
│    ├── AWS KMS (per-tenant CMKs)                                            │
│    └── WAF (rate limiting, bot protection on /v1/ingest)                   │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 43. Scalability Design

### Horizontal Scaling Model

EpiCenter's architecture is designed around the principle that **stateless compute scales horizontally; stateful storage scales vertically + sharding**. Each plane can scale independently:

| Plane | Scaling Strategy | Bottleneck |
|-------|-----------------|------------|
| Ingestion (Go) | HPA on CPU — N replicas behind load balancer | PostgreSQL connection pool |
| Agent Workers (Node.js) | Trigger.dev concurrency config — N parallel runners | LLM provider rate limits |
| Sandbox Execution (E2B) | E2B manages pool internally | E2B account concurrency limits |
| PostgreSQL | Vertical → read replicas for evidence queries | Write throughput (incidents/min) |
| Qdrant | Horizontal shard expansion (HNSW segments) | Memory per node |
| MinIO/S3 | Inherently elastic object storage | None practical |

### Throughput Estimate

For a team with 50 engineers handling 10 incidents/day on average:

```
Daily load: 10 incidents/day = 0.007 incidents/second
Pipeline duration: 4 minutes × 10 = 40 agent-minutes/day
LLM calls: 4 agents × 1 call × 10 incidents = 40 LLM calls/day
Sandbox executions: 3 × 10 = 30 sandbox runs/day (pre-patch, post-patch, verify)
```

This is well within single-instance capacity. The architecture scales to thousands of incidents/day without rearchitecting.

---

## 44. Fault Tolerance & Reliability

### Failure Mode Analysis

| Failure | Detection | Recovery |
|---------|-----------|----------|
| LLM provider timeout | Trigger.dev step timeout | Retry with exponential backoff |
| LLM provider rate limit (429) | HTTP 429 response | Backoff + retry (up to 3x) |
| E2B sandbox cold start | First sandbox request is slow | Retry after 5s delay |
| PostgreSQL connection drop | pgx pool error | Pool reconnects automatically |
| Qdrant unreachable | HTTP error from Qdrant client | Investigator proceeds without RAG context; logs warning |
| CodeQL tool error | Non-zero exit from CodeQL binary | Investigator proceeds without CodeQL; `codeqlSignal = 0` |
| GitHub API rate limit | Octokit 429/403 | Wait for rate limit reset (up to 1 hour) then retry |
| Trigger.dev process crash | Trigger.dev detects worker disconnect | Resume workflow from last checkpoint on restart |
| MinIO unreachable | S3 SDK error | Evidence content stored in PostgreSQL `content` TEXT column as fallback |

### Graceful Degradation

EpiCenter is designed to degrade gracefully when individual tools are unavailable:

- **No Qdrant**: Investigator proceeds without RAG context. `S_llm` may be lower (less context for LLM). PR still possible if test passes and CodeQL corroborates.
- **No CodeQL**: `S_codeql = 0` by default. Confidence score maximum drops to 65 (35 + 0 + 15 + 15). Pipeline will always HALT — CodeQL is effectively required for PR authorization at the current weight configuration. This is intentional: EpiCenter's value proposition includes independent corroboration.
- **No E2B**: Pipeline halts at Test Writer. Without sandbox execution, TDAR's core guarantee cannot be upheld. This failure mode is non-graceful by design.

---

## 45. Cost Analysis & Economics

### Cost Structure

| Component | Cost Type | Estimate (per pipeline run) | Notes |
|-----------|-----------|----------------------------|-------|
| LLM inference | BYOK — user pays | $0.01–0.15 | Depends on model and input length |
| E2B sandbox time | Variable | ~$0.05–0.20 | 2–3 sandbox runs × 30s average |
| Qdrant queries | Fixed/tier | ~$0.001 | 3 query types × ~500 vectors |
| PostgreSQL storage | Fixed/month | ~$0.001 | Per-run evidence: ~5 KB |
| MinIO storage | Fixed/month | ~$0.001 | Artifacts: ~50 KB average |
| Trigger.dev | Per-run | ~$0.005 | Based on Trigger.dev v3 pricing |
| Langfuse traces | Fixed/tier | ~$0.001 | 4 traces per run |

**Total estimated cost per pipeline run (excluding LLM): $0.06–0.25**

### BYOK Economics

The BYOK model shifts LLM cost to the user, which has two advantages:

1. **EpiCenter's operating cost is predictable**: It scales with the number of incidents, not with LLM token prices, which vary by provider and model.

2. **Users choose their cost/quality tradeoff**: A team using GPT-4o pays more per run but may get better hypothesis quality. A team using Claude Haiku might accept lower quality for lower cost. EpiCenter does not impose this choice.

---

## 46. Demo Flow — Step by Step

### Live Demo Script (7 Minutes)

**[0:00] Submit Incident**
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
→ Show the `202 Accepted` response with `dashboard_url`.

**[0:30] Open Dashboard**
- Navigate to the `dashboard_url`
- Show the React Flow pipeline graph — Investigator node is pulsing (active)

**[1:30] Investigator Phase**
- Show the Evidence panel populating:
  - AST_CONTEXT card appears: "validateToken() scope at auth/service.ts:38–55"
  - CODEQL_FINDING card appears: "js/dereferenced-null-optional · HIGH · line 42"
  - QDRANT_HIT card appears: "Similar incident resolved 2026-07-18"
- Show confidence ring: 44% (test signal = 0, CodeQL = 30, blast = 0, LLM = 14)

**[2:30] Test Writer Phase**
- Show the log terminal — E2B sandbox boots
- Show the test runner output: `FAIL regression.test.ts`
- Gate 1 cleared — Investigator node turns green, Test Writer node turns green

**[3:30] Surgeon Phase**
- Show blast radius card: "1 file, 1 function"
- Show patch diff card: "+3 lines in validateToken()"
- Confidence ring updates: 59% (blast = 15 now contributing)

**[4:30] Judge Phase**
- Show sandbox re-running with patch applied
- Show test runner output: `PASS regression.test.ts ✓ (1.234s)`
- Confidence ring jumps to 94%
- Show all four signals fully lit in the breakdown panel
- Judge node turns green

**[5:30] GitHub PR**
- PR status card appears: PR #1 opened
- Click the PR link — show the PR description in GitHub:
  - Confidence breakdown table
  - Evidence chain citations (clickable links to exact code lines)
  - Regression test in the diff

**[6:30] Observation Daemon**
- Explain: "Once you merge this PR, the Observation Daemon watches for 48 hours."
- Show the 48h daemon notice in the PR status card
- Explain the automatic Revert PR mechanism

---

## 47. Novelty Analysis

### What Is Not Novel (Individually)

Each component in EpiCenter has been built before, in isolation:
- Agentic code generation: Devin, SWE-agent, Agentless
- Static analysis-assisted repair: Automated program repair (APR) research
- Sandboxed code execution: GitHub Codespaces, E2B, Replit
- Vector-augmented code retrieval: GitHub Copilot, Cursor
- GitHub App integrations: Numerous existing bots

### What Is Novel (The Fusion)

The novelty is the **specific combination** of these elements into a single system that enforces the following invariants simultaneously:

1. **A patch cannot exist without a failing test.** Not recommended — required. The pipeline physically cannot produce a patch output if Gate 1 (test failure verification) does not pass.

2. **A test cannot be the only evidence source.** The pipeline requires at least a partial CodeQL signal. A system that generates code and tests it in a sandbox, without any non-LLM corroboration, is still vulnerable to coherent hallucinations where both the hypothesis and the test are wrong in the same way. CodeQL prevents this class of error.

3. **The agent that generates is not the agent that certifies.** No single agent has the authority to both propose and approve. The Judge is independent from the Surgeon; their LLM calls use the same model but separate conversation contexts with no shared memory.

4. **Halt is the default; PR is the exception.** Every agent defaults to halting if its output does not meet its gate criteria. The pipeline does not have a fallback path that produces a lower-quality PR — it either produces a gate-cleared PR or produces a HALT with evidence.

5. **Post-merge monitoring is part of the fix.** The definition of "fixed" in EpiCenter includes 48 hours of regression monitoring. A patch that passes the sandbox but regresses in production is not a fix — it is a deferred incident.

---

## 48. Comparison with Existing Tools

### Feature Matrix

| Feature | GitHub Copilot | Sentry | Devin | SWE-agent | Generic LLM Fixer | **EpiCenter** |
|---------|:-:|:-:|:-:|:-:|:-:|:-:|
| Incident ingestion | ❌ | ✅ | ❌ | ❌ | ❌ | ✅ |
| Production error → root cause | ❌ | Partial | Partial | Partial | Partial | ✅ (multi-source) |
| AST-level code mapping | Partial | ❌ | ❌ | ❌ | ❌ | ✅ (Tree-sitter) |
| Deterministic static corroboration | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (CodeQL) |
| Historical RAG retrieval | Partial | ❌ | ❌ | ❌ | ❌ | ✅ (Qdrant) |
| Regression test generation | Partial | ❌ | Partial | Partial | Partial | ✅ (required) |
| Sandbox test verification | ❌ | ❌ | ❌ | Partial | ❌ | ✅ (E2B, gated) |
| Blast-radius-bounded patch | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (AST graph) |
| Multi-agent independent review | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (Judge agent) |
| Confidence scoring | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (4-signal) |
| PR gate threshold | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (75%) |
| Cited PR evidence chain | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (file:line) |
| Post-merge regression watch | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (48h daemon) |
| Pipeline HALT path | N/A | N/A | ❌ | ❌ | ❌ | ✅ (first-class) |
| Full evidence audit trail | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (PostgreSQL) |
| BYOK LLM | N/A | N/A | ❌ | ❌ | ❌ | ✅ (3 providers) |
| Never auto-merges to main | N/A | N/A | Configurable | Configurable | N/A | ✅ (enforced) |

---

## 49. Future Scope & Roadmap

### 3-Month Milestones

- [ ] **Sentry webhook integration**: Direct Sentry issue webhook → `/v1/webhooks/sentry` with automatic project mapping
- [ ] **Datadog monitor webhook**: Datadog monitor alert → incident ingestion with APM context extraction
- [ ] **Multi-file patch support**: Surgeon can propose coordinated changes across multiple files within the blast radius
- [ ] **Python language support**: Tree-sitter Python grammar, pytest test generation, CodeQL Python queries
- [ ] **Go language support**: Tree-sitter Go grammar, `go test` test generation, CodeQL Go queries

### 6-Month Milestones

- [ ] **Learning from rejections**: Judge-rejected pipeline runs are used as negative training examples to improve Investigator hypothesis quality via fine-tuning or few-shot examples
- [ ] **Monorepo-aware blast radius**: Cross-package call graph traversal for monorepo codebases (Nx, Turborepo, pnpm workspaces)
- [ ] **Team analytics dashboard**: Recurring fault fingerprint heatmaps, mean-time-to-patch trends, agent halt reason analysis
- [ ] **Expanded CodeQL coverage**: Semgrep rules, Infer (Java/C), Sonar rules as additional non-LLM corroboration sources
- [ ] **PR comment bot**: When EpiCenter HALTs, posts a comment on the related GitHub issue with the accumulated evidence chain

### 12-Month Milestones (Production Roadmap)

- [ ] **Terraform + Kubernetes deployment**: Production-grade IaC for AWS and GCP
- [ ] **Firecracker self-hosted farm**: High-concurrency sandbox execution without E2B dependency
- [ ] **Multi-tenant SaaS**: Per-tenant Vault namespaces, RLS-enforced data isolation, billing integration
- [ ] **Bi-directional APM integration**: Post-patch confidence data pushed back to Sentry/Datadog as deployment tracking events
- [ ] **IDE plugin**: VS Code extension that shows EpiCenter incident evidence alongside the implicated file when an error fingerprint matches

---

## 50. Advantages

### For Engineering Teams

1. **Verification takes seconds, not 40 minutes.** The evidence chain in the PR is structured and linked — clicking the CodeQL citation takes you directly to the exact line. The regression test file is in the diff — you can read it and run it yourself.

2. **Test coverage grows as a side effect of incident response.** Every incident that completes the TDAR pipeline adds one new regression test to the repository. Over time, the test suite becomes a living record of every production bug EpiCenter has encountered and fixed.

3. **Junior engineers can safely review AI-generated patches.** The confidence breakdown table and evidence citations give any reviewer the context to evaluate the patch, regardless of their familiarity with the affected code. They are not being asked to trust the AI — they are being asked to evaluate a specific evidence chain.

4. **On-call is measurably less painful.** When a 3 AM alert fires, a reviewable PR may already be waiting by the time the on-call engineer checks their phone.

### For Platform and Security Teams

5. **No AI writes directly to main.** EpiCenter's GitHub App permission manifest does not include admin or push-to-protected-branch rights. Human review + merge is always required.

6. **No generated code executes outside a sandbox.** The blast radius of a malformed or malicious LLM generation is strictly bounded by the E2B Firecracker boundary.

7. **No production secrets reach LLM context.** The 12-pattern scrubber ensures that AWS keys, database URLs, JWTs, and PII are removed before any LLM call.

8. **Full audit trail.** Every agent decision, every LLM call, every evidence record, and every confidence score is persisted and queryable. If something goes wrong, the forensic record is complete.

### For the AI Trust Problem

9. **EpiCenter's output is falsifiable.** The regression test is a falsifiable claim: "this test fails without the patch." You can check this claim yourself in any environment. This is a qualitatively higher standard than "the AI says this should work."

10. **HALT is honest.** A system that always produces an output — even when evidence is insufficient — teaches reviewers to distrust all of its outputs. A system that halts when evidence is insufficient teaches reviewers that when it does produce output, the evidence bar was met.

---

## 51. Limitations & Honest Tradeoffs

### Technical Limitations

1. **TDAR only works on reproducible bugs.** If the bug cannot be encoded as a deterministic regression test — intermittent race conditions, Heisenbugs, bugs that require specific production data not available in the test environment — the Test Writer gate will fail. TDAR's guarantee is null for non-reproducible faults.

2. **CodeQL coverage is language-dependent.** CodeQL's query packs are most comprehensive for Java, JavaScript/TypeScript, Python, Go, and C/C++. Less-common languages (Perl, Erlang, COBOL) have limited or no CodeQL coverage, which means the `codeqlSignal` will typically be 30 (neutral) rather than 100, making it very difficult to clear the 75% confidence threshold.

3. **Blast radius is ±1 hop by default.** The current blast radius computation expands one hop from the implicated symbol. Bugs with root causes deeper in the call graph (e.g., a bug that manifests 3 frames away from its origin) may produce a blast radius that excludes the actual fix site, causing a Surgeon halt.

4. **LLM-generated tests may be syntactically valid but semantically wrong.** The Test Writer can produce a test that fails for the right reason but asserts the wrong expected behavior. The sandbox gate (exit code check) does not verify semantic correctness — it only verifies that the test fails. A semantically wrong test may produce a false pass at Gate 1.

5. **The confidence score is a heuristic, not a proof.** A score of 94% does not mean there is a 94% probability the patch is correct. It means four independent signals are aligned. The patch may still be incorrect in ways that none of the four signals detected.

### Design Tradeoffs

6. **BYOK shifts responsibility to the user.** Users who choose a weaker LLM model may get lower-quality hypotheses, which produce lower `S_llm` scores and more HALT outcomes. This is a feature (weaker evidence → higher standard to clear) but may frustrate users who expect consistent output.

7. **The 75% threshold is configurable but not automatically calibrated.** The threshold was chosen based on design reasoning, not empirical evaluation. Production calibration — "what threshold minimizes (false negatives × cost of a HALT) + (false positives × cost of a bad merge)" — is future work.

8. **Post-merge monitoring requires fingerprint stability.** If the application logs change the error message format between incidents (e.g., because a dependency was updated), the SHA-256 fingerprint will not match and a regression will not be detected. The fingerprint is stable for identical error messages and stack traces, but not across error message reformatting.

---

## 52. Conclusion

EpiCenter reframes AI-assisted incident remediation around **proof rather than plausibility**. The system's central thesis is that an AI-generated patch should be treated as a hypothesis, and like any hypothesis, it should be tested before it is acted on.

The TDAR pipeline enforces this thesis architecturally: it is literally impossible for EpiCenter to open a Pull Request without having first:

1. Mapped the error signal to precise AST locations in the actual codebase
2. Retrieved semantically similar historical evidence from vector memory
3. Obtained independent corroboration from a deterministic static analysis tool (CodeQL) that cannot hallucinate
4. Generated a regression test that fails on the current code — in an isolated sandbox with zero network egress
5. Generated a minimal patch bounded by the computed blast radius
6. Verified that the patch makes the regression test pass — in a fresh isolated sandbox
7. Computed a multi-signal confidence score from four independent sources and confirmed it clears 75%

The result is a Pull Request that is not an AI-generated narrative — it is a citation-backed, sandbox-verified, multi-source-corroborated evidence package that any reviewer can inspect and challenge in minutes.

Combined with a scoped GitHub App (no admin permissions, no push to main), a no-egress execution sandbox (generated code cannot exfiltrate or side-effect), BYOK key management (never logging or persisting plaintext API keys), boundary PII redaction (no sensitive data in LLM context), and a 48-hour post-merge Observation Daemon that auto-reverts regressions — EpiCenter is designed so that every step from incident to merged fix is **durable, auditable, and reversible**.

It does not eliminate the need for human judgment. It eliminates the need for human *repetition* — the pattern-matching, the stack-trace-tracing, the test-writing, the blast-radius-estimating that senior engineers do the same way every time a production incident fires. It gives engineering teams a fast path to a fix they can actually verify, rather than one they simply have to trust.

---

## Project Structure

```
EpiCenter/
│
├── .github/
│   └── workflows/
│       └── ci.yml                       # Go · TypeScript · Next.js CI
│
├── cmd/
│   └── ingestion/
│       ├── main.go                      # Go Fiber server — POST /v1/ingest
│       └── Dockerfile                   # Multi-stage production image
│
├── pkg/
│   ├── scrubber/
│   │   ├── scrubber.go                  # 12-pattern PII/secret redaction
│   │   └── scrubber_test.go             # Unit tests (6 scenarios)
│   └── fingerprint/
│       └── fingerprint.go               # SHA-256 fingerprint generation
│
├── orchestration/                        # Node.js 20 + LangGraph 0.2
│   ├── src/
│   │   ├── graph.ts                     # LangGraph state machine + routing
│   │   ├── agents/
│   │   │   ├── investigator.ts          # AST + CodeQL + Qdrant → hypothesis
│   │   │   ├── testWriter.ts            # Regression test → sandbox gate
│   │   │   ├── surgeon.ts               # Blast radius → minimal patch
│   │   │   └── judge.ts                 # Final adjudication → PR gate
│   │   ├── confidence/
│   │   │   └── engine.ts                # Multi-signal weighted formula
│   │   ├── llm/
│   │   │   └── provider.ts              # BYOK: Claude · GPT-4o · Gemini
│   │   ├── tools/
│   │   │   ├── sandbox.ts               # E2B Firecracker wrapper
│   │   │   ├── github.ts                # Cited PR creation via Octokit
│   │   │   ├── treesitter.ts            # AST parsing + frame resolution
│   │   │   ├── codeql.ts                # CodeQL query runner
│   │   │   ├── qdrant.ts                # Dense vector k-NN search
│   │   │   └── blastRadius.ts           # Call graph blast radius analysis
│   │   ├── observability/
│   │   │   └── langfuse.ts              # Fire-and-forget LLM tracing
│   │   └── state/
│   │       └── types.ts                 # EvidenceRecord, ConfidenceResult, etc.
│   ├── package.json
│   └── tsconfig.json
│
├── workflows/                            # Trigger.dev v3 durable tasks
│   ├── src/
│   │   ├── incidentPipeline.ts          # Main TDAR pipeline (10min, 3 retries)
│   │   └── observationDaemon.ts         # 48h post-merge watchdog
│   └── package.json
│
├── frontend/                             # Next.js 14 App Router dashboard
│   ├── app/
│   │   ├── layout.tsx                   # Root layout, dark mode
│   │   ├── globals.css                  # Design system (glass, agents, terminal)
│   │   └── page.tsx                     # Hero / dashboard toggle
│   ├── components/
│   │   ├── Header.tsx                   # Sticky nav + TDAR indicator
│   │   ├── HeroSection.tsx              # Landing headline + stats
│   │   ├── IngestForm.tsx               # Incident submission form
│   │   ├── PipelineGraph.tsx            # React Flow 4-agent live graph
│   │   ├── ConfidencePanel.tsx          # SVG ring + 4-signal breakdown
│   │   ├── EvidencePanel.tsx            # Expandable evidence cards
│   │   ├── LogTerminal.tsx              # SSE log stream terminal
│   │   └── PRStatusCard.tsx             # PR link + daemon notice
│   ├── hooks/
│   │   └── usePipelineSSE.ts            # SSE client + 8-step demo sim
│   ├── next.config.js
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── package.json
│
├── db/
│   └── migrations/
│       └── 001_initial_schema.sql       # 6 tables with indexes
│
├── docker-compose.yml                    # PostgreSQL · Qdrant · MinIO · Go
├── .env.example                          # All 28 layers' config keys
├── .gitignore
├── go.mod
├── LICENSE                               # MIT
└── README.md                             # This document
```

---

## Getting Started

### Prerequisites

Ensure the following are installed before proceeding:

| Tool | Minimum Version | Install |
|------|----------------|---------|
| Docker + Docker Compose | Docker 24.0, Compose 2.27 | [docs.docker.com](https://docs.docker.com) |
| Go | 1.22 | [go.dev/dl](https://go.dev/dl) |
| Node.js | 20 LTS | [nodejs.org](https://nodejs.org) |
| npm | 10+ | Included with Node.js |

**API Credentials Required:**
- [E2B API Key](https://e2b.dev) — for sandbox execution
- [Trigger.dev Account](https://trigger.dev) — for durable workflows
- One of: [Anthropic API Key](https://console.anthropic.com), [OpenAI API Key](https://platform.openai.com), [Google AI Key](https://ai.google.dev)

### Step 1: Clone and Configure

```bash
git clone https://github.com/Jacksonfio/EpiCenter.git
cd EpiCenter
cp .env.example .env
```

Edit `.env` and fill in your credentials:

```bash
# Required for core functionality
TRIGGER_DEV_SECRET_KEY=tr_dev_xxxx
E2B_API_KEY=e2b_xxxx
ANTHROPIC_API_KEY=sk-ant-xxxx  # or OPENAI_API_KEY / GOOGLE_AI_API_KEY
LLM_PROVIDER=anthropic          # anthropic | openai | google

# Required for GitHub integration
GITHUB_APP_ID=123456
GITHUB_APP_PRIVATE_KEY_PATH=./github-app.pem

# Auto-configured by Docker Compose
DATABASE_URL=postgres://epicenter:epicenter_secret@localhost:5432/epicenter_db
```

### Step 2: Start Infrastructure

```bash
docker compose up -d postgres qdrant minio
```

Wait for the health checks to pass (~15 seconds):
```bash
docker compose ps
# NAME                COMMAND                  STATUS
# epicenter_postgres  "docker-entrypoint.s…"   healthy
# epicenter_qdrant    "./qdrant"               running
# epicenter_minio     "/usr/bin/docker-ent…"   running
```

### Step 3: Run the Ingestion Service

```bash
cd cmd/ingestion
go run main.go
```

You should see:
```
[INFO] EpiCenter Ingestion Service listening on :8080
```

Verify it is healthy:
```bash
curl http://localhost:8080/healthz
# {"status":"ok","service":"epicenter-ingestion"}
```

### Step 4: Start Trigger.dev Workflow Runner

```bash
cd workflows
npm install
npx trigger.dev@latest dev
```

### Step 5: Launch the Dashboard

```bash
cd frontend
npm install
npm run dev
```

Navigate to [http://localhost:3000](http://localhost:3000).

### Step 6: Submit a Test Incident

```bash
curl -X POST http://localhost:8080/v1/ingest \
  -H "Content-Type: application/json" \
  -d '{
    "project_id": "proj_demo",
    "repository": "Jacksonfio/EpiCenter",
    "branch": "main",
    "environment": "production",
    "payload": {
      "error_message": "TypeError: Cannot read property '\''user_id'\'' of undefined",
      "stack_trace": "TypeError: Cannot read property '\''user_id'\'' of undefined\n    at AuthService.validateToken (/app/src/auth/service.ts:42:18)\n    at middleware (/app/src/middleware/auth.ts:18:30)",
      "context_logs": [
        "2026-08-04T22:00:00Z [INFO] POST /auth/verify",
        "2026-08-04T22:00:01Z [ERROR] Unhandled exception in AuthService"
      ]
    }
  }'
```

Copy the `dashboard_url` from the response and open it to watch the pipeline execute.

---

## Configuration Reference

### Full `.env.example` Reference

```bash
# ─── Ingestion Service (Go + Fiber) ─────────────────────────────────────────
PORT=8080
EPICENTER_API_SIGNING_SECRET=ep_signing_secret_here

# ─── Database (PostgreSQL 16) ─────────────────────────────────────────────────
DATABASE_URL=postgres://epicenter:epicenter_secret@localhost:5432/epicenter_db

# ─── Workflow Orchestration (Trigger.dev v3) ─────────────────────────────────
TRIGGER_DEV_SECRET_KEY=tr_dev_xxxxxxxxxxxxxxxxxxxxxxxx
TRIGGER_DEV_API_URL=https://api.trigger.dev

# ─── Execution Sandbox (E2B Firecracker) ──────────────────────────────────────
E2B_API_KEY=e2b_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# ─── LLM Provider (BYOK — choose one) ────────────────────────────────────────
LLM_PROVIDER=anthropic                        # anthropic | openai | google
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxx       # Claude Sonnet 4.5
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxx         # GPT-4o
GOOGLE_AI_API_KEY=AIzaxxxxxxxxxxxxxxx          # Gemini 1.5 Pro

# ─── Semantic Retrieval (Qdrant) ──────────────────────────────────────────────
QDRANT_URL=http://localhost:6333
QDRANT_API_KEY=                               # Leave blank for local

# ─── Artifact Storage (MinIO / S3) ───────────────────────────────────────────
MINIO_ENDPOINT=localhost:9000
MINIO_ACCESS_KEY=epicenter_minio
MINIO_SECRET_KEY=epicenter_minio_secret
MINIO_USE_SSL=false
MINIO_BUCKET=epicenter-artifacts

# ─── Secrets Management (HashiCorp Vault) ─────────────────────────────────────
VAULT_ADDR=http://localhost:8200
VAULT_TOKEN=root                              # Dev token — use AppRole in prod

# ─── GitHub App Integration ───────────────────────────────────────────────────
GITHUB_APP_ID=123456
GITHUB_APP_PRIVATE_KEY_PATH=./github-app.private-key.pem
GITHUB_WEBHOOK_SECRET=github_webhook_secret_here
GITHUB_PAT=ghp_xxxx                          # Fallback for development only

# ─── Authentication (Supabase Auth) ──────────────────────────────────────────
SUPABASE_URL=https://xxxxxxxxxxxxxxxx.supabase.co
SUPABASE_ANON_KEY=eyJxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SUPABASE_SERVICE_ROLE_KEY=eyJxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# ─── AI Observability (Langfuse) ─────────────────────────────────────────────
LANGFUSE_PUBLIC_KEY=pk-lf-xxxxxxxxxxxxxxxxxxxxxxxx
LANGFUSE_SECRET_KEY=sk-lf-xxxxxxxxxxxxxxxxxxxxxxxx
LANGFUSE_HOST=https://cloud.langfuse.com

# ─── Frontend ─────────────────────────────────────────────────────────────────
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# ─── Dashboard URL Base ───────────────────────────────────────────────────────
DASHBOARD_BASE_URL=http://localhost:3000
```

---

## Contributing

### Development Setup

1. Fork the repository and clone your fork
2. Follow the Getting Started guide above
3. Create a feature branch: `git checkout -b feat/your-feature-name`
4. Make your changes with tests
5. Run the test suite:
   ```bash
   # Go tests
   cd cmd/ingestion && go test ./...

   # TypeScript tests
   cd orchestration && npm test

   # Frontend type check
   cd frontend && npm run typecheck
   ```
6. Open a Pull Request against `main`

### Code Style

- **Go**: `gofmt` formatting enforced by CI; `golangci-lint` for static analysis
- **TypeScript**: `tsc --noEmit` enforced by CI; no `any` types without justification
- **Commits**: Conventional commits format — `feat:`, `fix:`, `docs:`, `test:`

### Adding a New Language to Code Intelligence

To add support for a new language (e.g., Rust):

1. Add `tree-sitter-rust` to `orchestration/package.json`
2. Add Rust stack trace regex pattern to `pkg/scrubber/scrubber.go`
3. Add Rust grammar loading to `orchestration/src/tools/treesitter.ts`
4. Add Rust CodeQL queries to `orchestration/src/tools/codeql.ts`
5. Update the language support matrix in this README

---

## License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.

---

<div align="center">

<br/>

**EpiCenter** · Find the Fault. Prove the Fix.

*Test-Driven Autonomous Repair for Production Incidents*

<br/>

[GitHub](https://github.com/Jacksonfio/EpiCenter) &nbsp;·&nbsp;
[Issues](https://github.com/Jacksonfio/EpiCenter/issues) &nbsp;·&nbsp;
[MIT License](LICENSE)

<br/>

</div>
