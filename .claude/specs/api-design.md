# API Design — DSA Studio

*Extracted from `.claude/rules/CLAUDE.md` § API Endpoints*

Base URL: `/api` · Auth: Bearer JWT unless noted.

---

## Authentication

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Issue JWT |
| POST | `/api/auth/logout` | Invalidate session (if server-side session used) |
| GET | `/api/auth/me` | Current user profile |
| PUT | `/api/auth/profile` | Update profile, avatar, daily_target |

---

## Topics

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/topics` | List topics (filters: category, difficulty) |
| GET | `/api/topics/:id` | Topic detail + prerequisites |
| GET | `/api/topics/:id/questions` | Questions for topic |
| GET | `/api/topics/progress` | User completion per topic |

---

## Questions

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/questions` | List with filters (topic, difficulty, tags, status) |
| GET | `/api/questions/:id` | Detail + sample test cases only |
| POST | `/api/questions` | Create custom question (auth) |
| PUT | `/api/questions/:id` | Update own custom question |
| DELETE | `/api/questions/:id` | Delete custom question |
| GET | `/api/questions/:id/solutions` | Solutions (policy: after solve or always — document in MEMORY) |
| POST | `/api/questions/:id/solutions` | Add community solution (optional) |
| GET | `/api/questions/:id/hints` | Progressive hints (tier query param) |

---

## Practice & submissions

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/submit` | Body: `questionId`, `language`, `code` → run hidden tests |
| GET | `/api/submissions` | User submission history |
| GET | `/api/submissions/:id` | Submission detail |
| POST | `/api/questions/:id/attempt` | Log attempt without full grade (optional) |

**Submit response (example shape):**

```json
{
  "status": "accepted",
  "testCasesPassed": 8,
  "totalTestCases": 8,
  "executionTimeMs": 45,
  "memoryUsedMb": 12.1
}
```

---

## Progress & tracking

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/progress` | Overall stats |
| GET | `/api/progress/daily` | Daily activity history |
| POST | `/api/progress/daily` | Manual session log |
| GET | `/api/progress/streak` | Streak info |
| GET | `/api/progress/analytics` | Charts data (topic mastery, rates) |

---

## Revision

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/revision/queue` | Full queue |
| GET | `/api/revision/due` | Due today |
| POST | `/api/revision/add` | Mark question for revision |
| PUT | `/api/revision/:id/complete` | Mark completed |

---

## Custom questions / import

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/import/manual` | Manual entry payload |
| POST | `/api/import/csv` | Multipart CSV |
| POST | `/api/import/json` | JSON bulk |
| POST | `/api/import/url` | Assisted URL parse |
| GET | `/api/import/history` | User import history |

---

## Notes & bookmarks

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/notes/:questionId` | Get notes |
| POST | `/api/notes` | Create note |
| PUT | `/api/notes/:id` | Update |
| DELETE | `/api/notes/:id` | Delete |
| POST | `/api/bookmarks/:questionId` | Toggle bookmark |
| GET | `/api/bookmarks` | List bookmarked |

---

## Chatbot (Phase 5)

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/chat/query` | General DSA question |
| POST | `/api/chat/hint` | Contextual hint for current problem |
| POST | `/api/chat/review` | Code review |
| GET | `/api/chat/history` | Paginated history |

---

## Cross-cutting concerns

| Concern | Rule |
|---------|------|
| Errors | `{ error: { code, message }, meta?: { requestId } }` |
| Pagination | `?page=&limit=` on list endpoints |
| Rate limit | Redis-backed; stricter on `/api/chat/*` and `/api/submit` |
| Idempotency | Optional `Idempotency-Key` on POST import |
| CORS | Allow web origin only in production |

---

## OpenAPI

Maintain `docs/openapi.yaml` as contracts are implemented; generate from Zod/schemas where possible.
