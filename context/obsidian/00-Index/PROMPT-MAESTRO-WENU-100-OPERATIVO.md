# PROMPT MAESTRO — Wenu Mapu 100% operativo (correr antes del 7 jul 2026)

> Pegar este prompt al modelo agéntico (Claude Code, con el equipo `WenuOS-Equipo-Agentico`). Objetivo: resolver los problemas más difíciles que quedaron abiertos y dejar el proyecto operativo al 100% — catálogo, fotos, UX, detalles por producto, iconografía y confiabilidad. Ejecutar por fases, serializado, verificando EN VIVO en wenumapuonline.com.

## REGLAS DURAS (el cerebro manda esto a todos — innegociables)
1. **Fuente de verdad única:** productos = NocoDB (master) → sync determinista unidireccional a WooCommerce → el sitio (Astro SSG) lee en build. Transaccional = Postgres (:3335). Assets = LaCie. Cerebro = Obsidian. Notificaciones = Hermes.
2. **NUNCA borrar** — despublicar/archivar/mergear, con backup y revert.
3. **No secretos en chat/frontend.** Credenciales solo en `.env`/cuentas de Ocin.
4. **Producción NO depende de IA** — sitio, checkout, DB, crons corren solos. La IA arma/mejora, no es runtime.
5. **Ética Hidden Sky:** separar cultura mapuche/inca documentada / folclore / ficción WM; nunca mezclar; sin claims de salud/pseudociencia.
6. **Deploy SERIALIZADO:** un solo build por vez; `pkill -f "astro build"` + matar wrangler/deploy colgados (>10 min) antes; sin `ALLOW_EMPTY_PRODUCTS` en prod.
7. **Verificar EN VIVO en wenumapuonline.com** (no en git, no en pages.dev alias, no en caché). git miente sobre "live".
8. **Provenance honesto** (nunca "handmade" sobre importado); costo real vs estimado; peso siempre.

## FASE 0 — CEREBRO PRIMERO + GESTIÓN DE TODA LA DATA DE MARCA
Antes de revisar foto por foto / file por file: **consultar EL CEREBRO** (Obsidian `brand/`, `estrategia/`, `productos/`, `30-Auditorias/`, MEMORY, + NocoDB) para ver qué ya se sabe de cada producto/asset. Solo después, ingestar lo que falte. Objetivo: **usar TODO el material que ya existe y se hizo, nada desperdiciado**, de forma correcta y profesional — para darle aún más sentido al proyecto.
1. **Brain-first:** por cada producto/asset, primero buscar en el cerebro (¿ya está clasificado? ¿hay ficha, contexto, descripción, foto asociada?). Evitar el brute-force ciego.
2. **Ingestar lo NO CLASIFICADO + múltiples formatos** de la carpeta WENU MAPU del disco (`/Volumes/Wenu mapu/` — incluyendo `_INVENTARIO_FOTOS/`, `_PROCESADOS/`, `_RAW_SOURCE/`, `_SIN_CLASIFICAR/`; jpg/png/webp/heic/raw): clasificar por SKU y completar la galería de CADA producto con todas sus tomas reales.
3. **Aprovechar la carpeta "WENU MAPU maestro" en Descargas** (`~/Downloads/`) — elementos visuales, gráficas, banners, mockups, iconografía que HOY no se están usando: catalogar y colocar donde corresponda (banners de categoría, journal, IG, marca).
4. **Si el cerebro NO tiene la info:** organizarla mejor — crear/actualizar un ÍNDICE/CATÁLOGO DE ASSETS DE MARCA (qué hay, dónde, para qué producto/uso, formato, estado) como fuente de verdad de assets, para gestionar mejor toda la data de la marca. Persistir en Obsidian + LaCie + NocoDB (regla de 3 lugares).

## FASE 1 — EL PROBLEMA MÁS DIFÍCIL: fotos ↔ base de datos (pipeline de fotos)
El dolor recurrente: las fotos clasificadas de Ocin (attachments de NocoDB + carpetas LaCie `_INVENTARIO_FOTOS/`) NO están bien conectadas a cada producto en el sitio; hay portadas equivocadas (la de la "regla"/macro), fotos cruzadas entre productos, y duplicadas.
1. **Fix de raíz ya aplicado (verificar que sigue):** `woo.ts` ya NO fuerza portada por filename "macro"/regla (removido de PREFER, agregado a AVOID; respeta el orden de WooCommerce). Confirmar en vivo.
2. **Sync de fotos NocoDB→WooCommerce determinista:** construir/consolidar un pipeline que, por cada SKU, tome las fotos LIMPIAS clasificadas en NocoDB (y LaCie), las cargue a la galería de WC en el ORDEN correcto (portada = la más clara, nunca regla/screenshot), sin duplicar ni cruzar. Idempotente, con log, reversible. NocoDB es el master.
3. **Barrido de integridad:** por cada producto, comparar sus fotos actuales vs las clasificadas; corregir portadas-regla, mover fotos cruzadas a su producto real, quitar duplicadas. Usar el cron `wenuos-catalog-integrity` (ya corre diario) como verificador continuo.
4. **Fotos faltantes:** listar los productos SIN foto real usable (hoy: 2376 túnel bronce, 2055 septum gold, 2490 opal, 1826 labradorite, 2396 obsidiana) → Ocin las saca; el sistema las ingesta al llegar.

