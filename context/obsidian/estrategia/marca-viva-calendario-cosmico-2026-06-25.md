---
tipo: estrategia
proyecto: wenu-mapu
creado: 2026-06-25
actualizado: 2026-06-25
estado: propuesta
duena: marimari
tags: [estrategia, calendario, cosmico, instagram, funnel, repricing, marca-viva, we-tripantu]
---

# Marca Viva — Calendario Cósmico, Rotación del Sitio y Funnel Instagram

> Nota hermana de [[00-Index/Marimari-Sistemas]] (el funnel) y de [[contenido/ig/2026-W17]] (el contenido semanal).
> Mientras Marimari-Sistemas responde "¿qué palancas hacen constante el ingreso?", esta nota responde
> **"¿qué motor hace que la tienda rote sola, suba de precio sin abaratarse, y alimente sitio + Instagram desde una sola fuente?"**.
> Esto NO reemplaza el funnel: es la rueda que lo mueve. El funnel sigue siendo email + hero-10 + piercing.

---

## 0. Antes de empezar: lo que esta nota cuestiona

El encargo asume que "destacar una colección por ciclo permite subir precios". Eso es parcialmente cierto y conviene decirlo claro:

- [Seguro] El cuello de botella real hoy NO es la falta de un calendario. Es la falta de fotos: la auditoría [[30-Auditorias/woo/audit-2026-04-27]] reporta 50 de 51 productos sin imagen. Un calendario cósmico sobre un catálogo sin fotos rota aire. **La rotación necesita, como mínimo, una pieza destacada con foto-hero lista por ventana.**
- [Probable] El calendario sí justifica subir el precio base, pero el mecanismo no es "destacar" — es **escasez real + ocasión cultural + no descontar nunca el precio base**. Si el código se vuelve costumbre, entrena a esperar rebaja y baja el precio percibido. La disciplina (pocas ventanas, fechas reales, stock real) es lo que sostiene el precio, no la frecuencia.
- [Suposición] Asumo que existe capacidad de producir/fotografiar al menos 1 pieza destacada nueva por estación solar (4 al año) más alguna luna. Si no, el calendario se reduce a rotar lo ya fotografiado y a re-narrar, sin drop nuevo. Eso también funciona, pero cambia el repricing (ver §5).

Conclusión: el calendario es un buen motor **si** se alimenta de stock real con foto. La honestidad de la escasez es la regla dura, y se cumple sola si las fechas y el stock son verdaderos.

---

## 1. Qué ya existe (para no duplicar)

Barrido de `estrategia/`, `brand/`, `00-Index/`, `20-Operaciones/` y `contenido/`. No hay ninguna nota previa de calendario, cupones ni repricing. Sí existe, y esta nota **enlaza y extiende**:

- [[00-Index/Marimari-Sistemas]] — el funnel completo (TRÁFICO → Linktree → email → venta → repeat → fan) y las 5 palancas. Ya usa códigos del 15% en el email 3 y en el día-14 post-piercing. Esta nota le da el calendario que dispara esos códigos.
- [[contenido/ig/2026-W17]] — semana de contenido con captions + prompts visuales Canva + paleta activa. Es la **plantilla base**; el calendario la generaliza a un sistema anual en vez de semanas sueltas.
- [[estrategia/instagram-contenido-listo]] — banco de captions por pieza/stock. Reutilizable como copy-base por ventana.
- [[WENU_MAPU_CONTEXT]] — colecciones reales (Atacama, Wenumapu Origin, Celestial Cycle), tiers de precio, voz de marca, materiales, formato SKU `WM-[CAT]-[NUM]`.
- [[estrategia/brand-kit]], [[brand/MARCA-maestro]], [[brand/color-palette]], [[brand/typography]] — sistema visual.
- [[30-Auditorias/2026-04-27-pivote-100-digital]] — pilares de contenido (pieza-objeto, proceso, cosmos, cliente) y operación 100% digital desde Truckee.

Lo nuevo que aporta esta nota: el calendario cósmico como única fuente, el sistema de temas del sitio atado a las estaciones, los códigos rituales atados a fechas reales, y la lógica de repricing por drop.

---

## 2. Cronología real del catálogo (lo que se puede rotar de verdad)

