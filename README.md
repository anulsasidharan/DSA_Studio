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

- Node.js 20+
- npm 10+
- Docker Desktop (or Docker Engine + Compose v2) for PostgreSQL and Redis

## Quick start

```bash
# Install all workspace dependencies
npm install

# Start PostgreSQL 15 and Redis (ports 5432, 6379)
npm run docker:up

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

Stop infrastructure when done:

```bash
npm run docker:down
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev:web` | Start Vite dev server |
| `npm run dev:api` | Start Express API with hot reload |
| `npm run build` | Build shared, web, and API |
| `npm run typecheck` | Type-check all workspaces |
| `npm run docker:up` | Start PostgreSQL and Redis |
| `npm run docker:down` | Stop PostgreSQL and Redis |
| `npm run docker:logs` | Tail Docker Compose logs |
| `npm run docker:ps` | Show container status |

## Documentation

Product and engineering specs live in [`.claude/`](.claude/CLAUDE.md). Task tracking: [`.claude/TASKS.md`](.claude/TASKS.md).
