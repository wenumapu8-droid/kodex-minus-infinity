#!/usr/bin/env python3
"""Create a metadata-only snapshot of a local KODEX git workspace.

Designed for the legacy Context Vault bridge. The snapshot records relative
paths, git state, sizes, checksums and review hints, but never copies file
contents. By default the output must live outside the repository so it cannot
be accidentally committed.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

MEDIA_SUFFIXES = {
    ".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".mp4", ".mov",
    ".m4v", ".wav", ".mp3", ".aiff", ".pdf", ".psd", ".ai", ".blend",
}
CODE_SUFFIXES = {
    ".ts", ".tsx", ".js", ".jsx", ".astro", ".py", ".glsl", ".frag",
    ".vert", ".wgsl", ".css", ".scss", ".json", ".yaml", ".yml", ".sh",
}
SENSITIVE_PARTS = {
    ".env", "secret", "secrets", "credential", "credentials", "token",
    "tokens", "private", "raw-conversations", "conversation-exports",
    "biometric-data", "restricted-cultural-material",
}


def _git(root: Path, *args: str) -> str:
    proc = subprocess.run(
        ["git", "-C", str(root), *args],
        check=False,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=False,
    )
    if proc.returncode != 0:
        message = proc.stderr.decode("utf-8", errors="replace").strip()
        raise ValueError(f"git {' '.join(args)} failed: {message}")
    return proc.stdout.decode("utf-8", errors="surrogateescape")


def _nul_paths(root: Path, *args: str) -> set[str]:
    raw = _git(root, *args)
    return {item for item in raw.split("\x00") if item}


def _sha256(path: Path, max_hash_bytes: int) -> str | None:
    try:
        size = path.stat().st_size
    except OSError:
        return None
    if size > max_hash_bytes:
        return None
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def _classification_hint(relative_path: str) -> tuple[str, list[str]]:
    path = Path(relative_path)
    lowered_parts = {part.lower() for part in path.parts}
    lowered_name = path.name.lower()

    if lowered_parts & SENSITIVE_PARTS or lowered_name.startswith(".env"):
        return "PRIVATE", ["sensitive_path_or_filename"]
    if relative_path.startswith("canon/") or relative_path.startswith("docs/decisions/") or relative_path.startswith("context/"):
        return "CANON_CANDIDATE", ["canonical_or_context_location"]
    if path.suffix.lower() in MEDIA_SUFFIXES:
        return "RIGHTS_REVIEW", ["media_or_binary_asset_requires_provenance_review"]
    if relative_path.startswith(("src/", "scripts/", "tests/", "public/kodex/")) or path.suffix.lower() in CODE_SUFFIXES:
        return "IMPLEMENTATION_EVIDENCE", ["code_or_implementation_artifact"]
    return "UNCLASSIFIED", ["human_or_agent_review_required"]


def create_snapshot(root: Path, *, max_hash_bytes: int = 50 * 1024 * 1024) -> dict[str, Any]:
    root = root.resolve()
    inside = _git(root, "rev-parse", "--is-inside-work-tree").strip()
    if inside != "true":
        raise ValueError("root is not a git work tree")

    tracked = _nul_paths(root, "ls-files", "-z")
    untracked = _nul_paths(root, "ls-files", "--others", "--exclude-standard", "-z")
    modified = _nul_paths(root, "diff", "--name-only", "-z")
    staged = _nul_paths(root, "diff", "--cached", "--name-only", "-z")

    branch = _git(root, "branch", "--show-current").strip()
    head = _git(root, "rev-parse", "HEAD").strip()
    branch_rows = []
    refs = _git(root, "for-each-ref", "--format=%(refname:short)\t%(objectname)", "refs/heads").splitlines()
    for row in refs:
        if not row.strip():
            continue
        name, sha = row.split("\t", 1)
        branch_rows.append({"name": name, "commit_sha": sha})

    files = []
    for relative in sorted(tracked | untracked):
        path = root / relative
        exists = path.is_file()
        states = []
        if relative in untracked:
            states.append("UNTRACKED")
        else:
            states.append("TRACKED")
        if relative in staged:
            states.append("STAGED")
        if relative in modified:
            states.append("MODIFIED")
        if relative in tracked and not path.exists():
            states.append("DELETED")

        hint, reasons = _classification_hint(relative)
        size = path.stat().st_size if exists else None
        files.append(
            {
                "path": relative,
                "exists": exists,
                "git_states": states,
                "size_bytes": size,
                "sha256": _sha256(path, max_hash_bytes) if exists else None,
                "classification_hint": hint,
                "classification_reasons": reasons,
                "content_copied": False,
            }
        )

    dirty_paths = sorted(modified | staged | untracked)
    return {
        "schema_version": 1,
        "snapshot_type": "KODEX_CONTEXT_VAULT_METADATA_ONLY",
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "repository_name": root.name,
        "current_branch": branch,
        "head_commit": head,
        "branches": branch_rows,
        "tracked_file_count": len(tracked),
        "untracked_file_count": len(untracked),
        "dirty_path_count": len(dirty_paths),
        "dirty_paths": dirty_paths,
        "files": files,
        "safety": {
            "absolute_paths_included": False,
            "file_contents_included": False,
            "secrets_intentionally_extracted": False,
            "snapshot_must_be_reviewed_before_promotion": True,
        },
    }


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("root", nargs="?", default=".", help="git workspace root")
    parser.add_argument(
        "--output",
        default="/tmp/kodex-context-vault-snapshot.json",
        help="metadata JSON output; must be outside the repository",
    )
    parser.add_argument("--max-hash-mb", type=int, default=50)
    args = parser.parse_args(argv)

    root = Path(args.root).resolve()
    output = Path(args.output).expanduser().resolve()

    try:
        if output.is_relative_to(root):
            raise ValueError("refusing to write context-vault snapshot inside the source repository")
        if args.max_hash_mb < 0:
            raise ValueError("--max-hash-mb must be non-negative")
        snapshot = create_snapshot(root, max_hash_bytes=args.max_hash_mb * 1024 * 1024)
        output.parent.mkdir(parents=True, exist_ok=True)
        output.write_text(json.dumps(snapshot, indent=2, sort_keys=True), encoding="utf-8")
    except (OSError, ValueError) as exc:
        print(f"context vault snapshot error: {exc}", file=sys.stderr)
        return 1

    print(output)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
