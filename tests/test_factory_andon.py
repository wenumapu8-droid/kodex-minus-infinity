from __future__ import annotations

import unittest

from scripts.factory_andon import build_notification, event_dedupe_key, format_telegram, validate_event


def base_event(**overrides):
    event = {
        "event_id": "evt-1",
        "packet_id": "KDX-WP-01",
        "lane": "RUNTIME",
        "severity": "REVIEW",
        "source": "GITHUB",
        "status": "REVIEW",
        "summary": "Packet ready for architecture review.",
        "evidence_urls": ["https://github.com/example/repo/pull/1"],
        "commit_sha": "abc123",
        "pull_request": "https://github.com/example/repo/pull/1",
        "human_action_required": False,
        "requested_action": "",
        "blocker_class": "",
        "next_owner": "LONG_CONTEXT_ARCHITECT",
        "created_at": "2026-08-07T21:00:00Z",
        "deployment_authorized": False,
        "notification_reason": "pull_request_ready",
    }
    event.update(overrides)
    return event


class FactoryAndonTests(unittest.TestCase):
    def test_review_event_formats_public_safe_message(self) -> None:
        event = base_event()
        result = build_notification(event)
        self.assertTrue(result["notify"])
        self.assertIn("KODEX FACTORY · REVIEW", result["telegram_text"])
        self.assertIn("https://github.com/example/repo/pull/1", result["telegram_text"])
        self.assertIn("NO constituye autorización", result["telegram_text"])
        self.assertFalse(result["deployment_authorized"])

    def test_info_without_operational_reason_is_suppressed(self) -> None:
        event = base_event(
            severity="INFO",
            status="DONE",
            notification_reason="worker_step_completed",
        )
        result = build_notification(event)
        self.assertFalse(result["notify"])
        self.assertEqual(result["reason"], "info_event_not_operationally_relevant")

    def test_batch_completed_info_is_notified(self) -> None:
        event = base_event(
            packet_id="",
            severity="INFO",
            status="DONE",
            notification_reason="batch_completed",
        )
        self.assertTrue(build_notification(event)["notify"])

    def test_duplicate_event_state_is_suppressed(self) -> None:
        event = base_event()
        key = event_dedupe_key(event)
        result = build_notification(event, {key})
        self.assertFalse(result["notify"])
        self.assertEqual(result["reason"], "duplicate_event_state")

    def test_event_id_change_does_not_break_deduplication(self) -> None:
        first = base_event(event_id="evt-1")
        second = base_event(event_id="evt-2")
        self.assertEqual(event_dedupe_key(first), event_dedupe_key(second))

    def test_human_action_is_explicit(self) -> None:
        event = base_event(
            severity="ACTION",
            status="BLOCKED",
            human_action_required=True,
            requested_action="Ocín must approve the canon decision.",
            blocker_class="CANON_DECISION_REQUIRED",
        )
        message = format_telegram(event)
        self.assertIn("ACCIÓN HUMANA: Ocín must approve the canon decision.", message)
        self.assertIn("Bloqueo: CANON_DECISION_REQUIRED", message)

    def test_human_action_requires_requested_action(self) -> None:
        with self.assertRaises(ValueError):
            validate_event(base_event(human_action_required=True, requested_action=""))

    def test_deployment_authorization_is_rejected(self) -> None:
        with self.assertRaises(ValueError):
            validate_event(base_event(deployment_authorized=True))

    def test_unknown_fields_are_rejected_to_prevent_private_payloads(self) -> None:
        with self.assertRaises(ValueError):
            validate_event(base_event(api_token="secret"))

    def test_invalid_evidence_url_is_rejected(self) -> None:
        with self.assertRaises(ValueError):
            validate_event(base_event(evidence_urls=["file:///private/path"]))


if __name__ == "__main__":
    unittest.main()