Fuente: auditorías Woo y `master-db.json` documentado en [[WENU_MAPU_CONTEXT]]. No tengo acceso directo a NocoDB en esta sesión, así que la cronología exacta (timestamps de creación viejo→nuevo) queda como hueco para confirmar (ver §7). Lo que sí se sabe:

- [Seguro] `master-db.json` tiene 223 productos clasificados, SKUs de `WM-PLG-001` a `WM-SEP-002`. En Woo hay 51 productos publicados, ~512 duplicados probables, 50 sin imagen ([[30-Auditorias/woo/audit-2026-04-27]]).
- [Probable] Proxy de antigüedad por ID de post WordPress: los `post` 1790–1829 (plugs y labrets de piedra/acero) son los **más recientes**; el `post` 593 (Ear Gauges, madera de nogal certificada) es de los **más antiguos**. Sin acceso a NocoDB, el orden por ID es el mejor proxy de "viejo→nuevo".
- [Seguro] Piezas genuinamente limitadas/irrepetibles (insumo honesto de "New & Limited"):
  - Amuleto Celestial — 1 unidad (One of a Kind real).
  - Pieza de Autor, Plata 925 + Meteorito — 2 unidades.
  - Anillos y piezas de Meteorito (Atacama / Vacamuerta) — tier Premium, series cortas por procedencia del material.
- [Suposición] El resto (plugs, labrets, aros de acero 316L) es reponible: sirve de "Acceso/Core" estable, no de escasez. La escasez real vive en Meteorito + piezas de autor + colección Celestial Cycle.

Regla de honestidad: **solo se rotan como "limitado" las piezas que de verdad lo son.** Un plug de acero reponible nunca lleva narrativa de "última unidad".

> Nota de marca: la voz prohíbe la palabra inglesa "unique" ([[WENU_MAPU_CONTEXT]]). En inglés usar "one of a kind" / "single edition"; en español "pieza única / irrepetible".

---

## 3. El Calendario Cósmico 2026–2027 (la única fuente)

Principio: **una sola rueda alimenta el sitio y el Instagram.** Dos ritmos encajados:

- **Ritmo solar (macro, 4 estaciones):** marca los DROPS y el tema visual del sitio. Son las ocasiones de repricing.
- **Ritmo lunar (micro, ~cada 2 semanas):** marca el contenido y, en pocas fechas, las ofrendas. Luna nueva = se siembra/anuncia; luna llena = plenitud/se revela.

### 3.1 Las cuatro estaciones (anclas solares verificadas)

Fechas astronómicas 2026 confirmadas (UTC; en Truckee/PT restar ~7–8 h, puede correr el día — confirmar local por ventana):

| Estación mapuche | Evento solar 2026 (UTC) | Colección destacada | Tema del sitio | Código ritual |
|---|---|---|---|---|
| Pukem (invierno) / **We Tripantu** | Solsticio 21 jun, 02:22 · We Tripantu 24 jun | Celestial Cycle (meteorito, cosmos) | **Nocturno** | `wetripantu` |
| Pewü (brotación / primavera) | Equinoccio 22 sep, 22:05 | Wenumapu Origin (raíz, tierra) | **Atardecer** | `pewun` |
| Walüg (verano / luz plena) | Solsticio 21 dic, 20:50 | Atacama (desierto, oro, sol) | **Solar** | `walung` |
| Rimü (otoño / cosecha) | Equinoccio 20 mar 2026 / 2027 | Wenumapu Origin (cosecha, archivo) | **Atardecer** | `rimu` |

[Probable] Significados mapudungun (Pukem, Pewü, Walüg, Rimü, We Tripantu): mi confianza es media; la grafía y el matiz deben validarse con Ocin como portador de la cultura (ver §7). No quiero poner palabras inexactas en la boca de la marca.

We Tripantu (24 jun, año nuevo mapuche, ligado al solsticio sur de invierno) es el **origen de la rueda**, no una fecha más. Es el "umbral" del que parte todo el año.

### 3.2 El ritmo lunar — próximas ventanas (segundo semestre 2026)

Fechas lunares 2026. Llenas [Seguro] (verificadas). Nuevas [Probable] (referencia horaria puede correr ±1 día a PT — confirmar local):

