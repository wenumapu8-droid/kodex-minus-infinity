---
type: spec · feature web · atelier
topic: Atelier — formulario de cotización custom con upload de modelo 3D o foto + render + cotización en tiempo real con precio oro vivo
status: idea propuesta · post-Vegas
date: 2026-06-04
fuente: idea Ocin 2026-06-04
referencia_externa: https://joyerokit.com/instalar
---

# Atelier — Custom commission con render + cotización live

> Ocin: *"me gustaría tener en la parte de atelier opción para enviar a fabricar la joya custom de que puedas subir un modelo 3d para hacer la cotización, o que puedas subir una foto para hacer un render después que pueda mandarle una hoja de cálculo y cotización en tiempo real con los valores del oro y el trabajo"*

---

## Concepto

Una página `/atelier/commission` donde el cliente:

1. Sube **modelo 3D (.stl, .obj, .stp, .step)** O **foto / sketch** de la pieza que quiere
2. Elige material base (gold 14k / 18k, plata 925, titanium, etc.)
3. El sistema:
   - Si subió 3D: lee el volumen del archivo, calcula gramos del material elegido
   - Si subió foto: genera render preliminar via AI image generation y muestra preview
   - Calcula cotización en tiempo real usando precio spot del oro / plata del día
   - Suma horas de trabajo estimadas según complejidad
   - Devuelve hoja de cálculo (PDF) + total estimado
4. Cliente revisa, ajusta, manda solicitud formal
5. Notificación a Ocin (email + Slack/WA) con el caso

---

## Referencia externa

**JoyeroKit** — https://joyerokit.com/instalar (app que Ocin mencionó como referencia). Probablemente herramienta de cotización jewelry. Investigar API o si tiene white-label / integración.

---

## Componentes técnicos

### Frontend (Astro + React island)

```
/atelier/commission/
  ├── Step1Upload.tsx          — drag&drop 3D file o foto
  ├── Step2Material.tsx        — selector material + acabado
  ├── Step3Preview.tsx         — render 3D o preview AI
  ├── Step4Estimate.tsx        — quote en vivo con desglose
  ├── Step5Submit.tsx          — form contacto + submit
  └── EstimateBreakdown.tsx    — desglose (material × gramaje × precio spot + labor + finishing)
```

### Backend / APIs necesarias

**1. Three.js / model-viewer para preview 3D:**
- `<model-viewer>` (Google web component) — drag rotate + lighting
- Calcular volumen del archivo .stl/.obj via three.js (BoxGeometry → volume calc)
- Gramos = volumen × densidad_material

**2. Precio spot oro/plata vivo:**
- API gratis: https://metals.live (oro USD/g actualizado)
- O: https://api.metals.dev (paid, más confiable)
- O: scrape de https://www.kitco.com (free, frágil)
- Cache 15 min para no spammear

**3. Render AI desde foto/sketch:**
- OpenAI DALL-E 3 / Imagen 3 / Stable Diffusion XL via Replicate
- Prompt: "professional jewelry render, gold ring, 4K, studio lighting, white background, photorealistic"
- Costo aprox: $0.04-0.10 por imagen generada
- Solo activar después de upload válido (no spam)

**4. Cotización backend:**
- Endpoint `/api/quote` (Astro endpoint o Cloudflare Worker)
- Recibe: { material, weight_g, complexity, finishing }
- Devuelve: { material_cost, labor_cost, finishing_cost, total, breakdown_pdf_url }

### Hoja de cálculo (Excel/Sheets)

Genera un xlsx con:

| Item | Detalle | Cantidad | Precio unitario | Total |
|---|---|---|---|---|
| Material | Gold 14K · 5.2g | 5.2 | $58.40/g | $303.68 |
| Labor | Casting + setting + polish | 3h | $80/h | $240.00 |
| Finishing | Hand-engrave detail | 1 | $40 | $40.00 |
| **Subtotal** | | | | **$583.68** |
| Shipping | International tracked | 1 | $35 | $35.00 |
| **Total** | | | | **$618.68** |

Se le manda al cliente como adjunto PDF + breakdown visual en la página.

---

## Stack propuesto

```
Astro (existing) + React island
  └── @google/model-viewer  — visualizador 3D
  └── three.js (mesh volume) — cálculo gramaje
  └── react-dropzone — upload
  └── xlsx — generar Excel
  └── jsPDF — generar PDF cotización
  └── recharts — gráfico de desglose

Backend:
  └── Astro endpoints o Cloudflare Workers
  └── metals.live API (precio spot)
  └── OpenAI / Replicate API (render AI)
  └── Cloudflare R2 (storage de uploads 3D temp)
  └── Resend / Postmark (email del quote)
```

