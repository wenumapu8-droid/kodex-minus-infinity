---
type: spec · ui rediseño
topic: Hero del sitio rediseñado al lenguaje visual de la tapa del libro Wenumapu (Canio & Pozo, 2015)
status: spec listo para ejecutar
date: 2026-06-03
fuente: tapa física del libro fotografiada por Ocin 2026-06-03
relacionado: [[wenumapu-libro-canon-astronomia-mapuche]]
---

# Spec — Hero al estilo tapa libro Wenumapu

> El hero actual del sitio (kultrún + nebula + medallones + estrellas múltiples + runas) tiene demasiados focos compitiendo. La tapa del libro logra MÁS con MENOS: nebula como background único, tipografía como protagonista, 1 sello ritual, líneas finas de constelación. Restraint editorial.
>
> Este spec replica esa lógica para el hero (y solo el hero — el kultrún ornamentado puede seguir más abajo en ManifestoKultrunSection como sección secundaria).

---

## Referencia visual (tapa fotografiada)

**Lo que la tapa hace bien:**
1. **Wordmark vertical roto** en bloques de 2 letras: `WE / NU / MA / PU`. Sans serif geométrica blanca, kerning amplio, peso heavy. Esto es código visual único — nadie más lo tiene.
2. **Background único:** nebula real / fotográfica (no decorativa), paleta rosa-magenta-cyan-azul-verde sobre obsidiano profundo.
3. **Líneas finas blancas** uniendo puntos = constelación implícita. Solo líneas + puntos. Sin glow, sin ornamento.
4. **Sello ritual diminuto** debajo del subtítulo. Funciona como rúbrica de autoridad.
5. **Editorial / créditos** en fila horizontal abajo, peso ligero, color sand.
6. **Sin marcos circulares, sin runas en esquinas, sin medallones decorativos.** La elegancia viene de la AUSENCIA.

---

## Estructura del hero rediseñado

```
┌────────────────────────────────────────────┐
│  ← polvo estelar leve (opacity 0.18)       │
│  ← líneas constelación finas (stroke 0.5)  │
│                                            │
│              W E                           │
│              N U                           │
│              M A                           │
│              P U                           │
│                                            │
│        ────────────────                    │
│        astronomy of the body               │
│        ────────────────                    │
│                                            │
│             ◈ (sello ritual mínimo)        │
│                                            │
│                                            │
│  GABRIEL POZO  ·  MARGARITA CANIO          │
│  ← (este texto solo en about, no hero)     │
│                                            │
│       [ enter the threshold ]   ← CTA      │
└────────────────────────────────────────────┘
```

### Wordmark vertical roto

**Markup:**
```html
<h1 class="hero__wordmark" aria-label="Wenu Mapu">
  <span class="wordmark__row">WE</span>
  <span class="wordmark__row">NU</span>
  <span class="wordmark__row">MA</span>
  <span class="wordmark__row">PU</span>
</h1>
```

**CSS:**
```css
.hero__wordmark {
  font-family: var(--font-display); /* DM Serif Display | replace by Instrument Sans Bold para más fidelidad al libro */
  font-weight: 700;
  font-size: clamp(4.5rem, 14vw, 12rem);
  line-height: 0.86;
  letter-spacing: 0.06em;
  color: var(--bone);
  text-align: center;
  margin: 0;
  /* opcional: depth shadow MUY sutil para perforar la nebula */
  text-shadow: 0 0 24px rgba(8, 7, 6, 0.85);
}
.wordmark__row {
  display: block;
}
```

**Nota tipográfica:** la tapa usa una sans serif geométrica heavy (parece Founders Grotesk / Söhne / Aktiv Grotesk). Si querés fidelidad exacta, instalar **Instrument Sans Bold** (que ya estaba en plan) o **Inter Variable** con `font-weight: 800`. La DM Serif Display de hoy es serif + condensada, no calza con la tapa. Recomiendo **Inter o Instrument Sans para el wordmark del hero específicamente**, mantenerCormorant Garamond / Source Serif Pro para body.

### Subtítulo

```html
<p class="hero__tagline">astronomy of the body</p>
```

```css
.hero__tagline {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: var(--text-lg);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--sand);
  text-align: center;
  margin: 1.5rem 0;
  position: relative;
}
.hero__tagline::before,
.hero__tagline::after {
  content: "";
  display: inline-block;
  width: 48px;
  height: 1px;
  background: var(--sand);
  vertical-align: middle;
  margin: 0 12px;
  opacity: 0.6;
}
```

### Sello ritual

Replicar el ícono pequeño debajo del subtítulo de la tapa (parece una figura humanoide con base escalonada o el kultrún miniatura). Crear como SVG inline:

```html
<svg class="hero__seal" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
  <!-- placeholder: chakana minimalista o kultrún reducido -->
  <path d="M12 2L14 6L18 6L14.5 9L16 13L12 11L8 13L9.5 9L6 6L10 6Z" 
        fill="none" stroke="currentColor" stroke-width="1"/>
</svg>
```

Crear el SVG real cuando se haga la vector library — debería ser el 8-point Antü mini o el chakana stepped pattern de la tapa.

