#!/usr/bin/env python3
"""Create a provenance-oriented inventory of one or more Git refs.

The script is read-only. It uses Git plumbing commands to record repository,
ref, path, blob SHA, size, extension and risk flags without checking out or
modifying historical branches.
"""

from __future__ import annotations

import argparse
import json
import re
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path, PurePosixPath

TEXT_EXTENSIONS = {
    ".astro",
    ".css",
    ".csv",
    ".frag",
    ".glsl",
    ".html",
    ".js",
    ".json",
    ".jsx",
    ".md",
    ".mjs",
    ".py",
    ".sh",
    ".svg",
    ".toml",
    ".ts",
    ".tsx",
    ".txt",
    ".vert",
    ".xml",
    ".yaml",
    ".yml",
}

MEDIA_EXTENSIONS = {
    ".apng",
    ".avi",
    ".gif",
    ".jpeg",
    ".jpg",
    ".mov",
    ".mp3",
    ".mp4",
    ".ogg",
    ".png",
    ".wav",
    ".webm",
    ".webp",
}

FONT_EXTENSIONS = {".eot", ".otf", ".ttf", ".woff", ".woff2"}
ARCHIVE_EXTENSIONS = {".7z", ".rar", ".tar", ".tgz", ".zip"}

KODEX_HINTS = {
    "kodex",
    "shader",
    "glsl",
    "webgl",
    "observe",
    "archive",
    "portal",
    "threshold",
    "cosmology",
    "machine",
    "return",
    "signal",
    "spatial",
    "ripple",
    "mirror",
    "corridor",
    "wrinkle",
    "glyph",
}

PRIVATE_HINTS = {
    ".env",
    "credential",
    "secret",
    "private",
    "token",
    "conversation-export",
    "raw-conversation",
}


def run_git(repo: Path, *args: str, text: bool = True) -> str | bytes:
    command = ["git", "-C", str(repo), *args]
    completed = subprocess.run(
        command,
        check=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=text,
    )
    return completed.stdout


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")


def category(path: PurePosixPath) -> str:
    ext = path.suffix.lower()
    if ext in FONT_EXTENSIONS:
        return "font"
    if ext in MEDIA_EXTENSIONS:
        return "media"
    if ext in ARCHIVE_EXTENSIONS:
        return "archive"
    if ext in TEXT_EXTENSIONS or not ext:
        return "text"
    return "binary"


def flags_for(path: PurePosixPath, file_category: str) -> list[str]:
    lower = str(path).lower()
    flags: list[str] = []

    if any(hint in lower for hint in KODEX_HINTS):
        flags.append("KODEX_CANDIDATE")
    if any(hint in lower for hint in PRIVATE_HINTS):
        flags.append("PRIVACY_OR_SECRET_REVIEW")
    if file_category == "font":
        flags.append("FONT_RIGHTS_REVIEW")
    if file_category == "media":
        flags.append("MEDIA_RIGHTS_REVIEW")
    if file_category == "archive":
        flags.append("ARCHIVE_REQUIRES_CONTENT_INSPECTION")

    if re.search(r"(^|/)(node_modules|dist|build|coverage|\.astro)(/|$)", lower):
        flags.append("GENERATED_OR_BUILD_OUTPUT")

    return sorted(set(flags))


def resolve_repo_name(repo: Path) -> str:
    try:
        remote = str(run_git(repo, "remote", "get-url", "origin")).strip()
    except subprocess.CalledProcessError:
        return repo.name

    match = re.search(r"[:/]([^/:]+/[^/]+?)(?:\.git)?$", remote)
    return match.group(1) if match else remote


def inventory_ref(repo: Path, ref: str) -> dict:
    resolved = str(run_git(repo, "rev-parse", ref)).strip()
    raw = run_git(repo, "ls-tree", "-r", "-l", "-z", resolved, text=False)
    assert isinstance(raw, bytes)

    records = []
    for entry in raw.split(b"\0"):
        if not entry:
            continue
        metadata, path_bytes = entry.split(b"\t", 1)
        mode, object_type, sha, size = metadata.decode("utf-8").split(maxsplit=3)
        path_text = path_bytes.decode("utf-8", errors="surrogateescape")
        path = PurePosixPath(path_text)
        file_category = category(path)

        records.append(
            {
                "path": path_text,
                "mode": mode,
                "object_type": object_type,
                "blob_sha": sha,
                "size_bytes": None if size == "-" else int(size),
                "extension": path.suffix.lower(),
                "category": file_category,
                "flags": flags_for(path, file_category),
            }
        )

    return {
        "ref": ref,
        "commit_sha": resolved,
        "file_count": len(records),
        "files": records,
    }


def summarize(inventory: dict) -> dict:
    unique: dict[tuple[str, str], dict] = {}
    for ref_record in inventory["refs"]:
        for record in ref_record["files"]:
            key = (record["path"], record["blob_sha"])
            item = unique.setdefault(
                key,
                {
                    **record,
                    "refs": [],
                },
            )
            item["refs"].append(ref_record["ref"])

    candidates = [
        item for item in unique.values() if "KODEX_CANDIDATE" in item["flags"]
    ]
    privacy_review = [
        item
        for item in unique.values()
        if "PRIVACY_OR_SECRET_REVIEW" in item["flags"]
    ]
    rights_review = [
        item
        for item in unique.values()
        if any(flag.endswith("RIGHTS_REVIEW") for flag in item["flags"])
    ]

    return {
        "unique_path_blob_pairs": len(unique),
        "kodex_candidates": len(candidates),
        "privacy_or_secret_review": len(privacy_review),
        "rights_review": len(rights_review),
        "candidate_paths": [item["path"] for item in candidates],
    }


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("repo", type=Path, help="Path to a local Git repository")
    parser.add_argument(
        "--ref",
        dest="refs",
        action="append",
        help="Git ref to inspect; repeat for multiple refs. Defaults to HEAD.",
    )
    parser.add_argument(
        "--output",
        type=Path,
        default=Path("inventory.json"),
        help="Output JSON path",
    )
    parser.add_argument(
        "--summary-only",
        action="store_true",
        help="Omit the complete file list from output",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    repo = args.repo.expanduser().resolve()

    if not (repo / ".git").exists():
        print(f"Not a Git worktree: {repo}", file=sys.stderr)
        return 2

    refs = args.refs or ["HEAD"]

    try:
        inventory = {
            "schema_version": 1,
            "repository": resolve_repo_name(repo),
            "local_path": str(repo),
            "inspected_at": utc_now(),
            "read_only": True,
            "refs": [inventory_ref(repo, ref) for ref in refs],
        }
    except subprocess.CalledProcessError as exc:
        stderr = exc.stderr if isinstance(exc.stderr, str) else exc.stderr.decode()
        print(f"Git inventory failed: {stderr.strip()}", file=sys.stderr)
        return 1

    inventory["summary"] = summarize(inventory)

    if args.summary_only:
        inventory["refs"] = [
            {
                "ref": item["ref"],
                "commit_sha": item["commit_sha"],
                "file_count": item["file_count"],
            }
            for item in inventory["refs"]
        ]

    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(
        json.dumps(inventory, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )

    print(json.dumps(inventory["summary"], indent=2, ensure_ascii=False))
    print(f"Inventory written to {args.output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
