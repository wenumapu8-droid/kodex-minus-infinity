import { assetSlot, journeyField, radialScanner, signalGauge } from "../src/index.js";

document.querySelector("#journey").append(journeyField({ title: "MEMORY CONVERGENCE", routes: 21 }));
document.querySelector("#gauges").append(
  signalGauge({ value: 93, label: "COHERENCE" }),
  signalGauge({ value: 76, label: "ENTROPY" }),
  signalGauge({ value: 51, label: "OBSERVABILITY" })
);
document.querySelector("#scanner").append(radialScanner({ rings: 7, spokes: 16 }));
document.querySelector("#asset").append(assetSlot({ label: "3D HEART", kind: "GLB / GLTF + FALLBACK PNG" }));

const palettes = ["violet", "gaia", "solar", "blood"];
let index = 0;
document.querySelector("#palette").addEventListener("click", () => {
  index = (index + 1) % palettes.length;
  document.documentElement.dataset.kxPalette = palettes[index];
});
