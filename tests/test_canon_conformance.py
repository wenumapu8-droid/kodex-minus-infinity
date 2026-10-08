from __future__ import annotations

import contextlib
import importlib.util
import io
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "scripts" / "validate_canon_conformance.py"
SPEC = importlib.util.spec_from_file_location("validate_canon_conformance", SCRIPT)
assert SPEC and SPEC.loader
MODULE = importlib.util.module_from_spec(SPEC)
# Registered before execution so the module's dataclasses can resolve their
# own module during class creation.
sys.modules[SPEC.name] = MODULE
SPEC.loader.exec_module(MODULE)


def minimal_fixture(**overrides: object) -> dict:
    fixture = {
        "authority": MODULE.FIXTURE_REQUIRED_AUTHORITY,
        "conceptAssignmentAuthority": MODULE.FIXTURE_REQUIRED_CONCEPT_AUTHORITY,
        "coordinateRegistry": MODULE.TOPOLOGY_PATH,
        "nodes": [
            {
                "coordinate": "A",
                "epistemicStatus": "CANONICAL",
                "sourceIds": [],
                "rightsStatus": "NOT_APPLICABLE",
            },
            {
                "coordinate": "Y",
                "epistemicStatus": "CANONICAL",
                "sourceIds": [],
                "rightsStatus": "NOT_APPLICABLE",
            },
        ],
        "edges": [
            {
                "id": "E-A-Y",
                "from": "A",
                "to": "Y",
                "accessibility": {"keyboard": "Enter", "reducedMotion": "cut"},
            }
        ],
        "trajectories": [],
    }
    fixture.update(overrides)
    return fixture


class ProseScanTests(unittest.TestCase):
    def test_prose_may_prohibit_what_identifiers_may_not_declare(self) -> None:
        document = {
            "boundaries": ["Nothing here ranks or scores a visitor."],
            "note": "no coherence metric is emitted",
            "nodes": [{"coordinate": "A"}],
        }
        identifiers = {value.lower() for value in MODULE.collect_identifiers(document)}
        self.assertNotIn("nothing here ranks or scores a visitor.", identifiers)
        self.assertIn("coordinate", identifiers)

    def test_a_ranking_field_is_rejected(self) -> None:
        errors: list[str] = []
        MODULE.check_fixture_structure(
            minimal_fixture(telemetry={"coherenceScore": 0.9}), errors
        )
        self.assertTrue(
            any("forbidden ranking" in error for error in errors),
            f"expected a ranking rejection, got {errors}",
        )

    def test_a_clean_fixture_passes_structure(self) -> None:
        errors: list[str] = []
        MODULE.check_fixture_structure(minimal_fixture(), errors)
        self.assertEqual(errors, [])


class FixtureAuthorityTests(unittest.TestCase):
    def test_a_fixture_may_not_claim_canonical_authority(self) -> None:
        errors: list[str] = []
        MODULE.check_fixture_structure(minimal_fixture(authority="CANONICAL"), errors)
        self.assertTrue(any("may not claim canonical" in error for error in errors))

    def test_a_fixture_may_not_assign_concepts(self) -> None:
        fixture = minimal_fixture()
        fixture["nodes"][0]["conceptIds"] = ["CONCEPT-INVENTED"]
        errors: list[str] = []
        MODULE.check_fixture_structure(fixture, errors)
        self.assertTrue(any("CREATOR_APPROVAL" in error for error in errors))

    def test_an_edge_endpoint_without_a_node_is_rejected(self) -> None:
        fixture = minimal_fixture()
        fixture["edges"][0]["to"] = "Q"
        errors: list[str] = []
        MODULE.check_fixture_structure(fixture, errors)
        self.assertTrue(any("has no declared node" in error for error in errors))


class CapabilityProbeTests(unittest.TestCase):
    def test_absent_fixture_leaves_every_fixture_capability_unmet(self) -> None:
        results = MODULE.probe_capabilities(None, {}, 8)
        self.assertEqual(len(results), 10)
        fixture_backed = {
            key: value
            for key, value in results.items()
            if key != "Y_DERIVED_FROM_COMPLETE_EVENT_TRACE"
        }
        self.assertTrue(
            all(item.status == MODULE.UNMET for item in fixture_backed.values())
        )

    def test_the_engine_probe_is_independent_of_the_fixture(self) -> None:
        capability = MODULE.probe_engine({})
        self.assertEqual(capability.id, "Y_DERIVED_FROM_COMPLETE_EVENT_TRACE")
        self.assertNotIn("fixture", capability.reason)


class DriftGuardTests(unittest.TestCase):
    def _manifest(self, status: str) -> dict:
        return {
            "firstExecutableSlice": {
                "status": status,
                "requiredCapabilities": ["CAP_ONE"],
            }
        }

    def test_claiming_completion_without_evidence_fails(self) -> None:
        capabilities = {
            "CAP_ONE": MODULE.Capability("CAP_ONE", MODULE.UNMET, "no evidence")
        }
        errors: list[str] = []
        notices: list[str] = []
        MODULE.check_claim_drift(self._manifest("COMPLETE"), capabilities, errors, notices)
        self.assertTrue(
            any("does not count as implemented runtime" in error for error in errors)
        )

    def test_full_evidence_under_an_incomplete_claim_only_notices(self) -> None:
        capabilities = {"CAP_ONE": MODULE.Capability("CAP_ONE", MODULE.MET, "evidence")}
        errors: list[str] = []
        notices: list[str] = []
        MODULE.check_claim_drift(
            self._manifest(MODULE.INCOMPLETE_STATUS), capabilities, errors, notices
        )
        self.assertEqual(errors, [])
        self.assertTrue(any("creator decision" in notice for notice in notices))

    def test_a_declared_capability_without_a_probe_fails(self) -> None:
        errors: list[str] = []
        notices: list[str] = []
        MODULE.check_claim_drift(
            self._manifest(MODULE.INCOMPLETE_STATUS), {}, errors, notices
        )
        self.assertTrue(any("no probe in this" in error for error in errors))


class RepositoryStateTests(unittest.TestCase):
    def test_the_repository_passes_structural_conformance(self) -> None:
        with contextlib.redirect_stdout(io.StringIO()):
            exit_code = MODULE.run()
        self.assertEqual(exit_code, 0)

    def test_every_declared_capability_is_probed_in_the_repository(self) -> None:
        manifest = MODULE.load_json(MODULE.MANIFEST_PATH)
        declared = set(manifest["firstExecutableSlice"]["requiredCapabilities"])
        spec = MODULE.load_yaml(MODULE.SPEC_PATH)
        fixture = MODULE.load_json(MODULE.FIXTURE_PATH)
        probed = set(MODULE.probe_capabilities(fixture, spec, 8))
        self.assertEqual(declared, probed)


if __name__ == "__main__":
    unittest.main()
