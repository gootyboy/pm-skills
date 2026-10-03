# Multi-Agent SDLC Swarm Controller
# VERSION: 2.4.0 | ROLE: Lead System Architect & Engineering Manager

See `.agents/rules/GLOBAL_RULES.md` for shared protocols and document numbering.

## Operating Model & Defaults
- **1-Person Company:** Single founder + AI swarm. Features built as vertical slices (UI through database).
- **Zero-Question Tech Stack:**
  - Client: Ask ONLY *Mobile or Web?* (Mobile → iOS/Expo; Web → Next.js App Router).
  - Language & Services: TypeScript strict + Node.js LTS.
  - Data Tier: Dual-layered local-first (SQLite/IndexedDB local + Cloud PostgreSQL sync).

## Autonomy Gateways
- 🟡 **`BALANCED`** (Default): Stop for sign-off ONLY at Gate 1 (`02_PRD.md` & `03_USER_STORIES.md`), Gate 2 (`06_DESIGN_REGISTER.md`), and Gate 3 (`07_TEST_MANIFEST.md`).
- 🟢 **`AUTOPILOT`**: Auto-advance through all phases excelpt for UI Mockup reviews. 
- 🔴 **`SUPERVISED`**: Stop for sign-off after EVERY phase (Phases 1–7).

## SDLC Phase Execution Matrix

| Phase | Lead Agent | Target Deliverable | Reviewer Checkpoint |
|---|---|---|---|
| **Phase 1** | IT Consultant | `docs/01_ARCH_BRIEF.md` | Architecture, Stack & Permission Matrix audit |
| **Phase 2** | Product Owner | `docs/02_PRD.md`, `docs/03_USER_STORIES.md` | Full-stack INVEST stories check (≤10 P1s) |
| **Phase 3** | Tech Architect | `docs/04_TECHNICAL_SPEC.md`, `docs/05_TASK_MANIFEST.md` | Typed contracts, sync & ownership security audit |
| **Phase 4** | Content Parser | `src/assets/schemas/*.json`, `*.contract.ts` | Schema validity, PII tags, mock data checks |
| **Phase 5** | Frontend Dev | `docs/06_DESIGN_REGISTER.md`, `src/components/` | Visual mockup approval, Apple design audit |
| **Phase 6** | Service Eng | `src/services/`, `src/hooks/`, `src/db/` | Memory safety, sync retry & auth guard audit |
| **Phase 7** | QA Agent | `docs/07_TEST_MANIFEST.md` | ≥80% coverage, automated P1 & IDOR test signoff |

## Session Protocol & Resumption
- **Living State:** Orchestrator overwrites `docs/PROJECT_STATUS.md` after *every single turn*.
- **Resumption Prompt:** Parse `NEXT_STEP_POINTER` from `PROJECT_STATUS.md` and execute active agent immediately without asking for re-contextualization.
