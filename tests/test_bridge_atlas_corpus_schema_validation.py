from __future__ import annotations

import importlib.util
import sys
import unittest
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "scripts" / "bridge_atlas_corpus_v1.py"
SPEC = importlib.util.spec_from_file_location("bridge_atlas_corpus_v1", SCRIPT)
assert SPEC and SPEC.loader
MODULE = importlib.util.module_from_spec(SPEC)
# The module defines @dataclass classes; dataclass() resolves forward-referenced
# annotations via sys.modules[cls.__module__], so the module must be registered
# there before exec_module() runs the class bodies.
sys.modules[SPEC.name] = MODULE
SPEC.loader.exec_module(MODULE)


def valid_source(**overrides: Any) -> dict[str, Any]:
    row = {
        "id": "SRC-TEST-001",
        "title": "Test Source",
        "creator": "Tester",
        "sourceClass": "DOCUMENT",
        "location": "test:location",
        "rightsStatus": "CLEAR",
        "privacyStatus": "PUBLIC",
        "culturalStatus": "STANDARD",
    }
    row.update(overrides)
    return row


def valid_claim(**overrides: Any) -> dict[str, Any]:
    row = {
        "id": "CLM-TEST-001",
        "class": "OBSERVED",
        "statement": "Test claim.",
        "sourceIds": ["SRC-TEST-001"],
        "publicationStatus": "ADMITTED",
    }
    row.update(overrides)
    return row


class ValidateSchemasTests(unittest.TestCase):
    # validate_schemas() only has end-to-end coverage via test_bridge_atlas_corpus.py,
    # which runs the bridge against the real, already-valid corpus lock and always
    # gets an empty anomalies list back. That means the except-ValidationError
    # branches -- the entire reason this function exists -- have no test coverage:
    # if jsonschema stopped catching a real malformed row, nothing would notice.

    def test_valid_rows_produce_no_anomalies(self) -> None:
        anomalies = MODULE.validate_schemas([valid_source()], [valid_claim()])
        self.assertEqual(anomalies, [])

    def test_source_missing_required_field_is_flagged(self) -> None:
        bad = valid_source()
        del bad["location"]
        anomalies = MODULE.validate_schemas([bad], [])
        self.assertEqual(len(anomalies), 1)
        self.assertIn("SCHEMA source SRC-TEST-001", anomalies[0])

    def test_source_unknown_enum_value_is_flagged(self) -> None:
        bad = valid_source(rightsStatus="NOT_A_REAL_STATUS")
        anomalies = MODULE.validate_schemas([bad], [])
        self.assertEqual(len(anomalies), 1)
        self.assertIn("SCHEMA source SRC-TEST-001", anomalies[0])

    def test_source_rejects_undeclared_property(self) -> None:
        bad = valid_source(extraField="not in schema")
        anomalies = MODULE.validate_schemas([bad], [])
        self.assertEqual(len(anomalies), 1)
        self.assertIn("SCHEMA source SRC-TEST-001", anomalies[0])

    def test_claim_missing_required_field_is_flagged(self) -> None:
        bad = valid_claim()
        del bad["statement"]
        anomalies = MODULE.validate_schemas([], [bad])
        self.assertEqual(len(anomalies), 1)
        self.assertIn("SCHEMA claim CLM-TEST-001", anomalies[0])

    def test_claim_observed_class_requires_at_least_one_source_id(self) -> None:
        bad = valid_claim(sourceIds=[])
        anomalies = MODULE.validate_schemas([], [bad])
        self.assertEqual(len(anomalies), 1)
        self.assertIn("SCHEMA claim CLM-TEST-001", anomalies[0])

    def test_claim_unknown_class_does_not_require_source_ids(self) -> None:
        # UNKNOWN is outside the allOf's conditional enum list, so an empty
        # sourceIds is valid for it -- confirms the conditional requirement
        # is scoped to the classes it names, not applied unconditionally.
        row = valid_claim(**{"class": "UNKNOWN"}, sourceIds=[])
        anomalies = MODULE.validate_schemas([], [row])
        self.assertEqual(anomalies, [])

    def test_multiple_invalid_rows_each_produce_one_anomaly(self) -> None:
        bad_source = valid_source()
        del bad_source["title"]
        bad_claim = valid_claim()
        del bad_claim["class"]
        anomalies = MODULE.validate_schemas([bad_source], [bad_claim])
        self.assertEqual(len(anomalies), 2)


if __name__ == "__main__":
    unittest.main()
