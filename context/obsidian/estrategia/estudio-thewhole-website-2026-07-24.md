---
tipo: referencia-diseno
fecha: 2026-07-24
fuente: https://www.thewhole.website
relacionado: [[Home]], [[00-Index/Marca-MOC]]
---

# Estudio — thewhole.website ((W)HOLE)

> Proyecto editorial sobre infraestructura de internet. **No aporta data ni recursos** de negocio (no es joyería/e-commerce). Su valor para Wenu Mapu es **puramente de diseño e interacción**: es casi nuestra misma estética (dark ritual, monoespaciada, navegación por glifos-portal), ya resuelta y pulida. Estudiado en vivo el 2026-07-24.

## Lo más importante: cómo está hecho

**Todo el sitio corre con 4 scripts diminutos + CSS. Sin three.js, sin webgl, sin GSAP, sin React, sin framework.** Esto es enorme: demuestra que el nivel "Awwwards" que buscamos se logra con nuestra misma filosofía (vanilla + performance), no con librerías pesadas. Los 3 scripts que hacen la magia:

1. **`as-dithered-image.js`** — efecto de *dithering* (granulado retro blanco/negro) sobre imágenes. Es la firma visual del sitio. Peso mínimo, look sagrado/analógico. **La técnica más aprovechable para nosotros.**
2. **`splitting.js`** (Splitting.js) — parte el texto en letras/palabras para animar la aparición carácter por carácter, todo con CSS.
3. **`longpress.js`** — gesto de *mantener presionado* para activar. Interacción ceremonial ("sostén para entrar").

## Patrones de interacción que funcionan bacán

- **Hub como constelación de glifos.** 6 portales (círculos punteados) con glifos abstractos, dispuestos en hexágono. Es exactamente nuestra idea de cruz cardinal / constelaciones, pero terminada.
- **Entrada ritual en dos pasos.** Al tocar un glifo: el anillo se pone **dorado** (nuestro Ember), aparece el nombre del reino en el centro ("( Earth )") y pide "CLICK AGAIN TO ENTER THE REALM". Confirmación deliberada, no accidental. Muy on-brand.
- **Sonido activado por defecto** con toggle visible ("SOUND IS ENABLED BY DEFAULT"). Ambiente inmersivo desde el segundo cero.
- **Entrada ceremonial al sitio.** Pantalla negra + círculo "START" + copy "¿listo para bajar por el (rabbit)hole?". Mismo lenguaje que nuestro mandala giratorio de entrada al `/experience/`.
- **Reinos inmersivos full-screen.** Cada portal abre una experiencia oscura donde imágenes dithered y texto se revelan; secciones tipo "Profundiza", "Atlas completo", mundos AR.

## Ideas concretas aplicables al portal Wenu (con esfuerzo)

1. **[BAJO] Dithering en imágenes cósmicas/rituales.** Aplicar `as-dithered-image.js` (o un shader CSS/canvas equivalente) a las fotos del `/experience/`, meteoritos y hero. Da textura sagrada y baja peso. Prototipar en una imagen primero.
2. **[BAJO] Confirmación ritual en dos pasos** en el portal cardinal: hover/primer toque → glifo en Ember + nombre del punto cardinal en mapudungun; segundo toque → entra. Refuerza el "no al lote".
3. **[MEDIO] Revelado de texto con Splitting.js** en eyebrows/manifiesto (letra por letra al entrar en viewport). Ya honramos `prefers-reduced-motion`, mantenerlo.
4. **[MEDIO] Gesto de long-press** como llave secreta de The Hidden Sky: sostener un glifo revela una señal/easter egg. Encaja con la capa oculta ya diseñada.
5. **[BAJO] Toggle de sonido ambiente** en `/experience/` con la misma honestidad de copy (avisar que está activo, dar el switch).
6. **[REFERENCIA] Constelación de glifos como nav** — si algún día el Nav de 4 puertas quiere una versión inmersiva, este es el modelo de layout hexagonal/circular a mirar.

## Regla al aplicar

Inspiración, **no copia**. Nuestros glifos son cardinales mapuche documentados, no los de ellos. Cuidar performance móvil (safe areas, ≥44px, reduced-motion). Ver [[feedback_mejorar_no_quitar]]: sumar sobre `/experience/`, nunca reemplazar.

<!-- wenu-backlinks -->
Relacionado: [[Home]] · [[project_hidden_sky_etica]] · [[project_terminar_sitio_norte_diseno]] · [[reference_portal_experience]]
