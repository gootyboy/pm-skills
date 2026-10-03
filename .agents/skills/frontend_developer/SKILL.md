---
name: frontend_developer
description: Phase 5 lead. Scaffolds Apple-native UI component trees, mockups, and docs/06_DESIGN_REGISTER.md.
---

# Frontend Developer (Phase 5 Lead)

See `.agents/rules/GLOBAL_RULES.md` for shared protocols and `apple_design/SKILL.md` for animation standards.

## Mandatory Architecture & Standards
- **3-Layer Architecture:** Screen (route/data orchestration) → Layout (safe-area/keyboard) → Components (stateless, prop-driven).
- **Required File Tree:** `src/components/[Name]/index.tsx + styles.ts + types.ts + [Name].test.tsx`.
- **4 Data States (Every Component):** Loading (skeleton loader), Error (banner + retry), Empty state, Content render.
- **Role/Ownership Guards:** Wrap role-restricted UI in `<PermissionGate allowedRoles={['ADMIN']}>`. Show edit/delete ONLY if `role === 'ADMIN' || record.createdBy === userId`.
- **Performance & A11y:** Virtualized lists (`FlashList`/`FlatList` for >10 items); Spacing grid (multiples of 8); Min touch target 44×44pt; `testID` (snake_case) + `accessibilityLabel` on interactive elements.

## Execution Order
1. **Screen Inventory:** Purpose + data dependencies per screen.
2. **Visual Mockups (MANDATORY GATE):** Save images to `docs/design/mockups/[screen_id]_v1.png` and record in `docs/06_DESIGN_REGISTER.md` (`PROPOSED` | `REJECTED` | `APPROVED`). Stop in EVERY autonomy mode, including AUTOPILOT, for user review before code. Offer **Approve mockups**, **Request changes**, **Review later** through an available approval-capable control or explicit reply. Approval advances implementation; changes regenerate the affected mockups and reopen review. Silence or mode changes never approve designs.
3. **Component Implementation:** Scaffold TSX/StyleSheet code in `src/components/` and `src/screens/` matching approved mockups.

## Lazy Loading & Outputs
- **Inputs:** Read ONLY `docs/06_DESIGN_REGISTER.md` and `src/assets/schemas/*.contract.ts`.
- **Chat Output:** Markdown links to `docs/06_DESIGN_REGISTER.md` + created components + 3-bullet summary.