### Background — constelación + polvo estelar

**NO usar foto de nebula con copyright.** Generar:

1. **Polvo estelar:** 300-500 puntos blancos pequeños random distribuidos. Opacity 0.4-0.8 variable. CSS `radial-gradient` o SVG `<circle>`.
2. **Líneas finas conectando ~20 puntos clave** — constelaciones reales del libro:
   - **Mañke (Cóndor):** 7 estrellas en patrón de pájaro alas abiertas
   - **Püñonchoike (Avestruz):** 4 estrellas forma diagonal
   - **Trarinmansun (Bueyes Enyugados):** 4 estrellas en cuadrado
   - **Luwan (Guanaco):** 5 estrellas
   - **Rüpü (Camino del Cielo):** banda diagonal de polvo más denso (Vía Láctea)
3. **Nebula glow muy sutil:** 2-3 `radial-gradient` posicionadas (uno púrpura, uno cyan, uno rosa) a opacity 0.12 cada uno. NO competir con el texto.

**Estructura SVG hero:**

```html
<svg class="hero__sky" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  <defs>
    <radialGradient id="nebula-purple" cx="20%" cy="30%" r="40%">
      <stop offset="0%" stop-color="#3a1c5e" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#3a1c5e" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="nebula-cyan" cx="80%" cy="60%" r="35%">
      <stop offset="0%" stop-color="#1a4a5e" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#1a4a5e" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="nebula-rose" cx="50%" cy="85%" r="30%">
      <stop offset="0%" stop-color="#5e2c3a" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#5e2c3a" stop-opacity="0"/>
    </radialGradient>
  </defs>
  
  <!-- nebula layers -->
  <rect width="100%" height="100%" fill="url(#nebula-purple)"/>
  <rect width="100%" height="100%" fill="url(#nebula-cyan)"/>
  <rect width="100%" height="100%" fill="url(#nebula-rose)"/>
  
  <!-- Vía Láctea (Rüpü) — banda diagonal -->
  <g opacity="0.4">
    <ellipse cx="720" cy="450" rx="900" ry="40" 
             fill="url(#nebula-rose)" transform="rotate(-18 720 450)"/>
  </g>
  
  <!-- polvo estelar: 200 puntos aleatorios -->
  <g class="stardust" fill="#F2EDE4">
    <circle cx="123" cy="45" r="0.8" opacity="0.7"/>
    <circle cx="287" cy="118" r="1.2" opacity="0.5"/>
    <!-- ... generar con script JS o por hand 200 puntos -->
  </g>
  
  <!-- CONSTELACIONES — líneas finas + estrellas más brillantes -->
  
  <!-- Mañke (Cóndor) — top left -->
  <g class="constellation constellation--mañke" stroke="#F2EDE4" stroke-width="0.4" fill="none" opacity="0.6">
    <line x1="220" y1="180" x2="280" y2="160"/>
    <line x1="280" y1="160" x2="340" y2="150"/>
    <line x1="280" y1="160" x2="300" y2="220"/>
    <line x1="300" y1="220" x2="350" y2="260"/>
    <line x1="280" y1="160" x2="240" y2="240"/>
  </g>
  <g fill="#F2EDE4">
    <circle cx="220" cy="180" r="1.6" opacity="0.95"/>
    <circle cx="280" cy="160" r="2.2" opacity="1"/>
    <circle cx="340" cy="150" r="1.8" opacity="0.9"/>
    <circle cx="300" cy="220" r="1.4" opacity="0.85"/>
    <circle cx="350" cy="260" r="1.5" opacity="0.9"/>
    <circle cx="240" cy="240" r="1.3" opacity="0.8"/>
  </g>
  
  <!-- Trarinmansun (Bueyes) — bottom right -->
  <g class="constellation" stroke="#F2EDE4" stroke-width="0.4" fill="none" opacity="0.55">
    <line x1="1180" y1="640" x2="1240" y2="620"/>
    <line x1="1240" y1="620" x2="1300" y2="660"/>
    <line x1="1300" y1="660" x2="1240" y2="700"/>
    <line x1="1240" y1="700" x2="1180" y2="640"/>
  </g>
  <g fill="#F2EDE4">
    <circle cx="1180" cy="640" r="1.5" opacity="0.9"/>
    <circle cx="1240" cy="620" r="1.7" opacity="0.95"/>
    <circle cx="1300" cy="660" r="1.5" opacity="0.9"/>
    <circle cx="1240" cy="700" r="1.4" opacity="0.85"/>
  </g>
  
  <!-- Wüñelfe — UNA estrella destacada, abajo-izquierda (lucero del amanecer) -->
  <g>
    <circle cx="180" cy="780" r="3.5" fill="#F2EDE4" opacity="1"/>
    <circle cx="180" cy="780" r="6" fill="none" stroke="#F2EDE4" stroke-width="0.5" opacity="0.4"/>
    <circle cx="180" cy="780" r="10" fill="none" stroke="#F2EDE4" stroke-width="0.3" opacity="0.2"/>
  </g>
  
</svg>
```

