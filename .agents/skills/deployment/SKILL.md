---
name: deployment
description: Guide interactive deployment setup after QA, collect provider prerequisites, and release to Vercel, Expo EAS, or a user-selected provider.
---

# Deployment Lead (Final Release Step)

Follow `.agents/rules/GLOBAL_RULES.md`, especially Interactive Setup. Logging and monitoring setup are out of scope.

## Entry and Provider Selection
1. Read `tests/07_TEST_MANIFEST.md`, `docs/04_TECHNICAL_SPEC.md`, and `docs/08_SETUP_REGISTER.md` if present. Inspect package and provider configuration without exposing secrets. Start after QA and peer review establish either production readiness or explicitly qualified mock-demo readiness. A mock-demo result can reach handoff/skip or an explicitly requested demo preview, never a production release.
2. Always stop at this checkpoint. For a previously chosen destination offer **Continue with saved destination**, **Change destination**, **Skip deployment — I will handle it**. Reuse saved details after that choice. Otherwise present clickable choices using an available structured question tool: website → **Vercel (Recommended)**, **Another provider**, **Skip deployment — I will handle it**; Expo mobile → **Expo EAS (Recommended)**, **Another provider**, **Skip deployment — I will handle it**. Offer Later separately when needed. For mixed projects, ask per deployable target. EAS does not host a standalone Node backend or database.
3. If the user skips, record `[SKIPPED — USER MANAGED]`, provide a concise handoff with outstanding backend work, state **Nothing was deployed**, and stop deployment work. Do not run provider setup, deploy, remote build, or submission commands. This completes the workflow as a handoff, not a deployed release. Otherwise load only the selected guide: [Vercel](references/vercel.md), [Expo EAS](references/eas.md), or [another provider](references/other.md).
4. Guide one prerequisite at a time. Offer **Done — check it**, **Help with this step**, **Do this later**. Ask for non-secret details only when they cannot be discovered. Provide copyable commands and direct dashboard links for user actions.

## Prepare, Release, Verify
- Track each target in `docs/08_SETUP_REGISTER.md`: provider, account/project identifiers, environment, prerequisite progress, variable names and storage locations (never values), validation evidence, next user action, and official documentation links.
- Prepare `docs/09_RELEASE_PLAN.md` with exact target, source revision/build, environment, release action, required migrations, cost/plan constraints, verification, and recovery steps. Select only the platform(s) the user requested.
- Gate 3 is approval of this concrete plan alongside the passing test manifest. If database setup was skipped, block production and offer **Return to database setup**, **Skip deployment**, or **Demo preview only** where supported. A demo requires explicit approval, clear mock-data labeling, and a non-production destination; production remains blocked. Present **Deploy this plan**, **Change settings**, **Later** using an available approval-capable control; otherwise require an explicit reply. A preselected answer or silence is not approval. Existing explicit approval for this exact plan counts; changed target/source/actions require renewed approval.
- Production deployment and store submission require that approval in every autonomy mode. Setup completion alone is not release approval. Do not execute release commands merely because they were displayed as instructions.
- After authorization, run the prepared steps and verify the selected outcome: preview/live URL, installable build, TestFlight availability, submission awaiting review, or store release. Upload success does not establish availability or publication.
- Record outcome and evidence in the release plan. On failure, record the failing step and resume there; do not blindly repeat submissions, migrations, or billable builds. Keep user-required and externally pending steps open in `NEXT_STEP_POINTER`.
- A provider change revisits prerequisites and affected architecture/tests before deployment. Database setup is owned by the service engineer; reuse its verified configuration.
