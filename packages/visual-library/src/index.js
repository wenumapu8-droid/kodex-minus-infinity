export * from "./rng.js";
export * from "./primitives.js";
export * from "./recipes/journey-field.js";
export * from "./catalog.js";
export * from "./resolver.js";
export * from "./motion.js";
export * from "./flow-field.js";
export * from "./render.js";

export const catalog = [
  { id: "signal-gauge", group: "telemetry", formats: ["DOM"] },
  { id: "waveform", group: "signal", formats: ["SVG"] },
  { id: "radial-scanner", group: "telemetry", formats: ["SVG"] },
  { id: "asset-slot", group: "media", formats: ["SVG", "PNG", "GLB", "GLTF"] },
  { id: "journey-field", group: "recipe", formats: ["DOM", "SVG"] }
  ,{ id: "metric-bars", group: "telemetry", formats: ["DOM"] }
  ,{ id: "radial-taxonomy", group: "information", formats: ["SVG"] }
  ,{ id: "data-portrait", group: "encoded-media", formats: ["DOM"] }
  ,{ id: "stratigraphy", group: "information", formats: ["SVG"] }
  ,{ id: "toroidal-field", group: "field", formats: ["SVG"] }
  ,{ id: "glyph-ring", group: "symbol", formats: ["SVG"] }
  ,{ id: "activity-rings", group: "telemetry", formats: ["SVG"] }
  ,{ id: "spotlight-card", group: "interface", formats: ["DOM"] }
  ,{ id: "flow-field", group: "field", formats: ["Canvas"] }
  // Calibradas contra las láminas (kit de lámina portado).
  ,{ id: "ring-gauge", group: "telemetry", formats: ["SVG"] }
  ,{ id: "bar-meter", group: "telemetry", formats: ["DOM", "SVG"] }
  ,{ id: "step-graph", group: "telemetry", formats: ["SVG"] }
  ,{ id: "micrografia", group: "texture", formats: ["SVG"] }
];
