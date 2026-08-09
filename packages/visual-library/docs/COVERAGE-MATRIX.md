# Reference coverage matrix

The library treats a reference as a combination of reusable visual families,
not as a bitmap to imitate. A new composition should require custom work only
for its central thesis, authored imagery, and unusually specific interaction.

| Reference pattern | Primary family | Supporting families | Default engine |
| --- | --- | --- | --- |
| HUD, dials, signals, status | telemetry | motion, editorial | native SVG / ECharts |
| Journey, process, branching map | flow | telemetry, symbol | D3 / Cytoscape |
| Circular categories and relationships | taxonomy | flow, editorial | D3 / ECharts |
| Vortex, magnetism, particles | field | motion, telemetry | Three.js / native Canvas |
| Portal, sigil, recursive ornament | symbol | field, motion | SVG / Anime.js |
| Portrait made of digits or points | portrait | motion, editorial | Canvas / SVG |
| Geological or temporal layers | strata | telemetry, editorial | D3 / SVG |
| Magazine, specimen or media collage | editorial | object, motion | DOM / Motion |
| Heart, skull, organism, deity, artifact | object | telemetry, editorial | model-viewer / Three.js |
| Hover, drag, scroll or audio response | motion | any family | Motion / Anime.js |

## Composition contract

Every scene is assembled from five replaceable inputs:

1. `intent`: what the scene communicates;
2. `data`: real, simulated, or explicitly editorial values;
3. `content`: copy and links;
4. `assetSlots`: licensed SVG, PNG, video, GLB or GLTF;
5. `theme`: KODEX tokens, palette, density, texture and motion policy.

The resolver ranks families from capabilities and returns primitives and asset
slots. This makes reference matching repeatable while preserving authorship in
the central concept.

## Coverage target

“99%” is treated as an operational goal, not a false precision claim. We track:

- percentage of new references mapped without a new primitive;
- time from reference to working composition;
- number of one-off components introduced;
- percentage of external assets with verified provenance;
- mobile, reduced-motion and fallback success rates.
