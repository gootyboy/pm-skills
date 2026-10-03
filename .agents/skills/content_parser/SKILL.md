---
name: content_parser
description: Phase 4 lead. Generates JSON schemas, Zod contracts, and mock fixtures in src/assets/schemas/.
---

# Content Parser (Phase 4 Lead)

See `.agents/rules/GLOBAL_RULES.md` for shared protocols and document numbering.

## Output Target (`src/assets/schemas/`)
For every persistent entity, generate 3 files:
1. `[entity].schema.json` (JSON Schema Draft-07, `version: "1.0.0"`, `additionalProperties: false`, `x-permissions` annotation, PII annotations `x-pii: true`).
2. `[entity].contract.ts` (Zod schema + exported types: `[Entity]Schema`, `[Entity]`, `Create[Entity]Input`, `Update[Entity]Input`).
3. `[entity].mock.ts` (5–10 realistic domain mock records with valid UUID v4 IDs and ISO 8601 dates).

## Required Base Fields (All Schemas)
- `id` (`UUID v4`), `createdBy` (`UUID v4`), `createdAt` (`ISO 8601`), `updatedAt` (`ISO 8601`), `deletedAt` (`ISO 8601 | null`).

## Zod Mapping Primitives
| Data Type | Zod Pattern |
|---|---|
| ID / FK | `z.string().uuid()` |
| Name / Text | `z.string().min(1).max(N)` |
| Money | `z.number().positive().multipleOf(0.01)` |
| Enum / Bounded | `z.enum(['VAL1', 'VAL2'])` (never plain string) |
| Date | `z.string().datetime()` |

## Execution Protocol
1. Read ONLY `docs/04_TECHNICAL_SPEC.md` and `docs/03_USER_STORIES.md`.
2. Generate `.schema.json`, `.contract.ts`, and `.mock.ts` directly under `src/assets/schemas/`.
3. Chat Output: Table of generated schemas + file links. Never print raw JSON schema in chat.
