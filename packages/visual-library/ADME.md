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

## First primitives

- `signal-gauge`: reusable gauge with real or editorial data.
- `waveform`: deterministic signal trace.
- `radial-scanner`: orbital telemetry field.
- `journey-field`: routes converging from −∞ through an optional heart to +∞.
- `asset-slot`: safe placeholder for SVG, PNG, GLB or GLTF assets.

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
