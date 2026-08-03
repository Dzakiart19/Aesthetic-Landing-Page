---
name: Project Structure
description: Overview of the pnpm monorepo layout, artifacts, libs, and key conventions
---

## Artifacts

| Slug | Kind | Preview Path | Purpose |
|---|---|---|---|
| `video-showcase` | web | `/` | React+Vite frontend; branding INFERNO STUDIOS |
| `api-server` | api | `/api` | Express 5 backend; only `GET /api/healthz` |
| `mockup-sandbox` | design | `/__mockup` | UI prototyping canvas |

## Libraries

| Package | Role |
|---|---|
| `lib/api-spec` | OpenAPI 3.1 source of truth |
| `lib/api-zod` | Zod schemas from codegen |
| `lib/api-client-react` | TanStack Query hooks from codegen |
| `lib/db` | Drizzle ORM; schema is empty placeholder |

## Key facts
- DB schema (`lib/db/src/schema/index.ts`) is empty — no tables defined yet
- `@workspace/api-client-react` declared in video-showcase but never imported
- `deploy.sh` builds video-showcase then deploys to Firebase project `bokephot`
- Codegen: `pnpm --filter @workspace/api-spec run codegen`

**Why:** Recorded after first full audit so future sessions don't re-explore from scratch.
