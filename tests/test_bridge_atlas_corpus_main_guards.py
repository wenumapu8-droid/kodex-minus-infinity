from __future__ import annotations

import io
import tempfile
import unittest
from contextlib import redirect_stderr
from pathlib import Path
from unittest import mock

import scripts.bridge_atlas_corpus_v1 as bridge


def _markdown_with_counts(kdx_count: int, ocin_count: int) -> str:
    """Minimal fenced YAML blocks that satisfy extract_kdx_rows()/extract_ocin_rows()
    admission checks (a truthy 'name' or 'file' field) without touching the real,
    already-locked corpus file."""
    blocks = [f"```yaml\nname: ROW-{i}\n```\n" for i in range(kdx_count)]
    blocks += [f"```yaml\nfile: FILE-{i}.png\n```\n" for i in range(ocin_count)]
    return "\n".join(blocks)


class MainGuardTests(unittest.TestCase):
    """Direct coverage for main()'s three early-return error branches.

    None of these are reached by the end-to-end tests in
    test_bridge_atlas_corpus.py, which only ever run against the real,
    already-valid research/CORPUS_LOCK_V0_DRAFT.md (15 visual + 10 research
    rows). These tests patch the module-level SOURCE_LOCK constant to point
    at a throwaway file, so the real corpus lock and its committed output
    under data/bridges/bridge-1-v0/ are never touched: every branch under
    test returns before main() reaches the OUT_DIR write step.
    """

    def test_missing_source_lock_returns_error(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            missing = Path(tmp) / "does-not-exist.md"
            stderr = io.StringIO()
            with mock.patch.object(bridge, "SOURCE_LOCK", missing):
                with redirect_stderr(stderr):
                    result = bridge.main()
            self.assertEqual(result, 1)
            self.assertIn("source lock not found", stderr.getvalue())

    def test_wrong_visual_row_count_returns_error(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            lock = Path(tmp) / "corpus-lock.md"
            lock.write_text(_markdown_with_counts(kdx_count=14, ocin_count=10), encoding="utf-8")
            stderr = io.StringIO()
            with mock.patch.object(bridge, "SOURCE_LOCK", lock):
                with redirect_stderr(stderr):
                    result = bridge.main()
            self.assertEqual(result, 1)
            self.assertIn("expected 15 Visual Atlas rows, got 14", stderr.getvalue())

    def test_wrong_research_row_count_returns_error(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            lock = Path(tmp) / "corpus-lock.md"
            lock.write_text(_markdown_with_counts(kdx_count=15, ocin_count=9), encoding="utf-8")
            stderr = io.StringIO()
            with mock.patch.object(bridge, "SOURCE_LOCK", lock):
                with redirect_stderr(stderr):
                    result = bridge.main()
            self.assertEqual(result, 1)
            self.assertIn("expected 10 Research Corpus rows, got 9", stderr.getvalue())


if __name__ == "__main__":
    unittest.main()