| Ventana | Fecha | Tipo | Rol en el sistema |
|---|---|---|---|
| Luna llena de fresa | 29 jun 2026 | Llena | Primera ofrenda de plenitud tras We Tripantu. Revela el destacado Celestial Cycle. |
| Luna nueva | 14 jul 2026 | Nueva | Se siembra: anuncio del próximo destacado. Solo contenido. |
| Luna llena | 29 jul 2026 | Llena | Plenitud: storytelling de pieza limitada (sin código; precio firme). |
| Luna nueva | 12 ago 2026 | Nueva | Siembra. |
| Luna llena | 28 ago 2026 | Llena | Plenitud. Posible ofrenda email-only (lista MailerLite). |
| Luna nueva | 10 sep 2026 | Nueva | Antesala del equinoccio. |
| **Equinoccio Pewü** | 22 sep 2026 | Estación | **DROP + código `pewun` (48–72 h).** Tema Atardecer. Colección Wenumapu Origin. |
| Luna llena de cosecha | 26 sep 2026 | Llena | Cierre del drop de primavera. |
| Luna nueva | 10 oct 2026 | Nueva | Siembra. |
| Luna llena | 26 oct 2026 | Llena | Plenitud. |
| Luna nueva | 9 nov 2026 | Nueva | Antesala del verano. |
| Luna llena | 24 nov 2026 | Llena | Plenitud. |
| Luna nueva | 8 dic 2026 | Nueva | Antesala del solsticio. |
| **Solsticio Walüg** | 21 dic 2026 | Estación | **DROP + código `walung` (48–72 h).** Tema Solar. Colección Atacama. |
| Luna llena fría | 24 dic 2026 | Llena | Cierre del año solar. |

Disciplina de escasez: **máximo 4–5 ventanas con código al año** (las 4 estaciones + We Tripantu). Las lunas llenas son ritmo de contenido y, como mucho, una ofrenda email-only puntual. Más códigos que eso entrena a esperar rebajas y mata el precio.

### 3.3 La narrativa: ofrenda, no descuento

En fecha sagrada **se regala**, no se "descuenta". La diferencia no es semántica, es de precio percibido:

- Un descuento dice "esto valía menos". Una ofrenda dice "esto vale, y en esta fecha el cosmos abre una puerta".
- La ofrenda tiene **ventana de tiempo real** (48–72 h atadas a la fecha astronómica) y **stock real limitado**. Cuando cierra, cierra. No se extiende "por demanda" — eso sería teatro de FOMO falso, justo lo que la marca prohíbe.
- Por eso la ofrenda **sube el precio base** en vez de bajarlo: el precio de lista sube cada ciclo, y la ofrenda es un gesto acotado dentro de ese precio más alto, no una rebaja del precio viejo.

---

## 4. Sistema de temas del sitio atado al calendario

El sitio nuevo en Astro ya tiene tres temas (Nocturno / Solar / Atardecer). En vez de elegirlos a mano, **el calendario los rota**:

- **Nocturno** → Pukem / We Tripantu / lunas nuevas. Negro cósmico, oro, meteorito. Colección Celestial Cycle.
- **Atardecer** → equinoccios (Pewü y Rimü), transiciones. Tonos tierra, bronce, arena. Colección Wenumapu Origin.
- **Solar** → Walüg / verano / luz plena. Oro, off-white, calor. Colección Atacama.

Implementación sugerida (no tocar ahora, solo dejar la regla): el tema activo se decide por fecha contra la tabla §3.1. Un único campo "ventana activa" (estación + colección destacada + tema + código) gobierna a la vez el hero del sitio y el plan de Instagram. Esa es la "única fuente": cambiar la ventana cambia todo aguas abajo.

---

## 5. Modelo de precios y repricing (cuánto subir para ser rentable)

Esto es un **modelo para que Ocin decida el margen**, no un mandato de "cobra exactamente $X". Ocin definió su **valor-hora: $50–80/h (real, 2026-06-25)** — eso ya no es hueco. El dato que sigue faltando es el **costo real de material** (NocoDB no tiene `unit_cost` cargado), así que los costos de abajo siguen siendo `~est.` y los precios resultantes son rango, no cifra final.

### 5.1 Mecánica de repricing por drop (la ocasión)

