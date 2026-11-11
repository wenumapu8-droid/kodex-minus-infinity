# Three.js agent skills — source and license

Estado: PROTOTIPO (rama `proto/threejs-skills`, no canon, no desplegado).

- Fuente: https://github.com/CloudAI-X/threejs-skills
- Commit: `0e181866f095b5f06d005133876e926515390d95`
- Licencia: MIT, Copyright (c) 2026 CloudAI-X. Una copia del archivo `LICENSE` original va dentro de cada carpeta `threejs-*`.
- Copiados sin modificar (solo `SKILL.md` + `LICENSE`): `threejs-fundamentals`, `threejs-geometry`, `threejs-materials`, `threejs-lighting`, `threejs-textures`, `threejs-animation`, `threejs-loaders`, `threejs-shaders`, `threejs-postprocessing`, `threejs-interaction`, `threejs-performance`.
- No copiados: `threejs-react-three-fiber` (KODEX no usa React), `threejs-asset-pipeline` (instruye ejecutar `npx @gltf-transform/cli` / `npx gltfjsx`; fuera de alcance).
- Revisión de seguridad (2026-11-10): los archivos copiados contienen solo documentación y ejemplos de código JS/GLSL. Sin scripts de instalación, hooks, `allowed-tools`, llamadas de red propias ni instrucciones para enviar datos. Las únicas URLs son el CDN de three.js (jsdelivr) en ejemplos de import map y `cdn.example.com` como placeholder.
- No se agregó ni modificó `.claude/settings.json` ni ningún permiso.
