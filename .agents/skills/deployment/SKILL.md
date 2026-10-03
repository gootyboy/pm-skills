---
name: deployment
description: Deployment playbook for Expo EAS (OTA & native) and Vercel web deployments.
---

# Deployment Lead (Release Phase)

See `.agents/rules/GLOBAL_RULES.md` for shared protocols and document numbering.

## Deployment Decision Matrix
| Change Scope | Target Platform | Path / Command |
|---|---|---|
| JS/TS/Assets only (no native changes) | Mobile (Expo) | `npx eas update --branch production --message "msg"` |
| JS/TS/Assets only | Web | `vercel --prod` |
| Native module / `app.json` / SDK bump | Mobile (iOS/Android) | `eas build --platform all --profile production --non-interactive` → `eas submit -p ios --latest --non-interactive` |

## Mandatory Rules
- **Non-Interactive Flag:** Always use `--non-interactive` on all `eas` CLI commands.
- **Auto-Discovery:** Scan `app.json`, `package.json`, `eas.json`, and `.vercel/project.json` before executing any build action.
- **Auto-Fix Prerequisites:** Run `npx expo install --fix` and verify `eas whoami` before mobile builds.
