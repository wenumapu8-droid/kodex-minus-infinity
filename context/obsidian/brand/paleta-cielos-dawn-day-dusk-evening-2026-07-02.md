---
title: Paleta atmosférica "Cielo Vivo" — Dawn / Day / Dusk / Evening
proyecto: Wenu Mapu · Sistema de Temas
estado: PROPUESTA (código listo — NO deployado, esperando ventana)
fecha: 2026-07-02
autor: agente asesor (Ocin)
relacionado: sistema de temas "cielo vivo" (Nocturne/Solar/Atardecer) — build a cargo del agente de diseño
archivo-css: brand/atmosphere-skies.css
---

# Paleta atmosférica "Cielo Vivo"

## TL;DR

Los gradientes de cielo por hora del día (Dawn/Day/Dusk/Evening) entran como
**capa ATMÓSFERA** (fondo de página, hero, portal, secciones), **no** como
reemplazo de la paleta de marca. Obsidian / bone / ember siguen siendo los
tokens de **texto y UI**. El texto nunca se apoya directo sobre un gradiente
de tonalidad media: va sobre superficie de marca o bajo un scrim.

Mapeo a los temas existentes:

| Tema | Cielo | Texto | Directo sobre gradiente |
|------|-------|-------|--------------------------|
| **Nocturne** (default) | Evening (negro→cálido tenue) | bone | Sí — atmósfera oscura uniforme |
| **Solar** | Day (celeste→dorado pálido) | obsidian | Sí — atmósfera clara uniforme |
| **Atardecer** | Dusk (púrpura→ember) · *Dawn = variante alterna* | bone | **No** — usa superficie o scrim |

---

## 1. El problema que resuelve esta propuesta (y que la referencia esconde)

La referencia es preciosa pero trae un riesgo de legibilidad: **hay gradientes
que cruzan zonas de luminancia opuestas.** Un solo color de texto no sobrevive
de punta a punta de esos gradientes. Verificado con cálculo WCAG real (no de
memoria) — ratios de cada stop contra bone `#ECE5D5` y obsidian `#0A0A0A`:

### Day (→ Solar): claro-uniforme, seguro con texto obsidian
| Stop | vs bone | vs obsidian |
|------|--------:|------------:|
| #C8D3EF | 1.19 ✗ | **13.22 ✓** |
| #DCE6F2 | 1.01 ✗ | **15.69 ✓** |
| #FBE7C0 | 1.03 ✗ | **16.30 ✓** |
| #FFD990 | 1.07 ✗ | **14.69 ✓** |

### Evening (→ Nocturne): oscuro-uniforme, seguro con texto bone
| Stop | vs bone | vs obsidian |
|------|--------:|------------:|
| #111111 | **15.05 ✓** | 1.05 ✗ |
| #271F2F | **12.65 ✓** | 1.25 ✗ |
| #452E30 | **9.92 ✓** | 1.59 ✗ |
| #1A1416 | **14.48 ✓** | 1.09 ✗ |

### Dusk (→ Atardecer): tonalidad MEDIA — el punto crítico
| Stop | vs bone | vs obsidian |
|------|--------:|------------:|
| #2B2140 | **12.00 ✓** | 1.31 ✗ |
| **#865AB4** | **4.05 ✗** | **3.90 ✗** | ← falla AA normal con AMBOS |
| #C1502E | 3.76 ✗ | 4.20 ✗ | ← falla AA normal con ambos |
| #E4631D | 2.74 ✗ | 5.75 ✓ |

> **AA texto normal exige 4.5:1.** El stop `#865AB4` da 4.05 con bone y 3.90 con
> obsidian — ninguno pasa. Por eso, en Atardecer el texto NO va directo sobre el
> gradiente: se apoya en panel obsidian (bone sobre obsidian = **15.78:1**) o
> bajo el scrim reforzado `--scrim-2`.

### Dawn (variante): barrido dark→light, mismo tratamiento que Dusk
Deep-blue arriba (bone 9.40 ✓), durazno abajo (obsidian 12.72 ✓), pero el medio
`#008ED9` es 2.85/5.54 y `#79C1E5` 1.58/9.97 → un solo color de texto no cubre
todo el barrido. Texto sobre superficie/scrim, igual que Dusk.

**Conclusión de arquitectura:** gradiente = atmósfera; texto = sobre superficie
de marca o bajo scrim. Nunca texto directo sobre stops de tonalidad media.

---

## 2. Gradientes propuestos (originales, inspirados en la referencia)

Verticales, cenit arriba → horizonte abajo. Definidos como tokens `--sky-*` en
`atmosphere-skies.css`.

