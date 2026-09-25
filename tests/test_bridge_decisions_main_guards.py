from __future__ import annotations

import io
import tempfile
import unittest
from contextlib import redirect_stderr
from pathlib import Path
from unittest import mock

import scripts.bridge_decisions_v1 as bridge


class MainGuardTests(unittest.TestCase):
    """Direct coverage for main()'s two early-return error branches.

    Neither is reached by the end-to-end suite in test_bridge_decisions.py,
    which only ever runs against the real, already-committed
    research/KODEX-DECISIONES-2026-08-14.md. These tests patch the
    module-level SOURCE_LOG constant to a throwaway file, so the real
    decisions log and its committed output under
    data/bridges/bridge-decisions-v0/ are never touched: both branches under
    test return before main() reaches the OUT_DIR write step.
    """

    def test_missing_source_log_returns_error(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            missing = Path(tmp) / "does-not-exist.md"
            stderr = io.StringIO()
            with mock.patch.object(bridge, "SOURCE_LOG", missing):
                with redirect_stderr(stderr):
                    result = bridge.main()
            self.assertEqual(result, 1)
            self.assertIn("decisions log not found", stderr.getvalue())

    def test_no_level_2_sections_returns_error(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            log = Path(tmp) / "decisiones.md"
            log.write_text("# just a title, no level-2 sections\n", encoding="utf-8")
            stderr = io.StringIO()
            with mock.patch.object(bridge, "SOURCE_LOG", log):
                with redirect_stderr(stderr):
                    result = bridge.main()
            self.assertEqual(result, 1)
            self.assertIn("no level-2 sections found", stderr.getvalue())


if __name__ == "__main__":
    unittest.main()
