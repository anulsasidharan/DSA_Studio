# TASKS.md — DSA Studio

> Granular checklist for visible progress.  
> Plan: `PLAN.md` · Phases: `PLAN_PHASE.md` · Spec: `rules/CLAUDE.md`

**Branch convention:** `feature/<short-description>`  
**Status:** `✅ Completed` · `❌ Pending`

---

## Phase 1 — Foundation

| Task | Branch | Status |
|------|--------|--------|
| P1-1 · Monorepo scaffold (`apps/web`, `apps/api`, `packages/shared`) | `feature/monorepo-scaffold` | ✅ Completed |
| P1-2 · Docker Compose (PostgreSQL, Redis) | `feature/docker-compose` | ✅ Completed |
| P1-3 · Prisma schema (all tables from spec) | `feature/prisma-schema` | ✅ Completed |
| P1-4 · Auth (JWT register/login/me) | `feature/auth-jwt` | ✅ Completed |
| P1-5 · Topics & questions REST + validation | `feature/core-apis` | ✅ Completed |
| P1-6 · DB seed (sample topics/questions) | `feature/db-seed` | ✅ Completed |
| P1-7 · Swagger / OpenAPI | `feature/openapi` | ✅ Completed |

---

## Phase 2 — Learning Hub

| Task | Branch | Status |
|------|--------|--------|
| P2-1 · Topic browser UI | `feature/topic-browser` | ✅ Completed |
| P2-2 · Topic detail + theory section | `feature/topic-detail` | ✅ Completed |
| P2-3 · Question practice page layout | `feature/question-page` | ✅ Completed |
| P2-4 · Monaco editor integration | `feature/monaco-editor` | ✅ Completed |
| P2-5 · Code execution sandbox (Docker) | `feature/code-sandbox` | ✅ Completed |
| P2-6 · Submit API + attempt logging | `feature/submit-flow` | ✅ Completed |
| P2-7 · Hints API + UI | `feature/hints` | ✅ Completed |
| P2-8 · Solutions viewer | `feature/solutions-view` | ✅ Completed |

---

## Phase 3 — Progress Tracking

| Task | Branch | Status |
|------|--------|--------|
| P3-1 · Progress & daily activity APIs | `feature/progress-api` | ✅ Completed |
| P3-2 · Streak logic | `feature/streaks` | ✅ Completed |
| P3-3 · Analytics aggregation | `feature/analytics-api` | ✅ Completed |
| P3-4 · Dashboard UI (summary + charts) | `feature/dashboard-ui` | ✅ Completed |
| P3-5 · Calendar + goals UI | `feature/goals-calendar` | ✅ Completed |
| P3-6 · Badges (minimal) | `feature/badges` | ✅ Completed |

---

## Phase 4 — Advanced Features

| Task | Branch | Status |
|------|--------|--------|
| P4-1 · Revision queue model + scheduler | `feature/revision-scheduler` | ✅ Completed |
| P4-2 · Revision APIs (due, complete, add) | `feature/revision-api` | ✅ Completed |
| P4-3 · Revision dashboard UI | `feature/revision-ui` | ✅ Completed |
| P4-4 · Manual question entry | `feature/import-manual` | ✅ Completed |
| P4-5 · CSV + JSON import | `feature/import-bulk` | ✅ Completed |
| P4-6 · URL-assisted import + history | `feature/import-url` | ✅ Completed |

---

## Phase 5 — AI Integration

| Task | Branch | Status |
|------|--------|--------|
| P5-1 · LLM provider integration | `feature/llm-client` | ✅ Completed |
| P5-2 · Chat API + context builder | `feature/chat-api` | ✅ Completed |
| P5-3 · Chatbot UI | `feature/chat-ui` | ✅ Completed |
| P5-4 · Code review endpoint | `feature/code-review` | ✅ Completed |
| P5-5 · Import AI classification | `feature/ai-classify` | ✅ Completed |
| P5-6 · Learning path recommendations | `feature/learning-path-ai` | ✅ Completed |

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
