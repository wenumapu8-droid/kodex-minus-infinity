---
tipo: dashboard
proyecto: wenu-mapu
duena: marimari
creado: 2026-05-11
actualizado: 2026-05-11
version: v1-manual
tags: [marimari, norte, dashboard, vivir-de-wenu]
---

# Marimari — Norte

> Una sola nota. Una sola pregunta: **¿cuánto me falta para vivir de Wenu y soltar el supermercado?**
> Revisar cada lunes. Editar a mano hasta que v2 auto-actualice.
>
> Nota hermana: [[Marimari-Sistemas|⚙️ Sistemas y Funnels]] — palancas concretas para que el flujo sea constante.

---

## 0. Por qué hago esto

Wenu Mapu es el camino para salir del supermercado y trabajar desde casa.
No es un hobby ni un side-project: es la apuesta. Joyería, citas privadas,
delivery local en Truckee, tienda online para escalar fuera.

**Norte personal:**
- Tener tiempo. No vender mi semana a un horario que no elegí.
- Construir algo que sea mío y crezca conmigo.
- Llegar a un ingreso estable que cubra lo que cubre el supermercado hoy +
  un colchón razonable.

**Condición de salida del supermercado** (no fecha, condición):
> 3 meses consecutivos donde `ingreso_neto_wenu ≥ salario_digno × 1.5`.
> Antes de eso: reducir horas en paso firme, no en salto.

Contexto canónico del negocio: [[Estado-Wenu-Mapu-2026-05-10]]

---

## 1. Semáforo de hoy (2026-05-11)

| Eje | Estado | Evidencia |
|---|---|---|
| Catálogo vendible | ROJO | 51/104 productos publicables. 42 DRAFT, 54 sin foto, 53 sin SKU, 37 con precio 0 |
| Checkout funcional | ROJO | Sin UI de carrito en frontend Astro. MercadoPago + NowPayments OK en backend |
| SSL dominio raíz | ROJO | wenumapuonline.com sin HTTPS. Solo `wenuos.wenumapuonline.com` con TLS |
| Tráfico / audiencia | AMARILLO+ | **1,732 IG followers** (@wenu__mapu, 193 posts) · 5 newsletter subs · IG activo y con base real |
| Sitio web público | ROJO | Footer renderiza HTML crudo en todas las páginas · duplicados Ritual Ring visibles · sin form email · contradicción showroom — ver [[2026-05-11-auditoria-presencia-digital]] |
| Ventas reales (canal directo) | VERDE | Sáb 2026-05-09: 2 piercings en casa $145 + 1 joya $30 = **$175/día** |
| Cash / runway | ROJO | $300 líquidos. Resto invertido en stock/acciones/crypto |
| Infraestructura técnica | VERDE | API, frontend, bot, tunnel, n8n, monitor: 10/10 servicios vivos |

**Lectura honesta (actualizada):** la cocina online no puede cobrar todavía,
pero el modelo **híbrido en casa ya funciona**. El sábado pasado generaste
$175 en un día (2 piercings + 1 joya). Eso cambia la pregunta. La tienda
online sigue bloqueada por checkout + SSL + catálogo, pero **el ingreso no
depende solo de ella**.

**Lo del gap de $600/mes:** si un sábado de $175 se sostiene cada semana,
el piercing solo genera ~$750/mes y **cubre con holgura el gap** entre
super y costo de vida. Pendiente confirmar: ¿este sábado fue ocasional o
es replicable? La respuesta cambia toda la planificación.

---

## 2. Cuánto falta — finanzas viables

> Cifras procesadas desde [[20-Operaciones/finanzas-base]] el 2026-05-11.
> Algunos campos siguen aproximados (el "perro" sin monto, fees MP exactos
> sin dato, sueldo super variable). Refinar conforme haya datos duros.

### Costos personales mínimos (piso de vida)

