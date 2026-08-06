#!/usr/bin/env python3
"""Safely inventory and optionally extract a KODEX ZIP package.

Default behavior is conservative:
- computes SHA-256 and archive statistics;
- rejects unsafe member paths and suspicious expansion ratios;
- extracts text/source files only;
- does not copy media, fonts or executables unless explicitly allowed;
- writes a machine-readable provenance manifest;
- never modifies Git history or deploys anything.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import mimetypes
import os
import re
import shutil
import stat
import sys
import zipfile
from dataclasses import asdict, dataclass
from datetime import datetime, timezone
from pathlib import Path, PurePosixPath

TEXT_EXTENSIONS = {
    ".astro",
    ".bat",
    ".c",
    ".cc",
    ".conf",
    ".cpp",
    ".css",
    ".csv",
    ".frag",
    ".glsl",
    ".h",
    ".hpp",
    ".html",
    ".ini",
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

BINARY_MEDIA_EXTENSIONS = {
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
EXECUTABLE_EXTENSIONS = {".app", ".bat", ".cmd", ".com", ".dll", ".dmg", ".exe", ".msi"}

SUSPICIOUS_NAMES = {
    ".env",
    "id_rsa",
    "id_ed25519",
    "credentials.json",
    "secrets.json",
}

LICENSE_HINTS = {
    "license",
    "licence",
    "copying",
    "third_party_notices",
    "third-party-notices",
    "provenance",
}

MAX_MEMBER_BYTES_DEFAULT = 25 * 1024 * 1024
MAX_TOTAL_BYTES_DEFAULT = 250 * 1024 * 1024
MAX_EXPANSION_RATIO_DEFAULT = 100.0


@dataclass(frozen=True)
class MemberRecord:
    path: str
    size_bytes: int
    compressed_bytes: int
    sha256: str | None
    category: str
    extracted: bool
    review_flags: list[str]


@dataclass(frozen=True)
class PackageManifest:
    schema_version: int
    package_id: str
    archive_name: str
    archive_sha256: str
    archive_size_bytes: int
    file_count: int
    uncompressed_bytes: int
    inspected_at: str
    extraction_mode: str
    source_environment: str
    rights_status: str
    privacy_status: str
    cultural_status: str
    review_required: bool
    warnings: list[str]
    members: list[MemberRecord]


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")


def sha256_file(path: Path, chunk_size: int = 1024 * 1024) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(chunk_size), b""):
            digest.update(chunk)
    return digest.hexdigest()


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def slugify(value: str) -> str:
    value = value.lower().strip()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-") or "package"


def safe_member_path(name: str) -> PurePosixPath:
    normalized = name.replace("\\", "/")
    path = PurePosixPath(normalized)

    if path.is_absolute():
        raise ValueError(f"absolute archive path: {name}")
    if ".." in path.parts:
        raise ValueError(f"path traversal component: {name}")
    if not path.parts or any(part in {"", "."} for part in path.parts):
        raise ValueError(f"invalid archive path: {name}")

    return path


def categorize(path: PurePosixPath) -> str:
    extension = path.suffix.lower()
    name = path.name.lower()

    if extension in FONT_EXTENSIONS:
        return "font"
    if extension in EXECUTABLE_EXTENSIONS:
        return "executable"
    if extension in BINARY_MEDIA_EXTENSIONS:
        return "media"
    if extension in TEXT_EXTENSIONS or not extension:
        return "text"
    if name.endswith(".map"):
        return "text"
    return "binary"


def review_flags(path: PurePosixPath, category: str, data: bytes | None) -> list[str]:
    flags: list[str] = []
    lower_parts = {part.lower() for part in path.parts}
    lower_name = path.name.lower()

    if lower_name in SUSPICIOUS_NAMES or any(part in {"private", "secrets"} for part in lower_parts):
        flags.append("POTENTIAL_PRIVATE_OR_SECRET")

    if category == "font":
        flags.append("FONT_RIGHTS_REVIEW")
    if category == "media":
        flags.append("MEDIA_RIGHTS_REVIEW")
    if category == "executable":
        flags.append("EXECUTABLE_BLOCKED")

    if any(hint in lower_name for hint in LICENSE_HINTS):
        flags.append("LICENSE_OR_PROVENANCE_FILE")

    if data is not None and category == "text":
        text = data.decode("utf-8", errors="ignore").lower()
        if "api_key" in text or "secret_key" in text or "bearer " in text:
            flags.append("POTENTIAL_SECRET_TEXT")
        if "private key" in text:
            flags.append("POTENTIAL_PRIVATE_KEY_TEXT")
        if "copyright" in text or "third-party" in text or "third party" in text:
            flags.append("RIGHTS_TEXT_PRESENT")

    return sorted(set(flags))


def executable_mode(info: zipfile.ZipInfo) -> bool:
    unix_mode = (info.external_attr >> 16) & 0xFFFF
    return bool(unix_mode and stat.S_ISREG(unix_mode) and (unix_mode & 0o111))


def inspect_package(
    archive: Path,
    destination: Path,
    package_id: str,
    include_media: bool,
    include_binary: bool,
    max_member_bytes: int,
    max_total_bytes: int,
    max_expansion_ratio: float,
    dry_run: bool,
) -> PackageManifest:
    archive_size = archive.stat().st_size
    archive_sha = sha256_file(archive)
    warnings: list[str] = []
    records: list[MemberRecord] = []

    if not zipfile.is_zipfile(archive):
        raise ValueError(f"Not a valid ZIP archive: {archive}")

    with zipfile.ZipFile(archive) as zip_handle:
        infos = [info for info in zip_handle.infolist() if not info.is_dir()]
        total_uncompressed = sum(info.file_size for info in infos)

        if total_uncompressed > max_total_bytes:
            raise ValueError(
                f"Archive expands to {total_uncompressed} bytes, exceeding limit {max_total_bytes}"
            )

        expansion_ratio = total_uncompressed / max(archive_size, 1)
        if expansion_ratio > max_expansion_ratio:
            raise ValueError(
                f"Expansion ratio {expansion_ratio:.1f} exceeds limit {max_expansion_ratio:.1f}"
            )

        source_root = destination / "source"
        if not dry_run:
            source_root.mkdir(parents=True, exist_ok=True)

        for info in infos:
            member_path = safe_member_path(info.filename)
            category = categorize(member_path)

            if info.file_size > max_member_bytes:
                raise ValueError(
                    f"Archive member {info.filename} exceeds per-file limit {max_member_bytes}"
                )

            if executable_mode(info):
                category = "executable"

            extract = category == "text"
            if category == "media" and include_media:
                extract = True
            if category == "binary" and include_binary:
                extract = True
            if category in {"font", "executable"}:
                extract = False

            data: bytes | None = None
            digest: str | None = None

            if extract or category == "text":
                data = zip_handle.read(info)
                digest = sha256_bytes(data)

            flags = review_flags(member_path, category, data)
            if flags:
                warnings.extend(f"{member_path}: {flag}" for flag in flags)

            if extract and not dry_run:
                output_path = source_root.joinpath(*member_path.parts)
                output_path.parent.mkdir(parents=True, exist_ok=True)
                output_path.write_bytes(data if data is not None else zip_handle.read(info))

            records.append(
                MemberRecord(
                    path=str(member_path),
                    size_bytes=info.file_size,
                    compressed_bytes=info.compress_size,
                    sha256=digest,
                    category=category,
                    extracted=extract and not dry_run,
                    review_flags=flags,
                )
            )

    extraction_mode = "dry_run"
    if not dry_run:
        extraction_mode = "text_and_source_only"
        if include_media:
            extraction_mode += "+media"
        if include_binary:
            extraction_mode += "+binary"

    manifest = PackageManifest(
        schema_version=1,
        package_id=package_id,
        archive_name=archive.name,
        archive_sha256=archive_sha,
        archive_size_bytes=archive_size,
        file_count=len(records),
        uncompressed_bytes=sum(record.size_bytes for record in records),
        inspected_at=utc_now(),
        extraction_mode=extraction_mode,
        source_environment=os.environ.get("KODEX_SOURCE_ENVIRONMENT", "local_working_storage"),
        rights_status="REVIEW_REQUIRED",
        privacy_status="REVIEW_REQUIRED",
        cultural_status="REVIEW_REQUIRED",
        review_required=True,
        warnings=sorted(set(warnings)),
        members=records,
    )

    if not dry_run:
        destination.mkdir(parents=True, exist_ok=True)
        manifest_path = destination / "manifest.json"
        manifest_path.write_text(
            json.dumps(asdict(manifest), indent=2, ensure_ascii=False) + "\n",
            encoding="utf-8",
        )

        readme = destination / "README.md"
        if not readme.exists():
            readme.write_text(
                "\n".join(
                    [
                        f"# Recovered package — {archive.name}",
                        "",
                        "Status: `RECOVERED / REVIEW REQUIRED`",
                        "",
                        f"SHA-256: `{archive_sha}`",
                        "",
                        "This directory was produced by `scripts/kodex_package_ingest.py`.",
                        "Only admitted source/text files were extracted by default.",
                        "Rights, privacy, cultural status, runtime behavior and product readiness remain unapproved.",
                        "",
                        "Do not deploy, distribute or sell this recovered package until review is complete.",
                        "",
                    ]
                ),
                encoding="utf-8",
            )

    return manifest


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("archive", type=Path, help="Path to a KODEX ZIP archive")
    parser.add_argument(
        "--destination-root",
        type=Path,
        default=Path("packages/imported"),
        help="Destination root for recovered packages",
    )
    parser.add_argument("--package-id", help="Stable package ID; defaults to archive slug")
    parser.add_argument("--include-media", action="store_true")
    parser.add_argument("--include-binary", action="store_true")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--replace", action="store_true")
    parser.add_argument("--max-member-mb", type=int, default=25)
    parser.add_argument("--max-total-mb", type=int, default=250)
    parser.add_argument("--max-expansion-ratio", type=float, default=100.0)
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    archive = args.archive.expanduser().resolve()

    if not archive.is_file():
        print(f"Archive not found: {archive}", file=sys.stderr)
        return 2

    package_id = args.package_id or slugify(archive.stem)
    destination = args.destination_root / package_id

    if destination.exists() and not args.dry_run:
        if not args.replace:
            print(
                f"Destination exists: {destination}. Use --replace after preserving the prior version.",
                file=sys.stderr,
            )
            return 2
        shutil.rmtree(destination)

    try:
        manifest = inspect_package(
            archive=archive,
            destination=destination,
            package_id=package_id,
            include_media=args.include_media,
            include_binary=args.include_binary,
            max_member_bytes=args.max_member_mb * 1024 * 1024,
            max_total_bytes=args.max_total_mb * 1024 * 1024,
            max_expansion_ratio=args.max_expansion_ratio,
            dry_run=args.dry_run,
        )
    except (OSError, ValueError, zipfile.BadZipFile) as exc:
        print(f"KODEX package ingestion failed: {exc}", file=sys.stderr)
        return 1

    print(json.dumps(asdict(manifest), indent=2, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
