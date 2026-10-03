# Global SDLC Swarm Rules & Protocols

## 1. Core Operating Principles
- **1-Person Company Model:** Solo founder + AI swarm. Features built as complete vertical slices (UI through database per story).
- **Zero-Trust Audit:** Architecture Reviewer audits every phase deliverable before approval.
- **Strict Efficiency:** Never dump raw files/code in chat. Write to disk, return markdown links + 3-bullet summary.

## 2. Communication & Document Numbering
- **Tone:** Very terse, concise, and clear. Zero conversational filler.
- **Document Prefix Protocol:** All generated phase documents MUST be numbered sequentially:
  - `docs/01_ARCH_BRIEF.md` — Phase 1: Architecture Brief
  - `docs/02_PRD.md` — Phase 2: Product Requirements Document
  - `docs/03_USER_STORIES.md` — Phase 2: Full-Stack User Stories
  - `docs/04_TECHNICAL_SPEC.md` — Phase 3: Technical Specification
  - `docs/05_TASK_MANIFEST.md` — Phase 3: Infrastructure Task Manifest
  - `docs/06_DESIGN_REGISTER.md` — Phase 5: UI Mockup Register
  - `tests/07_TEST_MANIFEST.md` — Phase 7: Automated Test Manifest
  - `docs/reviews/0[N]_ARCH_REVIEW_PHASE_[N].md` — Phase Audit Reports

## 3. Token & Context Efficiency Protocol
- **Write-to-File, Link-in-Chat:** Save code/schemas/specs directly to disk. In chat, return file links + bullet summary.
- **Lazy Loading:** Load ONLY the specific artifact required for the active step.
- **Bounded State Window:** `docs/PROJECT_STATUS.md` maintains a rolling 3-session log cap (≤ 65 lines).

## 4. Autonomy Modes
- **`BALANCED`** (Default): Stop for user sign-off at Gate 1 (`02_PRD.md` & `03_USER_STORIES.md`), Gate 2 (`06_DESIGN_REGISTER.md`), and Gate 3 (passing `07_TEST_MANIFEST.md` plus prepared `09_RELEASE_PLAN.md`).
- **`AUTOPILOT`**: Auto-advance between required checkpoints. Always stop for generated mockup review, database setup/skip, and deployment selection/skip; publishing still requires release approval.
- **`SUPERVISED`**: Stop for user sign-off after EVERY phase (Phases 1–7).


## 5. Interactive Setup (All Modes)
- **Three required checkpoints:** Stop after mockups are generated for review before UI implementation; at Phase 6 database setup for configure/skip; and after QA at final deployment selection for deploy/skip. These stops apply in every mode, including AUTOPILOT. Existing answers are reused, but defaults or silence never count as checkpoint decisions.
- **Interaction:** Prefer an available structured question tool with selectable options, one decision at a time. Recommend a relevant option first. For actions offer **Done — check it**, **Help**, **Later**. Use short numbered choices only if interactive controls are unavailable; never pretend text buttons are functional. Free text is reserved for identifiers or details that cannot be discovered. Use approval-capable controls for authorization when available; otherwise an explicit reply.
- **Guidance:** Give direct dashboard links and copyable commands one step at a time, stating where to run them and how to recognize success. These short command blocks are allowed despite the general write-to-file rule. Let users perform account creation, authentication, and private value entry. Inspect safe existing configuration first and verify completion without revealing values.
- **Secrets:** Never request or persist passwords, access tokens, private keys, or credential-bearing URLs in chat, tracked files, plans, or status. Users enter them through provider login/secret settings or ignored local environment files. Record variable names and storage locations only. Do not dump environment files or raw credential-bearing output.
- **Explicit skips:** Offer **Skip database — use mocks** at database setup and **Skip deployment — I will handle it** at release selection. Skip is distinct from Later: Later preserves a pending step. Database skip continues with typed models, validated mock fixtures, and a mock data adapter; record `[SKIPPED — MOCKS ONLY]` and visibly tell the user that persistence/auth/sync integration and real-backend checks must be completed later. Deployment skip records `[SKIPPED — USER MANAGED]`, executes no deployment/build/submission commands, and ends with a handoff stating nothing was deployed. Never record skips as verified readiness.
- **Persistence:** `docs/08_SETUP_REGISTER.md` holds per-target provider, stage, completed/pending prerequisites, non-secret identifiers, validation evidence, and next user action. `docs/09_RELEASE_PLAN.md` holds the concrete release plan and outcome. Create these only for an actual project at the relevant stage; they are not new numbered development phases.
- **Waiting:** Add `[AWAITING USER SETUP]` to workflow statuses. Missing setup input never auto-approves on timeout or mode changes. Later preserves the pending step; continue only independent work. On resume verify the first incomplete step. Provider/environment changes invalidate affected readiness and release approval.
- **Scope:** Logging/monitoring account provisioning, integrations, and dashboards are excluded. Production release approval follows the deployment skill; QA approval alone never triggers publication.
