# Drive Atlas crosswalk — 2026-08-09

This file records the design implications extracted from the connected KODEX
Drive sources. It does not duplicate private reference media or promote draft
copy into canon.

## Grounded sources

- `07A_KODEX_VISUAL_ATLAS_MASTER — Inventario, Nodos y Conexiones`
  (`1RLhA2xmApx1YDfHIeWjIqlYz17OHkuxFbfUXejzcS_4`)
- `10_HANDOFF_CLAUDE→CHATGPT — Grafo recuperado, 54 nodos y qué falta 2026-08-07`
  (`1nyhs1KoCq8L0DQZtFLxGHZvXexvIBgGhJGYAndw0l0s`)

## What the Atlas actually contains

The master sheet is not one flat image inventory. The handoff identifies four
record families with different layouts: 74 visual specimens, 54 node
declarations, 74 authored edges, and 24 research references. Agents must not
parse node declarations or edges as source URLs.

The visual library therefore needs to solve more than posters:

1. authored graph and relationship views;
2. journey currents that branch, converge, mutate and remember;
3. living gates, membranes and morphogenesis;
4. layered anatomy with symbolic fields kept epistemically separate;
5. a bestiary with taxonomic and rights provenance;
6. territorial, ecological and cultural review gates;
7. three scales: constellation, node and depth;
8. explicit mobile, poster and reduced-motion states.

## Resource implications

| Drive requirement | Minimal preferred stack | Rights / evidence gate |
| --- | --- | --- |
| authored edges and living journey | d3-sankey + Anime.js | edge validity remains data, not decoration |
| morphing membranes and living portal | Shader Park + Three.js | fallback SVG; never claim biological simulation |
| terrain, fields and memory strata | d3-contour + D3 | label derived versus observed data |
| body, heart and cranial layers | model-viewer + audited Z-Anatomy/BodyParts3D extract | CC-BY-SA derivative obligations |
| animal and plant bestiary | PhyloPic + Smithsonian/NIH candidates | exact record license and species identity |
| glyph mutation | SVG + Flubber + Anime.js | cultural symbols require provenance review |

## Canon boundaries discovered in Drive

- The graph contains four unresolved destination nodes. Do not invent them.
- `C-09` is an unresolved distinction between epistemic class and record
  status. Do not normalize it silently.
- Cultural claims marked `REVIEW_REQUIRED` or `AUTHORIZATION_REQUIRED` cannot
  be promoted by a visual-library recipe.
- The heart orients; it does not score or force a route.
- `−∞` remains a KODEX mathematical-philosophical construction, not a
  recognized scientific theory.

## Agent rule

Before adding a new visual dependency, first ask whether the Drive requirement
can be resolved by one of the routes above. The catalog may be large; each
scene should still ship only one to three runtime tools.
