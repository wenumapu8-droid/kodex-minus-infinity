from __future__ import annotations

import unittest

from scripts.bridge_atlas_corpus_v1 import extract_kdx_rows, extract_ocin_rows


class ExtractKdxRowsTests(unittest.TestCase):
    """Direct coverage for extract_kdx_rows()'s admission filter, id
    numbering, title fallback, and role deduplication.

    The end-to-end tests in test_bridge_atlas_corpus.py only run this
    against the real, already-locked research/CORPUS_LOCK_V0_DRAFT.md,
    whose 15 rows all carry a `name` and never exercise the skip condition,
    the title fallback, or duplicate roles across scene_roles/interaction_roles.
    """

    def test_block_with_no_name_source_record_or_archive_is_skipped(self) -> None:
        self.assertEqual(extract_kdx_rows([{"status": "ARCHIVE_VERIFIED"}]), [])

    def test_title_falls_back_to_source_record_when_name_missing(self) -> None:
        rows = extract_kdx_rows([{"source_record": "PROTO-OBSERVE-001"}])
        self.assertEqual(rows[0].title, "PROTO-OBSERVE-001")

    def test_row_admitted_on_archive_alone(self) -> None:
        rows = extract_kdx_rows([{"archive": "kodex-observe-prototype.zip"}])
        self.assertEqual(len(rows), 1)

    def test_corpus_ids_number_sequentially_across_admitted_rows(self) -> None:
        blocks = [{"name": "FIRST"}, {"status": "ARCHIVE_VERIFIED"}, {"name": "THIRD"}]
        rows = extract_kdx_rows(blocks)
        # the empty middle block is skipped, so ids stay sequential over the
        # two admitted rows rather than reserving a gap for it.
        self.assertEqual([r.source_id for r in rows], ["SRC-KDX-CORPUS-001", "SRC-KDX-CORPUS-002"])

    def test_roles_combine_scene_and_interaction_roles_deduplicated_in_order(self) -> None:
        block = {
            "name": "ROLE-ROW",
            "scene_roles": ["ORIENT", "INSPECT", "ORIENT"],
            "interaction_roles": ["INSPECT", "TRANSFORM"],
        }
        rows = extract_kdx_rows([block])
        self.assertEqual(rows[0].roles, ["ORIENT", "INSPECT", "TRANSFORM"])

    def test_falsy_roles_are_dropped(self) -> None:
        block = {"name": "ROLE-ROW", "scene_roles": ["ORIENT", "", None]}
        rows = extract_kdx_rows([block])
        self.assertEqual(rows[0].roles, ["ORIENT"])

    def test_non_string_sha256_is_not_kept_as_checksum(self) -> None:
        rows = extract_kdx_rows([{"name": "ROW", "sha256": 12345}])
        self.assertIsNone(rows[0].checksum)

    def test_string_sha256_is_kept_as_checksum(self) -> None:
        rows = extract_kdx_rows([{"name": "ROW", "sha256": "abc123"}])
        self.assertEqual(rows[0].checksum, "abc123")

    def test_unknown_status_falls_back_to_default_source_class_and_epistemic(self) -> None:
        rows = extract_kdx_rows([{"name": "ROW", "status": "SOMETHING_NEW"}])
        row = rows[0]
        self.assertEqual(row.source_class, "CODE")
        self.assertEqual(row.epistemic, "NEEDS_CONFIRMATION")

    def test_known_status_maps_to_verified_epistemic(self) -> None:
        rows = extract_kdx_rows([{"name": "ROW", "status": "ARCHIVE_VERIFIED"}])
        self.assertEqual(rows[0].epistemic, "VERIFIED")

    def test_empty_blocks_produce_no_rows(self) -> None:
        self.assertEqual(extract_kdx_rows([]), [])


class ExtractOcinRowsTests(unittest.TestCase):
    """Direct coverage for extract_ocin_rows()'s admission filter, the two
    dedicated skip rules (excluded book/ref image, Artifact Altar
    cross-reference blocks), location fallback, and size_bytes parsing.

    The end-to-end tests only run this against the real corpus lock's 10
    admitted OCIN candidate rows, where none of those skip rules or the
    string-size_bytes branch is ever hit.
    """

    def test_block_with_no_drive_id_or_file_is_skipped(self) -> None:
        self.assertEqual(extract_ocin_rows([{"candidate_roles": ["INSPECT"]}]), [])

    def test_excluded_book_reference_drive_id_is_skipped(self) -> None:
        block = {"drive_id": "19YPYvRKRrwVybBBSV6ybVnlitnQE3EHL", "file": "cover.png"}
        self.assertEqual(extract_ocin_rows([block]), [])

    def test_block_referencing_an_existing_ocin_record_is_skipped(self) -> None:
        block = {"file": "altar-ref.png", "ocín_record": "OCIN-CAND-001"}
        self.assertEqual(extract_ocin_rows([block]), [])

    def test_block_with_approval_reference_is_skipped(self) -> None:
        block = {"file": "altar-ref.png", "approval": "pending"}
        self.assertEqual(extract_ocin_rows([block]), [])

    def test_location_uses_drive_prefix_when_drive_id_present(self) -> None:
        rows = extract_ocin_rows([{"drive_id": "abc123", "file": "photo.jpg"}])
        self.assertEqual(rows[0].location, "drive:abc123")

    def test_location_falls_back_to_folder_and_file_without_drive_id(self) -> None:
        rows = extract_ocin_rows([{"file": "photo.jpg", "source_folder": "OCIN/Raw"}])
        self.assertEqual(rows[0].location, "folder:OCIN/Raw/photo.jpg")

    def test_size_bytes_parsed_from_int(self) -> None:
        rows = extract_ocin_rows([{"file": "photo.jpg", "size_bytes": 4096}])
        self.assertEqual(rows[0].size_bytes, 4096)

    def test_size_bytes_parsed_from_digit_string(self) -> None:
        rows = extract_ocin_rows([{"file": "photo.jpg", "size_bytes": "4096"}])
        self.assertEqual(rows[0].size_bytes, 4096)

    def test_size_bytes_is_none_for_non_digit_value(self) -> None:
        rows = extract_ocin_rows([{"file": "photo.jpg", "size_bytes": "unknown"}])
        self.assertIsNone(rows[0].size_bytes)

    def test_candidate_roles_are_carried_through_unmodified(self) -> None:
        rows = extract_ocin_rows([{"file": "photo.jpg", "candidate_roles": ["INSPECT", "TRANSFORM"]}])
        self.assertEqual(rows[0].roles, ["INSPECT", "TRANSFORM"])

    def test_source_ids_number_sequentially_across_admitted_rows(self) -> None:
        blocks = [
            {"file": "a.jpg"},
            {"drive_id": "19YPYvRKRrwVybBBSV6ybVnlitnQE3EHL", "file": "excluded.png"},
            {"file": "b.jpg"},
        ]
        rows = extract_ocin_rows(blocks)
        self.assertEqual([r.source_id for r in rows], ["SRC-OCIN-CAND-001", "SRC-OCIN-CAND-002"])

    def test_creator_is_always_marked_confirmation_required(self) -> None:
        rows = extract_ocin_rows([{"file": "photo.jpg"}])
        self.assertEqual(rows[0].creator, "OCÍN / CREATOR CONFIRMATION REQUIRED")

    def test_empty_blocks_produce_no_rows(self) -> None:
        self.assertEqual(extract_ocin_rows([]), [])


if __name__ == "__main__":
    unittest.main()
