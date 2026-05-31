# AI Chatbot — DSA Studio

*Extracted from `.claude/rules/CLAUDE.md` § Feature 6: AI-Powered Chatbot Assistant*

Provider: **OpenAI GPT-4** or **Claude API** (choose one per environment; record in MEMORY).

---

## Capabilities

| Mode | Endpoint | Behavior |
|------|----------|----------|
| Concept explanation | `POST /api/chat/query` | Teach DSA concepts with examples; offer follow-up practice |
| Progressive hints | `POST /api/chat/hint` | Tiered hints; never dump full solution on tier 1 |
| Code review | `POST /api/chat/review` | Correctness, complexity, optimization suggestions |
| Complexity analysis | Part of review or query | State time/space from submitted code |
| Interview prep | `POST /api/chat/query` | Structured interview guidance (non-company-specific) |

---

## Context assembly

Include in system/context payload when on practice page:

- Question title, difficulty, tags (not hidden test outputs)  
- User’s last attempt status and language  
- Hints already revealed (tier count)  
- Topic name and related techniques  

**Exclude:** hidden test inputs, other users’ data, API keys.

---

## System prompt principles

1. **Socratic hints** — Ask guiding questions before revealing approach names.  
2. **No complete solution** until user explicitly requests “show approach” after ≥2 hints or policy allows.  
3. **Complexity honesty** — Analyze actual submitted code, not generic answers.  
4. **Safety** — Refuse non-DSA requests; no personal data collection.  
5. **Citation** — Reference CLRS-style definitions; link to in-app topic when possible.

---

## Hint tier example (Coin Change)

| Tier | Content level |
|------|----------------|
| 1 | Smallest subproblem (1 cent) |
| 2 | Build larger from smaller subproblems |
| 3 | Approach name + state definition (dp[i]) |

Store revealed tier per user+question in DB or session to avoid repeating.

---

## Code review output format

```markdown
✅ Correct logic
⚠️ Time complexity: O(n²) — can optimize to O(n)
💡 Suggestion: hash map for complements
```

Offer “show optimized version” only after user confirms.

---

## Rate limiting & cost

| Limit | Value (suggested) |
|-------|-------------------|
| Chat messages | 30/hour per user (MVP) |
| Review requests | 10/hour per user |
| Max tokens | Cap output length; truncate long code |

Log token usage per user for future billing tier (V3 premium).

---

## Import classification (Phase 5)

When user pastes raw problem text:

1. LLM extracts: title, description, difficulty, topic, tags  
2. User reviews in UI before `POST /api/questions`  
3. Store `original_content` in `custom_questions`  

---

## Error handling

| Case | Response |
|------|----------|
| Provider timeout | 503 + retry message |
| Content policy block | 400 + explain revision |
| Missing context | 400 + require questionId |

Never expose provider API keys or raw stack traces to client.

---

## Testing

- Mock LLM in CI with fixture responses  
- Golden tests for hint tier escalation  
- Regression: hint tier 1 must not contain function signature of full solution  
