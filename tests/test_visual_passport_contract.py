from __future__ import annotations

import json
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


class VisualPassportContractTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.schema = json.loads((ROOT / "schemas/visual-passport.schema.json").read_text(encoding="utf-8"))
        cls.protocol = (ROOT / "ops/factory/VISUAL_PASSPORT_PROTOCOL.md").read_text(encoding="utf-8")
        cls.template = (ROOT / "ops/factory/VISUAL_PASSPORT_TEMPLATE.yaml").read_text(encoding="utf-8")

    def test_schema_rejects_unlisted_fields(self) -> None:
        self.assertFalse(self.schema["additionalProperties"])

    def test_coordinate_is_optional_and_limited_to_a_through_y(self) -> None:
        coordinate = self.schema["properties"]["coordinateAssignment"]
        self.assertEqual(coordinate["type"], ["string", "null"])
        self.assertEqual(coordinate["pattern"], "^[A-Y]$")
        self.assertNotIn("coordinateAssignment", self.schema["required"])

    def test_required_implementation_and_accessibility_sections_exist(self) -> None:
        required = set(self.schema["required"])
        for field in {"implementation", "fallback", "accessibility", "reviewChecks", "epistemicConstraints"}:
            self.assertIn(field, required)

    def test_implementation_medium_is_bounded(self) -> None:
        medium = self.schema["properties"]["implementation"]["properties"]["medium"]["enum"]
        self.assertEqual(medium, ["DOM", "SVG", "CANVAS", "WEBGL", "SHADER", "HYBRID"])

    def test_template_defaults_to_unassigned_coordinate_and_symbolic_claim_policy(self) -> None:
        self.assertIn("coordinateAssignment: null", self.template)
        self.assertIn('scientificClaimPolicy: "SYMBOLIC_ONLY"', self.template)
        self.assertIn("390", self.template)
        self.assertIn("412", self.template)

    def test_protocol_forbids_invented_alpha_mapping_and_pseudo_telemetry(self) -> None:
        self.assertIn("Do not infer B–L or N–X meanings", self.protocol)
        self.assertIn("No pseudo-telemetry", self.protocol)
        self.assertIn("Pointer discovery is never the only way", self.protocol)


if __name__ == "__main__":
    unittest.main()
