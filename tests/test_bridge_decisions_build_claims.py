from __future__ import annotations

import hashlib
import io
import json
import tempfile
import unittest
from contextlib import redirect_stdout
from pathlib import Path
from unittest import mock

import scripts.bridge_decisions_v1 as bridge


class BuildClaimsTests(unittest.TestCase):
    """Direct unit coverage for bridge_decisions_v1.build_claims().

    tests/test_bridge_decisions.py only exercises it indirectly through the
    real, already-committed KODEX-DECISIONES-2026-08-14.md. That confirms
    the aggregate counts and the RESOLVED/UNKNOWN split, but never pins down
    per-field shape: whether a CONFLICT or fallback-PENDING heading (no date
    prefix) correctly leaves timeScope as None, whether a dated-but-PENDING
    heading ("sin decidir") still gets its date extracted even though the
    claim stays unresolved, or that the static fields (variables, unit,
    method, attribution, ...) are exactly what the schema and the rest of
    the pipeline expect. body is part of the (heading, body) tuple but is
    never read by build_claims() -- consistent with the bridge's own
    docstring ("this bridge parses structure, it does not read prose to
    infer meaning") -- so every case below uses a throwaway body to make
    that explicit.
    """

    def test_resolved_heading_produces_testimony_admitted_with_date(self) -> None:
        claims = bridge.build_claims([("2026-08-10 · Some title", "irrelevant body")])
        self.assertEqual(len(claims), 1)
        claim = claims[0]
        self.assertEqual(claim["id"], "CLM-DECISIONES-001")
        self.assertEqual(claim["class"], "TESTIMONY")
        self.assertEqual(claim["publicationStatus"], "ADMITTED")
        self.assertEqual(claim["timeScope"], "2026-08-10")
        self.assertIsNone(claim["uncertainty"])
        self.assertTrue(claim["statement"].startswith("Some title — resolved,"))

    def test_conflict_heading_without_date_leaves_timescope_none(self) -> None:
        claims = bridge.build_claims([("CONFLICTO REGISTRADO · algo", "body")])
        claim = claims[0]
        self.assertEqual(claim["class"], "UNKNOWN")
        self.assertEqual(claim["publicationStatus"], "REVIEW")
        self.assertIsNone(claim["timeScope"])
        self.assertTrue(claim["statement"].startswith("CONFLICTO REGISTRADO · algo — conflict,"))
        self.assertIn("explicitly unresolved", claim["uncertainty"])

    def test_undated_fallback_heading_without_markers_stays_pending_and_dateless(self) -> None:
        claims = bridge.build_claims([("Encabezado sin marcador", "body")])
        claim = claims[0]
        self.assertEqual(claim["class"], "UNKNOWN")
        self.assertEqual(claim["publicationStatus"], "REVIEW")
        self.assertIsNone(claim["timeScope"])
        self.assertTrue(claim["statement"].startswith("Encabezado sin marcador — pending,"))

    def test_dated_but_explicitly_pending_heading_keeps_its_date(self) -> None:
        """Regression companion to test_bridge_decisions.py's
        test_dated_heading_with_sin_decidir_stays_pending: classify() puts
        this in PENDING, but DATE_HEADING still matches the heading text
        independently of classify()'s result, so the date and the
        de-prefixed title must still come through onto the claim."""
        claims = bridge.build_claims([("2026-08-10 · Los cursos, sin decidir", "body")])
        claim = claims[0]
        self.assertEqual(claim["class"], "UNKNOWN")
        self.assertEqual(claim["publicationStatus"], "REVIEW")
        self.assertEqual(claim["timeScope"], "2026-08-10")
        self.assertTrue(claim["statement"].startswith("Los cursos, sin decidir — pending,"))

    def test_ids_increment_sequentially_and_are_zero_padded(self) -> None:
        sections = [
            ("2026-01-01 · A", "body a"),
            ("CONFLICTO REGISTRADO · B", "body b"),
            ("Sigue esperando decisión", "body c"),
        ]
        claims = bridge.build_claims(sections)
        self.assertEqual([c["id"] for c in claims], [
            "CLM-DECISIONES-001",
            "CLM-DECISIONES-002",
            "CLM-DECISIONES-003",
        ])

    def test_static_fields_are_constant_across_claim_kinds(self) -> None:
        sections = [
            ("2026-01-01 · A", "body a"),
            ("CONFLICTO REGISTRADO · B", "body b"),
            ("Sigue esperando decisión", "body c"),
        ]
        for claim in bridge.build_claims(sections):
            self.assertEqual(claim["sourceIds"], ["SRC-KODEX-DECISIONES-2026-08-14"])
            self.assertEqual(claim["variables"], [])
            self.assertIsNone(claim["unit"])
            self.assertIsNone(claim["denominator"])
            self.assertIsNone(claim["geographyScope"])
            self.assertIsNone(claim["populationScope"])
            self.assertIsNone(claim["formula"])
            self.assertEqual(claim["contradictions"], [])
            self.assertEqual(claim["limitations"], [])
            self.assertEqual(claim["attribution"], "Nicolás Ortega / Ocín")
            self.assertEqual(
                claim["method"],
                "Direct extraction of a level-2 section from the committed decisions log; "
                "no interpretation added.",
            )

    def test_empty_sections_produce_no_claims(self) -> None:
        self.assertEqual(bridge.build_claims([]), [])


