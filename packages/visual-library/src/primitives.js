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

// Value-bearing primitives are assembled node by node instead of through
// innerHTML: a caller-supplied label must never be able to inject the very ARIA
// roles this module is careful not to emit.
function box(tag, { className, text, attrs = {}, vars = {} } = {}) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = String(text);
  for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, String(value));
  for (const [key, value] of Object.entries(vars)) node.style.setProperty(key, String(value));
  return node;
}

/**
 * VISUAL_PASSPORT_PROTOCOL "No pseudo-telemetry": the numbers on the reference
 * plates are poster fiction. A symbolic mark must never tell a screen reader it
 * is a measurement, so it carries data-symbolic="true" and role="img" instead of
 * role="meter"/aria-valuenow. Only pass simbolico:false when the value really
 * comes from an engine measurement — that is the single case where the ARIA
 * measurement roles are admitted.
 */
export function applyValueSemantics(node, { simbolico = true, label = "VALUE", value = 0, min = 0, max = 100 } = {}) {
  if (simbolico) {
    node.setAttribute("data-symbolic", "true");
    node.setAttribute("role", "img");
    node.setAttribute("aria-label", `${label}: symbolic plate marking, not a system measurement`);
    for (const attr of ["aria-valuemin", "aria-valuemax", "aria-valuenow", "aria-valuetext"]) node.removeAttribute(attr);
    return node;
  }
  node.setAttribute("data-symbolic", "false");
  node.setAttribute("role", "meter");
  node.setAttribute("aria-label", String(label));
  node.setAttribute("aria-valuemin", String(min));
  node.setAttribute("aria-valuemax", String(max));
  node.setAttribute("aria-valuenow", String(value));
  return node;
}

export function signalGauge({ value = 72, label = "SIGNAL", max = 100, simbolico = true } = {}) {
  const root = document.createElement("figure");
  root.className = "kx-gauge";
  const safe = Math.max(0, Math.min(max, Number(value) || 0));
  const ring = box("div", { className: "kx-gauge__ring", vars: { "--value": safe / max } });
  ring.append(box("span", { text: safe.toFixed(0), attrs: { "aria-hidden": "true" } }));
  applyValueSemantics(ring, { simbolico, label, value: safe, max });
  root.append(ring, box("figcaption", { text: label }));
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

export function metricBars({ metrics = [], simbolico = true } = {}) {
  const root = document.createElement("div");
  root.className = "kx-metrics";
  root.setAttribute("data-symbolic", simbolico ? "true" : "false");
  root.setAttribute("role", "group");
  root.setAttribute("aria-label", simbolico
    ? "Symbolic plate markings, not system measurements"
    : "Measured metrics");
  for (const metric of metrics) {
    const value = Math.max(0, Math.min(100, Number(metric.value) || 0));
    const row = box("div", { className: "kx-metric" });
    row.append(
      box("span", { text: metric.label, attrs: { "aria-hidden": "true" } }),
      box("i", { vars: { "--value": `${value}%` } }),
      box("b", { text: `${value.toFixed(1)}%`, attrs: { "aria-hidden": "true" } })
    );
    applyValueSemantics(row, { simbolico, label: metric.label ?? "METRIC", value });
    root.append(row);
  }
  return root;
}

export function radialTaxonomy({ groups = 7, items = 42, seed = 18 } = {}) {
  const svg = createSvg("0 0 600 600", "Radial taxonomy");
  const g = el("g", { transform: "translate(300 300)" });
  let state = seed >>> 0;
  const random = () => ((state = (state * 1664525 + 1013904223) >>> 0) / 4294967296);
  for (let group = 0; group < groups; group++) {
    const start = (group / groups) * Math.PI * 2;
    const end = ((group + .82) / groups) * Math.PI * 2;
    const radius = 100 + random() * 54;
    const x1 = Math.cos(start) * radius;
    const y1 = Math.sin(start) * radius;
    const x2 = Math.cos(end) * radius;
    const y2 = Math.sin(end) * radius;
    g.append(el("path", { d: `M0 0 Q ${x1.toFixed(1)} ${y1.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`, class: "kx-taxonomy-branch" }));
  }
  for (let index = 0; index < items; index++) {
    const angle = (index / items) * Math.PI * 2;
    const radius = 220 + (index % 3) * 14;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    g.append(el("line", { x1: String(Math.cos(angle) * 150), y1: String(Math.sin(angle) * 150), x2: String(x), y2: String(y), class: "kx-hairline" }));
    g.append(el("circle", { cx: String(x), cy: String(y), r: index % 7 === 0 ? "4" : "2", class: "kx-node" }));
  }
  g.append(el("circle", { r: "152", class: "kx-orbit" }));
  svg.append(g);
  return svg;
}

export function dataPortrait({ columns = 22, rows = 34, seed = 9 } = {}) {
  const root = document.createElement("div");
  root.className = "kx-data-portrait";
  // The digits are texture that imitates the plate's stain. They are never a
  // readout, so there is no simbolico:false path here.
  root.setAttribute("data-symbolic", "true");
  root.setAttribute("role", "img");
  root.setAttribute("aria-label", "Data portrait: symbolic digit texture, not a data readout");
  root.style.setProperty("--columns", columns);
  let state = seed >>> 0;
  const random = () => ((state = (state * 1103515245 + 12345) >>> 0) / 4294967296);
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      const nx = (column / (columns - 1)) * 2 - 1;
      const ny = (row / (rows - 1)) * 2 - 1;
      const head = (nx * nx) / .42 + ((ny + .18) * (ny + .18)) / .76 < 1;
      const shoulders = ny > .48 && Math.abs(nx) < .92 - (ny - .48) * .7;
      const visible = (head || shoulders) && random() > .22;
      const digit = document.createElement("span");
      digit.textContent = visible ? String(Math.floor(random() * 10)) : "";
      digit.style.opacity = visible ? String(.25 + random() * .75) : "0";
      root.append(digit);
    }
  }
  return root;
}

