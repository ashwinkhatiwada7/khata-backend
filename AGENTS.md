# AGENTS.md — ledger

## What this is

Express 5 + TypeScript REST API for a shop ledger (customers, credits, payments).
Postgres via `pg` Pool + Drizzle ORM (`drizzle-orm/node-postgres`), schema in `db/schema/`.
Auth via `better-auth` (email/password, admin + expo plugins, Drizzle adapter) in `lib/auth.ts`.

## Commands

- `npm run dev` — dev server with `tsx watch src/index.ts`
- `npm run build` / `npm start` — `tsc` to `dist/`, then `node dist/src/index.js`
- `npm run typecheck` — `tsc --noEmit` (run after any change)
- `npm test` — not implemented (exits 1)
- `npm run db:generate` / `db:push` / `db:studio` — drizzle-kit workflows (`drizzle.config.ts`: `out: ./drizzle`, `schema: ./db/schema`, dialect `postgresql`)

## Env (`.env`)

`DATABASE_URL`, `PORT` (defaults 3002), `BETTER_AUTH_URL`. Loaded via `dotenv` in `src/index.ts`, `db/index.ts`, `lib/auth.ts`.

## Layout

- `src/server.ts` — Express app: `cors`, `express.json`, `app.all("/api/auth/*splat", toNodeHandler(auth))`, routes, `GET /health`, `errorHandler` last.
- `src/index.ts` — listens, graceful shutdown (`pool.end()`).
- `src/<module>/` — per-module `*.route.ts`, `*.controller.ts`, `*.service.ts`, `*DTO.ts` (zod). Only module now: `src/customer/`.
- `src/middleware/` — `Authenticate` (better-auth session → `req.user`, see `src/types/express.d.ts`; note: returns 402 on missing session), `Validate(schema, "body"|"params"|"query")` (zod `safeParse`, forwards `AppError("Invalid Data", 401, fieldErrors)`), `errorHandler`.
- `src/common/AppError.ts` — `{ message, statusCode, fieldErrors? }`, handled centrally.
- `db/index.ts` — `pool` + `db` exports. `db/schema/` — `auth-schema.ts`, `customer-schema.ts`, `credit-schema.ts`, `payment-schema.ts`, re-exported from `index.ts`.
- `utils/pagination.ts` — `parsePage(page?)` (default 1), `parsePerPage(perpage?)` (default 10, cap 100). Both floor valid input, fall back to default on non-finite / out-of-range.
- `lib/auth.ts` — better-auth config; `user` has required extra fields `shopName`, `location`, `phone`.

## Conventions

- Routes: `Router()` + `Authenticate` (+ `Validate` for writes) → controller; keep SQL in services, never in controllers/routes.
- Controller pattern: check `req.user.id` → throw `AppError("UNAUTHORIZED", 401)` if missing → call service → `res.json({ success: true, ... })` → `next(error)` on catch.
- List endpoints: `parsePage(req.query.page)` / `parsePerPage(req.query.perpage)`, trim `search` to `undefined` if empty; service computes `offset = (page - 1) * perpage`, queries with `.limit(perpage).offset(offset)`, returns `{ data, meta: { page, perpage, total, totalPages } }`.
- Customer scoping: every query filters `customers.shopOwnerId = req.user.id`; uniqueness is `(phone, shopOwnerId)` (`idx_unique_shopownerId_phone`); search uses `ilike(name|phone, %search%)`.
- Zod DTOs: infer types via `z.infer`; money fields are decimal-as-string (`/^\d+(\.\d{1,2})?$/`, 0–999999999.99); phone is `/^\d{10}$/`.
- TS: `strict`, `NodeNext`, `rootDir: .`, `include: [src, db, lib, utils]`. `type: commonjs`; use `tsx` for running TS directly.
