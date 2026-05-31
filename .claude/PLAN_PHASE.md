# PLAN_PHASE.md — DSA Studio

Phased delivery from **`.claude/rules/CLAUDE.md` § Implementation Roadmap** (6 phases, ~24 weeks). Tasks are **checklist items** for agents and developers—not fixed calendar dates unless program management assigns them.

**Status key:** Use `TASKS.md` for `✅` / `❌` per sub-task.

---

## Phase 1 — Foundation (Weeks 1–4)

**Goal:** Runnable monorepo, PostgreSQL schema, JWT auth, core CRUD APIs for topics/questions, Swagger docs.

### Weeks 1–2: Project setup & infrastructure

- [ ] Initialize monorepo: `apps/web` (React + TS + Tailwind + shadcn), `apps/api` (Express + TS)
- [ ] `packages/shared` — shared TypeScript types
- [ ] Docker Compose: PostgreSQL 15, Redis
- [ ] Prisma (or TypeORM) — all tables from spec § Data Model
- [ ] `.env.example` + gitignore secrets
- [ ] JWT auth: register, login, logout, `GET /api/auth/me`

**Exit:** `docker compose up` + login returns JWT; health check green.

### Weeks 3–4: Core database & API

- [ ] Seed script: sample topics + 5–10 questions per major category
- [ ] REST: topics list/detail, questions list/detail/filter
- [ ] Solutions CRUD (read for learners; write for admin/import)
- [ ] Input validation + centralized error handler
- [ ] OpenAPI / Swagger at `/api/docs`

**Exit:** Postman/curl can list topics and fetch question with test cases (samples only).

---

## Phase 2 — Learning Hub (Weeks 5–8)

**Goal:** Topic browser, theory pages, practice UI with Monaco, submission evaluation.

### Weeks 5–6: Topic & question UI

- [ ] Topic grid/list with filters (category, difficulty, progress)
- [ ] Topic detail: theory tab, practice list by difficulty
- [ ] Question detail: statement, constraints, examples
- [ ] Monaco integration + language selector

**Exit:** User navigates topic → question without errors.

### Weeks 7–8: Practice & submission

- [ ] Docker-based code execution service
- [ ] Run against sample test cases (client or API)
- [ ] `POST /api/submit` — hidden tests, status, timing
- [ ] `user_attempts` + `user_progress` updates
- [ ] Solutions tab (post-attempt or always — document policy in MEMORY)
- [ ] Progressive hints endpoint `GET /api/questions/:id/hints`

**Exit:** Submit correct solution → `accepted` + progress `solved`.

---

## Phase 3 — Progress Tracking (Weeks 9–12)

**Goal:** Analytics dashboard, daily activity, streaks, goals.

### Weeks 9–10: Progress backend

- [ ] `GET/POST /api/progress`, daily activity APIs
- [ ] Streak calculation on goal met
- [ ] Analytics aggregation endpoints

**Exit:** API returns streak and per-topic completion %.

### Weeks 11–12: Tracker UI

- [ ] Dashboard: daily summary card, quick stats
- [ ] Charts: heatmap, weekly bar, topic pie (Recharts/Chart.js)
- [ ] Calendar view + goal setting UI
- [ ] Achievement badges (minimal set)

**Exit:** Dashboard matches spec wireframe intent (§ Daily Tracker).

---

## Phase 4 — Advanced Features (Weeks 13–16)

**Goal:** Spaced repetition + custom question import.

### Weeks 13–14: Revision system

- [ ] `revision_queue` CRUD + due today query
- [ ] Schedule on solve (1, 3, 7, 14, 30 day intervals)
- [ ] Priority calculation per spec Python logic (port to TS)
- [ ] Revision dashboard UI

**Exit:** Solved question appears in due queue on correct day.

### Weeks 15–16: Custom questions

- [ ] Manual entry form (rich text + test case builder)
- [ ] CSV + JSON bulk import with validation
- [ ] URL-assisted import (user review step)
- [ ] `custom_questions` linkage + import history API

**Exit:** User imports 1 question via JSON and sees it in practice list.

---

## Phase 5 — AI Integration (Weeks 17–20)

**Goal:** Chatbot, hint generation, import classification.

### Weeks 17–18: Chatbot

- [ ] Integrate OpenAI or Claude API
- [ ] `POST /api/chat/query`, hint, review endpoints
- [ ] Chat UI panel with history
- [ ] Context: current question + last attempt (no PII in logs)

**Exit:** User asks for concept help and receives structured explanation.

### Weeks 19–20: AI enhancements

- [ ] Auto-classify imported question difficulty/tags
- [ ] Learning path suggestions (rule-based + AI)
- [ ] Adaptive hint depth based on attempt count

**Exit:** JSON import suggests tags; user confirms before save.

---

## Phase 6 — Polish & Launch (Weeks 21–24)

**Goal:** Production-ready UX, tests, deploy, monitor.

### Weeks 21–22: UI/UX

- [ ] Responsive layouts; mobile-friendly practice view
- [ ] Animations/transitions (subtle)
- [ ] Performance: lazy routes, Monaco on demand
- [ ] User testing fixes

### Weeks 23–24: Test & deploy

- [ ] Jest unit + Supertest integration; Playwright E2E critical paths
- [ ] GitHub Actions CI (lint, test, build)
- [ ] Production Docker/K8s or PaaS deploy
- [ ] Grafana/Prometheus or managed monitoring
- [ ] Runbook: DB backup, sandbox scaling

**Exit:** Staging deploy passes smoke test; SLO dashboards live.

---

## Phase gate checklist (before marking phase complete)

1. All `TASKS.md` rows for phase marked ✅  
2. `MEMORY.md` phase row updated  
3. No open **blockers** for next phase in MEMORY  
4. API contract synced with `specs/api-design.md` if changed  