1. **La pieza nueva entra más cara.** Cada drop estacional introduce el destacado en el tope de su tier o medio escalón arriba. Tiers documentados ([[WENU_MAPU_CONTEXT]]): Acceso $25–45 · Core $45–85 · Premium $85–150 · Ritual Limitado $150+.
2. **La pieza vieja pasa a "Archivo", no a "oferta".** Precio sostenido o subido por escasez, jamás descontado. Archivo = pasado con valor, no liquidación.
3. **Valorizar lo que justifica el precio:** horas de oficio, procedencia del material (Meteorito Atacama / Vacamuerta, Plata 925), serie corta real. El copy del precio nuevo lo nombra.
4. **La ofrenda no abarata.** (a) Valor agregado sin tocar precio (empaque ritual, envío, tarjeta numerada) — recomendado. (b) Si se usa porcentaje, ≤15% acotado, dejando el neto **por encima** del precio base del ciclo anterior.

### 5.2 Qué es real y qué es estimado

Regla de Ocin respetada: `$X (real)` = con respaldo; `~$X (est.)` = estimado.

| Dato | Valor | Fuente / estado |
|---|---|---|
| Precio actual Plug piedra | $25 (real) | [[20-Operaciones/MANIFIESTO-PRODUCTOS-2026-04-29]] |
| Precio actual Labret acero | $18 (real) | MANIFIESTO |
| Precio actual Hanger acero quirúrgico | $15 (real) | MANIFIESTO |
| Precio actual Ear Gauges nogal | $25 (real) | MANIFIESTO |
| Precio actual Labret Neometal (curado, branded) | $45 (real) | [[20-Operaciones/daily/2026-04-30-product-facts]] |
| Precio actual HEX hanger 316L (curado industrial) | $88 (real) | product-facts |
| Tiers de precio | Acceso/Core/Premium/Ritual | [[WENU_MAPU_CONTEXT]] (documentado) |
| Costo de material por pieza | — | **NO existe en el vault.** NocoDB no accesible esta sesión; el esquema de captura tiene campo `unit_cost` pero está sin poblar (sin facturas cargadas). Todo costo abajo es **~est.** |
| Horas de mano de obra por pieza | — | **No registrado.** Estimado abajo. |
| Valor-hora objetivo | $50–80/h (real) | Definido por Ocin 2026-06-25. |
| Precios de competidores | — | Ausente. Hay referentes de **nombres** (Diablo Organics, Buddha Jewelry, Maya, BVLA en [[20-Operaciones/daily/2026-04-30-market-intelligence]]) pero **no precios capturados**. No existe nota `Estudio de mercado` en el vault. |

### 5.3 La fórmula transparente

```
precio = (costo_material + mano_de_obra) × markup
mano_de_obra = horas_estimadas × valor_hora
```

Dos lógicas, porque mezclarlas miente:

- **Lógica A — pieza artesanal propia** (autor, meteorito, plata, orgánico hecho a mano): aplica la fórmula completa con horas de oficio.
- **Lógica B — pieza curada / industrial / branded** (plugs y labrets de acero, Neometal, HEX): no hay horas de taller; el precio = `costo_de_compra × markup_retail`. Cobrarles "horas de oficio" sería inventar.

Markup de referencia (joyería de artista, hecho a mano), de fuentes de mercado:

- Keystone (piso): producción ×2 a wholesale, ×2 de nuevo a retail.
- **Venta directa (DTC, que es el caso de Wenu Mapu):** retail = (material + mano de obra) **×2.5 a ×3**.
- Piezas de autor / limitadas: **×2.5 a ×4**.
- Marketplaces con comisión (Etsy): empujar a ×3–4 para no comer margen en fees.
- Valor-hora mínimo sugerido por la industria: $15–20/h; más para metalistería especializada.

(Fuentes en §Fuentes.)

### 5.4 El modelo al valor-hora de Ocin ($50/h y $80/h, markup DTC ×2.5)

Valor-hora = real (Ocin, $50–80/h). Costo de material y horas siguen **~est.** hasta que NocoDB cargue `unit_cost`. Markup fijado en ×2.5 (piso DTC); ×3 sube ~20% más.

| Tier (lógica A, artesanal) | Costo mat. ~est. | Horas ~est. | Precio @ $50/h | Precio @ $80/h | Precio actual | Aumento @ $50/h | Aumento @ $80/h |
|---|---|---|---|---|---|---|---|
| Core (orgánico hecho a mano) | ~$10 (est.) | ~1.0 | ~$150 | ~$225 | ~$45 (tier) | ~+233% | ~+400% |
| Premium (anillo meteorito/plata) | ~$25 (est.) | ~2.0 | ~$312 | ~$462 | ~$120 (est. mid-tier) | ~+160% | ~+285% |
| Ritual limitado (autor 1-de-1) | ~$35 (est.) | ~5.0 | ~$712 | ~$1,088 | $150+ (tier) | ~+375% | ~+625% |

