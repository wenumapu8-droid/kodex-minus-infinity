# KODEX 3D stack

The default is one runtime plus an offline asset kitchen. More engines do not
automatically create more capability; they create more bundle weight and more
maintenance.

## Decision matrix

| Need | Default | Use an alternative when |
| --- | --- | --- |
| Interactive objects, particles, shaders | Three.js | Babylon.js is justified by complex physics or tooling |
| Visual collaborative editor | PlayCanvas | The scene benefits from editor-first production |
| Fast WebXR prototype | A-Frame | The experience is primarily headset/VR driven |
| Planet, territory, terrain, globe | CesiumJS | Real geospatial coordinates are part of the meaning |
| Point clouds, reconstruction, mesh cleanup | Open3D offline | Never as the default browser renderer |
| Materials, HDRIs, generic props | Poly Haven / ambientCG | Prefer CC0 and convert to web-ready formats |
| Rare anatomy, artifacts, creatures | Sketchfab / museums | Exact item license passes review |

## Web asset contract

- Delivery format: GLB/glTF; KTX2/Basis textures when practical.
- Geometry: Draco or Meshopt only when the measured download win justifies it.
- Every hero model has poster-image and reduced-motion fallbacks.
- LOD budget: mobile, standard and hero tiers.
- No runtime downloads from third-party galleries in production.
- Assets enter through the registry with source, author, exact license,
  attribution, modifications, polygon count, texture memory and file size.

## Reference-to-scene rule

A reference is decomposed into `layout + subject + material + light + motion +
data overlay`. The resolver reuses each layer independently. A downloaded model
may supply the subject, but never dictates KODEX composition or meaning.

## Current recommendation

Keep Three.js as the production renderer for KODEX. Add Open3D/Blender/gltf-
transform to the asset pipeline later. Register PlayCanvas, Babylon.js, A-Frame
and CesiumJS as capability fallbacks rather than shipping all of them.
