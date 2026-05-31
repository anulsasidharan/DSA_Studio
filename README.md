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

## Quick start

```bash
# Install all workspace dependencies
npm install

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

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev:web` | Start Vite dev server |
| `npm run dev:api` | Start Express API with hot reload |
| `npm run build` | Build shared, web, and API |
| `npm run typecheck` | Type-check all workspaces |

## Documentation

Product and engineering specs live in [`.claude/`](.claude/CLAUDE.md). Task tracking: [`.claude/TASKS.md`](.claude/TASKS.md).
