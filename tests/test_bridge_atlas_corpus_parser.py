from __future__ import annotations

import unittest

from scripts.bridge_atlas_corpus_v1 import parse_yaml_blocks


class ParseYamlBlocksTests(unittest.TestCase):
    """Direct coverage for the flat YAML-block parser.

    The end-to-end tests in test_bridge_atlas_corpus.py only exercise this
    parser through the real, already-locked research/CORPUS_LOCK_V0_DRAFT.md
    file, whose fields never hit several branches the parser code supports
    (json-list fallback, true/false/null, the bare "-" empty-list marker).
    These tests isolate parse_yaml_blocks() to cover those branches directly,
    without touching the corpus file or the bridge's generated output.
    """

    def test_flow_list_with_unquoted_items_falls_back_to_comma_split(self) -> None:
        markdown = "```yaml\nworlds: [ARTIFACT_WORLD, MACHINE_WORLD]\n```\n"
        blocks = parse_yaml_blocks(markdown)
        self.assertEqual(blocks, [{"worlds": ["ARTIFACT_WORLD", "MACHINE_WORLD"]}])

    def test_flow_list_that_is_valid_json_parses_via_json_loads(self) -> None:
        markdown = '```yaml\nworlds: ["ARTIFACT_WORLD", "MACHINE_WORLD"]\n```\n'
        blocks = parse_yaml_blocks(markdown)
        self.assertEqual(blocks, [{"worlds": ["ARTIFACT_WORLD", "MACHINE_WORLD"]}])

    def test_empty_flow_list_parses_to_empty_list(self) -> None:
        markdown = "```yaml\nworlds: []\n```\n"
        blocks = parse_yaml_blocks(markdown)
        self.assertEqual(blocks, [{"worlds": []}])

    def test_bare_hyphen_marker_parses_to_empty_list(self) -> None:
        markdown = "```yaml\nnotes: -\n```\n"
        blocks = parse_yaml_blocks(markdown)
        self.assertEqual(blocks, [{"notes": []}])

    def test_true_false_null_scalars(self) -> None:
        markdown = "```yaml\na: true\nb: false\nc: null\n```\n"
        blocks = parse_yaml_blocks(markdown)
        self.assertEqual(blocks, [{"a": True, "b": False, "c": None}])

    def test_quoted_string_containing_a_colon_keeps_full_value(self) -> None:
        markdown = '```yaml\ntitle: "Something: Subtitle"\n```\n'
        blocks = parse_yaml_blocks(markdown)
        self.assertEqual(blocks, [{"title": "Something: Subtitle"}])

    def test_indented_lines_and_comments_are_skipped(self) -> None:
        markdown = (
            "```yaml\n"
            "# a leading comment\n"
            "name: KEEP\n"
            "  nested_line: DROPPED\n"
            "\n"
            "status: ARCHIVE_VERIFIED\n"
            "```\n"
        )
        blocks = parse_yaml_blocks(markdown)
        self.assertEqual(blocks, [{"name": "KEEP", "status": "ARCHIVE_VERIFIED"}])

    def test_multiple_blocks_are_returned_in_document_order(self) -> None:
        markdown = (
            "```yaml\nname: FIRST\n```\n"
            "some prose in between\n"
            "```yml\nname: SECOND\n```\n"
        )
        blocks = parse_yaml_blocks(markdown)
        self.assertEqual([b["name"] for b in blocks], ["FIRST", "SECOND"])

    def test_non_yaml_fenced_blocks_are_ignored(self) -> None:
        markdown = "```text\nname: NOT_A_YAML_BLOCK\n```\n"
        blocks = parse_yaml_blocks(markdown)
        self.assertEqual(blocks, [])


if __name__ == "__main__":
    unittest.main()
