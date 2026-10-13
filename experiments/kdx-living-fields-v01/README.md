# KODEX−∞ / Living Fields v0.1

**Estado:** PROTOTYPE · 12 octubre 2026 · No integrado/desplegado en producción.

## Uso

Abrir `KODEX_Living_Fields_v01.html` en un navegador moderno. No requiere internet ni servidor externo. WebGL renderiza shaders originales en tiempo real; existe un fallback de Canvas2D para dispositivos sin WebGL.

## Experiencias

| ID | Escena KODEX | Sistema |
| --- | --- | --- |
| 01 UMBRAL | THRESHOLD | Apertura circular, filamentos y respuesta al observador |
| 02 MEMORIA | ARCHIVE | Ondas de materia y ecos de contacto |
| 03 COSMOS | COSMOLOGY | Pliegues radiales y estructuras luminosas |

## Interacciones

- Mover cursor / deslizar: alteración local del campo.
- Tocar / pulsar: huella temporal sobre el campo (12 últimas).
- Mantener presionado 1,4 s: estado OPEN, nuevo registro.
- Resonancia / Mutación / Persistencia: parámetros shader entre 0–100%.
- MUTAR: nueva semilla procedural, conserva huellas.
- REINICIAR: elimina todas las huellas y vuelve a UMBRAL.
- CAPTURAR PNG: descarga imagen del canvas (sin el marco editorial).
- EXPORTAR ESTADO: genera JSON con semilla, parámetros y memorias.
- CARGAR ESTADO: rehidrata un JSON válido exportado previamente.
- LocalStorage: persistencia local best-effort, si el navegador lo permite.
- Atajos: 1,2,3 cambia campo; barra espaciadora pausa/reanuda (salvo en input).

## Arquitectura técnica

Archivo único HTML/CSS/JavaScript, render WebGL 1.0 / GLSL ES 1.00 (sin librerías ni CDNs). Renders de respaldo Canvas2D. Dos archivos `.frag` / `.vert` extraídos para facilitar integración. Uniforms:

`u_res`, `u_time`, `u_mode`, `u_resonance`, `u_turbulence`, `u_persistence`, `u_open`, `u_presence`, `u_pointer`, `u_seed`, `u_c0`, `u_c1`, `u_c2`, `u_marks[12]`.

Las memorias son una **representación visual y un registro estructurado de las interacciones**, no un sistema cognitivo o IA.

## Integración sugerida en el proyecto Astro

1. Integrar como un componente aislado y cargado bajo demanda, sin reemplazar el runtime existente.
2. Trasladar shaders al catálogo `SHADER_CATALOG.md`, con inputs, coste, escena y fallback.
3. Reutilizar tokens visuales existentes en lugar de incorporar CSS global.
4. Evitar crear dos ciclos de render simultáneos si ya existe un pipeline compartido.
5. Validar WebGL, degradación, touch, reduced motion, contraste, capturas y rendimiento en dispositivos reales antes de desplegar.
6. Añadir integración al Scene Bible y actualizar Decision Log/Current State tras aceptación.

## Procedencia y licencia

- Inspiración declarada: [HypnoticCanvas, Mike Penz](https://github.com/mikepenz/HypnoticCanvas). Se estudiaron su presentación y categorías de shaders; **no se copiaron shaders del repositorio**.
- GLSL de esta entrega escrito para este prototipo de KODEX por colaboración Ocín/ChatGPT. No incorpora dependencias o assets externos.
- No se afirma que las técnicas generales (ruido, fBm, campos radiales) sean invenciones exclusivas.
- Si se añadiesen shaders de terceros, verificar la licencia individual; el módulo adicional de HypnoticCanvas contiene shaders NC.
- Licencia de distribución del proyecto final: pendiente de decisión de Ocín.

## Validación realizada

- Estructura e interacciones DOM inspeccionadas con Chromium headless en modo Canvas2D; se verificó cambio de modos, toques, parámetros, interfaz móvil sin desbordamiento horizontal y ausencia de errores JS.
- Shader GLSL compilado y enlazado con Mesa OpenGL compatible (shader adaptado mínimamente eliminando el `precision` ES), y se renderizó un frame por modo sin errores GL.
- La ejecución **WebGL 1.0 dentro de un navegador real con GPU** y los FPS móviles quedan por validar: el navegador de pruebas de este entorno tiene WebGL deshabilitado.

**Clasificación KODEX:** visual reference + implemented prototype + partially tested feature, **no** deployed feature.