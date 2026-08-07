from __future__ import annotations

import unittest

from scripts.factory_metrics import summarize_packets


class FactoryMetricsTests(unittest.TestCase):
    def test_empty_summary_is_stable(self) -> None:
        summary = summarize_packets([])
        self.assertEqual(summary["packet_count"], 0)
        self.assertEqual(summary["verified_throughput"], 0)
        self.assertIsNone(summary["median_cycle_time_seconds"])
        self.assertIsNone(summary["first_pass_yield"])

    def test_computes_core_factory_metrics(self) -> None:
        packets = [
            {
                "packet_id": "A",
                "lane": "RUNTIME",
                "timestamps": {
                    "ready_at": "2026-08-07T10:00:00Z",
                    "running_at": "2026-08-07T10:10:00Z",
                    "done_at": "2026-08-07T11:10:00Z",
                },
                "blocked_intervals": [
                    {"start": "2026-08-07T10:20:00Z", "end": "2026-08-07T10:30:00Z"}
                ],
                "first_pass_yield": True,
                "rework_count": 0,
                "tests_passed": True,
                "integration_result": "PASS",
                "reusable_outputs": ["fixture"],
                "handoff_required_fields": 5,
                "handoff_completed_fields": 5,
                "commit_sha": "abc",
                "evidence_urls": [],
                "rework_causes": [],
                "recipe_feedback": {"bottleneck_class": "REVIEW_CAPACITY"},
            },
            {
                "packet_id": "B",
                "lane": "VISUAL",
                "timestamps": {
                    "ready_at": "2026-08-07T12:00:00Z",
                    "running_at": "2026-08-07T12:30:00Z",
                    "done_at": "2026-08-07T14:30:00Z",
                },
                "blocked_time_seconds": 1200,
                "first_pass_yield": False,
                "rework_count": 1,
                "tests_passed": True,
                "integration_result": "FAIL",
                "reusable_outputs": [],
                "handoff_required_fields": 4,
                "handoff_completed_fields": 4,
                "evidence_urls": ["https://example.test/evidence"],
                "rework_causes": ["SPEC_AMBIGUITY"],
                "recipe_feedback": {"bottleneck_class": "REVIEW_CAPACITY"},
            },
            {
                "packet_id": "C",
                "lane": "DATA_CANON",
                "timestamps": {
                    "ready_at": "2026-08-07T15:00:00Z",
                    "running_at": "2026-08-07T15:10:00Z",
                    "done_at": "",
                },
                "blocked_time_seconds": 0,
                "first_pass_yield": None,
                "rework_count": 0,
                "tests_passed": None,
                "integration_result": "NOT_ATTEMPTED",
                "reusable_outputs": [],
                "handoff_required_fields": 0,
                "handoff_completed_fields": 0,
                "evidence_urls": [],
                "rework_causes": [],
                "recipe_feedback": {},
            },
        ]

        summary = summarize_packets(packets)
        self.assertEqual(summary["packet_count"], 3)
        self.assertEqual(summary["verified_throughput"], 2)
        self.assertEqual(summary["completed_packets"], 2)
        self.assertEqual(summary["wip_by_lane"], {"DATA_CANON": 1})
        self.assertEqual(summary["median_cycle_time_seconds"], 5400.0)
        self.assertEqual(summary["median_lead_time_seconds"], 6300.0)
        self.assertEqual(summary["blocked_time_seconds"], 1800.0)
        self.assertAlmostEqual(summary["blocked_time_share"], 1800.0 / 10800.0)
        self.assertEqual(summary["first_pass_yield"], 0.5)
        self.assertEqual(summary["rework_rate"], 0.5)
        self.assertEqual(summary["integration_failure_rate"], 0.5)
        self.assertEqual(summary["reuse_ratio"], 0.5)
        self.assertEqual(
            summary["repeated_blocker_classes"][0],
            {"class": "REVIEW_CAPACITY", "count": 2},
        )

    def test_failed_tests_prevent_verified_throughput(self) -> None:
        packets = [
            {
                "timestamps": {"running_at": "2026-08-07T10:00:00Z", "done_at": "2026-08-07T10:01:00Z"},
                "tests_passed": False,
                "commit_sha": "abc",
                "handoff_required_fields": 1,
                "handoff_completed_fields": 1,
            }
        ]
        self.assertEqual(summarize_packets(packets)["verified_throughput"], 0)

    def test_incomplete_handoff_prevents_verified_throughput(self) -> None:
        packets = [
            {
                "timestamps": {"running_at": "2026-08-07T10:00:00Z", "done_at": "2026-08-07T10:01:00Z"},
                "tests_passed": True,
                "commit_sha": "abc",
                "handoff_required_fields": 3,
                "handoff_completed_fields": 2,
            }
        ]
        self.assertEqual(summarize_packets(packets)["verified_throughput"], 0)

    def test_negative_interval_rejected(self) -> None:
        packets = [
            {
                "timestamps": {
                    "running_at": "2026-08-07T11:00:00Z",
                    "done_at": "2026-08-07T10:00:00Z",
                }
            }
        ]
        with self.assertRaises(ValueError):
            summarize_packets(packets)

    def test_invalid_integration_enum_rejected(self) -> None:
        with self.assertRaises(ValueError):
            summarize_packets([{"timestamps": {}, "integration_result": "MAYBE"}])


if __name__ == "__main__":
    unittest.main()
