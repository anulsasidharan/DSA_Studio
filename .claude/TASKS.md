# TASKS.md — DSA Studio

> Granular checklist for visible progress.  
> Plan: `PLAN.md` · Phases: `PLAN_PHASE.md` · Spec: `rules/CLAUDE.md`

**Branch convention:** `feature/<short-description>`  
**Status:** `✅ Completed` · `❌ Pending`

---

## Phase 1 — Foundation

| Task | Branch | Status |
|------|--------|--------|
| P1-1 · Monorepo scaffold (`apps/web`, `apps/api`, `packages/shared`) | `feature/monorepo-scaffold` | ❌ Pending |
| P1-2 · Docker Compose (PostgreSQL, Redis) | `feature/docker-compose` | ❌ Pending |
| P1-3 · Prisma schema (all tables from spec) | `feature/prisma-schema` | ❌ Pending |
| P1-4 · Auth (JWT register/login/me) | `feature/auth-jwt` | ❌ Pending |
| P1-5 · Topics & questions REST + validation | `feature/core-apis` | ❌ Pending |
| P1-6 · DB seed (sample topics/questions) | `feature/db-seed` | ❌ Pending |
| P1-7 · Swagger / OpenAPI | `feature/openapi` | ❌ Pending |

---

## Phase 2 — Learning Hub

| Task | Branch | Status |
|------|--------|--------|
| P2-1 · Topic browser UI | `feature/topic-browser` | ❌ Pending |
| P2-2 · Topic detail + theory section | `feature/topic-detail` | ❌ Pending |
| P2-3 · Question practice page layout | `feature/question-page` | ❌ Pending |
| P2-4 · Monaco editor integration | `feature/monaco-editor` | ❌ Pending |
| P2-5 · Code execution sandbox (Docker) | `feature/code-sandbox` | ❌ Pending |
| P2-6 · Submit API + attempt logging | `feature/submit-flow` | ❌ Pending |
| P2-7 · Hints API + UI | `feature/hints` | ❌ Pending |
| P2-8 · Solutions viewer | `feature/solutions-view` | ❌ Pending |

---

## Phase 3 — Progress Tracking

| Task | Branch | Status |
|------|--------|--------|
| P3-1 · Progress & daily activity APIs | `feature/progress-api` | ❌ Pending |
| P3-2 · Streak logic | `feature/streaks` | ❌ Pending |
| P3-3 · Analytics aggregation | `feature/analytics-api` | ❌ Pending |
| P3-4 · Dashboard UI (summary + charts) | `feature/dashboard-ui` | ❌ Pending |
| P3-5 · Calendar + goals UI | `feature/goals-calendar` | ❌ Pending |
| P3-6 · Badges (minimal) | `feature/badges` | ❌ Pending |

---

## Phase 4 — Advanced Features

| Task | Branch | Status |
|------|--------|--------|
| P4-1 · Revision queue model + scheduler | `feature/revision-scheduler` | ❌ Pending |
| P4-2 · Revision APIs (due, complete, add) | `feature/revision-api` | ❌ Pending |
| P4-3 · Revision dashboard UI | `feature/revision-ui` | ❌ Pending |
| P4-4 · Manual question entry | `feature/import-manual` | ❌ Pending |
| P4-5 · CSV + JSON import | `feature/import-bulk` | ❌ Pending |
| P4-6 · URL-assisted import + history | `feature/import-url` | ❌ Pending |

---

## Phase 5 — AI Integration

| Task | Branch | Status |
|------|--------|--------|
| P5-1 · LLM provider integration | `feature/llm-client` | ❌ Pending |
| P5-2 · Chat API + context builder | `feature/chat-api` | ❌ Pending |
| P5-3 · Chatbot UI | `feature/chat-ui` | ❌ Pending |
| P5-4 · Code review endpoint | `feature/code-review` | ❌ Pending |
| P5-5 · Import AI classification | `feature/ai-classify` | ❌ Pending |
| P5-6 · Learning path recommendations | `feature/learning-path-ai` | ❌ Pending |

---

## Phase 6 — Polish & Launch

| Task | Branch | Status |
|------|--------|--------|
| P6-1 · Responsive + a11y pass | `feature/responsive-a11y` | ❌ Pending |
| P6-2 · Performance optimization | `feature/perf` | ❌ Pending |
| P6-3 · Unit + integration test suite | `feature/tests` | ❌ Pending |
| P6-4 · Playwright E2E (critical paths) | `feature/e2e` | ❌ Pending |
| P6-5 · CI/CD pipeline | `feature/cicd` | ❌ Pending |
| P6-6 · Production deploy + monitoring | `feature/deploy` | ❌ Pending |

---

## How to update

1. Mark task ✅ when merged to main development branch.  
2. Update `MEMORY.md` phase tracker when all rows in a phase are ✅.  
3. Add new rows only with matching `PLAN_PHASE.md` scope.