| Concepto | USD/mes |
|---|---|
| Renta | 1,400 |
| Servicios (luz/agua/gas/internet/teléfono) | 300 |
| Comida ($200/sem × 4.3) | 860 |
| Salud / seguros | 150 |
| Transporte ($100 / 10 días × 30) | 300 |
| Perro (estimado, refinar) | 50 |
| **Total salario digno** | **~3,060** |

### Costos fijos proyecto Wenu Mapu

| Concepto | USD/mes |
|---|---|
| Hosting ($45/año) | 4 |
| Dominios 2x | 3 |
| Claude (suscripción) | 150 |
| ChatGPT | 20 |
| Fees pago fijos (estimado) | 0 |
| **Total costos fijos** | **~177** |

> **Hallazgo:** el grueso de los costos fijos del proyecto son las
> herramientas IA ($170 = 96%). Si en transición esto pesa, hay opción de
> bajar a un solo plan (Claude o ChatGPT) hasta que las ventas lo cubran.

### Las tres cifras que importan

| Cifra | Fórmula | Valor |
|---|---|---|
| Breakeven proyecto/mes (ventas) | $177 / 0.55 margen | **$320/mes en ventas** |
| Salario digno/mes (a tu mano) | suma personales | **$3,060/mes** |
| **Meta total ventas/mes** | (salario_digno + costos_fijos) / margen | **~$5,884/mes en ventas** |

Para que Wenu te ENTREGUE $3,060/mes después de pagar margen y costos fijos,
necesitas **vender ~$5,884/mes** (asumiendo margen 55% constante).

### Cuántos pedidos para llegar

| Escenario | Ticket promedio | Pedidos/mes | Pedidos/semana |
|---|---|---|---|
| Solo T1 (acceso $25-45) | $35 | 168 | 39 |
| Solo T2 (core $45-85) | $65 | 90 | 21 |
| **Mix realista 50/30/15/5** | **$63** | **93** | **22** |
| Solo T3 (premium $85-150) | $115 | 51 | **12** |

> La fila "Solo T3" muestra el camino más rápido en pedidos: 12/semana en
> piezas premium. Vender menos cosas, más caras, con foto y storytelling
> fuertes. Estrategia natural para edición limitada y citas privadas.

### Meta para la condición de salida (×1.5 colchón)

Para cumplir la condición del §0 (`ingreso_neto ≥ salario_digno × 1.5`):

| Cifra | Valor |
|---|---|
| Meta ingreso neto/mes | $4,590 |
| Meta ventas/mes | **~$8,665** |
| Pedidos/mes en mix realista | **137** |
| Pedidos/semana | **32** |

Esto es el norte real. Llegar ahí no es semana 1 — es 6-12 meses con
crecimiento sostenido.

### Runway si dejara el supermercado hoy

`$300 líquidos / $3,060 piso de vida = **0.10 meses ≈ 3 días**`

**Salir hoy no es opción.** Las inversiones en stock/acciones/crypto son
patrimonio, no runway operativo. La estrategia honesta es: seguir en el
super, crecer Wenu en paralelo, no tocar las inversiones, **construir
runway líquido de 3-6 meses** antes de cualquier reducción de horas.

### USD/hora — comparación de canales

| Canal | $/hora estimado | Escalable | Construye marca |
|---|---|---|---|
| Supermercado | $20/h directo | No | No |
| Piercing en casa | $72/piercing ≈ ~$60-80/h | Limitado (cuerpo presente) | Sí (boca-oreja Truckee) |
| Joyería T2 ($65) | $24/h (1.5h total) | Sí (online) | Sí |
| Joyería T3 ($115) | $25/h (2.5h total) | Sí (online) | Sí (alto valor) |

El piercing es el canal con mejor $/hora pero tope físico (no escala más
allá de tu tiempo). La joyería rinde menos por hora pero **escala sin que
tú estés presente** una vez que el checkout funciona.

### Canal piercing — proyección por frecuencia

