# PLAN.md — DSA Studio

High-level execution plan aligned with **`.claude/rules/CLAUDE.md` v1.0**. Granular phases and checklists live in **`PLAN_PHASE.md`**; day-to-day tasks in **`TASKS.md`**.

---

## 1. North star

Deliver a **comprehensive, intelligent, user-centric** platform where learners progress from beginner to advanced DSA mastery through:

- Structured topic paths with prerequisites  
- Multi-level practice (basic → intermediate → advanced)  
- Persistent progress, analytics, and spaced repetition  
- AI assistance that teaches (hints, review) without replacing effort  
- Custom question import from interviews and external platforms  

**Primary measurable outcome:** sustained daily practice (streak + goal completion) with measurable topic mastery and revision adherence.

---

## 2. Strategic pillars

| Pillar | Outcome |
|--------|---------|
| **Structured learning** | 13 topic hierarchies, curated sequences, theory + practice per topic |
| **Quality content** | 500–700 questions meeting the eight-point quality standard |
| **Trustworthy evaluation** | Sandboxed execution, hidden tests, fair attempt logging |
| **Retention** | Spaced repetition queue with priority and due-date UX |
| **Insight** | Daily tracker, heatmaps, streaks, weak-topic identification |
| **AI augmentation** | Concept explanation, progressive hints, code review — guardrailed |
| **Extensibility** | Manual, CSV, JSON, URL-assisted import into user question bank |

---

## 3. Workstreams (parallel after foundation)

1. **Platform core** — Monorepo, PostgreSQL, Redis, JWT auth, OpenAPI  
2. **Content model** — Topics, questions, test cases, solutions, seeds  
3. **Practice arena** — Monaco, runner, submissions, hints  
4. **Progress & analytics** — Progress tables, daily activity, dashboards  
5. **Revision** — Queue algorithm, due today, completion flow  
6. **Import pipeline** — Manual, bulk, AI-assisted classification  
7. **AI assistant** — Chat, hint API, code review, context management  
8. **Quality & launch** — E2E tests, CI/CD, monitoring, production deploy  

---

## 4. Phase mapping (executive)

| Phase | Weeks (spec) | Scope summary |
|-------|----------------|---------------|
| **1 — Foundation** | 1–4 | Scaffold, DB schema, auth, core REST APIs |
| **2 — Learning Hub** | 5–8 | Topics, questions, Monaco, submit/evaluate |
| **3 — Progress Tracking** | 9–12 | Progress, daily log, analytics UI, streaks |
| **4 — Advanced Features** | 13–16 | Revision system, custom question import |
| **5 — AI Integration** | 17–20 | Chatbot, hints, classification, learning paths |
| **6 — Polish & Launch** | 21–24 | UX, performance, tests, deploy, monitor |

Detail: **`PLAN_PHASE.md`**.

---

## 5. Dependencies & sequencing rules

1. **Auth + users** before any personalized progress or imports.  
2. **Topics + questions schema** before practice UI or submissions.  
3. **Code execution sandbox** before accepting `POST /api/submit`.  
4. **User progress + attempts** before analytics and revision scheduling.  
5. **Revision queue** after solve path updates `user_progress`.  
6. **AI endpoints** after core question and attempt APIs exist (context).  

---

## 6. Risk register (engineering-facing)

| Risk | Mitigation |
|------|------------|
| Unsafe code execution | Docker isolation, resource limits, no network in sandbox |
| AI gives full answers too early | Progressive hint tiers; system prompts in `specs/ai-chatbot.md` |
| Question bank size | Phase 2 seed MVP subset; bulk import tooling in Phase 4 |
| External scrape ToS | URL import = assisted parse + user review, not blind scraping |
| Editor bundle size | Lazy-load Monaco; code-split practice route |
| Streak timezone bugs | Store UTC dates; document user TZ in profile (Phase 3) |

---

## 7. Definition of “MVP done” (engineering)

A learner can:

- Register/login and browse topics with theory  
- Open a question, write code in Monaco, run sample tests, submit for grading  
- See solutions and hints after attempt policy defined  
- View dashboard: today’s activity, streak, basic progress by topic  
- Have attempts and progress persisted in PostgreSQL  

**Not required for MVP:** full 500-question bank, WhatsApp, mobile apps, V2 live coding (see spec Future Enhancements).

---

## 8. Success metrics (from spec)

| Category | Examples |
|----------|----------|
| Engagement | DAU, session duration, questions/day, streak rate |
| Learning | Solved count, topic completion %, difficulty progression |
| System | API &lt; 200ms P95, execution &lt; 5s, 99.9% uptime |
| Satisfaction | NPS, retention, feature adoption |

---

## 9. Future enhancements (out of initial plan)

V2: live coding, mock interviews, forums, video solutions, leaderboards  
V3: company-specific prep, contests, peer review, study groups, certificates, premium tier  

Track in product backlog; do not implement unless `PLAN_PHASE.md` is explicitly extended.
