---
type: brand-reference · portfolio
topic: trabajo handmade real · IG archive
status: canonical · pendiente integración web
date: 2026-05-30
source: 20 URLs Instagram que Ocin confirmó como "todos estos son trabajos míos" (handmade jewelry, no piercing service)
---

# Portfolio handmade — joyería hecha a mano por Ocin

> Estos son posts de Instagram **anteriores** (B-series y C-series de IG = 2019-2021 aprox.) que documentan el trabajo handmade real de Ocin. NO son trabajos de piercing (esos viven en `/piercing` Atelier Gallery con D-series IDs).
>
> Estos deberían vivir en `/artistry` o `/about` como portfolio histórico del oficio.

## URLs (20 posts confirmados handmade)

```
https://www.instagram.com/p/CP7UbMHJST7/
https://www.instagram.com/p/CMJE8uwluI1/
https://www.instagram.com/p/CLfPHAHpPj6/
https://www.instagram.com/p/CLfO7aaJHkW/
https://www.instagram.com/p/CK6xkhKJMMJ/
https://www.instagram.com/p/CDu6PaTJChd/
https://www.instagram.com/p/CDSGiempbZK/
https://www.instagram.com/p/CC1iyv7JAFy/
https://www.instagram.com/p/CCun9_SJVYg/
https://www.instagram.com/p/CBsEbVBpsPL/
https://www.instagram.com/p/CAI2NwgJPIw/
https://www.instagram.com/p/CAHK8S6JLh1/
https://www.instagram.com/p/B6uP8vUpSxl/
https://www.instagram.com/p/B401TwVppqT/
https://www.instagram.com/p/B400v6rJfil/
https://www.instagram.com/p/B4Kp9MwpFtq/
https://www.instagram.com/p/B3JCayKFTSG/
https://www.instagram.com/p/B3JCVd6lqA4/
https://www.instagram.com/p/B3JCQLVlWmO/
https://www.instagram.com/p/BsnsoX-Db9i/
```

## Plan de integración

### Componente nuevo: `HandmadeArchive.astro`
- Mismo estilo que `AtelierGallery.astro` pero con title diferente: **"Hand-forged Archive"** o **"Made by Hand · The Long Trail"**.
- Subtitle: "Earlier pieces — bronze, silver, ritual jewelry, hand-forged in studio."
- Grid de cards con foto (cuando lleguen los screenshots) + caption + link al post IG.

### Ubicación
Primera opción: `/artistry` (página existente que ya habla de proceso/oficio).
Segunda opción: `/about` (manifesto + portfolio histórico).
Tercera opción: nueva página `/archive` o `/handmade`.

### Pendiente
- [ ] Ocin manda screenshots de cada post (o me da acceso a su IG via API si quiere).
- [ ] Por cada uno: identificar tipo de pieza, fecha, material, descripción de 1 línea.
- [ ] Crear `HandmadeArchive.astro` con los 20 cards.
- [ ] Insertar en `/artistry` después del proceso.
- [ ] Schema.org `CreativeWork.author` por cada pieza para SEO.

### Estrategia handmade vs sourced (recordatorio)
Esta sección refuerza la regla canónica de [[regla-handmade-vs-sourced]]: **esto** es el "hand-forged" real con autoría documentable. Las piezas importadas en NocoDB nunca se mezclan con esto.

---

<!-- wenu-backlinks -->
## 🔗 Contexto
- [[brand/01-identity/regla-handmade-vs-sourced]]
- [[brand/01-identity/credenciales-y-cv]]
- [[30-Auditorias/2026-05-29-ux-audit-jerarquia-comercial]] — el audit pidió "más fotos reales de manos/taller/piezas".
