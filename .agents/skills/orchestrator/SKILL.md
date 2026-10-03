---
name: orchestrator
description: State machine engine. Initializes & overwrites docs/PROJECT_STATUS.md every turn for cold-start resumption.
---

# Orchestrator (State Machine Engine)

See `.agents/rules/GLOBAL_RULES.md` for shared protocols and document numbering.

## Non-Negotiables & Rules
- **Invisible Execution:** Overwrite `docs/PROJECT_STATUS.md` silently on disk at the end of *every user turn*. Never dump raw table in chat unless requested.
- **Line Limit & Session Cap:** Keep `PROJECT_STATUS.md` under 65 lines. Maintain rolling **3-session log cap** (delete oldest rows).
- **Exact Status Enums:** `[NOT STARTED] | [IN PROGRESS] | [AWAITING USER SETUP] | [AWAITING PEER REVIEW] | [AWAITING MANAGER APPROVAL] | [COMPLETED & LOCKED] | [SKIPPED — USER MANAGED]`. Database readiness is recorded separately in the setup register as `[SKIPPED — MOCKS ONLY]` when applicable.

## Template: `docs/PROJECT_STATUS.md`
```markdown
# PROJECT STATUS — [Project Name]
**Autonomy Mode:** [BALANCED|AUTOPILOT|SUPERVISED] | **Last Updated:** [ISO 8601]
### 🎯 NEXT_STEP_POINTER: Phase [N] or Release, Step [N] — [Agent] to [action]. [Execute immediately | Awaiting user].

## Phase Progress
- [ ] Phase 1 (Discovery): `docs/01_ARCH_BRIEF.md` — [Status] | Agent: IT Consultant
- [ ] Phase 2 (Scope): `docs/02_PRD.md`, `docs/03_USER_STORIES.md` — [Status] | Agent: Product Owner
- [ ] Phase 3 (Tech Spec): `docs/04_TECHNICAL_SPEC.md`, `docs/05_TASK_MANIFEST.md` — [Status] | Agent: Tech Architect
- [ ] Phase 4 (Schemas): `src/assets/schemas/` — [Status] | Agent: Content Parser
- [ ] Phase 5 (UI/UX): `docs/06_DESIGN_REGISTER.md`, `src/components/` — [Status] | Agent: Frontend Dev
- [ ] Phase 6 (Database Setup & Service): `src/services/`, `src/hooks/`, `src/db/` — [Status] | Agent: Service Eng
- [ ] Phase 7 (QA): `tests/07_TEST_MANIFEST.md` — [Status] | Agent: QA Agent

- [ ] Release (Provider Setup & Deployment): `docs/08_SETUP_REGISTER.md`, `docs/09_RELEASE_PLAN.md` — [Status] | Agent: Deployment Lead

## Session Log (Rolling 3 Cap)
| # | Date | Completed | Ended At |

## Artifact Index
| Artifact | Path | Phase | Status |
| Architecture Brief | `docs/01_ARCH_BRIEF.md` | 1 | [enum] |
| PRD | `docs/02_PRD.md` | 2 | [enum] |
| User Stories | `docs/03_USER_STORIES.md` | 2 | [enum] |
| Technical Spec | `docs/04_TECHNICAL_SPEC.md` | 3 | [enum] |
| Task Manifest | `docs/05_TASK_MANIFEST.md` | 3 | [enum] |
| Schemas | `src/assets/schemas/` | 4 | [enum] |
| Design Register | `docs/06_DESIGN_REGISTER.md` | 5 | [enum] |
| Screen Mockups | `docs/design/mockups/` | 5 | [enum] |
| Test Manifest | `tests/07_TEST_MANIFEST.md` | 7 | [enum] |
| Setup Register | `docs/08_SETUP_REGISTER.md` | 6 / Release | [enum] |
| Release Plan | `docs/09_RELEASE_PLAN.md` | Release | [enum] |
```

## Gateway & Transition Logic
1. At the mockup checkpoint, set `[AWAITING MANAGER APPROVAL]` with a review pointer before any UI implementation. On reviewer approval, SUPERVISED pauses at each phase; BALANCED pauses at scope (Phase 2) and design (Phase 5); AUTOPILOT advances between checkpoints. Every mode must stop after generated mockups for user review before UI code, at database setup/skip, and at final deployment selection/skip. These checkpoints take precedence over auto-advance.
2. On entering Phase 6, run Service Engineer Step 0. Missing user actions set `[AWAITING USER SETUP]` and point to the specific database prerequisite. Resume only the dependent work after verification; do not re-ask completed choices. Explicit database skip records `[SKIPPED — MOCKS ONLY]` in the setup register and advances mock-backed implementation with outstanding integration tracked; it does not complete real-backend validation.
3. After Phase 7 passes review for production or explicitly qualified mock-demo scope (and supervised phase approval when applicable), stop for Release deployment selection/skip. Do not mark the project released or request production approval before a concrete release plan exists. Missing prerequisites set `[AWAITING USER SETUP]`.
4. Once the plan is ready, Gate 3 in all modes is `[AWAITING MANAGER APPROVAL]` for the exact release plan and passing QA evidence. Existing explicit approval of that exact plan counts. Approval authorizes the specified action, not other environments or submissions.
5. After authorized execution, record verified outcome in the release plan. Mark Release `[COMPLETED & LOCKED]` only when the requested destination is reached. If a store review or user action remains, preserve the pending state and next action; an uploaded build is not a published app.
6. On explicit deployment skip, record `[SKIPPED — USER MANAGED]` for Release and end with a user-managed handoff, stating nothing was deployed and listing unresolved database work. No provider execution follows this decision. A mock-only backend blocks production even if other tests pass.
7. On reviewer BLOCKED, return to the builder with a fix list. Setup blockers instead return to the exact pending user prerequisite. Mode changes and `/pm next` never bypass missing setup or approval.

## Cold-Start Resumption
When user says *"Read PROJECT_STATUS.md and continue"*:
1. Parse `NEXT_STEP_POINTER`.
2. Announce: `🔄 Session Resumed. Autonomy: [Mode]. Executing → [Agent].`
3. Execute the next actionable step. If awaiting setup or approval, reopen only that pending choice/action; never interpret resume as consent.
