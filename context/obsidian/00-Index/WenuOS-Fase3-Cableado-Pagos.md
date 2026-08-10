---
tipo: spec-tecnica
fecha: 2026-07-04
tags: [wenuos, pagos, fase3, mercadopago, nowpayments, spec]
relacionado: [[00-Index/WenuOS-Blueprint-Automatizacion]] · [[00-Index/mapa-sistemas-wenu-2026-06-24]]
---

# 🔌 WenuOS — Fase 3: Cablear el sitio a la API de pagos (spec)

> Especificación lista para aplicar. **No se editó código en vivo** (frontend ni backend) porque toca la tienda real; se deja el cambio exacto para que Ocin/agente lo aplique con revisión. La lógica de pagos **ya existe y la API corre** (:3335).

## Hallazgo que simplifica todo

El sitio es **estático (Astro `output: 'static'`)** y se creía que había que pasarlo a SSR para tener checkout. **No hace falta.** El form corre en el navegador; un `fetch` del lado del cliente a la API externa funciona perfecto en un sitio estático. Es un cambio chico, no una migración.

## Estado actual (verificado en código)

- Form: `wenu-frontend/src/components/forms/CustomOrderForm.astro` → hoy hace `fetch('/api/custom-order')` (ruta inactiva en build estático) y cae a **mailto**.
- API `POST /custom-orders` (público, no requiere admin): valida `email` + `brief`, hace upsert de `Customer`, crea `CustomOrder(status:new)`, **notifica a Ocin por Telegram**, y responde `{ ok:true, customOrder:{ id } }`.
- API `POST /custom-orders/:id/deposit-link` (paso 2, tras cotizar): si el encargo tiene `quoteClp`, crea preferencia MercadoPago y devuelve `init_point` (link de pago del 30%).
- CORS: `@fastify/cors` con `origin = ALLOWED_ORIGINS` (env). Hoy hay que sumar el dominio del sitio.
- Webhooks en código: `notificationUrl = https://api.wenumapu.com/mp/webhook` y success/failure en `https://wenumapu.com/...` — **desalineados** con `wenumapuonline.com` (a corregir).

## Cambios exactos

**1. Exponer la API públicamente (Cloudflare Tunnel).** Hoy sólo `wenuos.wenumapuonline.com → :3333`. Agregar hostname:
```
api.wenumapuonline.com  →  http://localhost:3335
```
(Con Cloudflare Access/OAuth si se quiere, pero el endpoint público `/custom-orders` debe quedar accesible para el navegador del cliente.)

**2. `wenu-platform/.env` — permitir el origen del sitio (no es secreto):**
```
ALLOWED_ORIGINS=https://wenumapuonline.com,https://www.wenumapuonline.com,https://wenu-frontend.pages.dev
```

**3. Form del sitio — apuntar al endpoint real.** En `CustomOrderForm.astro`, reemplazar el `fetch('/api/custom-order')` por:
```js
const API = import.meta.env.PUBLIC_WENU_API || 'https://api.wenumapuonline.com';
const response = await fetch(`${API}/custom-orders`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email, name, phone,
    brief: { tipo, material, budget, vision, timing }  // arma el brief con los campos del form
  }),
});
const data = await response.json();   // { ok, customOrder: { id } }
```
Mantener el **mailto como fallback** si `!response.ok`. Definir `PUBLIC_WENU_API` en Cloudflare Pages env.

**4. Alinear dominios de webhook (en `api.mjs`, callers de `mpCreatePreference` + IPN NOWPayments):**
```
notificationUrl: https://api.wenumapuonline.com/mp/webhook
successUrl:      https://wenumapuonline.com/encargos/gracias?id=...
failureUrl:      https://wenumapuonline.com/encargos
```
Y en el panel de **NOWPayments** poner el IPN callback → `https://api.wenumapuonline.com/nowpayments/ipn`.

## Flujo resultante (automático)

```
Cliente llena el form  →  POST /custom-orders  →  CustomOrder(new) en Postgres
        │                                             │
        │                                             └─► notifyOwner → Telegram (Ocin)  [ya funciona]
        │                                             └─► wenuos-order-alert lo confirma  [ya funciona]
   Ocin cotiza (quoteClp)  →  POST /custom-orders/:id/deposit-link  →  link MercadoPago 30%
        │
   Cliente paga  →  /mp/webhook (approved)  →  status=accepted, depositPaidAt  →  💰 Telegram  [ya funciona]
```
Cripto: idéntico vía NOWPayments `/nowpayments/ipn` (firma verificada).

## Riesgo / seguridad

- Aplicar en una **rama de preview** de Cloudflare Pages y probar con un encargo de prueba antes de producción.
- No se exponen llaves: `MP_ACCESS_TOKEN`, `NOWPAYMENTS_*` viven sólo en `wenu-platform/.env`.
- Confirmar el `preHandler` de admin: `POST /custom-orders` debe quedar **fuera** del guard admin (es público). Verificar antes de exponer.

## Qué necesita de Ocin

- Crear el hostname `api.wenumapuonline.com → :3335` en Cloudflare Tunnel.
- Decidir dominio canónico de webhooks (recomendado: `api.wenumapuonline.com`).
- Aprobar el cambio del form (rama preview) antes de producción.
