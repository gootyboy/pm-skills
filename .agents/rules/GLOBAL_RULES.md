# Global SDLC Swarm Rules & Protocols

## 1. Core Operating Principles & Capability Model
- **1-Person Company Model:** Solo founder + AI swarm. Features built as vertical slices (UI through DB per story).
- **Capability-Driven Execution:** Phase 1 defines `docs/00_PROJECT_CONTRACT.md`. Agents skip infrastructure marked `none` and flag checks `N/A — CAPABILITY NOT REQUIRED`.
- **Zero-Trust Audit:** Architecture Reviewer audits every deliverable against `00_PROJECT_CONTRACT.md`.

## 2. Document Prefix Protocol & Canonical Paths
- **Numbering:** Document prefixes are stable artifact IDs, not phase numbers or execution order. Document 00 belongs to Phase 1; Document 10 belongs to Phase 8. Release follows Phase 8 without a phase number.
- **Tone:** Very terse, concise, and clear. Zero conversational filler.
- **Canonical Document Paths:**
  - `docs/00_PROJECT_CONTRACT.md` — Phase 1: Capability & Target Contract
  - `docs/01_ARCH_BRIEF.md` — Phase 1: Architecture Brief
  - `docs/02_PRD.md` — Phase 2: Product Requirements Document
  - `docs/03_USER_STORIES.md` — Phase 2: Full-Stack User Stories
  - `docs/04_TECHNICAL_SPEC.md` — Phase 3: Technical Specification
  - `docs/05_TASK_MANIFEST.md` — Phase 3: Executable Task Manifest
  - `docs/06_DESIGN_REGISTER.md` — Phase 5: UI Mockup Register
  - `tests/07_TEST_MANIFEST.md` — Phase 7: Automated Test Manifest *(Canonical path)*
  - `docs/08_SETUP_REGISTER.md` — Database/Prerequisite Progress Register
  - `docs/09_RELEASE_PLAN.md` — Release Approval & Verified Plan
  - `docs/10_UAT_CHECKLIST.md` — User Acceptance Testing & StackBlitz Review Checklist
  - `UAT_FEEDBACK.md` — Phase 8 revision feedback, when requested
  - `open_stackblitz.html`, `redirect_stackblitz.html` — Phase 8 sandbox launchers
  - `docs/PROJECT_STATUS.md` — Orchestrator state and next action
  - `progress.html` — Live Visual Project Progress Dashboard (Project Root)
  - `docs/reviews/0[N]_ARCH_REVIEW_PHASE_[N].md` — Phase Audit Reports

## 3. Revision Invalidation & Traceability Protocol
- **Artifact Sign-off:** Approvals record artifact path, revision hash, approver, scope, and evidence.
- **Cascading Invalidation:** Modifying an upstream artifact (story, contract, platform, capability, permission policy, schema, tech spec) invalidates affected downstream artifacts and reopens approvals from the earliest affected phase.

## 4. Status Vocabulary & Terminal States
- **Status Enums:** `[NOT STARTED]`, `[IN PROGRESS]`, `[AWAITING USER SETUP]`, `[AWAITING PEER REVIEW]`, `[AWAITING MANAGER APPROVAL]`, `[AWAITING UAT SIGN-OFF]`, `[COMPLETED & LOCKED]`, `[SKIPPED — MOCKS ONLY]`, `[SKIPPED — USER MANAGED]`, `[N/A — CAPABILITY NOT REQUIRED]`, `[UNVERIFIED — DEPENDENCY DEFERRED]`, `[STALE — REVISION REQUIRED]`.
- **Terminal Pointer:** After verified release use `NEXT_STEP_POINTER: COMPLETE — RELEASE VERIFIED`; after explicit deployment skip use `NEXT_STEP_POINTER: COMPLETE — USER MANAGED HANDOFF`.

