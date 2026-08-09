import test from "node:test";
import assert from "node:assert/strict";
import { installDomStub } from "./dom-stub.mjs";

installDomStub();

const { activityRings, dataPortrait, metricBars, signalGauge } = await import("../src/primitives.js");

const measurementAria = ["aria-valuenow", "aria-valuemin", "aria-valuemax", "aria-valuetext"];

function assertNoMeasurementClaim(root) {
  for (const node of root.walk()) {
    assert.notEqual(node.getAttribute("role"), "meter", `${node.tagName} must not claim role="meter"`);
    assert.notEqual(node.getAttribute("role"), "progressbar", `${node.tagName} must not claim role="progressbar"`);
    for (const attr of measurementAria) {
      assert.equal(node.getAttribute(attr), null, `${node.tagName} must not expose ${attr}`);
    }
  }
}

test("signalGauge is symbolic by default and never claims a measurement", () => {
  const root = signalGauge({ value: 93, label: "COHERENCE" });
  const ring = root.firstElementChild;
  assert.equal(ring.getAttribute("data-symbolic"), "true");
  assert.equal(ring.getAttribute("role"), "img");
  assert.match(ring.getAttribute("aria-label"), /symbolic/i);
  assert.match(ring.getAttribute("aria-label"), /not a system measurement/i);
  assertNoMeasurementClaim(root);
});

test("signalGauge admits ARIA measurement roles only when the value is measured", () => {
  const ring = signalGauge({ value: 93, label: "COHERENCE", simbolico: false }).firstElementChild;
  assert.equal(ring.getAttribute("data-symbolic"), "false");
  assert.equal(ring.getAttribute("role"), "meter");
  assert.equal(ring.getAttribute("aria-valuenow"), "93");
  assert.equal(ring.getAttribute("aria-valuemin"), "0");
  assert.equal(ring.getAttribute("aria-valuemax"), "100");
});

test("a label cannot inject markup or a measurement role", () => {
  const root = signalGauge({ value: 40, label: '"><div role="meter" aria-valuenow="99">' });
  assertNoMeasurementClaim(root);
});

test("metricBars rows are symbolic marks by default", () => {
  const root = metricBars({ metrics: [{ label: "SIGNAL INTEGRITY", value: 93.1 }, { label: "ENTROPY", value: 76.2 }] });
  assert.equal(root.getAttribute("data-symbolic"), "true");
  assertNoMeasurementClaim(root);
  for (const row of root.children) {
    assert.equal(row.getAttribute("data-symbolic"), "true");
    assert.equal(row.getAttribute("role"), "img");
  }
});

test("metricBars switches to real meters when told the values are measured", () => {
  const root = metricBars({ metrics: [{ label: "FRAME BUDGET", value: 42 }], simbolico: false });
  assert.equal(root.getAttribute("data-symbolic"), "false");
  const row = root.firstElementChild;
  assert.equal(row.getAttribute("role"), "meter");
  assert.equal(row.getAttribute("aria-valuenow"), "42");
});

test("activityRings default to symbolic and only expose meters when measured", () => {
  const symbolic = activityRings();
  assert.equal(symbolic.getAttribute("data-symbolic"), "true");
  assert.equal(symbolic.getAttribute("role"), "img");
  assert.match(symbolic.getAttribute("aria-label"), /not system measurements/i);
  assertNoMeasurementClaim(symbolic);

  const measured = activityRings({ metrics: [{ label: "HEAP", value: 61 }], simbolico: false });
  assert.equal(measured.getAttribute("role"), "group");
  const meters = measured.walk().filter((node) => node.getAttribute("role") === "meter");
  assert.equal(meters.length, 1);
  assert.equal(meters[0].getAttribute("aria-valuenow"), "61");
});

test("dataPortrait digits are declared texture, never a readout", () => {
  const root = dataPortrait({ columns: 6, rows: 6 });
  assert.equal(root.getAttribute("data-symbolic"), "true");
  assert.equal(root.getAttribute("role"), "img");
  assert.match(root.getAttribute("aria-label"), /not a data readout/i);
  assertNoMeasurementClaim(root);
});