Lógica B (curado/industrial), **no usa valor-hora** (no hay horas de taller): el precio = costo de compra × markup retail. No cambia con la decisión de Ocin.

| Tier (lógica B) | Costo compra ~est. | Markup | Precio sugerido | Precio actual | Aumento |
|---|---|---|---|---|---|
| Acceso (plug/labret/hanger acero) | ~$4–8 (est.) | ×2.5–3 | $25–30 (piso de tier) | $15–25 (real) | Hanger $15→$25 (+67%) · Labret $18→$25 (+39%) |

### 5.5 Lectura atada a sus números

- [Probable] **El cuello de rentabilidad NO está en los productos baratos, está en los caros.** Los items de Acceso (acero curado) no se mueven con el valor-hora y ya están casi en rango; subir hanger y labret al piso de $25 es corrección menor. Con el valor-hora de Ocin, las piezas artesanales saltan fuerte: aun a $50/h el modelo pone Premium en ~$312 (vs ~$120 actuales) y Ritual sobre $700. Esto confirma que **hoy se está regalando el oficio en las piezas que definen la marca.**
- [Suposición] El salto es grande (Core +233% a +400%) porque el valor-hora elegido es de autor, no de marketplace. Es coherente con el posicionamiento "dark luxury" ([[WENU_MAPU_CONTEXT]]), pero **subir de $45 a $150–225 de golpe necesita relato, foto y escasez a la altura** — por eso el repricing va atado al calendario (§3), no en un solo salto desnudo. Riesgo real: a $80/h algunos tiers se despegan del mercado de nicho (BVLA/Maya juegan ahí, pero con marca consolidada); validar contra precios reales de competidores antes de fijar el extremo alto.
- **Recomendación (criterio, no número):** usar **$50/h como piso operativo** (ya rentable y defendible) y reservar **$80/h para piezas de autor/meteorito** donde el relato sostiene el precio. ×2.5 en sitio propio, ×3 en Etsy (fees). Archivo siempre sostenido. El calendario da la ocasión; este modelo da la magnitud; el costo real cerrará el número.

### 5.6 Caso concreto recalculado (anillo meteorito Premium)

Hoy ~$120 (est.). Material ~$25 est., 2 h est., ×2.5:

- A **$50/h**: (25 + 100) × 2.5 = **~$312**.
- A **$80/h**: (25 + 160) × 2.5 = **~$462**.

Entrada del drop `walung` sugerida: arrancar el repricing hacia **$280–320** (alineado con $50/h) y escalar a $80/h en la siguiente serie si el mercado responde; el del ciclo previo a Archivo sostenido sobre $150. Ofrenda = envío ritual + tarjeta numerada (valor agregado), no porcentaje. Cifras **~est.** hasta cerrar §5.7.

### 5.7 Lo que falta para precios definitivos

1. ~~Valor-hora objetivo~~ — **resuelto: $50–80/h (Ocin, 2026-06-25).**
2. **Costo real de material** por pieza/tier (cargar facturas a NocoDB → `unit_cost`). Es el único input que sigue estimado; mueve la base sobre la que se multiplica.
3. **Precio actual real de las piezas Premium/autor** (meteorito, autor): el manifest solo tiene los curados baratos; los $120 de Premium son estimación mía, no dato — confirma para medir el % de aumento real.
4. **Validación de mercado del extremo alto:** capturar 3–5 precios reales de competidores (BVLA, Maya, Buddha Jewelry) antes de fijar el tier a $80/h.

[Suposición] Si no hay pieza nueva por ciclo, el repricing se hace por re-narración + escasez real (misma pieza, mejor relato, stock que baja) → el precio sube por agotamiento, no por drop. Más lento, igual de honesto.

### 5.8 Catálogo actual mapeado a tiers

