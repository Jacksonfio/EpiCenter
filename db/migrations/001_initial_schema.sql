-- EpiCenter PostgreSQL Schema
-- Migration: 001_initial_schema.sql

-- ─── Projects ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS projects (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            TEXT NOT NULL,
    repository      TEXT NOT NULL UNIQUE,  -- "owner/repo" format
    installation_id BIGINT,                -- GitHub App installation ID
    default_branch  TEXT NOT NULL DEFAULT 'main',
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Incidents ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS incidents (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id      UUID REFERENCES projects(id) ON DELETE CASCADE,
    repository      TEXT NOT NULL,
    branch          TEXT NOT NULL DEFAULT 'main',
    environment     TEXT NOT NULL DEFAULT 'production',
    payload         JSONB NOT NULL,        -- Redacted incident payload
    fingerprint     TEXT NOT NULL,         -- SHA-256 of (repo, error, stack)
    workflow_run_id TEXT,                  -- Trigger.dev run ID
    status          TEXT NOT NULL DEFAULT 'QUEUED'
                    CHECK (status IN ('QUEUED', 'RUNNING', 'COMPLETED', 'HALTED_FOR_REVIEW', 'ERROR', 'RESOLVED', 'REJECTED', 'DUPLICATE')),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_incidents_fingerprint ON incidents(fingerprint);
CREATE INDEX IF NOT EXISTS idx_incidents_status ON incidents(status);
CREATE INDEX IF NOT EXISTS idx_incidents_project_id ON incidents(project_id);

-- ─── Evidence Records ──────────────────────────────────────────────────────────
-- Append-only: records are never updated or deleted during a run
CREATE TABLE IF NOT EXISTS evidence (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    incident_id     UUID NOT NULL REFERENCES incidents(id) ON DELETE CASCADE,
    type            TEXT NOT NULL
                    CHECK (type IN ('AST_CONTEXT', 'CODEQL_FINDING', 'QDRANT_HIT', 'SANDBOX_LOG', 'TEST_OUTPUT', 'PATCH_DIFF', 'BLAST_RADIUS')),
    label           TEXT NOT NULL,
    content         TEXT NOT NULL,
    citation_file   TEXT,                  -- File path in the repository
    citation_start  INT,                   -- Starting line number
    citation_end    INT,                   -- Ending line number
    codeql_rule_id  TEXT,                  -- CodeQL rule ID (for CODEQL_FINDING type)
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_evidence_incident_id ON evidence(incident_id);
CREATE INDEX IF NOT EXISTS idx_evidence_type ON evidence(type);

-- ─── Confidence Scores ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS confidence_scores (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    incident_id     UUID NOT NULL REFERENCES incidents(id) ON DELETE CASCADE,
    workflow_run_id TEXT,
    test_signal     NUMERIC(5,2) NOT NULL DEFAULT 0,
    codeql_signal   NUMERIC(5,2) NOT NULL DEFAULT 0,
    blast_signal    NUMERIC(5,2) NOT NULL DEFAULT 0,
    llm_signal      NUMERIC(5,2) NOT NULL DEFAULT 0,
    total_score     NUMERIC(5,2) NOT NULL DEFAULT 0,
    threshold_met   BOOLEAN NOT NULL DEFAULT FALSE,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Pull Request Citations ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS patch_citations (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    incident_id     UUID NOT NULL REFERENCES incidents(id) ON DELETE CASCADE,
    evidence_id     UUID NOT NULL REFERENCES evidence(id) ON DELETE CASCADE,
    pr_number       INT,
    pr_url          TEXT,
    claim_text      TEXT NOT NULL,         -- The specific PR claim backed by this evidence
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Observation Daemon Watchlist ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS watchlist (
    id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    incident_id             UUID NOT NULL REFERENCES incidents(id),
    fingerprint             TEXT NOT NULL UNIQUE,
    repository              TEXT NOT NULL,
    pr_number               INT,
    pr_url                  TEXT,
    merged_at               TIMESTAMPTZ NOT NULL,
    watch_until             TIMESTAMPTZ NOT NULL,
    status                  TEXT NOT NULL DEFAULT 'ACTIVE'
                            CHECK (status IN ('ACTIVE', 'REGRESSION_DETECTED', 'EXPIRED', 'CANCELLED')),
    regression_incident_id  UUID REFERENCES incidents(id),
    created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_watchlist_fingerprint ON watchlist(fingerprint);
CREATE INDEX IF NOT EXISTS idx_watchlist_status ON watchlist(status);

-- ─── Auto-update updated_at trigger ───────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_incidents_updated_at BEFORE UPDATE ON incidents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
