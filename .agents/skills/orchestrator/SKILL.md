---
name: orchestrator
description: State machine engine. Initializes & overwrites docs/PROJECT_STATUS.md every turn for cold-start resumption.
---

# Orchestrator (State Machine Engine)

See `.agents/rules/GLOBAL_RULES.md` for shared protocols and document numbering.

## Non-Negotiables & Rules
- **Invisible Execution:** Overwrite `docs/PROJECT_STATUS.md` silently on disk at the end of *every user turn*. Never dump raw table in chat unless requested.
- **Line Limit & Session Cap:** Keep `PROJECT_STATUS.md` under 65 lines. Maintain rolling **3-session log cap** (delete oldest rows).
- **Exact Status Enums:** `[NOT STARTED] | [IN PROGRESS] | [AWAITING PEER REVIEW] | [AWAITING MANAGER APPROVAL] | [COMPLETED & LOCKED]`.

## Template: `docs/PROJECT_STATUS.md`
```markdown
# PROJECT STATUS — [Project Name]
**Autonomy Mode:** [BALANCED|AUTOPILOT|SUPERVISED] | **Last Updated:** [ISO 8601]
### 🎯 NEXT_STEP_POINTER: Phase [N], Step [N] — [Agent] to [action]. [Execute immediately | Awaiting user].

## Phase Progress
- [ ] Phase 1 (Discovery): `docs/01_ARCH_BRIEF.md` — [Status] | Agent: IT Consultant
- [ ] Phase 2 (Scope): `docs/02_PRD.md`, `docs/03_USER_STORIES.md` — [Status] | Agent: Product Owner
- [ ] Phase 3 (Tech Spec): `docs/04_TECHNICAL_SPEC.md`, `docs/05_TASK_MANIFEST.md` — [Status] | Agent: Tech Architect
- [ ] Phase 4 (Schemas): `src/assets/schemas/` — [Status] | Agent: Content Parser
- [ ] Phase 5 (UI/UX): `docs/06_DESIGN_REGISTER.md`, `src/components/` — [Status] | Agent: Frontend Dev
- [ ] Phase 6 (Service): `src/services/`, `src/hooks/`, `src/db/` — [Status] | Agent: Service Eng
- [ ] Phase 7 (QA/Deploy): `tests/07_TEST_MANIFEST.md` — [Status] | Agent: QA Agent

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
```

## Gateway & Transition Logic
1. **On `✅ APPROVED` from Reviewer:**
   - **`SUPERVISED`:** Set `[AWAITING MANAGER APPROVAL]`. Pause.
   - **`BALANCED`:** Pause ONLY at Phase 2 (`02_PRD.md`), Phase 5 (`06_DESIGN_REGISTER.md`), and Phase 7 (`07_TEST_MANIFEST.md`). For Phase 1, 3, 4, 6: mark `[COMPLETED & LOCKED]`, set next phase `[IN PROGRESS]`, auto-trigger next agent in `NEXT_STEP_POINTER`.
   - **`AUTOPILOT`:** Auto-advance Phases 1–6. Pause ONLY at Phase 7 for deploy.
2. **On `🚫 BLOCKED` from Reviewer:** Set status `[IN PROGRESS]`, target builder agent in `NEXT_STEP_POINTER` with fix list, auto-trigger re-run.

## Cold-Start Resumption
When user says *"Read PROJECT_STATUS.md and continue"*:
1. Parse `NEXT_STEP_POINTER`.
2. Announce: `🔄 Session Resumed. Autonomy: [Mode]. Executing → [Agent].`
3. Execute immediately — zero re-contextualization or historical summaries.
