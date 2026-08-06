from __future__ import annotations

import importlib.util
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
MODULE_PATH = REPO_ROOT / "scripts" / "validate_node_recipes.py"
SPEC = importlib.util.spec_from_file_location("validate_node_recipes", MODULE_PATH)
assert SPEC and SPEC.loader
MODULE = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(MODULE)


class NodeRecipeValidationTests(unittest.TestCase):
    def test_m1_registry_satisfies_project_invariants(self) -> None:
        errors = MODULE.validate_registry(REPO_ROOT)
        self.assertEqual(errors, [], "\n".join(errors))

    def test_coordinate_authority_remains_a_through_y(self) -> None:
        self.assertEqual(MODULE.LETTERS[0], "A")
        self.assertEqual(MODULE.LETTERS[-1], "Y")
        self.assertEqual(len(MODULE.LETTERS), 25)

    def test_only_a_m_y_are_invariant_canonical_coordinates(self) -> None:
        self.assertEqual(MODULE.CANONICAL_COORDINATES, {"A", "M", "Y"})


if __name__ == "__main__":
    unittest.main()
