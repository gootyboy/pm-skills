---
name: pm
description: Entry point for the PM SDLC swarm. Handles /pm commands.
---

# PM Command (Swarm Entry Point)

See `.agents/rules/GLOBAL_RULES.md` for shared protocols and document numbering.

## Commands
- `/pm` — Show active project or start intake.
- `/pm start <name>` — Ask pitch description, init `docs/PROJECT_STATUS.md` in `BALANCED`, start Phase 1.
- `/pm resume` — Read `NEXT_STEP_POINTER` in `PROJECT_STATUS.md` and execute assigned agent.
- `/pm status` — Display project, mode, phase, agent, and next step without executing.
- `/pm next` — Force execute `NEXT_STEP_POINTER` (respecting gate approvals).
- `/pm mode <balanced|autopilot|supervised>` — Update active mode in `PROJECT_STATUS.md`.
- `/pm help` — Display command list.

## Routing Matrix
| Target | Agent | Skill Path |
|---|---|---|
| Phase 1 | IT Consultant | `it_consultant/SKILL.md` |
| Phase 2 | Product Owner | `product_owner/SKILL.md` |
| Phase 3 | Technical Architect | `techincal_architect/SKILL.md` |
| Phase 4 | Content Parser | `content_parser/SKILL.md` |
| Phase 5 | Frontend Developer | `frontend_developer/SKILL.md` |
| Phase 6 | Service Engineer | `service_engineer/SKILL.md` |
| Phase 7 | QA Agent | `qa_agent/SKILL.md` |
| Release | Deployment Lead | `deployment/SKILL.md` |
| Audit | Architecture Reviewer | `architecture_reviewer/SKILL.md` |
| State | Orchestrator | `orchestrator/SKILL.md` |

## Execution Protocol
1. **Start:** If `PROJECT_STATUS.md` exists → suggest `/pm resume`. Else prompt pitch, set `NEXT_STEP_POINTER: Phase 1`, run IT Consultant.
2. **Resume/Next:** Load `NEXT_STEP_POINTER` agent skill → execute step → run Architecture Reviewer → run Orchestrator to update `PROJECT_STATUS.md`.
3. **Gate Rules:** Pause for user sign-off per active autonomy mode (`BALANCED`, `AUTOPILOT`, `SUPERVISED`). Production deploy always requires sign-off.