## FASE 2 — INTEGRIDAD DE CATÁLOGO
1. **Dedup (merge, con keep-draft para que NO revivan):** aplicar `_wenu_keep_draft=1` a todo duplicado archivado (ya hecho a 8; extender). Meteoritos Atacama: cada diseño (banda fina / banda con puntos) = **una sola ficha, one-of-a-kind, stock 1, disponible** (Ocin confirmó: "tenemos uno solamente"). Serpiente: fusionar Titanium Snake = Snake top. Ring 2086, Purple Marbled, etc.: resolver según la cola.
2. **Variantes de color:** productos que son el mismo con distinto color/piedra/madera → UN producto VARIABLE con swatches (contrato `20-Operaciones/contrato-variantes-wc.md`): 3-pares túneles madera, set 3 piedras, set 6 colores.
3. **Sync WordPress:** verificar en vivo que los drafts protegidos NO se re-publican (correr publish-drafts en dry-run, confirmar 🔒). Si vuelven, revisar plugin/scheduled-action en wp-admin (necesita acceso de Ocin).
4. Resolver las 3 SKUs duplicadas de NocoDB (WM-OTH-003, WM-PLG-038, WM-RNG-011).

## FASE 3 — CONFIABILIDAD DE DEPLOY (causa raíz de "no salía a vivo")
1. Crear el rol `wenu-frontend-eng` con deploy SERIALIZADO (único dueño del frontend a la vez) — elimina las colisiones de build.
2. Consolidar las 8 reglas duras en el CLAUDE.md raíz.
3. El `completion-guard` de Hermes ya avisa lo que no llega a verified-live + detecta builds colgados — mantener.

## FASE 4 — INTERFAZ Y EXPERIENCIA (UX)
1. **Estudio Wültufe pro:** oreja-lienzo con herramientas alrededor (estados, joyas, undo/redo/delete, connect-cadena, guardar/cotizar), panel de capas, controles precisos por pieza (material/gema/escala/rotación), zoom/pan, exportar propuesta. Dos modos: guided ritual simple (default) + estudio pro (toggle). Joya proporcional (16g de referencia), sin discos negros, daith fino. Interacción directa (marcar sin popup; segundo toque = detalle).
2. **Tema claro/Solar 100% legible** en todas las páginas (sin blobs negros, contraste AA).
3. **Efectos livianos** (seguir `estrategia/efectos-livianos-mobile-wenu.md`): portal (estados de materia + glitch de acceso), frecuencia reactiva, Meli Witran, OVNI — todos con device-tiering, sin crashear, reduced-motion.
4. Mobile-first en todo; sin overflow ni cosas cortadas.

## FASE 5 — DETALLE POR PRODUCTO
Cada ficha: foto correcta + galería, material honesto, provenance correcto, peso, gauge/size con REFERENCIA VISUAL de espesor real (no blob), descripción, sizing. Gating pre-esterilizado donde aplique.

## FASE 6 — ELEMENTOS VISUALES / ICONOGRAFÍA
Sello/emblema refinado (molinete 4 garras + estrella-brújula, en LaCie `Wenu-Sigil-2026/`) colocado en los marks decorativos; brújula/nivel viva opt-in; iconografía consistente del universo Wenu en toda la UI.

## FASE 7 — DESCUBRIMIENTO (la palanca real, post-100%)
Calendario de contenido anual + capturador de emails (ya vivo) → conectar MailerLite; SEO on-page; serie "Cosmic Signals". El cuello no es el catálogo perfecto, es que la gente lo encuentre.

## CRITERIO DE ÉXITO (verificar EN VIVO, no de palabra)
- 0 portadas-regla, 0 fotos cruzadas, 0 duplicados que revivan.
- Cada producto con su foto correcta + detalle completo.
- Estudio pro usable y lindo en mobile, sin crashes.
- Tema claro legible en todo el sitio.
- Camino de compra funcionando (ya: carrito → Venmo/Zelle/PayPal/MP/Reservar → pedido al Gmail).
- El reloj de crons corriendo y Hermes avisando.

## NECESITA DE OCIN (finito)
5 fotos reales · 6 decisiones de catálogo (en `30-Auditorias/COLA-CATALOGO-EJECUTABLE.md`, meteorito ya resuelto = one-of-a-kind) · WC key write (sync cron) · OK rol frontend + consolidar cerebro · limpiar 3 SKUs NocoDB · conectar MailerLite · Instagram Graph API · WooPayments `individual.id_number` (tarjeta) · reexportar joyas PNG transparente (estudio) · aprobar textos.

<!-- wenu-backlinks -->
Relacionado: [[WenuOS-Equipo-Agentico]] · [[WenuOS-Mapa-Integracion]] · [[COLA-CATALOGO-EJECUTABLE]] · [[efectos-livianos-mobile-wenu]] · [[wultufe-benchmark-arquitectura-2026-06-29]]