Fuente: [[20-Operaciones/MANIFIESTO-PRODUCTOS-2026-04-29]] (precios reales) + [[20-Operaciones/daily/2026-04-30-product-facts]] (correcciones de Ocin). **No pude consultar** el API vivo `api.wenumapuonline.com` (fetch bloqueado), ni `collection-membership.json` del repo `wenu-frontend`, ni NocoDB — fuera del vault. Las variantes son tallas (8–28 mm), agrupadas por familia. Precio sugerido @ $50/h, markup ×2.5; costos `~est.`

| Familia (variantes) | Precio actual | Material / tipo | Origen | Tier | Sugerido @ $50/h | % aum. |
|---|---|---|---|---|---|---|
| Plug – Stone (×28 tallas) | $25 (real) | piedra / plug | `unverified` | Acceso (si hand-worked → Premium) | $35–40 (lóg. B) | +40–60% |
| Labret – Steel (×13) | $18 (real) | acero / labret | curado | Acceso | $25–30 | +39–67% |
| Hanger – Surgical Steel (×7) | $15 (real) | acero quirúrgico / hanger | curado/industrial | Acceso | $25–30 | +67–100% |
| Ear Gauges – Walnut (id 593) | $25 (real) | madera nogal / gauge | handmade prob. | Core | $80–120 | +220–380% |
| HEX Hanger 316L (WM-HAN-032) | $88 (real) | acero 316L + resina / hanger | industrial/serie | Acceso-statement (curado) | ~$88 (ya sano) | ~0% |
| Labret Neometal (WM-LAB-893) | $45 (real) | acero branded + gema / labret | branded resale | Acceso-branded | ~$45 (ya sano) | ~0% |
| Anillo de piedra (WM-RNG-001) | ~$25 (est., agrupado como plug) | piedra / ring | `unverified` | Core/Premium (si piedra trabajada) | $120–150 | +380–500% |
| Aros Celestial | s/d | acero 316L / earrings | curado | Acceso/Core | s/d | s/d |
| Amuleto Celestial (1-de-1) | s/d | "premium" / amuleto | autor | Ritual | s/d (~$700+) | s/d |
| Pieza de Autor (Plata 925 + Meteorito, 2u) | s/d | plata + meteorito / autor | autor | Ritual/Premium | s/d (~$300–500) | s/d |

Regla handmade-vs-sourced aplicada: lo `curado/branded/industrial` (Plug Stone con origen sin verificar, Labret, Hanger, HEX, Neometal) **no** entra en tiers de autor aunque el material sea noble; necesita confirmar `origin_verified` para subir de tier. El `origen unverified` del plug de piedra es el dato que decide si vale $35 (sourced) o $150 (piedra trabajada).

### 5.8.1 Las 5 piezas donde más plata se está dejando

1. **Pieza de Autor (Plata 925 + Meteorito), 2u** — el buque insignia **no tiene precio publicado**. Es Ritual ($300–700) vendiéndose como nada o como Premium bajo. La mayor fuga es no tener tier de autor priceado.
2. **Anillo de piedra (WM-RNG-001), ~$25** — un anillo cobrando como plug de $25. Como Core/Premium debería ir $120–150. ~+400%.
3. **Ear Gauges Walnut, $25** — madera trabajada a mano vendida a precio commodity. Core $80–120. ~+220–380%.
4. **Plug de piedra (×28), $25** — si se confirma piedra trabajada, es Premium, no Acceso; y aun como Acceso, la piedra vale más que el acero. Es la mayor fuga por **volumen** (28 variantes).
5. **Hanger acero quirúrgico, $15** — por debajo del piso de su propio tier ($25). Corrección inmediata +67%, sin depender de costos.

### 5.8.2 Lo que no pude clasificar (falta dato)

- **Aros Celestial, Amuleto Celestial, Pieza de Autor**: aparecen en contenido pero **sin precio ni material verificado** en el manifest (inventario muestra Autor/Amuleto/Meteorito = 0 fotos clasificadas).
- **Tunnel, Septum, Stretching, Collar, Orgánico**: categorías existentes en inventario pero **sin precio/material en el manifest**.
- **Colecciones Atacama / Wenumapu Origin / Celestial Cycle**: nombradas en [[WENU_MAPU_CONTEXT]] pero su membresía por SKU vive en `collection-membership.json` (no accesible). Sin eso no puedo atar cada pieza a su colección/tema del §3.

### 5.9 Envío y packaging (proteger margen) — dos zonas

