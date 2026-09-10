# OCIN / BOOK → KODEX protocol

This protocol turns the digital portfolio into an authored-source library. It
does **not** make every portfolio image a production asset. Originals remain the
source of truth; KODEX consumes reviewed derivatives.

## Three-layer model

1. **Source** — the original work in `OCIN / BOOK`, preserving filename, date,
   authorship and context.
2. **Semantic record** — a small manifest entry describing literal content,
   motifs, visual families, intended uses, rights, visibility and allowed
   transformations.
3. **Production derivative** — an optimized SVG, WebP, AVIF, texture, GLB,
   palette, mask, shader input or code recipe with provenance back to the source.

An agent may search records freely. It may only load or publish source bytes
when the entry's visibility and rights allow it.

## Naming

Human-facing files use:

`OCIN-{CLASS}_{SUBJECT}_{MECHANISM}_{STATE}.{ext}`

Examples:

- `OCIN-WORK_TOROIDAL-FIELD_RECURSIVE-LINES_MASTER.png`
- `OCIN-PATTERN_TRIANGULAR-GLYPHS_REPEATABLE_SOURCE.svg`
- `OCIN-TEXTURE_MOLECULAR-MEMBRANE_IRIDESCENT_SOURCE.jpg`
- `OCIN-STUDY_FRACTAL-BRANCHING_FLOW-REFERENCE.png`

Stable IDs do not include folders or dates and never change after assignment:
`ocin.work.toroidal-field-recursive-lines`.

## What agents must record

- **Literal visual summary:** what can be seen without interpretation.
- **Motifs:** toroid, spiral, seed, eye, root, membrane, lattice, glyph, etc.
- **Families:** one or more existing KODEX families from `src/catalog.js`.
- **Best for:** concrete scene jobs, not style adjectives.
- **Transform:** what may be extracted: palette, mask, topology, pattern,
  material, composition, motion path or direct asset.
- **Rights and visibility:** creator-owned does not automatically mean public.
- **Context gates:** cultural provenance and science/metaphor status when needed.

## Selection rule

Agents query metadata first and inspect pixels only for shortlisted candidates.
This reduces vision use while improving decisions. A result is valid only if it
answers all four questions:

1. What scene job does it solve?
2. Which reusable primitive or recipe receives it?
3. What transformation is permitted?
4. What fallback works on mobile and reduced motion?

## Production recipes

| Portfolio source | Derivative | KODEX receiver | Typical fallback |
| --- | --- | --- | --- |
| Circular geometry | SVG paths + parameters | `glyph-ring`, `radial-scanner` | static SVG |
| Fractal composition | vector field or seed data | `flow-field`, `living-contours` | WebP poster |
| Toroidal work | line topology + depth mask | `toroidal-field` | layered SVG |
| Molecular image | seamless texture + normal map | `specimen-viewer`, shader material | optimized WebP |
| Mandala | modular segments | `core-glyph`, `pattern-field` | SVG sprite |
| Psychedelic artwork | palette + motion grammar | scene tokens and timeline | creator-owned poster |
| Photography | crop set + focal metadata | `media-grid`, `specimen-card` | responsive image |

## Hard boundaries

- Never publish the whole private portfolio to make agent search easier.
- Never infer open licensing from presence in Drive.
- Never label culturally specific work as generic "tribal" decoration.
- Never convert a metaphorical field diagram into a scientific claim.
- Never overwrite an original with an optimized derivative.
- Never introduce a new runtime library when an existing primitive can receive
  the derivative.

## Batch workflow

Process one visual family at a time: inventory → semantic naming → metadata →
shortlist → derivative recipes → rights review → production export. Start with
the highest-value families for current scenes: toroidal, fractal, triangular,
mandala, molecular and psychedelic.
