package main

import (
	"context"
	"crypto/sha256"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"

	"github.com/Jacksonfio/epicenter/pkg/scrubber"
)

// ─── Domain Types ────────────────────────────────────────────────────────────

// IncidentPayload represents the incoming incident body submitted by clients.
type IncidentPayload struct {
	ProjectID    string          `json:"project_id" validate:"required"`
	Repository   string          `json:"repository" validate:"required"`
	Branch       string          `json:"branch"`
	Environment  string          `json:"environment"`
	Payload      IncidentDetails `json:"payload" validate:"required"`
}

// IncidentDetails holds the raw error signal from production.
type IncidentDetails struct {
	ErrorMessage string   `json:"error_message" validate:"required"`
	StackTrace   string   `json:"stack_trace"`
	ContextLogs  []string `json:"context_logs"`
}

// IngestResponse is the response returned after successfully queuing an incident.
type IngestResponse struct {
	IncidentID    string `json:"incident_id"`
	Fingerprint   string `json:"fingerprint"`
	WorkflowRunID string `json:"workflow_run_id"`
	Status        string `json:"status"`
	DashboardURL  string `json:"dashboard_url"`
	CreatedAt     string `json:"created_at"`
}

// ─── Application ─────────────────────────────────────────────────────────────

func main() {
	// Load .env for local development
	if err := godotenv.Load(); err != nil {
		log.Println("[WARN] No .env file found, using environment variables")
	}

	// Connect to PostgreSQL
	dbPool, err := pgxpool.New(context.Background(), os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatalf("[FATAL] Failed to connect to PostgreSQL: %v", err)
	}
	defer dbPool.Close()

	// Bootstrap Fiber
	app := fiber.New(fiber.Config{
		AppName:      "EpiCenter Ingestion Service v1.0",
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
		ErrorHandler: globalErrorHandler,
	})

	// ─── Middleware ───────────────────────────────────────────────────────────
	app.Use(recover.New())
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowHeaders: "Origin, Content-Type, Accept, X-EpiCenter-Key",
	}))
	app.Use(logger.New(logger.Config{
		Format: "[${time}] ${status} ${method} ${path} ${latency}\n",
	}))

	// ─── Routes ───────────────────────────────────────────────────────────────
	app.Get("/healthz", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{"status": "ok", "service": "epicenter-ingestion"})
	})

	v1 := app.Group("/v1")
	v1.Post("/ingest", ingestHandler(dbPool))

	port := getEnv("PORT", "8080")
	log.Printf("[INFO] EpiCenter Ingestion Service listening on :%s", port)
	log.Fatal(app.Listen(":" + port))
}

// ─── Handlers ────────────────────────────────────────────────────────────────

