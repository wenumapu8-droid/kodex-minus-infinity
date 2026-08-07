#!/usr/bin/env python3
"""Deterministic KODEX Factory metrics summarizer.

Consumes JSON packet-metric records and emits aggregate production metrics plus
recipe-learning signals. This measures the factory process only; it does not
consume visitor analytics or private conversational data.
"""

from __future__ import annotations

import json
import statistics
import sys
from collections import Counter
from datetime import datetime
from pathlib import Path
from typing import Any


def _parse_time(value: str | None) -> datetime | None:
    if not value:
        return None
    normalized = value[:-1] + "+00:00" if value.endswith("Z") else value
    try:
        return datetime.fromisoformat(normalized)
    except ValueError as exc:
        raise ValueError(f"invalid ISO timestamp: {value!r}") from exc


def _duration(start: str | None, end: str | None) -> float | None:
    start_dt = _parse_time(start)
    end_dt = _parse_time(end)
    if start_dt is None or end_dt is None:
        return None
    seconds = (end_dt - start_dt).total_seconds()
    if seconds < 0:
        raise ValueError("timestamp interval cannot be negative")
    return seconds


def _blocked_seconds(packet: dict[str, Any]) -> float:
    explicit = packet.get("blocked_time_seconds")
    if explicit is not None:
        if not isinstance(explicit, (int, float)) or explicit < 0:
            raise ValueError("blocked_time_seconds must be a non-negative number or null")
        return float(explicit)

    total = 0.0
    intervals = packet.get("blocked_intervals", [])
    if intervals is None:
        return 0.0
    if not isinstance(intervals, list):
        raise ValueError("blocked_intervals must be a list")
    for interval in intervals:
        if not isinstance(interval, dict):
            raise ValueError("blocked interval must be an object")
        seconds = _duration(interval.get("start"), interval.get("end"))
        if seconds is None:
            raise ValueError("blocked interval requires start and end")
        total += seconds
    return total


def _cycle_seconds(packet: dict[str, Any]) -> float | None:
    explicit = packet.get("cycle_time_seconds")
    if explicit is not None:
        if not isinstance(explicit, (int, float)) or explicit < 0:
            raise ValueError("cycle_time_seconds must be a non-negative number or null")
        return float(explicit)
    timestamps = packet.get("timestamps", {}) or {}
    if not isinstance(timestamps, dict):
        raise ValueError("timestamps must be an object")
    return _duration(timestamps.get("running_at"), timestamps.get("done_at"))


def _lead_seconds(packet: dict[str, Any]) -> float | None:
    explicit = packet.get("lead_time_seconds")
    if explicit is not None:
        if not isinstance(explicit, (int, float)) or explicit < 0:
            raise ValueError("lead_time_seconds must be a non-negative number or null")
        return float(explicit)
    timestamps = packet.get("timestamps", {}) or {}
    if not isinstance(timestamps, dict):
        raise ValueError("timestamps must be an object")
    return _duration(timestamps.get("ready_at"), timestamps.get("done_at"))


def _handoff_complete(packet: dict[str, Any]) -> bool:
    required = packet.get("handoff_required_fields", 0)
    completed = packet.get("handoff_completed_fields", 0)
    if not isinstance(required, int) or not isinstance(completed, int):
        raise ValueError("handoff field counts must be integers")
    if required < 0 or completed < 0:
        raise ValueError("handoff field counts cannot be negative")
    return required == 0 or completed >= required


def _is_verified_done(packet: dict[str, Any]) -> bool:
    timestamps = packet.get("timestamps", {}) or {}
    if not isinstance(timestamps, dict) or not timestamps.get("done_at"):
        return False
    if packet.get("tests_passed") is False:
        return False
    evidence_urls = packet.get("evidence_urls", []) or []
    if not isinstance(evidence_urls, list):
        raise ValueError("evidence_urls must be a list")
    has_evidence = bool(packet.get("commit_sha") or packet.get("pull_request") or evidence_urls)
    return has_evidence and _handoff_complete(packet)


def _ratio(numerator: int | float, denominator: int | float) -> float | None:
    if denominator == 0:
        return None
    return float(numerator) / float(denominator)


