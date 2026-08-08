from __future__ import annotations

import hashlib
import json
import subprocess
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BRIDGE_SCRIPT = ROOT / "scripts/bridge_atlas_corpus_v1.py"
OUT_DIR = ROOT / "data/bridges/bridge-1-v0"


def sha256_file(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


class BridgeAtlasCorpusTests(unittest.TestCase):
    def run_bridge(self) -> subprocess.CompletedProcess[str]:
        return subprocess.run(
            ["python3", str(BRIDGE_SCRIPT)],
            cwd=ROOT,
            capture_output=True,
            text=True,
        )

    def test_counts_reconcile_with_parsed_inputs(self) -> None:
        result = self.run_bridge()
        self.assertEqual(result.returncode, 0, result.stderr)
        manifest = json.loads((OUT_DIR / "manifest.json").read_text(encoding="utf-8"))
        self.assertEqual(manifest["counts"]["source_rows_visual"], 15)
        self.assertEqual(manifest["counts"]["source_rows_research"], 10)
        self.assertEqual(manifest["counts"]["sources"], 25)
        self.assertEqual(len(json.loads((OUT_DIR / "sources.json").read_text(encoding="utf-8"))), 25)
        self.assertEqual(len(json.loads((OUT_DIR / "claims.json").read_text(encoding="utf-8"))), manifest["counts"]["claims"])

    def test_no_anomalies(self) -> None:
        result = self.run_bridge()
        self.assertEqual(result.returncode, 0, result.stderr)
        manifest = json.loads((OUT_DIR / "manifest.json").read_text(encoding="utf-8"))
        self.assertEqual(manifest["anomalies"], [])

    def test_two_consecutive_runs_are_deterministic(self) -> None:
        files = ["sources.json", "claims.json", "nodes.json", "edges.json"]
        self.run_bridge()
        run1 = {f: sha256_file(OUT_DIR / f) for f in files}
        self.run_bridge()
        run2 = {f: sha256_file(OUT_DIR / f) for f in files}
        self.assertEqual(run1, run2)

    def test_manifest_digest_matches_content(self) -> None:
        manifest = json.loads((OUT_DIR / "manifest.json").read_text(encoding="utf-8"))
        for kind in ["sources", "claims", "nodes", "edges"]:
            data = json.loads((OUT_DIR / f"{kind}.json").read_text(encoding="utf-8"))
            digest = hashlib.sha256(
                json.dumps(data, sort_keys=True, separators=(",", ":")).encode("utf-8")
            ).hexdigest()
            self.assertEqual(manifest["content_digest"][kind], digest, kind)

    def test_known_coordinates_only_a_m_y(self) -> None:
        nodes = json.loads((OUT_DIR / "nodes.json").read_text(encoding="utf-8"))
        for node in nodes:
            assignment = node["coordinateAssignment"]
            if assignment is not None:
                self.assertIn(assignment, {"A", "M", "Y"}, node["id"])

    def test_ocinn_rows_carry_restrictions(self) -> None:
        sources = json.loads((OUT_DIR / "sources.json").read_text(encoding="utf-8"))
        ocin = [s for s in sources if "OCIN" in s["id"]]
        self.assertEqual(len(ocin), 10)
        for source in ocin:
            self.assertEqual(source["rightsStatus"], "UNKNOWN")
            self.assertEqual(source["culturalStatus"], "REVIEW_REQUIRED")
            self.assertEqual(source["privacyStatus"], "RESTRICTED")

    def test_kdx_rows_are_public_and_reference_only(self) -> None:
        sources = json.loads((OUT_DIR / "sources.json").read_text(encoding="utf-8"))
        kdx = [s for s in sources if "KDX-CORPUS" in s["id"]]
        self.assertEqual(len(kdx), 15)
        for source in kdx:
            self.assertEqual(source["privacyStatus"], "PUBLIC")
            self.assertEqual(source["rightsStatus"], "REFERENCE_ONLY")


if __name__ == "__main__":
    unittest.main()