## 5. Token & Context Efficiency Protocol
- **Write-to-File, Link-in-Chat:** Save code/schemas/specs directly to disk. In chat, return file links + 3-bullet summary.
- **Lazy Loading:** Load ONLY the specific artifact required for the active step.
- **Bounded State Window:** `docs/PROJECT_STATUS.md` maintains a rolling 3-session log cap (≤ 65 lines).

## 6. Autonomy Modes
- **`BALANCED`** (Default): Stop for sign-off at Gate 1 (`02_PRD.md` & `03_USER_STORIES.md`), Gate 2 (`06_DESIGN_REGISTER.md`), Gate 3 (UAT StackBlitz Review), and Gate 4 (`09_RELEASE_PLAN.md`).
- **`AUTOPILOT`**: Auto-advance between required checkpoints. Stop at Gate 2 (mockups), DB setup/skip, Gate 3 (UAT), deployment selection/skip, and Gate 4 (release approval).
- **`SUPERVISED`**: Stop for user sign-off after EVERY phase (1–8), plus setup checkpoints and Gate 4. Phase 8 sign-off is Gate 3, not a second approval.
- **All modes:** Database setup/skip occurs at Phase 6 entry. Deployment selection/skip occurs in Release after UAT. Explicit deployment skip ends Release without publishing; deferred required backend work stays mock-only. Passing QA hands off to UAT, not directly to Release.

### Canonical Roles & Phase Order

Paths are relative to `.agents/skills/`. This registry defines the existing workflow for routing tables and visualizers.

| Stage | Role | Skill name | Skill path |
|---|---|---|---|
| Phase 1 — Discovery & Contract | IT Consultant | `it_consultant` | `it_consultant/SKILL.md` |
| Phase 2 — Scope | Product Owner | `product_owner` | `product_owner/SKILL.md` |
| Phase 3 — Technical Specification | Technical Architect | `technical_architect` | `techincal_architect/SKILL.md` |
| Phase 4 — Schemas | Content Parser | `content_parser` | `content_parser/SKILL.md` |
| Phase 5 — UI/UX | Frontend Developer | `frontend_developer` | `frontend_developer/SKILL.md` |
| Phase 6 — Database Setup & Services | Service Engineer | `service_engineer` | `service_engineer/SKILL.md` |
| Phase 7 — QA | QA Agent | `qa_agent` | `qa_agent/SKILL.md` |
| Phase 8 — UAT | UAT Coordinator | `uat` | `uat/SKILL.md` |
| Release | Deployment Lead | `deployment` | `deployment/SKILL.md` |
| Entry & routing | PM | `pm` | `pm/SKILL.md` |
| State & dashboard | Orchestrator | `orchestrator` | `orchestrator/SKILL.md` |
| Cross-phase audit | Architecture Reviewer | `architecture_reviewer` | `architecture_reviewer/SKILL.md` |
| Phase 5 design support | Apple Design | `apple-design` | `apple_design/SKILL.md` |

There are 13 skills: eight phase leads, one release lead, and four supporting skills. `PROJECT_BUILDER_SKILL.md` is the controller document, not a discoverable skill. Caveman is a rule in `CAVEMAN.md`. Keep existing folder names, including `techincal_architect`, when resolving paths. Phases execute in the listed order; the reviewer audits throughout, and Apple Design supports Phase 5 without adding a phase.

## 7. Visual Progress Dashboard Protocol (`progress.html`)
- **Visual Over Textual:** Whenever the swarm operates on an active project, it must maintain an interactive `progress.html` at the project root. Stakeholders should never have to manually parse disjointed markdown files to assess project health.
- **Mandatory Dashboard Elements:**
  1. **Visual Milestone Stepper:** Displays active phase, completed milestones, and upcoming gates.
  2. **Live Environment Hub:** Embedded links to local dev servers and the **temporary StackBlitz UAT sandbox**.
  3. **Deliverables Index:** Clean cards linking to and summarizing `02_PRD.md`, `04_TECHNICAL_SPEC.md`, `07_TEST_MANIFEST.md`, and `10_UAT_CHECKLIST.md`.
  4. **Acceptance Sign-off:** Interactive checklist for stakeholders to test and approve the release.
