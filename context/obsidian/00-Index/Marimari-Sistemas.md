---
tipo: sistemas
proyecto: wenu-mapu
duena: marimari
creado: 2026-05-11
actualizado: 2026-05-11
tags: [marimari, sistemas, funnels, optimizacion]
---

# Marimari — Sistemas y Funnels

> Nota hermana de [[Marimari-Norte]].
> Mientras Norte responde "¿cuánto me falta?", esta responde
> **"¿qué palancas usar para que el flujo de ingresos sea constante?"**.
> Foco: alto retorno, bajo esfuerzo, antes de inventar nada nuevo.

---

## Diagnóstico — por qué los retornos son irregulares hoy

Lo que pasó el sábado 2026-05-09 ($175 en un día) no es suerte: es lo que
pasa cuando hay demanda real y servicio listo. El problema no es que la
demanda no exista — el problema es que **cada interacción se está
quemando una sola vez**. No hay sistemas que conviertan un piercing en
un cliente de joyería, ni una visita de IG en un suscriptor de email, ni
una venta en una segunda venta.

**5 fugas concretas hoy:**

1. **Piercing → cliente:** cada piercing termina cuando termina el piercing. No se captura email, no se invita a IG, no se ofrece joya con descuento, no se agenda el aftercare. El piercing paga la hora pero no construye nada.
2. **IG → lista:** sin lead magnet, sin Linktree estructurado, sin secuencia de bienvenida. Los seguidores son número, no audiencia activable.
3. **Catálogo 104 vs hero 10:** el visitante online se pierde en 104 productos (la mitad sin foto, sin precio, en draft). Si en cambio viera 10 piezas perfectas, la conversión sería múltiplos mejor.
4. **Sin medición semanal:** no hay forma de saber qué canal está rindiendo. "El sábado vendí $175" se sabe; "los últimos 4 sábados" no se sabe sin papel.
5. **$170/mes en herramientas IA pre-revenue:** las dos suscripciones (Claude $150 + ChatGPT $20) son el 96% del costo fijo del proyecto. Una sola bastaría hasta que las ventas paguen ambas.

---

## Palancas priorizadas por retorno / esfuerzo

| # | Palanca | Retorno esperado | Esfuerzo | Plazo |
|---|---|---|---|---|
| 1 | Sistematizar piercing (captura + upsell + aftercare) | Alto — convierte $145/día en $145 + email + IG + repeat | Bajo — 2-3h setup | Esta semana |
| 2 | Funnel IG → Linktree → email | Alto — convierte audiencia en lista | Medio — 1 día | Próxima semana |
| 3 | Top 10 productos hero (esconder el resto) | Medio — sube conversión del tráfico online | Bajo — 4h | Esta o próxima semana |
| 4 | Sistema de medición semanal (ventas-log.md) | Habilitador — sin esto las otras palancas son ciegas | Bajo — 30 min | Esta semana |
| 5 | Recortar suscripción IA en transición | $150/mes de ahorro inmediato | Bajo — decisión + 5 min | Hoy mismo si decides |

**Regla:** atacar de 1 a 5 en orden. No saltar a la #3 si la #1 no está hecha. La #5 puede ejecutarse en paralelo porque no toma tiempo.

---

## El funnel objetivo (norte para todas las palancas)

```
TRÁFICO
├── IG local Truckee (orgánico + boca-oreja piercing)
├── Búsqueda Google ("piercing Truckee", "handmade jewelry Tahoe")
└── Referidos clientes existentes
    │
    ▼
INTERÉS — Linktree con 3 puertas claras
├── "Reservar piercing en casa" → Calendly
├── "Ver joyería" → wenumapuonline.com
└── "Suscribirme al journal" → lead magnet
    │
    ▼
CAPTURA — email (la única lista que importa)
├── Lead magnet: "Guía: 5 combinaciones de piercings y joyas"
└── Welcome sequence: 3 emails en 7 días
    │
    ▼
PRIMERA VENTA
├── Piercing presencial $50-$85 (alta tasa de cierre)
└── Joya online $30-$115 (más lento, escala)
    │
    ▼
NUTRICIÓN
├── Aftercare email automatizado (ya existe /aftercare/)
├── Journal mensual (cuando exista)
└── Posts IG con UGC
    │
    ▼
REPEAT
├── Descuento próxima compra/piercing
├── Lanzamiento exclusivo email-only
└── Programa "trae a una amiga" (referido)
    │
    ▼
FAN
├── Reseña pública (Google, IG)
├── UGC (foto del piercing/joya con tag)
└── Boca-oreja Truckee (motor #1 de tráfico)
```

Este es el ciclo. Cada palanca abajo arregla un eslabón.

---

## Palanca 1 — Sistematizar piercing (esta semana)

> **Playbook completo de ejecución: [[20-Operaciones/piercing-sistema]]**
> Bandeja con 8 piezas concretas del catálogo, post IG copy-paste,
> 3 plantillas email, script de conversación, checklist viernes,
> métricas por sábado. Listo para ejecutar.