Corrección clave (Ocin, envío real a Chile ~$65): **el supuesto de "envío barato" SOLO vale doméstico (US).** Internacional es otro mundo y se trata aparte. Un solo envío gratis a Chile borra el margen de varias piezas.

#### Zona A — Doméstico (US)

[Probable] Joyería chica y liviana (<4 oz) → envío doméstico real bajo: **~$4–8** (USPS Ground Advantage / first-class). Referencia previa del vault: USPS Priority ~$9 flat o gratis sobre $120 ([[30-Auditorias/2026-04-27-pivote-100-digital]]).

- **Acceso** (anzuelo, margen fino): **flat-rate al cliente ~$5**. No absorber.
- **Core / Premium / Ritual**: **envío gratis sobre umbral $75** (cae justo bajo la entrada nueva de Core, así Acceso nunca califica y Core+ siempre sí). **Este "gratis" es solo doméstico.**
- **Buffer bakeado en el costo antes del markup**: el buffer entra en la base ×2.5, así el precio sube ~2.5× el buffer mientras el envío real cuesta 1×.

| Tier | Buffer envío+packaging en costo | Precio sube (×2.5) | Envío real US | Margen |
|---|---|---|---|---|
| Acceso | $0 (cliente paga $5 flat) | — | cliente paga | intacto |
| Core | +$6 | +$15 | ~$5 | +$10 neto |
| Premium | +$8 | +$20 | ~$6 | +$14 neto |
| Ritual | +$13 ($8 envío + $5 empaque ritual) | +$32 | ~$8 | +$24 neto |

#### Zona B — Internacional (Chile y resto del mundo)

[Seguro] El envío internacional **lo paga siempre el cliente, a costo real**. **Nunca absorber, nunca ofrecer gratis** — ni con umbral. El "gratis sobre $75" de la Zona A **no aplica** fuera de US.

- [Probable] El ~$65 que pagó Ocin es tarifa **courier** (DHL/FedEx): rápido pero caro, espanta al comprador.
- [Probable] Para joyería <4 oz hay opción **mucho más barata**: **USPS First-Class Package International, trackeada (~$15–30)** — más lenta, pero viable. Confirmar tarifa real por país/peso.
- **Recomendación de checkout:** ofrecer **dos opciones internacionales** — económica (USPS FCPI ~$15–30, trackeada, lenta) y exprés (courier ~$65, rápida) — y que el cliente elija. Así no se pierde al comprador internacional por un solo precio caro, y el margen queda intacto porque Wenu Mapu no subsidia nada.
- Técnico: WooCommerce ya maneja zonas de envío y múltiples métodos por zona; no requiere reconstruir checkout.

**Regla resultante (dos zonas):** US → Acceso $5 flat, Core+ gratis sobre $75, buffer $6/$8/$13 bakeado. Internacional → cliente paga 100% del costo real, nunca gratis, con dos opciones en checkout (USPS intl económica ~$15–30 + courier ~$65).

---

## 6. Plan de contenido Instagram / funnel (una fuente → sitio + IG)

La rueda del §3 es la única fuente. Cada ventana genera, sin inventar nada nuevo, el plan de Instagram. Canales y activos reales ya existentes ([[00-Index/Marimari-Sistemas]]): @wenu__mapu (~1.732 seguidores), Linktree `linktr.ee/Wenumapu`, email `marimari@wenumapuonline.com` (MailerLite), WhatsApp Business, Etsy `Wenumapu8`.

### 6.1 Guion por ventana (encaja con los pilares del pivote)

| Momento de la ventana | Pieza de contenido | Formato | Pilar |
|---|---|---|---|
| Luna nueva (siembra) | "Se abre un ciclo": anuncio del próximo destacado, sin precio ni código | Post + story | cosmos/narrativa |
| Días previos | Proceso/taller del destacado (cómo se hace, material, procedencia) | Reel + stories | proceso |
| Fecha sagrada (apertura ofrenda) | "La ofrenda está abierta": revela código + ventana real (48–72 h) | Post + story con sticker | pieza-objeto |
| Durante la ventana | Cuenta regresiva **real** (termina cuando termina) + pieza en cuerpo | Stories | cliente / pieza |
| Cierre | "El ciclo se cierra": agradecer, mostrar lo que queda en Archivo | Story | cosmos/narrativa |

