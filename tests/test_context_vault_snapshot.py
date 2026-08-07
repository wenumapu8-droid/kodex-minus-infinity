from __future__ import annotations

import subprocess
import tempfile
import unittest
from pathlib import Path

from scripts.context_vault_snapshot import create_snapshot


class ContextVaultSnapshotTests(unittest.TestCase):
    def _git(self, root: Path, *args: str) -> None:
        subprocess.run(["git", "-C", str(root), *args], check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

    def _make_repo(self) -> Path:
        temp = tempfile.TemporaryDirectory()
        self.addCleanup(temp.cleanup)
        root = Path(temp.name) / "repo"
        root.mkdir()
        self._git(root, "init")
        self._git(root, "config", "user.email", "factory-test@example.invalid")
        self._git(root, "config", "user.name", "Factory Test")

        (root / "src").mkdir()
        (root / "canon").mkdir()
        (root / "README.md").write_text("root\n", encoding="utf-8")
        (root / "src" / "runtime.ts").write_text("export const x = 1;\n", encoding="utf-8")
        (root / "canon" / "KODEX.md").write_text("canon\n", encoding="utf-8")
        self._git(root, "add", ".")
        self._git(root, "commit", "-m", "initial")
        return root

    def test_snapshot_contains_metadata_not_contents(self) -> None:
        root = self._make_repo()
        (root / "src" / "runtime.ts").write_text("export const x = 2;\n", encoding="utf-8")
        (root / ".env.local").write_text("TOKEN=do-not-export\n", encoding="utf-8")
        (root / "image.png").write_bytes(b"not-a-real-image")

        snapshot = create_snapshot(root)
        records = {item["path"]: item for item in snapshot["files"]}

        self.assertFalse(snapshot["safety"]["file_contents_included"])
        self.assertFalse(snapshot["safety"]["absolute_paths_included"])
        self.assertIn("src/runtime.ts", snapshot["dirty_paths"])
        self.assertIn(".env.local", snapshot["dirty_paths"])
        self.assertEqual(records[".env.local"]["classification_hint"], "PRIVATE")
        self.assertEqual(records["image.png"]["classification_hint"], "RIGHTS_REVIEW")
        self.assertEqual(records["src/runtime.ts"]["classification_hint"], "IMPLEMENTATION_EVIDENCE")
        self.assertEqual(records["canon/KODEX.md"]["classification_hint"], "CANON_CANDIDATE")
        self.assertTrue(records["src/runtime.ts"]["sha256"])
        self.assertNotIn("TOKEN=do-not-export", str(snapshot))
        self.assertTrue(all(not item["path"].startswith(str(root)) for item in snapshot["files"]))

    def test_large_file_can_skip_hash_without_losing_metadata(self) -> None:
        root = self._make_repo()
        big = root / "src" / "large.bin"
        big.write_bytes(b"1234567890")
        snapshot = create_snapshot(root, max_hash_bytes=5)
        record = next(item for item in snapshot["files"] if item["path"] == "src/large.bin")
        self.assertEqual(record["size_bytes"], 10)
        self.assertIsNone(record["sha256"])
        self.assertFalse(record["content_copied"])

    def test_deleted_tracked_file_is_reported(self) -> None:
        root = self._make_repo()
        target = root / "README.md"
        target.unlink()
        snapshot = create_snapshot(root)
        record = next(item for item in snapshot["files"] if item["path"] == "README.md")
        self.assertFalse(record["exists"])
        self.assertIn("DELETED", record["git_states"])


if __name__ == "__main__":
    unittest.main()
