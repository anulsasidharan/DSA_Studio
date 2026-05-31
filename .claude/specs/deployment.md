# Deployment & Operations — DSA Studio

*Extracted from `.claude/rules/CLAUDE.md` § Technical Stack (DevOps) and Phase 6*

---

## Local development

```bash
# From repo root (after scaffold exists)
docker compose -f infra/docker/docker-compose.yml up -d   # postgres, redis
cd apps/api && npm install && npx prisma migrate dev
cd apps/web && npm install && npm run dev
```

| Service | Port (suggested) |
|---------|------------------|
| Web (Vite) | 5173 |
| API (Express) | 4000 |
| PostgreSQL | 5432 |
| Redis | 6379 |

Use `.env.example` in `apps/api` and `apps/web`.

---

## Docker services (production-oriented)

| Container | Role |
|-----------|------|
| `dsa-web` | Static build or Node SSR |
| `dsa-api` | Express API |
| `dsa-sandbox` | Ephemeral workers for code execution |
| `postgres` | Primary DB |
| `redis` | Cache + rate limits |

Sandbox containers: **no network**, CPU/memory limits, kill after timeout (5s spec target).

---

## CI/CD (GitHub Actions)

**On pull request:**

- Lint (ESLint) web + api  
- Typecheck (`tsc --noEmit`)  
- Unit tests (Jest)  
- API integration tests (Supertest + test DB)  

**On main:**

- Build Docker images  
- Push to registry  
- Deploy to staging  
- Optional Playwright smoke on staging  

---

## Environments

| Env | Purpose |
|-----|---------|
| `development` | Local compose |
| `staging` | Full stack, anonymized seed data |
| `production` | HA DB, managed Redis, secrets in vault |

---

## Secrets management

| Secret | Storage |
|--------|---------|
| `DATABASE_URL` | Platform secret manager |
| `JWT_SECRET` | Rotatable secret |
| LLM API keys | Never in frontend bundle |
| S3/GCS credentials | API only |

---

## Database operations

- Automated daily backups (managed PostgreSQL)  
- Migration run before new API revision deploy  
- Connection pooling (PgBouncer or Prisma pool)  

---

## Monitoring & SLOs

| Metric | Target |
|--------|--------|
| API P95 latency | &lt; 200ms |
| Submission execution | &lt; 5s |
| Uptime | 99.9% |
| Error rate | Alert if &gt; 1% 5xx over 5m |

Tools: Prometheus + Grafana or cloud-native equivalent (CloudWatch, etc.).

---

## Logging

- Structured JSON logs from API  
- `requestId` on every request  
- Do not log: passwords, JWT, full user code blobs at INFO (use DEBUG gated)  

---

## Runbooks (minimum)

1. **Sandbox backlog** — scale worker replicas  
2. **DB connection exhaustion** — check pool size, slow queries  
3. **LLM provider outage** — degrade chat to “try again”; hints fall back to static DB hints  
4. **Failed migration** — rollback procedure documented per release  

---

## Cloud options (Phase 6)

- **Simple:** Railway, Render, or Fly.io for API + web; managed PostgreSQL  
- **Scale:** AWS (ECS/EKS) or GCP with load balancer, S3/GCS for assets  

Record chosen provider in `MEMORY.md` when decided.