Sábado 2026-05-09 fue 2 piercings + 1 joya = $175 en un día.
Asumiendo un sábado replica (sin contar joya, solo servicio):

| Frecuencia | Ingreso mensual piercing | Cubre el gap $600 |
|---|---|---|
| Ocasional (1 vez/mes) | ~$145 | No |
| 1 sábado de cada 2 | ~$290 | Parcial |
| **Cada sábado ($145/sem)** | **~$623/mes** | **Sí, justo** |
| Sábado + 1 día/sem | ~$1,250/mes | Cubre gap + colchón |

**Pregunta clave para esta semana:** ¿qué se necesita para que un sábado
de piercings sea sostenible? Espacio en casa, esterilización, agenda,
publicidad local en IG, permisos sanitarios si aplican. Si esto se vuelve
ritual semanal, el plan cambia: el piercing **es el puente** que sostiene
la transición mientras la joyería online crece.

---

## 3. Bloqueadores ruta crítica (esta semana)

Top 5, ordenados por impacto en hacer la primera venta externa:

1. **Aprobar 4 clusters catálogo** — desbloquea 46 productos · solo decisión humana · sin código · 30-60 min reales · ver [[catalog-approval-queue]]
2. **Codex task-6 PDP trust + related** — final prompt listo, falta merge · ver `~/wenu-frontend/codex-task-6-pdp-trust-and-related-final-prompt.md`
3. **UI checkout MercadoPago en frontend** — la pieza ausente real. Sin esto no se puede cobrar online · 1-2 días Codex
4. **SSL raíz `wenumapuonline.com`** — bloquea acceso público directo · delegable a `wenuos-ops` · 1-2 horas
5. **Publicar 10 productos T2 limpios** — foto + SKU + precio + descripción · no los 51, solo 10 · 2-3 horas

**Lo que NO está en la ruta crítica esta semana:**
materials pages, journal, collection landings, brand polish. Bonitos, no
mueven la aguja a la primera venta.

Ver backlog completo abajo (§6) y queue catálogo en [[catalog-approval-queue]].

---

## 4. Próximas ventas — dos frentes en paralelo

> Update 2026-05-11: la "primera venta" ya pasó. Sáb 2026-05-09 cerraste
> 2 piercings + 1 joya ($175). El plan ya no es "llegar a vender" — es
> **sostener piercing como ritual semanal** + **abrir el canal online**.

### Frente A — Piercing en casa (corto plazo, sostener)

Probado y validado. Sin tecnología que arreglar. Lo que falta es ritual,
no infra:

| Día | Tarea | Resultado |
|---|---|---|
| Esta semana | Auditar setup esterilización + insumos para 4 sábados | Sin sustos sanitarios |
| Esta semana | Foto de tu setup limpio + post IG anunciando "sábados de piercing" | Demanda local visible |
| Próximo sábado | Bloquear 4h con 3-4 slots de 1h | Repetir o superar los $145 |
| Mes 1 | Mantener 4 sábados consecutivos | $580-$750 confirmados/mes |
| Mes 2 | Reservas online (Calendly o link Telegram) | Sin admin manual |

**Meta del frente A:** $600/mes recurrente. Cubre el gap super-vida.

### Frente B — Tienda online (mediano plazo, escalar)

Sigue siendo el desbloqueo de la tienda:

| Día | Bloque | Quién | Resultado |
|---|---|---|---|
| D0–D1 | Aprobar 4 clusters catálogo | Marimari (sola) | 46 productos desbloqueados |
| D1–D2 | Merge Codex task-6 (PDP) | Claude + Codex | Páginas con trust + related |
| D2–D3 | UI checkout MercadoPago | Claude + Codex | Carrito → pago funcional |
| D3 | SSL root domain | `wenuos-ops` | `https://wenumapuonline.com` carga |
| D3–D4 | Publicar 10 productos T2 limpios | Marimari + agente | Tienda vendible |
| D4 | Compra de prueba $1 con tarjeta propia | Marimari | E2E validado |
| D5 | Anuncio IG + email a subs | Marimari + brand | Primer pedido online externo |

