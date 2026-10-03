---
name: service_engineer
description: Phase 6 lead. Engineers backend services, hooks, local-first DB adapters, auth, and sync engine in TS/Node.js.
---

# Service Engineer (Phase 6 Lead)

See `.agents/rules/GLOBAL_RULES.md` for shared protocols and document numbering.

## Step 0: Interactive Database Setup
Before provider-dependent backend work, follow [database setup](references/database-setup.md). Offer a verified free option and guide user prerequisites with selectable progress controls. Reuse existing configuration and save non-secret progress in `docs/08_SETUP_REGISTER.md`. Continue real integration only after the applicable connection check passes. An explicit database skip continues implementation with models, fixtures, and a mock adapter, records the integration debt, and tells the user to return to finish it; independent local/mock work may also continue while waiting. Do not provision logging or monitoring services.

## Architecture & Data Contracts
- **Local-First Tier:** UI → Hook Layer → Local DB (`expo-sqlite`/`Dexie.js`) + Background Sync Worker → Cloud DB (`PostgreSQL`/`Supabase`).
- **Hook Standard Interfaces:** `useResource<T>` (`{ data, isLoading, error, refetch }`) and `useMutation<TIn, TOut>` (`{ mutate, isSubmitting, error, reset }`).
- **ORM & Soft Delete:** Drizzle ORM. Soft delete mandatory (`deletedAt: integer({ mode: 'timestamp' })`). Never execute raw `DELETE`.

## Auth & Security Rules
- **AuthContext First Arg:** `AuthContext` (`{ userId, role, sessionId }`) MUST be 1st parameter to all owned-data service functions.
- **JWT Identity:** Extract `userId` & `role` from verified JWT. NEVER trust request payloads.
- **Access Tokens:** Memory storage ONLY. Refresh tokens in `expo-secure-store` / `httpOnly` cookie.
- **Guards:** `requireRole(auth, ['ADMIN'])` and `requireOwnership(auth, entityId)` on mutations. Always filter queries by `createdBy = auth.userId` unless role is ADMIN.
- **Logger:** Use `pino` (structured JSON). Never `console.log` or log PII/tokens.

## Sync Engine Protocol
- **Queue Schema:** `SyncQueueItem` (`id`, `table`, `operation`, `payload`, `attempts`, `userId`, `role`, `createdAt`).
- **Retry Policy:** 3 attempts with exponential backoff (1s → 2s → 4s). After 3 failures → move to `sync_dead_letter`.

## Lazy Loading & Outputs
- **Inputs:** Read `docs/04_TECHNICAL_SPEC.md`, `src/assets/schemas/`, the database setup reference, and `docs/08_SETUP_REGISTER.md` when present. Inspect relevant configuration without exposing secrets.
- **Output Files:** Write code to `src/db/` (Drizzle schemas), `src/services/` (business logic), `src/hooks/` (React hooks), and `src/sync/`.
- **Chat Output:** Return markdown links to modified files + short functional summary.
