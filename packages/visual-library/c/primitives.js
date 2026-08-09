const ns = "http://www.w3.org/2000/svg";

function el(name, attrs = {}) {
  const node = document.createElementNS(ns, name);
  for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, value);
  return node;
}

export function createSvg(viewBox = "0 0 1000 600", label = "KODEX visualization") {
  const svg = el("svg", { viewBox, role: "img", "aria-label": label });
  svg.classList.add("kx-svg");
  return svg;
}

export function signalGauge({ value = 72, label = "SIGNAL", max = 100 } = {}) {
  const root = document.createElement("figure");
  root.className = "kx-gauge";
  const safe = Math.max(0, Math.min(max, Number(value) || 0));
  root.innerHTML = `<div class="kx-gauge__ring" style="--value:${safe / max}"
    role="meter" aria-valuemin="0" aria-valuemax="${max}" aria-valuenow="${safe}">
    <span>${safe.toFixed(0)}</span></div><figcaption>${label}</figcaption>`;
  return root;
}

export function waveform({ points = 72, amplitude = 32, seed = 8 } = {}) {
  const svg = createSvg("0 0 720 120", "Signal waveform");
  let state = seed >>> 0;
  const random = () => ((state = (state * 1664525 + 1013904223) >>> 0) / 4294967296);
  const coords = Array.from({ length: points }, (_, index) => {
    const x = (index / (points - 1)) * 720;
    const envelope = Math.sin(Math.PI * index / (points - 1));
    const y = 60 + (random() - 0.5) * amplitude * envelope;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  svg.append(el("line", { x1: "0", y1: "60", x2: "720", y2: "60", class: "kx-hairline" }));
  svg.append(el("polyline", { points: coords, class: "kx-signal-line" }));
  return svg;
}

export function radialScanner({ rings = 6, spokes = 12 } = {}) {
  const svg = createSvg("0 0 400 400", "Radial scanner");
  const g = el("g", { transform: "translate(200 200)" });
  for (let i = 1; i <= rings; i++) g.append(el("circle", { r: String(i * 25), class: "kx-hairline" }));
  for (let i = 0; i < spokes; i++) {
    const angle = (Math.PI * 2 * i) / spokes;
    g.append(el("line", { x1: "0", y1: "0", x2: String(Math.cos(angle) * 165), y2: String(Math.sin(angle) * 165), class: "kx-hairline" }));
  }
  g.append(el("circle", { r: "6", class: "kx-node" }));
  svg.append(g);
  return svg;
}

export function assetSlot({ kind = "GLB / PNG / SVG", label = "ASSET SLOT" } = {}) {
  const root = document.createElement("div");
  root.className = "kx-asset-slot";
  root.innerHTML = `<span class="kx-asset-slot__mark">◇</span><strong>${label}</strong><small>${kind}</small>`;
  return root;
}
