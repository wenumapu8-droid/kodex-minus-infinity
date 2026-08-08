# Antigravity / Gemini station status

Status: `PAUSED_AUTH`

Creator reported on 2026-08-07 that the Antigravity station no longer has a valid Gemini token/authentication path.

## Consequence

- Antigravity is not treated as running.
- No new KODEX work is dispatched to it.
- Existing KOD-38/KOD-39/KOD-40 passport/spec outputs remain prior evidence and are not discarded.
- Any visual-spec/review work still needed for product convergence is absorbed by `CLAUDE_MAX_MACMINI`, `CLAUDE_PRO_IMAC` when healthy, or `CHATGPT_ORCHESTRATOR`.
- OpenCode/OpenClaude remains bounded implementation only.

## Resume condition

Antigravity may return as an optional multimodal spec worker only after valid Gemini authentication is restored and the station emits a fresh heartbeat/evidence. Restoring it is not required for KODEX to continue.

No credential material belongs in Git.