- **`--sky-evening`** `#111111 → #1A1416 → #271F2F → #452E30`
  Noche que se entibia hacia el horizonte. Es la evolución natural del obsidian
  actual: mantiene la sensación Nocturne pero con profundidad cálida abajo.
- **`--sky-day`** `#C8D3EF → #DCE6F2 → #FBE7C0 → #FFD990`
  Cielo pálido de día → dorado de horizonte. Fondo claro para Solar.
- **`--sky-dusk`** `#2B2140 → #865AB4 → #C1502E → #E4631D`
  Atardecer chileno: púrpura de cenit a ember-naranja de horizonte. Canónico
  para Atardecer.
- **`--sky-dawn`** `#0B3A5E → #008ED9 → #79C1E5 → #FDC492`
  Predawn azul → durazno. Variante alterna (activable con `data-sky="dawn"`).

> Nota de propiedad intelectual: los hex de la referencia se usan como
> **dirección de color** (los colores no son propiedad registrable); los
> gradientes de arriba son composiciones propias, no una reproducción del
> layout ni del sistema de las guidelines originales.

---

## 3. Dónde se aplica cada cosa (utilidades opt-in)

Todas son clases opt-in — nada se activa solo. Ver `atmosphere-skies.css`.

- **`.sky-page`** — fondo de página, atmósfera fija (`background-attachment:
  fixed`) → el contenido "scrollea contra el cielo". Va en `<body>`/wrapper raíz.
- **`.sky-hero` / `.sky-portal`** — atmósfera full-strength en el bloque
  protagonista (hero cósmico, portal de entrada).
- **`.sky-section`** — sección con atmósfera atenuada por scrim, para que
  respire sin competir con el texto.
- **`.on-atmosphere`** — bloque de texto directo sobre el gradiente con
  **garantía** de legibilidad (scrim reforzado detrás, vía `::before`). El uso
  obligado en Atardecer si se pone texto sin panel.
- **`.sky-surface`** — tarjeta/panel de contenido sobre `--surface` de marca
  (patrón preferido; ~15.8:1).
- **`.night-window`** — "ventana a la noche": enmarca imágenes oscuras (hero
  cósmico, mandala, banners) sobre obsidian fijo en Solar/Atardecer, para que
  se lean como intencionales y no como error. Halo mínimo en Solar.

---

## 4. Decisiones tomadas (con las recomendaciones ya acordadas)

1. **Gradientes = atmósfera, marca = texto/UI.** No se toca ningún token de
   marca. El CSS es aditivo.
2. **Dusk es canónico para Atardecer; Dawn queda como variante documentada**
   (`[data-theme="atardecer"][data-sky="dawn"]`). Razón: el brief pide un solo
   look estable por tema, y meter dos barridos de luminancia opuesta en el mismo
   tema sin disparador horario confunde. Reversible si preferís Dawn canónico.
3. **Reversibilidad byte-idéntica.** Todo scopeado bajo `[data-theme]`. Con el
   flag del sistema de temas APAGADO (sin atributo en `<html>`), ninguna regla
   matchea → sitio idéntico al actual. Este archivo no emite nada por sí solo.
4. **AA garantizado.** Ningún caso deja texto por debajo de 4.5:1: o el
   gradiente es uniforme y el texto va directo, o va sobre superficie/scrim.
5. **prefers-reduced-motion respetado** en las transiciones de atmósfera.

---

## 5. Drift de paleta a resolver con el equipo

⚠️ El brief original de **Atardecer** describía **calipso/teal + rojizo**; esta
referencia lo lleva a **púrpura/naranja (Dusk)**. Son direcciones distintas.
Esta propuesta sigue la referencia nueva ("la que le encanta a Ocin"), pero si
Atardecer debe conservar el teal, hay que ajustar `--sky-dusk` (o introducir un
`--sky-dusk-teal`). **Pendiente de confirmar.**

---

## 6. Estado y próximos pasos

- [x] Gradientes definidos (tokens `--sky-*`).
- [x] Contraste AA verificado por cálculo (tabla arriba).
- [x] CSS listo para aplicar — `brand/atmosphere-skies.css`.
- [x] Propuesta documentada (este archivo).
- [ ] **NO deployado** — esperando ventana de build (contención con portal/estudio).
- [ ] Reconciliar nombres de variables con `tokens.css` real al integrar
      (`--surface`, `--fg`, `--radius` se asumen; confirmar con el agente de diseño).
- [ ] Confirmar drift Atardecer: Dusk púrpura/naranja vs. teal original.
- [ ] Confirmar si Dawn debe ser canónico o alterno.

> **Coordinación:** este trabajo vive en Obsidian + un `.css` nuevo. No toca el
> repo frontend ni el build. La integración/deploy la coordina el agente de
> diseño en la ventana acordada.
