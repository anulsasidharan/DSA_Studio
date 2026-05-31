# Technology Stack — DSA Studio

*Extracted from `.claude/rules/CLAUDE.md` § Technical Stack*

---

## Layer choices

| Layer | Choice | Rationale |
|-------|--------|-----------|
| **Frontend** | React 18+, TypeScript, Vite (or Next.js) | SPA dashboard + practice; strong Monaco support |
| **UI** | Tailwind CSS + shadcn/ui | Accessible components, consistent design |
| **State** | Zustand or Redux Toolkit | Spec allows either; default Zustand for MVP (see MEMORY) |
| **Code editor** | Monaco Editor | VS Code–parity in browser |
| **Charts** | Recharts or Chart.js | Analytics dashboard |
| **Markdown** | react-markdown + syntax highlighting | Theory and problem statements |
| **Rich text** | TipTap or Slate | Manual question entry (Phase 4) |
| **Backend** | Node.js 20+, Express, TypeScript | Spec default API layer |
| **ORM** | Prisma (preferred) or TypeORM | Type-safe schema, migrations |
| **API docs** | Swagger / OpenAPI | Contract for web and future mobile |
| **Database** | PostgreSQL 15+ | Relational progress and question model |
| **Cache** | Redis | Sessions, hot lists, rate limits |
| **Search** | Elasticsearch (optional) | Advanced question search — Phase 6+ |
| **AI** | OpenAI GPT-4 or Claude API | Chatbot, classification, hints |
| **Execution** | Docker per submission | Sandboxed multi-language runs |
| **Real-time** | Socket.io (optional) | Live tracker updates |
| **Storage** | AWS S3 or GCS | Avatars, import files |
| **CI/CD** | GitHub Actions | Lint, test, build, deploy |
| **Monitoring** | Grafana + Prometheus or managed | Phase 6 |
| **Testing** | Jest, RTL, Supertest, Playwright | Unit, API, E2E |

---

## Recommended directory structure

```text
.
├── apps/
│   ├── web/                    # React + Vite + Tailwind + shadcn
│   │   ├── src/
│   │   │   ├── components/     # Dashboard, Topic, Question, Chat
│   │   │   ├── pages/
│   │   │   ├── hooks/
│   │   │   ├── store/          # Zustand or RTK
│   │   │   └── lib/            # API client
│   │   └── package.json
│   └── api/                    # Express + Prisma
│       ├── src/
│       │   ├── routes/
│       │   ├── services/
│       │   ├── middleware/
│       │   └── sandbox/        # Docker execution orchestration
│       ├── prisma/
│       └── package.json
├── packages/
│   └── shared/                 # Types: Topic, Question, Attempt, etc.
├── infra/
│   └── docker/
│       ├── docker-compose.yml  # postgres, redis, api, web
│       └── sandbox/            # Execution images per language
├── docs/
│   └── openapi.yaml
├── .claude/                    # Agent specs (this tree)
└── README.md
```

---

## Language support (code execution)

**MVP:** Python, JavaScript/TypeScript  
**Phase 2+:** Java, C++ per demand  

Each language = dedicated Docker image with timeout and memory limits.

---

## Environment variables (minimum)

| Variable | Used by |
|----------|---------|
| `DATABASE_URL` | API / Prisma |
| `REDIS_URL` | API |
| `JWT_SECRET` | API auth |
| `OPENAI_API_KEY` or `ANTHROPIC_API_KEY` | AI routes (Phase 5) |
| `SANDBOX_IMAGE_*` | Execution service |
| `S3_BUCKET` / `GCS_BUCKET` | Optional uploads |

Never commit real values; use `.env.example`.
