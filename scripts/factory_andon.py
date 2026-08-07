#!/usr/bin/env python3
"""Validate KODEX Factory events and format Hermes/Telegram Andon alerts.

This module does not send network requests. It creates a public-safe,
deduplicatable notification payload that an external Hermes integration can
consume. A notification is never treated as merge or deployment authority.
"""

from __future__ import annotations

import hashlib
import json
import sys
from pathlib import Path
from typing import Any
from urllib.parse import urlparse

SEVERITIES = {"INFO", "ACTION", "BLOCKED", "FAILURE", "REVIEW", "QA", "RELEASE_GATE"}
SOURCES = {"GITHUB", "LINEAR", "DRIVE", "WORKER", "CI", "INTEGRATION", "RELEASE_AUDIT"}
STATUSES = {"READY", "RUNNING", "BLOCKED", "REVIEW", "QA", "DONE", "FAILED"}
INFO_REASONS = {"batch_completed", "scheduled_summary"}

ALLOWED_FIELDS = {
    "event_id",
    "packet_id",
    "lane",
    "severity",
    "source",
    "status",
    "summary",
    "evidence_urls",
    "commit_sha",
    "pull_request",
    "human_action_required",
    "requested_action",
    "blocker_class",
    "next_owner",
    "created_at",
    "deployment_authorized",
    "notification_reason",
}

EMOJI = {
    "INFO": "🟢",
    "ACTION": "🟡",
    "BLOCKED": "🟠",
    "FAILURE": "🔴",
    "REVIEW": "🔵",
    "QA": "🟣",
    "RELEASE_GATE": "⚪",
}


def _require_string(event: dict[str, Any], field: str, *, allow_empty: bool = False) -> str:
    value = event.get(field)
    if not isinstance(value, str):
        raise ValueError(f"{field} must be a string")
    if not allow_empty and not value.strip():
        raise ValueError(f"{field} cannot be empty")
    return value


def _validate_url(url: str) -> None:
    parsed = urlparse(url)
    if parsed.scheme not in {"http", "https"} or not parsed.netloc:
        raise ValueError(f"invalid evidence URL: {url!r}")


def validate_event(event: dict[str, Any]) -> dict[str, Any]:
    if not isinstance(event, dict):
        raise ValueError("factory event must be an object")

    unknown = sorted(set(event) - ALLOWED_FIELDS)
    if unknown:
        raise ValueError(f"unknown/private event fields are not allowed: {unknown}")

    _require_string(event, "event_id")
    _require_string(event, "packet_id", allow_empty=True)
    _require_string(event, "lane", allow_empty=True)
    severity = _require_string(event, "severity")
    source = _require_string(event, "source")
    status = _require_string(event, "status")
    _require_string(event, "summary")

    if severity not in SEVERITIES:
        raise ValueError(f"invalid severity: {severity!r}")
    if source not in SOURCES:
        raise ValueError(f"invalid source: {source!r}")
    if status not in STATUSES:
        raise ValueError(f"invalid status: {status!r}")

    evidence_urls = event.get("evidence_urls", [])
    if not isinstance(evidence_urls, list) or not all(isinstance(url, str) for url in evidence_urls):
        raise ValueError("evidence_urls must be a list of strings")
    for url in evidence_urls:
        _validate_url(url)

    for field in ("commit_sha", "pull_request", "requested_action", "blocker_class", "next_owner", "created_at", "notification_reason"):
        value = event.get(field, "")
        if not isinstance(value, str):
            raise ValueError(f"{field} must be a string")

    human_action = event.get("human_action_required", False)
    deployment_authorized = event.get("deployment_authorized", False)
    if not isinstance(human_action, bool):
        raise ValueError("human_action_required must be boolean")
    if not isinstance(deployment_authorized, bool):
        raise ValueError("deployment_authorized must be boolean")
    if deployment_authorized:
        raise ValueError("factory notifications cannot authorize deployment")

    if human_action and not event.get("requested_action", "").strip():
        raise ValueError("human-action events require requested_action")

    return event


