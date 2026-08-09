const reduced = () => globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

export async function loadAnimeWaapi() {
  if (reduced()) return null;
  const { waapi, stagger } = await import("animejs/waapi");
  return { waapi, stagger };
}

export async function animateKodexJourney(root, { loop = true } = {}) {
  if (!root || reduced()) return [];
  const api = await loadAnimeWaapi();
  if (!api) return [];
  const { waapi, stagger } = api;
  const animations = [];
  const routes = root.querySelectorAll(".kx-route");
  const nodes = root.querySelectorAll(".kx-node");
  const heart = root.querySelector(".kx-journey__heart");
  if (routes.length) animations.push(waapi.animate(routes, {
    opacity: [0.15, 0.9], strokeDashoffset: [44, 0], delay: stagger(45), duration: 1400, ease: "out(3)"
  }));
  if (nodes.length) animations.push(waapi.animate(nodes, {
    scale: [0.45, 1.15, 1], opacity: [0, 1], delay: stagger(26), duration: 900, ease: "out(4)"
  }));
  if (heart) animations.push(waapi.animate(heart, {
    scale: [1, 1.035, 1], filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"], duration: 1800, loop, ease: "inOut(2)"
  }));
  return animations;
}

export async function animateTelemetry(root) {
  if (!root || reduced()) return [];
  const api = await loadAnimeWaapi();
  if (!api) return [];
  const { waapi, stagger } = api;
  const rings = root.querySelectorAll(".kx-ring-value");
  const metrics = root.querySelectorAll(".kx-metric");
  return [
    rings.length && waapi.animate(rings, { opacity: [0, 1], rotate: ["-8deg", "0deg"], delay: stagger(120), duration: 900, ease: "out(3)" }),
    metrics.length && waapi.animate(metrics, { opacity: [0, 1], translate: ["-12px 0", "0 0"], delay: stagger(90), duration: 520, ease: "out(3)" })
  ].filter(Boolean);
}