def summarize_packets(packets: list[dict[str, Any]]) -> dict[str, Any]:
    if not isinstance(packets, list) or not all(isinstance(p, dict) for p in packets):
        raise ValueError("packets must be a list of objects")

    cycle_times: list[float] = []
    lead_times: list[float] = []
    blocked_total = 0.0
    cycle_total = 0.0
    verified = 0
    completed_count = 0
    reworked_completed = 0
    first_pass_values: list[bool] = []
    integration_attempts = 0
    integration_failures = 0
    reusable_completed = 0
    blocker_counter: Counter[str] = Counter()
    lane_wip: Counter[str] = Counter()

    for packet in packets:
        timestamps = packet.get("timestamps", {}) or {}
        if not isinstance(timestamps, dict):
            raise ValueError("timestamps must be an object")

        done = bool(timestamps.get("done_at"))
        running = bool(timestamps.get("running_at")) and not done
        if done:
            completed_count += 1
        elif running:
            lane = str(packet.get("lane") or "UNSPECIFIED")
            lane_wip[lane] += 1

        if _is_verified_done(packet):
            verified += 1

        cycle = _cycle_seconds(packet)
        if cycle is not None:
            cycle_times.append(cycle)
            cycle_total += cycle

        lead = _lead_seconds(packet)
        if lead is not None:
            lead_times.append(lead)

        blocked_total += _blocked_seconds(packet)

        first_pass = packet.get("first_pass_yield")
        if first_pass is not None:
            if not isinstance(first_pass, bool):
                raise ValueError("first_pass_yield must be boolean or null")
            first_pass_values.append(first_pass)

        rework_count = packet.get("rework_count", 0)
        if not isinstance(rework_count, int) or rework_count < 0:
            raise ValueError("rework_count must be a non-negative integer")
        if done and rework_count > 0:
            reworked_completed += 1

        integration = packet.get("integration_result", "NOT_ATTEMPTED")
        if integration not in {"NOT_ATTEMPTED", "PASS", "FAIL"}:
            raise ValueError(f"invalid integration_result: {integration!r}")
        if integration in {"PASS", "FAIL"}:
            integration_attempts += 1
            if integration == "FAIL":
                integration_failures += 1

        reusable = packet.get("reusable_outputs", []) or []
        if not isinstance(reusable, list):
            raise ValueError("reusable_outputs must be a list")
        if done and reusable:
            reusable_completed += 1

        feedback = packet.get("recipe_feedback", {}) or {}
        if not isinstance(feedback, dict):
            raise ValueError("recipe_feedback must be an object")
        bottleneck = feedback.get("bottleneck_class")
        if isinstance(bottleneck, str) and bottleneck:
            blocker_counter[bottleneck] += 1

        causes = packet.get("rework_causes", []) or []
        if not isinstance(causes, list) or not all(isinstance(c, str) for c in causes):
            raise ValueError("rework_causes must be a list of strings")
        blocker_counter.update(cause for cause in causes if cause)

    first_pass_true = sum(1 for value in first_pass_values if value)

    return {
        "packet_count": len(packets),
        "verified_throughput": verified,
        "completed_packets": completed_count,
        "wip_by_lane": dict(sorted(lane_wip.items())),
        "median_cycle_time_seconds": statistics.median(cycle_times) if cycle_times else None,
        "median_lead_time_seconds": statistics.median(lead_times) if lead_times else None,
        "blocked_time_seconds": blocked_total,
        "blocked_time_share": _ratio(blocked_total, cycle_total),
        "first_pass_yield": _ratio(first_pass_true, len(first_pass_values)),
        "rework_rate": _ratio(reworked_completed, completed_count),
        "integration_failure_rate": _ratio(integration_failures, integration_attempts),
        "reuse_ratio": _ratio(reusable_completed, completed_count),
        "repeated_blocker_classes": [
            {"class": name, "count": count}
            for name, count in sorted(blocker_counter.items(), key=lambda item: (-item[1], item[0]))
        ],
    }


def _extract_packets(data: Any) -> list[dict[str, Any]]:
    if isinstance(data, list):
        packets = data
    elif isinstance(data, dict) and isinstance(data.get("packets"), list):
        packets = data["packets"]
    else:
        raise ValueError("input must be a JSON packet list or an object with a packets list")
    if not all(isinstance(packet, dict) for packet in packets):
        raise ValueError("every packet metric record must be an object")
    return packets


def main(argv: list[str] | None = None) -> int:
    args = list(sys.argv[1:] if argv is None else argv)
    if len(args) != 1:
        print("usage: factory_metrics.py PACKET_METRICS.json", file=sys.stderr)
        return 2

    try:
        data = json.loads(Path(args[0]).read_text(encoding="utf-8"))
        summary = summarize_packets(_extract_packets(data))
    except (OSError, json.JSONDecodeError, ValueError) as exc:
        print(f"factory metrics error: {exc}", file=sys.stderr)
        return 1

    print(json.dumps(summary, indent=2, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
