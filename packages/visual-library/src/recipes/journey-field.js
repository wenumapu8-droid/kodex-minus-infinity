import { assetSlot, createSvg, waveform } from "../primitives.js";

const ns = "http://www.w3.org/2000/svg";
const make = (name, attrs = {}) => {
  const node = document.createElementNS(ns, name);
  Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
  return node;
};

export function journeyField(options = {}) {
  const { title = "JOURNEY FIELD", routes = 17, heart = true, start = "−∞", end = "+∞" } = options;
  const root = document.createElement("article");
  root.className = "kx-journey";
  root.innerHTML = `<header><p>KODEX−∞ / RECIPE 001</p><h2>${title}</h2></header>`;

  const stage = document.createElement("div");
  stage.className = "kx-journey__stage";
  const svg = createSvg("0 0 1200 620", `${title}: routes from ${start} to ${end}`);
  const defs = make("defs");
  const gradient = make("linearGradient", { id: "kx-route-gradient", x1: "0", x2: "1" });
  gradient.append(make("stop", { offset: "0", "stop-color": "var(--kx-muted)" }), make("stop", { offset: ".5", "stop-color": "var(--kx-signal)" }), make("stop", { offset: "1", "stop-color": "var(--kx-ink)" }));
  defs.append(gradient); svg.append(defs);

  for (let i = 0; i < routes; i++) {
    const y = 310 + (i - (routes - 1) / 2) * 17;
    const lift = Math.abs(i - (routes - 1) / 2) * 9 + 52;
    const wobble = (i % 3 - 1) * 22;
    const path = make("path", {
      d: `M 90 310 C 245 ${310 - lift}, 390 ${y + wobble}, 600 ${y} S 940 ${310 + lift}, 1110 310`,
      class: "kx-route",
      style: `--delay:${i * -0.12}s`
    });
    svg.append(path);
  }
  svg.append(make("circle", { cx: "90", cy: "310", r: "8", class: "kx-node" }));
  svg.append(make("circle", { cx: "1110", cy: "310", r: "8", class: "kx-node" }));
  const left = make("text", { x: "24", y: "298", class: "kx-axis-label" }); left.textContent = start;
  const right = make("text", { x: "1134", y: "298", class: "kx-axis-label" }); right.textContent = end;
  svg.append(left, right);
  stage.append(svg);

  if (heart) {
    const slot = assetSlot({ label: "OPTIONAL HEART", kind: "PROCEDURAL / SVG / PNG / GLB" });
    slot.classList.add("kx-journey__heart"); stage.append(slot);
  }
  root.append(stage);
  const footer = document.createElement("footer");
  footer.append(waveform({ seed: 21, amplitude: 60 }));
  footer.insertAdjacentHTML("beforeend", "<p>ROUTES ARE DATA · THE HEART ORIENTS · RETURN REMEMBERS</p>");
  root.append(footer);
  return root;
}
