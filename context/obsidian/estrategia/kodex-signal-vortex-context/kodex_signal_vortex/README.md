# KODEX-∞ / SIGNAL MYCELIUM

Prototipo WebGL2 multipass inspirado en el video de referencia: filamentos tipo circuito, nodos eléctricos, vórtices, estelas, glow y contraste negro/cian/ámbar.

## Abrir

1. Abre `index.html` en Chrome, Edge o Safari moderno.
2. En móvil, toca la pantalla para mostrar los controles.
3. `MUTATE` genera otra topología; el puntero o dedo altera el campo.

No usa imágenes ni video como fondo. Toda la pieza se genera en tiempo real con GLSL.

## Pipeline

1. **Source pass**: redes celulares, segmentos ortogonales, Voronoi, espirales y chispas.
2. **Feedback pass**: memoria temporal ping-pong, deriva, expansión y persistencia.
3. **Display pass**: bloom aproximado, aberración cromática, scanline, grain, vignette y tone mapping.

## Controles

- **Pause / Play**: detiene o reanuda el tiempo.
- **Mutate**: cambia la semilla y limpia la memoria.
- **Speed**: velocidad del campo.
- **Energy**: intensidad, exposición y bloom.
- **Full**: pantalla completa.
- **Pointer / touch**: desplaza el centro gravitacional del sistema.

## Integración en Astro

Copia `index.html` y `src/app.js` dentro del proyecto. Para convertirlo en componente:

- monta el canvas únicamente en cliente (`client:load` o `client:visible`),
- destruye texturas, FBO y listeners al desmontar,
- conecta `speed`, `energy`, `seed`, `pointer` y bandas de audio como uniforms,
- conserva UI y navegación fuera del shader.

## Rendimiento

El render interno se reduce intencionalmente para móvil. El `devicePixelRatio` está limitado a 1.55 y la escala es 0.72 en pantallas pequeñas. Ajusta estas dos líneas en `resize()` si necesitas más resolución o más FPS.
