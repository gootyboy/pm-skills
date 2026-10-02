# Caveman Skill

This folder contains a **Caveman** skill definition that can be used by any project without installing external npm packages.

## How it works
- Create a JavaScript file (e.g., `caveman.caveman.js`) that **exports an array of skill objects**. Each object must have:
  - `desc`: a human‑readable description of the rule.
  - `test`: a synchronous function returning `true` (pass) or `false` (fail). Throwing an error also counts as a failure.
- The project can use a tiny runner script (e.g., `caveman-runner.js`) that automatically discovers this file and reports the results.

## Example skill file (`caveman.caveman.js`)
```js
module.exports = [
  {
    desc: "package.json must have a non‑empty `name`",
    test: () => {
      const pkg = require("./../package.json");
      return typeof pkg.name === "string" && pkg.name.trim().length > 0;
    },
  },
  {
    desc: "app.json must contain a `displayName`",
    test: () => {
      const app = require("./../app.json");
      return typeof app.displayName === "string" && app.displayName.trim().length > 0;
    },
  },
];
```

## Running the skill
Add the following npm script to the project’s `package.json`:
```json
"scripts": {
  "caveman": "node caveman-runner.js start"
}
```
Then run:
```bash
npm run caveman
```
The runner will automatically pick up any `*.caveman.js` file inside the `.agent/skills` folder.

## No external dependencies
All of this works with **plain Node.js** (even v20). No `npm install` or global CLI is required – just the skill file and a runner script.

---

*Feel free to modify or extend the skill definitions as needed.*
