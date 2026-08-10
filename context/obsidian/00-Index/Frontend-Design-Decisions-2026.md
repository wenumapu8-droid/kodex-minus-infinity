---
tipo: design-decisions
fecha: 2026-05-01
estado: superseded
version: 2.0-brutalist
tags: [frontend, design, brutalism, mapudungun, decisions]
relacionado: [[00-Index/Plan-Maestro-2026-05-01]] · [[00-Index/References-Frontend]] · [[brand/MARCA-maestro]] · [[brand/copy-frontend-2026-05-01]]
---

# Frontend Design Decisions — Wenu Mapu (v2 Brutalist)

> ⚠️ **SUPERSEDED (2026-07-03).** Estas decisiones son de la versión "brutalist" del 2026-05-01 y **NO reflejan el sitio actual** (sistema dark/ritual + Wültufe). La paleta Earth, el stack DM Serif/Source Serif/Inter y las secciones de abajo quedaron obsoletos. Fuentes vigentes:
> - Dirección visual y claim actuales: memoria Claude `brand_canonical_2026_05_28` + `project_wenu_visual_direction_2026_05_30` ([[50-Claude-Memory/MEMORY.md]]) — paleta `#0a0a0a / #f0ede8 / #c9a84c`, fonts Instrument Serif + Cormorant + Instrument Sans.
> - Arquitectura Wültufe / Ear Constellation Studio: [[estrategia/wultufe-benchmark-arquitectura-2026-06-29|wultufe-benchmark-arquitectura-2026-06-29]].
> - Tracker de frentes activos: [[20-Operaciones/desarrollo-paralelo-wenu-2026-07-02|desarrollo-paralelo-wenu-2026-07-02]].
>
> Se conserva solo como registro histórico de la iteración v2.

> Decisiones tomadas el 2026-05-01 por el usuario tras review del v1.
> Live en https://wenumapuonline.com (apex). www. queda como WordPress/WooCommerce.

---

## Stack tipográfico (Stack C — Cinematic Dark)

| Rol | Fuente | Fallback web |
|-----|--------|--------------|
| Display (titulares) | DM Serif Display 400 | Reckless · Tiempos Headline · Times New Roman |
| Serif editorial (body) | Source Serif Pro 300/400/600 + italic | Source Serif 4 · Georgia |
| Sans funcional (UI) | Inter Variable | Söhne · -apple-system · Helvetica Neue |

**Vibe:** Embossed / Aesop. Cinematográfica con tensión, serif editorial fuerte, sans clínica.
**Self-hosted via Fontsource** (no Google CDN, privacidad UE).

---

## Paleta (corregida — Earth)

| Token | HEX | Rol |
|-------|-----|-----|
| `--bone` | `#F3EBDD` | Fondo principal |
| `--sand` | `#D6C1A3` | Base secundaria |
| `--bronze` | `#B68B5A` | Acento editorial |
| `--earth` | `#6F4E37` | Titulares / líneas |
| `--organic` | `#2B211B` | Texto fuerte |
| `--moss` | `#7E8F7C` | Apoyo verde |
| `--clay` | `#B77B6E` | Apoyo rosado |
| `--stone` | `#C7C2B7` | Apoyo neutral |

> El v1 usaba negro/oro asumido. Esta es la paleta del brand kit oficial (`brand/visual-rules.md`).

---

## Idioma

- **Primary:** English (mercado USA, Truckee CA)
- **Cultural layer:** Mapudungun (lengua mapuche) como eyebrow text, section dividers, ritual taglines, product origin tags
- **Spanish:** removido temporalmente, se sumará en iteración futura si se decide

### Glosario Mapudungun usado
- `Mari mari` — saludo respetuoso (hero eyebrow)
- `Pewmangen` — "I dreamt" (hero ritual line)
- `Kürüf` — viento/aliento (categoría plugs/tunnels)
- `Kuyén` — luna (categoría septums)
- `Antü` — sol (categoría hangers)
- `Newen` — fuerza vital (footer ritual line)
- `Trafün` — encuentro (página local pickup)
- `Rüpü` — camino (página contact)
- `Küme` — bueno/bien (intro what we are)