func ingestHandler(db *pgxpool.Pool) fiber.Handler {
	return func(c *fiber.Ctx) error {
		var req IncidentPayload

		// Parse and validate request body
		if err := c.BodyParser(&req); err != nil {
			return fiber.NewError(fiber.StatusBadRequest, "invalid JSON payload: "+err.Error())
		}

		if req.ProjectID == "" || req.Repository == "" || req.Payload.ErrorMessage == "" {
			return fiber.NewError(fiber.StatusUnprocessableEntity, "project_id, repository, and payload.error_message are required")
		}

		// ── Step 1: Redact PII & Secrets before any persistence ──────────────
		s := scrubber.New()
		req.Payload.StackTrace = s.Scrub(req.Payload.StackTrace)
		req.Payload.ErrorMessage = s.Scrub(req.Payload.ErrorMessage)
		for i, logLine := range req.Payload.ContextLogs {
			req.Payload.ContextLogs[i] = s.Scrub(logLine)
		}

		// ── Step 2: Generate deterministic SHA-256 fingerprint ────────────────
		fingerprint := generateFingerprint(req.Repository, req.Payload.ErrorMessage, req.Payload.StackTrace)

		// ── Step 3: Deduplication check via PostgreSQL ────────────────────────
		var existingID string
		dedupErr := db.QueryRow(
			context.Background(),
			`SELECT id FROM incidents WHERE fingerprint = $1 AND status NOT IN ('RESOLVED', 'REJECTED') LIMIT 1`,
			fingerprint,
		).Scan(&existingID)

		if dedupErr == nil && existingID != "" {
			// Duplicate found — return existing incident reference
			return c.Status(fiber.StatusConflict).JSON(fiber.Map{
				"incident_id":  existingID,
				"fingerprint":  fingerprint,
				"status":       "DUPLICATE",
				"message":      "An active pipeline run already exists for this error signature",
				"dashboard_url": buildDashboardURL(existingID),
			})
		}

		// ── Step 4: Persist incident to PostgreSQL ────────────────────────────
		incidentID := uuid.New().String()
		payloadJSON, _ := json.Marshal(req.Payload)

		_, dbErr := db.Exec(
			context.Background(),
			`INSERT INTO incidents (id, project_id, repository, branch, environment, payload, fingerprint, status, created_at)
             VALUES ($1, $2, $3, $4, $5, $6, $7, 'QUEUED', NOW())`,
			incidentID, req.ProjectID, req.Repository,
			getDefault(req.Branch, "main"),
			getDefault(req.Environment, "production"),
			payloadJSON, fingerprint,
		)
		if dbErr != nil {
			log.Printf("[ERROR] Failed to persist incident: %v", dbErr)
			return fiber.NewError(fiber.StatusInternalServerError, "failed to persist incident")
		}

		// ── Step 5: Dispatch Trigger.dev workflow ─────────────────────────────
		workflowRunID, wfErr := dispatchWorkflow(incidentID, fingerprint, req)
		if wfErr != nil {
			log.Printf("[WARN] Failed to dispatch workflow for incident %s: %v", incidentID, wfErr)
			workflowRunID = "pending"
		}

		// ── Step 6: Update incident with workflow run ID ──────────────────────
		db.Exec(
			context.Background(),
			`UPDATE incidents SET workflow_run_id = $1 WHERE id = $2`,
			workflowRunID, incidentID,
		)

		return c.Status(fiber.StatusAccepted).JSON(IngestResponse{
			IncidentID:    incidentID,
			Fingerprint:   fingerprint,
			WorkflowRunID: workflowRunID,
			Status:        "QUEUED",
			DashboardURL:  buildDashboardURL(incidentID),
			CreatedAt:     time.Now().UTC().Format(time.RFC3339),
		})
	}
}

// ─── Utilities ────────────────────────────────────────────────────────────────

// generateFingerprint creates a stable SHA-256 hash representing a unique error signature.
func generateFingerprint(repo, errMsg, stackTrace string) string {
	raw := fmt.Sprintf("%s|%s|%s", repo, errMsg, stackTrace)
	hash := sha256.Sum256([]byte(raw))
	return fmt.Sprintf("%x", hash)
}

// dispatchWorkflow triggers a Trigger.dev pipeline run for the given incident.
// In a real deployment this sends an HTTP request to the Trigger.dev API.
func dispatchWorkflow(incidentID, fingerprint string, req IncidentPayload) (string, error) {
	triggerURL := os.Getenv("TRIGGER_DEV_API_URL")
	triggerKey := os.Getenv("TRIGGER_DEV_SECRET_KEY")

	if triggerURL == "" || triggerKey == "" {
		return fmt.Sprintf("wf_local_%s", incidentID[:8]), nil
	}

	log.Printf("[INFO] Dispatching Trigger.dev workflow for incident %s (fingerprint: %s...)", incidentID, fingerprint[:16])
	// TODO: implement Trigger.dev HTTP trigger call
	return fmt.Sprintf("wf_run_%s", uuid.New().String()[:8]), nil
}

func buildDashboardURL(incidentID string) string {
	base := getEnv("DASHBOARD_BASE_URL", "http://localhost:3000")
	return fmt.Sprintf("%s/incidents/%s", base, incidentID)
}

func globalErrorHandler(c *fiber.Ctx, err error) error {
	code := fiber.StatusInternalServerError
	if e, ok := err.(*fiber.Error); ok {
		code = e.Code
	}
	return c.Status(code).JSON(fiber.Map{"error": err.Error()})
}

func getEnv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}

func getDefault(s, fallback string) string {
	if s == "" {
		return fallback
	}
	return s
}
