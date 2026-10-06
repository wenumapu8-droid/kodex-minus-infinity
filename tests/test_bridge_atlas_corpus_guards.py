from __future__ import annotations

import unittest

from scripts.bridge_atlas_corpus_v1 import (
    check_dangling_edges,
    check_duplicates,
    check_unknown_enums,
)


class CheckDuplicatesTests(unittest.TestCase):
    """Direct coverage for check_duplicates().

    The end-to-end tests in test_bridge_atlas_corpus.py only run this guard
    against the real, already-clean corpus lock output, where it always
    returns []. Its anomaly-reporting branch is never exercised there.
    """

    def test_no_duplicates_returns_empty(self) -> None:
        records = [{"id": "SRC-A"}, {"id": "SRC-B"}]
        self.assertEqual(check_duplicates(records, "source"), [])

    def test_single_duplicate_is_reported_once(self) -> None:
        records = [{"id": "SRC-A"}, {"id": "SRC-B"}, {"id": "SRC-A"}]
        self.assertEqual(check_duplicates(records, "source"), ["DUPLICATE_ID source SRC-A"])

    def test_repeated_duplicate_is_reported_for_each_extra_occurrence(self) -> None:
        records = [{"id": "SRC-A"}, {"id": "SRC-A"}, {"id": "SRC-A"}]
        self.assertEqual(
            check_duplicates(records, "source"),
            ["DUPLICATE_ID source SRC-A", "DUPLICATE_ID source SRC-A"],
        )

    def test_empty_records_returns_empty(self) -> None:
        self.assertEqual(check_duplicates([], "claim"), [])


class CheckUnknownEnumsTests(unittest.TestCase):
    """Direct coverage for check_unknown_enums() — both kind branches and
    every field it validates, including the fields left untouched by any
    open bridge-1 fix at the time this test was written (culturalStatus)."""

    def _valid_source(self, **overrides: str) -> dict[str, str]:
        record = {
            "id": "SRC-001",
            "sourceClass": "CODE",
            "rightsStatus": "REFERENCE_ONLY",
            "privacyStatus": "PUBLIC",
            "culturalStatus": "STANDARD",
        }
        record.update(overrides)
        return record

    def _valid_claim(self, **overrides: str) -> dict[str, str]:
        record = {"id": "CLM-001", "class": "OBSERVED", "publicationStatus": "ADMITTED"}
        record.update(overrides)
        return record

    def test_valid_source_has_no_anomalies(self) -> None:
        self.assertEqual(check_unknown_enums([self._valid_source()], "source"), [])

    def test_valid_claim_has_no_anomalies(self) -> None:
        self.assertEqual(check_unknown_enums([self._valid_claim()], "claim"), [])

    def test_unknown_source_class_is_reported(self) -> None:
        anomalies = check_unknown_enums([self._valid_source(sourceClass="BOGUS")], "source")
        self.assertEqual(anomalies, ["UNKNOWN_ENUM sourceClass SRC-001 BOGUS"])

    def test_unknown_rights_status_is_reported(self) -> None:
        anomalies = check_unknown_enums([self._valid_source(rightsStatus="BOGUS")], "source")
        self.assertEqual(anomalies, ["UNKNOWN_ENUM rightsStatus SRC-001 BOGUS"])

    def test_unknown_privacy_status_is_reported(self) -> None:
        anomalies = check_unknown_enums([self._valid_source(privacyStatus="BOGUS")], "source")
        self.assertEqual(anomalies, ["UNKNOWN_ENUM privacyStatus SRC-001 BOGUS"])

    def test_unknown_cultural_status_is_reported(self) -> None:
        anomalies = check_unknown_enums([self._valid_source(culturalStatus="BOGUS")], "source")
        self.assertEqual(anomalies, ["UNKNOWN_ENUM culturalStatus SRC-001 BOGUS"])

    def test_multiple_bad_source_fields_are_all_reported(self) -> None:
        anomalies = check_unknown_enums(
            [self._valid_source(sourceClass="BOGUS", rightsStatus="BOGUS")], "source"
        )
        self.assertEqual(
            anomalies,
            [
                "UNKNOWN_ENUM sourceClass SRC-001 BOGUS",
                "UNKNOWN_ENUM rightsStatus SRC-001 BOGUS",
            ],
        )

    def test_unknown_claim_class_is_reported(self) -> None:
        anomalies = check_unknown_enums([self._valid_claim(**{"class": "BOGUS"})], "claim")
        self.assertEqual(anomalies, ["UNKNOWN_ENUM class CLM-001 BOGUS"])

    def test_unknown_publication_status_is_reported(self) -> None:
        anomalies = check_unknown_enums([self._valid_claim(publicationStatus="BOGUS")], "claim")
        self.assertEqual(anomalies, ["UNKNOWN_ENUM publicationStatus CLM-001 BOGUS"])


class CheckDanglingEdgesTests(unittest.TestCase):
    """Direct coverage for check_dangling_edges() — the real corpus lock
    output never has a dangling edge, so this only ran its clean branch
    before."""

    def test_edges_between_known_nodes_have_no_anomalies(self) -> None:
        edges = [{"id": "EDGE-001", "from": "NODE-A", "to": "NODE-B"}]
        self.assertEqual(check_dangling_edges(edges, {"NODE-A", "NODE-B"}), [])

    def test_dangling_from_is_reported(self) -> None:
        edges = [{"id": "EDGE-001", "from": "NODE-GHOST", "to": "NODE-B"}]
        anomalies = check_dangling_edges(edges, {"NODE-B"})
        self.assertEqual(anomalies, ["DANGLING_EDGE EDGE-001 from NODE-GHOST"])

    def test_dangling_to_is_reported(self) -> None:
        edges = [{"id": "EDGE-001", "from": "NODE-A", "to": "NODE-GHOST"}]
        anomalies = check_dangling_edges(edges, {"NODE-A"})
        self.assertEqual(anomalies, ["DANGLING_EDGE EDGE-001 to NODE-GHOST"])

    def test_both_ends_dangling_reports_both(self) -> None:
        edges = [{"id": "EDGE-001", "from": "NODE-GHOST-1", "to": "NODE-GHOST-2"}]
        anomalies = check_dangling_edges(edges, set())
        self.assertEqual(
            anomalies,
            [
                "DANGLING_EDGE EDGE-001 from NODE-GHOST-1",
                "DANGLING_EDGE EDGE-001 to NODE-GHOST-2",
            ],
        )

    def test_empty_edges_returns_empty(self) -> None:
        self.assertEqual(check_dangling_edges([], {"NODE-A"}), [])


if __name__ == "__main__":
    unittest.main()
