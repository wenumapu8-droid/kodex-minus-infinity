---
tipo: estrategia
proyecto: Wültufe · Ear Constellation Studio
autor: Wenu Mapu (Ocin)
fecha: 2026-06-29
estado: source-of-truth-v1
benchmark: Maria Tash · Astrid & Miyu (Stack Curator) · Studs (Earscape)
---

# WÜLTUFE — Benchmark & Arquitectura

> **Fuente de verdad.** Todo cambio estructural del estudio se rige por este doc.
> Regla rectora heredada: nada se confirma sin la evaluación en persona de Ocin;
> los números/sesiones son guía; placements nuevos = joya pre-esterilizada
> (titanio ASTM F-136 u oro sólido 14k+).

## Posicionamiento

> **WÜLTUFE · Ritual Ear Curation** — design a body constellation with real
> jewelry, anatomical guidance and a final human review.

Primero utilidad clara (diseñar una oreja con joyería real + guía anatómica +
revisión humana), después el universo ritual. Estética: **obsidiana + titanio +
oro + anatomía + símbolos + territorio + constelación.** NO copiar el blanco/
minimal de Maria Tash ni el virtual try-on (todavía).

## 1. Cuatro puertas del sitio (separadas, no un solo flujo)

| Puerta | Qué es | Ruta |
|---|---|---|
| **SHOP JEWELRY** | Piezas listas para envío (catálogo) | `/shop` · `/piercing-jewelry` |
| **DESIGN YOUR EAR · WÜLTUFE** | Diseñar constelación + recomendaciones compatibles | `/constelaciones` |
| **BOOK A PIERCING · TRUCKEE** | Reservar sesión con Ocin | `/piercing` |
| **CARE & HEALING** | Aftercare / downsizing / seguimiento | `/care-guide` · aftercare.* |

Reflejar en el Nav como cuatro accesos claros.

## 2. Sub-entradas dentro de Wültufe

- START A NEW PIERCING
- CURATE MY EXISTING EAR
- EXPLORE RITUAL CONSTELLATIONS
- BOOK A PRIVATE SESSION

## 3. Lógica PLACEMENT-FIRST (clave)

`placement → estado de cicatrización → material apto → sistema de cierre →
JOYAS COMPATIBLES REALES → comprar / reservar / consultar`

NO al revés. "Shop by piercing" vive **dentro** de Wültufe, no como catálogo suelto.

## 4. Máx 3 joyas recomendadas por placement (curaduría, no feria)

Al abrir un placement se muestran **hasta 3** piezas reales del catálogo (con
precio), no 80. Ejemplo:

> **FORWARD HELIX · HEALED → Recommended by Wültufe:**
> 01 Neo Opal Labret (Ti F-136, internally threaded)
> 02 Solar Compass End (14k gold, threadless)
> 03 Obsidian Arc (Ti, limited)
> [View all compatible pieces →]

Cada joya = producto real del catálogo WooCommerce con precio. Botón "View all"
lleva al catálogo filtrado por ese placement.

## 5. Flujo simplificado (~6–7 pasos, no 10)

1. **Intención** — new piercing / curate existing / ritual constellation.
2. **Marcá tu anatomía** — puntos sobre la oreja (fantasma → activos al hover).
3. **Estado de la zona** — healed / healing / planned new.
4. **Energía / colección** — dirección estética (Atacama, Solar, Neo…).
5. **Joyería compatible real** — máx 3 por placement + "view all".
6. **Revisá tu constelación** — resumen + cotización.
7. **Comprar / guardar / reservar** — checkout, guardar (nombre+fecha), o bookear.

Modo libre sigue disponible (no wizard rígido).

## 6. Copy de confianza (protege + eleva) — visible

- "For new piercings: **Titanium ASTM F-136 / solid gold only.** For healed:
  expanded material & style options. Final anatomy, angle and initial jewelry
  are confirmed by Ocin in person."
- "This is **exploration & pre-curation, not automatic anatomical approval.**"

## 7. Ritual Constellations precuradas (estilo "sets")

Nombradas con el universo Wenu; cada una con composición visual, zonas
recomendadas, joyería real incluida, rango de precio, botón "Build this
constellation" (editable):

- **Atacama Signal**
- **Araucanía Root**
- **Neo Eclipse**
- **Solar Vessel**
- **Organic Relic**

(Diferentes de las constelaciones astronómicas Pleiades/Melipal/Orion — estas
son "energy sets" de marca; las astronómicas quedan como patrones de estrellas.)

## 8. PWA (sin app nativa)

Convertir el sitio en **web app móvil instalable**: `manifest.webmanifest` +
iconos + shell offline básico → "guardar en pantalla de inicio". NADA nativo.

## 9. Benchmark — qué tomar de cada uno (mirar, no copiar estética)

- **Astrid & Miyu · Stack Curator** — patrón de interacción para armar stacks +
  cierre "add to cart / book". Modelo retail-con-estudio.
- **Studs · Earscape** — curaduría por placement, sets, lenguaje "earscape".
- **Maria Tash** — nivel de producto y placement-first, pero su blanco/minimal
  NO es nuestro lenguaje (usamos dark/ritual).

## Prioridad de implementación

1. **Cuatro puertas** (Nav).
2. **Placement → 3 joyas reales** (dentro del drawer de Wültufe).
3. **Flujo simplificado** (7 pasos).

Después: ritual sets con precio + "build", copy de confianza visible, PWA,
sub-landing de Wültufe.

## Lo que NO se toca

Lógica ya construida: gating de material, cotización real (servicio /piercing +
joya Woo), connect-mode de cadenas, guardar nombre+fecha (localStorage + URL),
email con copia al cliente, modo calibración (map builder + export + auto-save).
