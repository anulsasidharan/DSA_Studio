# DSA Studio

Intelligent DSA learning platform — monorepo scaffold.

## Structure

```text
apps/
  web/       # React 18+ · Vite · Tailwind · shadcn/ui · Zustand
  api/       # Express · TypeScript
packages/
  shared/    # Shared domain types and API contracts
```

## Prerequisites

- Node.js 20+ (for local dev without Docker)
- npm 10+
- Docker Desktop (or Docker Engine + Compose v2) for the full stack

## Run everything with Docker Compose

From the repo root:

```bash
# Build and start PostgreSQL, Redis, API, and Web
npm run docker:up
```

| Service | URL |
|---------|-----|
| **Web app** | http://localhost:8080 |
| **API** | http://localhost:4000 |
| **API docs** | http://localhost:4000/api/docs |
| PostgreSQL | localhost:5432 |
| Redis | localhost:6379 |

The web container serves the React app and proxies `/api` to the API container. On first start, the API runs migrations and seeds the question bank automatically.

Optional — override ports and secrets:

```bash
cp infra/docker/.env.example infra/docker/.env
# edit infra/docker/.env, then:
npm run docker:up
```

Useful commands:

```bash
npm run docker:logs    # tail all service logs
npm run docker:ps      # container status
npm run docker:down    # stop and remove containers
npm run docker:up:infra # postgres + redis only (for local npm dev)
```

Infrastructure-only (run API/Web with npm on the host):

```bash
npm run docker:up:infra
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
npm install
npm run build -w @dsa-studio/shared
npm run dev:api   # terminal 1
npm run dev:web   # terminal 2
```

## Local development (without app containers)

```bash
# Install all workspace dependencies
npm install

# Start PostgreSQL 15 and Redis (ports 5432, 6379)
npm run docker:up:infra

# Build shared types (required before API build)
npm run build -w @dsa-studio/shared

# Terminal 1 — API (http://localhost:4000)
npm run dev:api

# Terminal 2 — Web (http://localhost:5173)
npm run dev:web
```

Copy environment templates before running locally:

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
```

Optional — override Docker Compose defaults:

```bash
cp infra/docker/.env.example infra/docker/.env
```

Stop all containers when done:

```bash
npm run docker:down
```

**Port conflicts:** If `npm run dev:api` or `npm run dev:web` is already running, stop them first (Docker uses ports 4000 and 8080 by default). Or set `API_PORT` / `WEB_PORT` in `infra/docker/.env`.

**Chatbot API key (Docker):** add to `infra/docker/.env`, then recreate the API container:

```bash
OPENAI_API_KEY=sk-your-key-here
# LLM_PROVIDER=openai
npm run docker:down && npm run docker:up
```

For local dev without Docker, use `apps/api/.env` instead (never `apps/web/.env`).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run docker:up` | Build and start full stack (postgres, redis, api, web) |
| `npm run docker:up:infra` | Start PostgreSQL and Redis only |
| `npm run docker:build` | Build Docker images without starting |
| `npm run docker:down` | Stop all containers |
| `npm run docker:logs` | Tail Docker Compose logs |
| `npm run docker:ps` | Show container status |
| `npm run dev:web` | Start Vite dev server |
| `npm run dev:api` | Start Express API with hot reload |
| `npm run build` | Build shared, web, and API |
| `npm run typecheck` | Type-check all workspaces |

## Documentation

Product and engineering specs live in [`.claude/`](.claude/CLAUDE.md). Task tracking: [`.claude/TASKS.md`](.claude/TASKS.md).
