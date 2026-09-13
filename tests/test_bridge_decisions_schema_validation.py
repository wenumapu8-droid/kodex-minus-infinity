from __future__ import annotations

import unittest
from typing import Any

import scripts.bridge_decisions_v1 as bridge


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
        "class": "UNKNOWN",
        "statement": "Test claim.",
        "sourceIds": [],
        "publicationStatus": "REVIEW",
    }
    row.update(overrides)
    return row


class ValidateSchemasTests(unittest.TestCase):
    """Direct unit coverage for bridge_decisions_v1.validate_schemas().

    tests/test_bridge_decisions.py only runs the bridge end-to-end against
    the real, already-valid KODEX-DECISIONES-2026-08-14.md and always gets
    an empty anomalies list back. The except-jsonschema.ValidationError
    branches -- the entire reason this function exists -- had zero test
    coverage: if jsonschema stopped catching a real malformed source or
    claim row, nothing in the suite would notice. Same gap already closed
    for the sibling bridge_atlas_corpus_v1.validate_schemas() in
    tests/test_bridge_atlas_corpus_schema_validation.py; this mirrors that
    pattern for bridge_decisions_v1's own copy of the same function.
    """

    def test_valid_rows_produce_no_anomalies(self) -> None:
        anomalies = bridge.validate_schemas([valid_source()], [valid_claim()])
        self.assertEqual(anomalies, [])

    def test_source_missing_required_field_is_flagged(self) -> None:
        bad = valid_source()
        del bad["location"]
        anomalies = bridge.validate_schemas([bad], [])
        self.assertEqual(len(anomalies), 1)
        self.assertIn("SCHEMA source SRC-TEST-001", anomalies[0])

    def test_source_unknown_enum_value_is_flagged(self) -> None:
        bad = valid_source(rightsStatus="NOT_A_REAL_STATUS")
        anomalies = bridge.validate_schemas([bad], [])
        self.assertEqual(len(anomalies), 1)
        self.assertIn("SCHEMA source SRC-TEST-001", anomalies[0])

    def test_source_rejects_undeclared_property(self) -> None:
        bad = valid_source(extraField="not in schema")
        anomalies = bridge.validate_schemas([bad], [])
        self.assertEqual(len(anomalies), 1)
        self.assertIn("SCHEMA source SRC-TEST-001", anomalies[0])

    def test_claim_missing_required_field_is_flagged(self) -> None:
        bad = valid_claim()
        del bad["statement"]
        anomalies = bridge.validate_schemas([], [bad])
        self.assertEqual(len(anomalies), 1)
        self.assertIn("SCHEMA claim CLM-TEST-001", anomalies[0])

    def test_claim_testimony_class_requires_at_least_one_source_id(self) -> None:
        # TESTIMONY is the class bridge_decisions_v1 actually assigns to
        # RESOLVED claims, and it's inside claim.schema.json's conditional
        # enum list requiring sourceIds -- unlike UNKNOWN, which this
        # bridge assigns to every CONFLICT/PENDING claim and which the
        # schema does not put under that conditional (see test below).
        bad = valid_claim(**{"class": "TESTIMONY"}, sourceIds=[])
        anomalies = bridge.validate_schemas([], [bad])
        self.assertEqual(len(anomalies), 1)
        self.assertIn("SCHEMA claim CLM-TEST-001", anomalies[0])

    def test_claim_unknown_class_does_not_require_source_ids(self) -> None:
        # UNKNOWN is outside the allOf's conditional enum list, so an empty
        # sourceIds is valid for it -- confirms the conditional requirement
        # is scoped to the classes it names, not applied unconditionally.
        # (build_claims() always populates sourceIds with the one source
        # regardless of claimClass, so this path isn't reachable through
        # the real pipeline -- it only confirms the schema itself.)
        row = valid_claim(sourceIds=[])
        anomalies = bridge.validate_schemas([], [row])
        self.assertEqual(anomalies, [])

    def test_multiple_invalid_rows_each_produce_one_anomaly(self) -> None:
        bad_source = valid_source()
        del bad_source["title"]
        bad_claim = valid_claim()
        del bad_claim["class"]
        anomalies = bridge.validate_schemas([bad_source], [bad_claim])
        self.assertEqual(len(anomalies), 2)


if __name__ == "__main__":
    unittest.main()
