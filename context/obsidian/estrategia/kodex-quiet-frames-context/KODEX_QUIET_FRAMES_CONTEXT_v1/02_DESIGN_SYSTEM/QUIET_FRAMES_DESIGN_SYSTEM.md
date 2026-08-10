# QUIET FRAMES DESIGN SYSTEM

## Grid

Desktop:
- 12 columnas.
- Márgenes: `clamp(24px, 4vw, 72px)`.
- Gutter: 12–24px.
- Imagen: 4–6 columnas.
- El resto se conserva como vacío activo.

Mobile:
- 4 columnas.
- Márgenes: 18–24px.
- Imagen: ancho completo o 3 columnas.
- Código vertical se convierte en rail horizontal.

## Ratios

- 1:1 — specimen / archive fragment
- 4:5 — body / material / portrait
- 3:4 — editorial plate
- 16:9 — field note / cinematic residue
- 2:3 — ceremonial chapter plate

## Paleta

```css
--kdx-qf-bg: #050505;
--kdx-qf-bg-violet: #0c0c0f;
--kdx-qf-fg: #e8e4dc;
--kdx-qf-muted: #8c8a85;
--kdx-qf-cyan: #78e8ff;
--kdx-qf-violet: #b18cff;
--kdx-qf-bronze: #d8caa0;
--kdx-qf-line: rgba(232, 228, 220, 0.16);
```

Regla:
- negro + blanco + un solo acento;
- acento máximo 10% de la composición;
- evitar gradientes saturados.

## Tipografía

Display:
- Space Grotesk
- Monument-like
- Sora
- Neue Haas Grotesk-like

Mono:
- IBM Plex Mono
- JetBrains Mono
- Geist Mono

Reglas:
- máximo dos familias;
- microtexto mínimo 10–11 px desktop, 11–12 px mobile;
- tracking amplio;
- comandos en uppercase;
- captions breves.

## Geometría

Usar una sola familia por pieza:

- brackets;
- steps;
- L-frames;
- registration marks;
- axis lines;
- cropped rectangles;
- vertical bars;
- open frames.

## Textura

Máximo dos tratamientos dominantes:

- grayscale;
- contrast;
- grain;
- scanlines;
- xerox;
- thermal;
- dither;
- soft blur;
- posterization.

## Fórmula de densidad

```text
EMPTY SPACE     70%
IMAGE/SYMBOL    20%
GEOMETRY         8%
MICROCODE        2%
```

## Microcopy

```text
KDX://AR-118
FIELD MEMORY / FRAGMENT 01
STATUS / PARTIAL
ORIGIN / UNKNOWN
NODE / 03
CHECKSUM / LATENT
```

## Interacción

Permitido:
- hover que revela metadata;
- click para abrir dossier;
- pointer drift de máximo 3px;
- scan al entrar;
- escape para cerrar overlay.

No permitido:
- múltiples CTAs;
- autoplay sonoro;
- scroll largo;
- interacciones ocultas sin indicación.

## Accesibilidad

- contraste AA;
- `prefers-reduced-motion`;
- alt text;
- foco visible;
- navegación por teclado;
- fallback sin imagen;
- semántica correcta.
