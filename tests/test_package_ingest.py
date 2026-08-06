from __future__ import annotations

import importlib.util
import json
import sys
import tempfile
import unittest
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "scripts" / "kodex_package_ingest.py"
MODULE_NAME = "kodex_package_ingest"
SPEC = importlib.util.spec_from_file_location(MODULE_NAME, SCRIPT)
assert SPEC and SPEC.loader
MODULE = importlib.util.module_from_spec(SPEC)
sys.modules[MODULE_NAME] = MODULE
SPEC.loader.exec_module(MODULE)


class PackageIngestTests(unittest.TestCase):
    def test_extracts_text_and_skips_media_by_default(self) -> None:
        with tempfile.TemporaryDirectory() as temp_dir:
            root = Path(temp_dir)
            archive = root / "prototype.zip"
            destination = root / "imported" / "prototype"

            with zipfile.ZipFile(archive, "w", compression=zipfile.ZIP_DEFLATED) as handle:
                handle.writestr("prototype/README.md", "# Prototype\n")
                handle.writestr("prototype/src/main.js", "console.log('kodex');\n")
                handle.writestr("prototype/media/preview.png", b"not-a-real-png")

            manifest = MODULE.inspect_package(
                archive=archive,
                destination=destination,
                package_id="prototype",
                include_media=False,
                include_binary=False,
                max_member_bytes=1024 * 1024,
                max_total_bytes=10 * 1024 * 1024,
                max_expansion_ratio=100.0,
                dry_run=False,
            )

            self.assertEqual(manifest.file_count, 3)
            self.assertTrue(
                (destination / "source" / "prototype" / "README.md").is_file()
            )
            self.assertTrue(
                (destination / "source" / "prototype" / "src" / "main.js").is_file()
            )
            self.assertFalse(
                (destination / "source" / "prototype" / "media" / "preview.png").exists()
            )

            manifest_data = json.loads(
                (destination / "manifest.json").read_text(encoding="utf-8")
            )
            media = next(
                item
                for item in manifest_data["members"]
                if item["path"].endswith("preview.png")
            )
            self.assertEqual(media["category"], "media")
            self.assertFalse(media["extracted"])
            self.assertIn("MEDIA_RIGHTS_REVIEW", media["review_flags"])

    def test_rejects_path_traversal(self) -> None:
        with tempfile.TemporaryDirectory() as temp_dir:
            root = Path(temp_dir)
            archive = root / "unsafe.zip"

            with zipfile.ZipFile(archive, "w") as handle:
                handle.writestr("../escape.txt", "blocked")

            with self.assertRaisesRegex(ValueError, "path traversal"):
                MODULE.inspect_package(
                    archive=archive,
                    destination=root / "out",
                    package_id="unsafe",
                    include_media=False,
                    include_binary=False,
                    max_member_bytes=1024 * 1024,
                    max_total_bytes=10 * 1024 * 1024,
                    max_expansion_ratio=100.0,
                    dry_run=True,
                )

    def test_flags_potential_secret_text(self) -> None:
        flags = MODULE.review_flags(
            MODULE.PurePosixPath("src/config.js"),
            "text",
            b"const API_KEY = 'do-not-commit';",
        )
        self.assertIn("POTENTIAL_SECRET_TEXT", flags)


if __name__ == "__main__":
    unittest.main()
