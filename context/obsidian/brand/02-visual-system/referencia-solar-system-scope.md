---
type: referencia visual · benchmark UI
topic: Solar System Scope (solarsystemscope.com) como referencia de feel para el mapa estelar Wenu Mapu
status: referencia activa
date: 2026-06-04
fuente: screenshot enviado por Ocin 2026-06-04
relacionado: [[spec-pdp-adaptive-background]] · [[spec-hero-rediseno-tapa-libro]]
---

# Referencia visual — Solar System Scope

> Ocin envió este sitio como ejemplo del **feel** que quiere para el mapa estelar Wenu Mapu.
> URL: https://www.solarsystemscope.com

## Qué transmite ese sitio

- **Espacio profundo navegable** — sentís que estás en el cosmos, no mirando una página
- **Objetos celestes 3D real-time** — Uranus, planetas como esferas con textura, rotando
- **Star map de fondo permanente** — constelaciones blancas finas conectando puntos sobre obsidian
- **Navegación cinemática** — botones tipo HUD (Heads-Up Display) sci-fi: PLANET SYSTEM / ENCYCLOPEDIA / STRUCTURE
- **Iconos minimalistas** — SWITCH PLANET / NIGHT SKY / SOLAR SYSTEM como toggles laterales
- **Cursor con position indicator** — pequeño triangulito que muestra dónde está tu mouse
- **Paleta** — black space + cyan/white pearl planet + thin white grid

## Cómo traducirlo a Wenu Mapu

### El sitio = el cielo. Cada línea cosmológica = un astro.

```
Solar System Scope    →    Wenu Mapu Star Map
─────────────────          ──────────────────
Uranus, Marte, Saturno  →  Antü, Küyen, Wüñelfe, Wanlen, Rüpü, Pewma
Star map de fondo       →  Constelaciones canon del libro Canio & Pozo
Nav HUD futurista       →  Nav HUD ritual (gold accents, sand bone, no cyan tech)
Click planet → encyclop →  Click línea → /lines/{slug} con copy del libro + productos
Smooth camera move      →  Smooth zoom + parallax en hover
SWITCH PLANET icons     →  SWITCH LÍNEA icons (8-point star Antü, crescent Küyen...)
```

### Diferencias clave de marca

| Solar System Scope (referencia) | Wenu Mapu (adaptado) |
|---|---|
| Cyan / techno futurista | Gold / ember / bronze sobre obsidian (dark luxury ritual) |
| Inglés solo | Mapudungun + Inglés (cuando aplica) |
| Datos científicos NASA | Cosmovisión mapuche académica (Canio & Pozo 2015) |
| 8 planetas reales | 6 líneas cosmológicas Wenu Mapu |
| Esferas planet con texture stock | Pieza-objeto representativa de cada línea (foto real producto) |
| HUD acrylic glass cyan | HUD obsidian con stroke gold + serif Display tipo |

## Estructura propuesta del Star Map Wenu Mapu

```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│  W E N U   M A P U                          ⊙ NIGHT SKY     │
│                                              ⊕ KULTRUN       │
│  · · ·     ·   · ·   · ·  · · · · ·   ·   ·  · · ·          │
│        · ANTÜ ·                                              │
│         /  \                                                 │
│        /    \           · · ·  · ·                          │
│       /      \                                               │
│      /        \   ·   · · ·    · ·                          │
│     ★────────★ ←  Constelación Mañke (cóndor)               │
│    /          \                                              │
│   ·            ·                                             │
│  ·  KÜYEN      ·     · · · · ·                              │
│ ☾ (crescent)    ·                                            │
│ ·               ·                                            │
│  ·              ·  · · ·         · · ·                       │
│   ·     ⨀  KULTRÚN    ← portal central                       │
│    ·              ·                                          │
│     ·  WÜÑELFE    ·                                          │
│      ·  ★ (estrella sola)                                    │
│       ·              ·                                       │
│        ·              ·                                      │
│  ·  WANLEN              RÜPÜ ·       PEWMA                  │
│   · · · (constelación)   · · · (camino)   · · · (sueños)    │
│                                                              │
│                                                              │
│  [explorar el cielo]    [seguir camino]    [ver piezas]     │
└─────────────────────────────────────────────────────────────┘
```

