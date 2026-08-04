import { task, wait } from "@trigger.dev/sdk/v3";
import pg from "pg";

const { Pool } = pg;

export interface ObservationDaemonPayload {
  incidentId: string;
  fingerprint: string;
  repository: string;
  pullRequestNumber: number;
  pullRequestUrl: string;
  mergedAt: string;
}

const WATCH_DURATION_HOURS = 48;
const CHECK_INTERVAL_MINUTES = 30;

/**
 * Observation Daemon — post-merge regression monitor.
 *
 * Watches a merged fix's fault fingerprint for 48 hours after merge.
 * If the same fingerprint reappears in production during that window,
 * automatically opens a Revert PR and notifies the team.
 */
export const observationDaemonTask = task({
  id: "epicenter.observation-daemon",
  maxDuration: 3600 * WATCH_DURATION_HOURS, // 48 hours

  run: async (payload: ObservationDaemonPayload, { ctx }) => {
    const { incidentId, fingerprint, repository, pullRequestNumber, pullRequestUrl } = payload;
    const mergedAt = new Date(payload.mergedAt);
    const watchUntil = new Date(mergedAt.getTime() + WATCH_DURATION_HOURS * 3600 * 1000);

    console.log(`[Daemon] Watching fingerprint ${fingerprint.slice(0, 16)}... until ${watchUntil.toISOString()}`);

    const db = new Pool({ connectionString: process.env.DATABASE_URL });

    // ── Register fingerprint on the 48h watchlist ──────────────────────
    await db.query(
      `INSERT INTO watchlist (incident_id, fingerprint, repository, pr_number, pr_url, merged_at, watch_until, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'ACTIVE')
       ON CONFLICT (fingerprint) DO UPDATE SET status = 'ACTIVE', watch_until = $7`,
      [incidentId, fingerprint, repository, pullRequestNumber, pullRequestUrl, mergedAt, watchUntil]
    );

    // ── Poll for fingerprint recurrence every 30 minutes ──────────────
    const totalChecks = (WATCH_DURATION_HOURS * 60) / CHECK_INTERVAL_MINUTES;

    for (let checkNum = 0; checkNum < totalChecks; checkNum++) {
      const now = new Date();
      if (now >= watchUntil) break;

      // Check if the same fingerprint has appeared in new incidents since merge
      const { rows } = await db.query(
        `SELECT id, created_at FROM incidents
         WHERE fingerprint = $1
           AND created_at > $2
           AND id != $3
         ORDER BY created_at DESC
         LIMIT 1`,
        [fingerprint, mergedAt, incidentId]
      );

      if (rows.length > 0) {
        const regressionIncidentId = rows[0].id;
        console.log(`[Daemon] REGRESSION DETECTED for fingerprint ${fingerprint.slice(0, 16)} — incident ${regressionIncidentId}`);

        // Mark watchlist entry as regressed
        await db.query(
          `UPDATE watchlist SET status = 'REGRESSION_DETECTED', regression_incident_id = $1 WHERE fingerprint = $2`,
          [regressionIncidentId, fingerprint]
        );

        // TODO: Open GitHub Revert PR via Octokit
        // await openRevertPR({ repository, pullRequestNumber, regressionIncidentId });

        await db.end();
        return {
          status: "REGRESSION_DETECTED",
          fingerprint,
          originalIncidentId: incidentId,
          regressionIncidentId,
          detectedAt: new Date().toISOString(),
        };
      }

      // Wait for next check interval
      await wait.for({ minutes: CHECK_INTERVAL_MINUTES });
    }

    // Watchlist period expired — no regression detected
    await db.query(
      `UPDATE watchlist SET status = 'EXPIRED' WHERE fingerprint = $1`,
      [fingerprint]
    );

    await db.end();
    console.log(`[Daemon] 48h watch period expired for ${fingerprint.slice(0, 16)} — no regression detected`);

    return {
      status: "WATCH_EXPIRED",
      fingerprint,
      originalIncidentId: incidentId,
      watchedUntil: watchUntil.toISOString(),
    };
  },
});
