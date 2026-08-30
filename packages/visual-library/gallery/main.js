import { activityRings, animateKodexJourney, animateTelemetry, assetSlot, barMeter, dataPortrait, flowField, glyphRing, journeyField, metricBars, micrografia, mountFlowField, radialScanner, radialTaxonomy, ringGauge, signalGauge, spotlightCard, stepGraph, stratigraphy, toroidalField, waveform } from "../src/index.js";

document.querySelector("#journey").append(journeyField({ title: "MEMORY CONVERGENCE", routes: 21 }));
document.querySelector("#gauges").append(
  signalGauge({ value: 93, label: "COHERENCE" }),
  signalGauge({ value: 76, label: "ENTROPY" }),
  signalGauge({ value: 51, label: "OBSERVABILITY" })
);
document.querySelector("#scanner").append(radialScanner({ rings: 14, spokes: 36, ticks: 60, core: 8, cool: "var(--kx-muted)" }));
document.querySelector("#asset").append(assetSlot({ label: "3D HEART", kind: "GLB / GLTF + FALLBACK PNG" }));
document.querySelector("#taxonomy").append(radialTaxonomy({ groups: 8, items: 64 }));
document.querySelector("#portrait").append(dataPortrait({ columns: 24, rows: 32 }));
document.querySelector("#toroid").append(toroidalField({ lines: 34 }));
document.querySelector("#glyph").append(glyphRing({ segments: 28 }));
document.querySelector("#strata").append(stratigraphy({ layers: 24 }));
document.querySelector("#metrics").append(metricBars({ metrics: [
  { label: "SIGNAL INTEGRITY", value: 93.1 },
  { label: "COHERENCE", value: 89.4 },
  { label: "ENTROPY", value: 76.2 },
  { label: "OBSERVABILITY", value: 91.7 }
] }));
document.querySelector("#activity").append(activityRings());
document.querySelector("#spotlight").append(spotlightCard({ eyebrow: "OBSERVER / 08", title: "THE FIELD RESPONDS", copy: "Pointer position becomes signal; signal becomes visible state." }));
const field = flowField({ particles: 440 });
document.querySelector("#flow").append(field);
mountFlowField(field, { particles: 440 });
// Kit de lámina: geometría medida contra las referencias, determinista por semilla.
document.querySelector("#waves").append(
  waveform({ width: 320, height: 34, variant: "comb", seed: 12 }),
  waveform({ width: 320, height: 34, variant: "line", seed: 31 }),
  waveform({ width: 320, height: 34, variant: "bars", seed: 5 })
);
document.querySelector("#bars").append(
  barMeter({ width: 240, height: 7, value: 62, seed: 3, bordered: true, label: "DESCENT PROGRESS" }),
  barMeter({ width: 240, height: 7, value: 88, seed: 17, bordered: true, label: "SIGNAL STRENGTH" })
);
document.querySelector("#rings").append(ringGauge({
  d: 150,
  thickness: 26,
  gap: 4,
  label: "SIGNAL COMPOSITION",
  segments: [
    { value: 46, color: "var(--kx-signal)" },
    { value: 31, color: "var(--kx-signal-hot)" },
    { value: 23, color: "var(--kx-muted)" }
  ]
}));
document.querySelector("#steps").append(stepGraph({
  width: 179, height: 115, seed: 5, label: "DEPTH GRAPH",
  fill: "color-mix(in srgb, var(--kx-signal) 22%, transparent)",
  labelsX: ["−∞", "0", "+∞"], labelsY: ["1.0", "0.5", "0.0"]
}));
document.querySelector("#micro").append(micrografia({ width: 620, height: 150, seed: 11 }));

animateKodexJourney(document.querySelector("#journey"));
animateTelemetry(document);

const palettes = ["violet", "gaia", "solar", "blood"];
let index = 0;
document.querySelector("#palette").addEventListener("click", () => {
  index = (index + 1) % palettes.length;
  document.documentElement.dataset.kxPalette = palettes[index];
});
