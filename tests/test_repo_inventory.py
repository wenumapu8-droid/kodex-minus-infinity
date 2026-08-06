from __future__ import annotations

import importlib.util
import json
import subprocess
import tempfile
import unittest
from pathlib import Path, PurePosixPath

ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "scripts" / "kodex_repo_inventory.py"
SPEC = importlib.util.spec_from_file_location("kodex_repo_inventory", SCRIPT)
assert SPEC and SPEC.loader
MODULE = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(MODULE)


class RepositoryInventoryTests(unittest.TestCase):
    def test_categories_and_flags(self) -> None:
        self.assertEqual(MODULE.category(PurePosixPath("scene.frag")), "text")
        self.assertEqual(MODULE.category(PurePosixPath("preview.png")), "media")
        self.assertEqual(MODULE.category(PurePosixPath("font.woff2")), "font")

        flags = MODULE.flags_for(PurePosixPath("src/kodex/observe.frag"), "text")
        self.assertIn("KODEX_CANDIDATE", flags)

        private_flags = MODULE.flags_for(PurePosixPath("private/.env"), "text")
        self.assertIn("PRIVACY_OR_SECRET_REVIEW", private_flags)

    def test_inventories_two_refs_without_checkout(self) -> None:
        with tempfile.TemporaryDirectory() as temp_dir:
            repo = Path(temp_dir) / "repo"
            repo.mkdir()

            subprocess.run(["git", "init", "-b", "main", str(repo)], check=True)
            subprocess.run(
                ["git", "-C", str(repo), "config", "user.email", "test@example.com"],
                check=True,
            )
            subprocess.run(
                ["git", "-C", str(repo), "config", "user.name", "KODEX Test"],
                check=True,
            )

            (repo / "README.md").write_text("# KODEX\n", encoding="utf-8")
            subprocess.run(["git", "-C", str(repo), "add", "README.md"], check=True)
            subprocess.run(["git", "-C", str(repo), "commit", "-m", "main"], check=True)

            subprocess.run(
                ["git", "-C", str(repo), "checkout", "-b", "feature/kodex-observe"],
                check=True,
            )
            shader = repo / "src" / "kodex" / "observe.frag"
            shader.parent.mkdir(parents=True)
            shader.write_text("void main() {}\n", encoding="utf-8")
            subprocess.run(["git", "-C", str(repo), "add", "."], check=True)
            subprocess.run(["git", "-C", str(repo), "commit", "-m", "observe"], check=True)

            inventory = {
                "schema_version": 1,
                "repository": MODULE.resolve_repo_name(repo),
                "local_path": str(repo),
                "inspected_at": MODULE.utc_now(),
                "read_only": True,
                "refs": [
                    MODULE.inventory_ref(repo, "main"),
                    MODULE.inventory_ref(repo, "feature/kodex-observe"),
                ],
            }
            inventory["summary"] = MODULE.summarize(inventory)

            self.assertEqual(inventory["refs"][0]["file_count"], 1)
            self.assertEqual(inventory["refs"][1]["file_count"], 2)
            self.assertIn(
                "src/kodex/observe.frag",
                inventory["summary"]["candidate_paths"],
            )

            serialized = json.dumps(inventory)
            self.assertIn("feature/kodex-observe", serialized)


if __name__ == "__main__":
    unittest.main()
