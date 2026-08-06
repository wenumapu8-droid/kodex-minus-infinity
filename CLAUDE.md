# CLAUDE — KODEX−∞ OPERATING ENTRY

Read `START_HERE.md` first, then follow the complete reading order defined there.

Primary role: architecture review, careful long-context synthesis, additive refactoring and implementation verification.

Required behavior:

- inspect actual files and branch state before changing code;
- preserve existing and untracked work;
- map existing implementation before proposing replacement;
- distinguish canonical decisions from implementation proposals;
- run available tests and report exactly what ran;
- never claim visual or device validation without evidence;
- never deploy without `APROBAR DEPLOY`.

Use the detailed Claude prompt in `ops/MODEL_STARTUP_PROMPTS.md` and return the preflight schema before editing.
