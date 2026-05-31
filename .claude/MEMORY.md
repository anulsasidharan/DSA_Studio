# MEMORY.md — DSA Studio

> Persistent project memory for agents and developers. Update after meaningful decisions, phase completions, or blockers.

**Last updated:** 2026-05-31  
**Specification version:** `rules/CLAUDE.md` v1.0  
**Repository state:** Specification complete; **implementation not started** (Phase 1 pending)

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
| State | Zustand or Redux Toolkit | Spec allows either; pick one at scaffold and record here |
| Code editor | Monaco Editor | VS Code–parity in browser |
| Charts | Recharts or Chart.js | Analytics dashboard |
| Backend runtime | Node.js 20+ with Express | Spec default |
| ORM | Prisma or TypeORM | Spec allows either; prefer Prisma unless team standard differs |
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
| 1 | Foundation | **Not started** | Monorepo, auth, DB schema, core APIs |
| 2 | Learning Hub | Not started | Topics, questions, Monaco practice |
| 3 | Progress Tracking | Not started | Analytics, streaks, goals |
| 4 | Advanced Features | Not started | Revision queue, custom import |
| 5 | AI Integration | Not started | Chatbot, hints, classification |
| 6 | Polish & Launch | Not started | Tests, CI/CD, production deploy |

**Active focus:** Phase 1 — project scaffold and authentication (see `TASKS.md` P1-*)

---

## Open questions / blockers

| ID | Item | Status |
|----|------|--------|
| OQ-1 | Monorepo vs separate `frontend/` + `backend/` repos | **Decide at P1-1** — recommend single repo with `apps/web` + `apps/api` |
| OQ-2 | Prisma vs TypeORM | **Decide at P1-2** — default Prisma in MEMORY until changed |
| OQ-3 | Zustand vs Redux Toolkit | **Decide at P1-3** — default Zustand for simpler MVP |
| OQ-4 | Next.js vs Vite SPA | Spec says React; Next.js acceptable for SSR — confirm at scaffold |

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
| 2026-05-31 | Initial MEMORY from `rules/CLAUDE.md`; all phases pending |
