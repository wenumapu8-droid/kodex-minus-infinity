export * from "./primitives.js";
export * from "./recipes/journey-field.js";

export const catalog = [
  { id: "signal-gauge", group: "telemetry", formats: ["DOM"] },
  { id: "waveform", group: "signal", formats: ["SVG"] },
  { id: "radial-scanner", group: "telemetry", formats: ["SVG"] },
  { id: "asset-slot", group: "media", formats: ["SVG", "PNG", "GLB", "GLTF"] },
  { id: "journey-field", group: "recipe", formats: ["DOM", "SVG"] }
];
