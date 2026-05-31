# DSA Studio — Operations Runbooks

Minimum runbooks for Phase 6 production operations. See also `.claude/specs/deployment.md`.

---

## 1. Sandbox backlog

**Symptoms:** Code run/submit queues grow; users see long execution times.

**Actions:**
1. Check API logs for `[sandbox]` warnings and execution timeouts.
2. If using Docker sandbox (`SANDBOX_USE_DOCKER=true`), scale worker capacity or rebuild images:
   ```bash
   npm run sandbox:build
   ```
3. Verify host Docker daemon is healthy; restart stuck containers.
4. Temporarily fall back to local execution only in non-production if needed.

---

## 2. Database connection exhaustion

**Symptoms:** 503/500 errors, Prisma `P1001` / pool timeout in logs.

**Actions:**
1. Check active connections on PostgreSQL (`pg_stat_activity`).
2. Review slow queries; add indexes if analytics endpoints are hot.
3. Reduce Prisma pool size or add PgBouncer for high traffic.
4. Restart API pods/containers after pool recovery.

---

## 3. LLM provider outage

**Symptoms:** Chat/hint/classify endpoints return 503 or mock responses.

**Actions:**
1. Confirm `LLM_PROVIDER` and API keys in secrets manager.
2. Chat degrades gracefully to mock provider when keys are missing.
3. Static DB hints remain available via `GET /api/questions/:id/hints`.
4. Set `LLM_PROVIDER=mock` temporarily to restore UX without external calls.

---

## 4. Failed migration

**Symptoms:** API container exits on startup during `prisma migrate deploy`.

**Actions:**
1. Inspect migration error in container logs.
2. Restore DB from latest backup before retry.
3. Fix migration SQL locally; test with staging DB clone.
4. Redeploy only after `migrate deploy` succeeds on staging.

---

## 5. Monitoring & SLOs

| Endpoint | Purpose |
|----------|---------|
| `GET /api/health` | Liveness / smoke checks |
| `GET /api/metrics` | Prometheus scrape (uptime, request counts, P95, 5xx) |

**Targets:** API P95 &lt; 200ms · submission &lt; 5s · uptime 99.9% · alert if 5xx &gt; 1% over 5m.

---

## 6. Database backup

- Enable automated daily backups on managed PostgreSQL (RDS, Cloud SQL, etc.).
- For Docker Compose production, schedule `pg_dump` to object storage:
  ```bash
  docker exec dsa-postgres pg_dump -U postgres dsa_studio > backup-$(date +%F).sql
  ```
- Test restore quarterly on a staging instance.

---

## 7. Deploy (Docker Compose production)

```bash
cp infra/docker/.env.prod.example infra/docker/.env
# Edit secrets, then:
docker compose -f infra/docker/docker-compose.prod.yml --env-file infra/docker/.env up -d --build
```

Smoke test:
```bash
curl -sf http://localhost:8080/
curl -sf http://localhost:4000/api/health
curl -sf http://localhost:4000/api/metrics
```
