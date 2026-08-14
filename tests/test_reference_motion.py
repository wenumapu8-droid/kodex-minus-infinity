import json
import re
import unittest
from collections import Counter
from pathlib import Path

import yaml
from jsonschema import Draft202012Validator


ROOT = Path(__file__).resolve().parents[1]
MOTION_DIR = ROOT / "research" / "reference-motion"
SCHEMA_PATH = MOTION_DIR / "REFERENCE_MOTION_BLUEPRINT.schema.json"
REGISTRY_PATH = MOTION_DIR / "MOTION_BLUEPRINT_REGISTRY.yaml"
BLUEPRINT_PATTERN = "KDX-MOTION-REF-*.yaml"


def load_yaml(path: Path):
    with path.open("r", encoding="utf-8") as handle:
        return yaml.safe_load(handle)


class ReferenceMotionResearchValidationTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.schema = json.loads(SCHEMA_PATH.read_text(encoding="utf-8"))
        Draft202012Validator.check_schema(cls.schema)
        cls.validator = Draft202012Validator(cls.schema)
        cls.blueprint_paths = sorted(MOTION_DIR.glob(BLUEPRINT_PATTERN))
        cls.blueprints = [(path, load_yaml(path)) for path in cls.blueprint_paths]
        cls.registry = load_yaml(REGISTRY_PATH)

    def test_materialized_blueprints_are_contiguous_001_through_009(self):
        self.assertEqual(len(self.blueprint_paths), 9)
        numbers = []
        for path in self.blueprint_paths:
            match = re.fullmatch(r"KDX-MOTION-REF-(\d{3})\.yaml", path.name)
            self.assertIsNotNone(match, path.name)
            numbers.append(int(match.group(1)))
        self.assertEqual(numbers, list(range(1, 10)))

    def test_every_blueprint_is_valid_against_json_schema(self):
        failures = []
        for path, blueprint in self.blueprints:
            errors = sorted(self.validator.iter_errors(blueprint), key=lambda error: list(error.path))
            for error in errors:
                location = ".".join(str(part) for part in error.path) or "<root>"
                failures.append(f"{path.name}:{location}: {error.message}")
        self.assertEqual(failures, [], "\n" + "\n".join(failures))

    def test_blueprint_ids_match_filenames_and_are_unique(self):
        ids = []
        for path, blueprint in self.blueprints:
            expected = path.stem
            self.assertEqual(blueprint["id"], expected)
            ids.append(blueprint["id"])
        self.assertEqual(len(ids), len(set(ids)))

    def test_materialized_source_asset_ids_are_nonempty_and_unique(self):
        asset_ids = [blueprint["source"]["asset_id"] for _, blueprint in self.blueprints]
        self.assertTrue(all(isinstance(asset_id, str) and asset_id.strip() for asset_id in asset_ids))
        duplicates = sorted(asset_id for asset_id, count in Counter(asset_ids).items() if count > 1)
        self.assertEqual(duplicates, [], f"duplicate materialized source asset IDs: {duplicates}")

    def test_registry_candidate_blueprint_and_source_ids_are_unique(self):
        entries = self.registry["entries"]
        self.assertEqual(len(entries), 20)

        candidate_ids = [entry["candidate_id"] for entry in entries]
        self.assertEqual(len(candidate_ids), len(set(candidate_ids)))

        blueprint_ids = [entry["blueprint_id"] for entry in entries if entry.get("blueprint_id")]
        self.assertEqual(len(blueprint_ids), len(set(blueprint_ids)))

        sources = [entry["source"] for entry in entries]
        duplicates = sorted(source for source, count in Counter(sources).items() if count > 1)
        self.assertEqual(duplicates, [], f"duplicate registry sources: {duplicates}")

    def test_registry_materialized_blueprints_match_files_exactly(self):
        file_ids = {blueprint["id"] for _, blueprint in self.blueprints}
        registry_ids = {
            entry["blueprint_id"]
            for entry in self.registry["entries"]
            if entry.get("blueprint_id")
        }
        self.assertEqual(registry_ids, file_ids)

    def test_registry_source_matches_each_materialized_blueprint_source(self):
        registry_by_blueprint = {
            entry["blueprint_id"]: entry
            for entry in self.registry["entries"]
            if entry.get("blueprint_id")
        }
        mismatches = []
        for _, blueprint in self.blueprints:
            blueprint_id = blueprint["id"]
            registry_source = registry_by_blueprint[blueprint_id]["source"]
            asset_id = blueprint["source"]["asset_id"]
            if registry_source != asset_id:
                mismatches.append(
                    f"{blueprint_id}: registry source={registry_source!r}; blueprint source.asset_id={asset_id!r}"
                )
        self.assertEqual(mismatches, [], "\n" + "\n".join(mismatches))

    def test_registry_summary_matches_entries(self):
        entries = self.registry["entries"]
        summary = self.registry["summary"]
        dispositions = Counter(entry["disposition"] for entry in entries)

        self.assertEqual(summary["candidates_audited"], len(entries))
        self.assertEqual(summary["disposition_counts"], dict(dispositions))

        materialized = sum(1 for entry in entries if entry.get("blueprint_id"))
        pending_internal = sum(
            1
            for entry in entries
            if entry["disposition"] == "BLUEPRINT"
            and not entry.get("blueprint_id")
            and entry["source_class"] == "INTERNAL_MOTION_REFERENCE_CARD"
        )
        self.assertEqual(summary["materialized_reference_blueprints"], materialized)
        self.assertEqual(summary["pending_internal_blueprint_candidates"], pending_internal)
        self.assertEqual(summary["runtime_implemented"], 0)

    def test_all_materialized_blueprints_remain_not_implemented(self):
        statuses = {
            blueprint["id"]: blueprint["validation"]["implementation_status"]
            for _, blueprint in self.blueprints
        }
        self.assertTrue(all(status == "NOT_IMPLEMENTED" for status in statuses.values()), statuses)


if __name__ == "__main__":
    unittest.main()