**Por qué primero:** ya está vendiendo. No hay nada que validar. Solo hay
que convertir cada piercing en 4 outputs en vez de 1.

### Flujo objetivo (un sábado tipo)

| Momento | Acción | Sistema |
|---|---|---|
| Antes (reserva) | Cliente reserva por Calendly/IG DM | Calendly free + IG bio |
| Antes (recordatorio) | Email/WhatsApp 24h antes con qué traer | Plantilla guardada |
| Llegada | Foto autorizada del setup + Polaroid del cliente (opcional) | Polaroid o IG story |
| Durante | Conversación: "¿te muestro algunas piezas que combinan?" | Bandeja de 5-6 joyas T1-T2 a la mano |
| Pago piercing | Cobro $72.50 (efectivo, Zelle, MercadoPago link) | QR impreso del link |
| Upsell joya | Si compra, 15-20% off por ser el día | "Hoy te llevas X con 15% menos" |
| Antes de irse | Foto post-piercing con permiso + invitación: "¿te mando el aftercare por email?" | Captura email aquí |
| Post (mismo día) | Email aftercare automatizado (ya existe `/aftercare/`) | Plantilla + manual o MailerLite |
| Post (día 7) | IG story etiqueta cliente: "1 semana del piercing de [nombre]" | Recordatorio en calendario |
| Post (día 14) | Email: "¿cómo va sanando? Te dejo este código por si quieres una joya nueva" | Plantilla |

### Setup (3 horas, una sola vez)

- Crear cuenta Calendly free + 1 evento "Piercing Truckee — sábados"
- Imprimir QR de MercadoPago para cobro rápido
- Tener 1 hoja con 6 joyas T1-T2 listas para mostrar (las mejores fotos)
- Plantilla email aftercare con link al /aftercare/ del sitio
- Post IG fijo: "Sábados de piercing en casa — Truckee — agendar aquí [link]"

### Métrica de éxito

- Piercings/sábado: hoy 2, meta 3-4 en 30 días
- Email captura por piercing: hoy 0, meta 80%
- Joya vendida por piercing: hoy 1 de 2 = 50%, meta sostener 50%+

---

## Palanca 2 — Activar canales dormidos + funnel (esta semana)

> **Update 2026-05-11 post-auditoría completa:** ver [[2026-05-11-auditoria-presencia-digital]].
>
> **El plan cambió.** Ya existen activos enormes que no estaba aprovechando:
> - **1,732 followers en @wenu__mapu** (audiencia real, no 0)
> - **Linktree `linktr.ee/Wenumapu`** ya con 6 links activos
> - **Tienda Etsy `Wenumapu8` abierta 3 años con 0 productos** — plata enterrada
> - **PayPal directo** funcional (cobro sin checkout WC)
> - **WhatsApp Business** activo
> - **Behance** profesional con 24 proyectos
>
> **Decisiones confirmadas con Marimari (2026-05-11):**
> - ✅ Etsy: ACTIVAR esta semana (5-10 productos)
> - ✅ somaelixir.cl: standby, no liberar dominio
> - ✅ Email canónico: `marimari@wenumapuonline.com`
> - ✅ Identidad: Nicolás Ortega García = Marimari (mismo individuo;
>   Marimari default, Nicolás solo en contextos legales/Behance)

### Sub-pasos de la Palanca 2 reordenados

| # | Acción | Tiempo | Quién | Estado |
|---|---|---|---|---|
| 2.1 | **Publicar 10 productos en Etsy** ([[20-Operaciones/etsy-activacion-2026-05-11|playbook completo]]) | 4-6h en 2 sesiones | Marimari + Claude (fichas) | LISTA LISTA |
| 2.2 | Arreglar 3 bugs Linktree (http→https, Etsy URL, IG redundante) | 15 min | Marimari | pendiente |
| 2.3 | Agregar slots Linktree: Calendly piercing · newsletter · WhatsApp pricing · custom orders | 30 min | Marimari + decisión | pendiente |
| 2.4 | Fix footer bug wp-admin | 10 min | Marimari (decidir si Codex) | pendiente |
| 2.5 | Form de captura email en sitio (página dedicada o footer) | 1h | Codex | pendiente |
| 2.6 | Welcome sequence 3 emails MailerLite | 2h | Claude (drafts) + Marimari (review) | pendiente |

**Por qué segunda:** sin lista, todo es de un solo uso. El email es el
único canal que **te pertenece** (IG puede cambiar algoritmo mañana).

### Plan mínimo

1. **Linktree (o sustituto)**: 3 botones claros — `Reservar piercing` / `Joyería` / `Journal`.
2. **Lead magnet simple**: PDF de 1 página "Cómo combinar piercings y joyas — guía Wenu Mapu" (Canva, 1h de diseño). Entrega automática al suscribirse.
3. **Welcome sequence** en MailerLite (ya configurado por DMARC):
   - Email 1 (al instante): el PDF + presentación de Marimari en 2 párrafos.
   - Email 2 (día 3): historia de la marca + foto detrás de cámaras.
   - Email 3 (día 7): primera oferta — 15% off en T1 o T2 con código de 7 días.
