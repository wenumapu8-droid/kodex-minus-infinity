#!/usr/bin/env python3
"""Bridge: ingest KODEX-DECISIONES.md into canonical source/claim registries.

Reads the reviewed decisions log committed in-repo
(research/KODEX-DECISIONES-2026-08-14.md), which is the creator's own dated
decisions — "Solo decisiones de Ocín, en sus palabras, con fecha." It never
edits the source, never invents a decision that isn't textually present, and
never resolves a registered conflict or a pending item on the creator's
behalf: those stay claim class UNKNOWN / publicationStatus REVIEW.

Produces:
  data/bridges/bridge-decisions-v0/sources.json
  data/bridges/bridge-decisions-v0/claims.json
  data/bridges/bridge-decisions-v0/manifest.json

Deterministic: two consecutive runs from a clean state are byte-identical.
This bridge is additive and does not touch bridge-1-v0's output or tests.
"""

from __future__ import annotations

import hashlib
import json
import re
import sys
from pathlib import Path
from typing import Any

REPO_ROOT = Path(__file__).resolve().parent.parent
SOURCE_LOG = REPO_ROOT / "research" / "KODEX-DECISIONES-2026-08-14.md"
OUT_DIR = REPO_ROOT / "data" / "bridges" / "bridge-decisions-v0"

DATE_HEADING = re.compile(r"^(\d{4}-\d{2}-\d{2})\s*·\s*(.+)$")


def stable_digest(obj: Any) -> str:
    return hashlib.sha256(
        json.dumps(obj, sort_keys=True, separators=(",", ":")).encode("utf-8")
    ).hexdigest()


def sha256_bytes(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def split_sections(markdown: str) -> list[tuple[str, str]]:
    """Split on level-2 headings ('## '). Returns (heading_text, body)."""
    parts = re.split(r"^## ", markdown, flags=re.MULTILINE)
    sections: list[tuple[str, str]] = []
    for part in parts[1:]:
        lines = part.split("\n", 1)
        heading = lines[0].strip()
        body = lines[1].strip() if len(lines) > 1 else ""
        sections.append((heading, body))
    return sections


def classify(heading: str) -> str:
    """RESOLVED (dated decision) / CONFLICT (registered, unresolved) /
    PENDING (explicitly waiting on a decision).

    Date alone does not mean resolved: a dated section can still say "sin
    decidir" in its own heading — that stays PENDING even though it carries
    a date, because the document's own words say it's open, not settled.
    Checked on the heading only (not the body) — this bridge parses
    structure, it does not read prose to infer meaning.
    """
    upper_heading = heading.upper()
    if "CONFLICTO REGISTRADO" in upper_heading:
        return "CONFLICT"
    if "SIGUE ESPERANDO" in upper_heading or "SIN DECIDIR" in upper_heading:
        return "PENDING"
    if DATE_HEADING.match(heading):
        return "RESOLVED"
    return "PENDING"


def build_source() -> dict[str, Any]:
    return {
        "id": "SRC-KODEX-DECISIONES-2026-08-14",
        "title": "KODEX-DECISIONES.md — decisiones del creador",
        "creator": "Nicolás Ortega / Ocín",
        "sourceClass": "DOCUMENT",
        "location": f"repo:kodex-work/KODEX-DECISIONES.md (mirrored {SOURCE_LOG.name})",
        "checksum": None,
        "repository": "wenumapu8-droid/wenu-frontend",
        "branch": "wip/kimi-u10-commons-cabecera",
        "path": "KODEX-DECISIONES.md",
        "rightsStatus": "CLEAR",
        "privacyStatus": "PUBLIC",
        "culturalStatus": "STANDARD",
        "attribution": "Nicolás Ortega / Ocín",
        "notes": [
            "epistemic: CANONICAL for RESOLVED sections, NEEDS_CONFIRMATION for CONFLICT/PENDING",
            "truth ledger separates VERIFIED (measured) from CANONICAL (declared) — this whole file is the CANONICAL log",
        ],
    }


def build_claims(sections: list[tuple[str, str]]) -> list[dict[str, Any]]:
    claims: list[dict[str, Any]] = []
    idx = 0
    for heading, body in sections:
        idx += 1
        kind = classify(heading)
        m = DATE_HEADING.match(heading)
        title = m.group(2) if m else heading
        date = m.group(1) if m else None

        if kind == "RESOLVED":
            claim_class = "TESTIMONY"
            publication = "ADMITTED"
        else:
            claim_class = "UNKNOWN"
            publication = "REVIEW"

        claims.append(
            {
                "id": f"CLM-DECISIONES-{idx:03d}",
                "class": claim_class,
                "statement": f"{title} — {kind.lower()}, recorded verbatim from KODEX-DECISIONES.md; not paraphrased or resolved by this bridge.",
                "sourceIds": ["SRC-KODEX-DECISIONES-2026-08-14"],
                "variables": [],
                "unit": None,
                "denominator": None,
                "timeScope": date,
                "geographyScope": None,
                "populationScope": None,
                "method": "Direct extraction of a level-2 section from the committed decisions log; no interpretation added.",
                "formula": None,
                "uncertainty": "CONFLICT and PENDING sections are explicitly unresolved — this bridge does not decide them." if kind != "RESOLVED" else None,
                "contradictions": [],
                "limitations": [],
                "publicationStatus": publication,
                "attribution": "Nicolás Ortega / Ocín",
            }
        )
    return claims


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
    if not SOURCE_LOG.exists():
        print(f"bridge error: decisions log not found: {SOURCE_LOG}", file=sys.stderr)
        return 1

    markdown = SOURCE_LOG.read_text(encoding="utf-8")
    sections = split_sections(markdown)

    if not sections:
        print("bridge error: no level-2 sections found in decisions log", file=sys.stderr)
        return 1

    source = build_source()
    claims = build_claims(sections)
    claims.sort(key=lambda c: c["id"])

    counts = {"RESOLVED": 0, "CONFLICT": 0, "PENDING": 0}
    for heading, _ in sections:
        counts[classify(heading)] += 1

    anomalies: list[str] = []
    anomalies += validate_schemas([source], claims)
    seen_ids: set[str] = set()
    for c in claims:
        if c["id"] in seen_ids:
            anomalies.append(f"DUPLICATE_ID claim {c['id']}")
        seen_ids.add(c["id"])

    manifest = {
        "bridge": "bridge-decisions-v0",
        "generator": "scripts/bridge_decisions_v1.py",
        "source_log": str(SOURCE_LOG.relative_to(REPO_ROOT)),
        "counts": {
            "sections": len(sections),
            "resolved": counts["RESOLVED"],
            "conflict": counts["CONFLICT"],
            "pending": counts["PENDING"],
            "sources": 1,
            "claims": len(claims),
        },
        "anomalies": sorted(set(anomalies)),
        "content_digest": {
            "sources": stable_digest([source]),
            "claims": stable_digest(claims),
        },
    }
    manifest["digest"] = sha256_bytes(
        json.dumps(manifest["content_digest"], sort_keys=True, separators=(",", ":"))
    )

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    (OUT_DIR / "sources.json").write_text(json.dumps([source], indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    (OUT_DIR / "claims.json").write_text(json.dumps(claims, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    (OUT_DIR / "manifest.json").write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    print(json.dumps(manifest, indent=2, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
