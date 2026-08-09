import { activityRings, animateKodexJourney, animateTelemetry, assetSlot, dataPortrait, flowField, glyphRing, journeyField, metricBars, mountFlowField, radialScanner, radialTaxonomy, signalGauge, spotlightCard, stratigraphy, toroidalField } from "../src/index.js";

document.querySelector("#journey").append(journeyField({ title: "MEMORY CONVERGENCE", routes: 21 }));
document.querySelector("#gauges").append(
  signalGauge({ value: 93, label: "COHERENCE" }),
  signalGauge({ value: 76, label: "ENTROPY" }),
  signalGauge({ value: 51, label: "OBSERVABILITY" })
);
document.querySelector("#scanner").append(radialScanner({ rings: 7, spokes: 16 }));
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
animateKodexJourney(document.querySelector("#journey"));
animateTelemetry(document);

const palettes = ["violet", "gaia", "solar", "blood"];
let index = 0;
document.querySelector("#palette").addEventListener("click", () => {
  index = (index + 1) % palettes.length;
  document.documentElement.dataset.kxPalette = palettes[index];
});
