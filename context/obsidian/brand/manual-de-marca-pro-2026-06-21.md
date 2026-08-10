# Manual de marca PRO + Audit de diseño — Wenu Mapu
> Para que se respete SIEMPRE. La ley vive en `src/styles/tokens.css`; este doc la explica + audita dónde se rompe. 2026-06-21.
> Principio rector: dark-first, oro como único acento, coherencia obsesiva (Apple con chamán).

---

## 1. TIPOGRAFÍA (la ley)

**4 familias, un rol cada una — no mezclar:**
- **Instrument Serif** (`--font-display`) → títulos editoriales / wordmark. NUNCA para body.
- **Cormorant Garamond Italic** (`--font-serif`) → frases rituales / manifiesto / lede poético.
- **Instrument Sans** (`--font-sans`) → body, UI, e-commerce, precios, eyebrows, botones.
- **JetBrains Mono** (`--font-mono`) → solo datos técnicos puntuales (SKU).

**Escala (usar SIEMPRE el token, nunca px sueltos):**
mega · display · h1 · h2 · h3 · body-lg · body · small · eyebrow · tiny.

**Pesos:** thin 300 · regular 400 · medium 500 · bold 700. Regla: títulos display = 400 (la fuente ya es elegante; bold la ensucia). Body = 400. Eyebrows/labels = 500 + mayúsculas + `--letter-spacing-ritual` (0.18em). Cursiva ritual = Cormorant 300/400 italic.

**Line-height:** títulos 1.0–1.1 · body 1.6 · lede 1.55–1.7. Nunca títulos con line-height de body ni viceversa.

**Jerarquía por página (obligatoria, una sola por sección):**
eyebrow (sans, mayúscula, oro) → título (display) → lede (serif italic) → body (sans). Si una sección repite dos títulos del mismo tamaño, está mal.

---

## 2. COLOR (la ley)

**Paleta canónica (3 + soporte):**
- Obsidian `#0a0a0a` (fondo base) · Charcoal `#121212` · Graphite `#1a1a1a`.
- Bone `#f0ede8` (texto primario) · Sand `#9a948a` (secundario) · Silver `#b8b4aa` (silenciado).
- **Ember/oro `#c9a84c` = ÚNICO acento.** Bronze `#6a4a28` = acento dim.

**Reglas duras:**
- Oro = solo acento (CTA, eyebrow, líneas, hover). NUNCA grandes áreas de oro ni oro sobre oro.
- Morados nebulosa / earth palette = SOLO capas atmosféricas de fondo (hero, divisores, footer sacro). NUNCA sobre producto ni texto.
- Texto: bone sobre oscuro; jerarquía bone→sand→silver. No inventar grises.

**⚠ Hallazgo de audit (color):** hay DOS dorados en tokens — `--ember #c9a84c` (canónico) y `--gold-audit #C4935A` (del audit UX). Conviven y se usan mezclados → inconsistencia sutil. **Decidir uno y unificar.** Recomiendo el canónico `#c9a84c` y dejar `--gold-audit` como alias de ese.

---

## 3. ESPACIADO & RITMO

Escala: space-1 (4px) → space-9 (13rem). Usar SIEMPRE el token.
- Padding vertical de sección: `--space-7` (6rem) desktop, baja en mobile. Mantener el MISMO ritmo entre secciones — hoy varía.
- Gutter lateral: `--gutter` (clamp 1.25–3rem). Max ancho contenido: `--max-w` 1400 / narrow 760.
- Bordes: `--border-thin` 1px. Radius 0 (brutalist — no redondear).

**⚠ Hallazgo (espaciado):** padding de secciones desparejo entre bloques (algunos hardcodean px/rem inline en vez del token) → ritmo irregular. Normalizar todo a `--space-*`.

---

## 4. AUDIT — oportunidades de mejora (lo que viste + lo técnico)

### Arquitectura / contenido por página
- **Cada página de categoría debe mostrar SU catálogo real:** piercing → labrets/septums; amuletos → colgantes; ritual objects → arte/escultura/cuadro. Hoy algunas no surfacean su grilla de producto correcta. (Depende también de fotos por SKU → agente de inventario.)
- **Fotos de vitrina** no se usan en ningún lado → desperdiciadas. Sumarlas como toma secundaria/lifestyle.

### Footer
- **Banners de footer con texto baked cuando no deberían** → usar versión sin escritura en el footer.
- El **texto del footer debería cambiar según el banner** (hoy es fijo / no acompaña). Sistematizar.

### Tipografía / layout
- **Sobreposición de textos** (texto encima de banner sin scrim suficiente, o solapado en mobile) → falta capa de legibilidad / jerarquía. Revisar cada masthead con texto sobre imagen.
- Pesos y tamaños desparejos en algunos bloques (títulos que no usan la escala).
- "Shop by element" → al manifiesto (✅ ya movido).

### Técnico
- Doble dorado en tokens (ver §2).
- Inline styles con px/rem sueltos en `index.astro` y PDP → mover a tokens/clases para consistencia.
- Verificar contraste AA (bone sobre charcoal OK; sand/silver sobre oscuro = revisar en textos chicos).
- Responsive: revisar mastheads y grids en 360px (donde más se nota la sobreposición).

---

## 5. SISTEMA DE "DIMENSIONES" (ya medio construido)
Existe la clase **`.light`** en tokens (earth palette: warm-bone, organic, earth). Es la base de tu idea de fondo en negativo.
- **Dimensión oscura** (default, obsidiana) = joya / piercing / ritual.
- **Dimensión clara** (`.light`) = arte / atelier / portafolio (galería/museo).
- Mismos tokens de tipografía/espaciado; SOLO cambian los roles de color. Eso garantiza "misma marca, otra dimensión".

---

## 6. ORDEN DE EJECUCIÓN (prioridad)
1. Unificar el dorado (1 acento). [rápido, alto impacto de coherencia]
2. Normalizar padding de secciones a tokens. [coherencia de ritmo]
3. Arreglar sobreposición de textos en mastheads (scrim + jerarquía).
4. Footer: banner sin texto + texto que acompañe.
5. Cada categoría muestra su catálogo correcto.
6. Sumar fotos de vitrina (con agente de inventario).
7. Prototipar dimensión `.light` para Atelier/arte.

<!-- Relacionado: norte-de-marca-2026-06-21.md · 30-Auditorias/2026-06-21-plan-accion-compra-sin-friccion.md · tokens.css -->
