# DSA Studio — Development Specification (Entry Point)

This file is the **Claude Code CLI entry point** for **DSA Studio**. The full product and engineering specification lives in **`.claude/rules/CLAUDE.md`** (v1.0, May 2026).

---

## Project overview

**DSA Studio** is an intelligent, progressive learning platform for mastering Data Structures and Algorithms: structured practice, personalized tracking, spaced repetition, and an AI-powered assistant.

| Layer | Choice |
|-------|--------|
| **Frontend** | React 18+ · TypeScript · Tailwind · shadcn/ui · Zustand/RTK · Monaco Editor |
| **Backend** | Node.js 20+ · Express · TypeScript · Prisma or TypeORM |
| **Database** | PostgreSQL 15+ · Redis cache |
| **AI** | OpenAI GPT-4 or Claude API (chatbot, classification, hints) |
| **Execution** | Docker sandbox for code runs |

---

## Modular specifications

Read these for focused work; defer to **`rules/CLAUDE.md`** when they conflict.

| File | Scope |
|------|--------|
| [rules/CLAUDE.md](rules/CLAUDE.md) | Full spec: features, data model, UI, APIs, roadmap |
| [specs/stack.md](specs/stack.md) | Technology stack and repo layout |
| [specs/database.md](specs/database.md) | PostgreSQL schema and entities |
| [specs/api-design.md](specs/api-design.md) | REST endpoints and contracts |
| [specs/frontend-ui.md](specs/frontend-ui.md) | Pages, components, UX patterns |
| [specs/ai-chatbot.md](specs/ai-chatbot.md) | Chatbot capabilities and guardrails |
| [specs/deployment.md](specs/deployment.md) | Local dev, Docker, CI/CD, production |

---

## Agent operating files

| File | Role |
|------|------|
| [MEMORY.md](MEMORY.md) | Locked decisions, phase status, blockers — **update after milestones** |
| [SKILLS.md](SKILLS.md) | Skill catalog and implementation workflows |
| [PLAN.md](PLAN.md) | North star, pillars, risks, MVP definition |
| [PLAN_PHASE.md](PLAN_PHASE.md) | Phased checklist (6 phases × ~4 weeks) |
| [TASKS.md](TASKS.md) | Granular task tracker with branch convention |

**Read order for implementation:** `MEMORY.md` → `PLAN_PHASE.md` → `rules/CLAUDE.md` (relevant section) → `PLAN.md` if trade-offs arise.

---

## Autonomous development instructions

When implementing or modifying this codebase:

1. **Treat `rules/CLAUDE.md` as scope** — features, schema, and API shapes are defined there unless a PR documents intentional divergence.
2. **Ship vertical slices** — schema migration + API + UI + tests for the same user-visible capability.
3. **Question quality bar** — every bank question needs statement, constraints, sample + hidden tests, progressive hints, and multiple solutions with complexity (see spec § Question Bank).
4. **Never commit secrets** — API keys, DB URLs, JWT secrets stay in `.env` (gitignored).
5. **Respect difficulty tiers** — `basic` · `intermediate` · `advanced` on topics and questions; spaced repetition intervals are fixed in spec.
6. **Update `MEMORY.md` and `TASKS.md`** when completing a phase checkpoint or changing a locked decision.

---

## Success metrics (engineering)

| Area | Target |
|------|--------|
| API latency | P95 &lt; 200ms |
| Code execution | &lt; 5s per submission |
| DB queries | &lt; 100ms typical |
| Uptime | 99.9% production |
| Question bank | 500–700 questions across 13 topic areas |

---

## References

- **Authoritative spec:** `.claude/rules/CLAUDE.md`
- **Legacy copy (if present):** `CLAUDE_old.md` at repo root — do not treat as source of truth

**Document version:** 1.0 · **Status:** Ready for implementation (Phase 1 not started)