### Comportamientos

1. **Idle:** Star map respira (twinkle sutil, polvo estelar drift muy lento)
2. **Hover sobre una línea:** se expande con brillo, líneas de constelación asociadas se iluminan
3. **Click sobre una línea:** smooth zoom hacia esa "zona del cielo" + transición a `/lines/{slug}` editorial
4. **Nav HUD:**
   - NIGHT SKY → vista zoom out total del star map
   - KULTRUN → centra en el portal central (kultrún ornamentado actual)
   - LÍNEAS (Antü/Küyen/...) → switch directo a esa línea
5. **Cursor:** position indicator (triangulito gold) muestra coordenadas tipo "Hemisferio Sur · 23h 14m"
6. **Mobile:** el star map se simplifica a vista 2D scroll vertical con sticky nav HUD abajo

## Stack técnico realista

### Opción A — Lite (1-2 días) — Astro SSG + SVG
- Star map como SVG inline (ya empezado por agente Code)
- Constelaciones como `<g>` con líneas finas
- Líneas cosmológicas como `<circle>` clickeables con label
- Animation con CSS keyframes + IntersectionObserver
- Sin Three.js → mantiene Lighthouse > 95

**Limitación:** no es 3D real-time. Es "feel" de star map estático con animación sutil.

### Opción B — Full (1 semana) — Astro + R3F island
- Three.js / R3F en una sección del home (hero)
- Star field 3D real (BufferGeometry con miles de puntos)
- Camera con orbit controls suaves
- Cada línea como esfera 3D con textura cargada de su foto representativa
- GSAP para coreografía scroll
- Bundle adicional ~120KB hydrated

**Trade-off:** mejor "feel" cinemático real, peor performance mobile, más complejidad.

### Opción C — Híbrido (recomendado, post-Vegas)
- Hero: SVG star map (Opción A) que carga instant
- Click "EXPLORE THE SKY" → abre island R3F lazy-loaded fullscreen
- Lo mejor de ambos: performance del primer paint + cinemática on-demand

## Tiempo realista

| Scope | Tiempo dev | Cuándo |
|---|---|---|
| SVG star map hero estilo libro tapa | en proceso ya | Pre-Vegas 24h |
| Click líneas → landing pages | en proceso ya | Pre-Vegas 24h |
| HUD nav tipo Solar System Scope | 4-6h | Post-Vegas semana 1 |
| Animation constelaciones interactivas | 6-8h | Post-Vegas semana 1 |
| Portal kultrún cinemático shader GLSL | 1-2 días | Post-Vegas semana 2 |
| R3F full 3D island (Opción B) | 5-7 días | Post-Vegas mes 1 |

## Lo que SÍ entra en 24h pre-Vegas

- ✅ Star map estilo tapa-libro (en proceso agente Code)
- ✅ 6 líneas como landing pages con placeholder copy
- ✅ Polvo estelar twinkle CSS
- ✅ Una constelación (Mañke o Wüñelfe) destacada en el hero
- 🟡 HUD nav minimalista con iconos por línea (probablemente)

## Lo que NO entra en 24h

- ❌ 3D real-time R3F
- ❌ Zoom cinemático smooth entre líneas
- ❌ Encyclopedia overlay tipo Solar System Scope
- ❌ Mobile gesture (pinch to zoom)

---

<!-- wenu-backlinks -->
## 🔗 Contexto
- [[spec-hero-rediseno-tapa-libro]] — hero v1 que está implementándose ahora
- [[spec-pdp-adaptive-background]] — PDP también respira la línea
- [[wenumapu-libro-canon-astronomia-mapuche]] — vocabulario y constelaciones canónicas
- [[regla-produccion-real-photo-first]] — fotos reales como textura
