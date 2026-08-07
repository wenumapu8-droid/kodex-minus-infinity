from __future__ import annotations

import unittest

from scripts.factory_router import load_profile_names, route_packet


class FactoryRouterTests(unittest.TestCase):
    def test_registry_profiles_load(self) -> None:
        profiles = load_profile_names()
        self.assertIn("ORCHESTRATOR", profiles)
        self.assertIn("BOUNDED_CODING_AGENT", profiles)
        self.assertIn("MULTIMODAL_VISUAL_SPEC", profiles)

    def test_runtime_c2_routes_to_bounded_coder_and_long_context_review(self) -> None:
        packet = {
            "id": "KDX-WP-RUNTIME-01",
            "lane": "RUNTIME",
            "modality": "PURE_RUNTIME_LOGIC",
            "complexity": "C2",
            "dependencies": [],
            "may_edit": ["src/journeyState.ts", "src/journeyState.test.ts"],
            "read_only_context": ["data/alphabet-topology.json"],
        }
        result = route_packet(packet, {})
        self.assertEqual(result["decision"], "READY")
        self.assertEqual(result["producer_profile"], "BOUNDED_CODING_AGENT")
        self.assertEqual(result["reviewer_profile"], "LONG_CONTEXT_ARCHITECT")
        self.assertFalse(result["factory_event"]["deployment_authorized"])

    def test_missing_dependency_blocks_dispatch(self) -> None:
        packet = {
            "id": "KDX-WP-RUNTIME-02",
            "lane": "RUNTIME",
            "modality": "PURE_RUNTIME_LOGIC",
            "complexity": "C2",
            "dependencies": ["KOD-26"],
            "may_edit": ["src/journeyGraph.ts"],
        }
        result = route_packet(packet, {"completed_packets": []})
        self.assertEqual(result["decision"], "BLOCKED")
        self.assertIn("hard_dependencies_not_ready", result["blockers"])
        self.assertEqual(result["missing_dependencies"], ["KOD-26"])

    def test_frozen_dependency_satisfies_gate(self) -> None:
        packet = {
            "id": "KDX-WP-RUNTIME-02",
            "lane": "RUNTIME",
            "modality": "PURE_RUNTIME_LOGIC",
            "complexity": "C2",
            "dependencies": ["KOD-26"],
            "may_edit": ["src/journeyGraph.ts"],
        }
        result = route_packet(packet, {"frozen_dependencies": ["KOD-26"]})
        self.assertEqual(result["decision"], "READY")

    def test_file_ownership_conflict_blocks_dispatch(self) -> None:
        packet = {
            "id": "KDX-WP-RUNTIME-03",
            "lane": "RUNTIME",
            "modality": "PURE_RUNTIME_LOGIC",
            "complexity": "C2",
            "dependencies": [],
            "may_edit": ["src/edgeResolver.ts", "src/shared.ts"],
        }
        state = {
            "running_packets": [
                {
                    "packet_id": "OTHER",
                    "owned_files": ["src/shared.ts", "src/other.ts"],
                }
            ]
        }
        result = route_packet(packet, state)
        self.assertEqual(result["decision"], "BLOCKED")
        self.assertIn("file_ownership_conflict", result["blockers"])
        self.assertEqual(result["file_conflicts"][0]["files"], ["src/shared.ts"])

    def test_visual_spec_routes_through_multimodal_station(self) -> None:
        packet = {
            "id": "KDX-WP-VISUAL-01",
            "lane": "VISUAL",
            "modality": "VISUAL_SPEC",
            "complexity": "C1",
            "dependencies": [],
            "may_edit": [],
            "source_inputs": ["concept-field-of-eyes"],
        }
        result = route_packet(packet, {})
        self.assertEqual(result["producer_profile"], "MULTIMODAL_VISUAL_SPEC")
        self.assertIn("VISUAL_PASSPORT", result["quality_gates"])
        self.assertEqual(result["required_context"], ["concept-field-of-eyes"])

    def test_c3_implementation_uses_long_context_integration(self) -> None:
        packet = {
            "id": "KDX-WP-INTEGRATE-01",
            "lane": "INTEGRATION",
            "modality": "UI_INTEGRATION",
            "complexity": "C3",
            "dependencies": [],
            "may_edit": ["src/KodexScene.astro"],
        }
        result = route_packet(packet, {})
        self.assertEqual(result["producer_profile"], "LONG_CONTEXT_ARCHITECT")
        self.assertEqual(result["reviewer_profile"], "BOUNDED_CODING_AGENT")

    def test_reviewer_capacity_can_block_ready_packet(self) -> None:
        packet = {
            "id": "KDX-WP-RUNTIME-04",
            "lane": "RUNTIME",
            "modality": "PURE_RUNTIME_LOGIC",
            "complexity": "C2",
            "dependencies": [],
            "may_edit": ["src/x.ts"],
        }
        result = route_packet(packet, {"reviewer_capacity": {"LONG_CONTEXT_ARCHITECT": 0}})
        self.assertEqual(result["decision"], "BLOCKED")
        self.assertIn("reviewer_capacity_unavailable", result["blockers"])

    def test_same_input_is_deterministic(self) -> None:
        packet = {
            "id": "KDX-WP-DATA-01",
            "lane": "DATA_CANON",
            "modality": "DATA_INGESTION",
            "complexity": "C1",
            "dependencies": [],
            "may_edit": ["data/out.json"],
        }
        state = {"completed_packets": [], "running_packets": []}
        self.assertEqual(route_packet(packet, state), route_packet(packet, state))

    def test_unknown_modality_rejected(self) -> None:
        packet = {
            "id": "KDX-WP-UNKNOWN",
            "lane": "OTHER",
            "modality": "MAGIC",
            "complexity": "C1",
        }
        with self.assertRaises(ValueError):
            route_packet(packet, {})


if __name__ == "__main__":
    unittest.main()
