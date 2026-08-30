from __future__ import annotations

import json
import subprocess
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONTEXT_SCRIPT = ROOT / "scripts/validate_context.py"

from scripts.validate_context import (  # noqa: E402
    APPROVAL_PHRASE,
    EXPECTED_LETTERS,
    FORBIDDEN_PUBLIC_PATHS,
    JSON_FILES,
    REQUIRED_FILES,
    main,
)


class ContextValidationTests(unittest.TestCase):
    def test_main_returns_zero_on_current_repo(self) -> None:
        result = subprocess.run(
            ["python3", str(CONTEXT_SCRIPT)],
            cwd=ROOT,
            capture_output=True,
            text=True,
        )
        self.assertEqual(result.returncode, 0, result.stderr)

    def test_required_files_all_exist(self) -> None:
        missing = [rel for rel in REQUIRED_FILES if not (ROOT / rel).is_file()]
        self.assertEqual(missing, [])

    def test_required_json_all_parse(self) -> None:
        for rel in JSON_FILES:
            with self.subTest(file=rel):
                try:
                    json.loads((ROOT / rel).read_text(encoding="utf-8"))
                except (OSError, json.JSONDecodeError) as exc:
                    self.fail(f"{rel}: {exc}")

    def test_expected_letters_are_a_through_y(self) -> None:
        self.assertEqual(len(EXPECTED_LETTERS), 25)
        self.assertEqual(EXPECTED_LETTERS[0], "A")
        self.assertEqual(EXPECTED_LETTERS[-1], "Y")

    def test_approval_phrase_is_preserved(self) -> None:
        self.assertEqual(APPROVAL_PHRASE, "APROBAR DEPLOY")

    def test_forbidden_public_paths_are_covered(self) -> None:
        self.assertIn(".env", FORBIDDEN_PUBLIC_PATHS)
        self.assertIn("private", FORBIDDEN_PUBLIC_PATHS)
        self.assertIn("conversation-exports", FORBIDDEN_PUBLIC_PATHS)

    def test_experience_graph_and_alphabet_invariants(self) -> None:
        errors: list[str] = []
        from scripts import validate_context as vc

        vc.validate_experience_graph(errors)
        self.assertEqual(errors, [])

    def test_state_registry_has_fourteen_unique_states(self) -> None:
        errors: list[str] = []
        from scripts import validate_context as vc

        vc.validate_state_registry(errors)
        self.assertEqual(errors, [])

    def test_module_registry_targets_exist(self) -> None:
        errors: list[str] = []
        from scripts import validate_context as vc

        vc.validate_module_registry(errors)
        self.assertEqual(errors, [])


if __name__ == "__main__":
    unittest.main()
