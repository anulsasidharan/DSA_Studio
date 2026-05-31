# Database Schema — DSA Studio

*Extracted from `.claude/rules/CLAUDE.md` § Data Model*

PostgreSQL 15+ with UUID primary keys (`uuid_generate_v4()`). Prisma models should mirror these tables.

---

## Entity relationship (summary)

```text
users ──┬── user_attempts ── questions ── topics
        ├── user_progress ── questions
        ├── daily_activity
        ├── revision_queue ── questions
        ├── user_notes ── questions
        └── custom_questions ── questions

questions ── test_cases
questions ── solutions
```

---

## Tables (11 core)

### `users`

Identity, learning level, daily target, streaks, totals.

| Column | Notes |
|--------|--------|
| `learning_level` | `beginner` \| `intermediate` \| `advanced` |
| `daily_target` | Default 3 questions/day |
| `current_streak`, `longest_streak` | Gamification |

### `topics`

DSA categories with prerequisites (JSONB array of topic IDs), `order_index`, icons.

### `questions`

Core problem bank: slug unique, difficulty, hints JSONB, tags JSONB, source (`internal`, `leetcode`, `custom`, etc.).

### `test_cases`

Per question; `is_sample` (visible) vs `is_hidden` (grading).

### `solutions`

Multiple per question/language; `is_optimal`, approach name, complexity fields.

### `user_attempts`

Each submission: code, status, test pass count, timing, bookmark, difficulty rating 1–5.

**Status enum:** `accepted`, `wrong_answer`, `time_limit`, `runtime_error`, `incomplete`

### `user_progress`

One row per user+question: status (`not_attempted` → `mastered`), revision flags, `next_revision_date`.

### `daily_activity`

One row per user per `activity_date`: counts, topics covered JSONB, `daily_goal_met`, streak day.

### `revision_queue`

Scheduled reviews: `scheduled_date`, priority 1–5, `reason`, `completed`.

### `user_notes`

Free-text notes per question; optional pin.

### `custom_questions`

Links user imports to `questions` with `import_method` and `original_content` JSONB.

---

## Indexing recommendations

| Table | Index |
|-------|--------|
| `questions` | `(topic_id)`, `(difficulty)`, `(slug)` |
| `user_progress` | `(user_id, status)`, `(user_id, topic_id)` |
| `user_attempts` | `(user_id, question_id)`, `(attempted_at DESC)` |
| `revision_queue` | `(user_id, scheduled_date)` WHERE NOT completed |
| `daily_activity` | `(user_id, activity_date)` UNIQUE |

---

## Migration policy

- Backward-compatible migrations only on main branch  
- Seed data: idempotent scripts in `apps/api/prisma/seed.ts`  
- Soft-delete questions via `is_active` rather than hard delete when attempts exist  

---

## Full DDL reference

Canonical SQL definitions: **`.claude/rules/CLAUDE.md` § Data Model** (sections 1–11).