Cadencia base reutilizable: 3 posts + 5 stories + 1 Reel por semana (ya fijada en [[30-Auditorias/2026-04-27-pivote-100-digital]]). El calendario solo decide **qué** entra en cada espacio.

### 6.2 Plantillas (reutilizar lo que ya hay)

- Captions y prompts visuales Canva: partir de [[contenido/ig/2026-W17]] (paleta, tipografía, mood "objeto encontrado") y del banco [[estrategia/instagram-contenido-listo]]. Solo cambia la pieza/estación/código.
- Paleta y tipografía por tema: [[brand/color-palette]] + [[brand/typography]]. El tema activo (Nocturno/Solar/Atardecer) decide los acentos del frame.
- Voz: dark, precisa, cósmica, viva. Palabras OK/NUNCA en [[WENU_MAPU_CONTEXT]].

### 6.3 Cómo aparece el código (sutil, no invasivo)

- **En Instagram:** última línea del caption del post de apertura ("ofrenda `pewun`, hasta el 24 de septiembre") y un sticker discreto en story. Nada de spam de código en cada post.
- **En el sitio:** un banner quieto en el hero de la colección destacada (no popup, no modal agresivo), y opcionalmente una pista en el carrito. La regla del pivote y de la marca: nada de FOMO de pantalla completa.
- **Técnico:** WooCommerce ya soporta cupones nativos — los códigos `wetripantu`, `pewun`, `walung`, `rimu` se crean como cupones con **fecha de expiración real** que coincide con el cierre de la ventana. **No requiere reconstruir el checkout.** Configurar: monto/porcentaje (preferir valor agregado, ver §5), límite de uso, y fecha fin = cierre de ofrenda.
- **Email:** la ofrenda de luna llena email-only va por MailerLite a la lista, encajando con el email 3 / día-14 que ya usa códigos en [[00-Index/Marimari-Sistemas]].

---

## 7. Huecos que necesitan input de Ocin

1. **Stock y fechas reales por pieza destacada.** ¿Cuántas unidades reales hay de Celestial Cycle / Meteorito / Pieza de Autor por ventana, y hay foto-hero lista? Sin esto la escasez no se puede declarar honesta. Es el hueco bloqueante.
2. **Precios objetivo por tier para el repricing.** ¿A qué precio entra el destacado nuevo de cada estación y a cuánto se sostiene el de Archivo? Los números del §5 son placeholders.
3. **Validación del mapudungun.** Grafía y significado de We Tripantu, Pukem, Pewü, Walüg, Rimü y de los códigos. Ocin es el portador de la cultura; no quiero publicar términos aproximados.
4. (Menor) **Acceso a NocoDB** para la cronología exacta de creación (viejo→nuevo), hoy resuelta por proxy de ID de post.

---

## 8. Próximo paso concreto

La primera ventana viva es la **luna llena de fresa del 29 jun 2026** (cierre de We Tripantu). Acción mínima honesta: elegir 1 pieza Celestial Cycle con foto-hero y stock real, crear el cupón `wetripantu` en Woo con fecha fin 30 jun, y correr el guion §6.1 una vez. Si no hay foto-hero lista, la primera ventana real es el **equinoccio Pewü, 22 sep 2026** — y el trabajo previo es fotografía, no calendario.

---

## Fuentes astronómicas

- Solsticios y equinoccios 2026 (UTC): [universaltimedate](https://www.universaltimedate.com/articles/equinoxes-and-solstices-2026), [USNO](https://aa.usno.navy.mil/calculated/seasons?year=2026).
- Fases lunares 2026: [timeanddate](https://www.timeanddate.com/moon/phases/timezone/utc), [astro-seek](https://mooncalendar.astro-seek.com/full-moons-new-moons-2026).
- Convenciones de markup en joyería hecha a mano (keystone, DTC ×2.5–3, autor ×2.5–4, valor-hora $15–20+): [Craftybase](https://craftybase.com/jewelry-pricing-calculator), [CraftsTrack](https://craftstrack.app/blog/how-to-price-handmade-jewelry), [Branvas](https://branvas.com/blogs/news/how-to-price-jewelry-for-profit).

<!-- wenu-backlinks -->
## Contexto

- [[Home]] · [[00-Index/Contexto-MOC]] · [[00-Index/Marimari-Sistemas]] · [[contenido/ig/2026-W17]] · [[WENU_MAPU_CONTEXT]]
