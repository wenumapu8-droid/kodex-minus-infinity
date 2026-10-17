"""KDX-WP-002: positive and negative V1 authority contract tests."""
import copy
import sys
import unittest
from pathlib import Path
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
import validate_context as validator


class V1AuthorityTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.manifest = validator.load_json("PROJECT_MANIFEST.json")
        cls.graph = validator.load_json("data/experience-graph.json")
        cls.alphabet = validator.load_json("data/alphabet-topology.json")

    def check(self, manifest=None, graph=None, alphabet=None):
        data = {
            "PROJECT_MANIFEST.json": copy.deepcopy(manifest if manifest is not None else self.manifest),
            "data/experience-graph.json": copy.deepcopy(graph if graph is not None else self.graph),
            "data/alphabet-topology.json": copy.deepcopy(alphabet if alphabet is not None else self.alphabet),
        }
        with patch.object(validator, "load_json", side_effect=lambda path: data[path]):
            errors = []
            validator.validate_v1_authority(errors)
            return errors

    def test_current_v1_passes(self):
        self.assertEqual(self.check(), [])

    def test_alphabet_remains_complete_historical_record(self):
        self.assertEqual(self.alphabet["letters"], validator.EXPECTED_LETTERS)
        self.assertFalse(self.alphabet["implementationAuthority"])

    def test_active_alphabet_graph_rejected(self):
        graph = copy.deepcopy(self.graph)
        graph["status"] = "CANONICAL_TOPOLOGY_PARTIAL_IMPLEMENTATION"
        self.assertTrue(self.check(graph=graph))

    def test_legacy_registry_with_authority_rejected(self):
        alphabet = copy.deepcopy(self.alphabet)
        alphabet["implementationAuthority"] = True
        self.assertTrue(self.check(alphabet=alphabet))

    def test_eighth_scene_rejected(self):
        manifest = copy.deepcopy(self.manifest)
        manifest["currentReleaseArchitecture"]["scenes"].append("07_OFFERING")
        self.assertTrue(self.check(manifest=manifest))

    def test_wrong_scene_order_rejected(self):
        manifest = copy.deepcopy(self.manifest)
        scenes = manifest["currentReleaseArchitecture"]["scenes"]
        scenes[2], scenes[3] = scenes[3], scenes[2]
        self.assertTrue(self.check(manifest=manifest))

    def test_alphabet_manifest_promotion_rejected(self):
        manifest = copy.deepcopy(self.manifest)
        manifest["historicalTopology"]["implementationAuthority"] = True
        self.assertTrue(self.check(manifest=manifest))

    def test_unverified_release_branch_rejected(self):
        manifest = copy.deepcopy(self.manifest)
        manifest["repositories"]["implementation"]["releaseBranch"] = "redesign-v2"
        self.assertTrue(self.check(manifest=manifest))


if __name__ == "__main__":
    unittest.main()
