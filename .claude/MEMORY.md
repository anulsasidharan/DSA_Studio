# MEMORY.md — DSA Studio

> Persistent project memory for agents and developers. Update after meaningful decisions, phase completions, or blockers.

**Last updated:** 2026-05-31  
**Specification version:** `rules/CLAUDE.md` v1.0  
**Repository state:** Phase 3 **complete** — Progress APIs, streaks, analytics, dashboard/track UI, calendar, goals, badges

---

## Project identity

| Field | Value |
|-------|--------|
| **Product** | DSA Studio — intelligent DSA learning platform |
| **Repo** | `Unigied_DSA_Studio` |
| **Vision** | Structured paths, multi-level practice, external question import, daily tracker, AI assistant, spaced repetition |
| **Question bank target** | 500–700 questions (10–15 basic, 15–20 intermediate, 8–12 advanced per topic) |
| **Roadmap** | 6 phases × ~4 weeks (24 weeks total per spec) |

---

## Locked technical decisions

| Decision | Choice | Rationale (short) |
|----------|--------|-------------------|
| Frontend framework | React 18+ with TypeScript | Spec default; rich ecosystem for Monaco, charts |
| UI | Tailwind CSS + shadcn/ui | Consistent accessible components |
| State | **Zustand** | Locked at P1-1 scaffold (`apps/web/src/store/`) |
| Code editor | Monaco Editor | VS Code–parity in browser |
| Charts | Recharts or Chart.js | Analytics dashboard |
| Backend runtime | Node.js 20+ with Express | Spec default |
| ORM | **Prisma 6** | Locked at P1-3 — full 11-table schema + migrations |
| Primary DB | PostgreSQL 15+ | Relational model for users, questions, progress |
| Cache | Redis | Sessions, leaderboards, hot question lists |
| AI provider | OpenAI GPT-4 **or** Claude API | Chatbot, hints, import classification |
| Code execution | Docker containers | Sandboxed per-language runs |
| Real-time (optional) | Socket.io | Live tracker / notifications |
| File storage | AWS S3 or GCS | Avatars, import assets |
| CI/CD | GitHub Actions | Spec default |
| Auth | JWT (register/login/logout) | Endpoints defined in spec § API |

---

## Core domain concepts

| Concept | Notes |
|---------|--------|
| **Topics** | 13 areas (Arrays, Linked Lists, … Math & Number Theory); hierarchical basic → intermediate → advanced |
| **Questions** | Linked to `topic_id`; slug unique; hints as JSONB array; tags JSONB |
| **Test cases** | Sample (`is_sample`) vs hidden (`is_hidden`) |
| **User progress** | `not_attempted` → `attempted` → `solved` → `mastered` |
| **Revision** | Spaced repetition: 1d → 3d → 7d → 14d → 30d; priority 1–5 |
| **Daily activity** | Per-user per-date; streak and goal met flags |
| **Custom questions** | `custom_questions` links user imports to `questions` |

---

## Documentation index

| File | Role |
|------|------|
| `.claude/CLAUDE.md` | Entry point and read order |
| `.claude/rules/CLAUDE.md` | Full technical specification |
| `.claude/SKILLS.md` | Agent skills and workflows |
| `.claude/PLAN.md` | Master plan and success metrics |
| `.claude/PLAN_PHASE.md` | Weekly phases and checkpoints |
| `.claude/TASKS.md` | Phase/sub-task tracker |
| `.claude/specs/stack.md` | Stack and directory layout |
| `.claude/specs/database.md` | Schema summary |
| `.claude/specs/api-design.md` | REST API surface |
| `.claude/specs/frontend-ui.md` | UI pages and components |
| `.claude/specs/ai-chatbot.md` | AI assistant behavior |
| `.claude/specs/deployment.md` | Dev and deploy |

---

## Current phase tracker

| Phase | Name | Status | Notes |
|-------|------|--------|-------|
| 1 | Foundation | **Complete** | All P1-* tasks done; ready for Phase 2 Learning Hub |
| 2 | Learning Hub | **Complete** | Topic browser, theory, practice UI, Monaco, sandbox, submit, hints, solutions |
| 3 | Progress Tracking | **Complete** | Progress/daily APIs, streaks, analytics, `/track` dashboard, calendar, goals, badges |
| 4 | Advanced Features | **Complete** | Spaced repetition (`/revision`), import manual/CSV/JSON/URL + history (`/import`) |
| 5 | AI Integration | Not started | Chatbot, hints, classification |
| 6 | Polish & Launch | Not started | Tests, CI/CD, production deploy |

**Active focus:** Phase 5 — AI Integration (see `TASKS.md` P5-*)

### Product policies (Phase 2)

| Policy | Decision |
|--------|----------|
| Solutions visibility | After first attempt (`attempted`, `solved`, or `mastered`) |
| Code execution | Local Python/Node by default; set `SANDBOX_USE_DOCKER=true` for Docker images in `infra/docker/sandbox/` |
| Starter code | Per-question templates in `packages/shared/src/code-templates.ts`; generic fallback for unmapped slugs |

### Product policies (Phase 3)

| Policy | Decision |
|--------|----------|
| Daily activity | Auto-updated on each submit; manual log via `POST /api/progress/daily` |
| Streak | Consecutive days with `daily_goal_met`; recalculated when daily target reached |
| Daily goal | Stored on user as `dailyTarget`; editable via `PUT /api/auth/profile` and `/track` UI |
| Badges | Computed server-side: First Steps, First 10, Week Warrior, Topic Master, Streak Legend |
| Charts | Recharts on `/track` — heatmap, weekly bar, topic pie from `/api/progress/analytics` |

---

## Open questions / blockers

| ID | Item | Status |
|----|------|--------|
| OQ-1 | Monorepo vs separate `frontend/` + `backend/` repos | **Resolved P1-1** — npm workspaces: `apps/web` + `apps/api` + `packages/shared` |
| OQ-2 | Prisma vs TypeORM | **Resolved P1-3** — Prisma 6 with full schema |
| OQ-3 | Zustand vs Redux Toolkit | **Resolved P1-1** — Zustand for MVP |
| OQ-4 | Next.js vs Vite SPA | **Resolved P1-1** — Vite SPA + React 19 |

---

## Conventions (agents)

- API base: `/api/*` as in spec (auth, topics, questions, submit, progress, revision, import, chat)
- Difficulty enum: `basic` | `intermediate` | `advanced`
- Attempt status: `accepted` | `wrong_answer` | `time_limit` | `runtime_error` | `incomplete`
- Branch convention: `feature/<short-description>` per `TASKS.md` row
- Do not scrape LeetCode/HackerRank without honoring ToS — URL import is user-assisted review

---

## Changelog (memory)

| Date | Change |
|------|--------|
| 2026-05-31 | Phase 3 complete: progress/daily/streak/analytics APIs, auto daily activity on submit, `/track` UI with Recharts, calendar, goal setting, minimal badges |
| 2026-05-31 | Phase 2 complete: Learn/Practice UI, Monaco, POST /api/run & /api/submit, hints, solutions (gated), Docker sandbox images |
| 2026-05-31 | Phase 1 complete: Prisma schema (11 tables), JWT auth, topics/questions REST, seed (8 topics, 40 questions), OpenAPI at `/api/docs` |
| 2026-05-31 | P1-2 Docker Compose: PostgreSQL 15 + Redis at `infra/docker/`; npm `docker:*` scripts |
| 2026-05-31 | P1-1 monorepo scaffold: npm workspaces, Vite web, Express API, shared types |
| 2026-05-31 | Initial MEMORY from `rules/CLAUDE.md`; all phases pending |