4. **CTA en cada post IG**: "Link en bio para la guía gratis".

### Métrica de éxito

- Subs nuevos/semana: hoy ~0, meta 10/sem en 30 días, 25/sem en 60d.
- Tasa de apertura welcome: meta 40%+.
- Tasa de click email 3 (oferta): meta 10%+.

---

## Palanca 3 — Top 10 productos hero (esta o próxima semana)

**Por qué tercera:** el frontend está construido pero el catálogo es ruido.
Mostrar 10 piezas perfectas convierte mucho más que 104 mediocres.

### Criterios para el top 10

- Foto profesional o bien iluminada (no improvisada)
- Precio claro y SKU asignado
- Descripción de 2-3 párrafos con historia/material
- Stock disponible (no piezas únicas ya vendidas)
- Mix de tiers: 4× T1 ($25-45), 4× T2 ($45-85), 2× T3 ($85-150)

### Acción

1. Marimari elige 10 piezas de las 51 publicables en una tarde.
2. En WC, marcar las otras 94 como **draft/private** hasta tener foto+precio+desc.
3. Frontend rebuild → muestra 10, no 64.
4. En 30 días, agregar otras 10 (llegar a 20 publicadas, 80 ocultas).

### Métrica de éxito

- Productos visibles en el sitio: bajar de 64 a 10.
- Tasa de "view product → click checkout" (cuando el checkout esté): meta 5%+.

---

## Palanca 4 — Medición semanal (esta semana)

**Por qué necesaria:** sin números no se sabe qué optimizar. Mantenerlo
brutalmente simple.

### Archivo a crear

`/Users/user1/Obsidian/WenuAgent/20-Operaciones/ventas-log.md`

Tabla semanal con 6 columnas:

| Semana | Piercings | Joyas vendidas | $ total | IG followers nuevos | Email subs nuevos |
|---|---|---|---|---|---|
| 2026-05-04 → 05-10 | 2 | 1 | $175 | ? | ? |
| 2026-05-11 → 05-17 | | | | | |

Cada domingo en la noche, 5 minutos. Anotar y comparar contra la semana
anterior. Sin gráficos, sin app — solo la tabla. Cuando haya 8 semanas,
empieza a contar la historia sola.

---

## Palanca 5 — Recortar suscripción IA (decisión hoy)

**Por qué urgente:** $170/mes ≈ 2 piezas T2 vendidas. Es mucho para
herramientas mientras la tienda no factura.

### Opciones

| Opción | Costo/mes | Pro | Contra |
|---|---|---|---|
| Mantener ambas | $170 | Más capacidad | Pesa en fijo pre-revenue |
| **Solo Claude $150** | $150 | Más capaz para código/sistemas | Pierdes ChatGPT |
| **Solo ChatGPT $20** | $20 | Ahorro $150/mes inmediato | Menos capacidad técnica |
| Pausar ambas, usar gratis | $0 | Ahorro total | Tiempo extra en cada tarea |

**Recomendación honesta:** mientras pre-revenue (próximos 60-90 días),
considerar bajar a una sola. El $150 ahorrado son **6 sábados de piercing
de colchón** o **3 meses de runway de hosting/dominios**. Cuando la
tienda facture $1,000+/mes, reactivar la segunda.

### Métrica de éxito

- Costo fijo proyecto baja de $177 a $27/mes → breakeven baja de $320 a ~$50/mes en ventas.

---

## Orden propuesto para las próximas 2 semanas

**Semana 1 (12 al 18 mayo):**
- Lunes (hoy): decidir palanca #5. Cancelar suscripción si aplica.
- Lunes/martes: crear `ventas-log.md` y registrar la semana pasada.
- Miércoles: setup Calendly + QR MercadoPago + plantilla aftercare.
- Jueves/viernes: post IG fijo "sábados de piercing", hoja de joyas para mostrar.
- Sábado: ritual piercing nuevo activado.

**Semana 2 (19 al 25 mayo):**
- Lead magnet PDF (Canva).
- Linktree con 3 botones.
- Welcome sequence en MailerLite (3 emails).
- Selección top 10 piezas hero.
- Avance frente B online (Codex tasks pendientes).

En 2 semanas: piercing sistematizado + funnel email vivo + tienda con
hero 10 + costos bajados. **Esa es la base que hace constante lo que hoy
es esporádico.**

---

## Lo que NO está en esta nota (deliberado)

- **No hay ads pagados.** Antes de pagar tráfico hay que tener funnel.
- **No hay rediseño de marca.** La marca ya funciona suficiente para vender.
- **No hay nuevo producto.** Optimizar lo que existe antes de crear más.
- **No hay expansión a otras ciudades.** Truckee primero, dominio antes que escala.

Lo aburrido y enfocado paga. Lo brillante y disperso quema cash y tiempo.

<!-- wenu-backlinks -->

[[Marimari-Norte]] · [[Home]] · [[Estado-Wenu-Mapu-2026-05-10]] · [[20-Operaciones/finanzas-base]]
