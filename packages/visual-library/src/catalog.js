export const families = [
  { id: "telemetry", label: "Telemetry + HUD", primitives: ["signal-gauge", "metric-bars", "waveform", "radial-scanner"], capabilities: ["metrics", "status", "signal", "dashboard"] },
  { id: "flow", label: "Flows + journeys", primitives: ["journey-field", "sankey", "node-network"], capabilities: ["journey", "process", "network", "timeline"] },
  { id: "taxonomy", label: "Taxonomy + knowledge", primitives: ["radial-taxonomy", "tree", "sunburst", "chord"], capabilities: ["hierarchy", "categories", "relationships", "archive"] },
  { id: "field", label: "Fields + forces", primitives: ["toroidal-field", "vector-field", "particle-field", "vortex"], capabilities: ["energy", "cosmos", "magnetism", "convergence"] },
  { id: "symbol", label: "Glyphs + portals", primitives: ["glyph-ring", "sigil-builder", "pattern-field", "orbital-mark"], capabilities: ["symbol", "portal", "ritual", "identity"] },
  { id: "portrait", label: "Encoded portraits", primitives: ["data-portrait", "point-cloud", "ascii-raster", "halftone"], capabilities: ["portrait", "numbers", "memory", "observer"] },
  { id: "strata", label: "Layers + time", primitives: ["stratigraphy", "contours", "streamgraph", "topography"], capabilities: ["layers", "geology", "history", "transformation"] },
  { id: "editorial", label: "Editorial collage", primitives: ["media-grid", "specimen-card", "quote-panel", "index-rail"], capabilities: ["collage", "story", "copy", "media"] },
  { id: "object", label: "Objects + specimens", primitives: ["asset-slot", "model-viewer", "turntable", "xray-overlay"], capabilities: ["3d", "anatomy", "creature", "artifact"] },
  { id: "interface", label: "Interface + controls", primitives: ["spotlight-card", "morphic-nav", "liquid-panel", "bento-frame"], capabilities: ["navigation", "controls", "glass", "cards", "interface"] },
  { id: "motion", label: "Motion + interaction", primitives: ["route-reveal", "signal-traveler", "heart-pulse", "telemetry-stagger", "cursor-field", "drag-orbit", "scroll-sequence", "audio-reactive"], capabilities: ["hover", "drag", "scroll", "audio", "timeline", "stagger", "path"] }
];

export const engines = {
  native: { license: "MIT / platform", use: ["svg", "canvas", "css", "dom"] },
  echarts: { license: "Apache-2.0", use: ["charts", "gauges", "heatmaps", "sankey"] },
  d3: { license: "ISC", use: ["custom-layouts", "hierarchy", "geo", "shapes"] },
  cytoscape: { license: "MIT", use: ["networks", "graphs", "navigation"] },
  three: { license: "MIT", role: "primary-web-runtime", use: ["3d", "shaders", "particles"] },
  babylon: { license: "Apache-2.0", role: "advanced-runtime-option", use: ["3d", "physics", "xr", "node-materials"] },
  playcanvas: { license: "MIT", role: "editor-and-runtime-option", use: ["3d", "webgpu", "xr", "gaussian-splats"] },
  aframe: { license: "MIT", role: "rapid-webxr-option", use: ["webxr", "vr", "declarative-scenes"] },
  cesium: { license: "Apache-2.0", role: "geospatial-only", use: ["globe", "terrain", "geospatial", "3d-tiles"] },
  open3d: { license: "MIT", role: "offline-asset-pipeline", use: ["point-clouds", "mesh-processing", "reconstruction", "conversion"] },
  motion: { license: "MIT core", use: ["hover", "drag", "layout", "gesture"] },
  anime: { license: "MIT", role: "primary-dom-svg-motion", use: ["waapi", "svg-morph", "timeline", "stagger", "path-following"] },
  kokonut: { license: "MIT", role: "pattern-source-only", use: ["cards", "navigation", "flow-field", "glass", "bento", "activity-rings"] }
};

export const coverage = [
  { reference: "KODEX flow map", families: ["flow", "telemetry", "symbol"], coverage: 96 },
  { reference: "Signal vortex poster", families: ["field", "telemetry", "editorial"], coverage: 94 },
  { reference: "Glyph system board", families: ["symbol", "telemetry", "editorial"], coverage: 97 },
  { reference: "Toroidal body diagram", families: ["field", "object", "symbol"], coverage: 93 },
  { reference: "Black/red media collage", families: ["editorial", "motion", "object"], coverage: 95 },
  { reference: "Radial information map", families: ["taxonomy", "flow"], coverage: 98 },
  { reference: "Numeric silhouette", families: ["portrait"], coverage: 99 },
  { reference: "Layered stratigraphy", families: ["strata"], coverage: 99 },
  { reference: "Anatomy / creature / deity", families: ["object", "telemetry", "editorial"], coverage: 90 }
  ,{ reference: "Animated component gallery", families: ["interface", "motion", "telemetry"], coverage: 96 }
];
