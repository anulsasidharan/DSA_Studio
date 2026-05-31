# SKILLS.md — DSA Studio

Catalog of agent skills for this repository. Each skill defines **when** to use it, **what to read first**, and **non-negotiable implementation rules**.

---

## Skill index

| Skill | Path | Use when |
|-------|------|----------|
| **dsa-studio-dev** | This file § [Primary skill](#primary-skill-dsa-studio-dev) | Building features, APIs, UI, DB, AI, or infra in this repo |
| **dsa-question-authoring** | This file § [Question authoring](#skill-dsa-question-authoring) | Seeding or creating questions, test cases, hints, solutions |
| **dsa-analytics-tracking** | This file § [Analytics](#skill-dsa-analytics-tracking) | Daily tracker, streaks, charts, revision queue |

---

## Primary skill: `dsa-studio-dev`

```yaml
name: dsa-studio-dev
description: >-
  Builds and extends DSA Studio (React/Express/PostgreSQL learning platform:
  topics, practice, tracker, revision, AI chatbot). Use per CLAUDE.md,
  PLAN_PHASE.md, and MEMORY.md.
disable-model-invocation: false
```

### When to use

- Scaffolding or changing `apps/web/`, `apps/api/`, `packages/shared/`, or `infra/`
- Adding REST routes, Prisma models, React pages, or Monaco practice flows
- Implementing import (CSV/JSON/manual), spaced repetition, or chatbot endpoints
- Following the phased roadmap in `PLAN_PHASE.md`

### Required reading order

1. `.claude/MEMORY.md` — current phase, locked decisions, blockers
2. `.claude/PLAN_PHASE.md` — active phase tasks and exit criteria
3. `.claude/rules/CLAUDE.md` — detailed spec for the area you are changing
4. `.claude/specs/<area>.md` — focused extract (database, api-design, etc.)
5. `.claude/PLAN.md` — scope and priorities if trade-offs arise

### Non-negotiables

| Area | Rule |
|------|------|
| API | Express + TypeScript; validate inputs; consistent error JSON |
| Auth | JWT; protect user-scoped routes; never log passwords or tokens |
| Data | PostgreSQL as source of truth; migrations backward-compatible |
| Questions | Full quality bar: statement, constraints, ≥3 sample + ≥5 hidden tests, hints, solutions |
| Execution | Docker sandbox only; no host `eval` of user code |
| AI | No full solutions in first hint; rate-limit chat endpoints |
| Secrets | `.env` only; never commit API keys |
| Tests | Jest + RTL (frontend); Supertest (API); meaningful paths not trivia |
| UI | Tailwind + shadcn/ui; responsive; accessibility for forms and editor |

### Target monorepo layout

```text
apps/
  web/                 # React + Vite (or Next.js) + Tailwind + shadcn
  api/                 # Express + Prisma + routes/services
packages/
  shared/              # Shared types (Question, Topic, Attempt, etc.)
infra/
  docker/              # API, DB, Redis, execution sandbox
  terraform/           # Optional cloud (Phase 6+)
docs/
  openapi.yaml         # Canonical API contract (generate or hand-maintain)
```

### Implementation workflow

#### 1. Scope the task

- Map request to **phase** in `PLAN_PHASE.md` and row in `TASKS.md`
- List surfaces: DB, API, web, AI, infra
- If out of current phase, note in `MEMORY.md` and confirm with user

#### 2. Backend feature pattern

1. Prisma schema + migration
2. Service layer (`services/`)
3. Router (`routes/`) + validation (Zod or express-validator)
4. Supertest integration tests
5. Register route; document env vars in `.env.example`

#### 3. Frontend feature pattern

1. Shared types from `packages/shared`
2. API client hook or store slice
3. Page under `pages/` + components under `components/`
4. Loading, error, and empty states
5. RTL tests for critical flows (login, submit code, view hint)

#### 4. Practice / submission flow

1. Load question + sample test cases
2. Monaco editor + language selector
3. `POST /api/submit` → sandbox → compare outputs
4. Persist `user_attempts` + update `user_progress`
5. On solve, schedule `revision_queue` per spaced repetition spec

#### 5. Done checklist

- [ ] Migration applied locally
- [ ] API documented in OpenAPI or `specs/api-design.md` if contract changed
- [ ] `TASKS.md` row updated
- [ ] `MEMORY.md` updated if decision locked or phase completed

---

## Skill: `dsa-question-authoring`

### When to use

- Writing seed data, bulk CSV/JSON import, or manual question forms
- Reviewing question quality before merge

### Rules

- Three difficulty levels per subtopic where applicable
- Hints: 3–5 progressive levels; must not reveal full algorithm immediately
- At least two solutions: brute force + optimal, with time/space complexity
- Tags: JSON array (e.g. `["array","two-pointer"]`)
- Slug: URL-safe unique per question

### Reference

- Example format: `rules/CLAUDE.md` § Feature 2 (Container With Most Water)
- Distribution: 10–15 basic, 15–20 intermediate, 8–12 advanced per topic

---

## Skill: `dsa-analytics-tracking`

### When to use

- Daily summary cards, heatmaps, streaks, goals, revision dashboard
- `daily_activity`, `user_progress`, `revision_queue` logic

### Rules

- One `daily_activity` row per user per calendar date (unique constraint)
- Streak: increment when daily goal met; reset on missed day (define timezone in MEMORY when implemented)
- Revision priority: use `calculate_priority` logic from spec (wrong attempts, user rating, overdue days, advanced difficulty)
- Charts: Recharts or Chart.js — match dashboard wireframes in spec § UI

### Spaced repetition intervals

1. 1 day after solve  
2. 3 days after first review  
3. 7 days after second  
4. 14 days after third  
5. 30 days after fourth  

---

## Adding a new skill

1. Add a row to the **Skill index** table above  
2. Document YAML `name` + `description`, reading order, and non-negotiables  
3. Link to the relevant `specs/*.md` section  
4. Update `MEMORY.md` documentation index if the skill changes agent workflow