**Comportamiento responsive:**
- Mobile: viewBox sigue siendo 1440x900 pero `preserveAspectRatio="xMidYMid slice"` crop al centro.
- Las constelaciones pueden simplificarse a solo Mañke + Wüñelfe en mobile (las otras dos quedan fuera del crop).

### CTA

```html
<a href="/shop" class="hero__cta btn btn--ghost">
  <span class="cta__line"></span>
  enter the threshold
  <span class="cta__line"></span>
</a>
```

```css
.hero__cta {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  margin-top: 5rem;
  font-family: var(--font-display);
  font-size: var(--text-base);
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--bone);
  text-decoration: none;
  padding: 14px 28px;
  border: 1px solid rgba(242, 237, 228, 0.4);
  transition: border-color 0.4s ease, letter-spacing 0.4s ease;
}
.hero__cta:hover {
  border-color: rgba(242, 237, 228, 0.9);
  letter-spacing: 0.28em;
}
.cta__line {
  width: 24px;
  height: 1px;
  background: currentColor;
  opacity: 0.5;
}
```

---

## Animación sutil (no overkill)

1. **Polvo estelar twinkle:** las estrellas pequeñas hacen un `opacity` ease infinite con `animation-delay` random. 8-12s duración.

```css
@keyframes twinkle {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 0.3; }
}
.stardust circle:nth-child(3n) { animation: twinkle 9s ease-in-out infinite; }
.stardust circle:nth-child(5n) { animation: twinkle 12s ease-in-out infinite 2s; }
.stardust circle:nth-child(7n) { animation: twinkle 7s ease-in-out infinite 1.5s; }
```

2. **Wüñelfe — pulse del lucero:** la estrella destacada respira con halo.

```css
@keyframes wüñelfe-pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.15); opacity: 0.85; }
}
.wüñelfe circle:first-child { 
  transform-origin: center;
  animation: wüñelfe-pulse 6s ease-in-out infinite; 
}
```

3. **Wordmark fade-in al cargar:**
```css
@keyframes wordmark-rise {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.wordmark__row {
  opacity: 0;
  animation: wordmark-rise 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
.wordmark__row:nth-child(1) { animation-delay: 0.2s; }
.wordmark__row:nth-child(2) { animation-delay: 0.4s; }
.wordmark__row:nth-child(3) { animation-delay: 0.6s; }
.wordmark__row:nth-child(4) { animation-delay: 0.8s; }
```

4. **prefers-reduced-motion:**
```css
@media (prefers-reduced-motion: reduce) {
  .stardust circle,
  .wüñelfe circle:first-child,
  .wordmark__row {
    animation: none !important;
  }
  .wordmark__row { opacity: 1; transform: none; }
}
```

---

## Qué pasa con el kultrún ornamentado actual

NO se borra. Se mueve más abajo en el flow:

```
Home flow rediseñado:
1. HERO simplified (estilo tapa libro) ← este spec
2. Featured products
3. Manifesto editorial
4. KULTRUN ORNAMENTADO (lo actual + portal cinemático A) ← sigue siendo el wow moment, pero NO el primer impacto
5. Portals / Categories
6. Truckee / Atelier
7. ...
```

El hero queda como **invitación restrained** estilo el libro. El kultrún queda como **revelación profunda** después del scroll. Esto sigue la dramaturgia editorial del libro mismo: tapa minimal → contenido ornamentado adentro.

---

## Aplicación inmediata

**Archivo a crear:** `src/components/HeroBookCover.astro`

**Archivos a modificar:**
- `src/pages/index.astro` — reemplazar el hero actual por `<HeroBookCover />`
- `src/styles/global.css` — agregar las clases `.hero__wordmark`, `.hero__tagline`, `.hero__sky`, `.constellation`, `.stardust`
- `src/styles/tokens.css` — agregar `--font-sans-heavy` si se decide instalar Instrument Sans Bold

**Dependencias opcionales (mejor fidelidad a la tapa):**
```
npm install @fontsource/instrument-sans
```

**Tiempo estimado:** 1.5h implementación + 30min QA mobile.

---

## QA checklist

- [ ] Wordmark legible en mobile 380px (`font-size: clamp` debe llegar a 4.5rem mínimo)
- [ ] Constelaciones visibles en mobile (al menos Mañke + Wüñelfe)
- [ ] Polvo estelar no causa lag (max 300 puntos, usar `will-change` selectivo)
- [ ] CTA tap target ≥ 44px height
- [ ] prefers-reduced-motion desactiva todas las animaciones
- [ ] Contraste wordmark vs nebula > AAA (debe pasar 7:1)
- [ ] Sello ritual SVG legible a 18x18px
- [ ] LCP < 1.5s (el SVG inline ayuda — no hay fetch de imagen externa)
- [ ] Lighthouse Performance > 95

---

<!-- wenu-backlinks -->
## 🔗 Contexto
- [[wenumapu-libro-canon-astronomia-mapuche]] — fuente del lenguaje visual
- [[kultrun-simbologia-real]] — el kultrún queda en ManifestoKultrunSection más abajo
- [[regla-produccion-real-photo-first]] — sin AI imagery, todo SVG generado
- [[BRAND-DNA-2026-05-03]] — voz restraint dark luxury
