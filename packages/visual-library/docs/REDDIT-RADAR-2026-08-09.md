# Reddit Radar — 2026-08-09

Reddit is a discovery surface for KODEX−∞, not a license authority. Every item
below was translated into a capability question and then checked against an
official project page or repository before entering the main catalog.

## Adopted after official verification

| Discovery | KODEX value | Decision |
| --- | --- | --- |
| Minimal WebGL discussions | Smaller shader-first scenes than Three.js | Add OGL as preferred and regl/TWGL as specialists |
| RAWGraphs recommendations | Rapid prototypes of unusual information graphics | Add RAWGraphs as an authoring tool; export vectors or recreate with D3 |
| Force-directed graph examples | Atlas and constellation navigation | Add framework-neutral `force-graph`; keep Cytoscape as default |
| Motion-authoring discussions | High-fidelity timelines without hand-tuning every value | Add Theatre.js conditionally: Apache core, AGPL Studio in development only |
| GLB optimization threads | Reduce hero assets before web delivery | Add glTF Transform, meshoptimizer/gltfpack, Draco and KTX-Software |
| Lottie/Rive discussions | Reusable animated symbols and stateful characters | Add runtimes; asset and authoring rights remain separate |

## Radar only

| Discovery | Why it is held |
| --- | --- |
| Cel Lab procedural VFX editor | Useful offline concept, but repository license and maintenance must be verified before adoption |
| Shadertoy examples | Shader rights vary by author; visibility is not permission |
| Newly launched “Three.js asset libraries” | Often commercial shops with a free tier, not open catalogs |
| One-off demos posted to r/webdev/r/threejs | Study mechanisms; do not ingest code without repository and license evidence |

## Search protocol for future agents

1. Search Reddit for capability language, not KODEX style words.
2. Record the post URL, date, claimed project and claimed license.
3. Open the official repository/site and verify license, maintenance and build fit.
4. Classify as `preferred`, `specialist`, `conditional`, `quarantine`,
   `reference-only`, `discovery-only`, or `radar-only`.
5. Add it to `resource-catalog.json` only if it fills a capability gap.
6. Never add a package to production merely because it entered the catalog.

Useful recurring queries:

- `site:reddit.com/r/threejs open source shader editor glTF optimization`
- `site:reddit.com/r/generative open source web audio visualization`
- `site:reddit.com/r/datavisualization unusual open source chart library`
- `site:reddit.com/r/webdev interactive art WebGL open source`

## Evidence trail

- Reddit radar posts are for discovery and community experience.
- Official repositories and project documentation are the licensing evidence.
- Exact external media files still require their own entry in
  `assets/registry.json`, even when the host platform is preferred.
