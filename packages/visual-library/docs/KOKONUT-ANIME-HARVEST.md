# Kokonut UI + Anime.js harvest

## Decision

Kokonut UI is an MIT-licensed pattern source. KODEX does not install its full Next/React/Tailwind/shadcn dependency tree. Useful interaction mechanics are adapted into framework-neutral primitives with attribution. Anime.js is the primary DOM/SVG motion layer; its WAAPI subpath is preferred for small, hardware-accelerated sequences.

## Harvest matrix

| Source pattern | KODEX primitive / recipe | Status | Use |
|---|---|---|---|
| Flow Field | `flow-field` | adapted | signal vortex, cosmos, ambient hero |
| Apple Activity Card | `activity-rings` | adapted | coherence, signal, memory telemetry |
| Spotlight Cards | `spotlight-card` | adapted | folio nodes, specimen cards, archive cards |
| Background Paths | `journey-field` | already covered | −∞ to +∞ routes and living map |
| Liquid Glass Card | `liquid-panel` | recipe queued | overlays and floating controls only |
| Morphic Navbar / Toolbar | `morphic-nav` | recipe queued | persistent scene navigation |
| Bento Grid | `bento-frame` | recipe queued | collage and archive layouts |
| Matrix / glitch / sliced text | `encoded-type` | recipe queued | thresholds and transmission states |
| Carousel / card stack | `memory-deck` | recipe queued | archive browsing |
| Mouse effect / attract button | `observer-attractor` | recipe queued | aware/locked/observing states |

## Anime.js motion grammar

- `route-reveal`: staggered path opacity and dash offset.
- `signal-traveler`: node or glyph follows a route.
- `heart-pulse`: slow breathing scale and luminance, never a frantic loader.
- `telemetry-stagger`: meters and labels resolve in information order.
- `glyph-assembly`: segments rotate and converge into a sign.
- `scene-threshold`: text splitting and staged entrance.

Rules: animate transform/opacity first; pause work outside the viewport; use `prefers-reduced-motion`; keep looping ambience slow; do not use motion to compensate for weak hierarchy.

## Provenance

- Kokonut UI repository: https://github.com/kokonut-labs/kokonutui — MIT.
- Anime.js documentation: https://animejs.com/documentation/web-animation-api/ — Anime.js WAAPI module.
- Adaptation: KODEX−∞ visual library. No screenshots, brand assets, demo copy, or proprietary media are redistributed.