export function stratigraphy({ layers = 20, seed = 33 } = {}) {
  const svg = createSvg("0 0 720 360", "Layered stratigraphy");
  let state = seed >>> 0;
  const random = () => ((state = (state * 1664525 + 1013904223) >>> 0) / 4294967296);
  for (let layer = 0; layer < layers; layer++) {
    const points = [];
    for (let index = 0; index <= 30; index++) {
      const x = (index / 30) * 720;
      const wave = Math.sin(index * .42 + layer * .25) * (8 + layer * .25);
      const y = 54 + layer * 12 + wave + (random() - .5) * 5;
      points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    svg.append(el("polyline", { points: points.join(" "), class: "kx-strata", style: `--layer:${layer}` }));
  }
  return svg;
}

export function toroidalField({ lines = 28 } = {}) {
  const svg = createSvg("0 0 600 600", "Toroidal field");
  const g = el("g", { transform: "translate(300 300)" });
  for (let index = 0; index < lines; index++) {
    const offset = (index - (lines - 1) / 2) * 7;
    const width = 105 + Math.abs(offset) * .55;
    g.append(el("path", { d: `M 0 -210 C ${width} -150, ${width} ${offset}, 0 0 C -${width} ${offset}, -${width} 150, 0 210`, class: "kx-field-line", style: `--delay:${-index * .13}s` }));
  }
  g.append(el("circle", { r: "24", class: "kx-node" }));
  svg.append(g);
  return svg;
}

export function glyphRing({ segments = 24, seed = 21 } = {}) {
  const svg = createSvg("0 0 500 500", "Procedural glyph ring");
  const g = el("g", { transform: "translate(250 250)" });
  for (let index = 0; index < segments; index++) {
    const angle = (360 / segments) * index;
    const length = 18 + ((index * seed) % 4) * 8;
    const segment = el("path", { d: `M 0 -180 l ${length} -${length} l ${length} ${length} l -${length} ${length} Z`, class: "kx-glyph", transform: `rotate(${angle})` });
    g.append(segment);
  }
  g.append(el("circle", { r: "180", class: "kx-orbit" }), el("circle", { r: "112", class: "kx-hairline" }));
  svg.append(g);
  return svg;
}

export function activityRings({ metrics = [
  { label: "COHERENCE", value: 92 },
  { label: "SIGNAL", value: 71 },
  { label: "MEMORY", value: 48 }
], simbolico = true } = {}) {
  const svg = createSvg("0 0 320 320", simbolico
    ? "Nested activity rings: symbolic plate markings, not system measurements"
    : "Nested activity rings");
  svg.setAttribute("data-symbolic", simbolico ? "true" : "false");
  if (!simbolico) {
    // role="img" would make the individual meters presentational.
    svg.setAttribute("role", "group");
  }
  const g = el("g", { transform: "translate(160 160) rotate(-90)" });
  metrics.slice(0, 4).forEach((metric, index) => {
    const radius = 118 - index * 28;
    const circumference = 2 * Math.PI * radius;
    const value = Math.max(0, Math.min(100, Number(metric.value) || 0));
    g.append(el("circle", { r: radius, class: "kx-ring-track" }));
    const ring = el("circle", {
      r: radius,
      class: "kx-ring-value",
      "data-kx-ring": metric.label,
      "data-value": value,
      "stroke-dasharray": circumference,
      "stroke-dashoffset": circumference * (1 - value / 100),
      style: `--ring:${index}`
    });
    if (!simbolico) applyValueSemantics(ring, { simbolico, label: metric.label ?? "RING", value });
    g.append(ring);
  });
  svg.append(g);
  return svg;
}

export function spotlightCard({ eyebrow = "SPECIMEN", title = "SIGNAL NODE", copy = "A reusable interface surface that reacts to the observer." } = {}) {
  const root = document.createElement("article");
  root.className = "kx-spotlight-card";
  root.innerHTML = `<i aria-hidden="true"></i><small>${eyebrow}</small><strong>${title}</strong><p>${copy}</p>`;
  const update = (event) => {
    const rect = root.getBoundingClientRect();
    root.style.setProperty("--x", `${event.clientX - rect.left}px`);
    root.style.setProperty("--y", `${event.clientY - rect.top}px`);
    root.style.setProperty("--rx", `${((event.clientY - rect.top) / rect.height - .5) * -7}deg`);
    root.style.setProperty("--ry", `${((event.clientX - rect.left) / rect.width - .5) * 7}deg`);
  };
  root.addEventListener("pointermove", update);
  root.addEventListener("pointerleave", () => { root.style.setProperty("--rx", "0deg"); root.style.setProperty("--ry", "0deg"); });
  return root;
}

export function flowField({ particles = 360, seed = 42 } = {}) {
  const canvas = document.createElement("canvas");
  canvas.className = "kx-flow-field";
  canvas.setAttribute("aria-label", "Procedural signal flow field");
  canvas.dataset.particles = String(particles);
  canvas.dataset.seed = String(seed);
  return canvas;
}