def event_dedupe_key(event: dict[str, Any]) -> str:
    validated = validate_event(event)
    stable = {
        "packet_id": validated.get("packet_id", ""),
        "severity": validated["severity"],
        "source": validated["source"],
        "status": validated["status"],
        "summary": validated["summary"],
        "blocker_class": validated.get("blocker_class", ""),
        "requested_action": validated.get("requested_action", ""),
        "pull_request": validated.get("pull_request", ""),
        "commit_sha": validated.get("commit_sha", ""),
    }
    encoded = json.dumps(stable, sort_keys=True, separators=(",", ":")).encode("utf-8")
    return hashlib.sha256(encoded).hexdigest()


def should_notify(event: dict[str, Any], seen_keys: set[str] | None = None) -> tuple[bool, str]:
    validated = validate_event(event)
    key = event_dedupe_key(validated)
    if seen_keys and key in seen_keys:
        return False, "duplicate_event_state"

    if validated["severity"] == "INFO":
        reason = validated.get("notification_reason", "")
        if reason not in INFO_REASONS:
            return False, "info_event_not_operationally_relevant"

    return True, "notify"


def format_telegram(event: dict[str, Any]) -> str:
    event = validate_event(event)
    severity = event["severity"]
    packet = event.get("packet_id") or "FACTORY"
    lines = [
        f"{EMOJI[severity]} KODEX FACTORY · {severity}",
        f"{packet} · {event['status']} · {event['source']}",
        event["summary"],
    ]

    if event.get("lane"):
        lines.append(f"Línea: {event['lane']}")
    if event.get("blocker_class"):
        lines.append(f"Bloqueo: {event['blocker_class']}")
    if event.get("human_action_required"):
        lines.append(f"ACCIÓN HUMANA: {event['requested_action']}")
    if event.get("next_owner"):
        lines.append(f"Siguiente estación: {event['next_owner']}")
    if event.get("pull_request"):
        lines.append(f"PR: {event['pull_request']}")
    if event.get("commit_sha"):
        lines.append(f"Commit: {event['commit_sha']}")

    evidence_urls = event.get("evidence_urls", [])
    if evidence_urls:
        lines.append("Evidencia:")
        lines.extend(f"- {url}" for url in evidence_urls[:3])

    lines.append("DEPLOY: esta notificación NO constituye autorización.")
    return "\n".join(lines)


def build_notification(event: dict[str, Any], seen_keys: set[str] | None = None) -> dict[str, Any]:
    event = validate_event(event)
    key = event_dedupe_key(event)
    notify, reason = should_notify(event, seen_keys)
    return {
        "event_id": event["event_id"],
        "dedupe_key": key,
        "notify": notify,
        "reason": reason,
        "severity": event["severity"],
        "telegram_text": format_telegram(event) if notify else "",
        "deployment_authorized": False,
    }


def _load_seen(path: str | None) -> set[str]:
    if path is None:
        return set()
    data = json.loads(Path(path).read_text(encoding="utf-8"))
    if isinstance(data, dict):
        data = data.get("seen_dedupe_keys", [])
    if not isinstance(data, list) or not all(isinstance(item, str) for item in data):
        raise ValueError("seen-state input must be a string list or {seen_dedupe_keys: [...]} object")
    return set(data)


def main(argv: list[str] | None = None) -> int:
    args = list(sys.argv[1:] if argv is None else argv)
    if not (1 <= len(args) <= 2):
        print("usage: factory_andon.py FACTORY_EVENT.json [SEEN_KEYS.json]", file=sys.stderr)
        return 2

    try:
        event = json.loads(Path(args[0]).read_text(encoding="utf-8"))
        if not isinstance(event, dict):
            raise ValueError("event input must be a JSON object")
        seen = _load_seen(args[1] if len(args) == 2 else None)
        result = build_notification(event, seen)
    except (OSError, json.JSONDecodeError, ValueError) as exc:
        print(f"factory andon error: {exc}", file=sys.stderr)
        return 1

    print(json.dumps(result, indent=2, sort_keys=True, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
