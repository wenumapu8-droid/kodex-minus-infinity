from __future__ import annotations

import io
import json
import tempfile
import unittest
from contextlib import redirect_stderr
from pathlib import Path
from unittest import mock

import scripts.bridge_decisions_v1 as bridge


class ClassifyTests(unittest.TestCase):
    """Direct unit coverage for classify().

    The end-to-end tests in test_bridge_decisions.py only exercise it
    indirectly through the real, already-committed
    KODEX-DECISIONES-2026-08-14.md, where every heading happens to match
    either the CONFLICT marker, one of the two PENDING markers, or a dated
    RESOLVED heading. The bare fallback branch (no date, no marker) is never
    reached there.
    """

    def test_conflicto_registrado_is_conflict(self) -> None:
        self.assertEqual(bridge.classify("CONFLICTO REGISTRADO · algo"), "CONFLICT")

    def test_sigue_esperando_is_pending(self) -> None:
        self.assertEqual(bridge.classify("Sigue esperando decisión"), "PENDING")

    def test_sin_decidir_is_pending_even_with_date(self) -> None:
        self.assertEqual(bridge.classify("2026-08-10 · Los cursos, sin decidir"), "PENDING")

    def test_dated_heading_is_resolved(self) -> None:
        self.assertEqual(bridge.classify("2026-08-10 · Algo decidido"), "RESOLVED")

    def test_undated_heading_without_markers_falls_back_to_pending(self) -> None:
        self.assertEqual(bridge.classify("Un encabezado cualquiera sin fecha"), "PENDING")

    def test_conflict_marker_wins_over_date(self) -> None:
        # A heading could in principle carry both a date-like prefix and the
        # CONFLICT marker; CONFLICT must win, since classify() checks it
        # before ever trying DATE_HEADING.
        self.assertEqual(
            bridge.classify("2026-08-11 · CONFLICTO REGISTRADO · algo"), "CONFLICT"
        )


class SplitSectionsTests(unittest.TestCase):
    """Direct unit coverage for split_sections() — the end-to-end tests only
    ever run it against the real decisions log, so its edge cases (no
    sections at all, a heading with no body, surrounding whitespace) are
    untested."""

    def test_no_level2_headings_returns_empty(self) -> None:
        self.assertEqual(bridge.split_sections("# Title\n\nSome prose, no ## sections."), [])

    def test_content_before_first_heading_is_discarded(self) -> None:
        markdown = "# Title\n\nintro text\n\n## First\nbody one\n"
        sections = bridge.split_sections(markdown)
        self.assertEqual(sections, [("First", "body one")])

    def test_multiple_sections_are_split_in_order(self) -> None:
        markdown = "## A\nbody a\n\n## B\nbody b\n"
        sections = bridge.split_sections(markdown)
        self.assertEqual([h for h, _ in sections], ["A", "B"])
        self.assertEqual([b for _, b in sections], ["body a", "body b"])

    def test_heading_and_body_whitespace_is_stripped(self) -> None:
        markdown = "##   Spacey Heading   \n\n   body with leading space\n\n"
        sections = bridge.split_sections(markdown)
        self.assertEqual(sections, [("Spacey Heading", "body with leading space")])

    def test_heading_with_no_body_returns_empty_string_body(self) -> None:
        self.assertEqual(bridge.split_sections("## Lonely Heading"), [("Lonely Heading", "")])


class MainGuardTests(unittest.TestCase):
    """Direct coverage for main()'s early-return error branches, neither of
    which is reached by the end-to-end tests in test_bridge_decisions.py —
    those only ever run against the real, already-valid decisions log. These
    tests patch the module-level SOURCE_LOG/OUT_DIR constants to point at
    throwaway paths, so the real decisions log and its committed output
    under data/bridges/bridge-decisions-v0/ are never touched."""

    def test_missing_source_log_returns_error(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            missing = Path(tmp) / "does-not-exist.md"
            stderr = io.StringIO()
            with mock.patch.object(bridge, "SOURCE_LOG", missing):
                with redirect_stderr(stderr):
                    result = bridge.main()
            self.assertEqual(result, 1)
            self.assertIn("decisions log not found", stderr.getvalue())

    def test_no_sections_returns_error(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            log = Path(tmp) / "empty-log.md"
            log.write_text("# Title\n\nNo level-2 sections here.\n", encoding="utf-8")
            stderr = io.StringIO()
            with mock.patch.object(bridge, "SOURCE_LOG", log):
                with redirect_stderr(stderr):
                    result = bridge.main()
            self.assertEqual(result, 1)
            self.assertIn("no level-2 sections found", stderr.getvalue())

    def test_duplicate_claim_ids_are_reported_as_anomalies(self) -> None:
        """build_claims() can never itself emit duplicate ids in the real
        pipeline (they are assigned from a strictly increasing enumerate
        index), so the DUPLICATE_ID guard in main() is dead code from that
        pipeline's perspective. This exercises it directly by forcing
        build_claims() to return a colliding pair, proving the guard still
        fires if that invariant is ever broken."""
        # main() reports source_log as a path relative to REPO_ROOT, so the
        # throwaway log must live under REPO_ROOT too (unlike the other two
        # guard tests above, which return before that line is reached).
        with tempfile.TemporaryDirectory(dir=bridge.REPO_ROOT) as tmp:
            log = Path(tmp) / "log.md"
            log.write_text("## 2026-01-01 · A\nbody\n\n## 2026-01-02 · B\nbody\n", encoding="utf-8")
            out_dir = Path(tmp) / "out"
            duplicated = [
                {**bridge.build_claims([("2026-01-01 · A", "body")])[0], "id": "CLM-DECISIONES-001"},
                {**bridge.build_claims([("2026-01-02 · B", "body")])[0], "id": "CLM-DECISIONES-001"},
            ]
            with mock.patch.object(bridge, "SOURCE_LOG", log), \
                 mock.patch.object(bridge, "OUT_DIR", out_dir), \
                 mock.patch.object(bridge, "build_claims", return_value=duplicated):
                result = bridge.main()
            self.assertEqual(result, 0)
            manifest = json.loads((out_dir / "manifest.json").read_text(encoding="utf-8"))
            self.assertIn("DUPLICATE_ID claim CLM-DECISIONES-001", manifest["anomalies"])


if __name__ == "__main__":
    unittest.main()
