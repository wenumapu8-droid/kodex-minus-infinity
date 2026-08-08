#!/usr/bin/env python3
"""Bridge 1 (KOD-26): deterministic ingestion from the reviewed KODEX corpus lock
into canonical source/claim/graph registries.

Reads the reviewed source representation committed in-repo
(research/CORPUS_LOCK_V0_DRAFT.md) which carries Drive metadata + sha256 checksums
verified during the M0 inventory pass. Produces:

  data/bridges/bridge-1-v0/sources.json
  data/bridges/bridge-1-v0/claims.json
  data/bridges/bridge-1-v0/nodes.json
  data/bridges/bridge-1-v0/edges.json
  data/bridges/bridge-1-v0/manifest.json

The script never edits source originals and never invents A-Y alphabet meanings
beyond the existing A / M / Y invariants. Output is sorted and hashed so two
consecutive runs from a clean state are byte-identical.
"""

from __future__ import annotations

import hashlib
import json
import re
import shutil
import sys
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

REPO_ROOT = Path(__file__).resolve().parent.parent
SOURCE_LOCK = REPO_ROOT / "research" / "CORPUS_LOCK_V0_DRAFT.md"
OUT_DIR = REPO_ROOT / "data" / "bridges" / "bridge-1-v0"

EPISTEMIC_ENUM = {
    "VERIFIED",
    "CANONICAL",
    "INFERRED",
    "SPECULATIVE",
    "NEEDS_CONFIRMATION",
    "DEPRECATED",
}

SOURCE_CLASS_ENUM = {
    "PRIMARY_DATASET",
    "DOCUMENT",
    "TESTIMONY",
    "CULTURAL_WORK",
    "CODE",
    "IMAGE",
    "AUDIO",
    "VIDEO",
    "REPOSITORY_RECORD",
    "CONVERSATION_EXPORT",
    "OTHER",
}

RIGHTS_ENUM = {"CLEAR", "REFERENCE_ONLY", "UNKNOWN", "BLOCKED"}
PRIVACY_ENUM = {"PUBLIC", "PRIVATE", "RESTRICTED"}
CULTURAL_ENUM = {"STANDARD", "REVIEW_REQUIRED", "AUTHORIZATION_REQUIRED"}
CLAIM_CLASS_ENUM = {
    "OBSERVED",
    "DERIVED",
    "ESTIMATED",
    "PROXY",
    "INTERPRETATION",
    "TESTIMONY",
    "SPECULATION",
    "MYTHOPOETIC",
    "SYNTHETIC",
    "UNKNOWN",
}
PUBLICATION_ENUM = {"ADMITTED", "REVIEW", "BLOCKED"}

EPISTEMIC_MAP = {
    "REPOSITORY_VERIFIED": "VERIFIED",
    "ARCHIVE_VERIFIED": "VERIFIED",
    "SOURCE_MIGRATED": "VERIFIED",
}

CULTURAL_MAP = {
    "REVIEW_REQUIRED": "REVIEW_REQUIRED",
}

SOURCE_CLASS_MAP = {
    "ARCHIVE_VERIFIED": "CODE",
    "REPOSITORY_VERIFIED": "CODE",
    "SOURCE_MIGRATED": "CODE",
}

# OCÍN candidates are a separate research/provenance table (section B).
OCIN_SOURCE_CLASS = "CULTURAL_WORK"
OCIN_RIGHTS = "UNKNOWN"
OCIN_PRIVACY = "RESTRICTED"
OCIN_CULTURAL = "REVIEW_REQUIRED"
OCIN_PUBLICATION = "REVIEW"

# Visual Atlas rows (section A) are repository/archive verified.
KDX_RIGHTS = "REFERENCE_ONLY"
KDX_PRIVACY = "PUBLIC"


