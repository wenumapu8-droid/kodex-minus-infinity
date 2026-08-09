import { families } from "./catalog.js";

const aliases = {
  infographic: ["metrics", "categories", "relationships"],
  hud: ["metrics", "status", "signal"],
  map: ["journey", "network", "relationships"],
  poster: ["story", "copy", "media"],
  anatomical: ["anatomy", "3d"],
  psychedelic: ["energy", "cosmos", "transformation"],
  scientific: ["metrics", "layers", "status"]
};

export function resolveVisualRecipe(input = {}) {
  const requested = new Set([
    ...(input.capabilities || []),
    ...String(input.intent || "").toLowerCase().split(/\W+/),
    ...Object.entries(aliases).flatMap(([word, values]) => String(input.intent || "").toLowerCase().includes(word) ? values : [])
  ]);
  const ranked = families.map((family) => ({
    ...family,
    score: family.capabilities.reduce((score, capability) => score + (requested.has(capability) ? 2 : 0), 0)
  })).sort((a, b) => b.score - a.score);
  const selected = ranked.filter((item) => item.score > 0).slice(0, input.maxFamilies || 3);
  const fallback = families.find((item) => item.id === "editorial");
  return {
    families: selected.length ? selected : [fallback],
    primitives: [...new Set((selected.length ? selected : [fallback]).flatMap((item) => item.primitives))],
    assetSlots: requested.has("3d") || requested.has("anatomy") || requested.has("creature") ? ["hero-object", "fallback-poster"] : [],
    policy: { reducedMotion: true, responsive: true, provenanceRequired: true }
  };
}