class DigestHelperTests(unittest.TestCase):
    """Direct unit coverage for stable_digest()/sha256_bytes(). The
    end-to-end test_manifest_digest_matches_content in
    test_bridge_decisions.py re-derives the expected hash the same way the
    module does and compares, which pins the content_digest values but
    never calls these two functions directly, and never checks the
    top-level manifest["digest"] (the hash-of-the-hashes) at all."""

    def test_stable_digest_is_key_order_independent(self) -> None:
        self.assertEqual(
            bridge.stable_digest({"b": 1, "a": 2}),
            bridge.stable_digest({"a": 2, "b": 1}),
        )

    def test_stable_digest_matches_manual_sha256(self) -> None:
        obj = [{"id": "x", "n": 1}]
        expected = hashlib.sha256(
            json.dumps(obj, sort_keys=True, separators=(",", ":")).encode("utf-8")
        ).hexdigest()
        self.assertEqual(bridge.stable_digest(obj), expected)

    def test_sha256_bytes_matches_hashlib_on_the_text(self) -> None:
        text = '{"sources":"abc","claims":"def"}'
        self.assertEqual(
            bridge.sha256_bytes(text), hashlib.sha256(text.encode("utf-8")).hexdigest()
        )

    def test_manifest_top_level_digest_hashes_its_own_content_digest(self) -> None:
        """End-to-end: main()'s manifest["digest"] must equal
        sha256_bytes() of manifest["content_digest"] serialized the same
        way main() serializes it -- not just some digest, the specific one
        a consumer verifying the manifest would recompute."""
        with tempfile.TemporaryDirectory(dir=bridge.REPO_ROOT) as tmp:
            log = Path(tmp) / "log.md"
            log.write_text("## 2026-01-01 · A\nbody\n", encoding="utf-8")
            out_dir = Path(tmp) / "out"
            with mock.patch.object(bridge, "SOURCE_LOG", log), mock.patch.object(
                bridge, "OUT_DIR", out_dir
            ):
                with redirect_stdout(io.StringIO()):
                    result = bridge.main()
            self.assertEqual(result, 0)
            manifest = json.loads((out_dir / "manifest.json").read_text(encoding="utf-8"))
            expected = bridge.sha256_bytes(
                json.dumps(manifest["content_digest"], sort_keys=True, separators=(",", ":"))
            )
            self.assertEqual(manifest["digest"], expected)


if __name__ == "__main__":
    unittest.main()
