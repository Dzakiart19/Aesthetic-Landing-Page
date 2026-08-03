# Project Overview

Pnpm monorepo workspace dengan tiga artifact aktif dan beberapa shared library.

## Artifacts

### `artifacts/video-showcase` (web, preview path: `/`)
React + Vite frontend showcase site. Branding: **INFERNO STUDIOS**.
- Stack: React 19, Vite 7, Tailwind 4, Framer Motion, Wouter, TanStack Query
- Sections: Hero (CustomVideoPlayer), Vision, Gallery, Credits
- Deploy target: Firebase Hosting (`bokephot` project) via `deploy.sh`
- Config: `src/config.ts` (CINEMA_CONFIG — video source, poster, title, subtitle)

### `artifacts/api-server` (api, preview path: `/api`)
Express 5 backend.
- Stack: Express 5, pino/pino-http, cors, Zod validation via `@workspace/api-zod`
- Routes: `GET /api/healthz` (health check)
- Build: esbuild via `build.mjs`, output to `dist/`
- DB: `@workspace/db` declared as dependency but not yet imported in routes

### `artifacts/mockup-sandbox` (design, preview path: `/__mockup`)
Vite canvas untuk UI prototyping.
- `mockupPreviewPlugin.ts` auto-generates `src/.generated/mockup-components.ts` saat dev server start
- Berisi full shadcn/Radix UI component library

## Shared Libraries (`lib/`)

| Package | Fungsi |
|---|---|
| `lib/api-spec` | OpenAPI 3.1 spec — single source of truth untuk API contract |
| `lib/api-zod` | Zod schemas hasil codegen dari OpenAPI spec |
| `lib/api-client-react` | TanStack Query hooks hasil codegen (saat ini belum dipakai oleh video-showcase) |
| `lib/db` | Drizzle ORM + PostgreSQL setup; schema di `src/schema/index.ts` masih kosong (template saja) |

## Codegen

Jalankan setelah update `lib/api-spec/openapi.yaml`:
```bash
pnpm --filter @workspace/api-spec run codegen
```

## Workspace Key Commands

```bash
pnpm run typecheck          # Full typecheck (libs + artifacts)
pnpm run typecheck:libs     # Hanya composite libs
pnpm --filter @workspace/<slug> run typecheck   # Satu artifact
```

## Deploy

```bash
bash deploy.sh   # Build video-showcase lalu deploy ke Firebase Hosting
```

## User Preferences

- Bahasa komunikasi: Indonesia
