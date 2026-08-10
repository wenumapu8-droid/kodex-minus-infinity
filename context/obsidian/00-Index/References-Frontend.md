---
tipo: references
fecha: 2026-05-01
tags: [frontend, references, inspiration, firecrawl]
relacionado: [[00-Index/Frontend-Design-Decisions-2026]] · [[brand/MARCA-maestro]]
---

# Frontend References — Wenu Mapu

> Curated list para alimentar a FireCrawl o usar como mood board.
> Listas por tema. El usuario decide qué scrappear y cómo aplicar.

---

## Brutalismo + minimalismo editorial (referencia primaria)

| Sitio | Por qué | Qué extraer |
|-------|---------|-------------|
| https://ask-embla.com | Brutalismo orgánico, body jewelry premium | Hero typography, product detail layout, color/material rituals |
| https://embossed.studio | Embossed type, premium artesanal | Type-as-image, rotating seals, dark/light interplay |
| https://kinfolk.com | Editorial calmo, tipografía editorial | Article layouts, photo-text balance |
| https://aplus.rs | Brutalist tipográfico extremo | Asymmetric grids, oversized type, hard borders |
| https://areaofwork.com | Composiciones editoriales arquitectónicas | Section transitions, white space rhythm |

## Premium e-commerce de autor

| Sitio | Por qué | Qué extraer |
|-------|---------|-------------|
| https://alo.com | UX premium yoga/wellness | Cart UX, mega-menu, photo treatment |
| https://ragenation.com | Editorial + retail premium | Hero motion, content modules |
| https://aimeleondore.com | Luxury streetwear, foto cinematográfica | Catalog grid hierarchy, story modules |
| https://palmes.cc | Premium minimal con personalidad | Product page rhythm, type pairings |
| https://tekla.com | Premium textil con foto editorial | Color story sections, lookbooks |

## Body jewelry / ritual / dark luxury

| Sitio | Por qué | Qué extraer |
|-------|---------|-------------|
| https://maria-black.com | Body jewelry premium europeo | Material legend, gauge specs UI |
| https://ottozinger.com | Joyería autor brutalist | Process storytelling |
| https://shaungleeson.com | Dark luxury jewelry | Single-piece focus pages |
| https://annagaskellstudio.com | Ritual/oscuro | Minimal navigation, atmospheric photography |
| https://nialljewellery.com | Body modification premium | Jewelry-on-body shots, technical specs |

## Foto producto inspiracional

| Sitio | Por qué | Qué extraer |
|-------|---------|-------------|
| https://aesopstudio.com | Foto producto cálida con grano | Lighting, background, composition |
| https://goop.com/shop | Composiciones premium con espacio | Editorial spacing, captions |
| https://verishop.com | Grids editoriales | Density, hierarchy of meta info |

---

## Cómo usar con FireCrawl

```
1. Escoger 2-3 sitios de cada tema según contexto del componente
2. Pasarlos a FireCrawl con scrape mode markdown + screenshot
3. Pedir extracción de: design tokens, typography spec, layout patterns
4. Pasar resultado al subagente wenu-brand para síntesis
5. Iterar en el componente con la skill wenu-design-iteration (cuando exista)
```

---

## Patrones específicos a investigar

- **Asymmetric hero with 9rem+ display type** → Ask & Embla, Aplus
- **Editorial product stories** → Aimé Leon Dore, Palmes
- **Material/origin labels in ritual/cultural language** → Maria Black, Ottozinger
- **Brutalist filter bars (no shadows, hard tab borders)** → Ask & Embla shop
- **Embossed seals as ornaments** → Embossed Studio, Aesop
- **Process video loops** → Ragenation, Tekla
- **Product gauge/size visual specs (not just text)** → Maria Black, Niall

---

## No copiar, sintetizar

El brand kit Wenu Mapu (`brand/MARCA-maestro.md`) tiene su propia identidad: **tribal-ritual mapuche + dark luxury + handcraft**. Las referencias son alimento de **proceso**, no destino.

Mantener:
- Earth palette (no copiar paletas frías de Aplus o Tekla)
- Mapudungun cultural layer (única firma)
- Truckee local + 100% online narrative

Evitar:
- Frío corporativo
- Wellness genérico
- Streetwear sin alma
- Boho/spiritual cliché

---

## Próximos pasos sugeridos

1. Pasar 3 referencias clave a FireCrawl (sugerencia: ask-embla.com + embossed.studio + maria-black.com)
2. Pegar markdown extraído en este mismo archivo bajo "Extractos FireCrawl"
3. Cuando esté la skill `wenu-design-iteration`, alimentarle este archivo + brand kit
4. Iterar componente por componente con feedback humano

## Extractos FireCrawl

> Pegar aquí lo que vuelvas a generar con FireCrawl. Cada extracto: link + 1 párrafo de síntesis + screenshot path.
