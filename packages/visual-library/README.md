# @kodex/visual-library

Reusable visual grammar for KODEX−∞. It separates mechanics, identity, content,
and licensed source assets so pages can be composed without rebuilding common
visual systems.

## Run

```bash
npm test
npm run validate:assets
npm run dev
```

Open `http://localhost:4173`.

## Architecture

```text
content + data + asset slot
          ↓
recipe (semantic composition)
          ↓
primitive (SVG / Canvas / DOM)
          ↓
KODEX tokens + motion policy
```

## Coverage system

The package now includes ten reusable reference families, a capability resolver,
and a coverage matrix. Describe an intent such as `anatomical scientific HUD`
and `resolveVisualRecipe()` returns the strongest families, primitives, required
asset slots, and safety policy. See `docs/COVERAGE-MATRIX.md`.

## Current primitives

- `signal-gauge`: reusable gauge with real or editorial data.
- `waveform`: deterministic signal trace.
- `radial-scanner`: orbital telemetry field.
- `journey-field`: routes converging from −∞ through an optional heart to +∞.
- `asset-slot`: safe placeholder for SVG, PNG, GLB or GLTF assets.
- `metric-bars`: compact editorial telemetry.
- `radial-taxonomy`: circular information and relationship maps.
- `data-portrait`: deterministic numeric silhouettes.
- `stratigraphy`: layered time, geology, memory or transformation.
- `toroidal-field`: energy and magnetic-field compositions.
- `glyph-ring`: procedural portal and symbol scaffolding.

## Asset policy

External files are never accepted from search results alone. Every asset needs
an entry in `assets/registry.json` with source URL, author, license, license URL,
modifications, attribution text, and review status. Unknown or incompatible
licenses fail validation.

The reference images supplied by Ocín are direction and provenance inputs; they
are not redistributed by this package.

## Integration

The library has no mandatory runtime dependency. Import `src/index.js`, mount a
recipe into any DOM node, and pass new copy/data without changing the drawing
code. Astro can load it with a client script or wrap it in `.astro` components.

## Agent Atlas

Start with `docs/AGENT-RESOURCE-GUIDE.md`. The machine-readable
`assets/capability-router.json` maps scene intent to the smallest viable stack,
while `assets/resource-catalog.json` records runtime, authoring, pipeline,
asset-source and radar-only resources. Catalog membership never authorizes
automatic installation or asset ingestion.

## Agent entrypoint

Every agent must begin with `docs/AGENT-RESOURCE-GUIDE.md`. The searchable
resource registry lives in `assets/resource-catalog.json`; the supplied visual
references are decomposed in `assets/reference-map.json`. These files are the
shared decision layer: they describe what may solve a scene without making
every catalogued tool a production dependency.
