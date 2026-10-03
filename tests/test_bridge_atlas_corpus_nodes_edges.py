from __future__ import annotations

import unittest

from scripts.bridge_atlas_corpus_v1 import SourceRow, build_edges, build_nodes


def _row(source_id: str, corpus_role: str = "", **overrides: object) -> SourceRow:
    """Minimal SourceRow for direct build_nodes()/build_edges() coverage.

    The end-to-end tests in test_bridge_atlas_corpus.py only exercise these
    two functions through the real, already-locked research/CORPUS_LOCK_V0_DRAFT.md
    file, whose 25 rows never isolate the coordinate-assignment branches (the
    A/Y invariant logic START_HERE.md calls non-negotiable: never invent a
    letter beyond what the source itself declares) or the build_edges() node
    count edge cases. These tests call both functions directly, without
    touching the corpus file or the bridge's committed output under
    data/bridges/bridge-1-v0/.
    """
    defaults: dict[str, object] = {
        "source_id": source_id,
        "title": source_id,
        "creator": "Tester",
        "source_class": "CODE",
        "location": "test:location",
        "rights_status": "REFERENCE_ONLY",
        "privacy_status": "PUBLIC",
        "cultural_status": "STANDARD",
        "checksum": None,
        "repository": None,
        "path": None,
        "publication_status": "REVIEW",
        "epistemic": "VERIFIED",
        "roles": ["ORIENT"],
        "raw": {"corpus_role": corpus_role} if corpus_role else {},
    }
    defaults.update(overrides)
    return SourceRow(**defaults)  # type: ignore[arg-type]


class BuildNodesCoordinateAssignmentTests(unittest.TestCase):
    def test_common_origin_role_assigns_a(self) -> None:
        nodes = build_nodes([_row("SRC-1", corpus_role="COMMON_ORIGIN_AND_FIRST_COMMITTED_CHOICE")], [])
        self.assertEqual(nodes[0]["coordinateAssignment"], "A")

    def test_transparent_without_return_does_not_assign_y(self) -> None:
        nodes = build_nodes([_row("SRC-1", corpus_role="TRANSPARENT_LIVING_LINE_ORGANISM")], [])
        # "TRANSPARENT" alone (no "RETURN") must not assign Y. This is the
        # actual corpus_role of KDX-CORPUS-010 Helix Transparent in
        # research/CORPUS_LOCK_V0_DRAFT.md, so the real corpus lock never
        # exercises the true branch of this AND either.
        self.assertIsNone(nodes[0]["coordinateAssignment"])

    def test_return_without_transparent_does_not_assign_y(self) -> None:
        nodes = build_nodes([_row("SRC-1", corpus_role="RETURN_ECHO")], [])
        self.assertIsNone(nodes[0]["coordinateAssignment"])

    def test_return_and_transparent_together_assigns_y(self) -> None:
        nodes = build_nodes([_row("SRC-1", corpus_role="RETURN_TRANSPARENT_CARRY")], [])
        self.assertEqual(nodes[0]["coordinateAssignment"], "Y")

    def test_unrelated_role_assigns_no_coordinate(self) -> None:
        nodes = build_nodes([_row("SRC-1", corpus_role="OBSERVATION_CHANGES_CONTEXT")], [])
        self.assertIsNone(nodes[0]["coordinateAssignment"])

    def test_missing_corpus_role_assigns_no_coordinate(self) -> None:
        nodes = build_nodes([_row("SRC-1")], [])
        self.assertIsNone(nodes[0]["coordinateAssignment"])