---

## UX flow

```
┌─────────────────────────────────────────────────┐
│  /atelier/commission                            │
│                                                 │
│  ATELIER · COMMISSION                           │
│  Una pieza, hecha para vos.                     │
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │  STEP 1 — Drop your 3D model or photo    │  │
│  │  [drag & drop zone]                       │  │
│  │  .stl .obj .step OR .jpg .png .heic      │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │  STEP 2 — Choose material                 │  │
│  │  ○ Gold 14K     ○ Gold 18K               │  │
│  │  ○ Silver 925   ○ Platinum               │  │
│  │  ○ Titanium G23 ○ Brass                  │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
│  [preview 3D rotating]    [estimated weight]   │
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │  YOUR ESTIMATE                            │  │
│  │  Material  (5.2g Gold 14K) ........ $303  │  │
│  │  Labor     (3h)             ........ $240 │  │
│  │  Finishing                  ........ $40  │  │
│  │  Subtotal                   ........ $583 │  │
│  │  Shipping (international)   ........ $35  │  │
│  │  TOTAL ESTIMATED            ........ $618 │  │
│  │                                           │  │
│  │  [request formal quote] [download PDF]   │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
│  Gold spot price: $58.40/g · updated 12 min    │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## Decisiones que necesita Ocin

- **¿Precio del oro spot o margen aplicado?** Recomiendo: spot × 1.15 (markup razonable) para protegerte de fluctuaciones intra-día.
- **¿Hora de trabajo a cuánto?** Definir tarifa $/hora (Ocin / proveedor). Default sugerido: $80–120/h artesano custom jewelry US.
- **¿Pago: anticipo o total?** Recomiendo: 50% anticipo al confirmar quote (no reembolsable después de empezar), 50% antes de envío.
- **¿Tiempo de delivery?** 4–8 semanas estándar para custom.
- **¿Materiales que NO querés ofrecer?** Por ej. platino requiere proveedor especial; brass es bajo margen.

---

## Por qué esta feature es smart

1. **AOV alto** — custom pieces se venden de $500-3000+ vs $50 promedio del catálogo regular
2. **Diferenciación** — pocos competidores tienen UX de cotización live; la mayoría manda email "we'll get back to you" y pierden lead
3. **Filtra clientes serios** — el que subió 3D + dejó datos es lead caliente, no curioso
4. **Brand authority** — refuerza que sos atelier real, no solo retail
5. **Escalable** — apenas funciona el flujo, podés ofrecerlo a otros piercers / joyeros como white-label

---

## Roadmap

**Fase 1 — MVP simple (post-Vegas, ~3-5 días):**
- Formulario sin 3D viewer, solo upload de foto + selector material
- Cotización manual: Ocin responde con quote por email en 24h
- Validar demanda con métricas (cuántos leads, cuántos cierran)

**Fase 2 — 3D viewer + cálculo gramaje (2-3 semanas):**
- model-viewer + cálculo volumen
- Spot price API integrado
- Quote auto-generado

**Fase 3 — AI render desde foto (3-4 semanas):**
- Integración OpenAI Imagen / Replicate
- Preview render visual
- A/B test si convierte mejor con render vs sin render

**Fase 4 — Hoja de cálculo + PDF profesional (1 semana):**
- xlsx descargable
- PDF brandeado
- Email automático con cotización completa

**Costo estimado total dev:** ~$0 (DIY con Claude Code) + APIs ($10-50/mes según uso)

---

## Riesgos

- **3D file pesado:** limit upload a 50MB max; rechazar archivos malformados
- **AI render no convence:** el render es preview, no commitment; mostrar disclaimer "actual piece may vary"
- **Precio del oro fluctúa:** quote válida 48h, después recalcular
- **Customer expectations:** si dijiste "gold 14k" y después usás 10k, problema. Locked-in material en quote.

---

<!-- wenu-backlinks -->
## 🔗 Contexto
- [[BRAND-DNA-2026-05-03]] — atelier como categoría brand
- [[quality-bar-vegas]] — esta feature DEBE pasar Quality Bar antes de salir
- [[spec-pdp-adaptive-background]] — el viewer 3D también podría adoptar bg adaptativo
- [[regla-handmade-vs-sourced]] — custom = hand-forged por defecto