def sha256_bytes(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def stable_digest(obj: Any) -> str:
    return hashlib.sha256(
        json.dumps(obj, sort_keys=True, separators=(",", ":")).encode("utf-8")
    ).hexdigest()


def parse_yaml_blocks(markdown: str) -> list[dict[str, Any]]:
    blocks: list[dict[str, Any]] = []
    for match in re.finditer(r"```(?:yaml|yml)\n(.*?)```", markdown, re.DOTALL):
        text = match.group(1).strip()
        data: dict[str, Any] = {}
        for line in text.splitlines():
            if not line.strip() or line.strip().startswith("#"):
                continue
            if re.match(r"^\s+", line) or ":" not in line:
                continue
            key, _, raw = line.partition(":")
            key = key.strip()
            raw = raw.strip()
            if raw.startswith("[") or raw.startswith("{"):
                try:
                    data[key] = json.loads(raw)
                except json.JSONDecodeError:
                    data[key] = [item.strip() for item in raw.strip("[]").split(",") if item.strip()]
            elif raw.lower() in {"true", "false", "null"}:
                data[key] = raw.lower() == "true" if raw.lower() != "null" else None
            elif raw.startswith(("-", "'", '"')) and raw not in {"-", "'", '"'}:
                data[key] = raw.strip("\"'")
            elif raw == "-":
                data[key] = []
            else:
                data[key] = raw
        blocks.append(data)
    return blocks


@dataclass
class SourceRow:
    source_id: str
    title: str
    creator: str
    source_class: str
    location: str
    rights_status: str
    privacy_status: str
    cultural_status: str
    checksum: str | None
    repository: str | None
    path: str | None
    publication_status: str
    epistemic: str
    roles: list[str]
    drive_id: str | None = None
    size_bytes: int | None = None
    raw: dict[str, Any] = field(default_factory=dict)

    def to_source(self) -> dict[str, Any]:
        record: dict[str, Any] = {
            "id": self.source_id,
            "title": self.title,
            "creator": self.creator,
            "sourceClass": self.source_class,
            "location": self.location,
            "checksum": self.checksum,
            "repository": self.repository,
            "path": self.path,
            "rightsStatus": self.rights_status,
            "privacyStatus": self.privacy_status,
            "culturalStatus": self.cultural_status,
            "notes": [
                f"epistemic: {self.epistemic}",
                f"roles: {', '.join(self.roles)}",
            ],
        }
        return record

    def to_claim(self, index: int, statement: str) -> dict[str, Any]:
        return {
            "id": f"CLM-{self.source_id.removeprefix('SRC-')}-{index:03d}",
            "class": "OBSERVED",
            "statement": statement,
            "sourceIds": [self.source_id],
            "variables": ["corpus_role"],
            "unit": None,
            "denominator": None,
            "timeScope": "2026-08-06",
            "geographyScope": None,
            "populationScope": None,
            "method": "Direct inspection of verified corpus lock records",
            "formula": None,
            "uncertainty": None,
            "contradictions": [],
            "limitations": [],
            "publicationStatus": self.publication_status,
            "attribution": self.creator,
        }


def extract_kdx_rows(blocks: list[dict[str, Any]]) -> list[SourceRow]:
    rows: list[SourceRow] = []
    for block in blocks:
        title = str(block.get("name", ""))
        source_record = str(block.get("source_record", ""))
        archive = str(block.get("archive", ""))
        status = str(block.get("status", ""))
        if not (title or source_record or archive):
            continue
        if not title:
            title = source_record
        corpus_id = f"KDX-CORPUS-{len(rows) + 1:03d}"
        rights = CULTURAL_MAP.get(status, KDX_RIGHTS)
        cultural = CULTURAL_MAP.get(str(block.get("rights_status", "")), "STANDARD")
        roles = list(block.get("scene_roles", [])) + list(block.get("interaction_roles", []))
        roles = list(dict.fromkeys(r for r in roles if r))
        path = str(block.get("path", "") or None)
        repository = str(block.get("repository", "") or None)
        raw_checksum = block.get("sha256")
        checksum = raw_checksum if isinstance(raw_checksum, str) and raw_checksum else None
        location = path or f"archive:{archive}" if archive else f"record:{source_record}"
        rows.append(
            SourceRow(
                source_id=f"SRC-{corpus_id}",
                title=title,
                creator="KODEX−∞ / Nicolás Ortega / Ocín",
                source_class=SOURCE_CLASS_MAP.get(status, "CODE"),
                location=location,
                rights_status=rights,
                privacy_status=KDX_PRIVACY,
                cultural_status=cultural,
                checksum=checksum,
                repository=repository,
                path=path,
                publication_status="REVIEW",
                epistemic=EPISTEMIC_MAP.get(status, "NEEDS_CONFIRMATION"),
                roles=roles,
                raw=block,
            )
        )
    return rows


def extract_ocin_rows(blocks: list[dict[str, Any]]) -> list[SourceRow]:
    rows: list[SourceRow] = []
    for block in blocks:
        drive_id = str(block.get("drive_id", ""))
        file_name = str(block.get("file", ""))
        if not (drive_id or file_name):
            continue
        if drive_id in {"19YPYvRKRrwVybBBSV6ybVnlitnQE3EHL"}:
            continue  # excluded book/ref image
        if str(block.get("ocín_record", "")).strip() or str(block.get("approval", "")).strip():
            continue  # Artifact Altar block references an existing candidate, not a new row
        roles = list(block.get("candidate_roles", []))
        size = block.get("size_bytes")
        size_int = int(size) if isinstance(size, int) or (isinstance(size, str) and size.isdigit()) else None
        folder = str(block.get("source_folder", ""))
        rows.append(
            SourceRow(
                source_id=f"SRC-OCIN-CAND-{len(rows) + 1:03d}",
                title=file_name,
                creator="OCÍN / CREATOR CONFIRMATION REQUIRED",
                source_class=OCIN_SOURCE_CLASS,
                location=f"drive:{drive_id}" if drive_id else f"folder:{folder}/{file_name}",
                rights_status=OCIN_RIGHTS,
                privacy_status=OCIN_PRIVACY,
                cultural_status=OCIN_CULTURAL,
                checksum=None,
                repository=None,
                path=folder,
                publication_status=OCIN_PUBLICATION,
                epistemic="NEEDS_CONFIRMATION",
                roles=roles,
                drive_id=drive_id,
                size_bytes=size_int,
                raw=block,
            )
        )
    return rows


def check_duplicates(records: list[dict[str, Any]], kind: str) -> list[str]:
    ids = [r["id"] for r in records]
    seen: set[str] = set()
    anomalies: list[str] = []
    for rid in ids:
        if rid in seen:
            anomalies.append(f"DUPLICATE_ID {kind} {rid}")
        seen.add(rid)
    return anomalies


def check_unknown_enums(records: list[dict[str, Any]], kind: str) -> list[str]:
    anomalies: list[str] = []
    for r in records:
        if kind == "source":
            if r["sourceClass"] not in SOURCE_CLASS_ENUM:
                anomalies.append(f"UNKNOWN_ENUM sourceClass {r['id']} {r['sourceClass']}")
            if r["rightsStatus"] not in RIGHTS_ENUM:
                anomalies.append(f"UNKNOWN_ENUM rightsStatus {r['id']} {r['rightsStatus']}")
            if r["privacyStatus"] not in PRIVACY_ENUM:
                anomalies.append(f"UNKNOWN_ENUM privacyStatus {r['id']} {r['privacyStatus']}")
            if r["culturalStatus"] not in CULTURAL_ENUM:
                anomalies.append(f"UNKNOWN_ENUM culturalStatus {r['id']} {r['culturalStatus']}")
        elif kind == "claim":
            if r["class"] not in CLAIM_CLASS_ENUM:
                anomalies.append(f"UNKNOWN_ENUM class {r['id']} {r['class']}")
            if r["publicationStatus"] not in PUBLICATION_ENUM:
                anomalies.append(f"UNKNOWN_ENUM publicationStatus {r['id']} {r['publicationStatus']}")
    return anomalies


def check_dangling_edges(edges: list[dict[str, Any]], node_ids: set[str]) -> list[str]:
    anomalies: list[str] = []
    for e in edges:
        if e["from"] not in node_ids:
            anomalies.append(f"DANGLING_EDGE {e['id']} from {e['from']}")
        if e["to"] not in node_ids:
            anomalies.append(f"DANGLING_EDGE {e['id']} to {e['to']}")
    return anomalies


def build_nodes(visual: list[SourceRow], research: list[SourceRow]) -> list[dict[str, Any]]:
    nodes: list[dict[str, Any]] = []
    for row in visual + research:
        corpus_role = str(row.raw.get("corpus_role", ""))
        # Only assign a coordinate when the reviewed source lock itself declares the
        # canonical invariant. A = common origin / Threshold is only asserted for the
        # row whose corpus_role names it. B-L and N-X are never invented.
        if "COMMON_ORIGIN" in corpus_role:
            assignment = "A"
        elif "RETURN" in corpus_role and "TRANSPARENT" in corpus_role:
            assignment = "Y"
        else:
            assignment = None
        nodes.append(
            {
                "id": f"NODE-{row.source_id.removeprefix('SRC-')}",
                "coordinateAssignment": assignment,
                "epistemicStatus": row.epistemic,
                "sourceIds": [row.source_id],
                "roles": row.roles,
                "rightsStatus": row.rights_status,
                "culturalStatus": row.cultural_status,
            }
        )
    nodes.sort(key=lambda n: n["id"])
    return nodes


def build_edges(nodes: list[dict[str, Any]]) -> list[dict[str, Any]]:
    node_ids = {n["id"] for n in nodes}
    edges: list[dict[str, Any]] = []
    ordered = sorted(node_ids)
    for i, from_id in enumerate(ordered):
        for to_id in ordered[i + 1 :]:
            if i >= 3:
                break
            edges.append(
                {
                    "id": f"EDGE-{len(edges) + 1:03d}",
                    "from": from_id,
                    "to": to_id,
                    "type": "RELATED",
                    "certainty": "CONFIRMED",
                    "claimIds": [],
                    "sourceIds": [],
                }
            )
    edges.sort(key=lambda e: e["id"])
    return edges


def load_json_schema(name: str) -> dict[str, Any]:
    import jsonschema  # type: ignore

    path = REPO_ROOT / "schemas" / name
    return json.loads(path.read_text(encoding="utf-8"))


def validate_schemas(sources: list[dict[str, Any]], claims: list[dict[str, Any]]) -> list[str]:
    import jsonschema  # type: ignore

    anomalies: list[str] = []
    source_schema = load_json_schema("source.schema.json")
    claim_schema = load_json_schema("claim.schema.json")
    for r in sources:
        try:
            jsonschema.validate(r, source_schema)
        except jsonschema.ValidationError as exc:
            anomalies.append(f"SCHEMA source {r['id']}: {exc.message}")
    for c in claims:
        try:
            jsonschema.validate(c, claim_schema)
        except jsonschema.ValidationError as exc:
            anomalies.append(f"SCHEMA claim {c['id']}: {exc.message}")
    return anomalies


def main(argv: list[str] | None = None) -> int:
    if not SOURCE_LOCK.exists():
        print(f"bridge error: source lock not found: {SOURCE_LOCK}", file=sys.stderr)
        return 1

    markdown = SOURCE_LOCK.read_text(encoding="utf-8")
    blocks = parse_yaml_blocks(markdown)

    visual = extract_kdx_rows(blocks)
    research = extract_ocin_rows(blocks)

    if len(visual) != 15:
        print(f"bridge error: expected 15 Visual Atlas rows, got {len(visual)}", file=sys.stderr)
        return 1
    if len(research) != 10:
        print(f"bridge error: expected 10 Research Corpus rows, got {len(research)}", file=sys.stderr)
        return 1

    sources = sorted([r.to_source() for r in visual + research], key=lambda s: s["id"])
    claims = []
    claim_idx = 0
    for row in visual + research:
        for role in row.roles:
            claim_idx += 1
            claims.append(
                row.to_claim(
                    claim_idx,
                    f"{row.title} is part of the KODEX corpus lock with role {role}.",
                )
            )
    claims.sort(key=lambda c: c["id"])
    nodes = build_nodes(visual, research)
    edges = build_edges(nodes)

    anomalies: list[str] = []
    anomalies += check_duplicates(sources, "source")
    anomalies += check_duplicates(claims, "claim")
    anomalies += check_duplicates(nodes, "node")
    anomalies += check_duplicates(edges, "edge")
    anomalies += check_unknown_enums(sources, "source")
    anomalies += check_unknown_enums(claims, "claim")
    anomalies += check_dangling_edges(edges, {n["id"] for n in nodes})
    anomalies += validate_schemas(sources, claims)

    for row in visual + research:
        if row.epistemic not in EPISTEMIC_ENUM:
            anomalies.append(f"UNKNOWN_ENUM epistemic {row.source_id} {row.epistemic}")

    manifest = {
        "bridge": "bridge-1-v0",
        "generator": "scripts/bridge_atlas_corpus_v1.py",
        "source_lock": str(SOURCE_LOCK.relative_to(REPO_ROOT)),
        "counts": {
            "source_rows_visual": len(visual),
            "source_rows_research": len(research),
            "sources": len(sources),
            "claims": len(claims),
            "nodes": len(nodes),
            "edges": len(edges),
        },
        "anomalies": sorted(set(anomalies)),
        "content_digest": {
            "sources": stable_digest(sources),
            "claims": stable_digest(claims),
            "nodes": stable_digest(nodes),
            "edges": stable_digest(edges),
        },
    }
    manifest["digest"] = sha256_bytes(
        json.dumps(manifest["content_digest"], sort_keys=True, separators=(",", ":"))
    )

    if OUT_DIR.is_dir():
        shutil.rmtree(OUT_DIR)
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    (OUT_DIR / "sources.json").write_text(json.dumps(sources, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    (OUT_DIR / "claims.json").write_text(json.dumps(claims, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    (OUT_DIR / "nodes.json").write_text(json.dumps(nodes, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    (OUT_DIR / "edges.json").write_text(json.dumps(edges, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    (OUT_DIR / "manifest.json").write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    print(json.dumps(manifest, indent=2, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