class BuildNodesFieldMappingTests(unittest.TestCase):
    def test_node_id_strips_src_prefix(self) -> None:
        nodes = build_nodes([_row("SRC-KDX-CORPUS-001")], [])
        self.assertEqual(nodes[0]["id"], "NODE-KDX-CORPUS-001")

    def test_node_carries_epistemic_roles_rights_and_cultural_status(self) -> None:
        row = _row(
            "SRC-1",
            epistemic="NEEDS_CONFIRMATION",
            roles=["INSPECT", "TRANSFORM"],
            rights_status="UNKNOWN",
            cultural_status="REVIEW_REQUIRED",
        )
        nodes = build_nodes([row], [])
        node = nodes[0]
        self.assertEqual(node["epistemicStatus"], "NEEDS_CONFIRMATION")
        self.assertEqual(node["roles"], ["INSPECT", "TRANSFORM"])
        self.assertEqual(node["rightsStatus"], "UNKNOWN")
        self.assertEqual(node["culturalStatus"], "REVIEW_REQUIRED")
        self.assertEqual(node["sourceIds"], ["SRC-1"])

    def test_visual_and_research_rows_are_combined_and_sorted_by_id(self) -> None:
        visual = [_row("SRC-KDX-CORPUS-002"), _row("SRC-KDX-CORPUS-001")]
        research = [_row("SRC-OCIN-CAND-001")]
        nodes = build_nodes(visual, research)
        self.assertEqual(
            [n["id"] for n in nodes],
            ["NODE-KDX-CORPUS-001", "NODE-KDX-CORPUS-002", "NODE-OCIN-CAND-001"],
        )

    def test_empty_input_produces_no_nodes(self) -> None:
        self.assertEqual(build_nodes([], []), [])


class BuildEdgesTests(unittest.TestCase):
    def test_empty_nodes_produce_no_edges(self) -> None:
        self.assertEqual(build_edges([]), [])

    def test_single_node_produces_no_edges(self) -> None:
        nodes = build_nodes([_row("SRC-1")], [])
        self.assertEqual(build_edges(nodes), [])

    def test_two_nodes_produce_one_edge_in_sorted_order(self) -> None:
        nodes = build_nodes([_row("SRC-B"), _row("SRC-A")], [])
        edges = build_edges(nodes)
        self.assertEqual(len(edges), 1)
        self.assertEqual(edges[0]["from"], "NODE-A")
        self.assertEqual(edges[0]["to"], "NODE-B")
        self.assertEqual(edges[0]["type"], "RELATED")
        self.assertEqual(edges[0]["certainty"], "CONFIRMED")
        self.assertEqual(edges[0]["id"], "EDGE-001")

    def test_every_edge_endpoint_is_a_known_node(self) -> None:
        rows = [_row(f"SRC-{i}") for i in range(6)]
        nodes = build_nodes(rows, [])
        edges = build_edges(nodes)
        node_ids = {n["id"] for n in nodes}
        self.assertTrue(edges, "expected at least one edge for 6 nodes")
        for edge in edges:
            self.assertIn(edge["from"], node_ids)
            self.assertIn(edge["to"], node_ids)

    def test_edges_only_originate_from_the_first_three_sorted_nodes(self) -> None:
        # Documents build_edges()'s actual (not necessarily obvious) behavior:
        # the inner loop breaks as soon as the outer index reaches 3, so nodes
        # at sorted position 3+ never appear as an edge's "from" endpoint.
        rows = [_row(f"SRC-{i}") for i in range(5)]
        nodes = build_nodes(rows, [])
        edges = build_edges(nodes)
        ordered_ids = [n["id"] for n in nodes]
        froms = {e["from"] for e in edges}
        self.assertEqual(froms, set(ordered_ids[:3]))
        self.assertEqual(len(edges), 9)

    def test_edge_ids_are_sequential_and_sorted(self) -> None:
        rows = [_row(f"SRC-{i}") for i in range(4)]
        nodes = build_nodes(rows, [])
        edges = build_edges(nodes)
        self.assertEqual([e["id"] for e in edges], sorted(e["id"] for e in edges))
        self.assertEqual(edges[0]["id"], "EDGE-001")
        self.assertEqual(edges[-1]["id"], f"EDGE-{len(edges):03d}")


if __name__ == "__main__":
    unittest.main()