⚠️ Estado: **honoring use** — pendiente validar con fuente Mapuche autorizada antes de marketing público.

---

## Brutalism intensidad: 9/10 (declarado)

- Tipografía como elemento gráfico (hero hasta 12rem)
- Layouts asimétricos (`grid-asym-2`, `grid-asym-3`)
- Bordes duros 1-2px (sin radius, sin shadows, sin gradientes)
- Espaciado generoso vertical (8 niveles, hasta 13rem)
- Animaciones mínimas (120-220ms, solo color/transform suaves)

---

## Páginas (en inglés)

| Antes | Ahora | URL |
|-------|-------|-----|
| `/` (Spanish) | `/` (EN brutalist) | https://wenumapuonline.com/ |
| `/catalogo` | `/shop` | https://wenumapuonline.com/shop/ |
| `/p/[slug]` | `/p/[slug]` (EN) | dynamic |
| `/pickup` | `/local` | https://wenumapuonline.com/local/ |
| `/contacto` | `/contact` | https://wenumapuonline.com/contact/ |

Pendientes (próxima iteración):
- `/world` — storytelling de marca (taller, proceso)
- `/journal` — editorial / blog ritual

---

## Componentes extraídos

```
src/components/
├── Logo.astro           — variantes default/white/square
├── Nav.astro            — sticky brutalist, active state, EN labels
├── Footer.astro         — grid asimétrico, ritual line Mapudungun
├── ProductCard.astro    — borders duros, hover scale
└── EmbossedSeal.astro   — SVG circular ritual tipográfico
```

Próximos: HeroEditorial, ProductGallery, ProductMeta, ValueGrid, RitualMark.

---

## Arquitectura DNS / hosting (final)

| Hostname | Apunta a | Sirve |
|----------|---------|-------|
| `wenumapuonline.com` (apex) | Cloudflare Tunnel → localhost:4321 | Astro frontend brutalist |
| `www.wenumapuonline.com` | A record 162.241.63.92 (HostGator) | WordPress + WooCommerce (carrito/checkout) |
| `wenuos.wenumapuonline.com` | Tunnel → localhost:3333 | wenumapu-system dashboard interno |
| `api.wenumapuonline.com` | Tunnel → localhost:3335 | wenu-platform Fastify API |

**Importante:** el WC REST API se usa SOLO en build time del Astro (SSG), nunca client-side. Credenciales `WC_CONSUMER_KEY/SECRET` solo en `.env` (en `.gitignore`).

---

## Skill nueva propuesta: `wenu-design-iteration`

> No creada aún. Pendiente con `anthropic-skills:skill-creator`.

**Comportamiento:**
1. Lee brand kit + paleta + voz desde el vault automáticamente
2. Lee referencias (links de [[References-Frontend]]) cuando se le pasen
3. **PREGUNTA** antes de cambiar (layout, fuente, intensidad, modo de foto)
4. Itera componente por componente con preview
5. Persiste decisiones aquí mismo

---

## Verificación (cumplido 2026-05-01 15:41)

- [x] `https://wenumapuonline.com/` HTTP 200, contiene "MARI MARI" + "Pewmangen" + "forged in Truckee"
- [x] `/shop/` `/local/` `/contact/` HTTP 200
- [x] `/p/[slug]/` HTTP 200 (6 productos generados)
- [x] WooCommerce API `https://www.wenumapuonline.com/wp-json/wc/v3/products` HTTP 200
- [x] Logo PNG en `public/logos/`
- [x] Sin credenciales hardcoded en src/
- [x] Sitemap.xml generado
- [x] LaunchAgent `com.wenu.frontend` sirve `dist/` automáticamente

---

## Pendientes próxima iteración

1. Asset pipeline LaCie → `public/products/<sku>/<size>.<ext>` (avif+webp via sharp)
2. Skill `wenu-design-iteration`
3. Validar Mapudungun con fuente cultural autorizada
4. Agregar página `/world` (storytelling marca)
5. Lighthouse audit (target Performance ≥ 90)
6. Components: HeroEditorial, ProductGallery split
