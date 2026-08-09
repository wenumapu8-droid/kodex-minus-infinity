# KODEX−∞ Agent Resource Guide

This is the permanent entrypoint for any agent composing KODEX visuals. Read
this file, `assets/capability-router.json`, `assets/resource-catalog.json`,
`assets/reference-map.json`, and `assets/registry.json` before introducing a
new dependency or external asset. `docs/ATLAS-MISSION.md` defines governance
and coverage metrics. `docs/DRIVE-ATLAS-CROSSWALK-2026-08-09.md` connects the
resource system to the authored Drive graph without copying private media.

## Selection order

1. Decompose the reference into visual families, not surface appearance.
2. Search `reference-map.json` for an analogous composition.
3. Reuse an existing primitive or recipe.
4. Select the smallest resource set from `resource-catalog.json`.
5. If an external asset is needed, prefer CC0 and public-domain sources.
6. Register the exact asset in `assets/registry.json` before placing its bytes.
7. Produce poster, reduced-motion, and mobile fallbacks.
8. Keep authoring/pipeline tools out of the production bundle.

## Default stack

| Need | First choice | Escalate only when |
| --- | --- | --- |
| DOM/SVG motion | Anime.js | drag/layout physics needs Motion |
| custom information design | D3 | a standard dashboard is faster in ECharts |
| graph navigation | Cytoscape.js | very large WebGL graphs need Sigma.js |
| web 3D | Three.js | specialist physics/editor/geospatial features are required |
| 2D GPU collage | PixiJS | simple SVG/Canvas is insufficient |
| sound and synchronization | Tone.js | only a waveform player is needed, then wavesurfer.js |
| GLB display | model-viewer | custom shaders or scene logic need Three.js |
| lightweight shader hero | OGL | scene graph, loaders or broad tooling need Three.js |
| GLB optimization | glTF Transform + gltfpack | Draco/KTX2 only for measured gains |
| unusual chart prototype | RAWGraphs | production interaction requires D3/ECharts |
| public drawing wall | Fabric.js | simple SVG/text input is sufficient |
| living journey / authored edges | d3-sankey + Anime.js | plain SVG paths cover a small graph |
| membrane / procedural organism | Shader Park + Three.js | an SVG morph communicates the state |
| anatomy layers | model-viewer + audited extract | a licensed poster is sufficient |
| bestiary silhouette | PhyloPic record | a creator-owned SVG already exists |

## Rights gates

- `preferred`: may be evaluated immediately, but individual assets still need
  technical review and a registry entry.
- `specialist`: use only when a recipe requires its distinctive capability.
- `conditional`: verify exact file, version, author, and license.
- `quarantine`: download nothing into production until record-level review.
- `discovery-only` / `reference-only`: use to find ideas, never as proof of reuse rights.

“Free,” embeddable, downloadable, and visible in search are not licenses.

## Reference decomposition

The supplied set resolves into reusable families: flow maps, vortex/fields,
telemetry, glyph systems, toroidal anatomy, editorial collage, radial taxonomy,
numeric portrait, stratigraphy, creatures/specimens, and motion/interface
patterns. `assets/reference-map.json` records the exact mapping.

## Agent query examples

```text
Intent: scientific anatomical infographic with magnetic field and metrics
Families: object + field + telemetry
Runtime: Three.js + D3 or ECharts
Asset search: NIH 3D / Smithsonian OA, record-level review
Fallback: WebP poster + reduced-motion SVG field
```

```text
Intent: map from −∞ through heart to +∞
Families: flow + field + symbol + telemetry
Recipe: journey-field + route-reveal + heart-pulse + waveform
Runtime: SVG + Anime.js; Canvas only for ambient particles
```

## Maintenance

The catalog is a decision registry, not a dependency list. Adding a resource
does not authorize installing it. Update `reviewedAt`, license evidence, and
status whenever a resource's terms materially change. New visual references
must first map to existing families; create a new primitive only when coverage
cannot be achieved by composition.
