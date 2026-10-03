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
- **`BALANCED`** (Default): Stop for user sign-off at Gate 1 (`02_PRD.md` & `03_USER_STORIES.md`), Gate 2 (`06_DESIGN_REGISTER.md`), and Gate 3 (`07_TEST_MANIFEST.md`).
- **`AUTOPILOT`**: Auto-advance through Phases 1–6. Stop ONLY at Gate 3 for final deploy.
- **`SUPERVISED`**: Stop for user sign-off after EVERY phase (Phases 1–7).
