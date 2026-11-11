# PROTOTIPO — MACHINE (three.js)

Estado: **PROTOTIPO**. No es canon, no está conectado a rutas del sitio ni a la secuencia de escenas, no está desplegado.

Prueba de concepto para la escena MACHINE ("un device multidimensional retrofuturista, una tecnología fuera del tiempo"): un instrumento imposible de cuatro anillos en gimbal anidado, semilla de la vida en tres planos ortogonales, núcleo rojo y dial de 120 marcas.

- Un solo archivo `index.html`, three.js r186 por import map desde jsdelivr, sin build.
- Shader GLSL propio en los anillos: oro oxidado cepillado, borde fresnel ámbar, banda de glifos 3×5 grabados que rotan, cabezal de escaneo rojo.
- Post: RenderPass → UnrealBloomPass → pase propio (scanlines, viñeta, grano, separación cromática solo en pulso) → OutputPass.
- Interacción: arrastrar = orbitar (OrbitControls), tocar = pulso (raycast: el anillo tocado se enciende en rojo).
- Rendimiento: DPR máx 2, ~1 draw call por pieza (ticks instanciados, semilla fusionada), baja DPR y resolución de bloom si mide < 48 fps. `prefers-reduced-motion` ralentiza todo.
- Parámetros: `?capture=1` oculta la pista; `?manual=1` detiene el loop y expone `window.__kdxRender(t)` para capturas deterministas.

Paleta: negro obsidiana `#050608`, oro oxidado `#8c6a2f`, ámbar `#f4b72a` / `#f08a24`, rojo KODEX `#ff3833`. Sin verde ácido.

Validado solo en Chromium headless (SwiftShader, CPU) a 390×844 y 412×915. **No validado en dispositivo real**; los 60 fps en móvil están sin confirmar.

Construido siguiendo `.claude/skills/threejs-*` (ver `.claude/skills/THREEJS_SKILLS_SOURCE.md`).
