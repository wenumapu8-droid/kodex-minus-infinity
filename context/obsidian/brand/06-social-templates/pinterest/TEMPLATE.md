---
channel: pinterest
canvas: 1000x1500 (2:3) standard pin · 1000x2100 (1:2.1) story pin / idea pin
voice: brand/voz-de-marca-real-2026-05-03.md
purpose: long-tail discovery + traffic to product pages and journal
status: template
---

# Pinterest Pin — Base Template

Pinterest is *search*, not social. Optimize for keywords and saved-for-later intent, not virality.

---

## Pin fields (paste-ready)

**Title** (≤100 chars, keyword-leading)
> {{e.g., "Vacamuerta meteorite ring — solid 950 silver, hand-forged in Chile"}}

**Description** (≤500 chars, keyword-rich but sentence-form)
> {{e.g., "Wenu Mapu rings cast from a 4.5-billion-year-old Atacama mesosiderite. Each piece is one of a few. 950 sterling silver setting, sized to order. Made in Chile, shipped from Truckee CA. Inquire for sizing."}}

**Destination URL** (full canonical)
> {{https://wenumapuonline.com/p/<slug>}} or {{https://wenumapuonline.com/material/vacamuerta}}

**Board** (pick one — or propose new)
> {{e.g., "Meteorite Jewelry", "Body Modification — Ritual Pieces", "Material Library — Vacamuerta", "Ear Cuffs — Brass & Silver"}}

**Tags / topics** (Pinterest internal, choose up to 10)
> body jewelry, meteorite ring, sterling silver 950, implant grade titanium, ritual adornment, handmade jewelry, brass and bronze, tribal jewelry contemporary, north lake tahoe, truckee artisan

---

## Visual brief

- **Aspect:** 2:3 vertical default (1000×1500). Use 1:2.1 (1000×2100) only for idea pins / multi-frame.
- **Subject:** the piece, in studio context. Pinterest rewards lifestyle over flat-lay.
- **Text overlay (optional, ≤6 words):** use DM Serif Display, bone or bronze on dark. Place top-third. Skip overlay if image speaks alone.
- **Palette:** brand palette only. Pinterest dashboards already have enough visual noise.
- **Forbidden:** stock photo gloss, "shop now" plastered across image, Canva-default fonts, watermark, infographic chartjunk.

Generate via prompt #6 in `agent-control/PROMPTS_FOR_AGENTS.md` with aspect 2:3.

---

## Pin variants

For each campaign theme, produce 3 visual variants pointing to the *same* destination URL. Pinterest A/B-tests them automatically.

| # | Variant focus              | Image direction                                  |
|---|----------------------------|--------------------------------------------------|
| 1 | Hero piece                 | Single piece, dark stone, side-lit, 2:3          |
| 2 | Material macro             | Close-up of texture (meteorite grain, silver patina) |
| 3 | Context / lifestyle        | Piece on body, studio light, no face             |

---

## SEO + linking

- **Rich Pin enabled?** [ ] yes — requires product schema on PDP (already shipped — `JSON-LD Product` in `~/wenu-frontend/src/pages/p/[slug].astro`).
- **UTM parameters:** `?utm_source=pinterest&utm_medium=social&utm_campaign={{campaign}}`
- **Idea pin steps?** (if multi-frame): 4–7 frames, each a step or angle. End with destination URL frame.

---

## Publication metadata

- Theme / campaign: {{}}
- Posting date: {{YYYY-MM-DD}}
- Variants posted: [ ] 1 / [ ] 2 / [ ] 3
- Board:  {{}}
- Cross-post adaptation:
  - [ ] IG Post (re-crop to 4:5)
  - [ ] Aftercare journal entry if educational
