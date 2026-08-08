#!/usr/bin/env bash
set -euo pipefail

STATION="${1:-UNKNOWN_MAC}"
APP_REPO="${KODEX_APP_REPO:-wenumapu8-droid/wenu-frontend}"
CANON_REPO="${KODEX_CANON_REPO:-wenumapu8-droid/kodex-minus-infinity}"

echo "KODEX−∞ frontier station health check"
echo "station: ${STATION}"
echo "app repo: ${APP_REPO}"
echo "canon repo: ${CANON_REPO}"
echo

warn() { printf 'WARN: %s\n' "$*" >&2; }
ok() { printf 'OK: %s\n' "$*"; }

for bin in git gh node npm claude; do
  if command -v "$bin" >/dev/null 2>&1; then
    ok "$bin -> $(command -v "$bin")"
  else
    warn "$bin is not available"
  fi
done

echo
if command -v node >/dev/null 2>&1; then
  echo "node: $(node --version 2>/dev/null || true)"
fi
if command -v npm >/dev/null 2>&1; then
  echo "npm: $(npm --version 2>/dev/null || true)"
fi
if command -v claude >/dev/null 2>&1; then
  echo "claude: $(claude --version 2>/dev/null || true)"
  echo
  echo "Running 'claude doctor' (diagnostic only; credentials are not printed or stored)..."
  claude doctor || warn "claude doctor reported a problem. If authentication is missing, launch 'claude' interactively and choose the Claude App Pro/Max account flow."
else
  cat >&2 <<'EOF'
Claude Code is missing.
Install using Anthropic's supported installer, then launch `claude` interactively.
For an existing Claude Pro/Max subscription, select the Claude App account option during authentication.
Do not paste OAuth tokens, API keys, cookies or credentials into Git, issues, chat handoffs or shell scripts.
EOF
fi

echo
if command -v gh >/dev/null 2>&1; then
  echo "Checking GitHub CLI authentication..."
  gh auth status || warn "GitHub CLI is not authenticated. Run 'gh auth login' interactively on this Mac."
fi

echo
if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "current repo: $(git rev-parse --show-toplevel)"
  echo "branch: $(git branch --show-current)"
  echo "remote:"
  git remote -v | sed -n '1,4p'
  echo "working tree:"
  git status --short --branch
else
  warn "Current directory is not a Git working tree. Run this script from the KODEX canonical or app repository."
fi

cat <<'EOF'

NEXT SAFE CHECKS
1. Pull/re-read `ops/factory/DISPATCH_QUEUE.yaml` from the canonical repository.
2. Read only the station's current packet before changing files.
3. For visual/architecture work, read `ops/factory/FRONTIER_VISUAL_GATE.md`.
4. Do not self-assign a new packet after handoff.
5. Do not write to main directly.
6. Do not deploy without the exact creator phrase `APROBAR DEPLOY`.

This script intentionally does NOT install credentials, copy tokens, alter permissions, clone repositories, reset branches, merge PRs or deploy production.
EOF