**Total: 5 días-foco.** A 2h/día alrededor del super: **10–14 días reales**.
ETA primer pedido **online**: semana del **25 de mayo de 2026**.

### Por qué los dos frentes en paralelo

- **Piercing** genera cash YA, sostiene el costo de vida y construye
  audiencia local de Truckee (boca-oreja → IG followers → potencial
  comprador online).
- **Online** escala sin que estés presente. Es la pieza que algún día te
  saca del super. Pero tarda más en madurar.
- Combinados: el piercing paga las facturas mientras la tienda crece sin
  presión de "vender o nada".

---

## 5. 30 / 60 / 90 días — hitos mínimos realistas

> No es proyección de ingreso. Son hitos operacionales. Si caen, el ingreso
> sigue. Si no caen, hay que diagnosticar.

### 30 días (hasta 2026-06-10)
- **Piercing: 4 sábados consecutivos completados** → confirma $580-$750/mes recurrente
- 3 ventas online externas (no familia ni amigos)
- 20 productos publicables (foto + SKU + precio + descripción)
- 25 suscriptores en email
- Checkout funcional probado por al menos 1 cliente externo

### 60 días (hasta 2026-07-10)
- 10 ventas acumuladas
- 40 productos publicables
- 60 suscriptores
- 1 cliente repite compra
- 1 reseña pública (Google, IG o sitio)
- [[20-Operaciones/finanzas-base]] con costo real por SKU (no placeholder 55%)
- **Runway líquido: $1,000** (de los $300 actuales a $1,000 ahorrado en líquido)

### 90 días (hasta 2026-08-10)
- 25 ventas acumuladas
- Ingreso mensual del proyecto ≥ breakeven_proyecto ($320/mes en ventas)
- **Runway líquido: $3,000** (1 mes de salario digno en cuenta)
- Decisión informada de **reducir horas** en el supermercado (no salir aún)
- Si los 3 meses cumplieron meta → empezar conteo de "3 meses consecutivos"
  para la condición de salida

> **Runway primero, salida después.** Reducir horas del super sin colchón
> líquido es saltar al vacío. La meta antes de cualquier reducción es
> tener $9,000 líquidos (3 meses de salario digno).

**Salida del supermercado:** no se programa por fecha. Se gatilla cuando
se cumple la condición de §0 por 3 meses seguidos.

---

## 6. Operación viva

> Backlog y estados generados por el sistema. Si esta sección está vacía o
> desactualizada, abrir [[Estado-Sistema]] directamente.

![[Estado-Sistema]]

---

## Cómo usar esta nota

- **Lunes en la mañana, 10 minutos.** Revisar §1 semáforo, §3 bloqueadores, §4 ETA.
- **Editar §1 a mano** cuando una luz cambie. Anotar fecha.
- **Editar §3** cuando un bloqueador se resuelve o aparece uno nuevo.
- **§2 finanzas:** rellenar [[20-Operaciones/finanzas-base]] una vez. Recalcular cuando los gastos cambien.
- **§4 y §5:** revisar cada 30 días. Si los hitos no caen, diagnosticar antes de mover fecha.

**Cuando v2 esté lista** (estimado: cuando esta nota tenga 2 semanas de uso real),
el Daily Report Agent reescribe §1 y la parte alta de §3 entre marcadores
`<!-- AUTO:START -->` / `<!-- AUTO:END -->`. Hasta entonces, todo manual.

<!-- wenu-backlinks -->

[[Home]] · [[00-Index/Proyectos-MOC|Proyectos]] · [[Estado-Wenu-Mapu-2026-05-10]] · [[Estado-Sistema]] · [[20-Operaciones/finanzas-base]]
