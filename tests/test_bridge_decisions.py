from __future__ import annotations

import hashlib
import json
import subprocess
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BRIDGE_SCRIPT = ROOT / "scripts/bridge_decisions_v1.py"
OUT_DIR = ROOT / "data/bridges/bridge-decisions-v0"


def sha256_file(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


class BridgeDecisionsTests(unittest.TestCase):
    def run_bridge(self) -> subprocess.CompletedProcess[str]:
        return subprocess.run(
            ["python3", str(BRIDGE_SCRIPT)],
            cwd=ROOT,
            capture_output=True,
            text=True,
        )

    def test_runs_clean_with_no_anomalies(self) -> None:
        result = self.run_bridge()
        self.assertEqual(result.returncode, 0, result.stderr)
        manifest = json.loads((OUT_DIR / "manifest.json").read_text(encoding="utf-8"))
        self.assertEqual(manifest["anomalies"], [])

    def test_two_consecutive_runs_are_deterministic(self) -> None:
        files = ["sources.json", "claims.json", "manifest.json"]
        self.run_bridge()
        run1 = {f: sha256_file(OUT_DIR / f) for f in files}
        self.run_bridge()
        run2 = {f: sha256_file(OUT_DIR / f) for f in files}
        self.assertEqual(run1, run2)

    def test_conflict_and_pending_are_never_marked_resolved(self) -> None:
        """The bridge must not silently resolve what the creator left open —
        a registered conflict or a pending item must stay claim class UNKNOWN
        with publicationStatus REVIEW, never TESTIMONY/ADMITTED."""
        self.run_bridge()
        manifest = json.loads((OUT_DIR / "manifest.json").read_text(encoding="utf-8"))
        claims = json.loads((OUT_DIR / "claims.json").read_text(encoding="utf-8"))
        resolved_count = manifest["counts"]["resolved"]
        admitted = [c for c in claims if c["publicationStatus"] == "ADMITTED"]
        self.assertEqual(len(admitted), resolved_count)
        for c in admitted:
            self.assertEqual(c["class"], "TESTIMONY")

    def test_dated_heading_with_sin_decidir_stays_pending(self) -> None:
        """Regression: a section can carry a date and still be explicitly
        unresolved ('sin decidir' in its own heading) — date alone must not
        make the bridge call it a decision."""
        self.run_bridge()
        claims = json.loads((OUT_DIR / "claims.json").read_text(encoding="utf-8"))
        pending_statements = [c["statement"] for c in claims if c["publicationStatus"] == "REVIEW"]
        self.assertTrue(
            any("sin decidir" in s.lower() or "cursos" in s.lower() for s in pending_statements),
            "expected the 'Los cursos, sin decidir' section to be classified as pending, not resolved",
        )

    def test_manifest_digest_matches_content(self) -> None:
        self.run_bridge()
        manifest = json.loads((OUT_DIR / "manifest.json").read_text(encoding="utf-8"))
        for kind in ["sources", "claims"]:
            data = json.loads((OUT_DIR / f"{kind}.json").read_text(encoding="utf-8"))
            digest = hashlib.sha256(
                json.dumps(data, sort_keys=True, separators=(",", ":")).encode("utf-8")
            ).hexdigest()
            self.assertEqual(manifest["content_digest"][kind], digest, kind)


if __name__ == "__main__":
    unittest.main()
