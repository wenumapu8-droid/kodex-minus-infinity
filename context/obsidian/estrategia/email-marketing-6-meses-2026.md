---
tipo: estrategia
proyecto: wenu-mapu
creado: 2026-07-05
actualizado: 2026-07-05
estado: listo-para-conectar
duena: marimari
canal: email
esp_destino: MailerLite (a conectar) · SMTP Titan (fallback, ya activo)
tags: [estrategia, email, marketing, calendario-editorial, pre-lanzamiento, nurture, drops, piercing, hidden-sky]
---

# Email Marketing — Calendario Editorial 6 Meses (jul → dic 2026)

> Nota hermana de [[marca-viva-calendario-cosmico-2026-06-25]] (la rueda cósmica que dispara los drops),
> de [[modelo-negocio/03-roadmap-90d]] (setup ESP + welcome + blast + abandonment) y de
> [[email-draft-dia-ovni-2026-07-02]] (el editorial Hidden Sky, ya integrado como campaña).
> El welcome aprobado por Ocin es el **nivel de referencia**; todo lo de abajo se construyó al mismo nivel.

---

## 0. Qué resuelve esta nota

Ocin pidió: *"el email está perfecto, el mismo nivel necesito para TODO nuestro email marketing para los primeros 6 meses, resuelto."*

Esto deja **resuelto**: (1) el plan editorial de 6 meses con cadencia realista de pre-lanzamiento, (2) los **templates HTML** reutilizables al mismo nivel visual/editorial que el welcome, y (3) las **11 campañas con copy real** listas para enviar en cuanto se conecte el sender.

Lo que sí necesita input de Ocin antes de enviar cada pieza está marcado con `⚠ INPUT`.

---

## 1. Etapa real y principio de cadencia

Wenu Mapu está en **PRE-LANZAMIENTO, sin base de clientes** ([[project_etapa_prelanzamiento]] en memoria). La lista de email hoy es chica (amigos / boca a boca). El cuello de botella real es **descubrimiento** (IG/contenido), no el email. Por eso la regla dura del calendario:

- **No spamear una lista chica.** Máximo **~3–4 emails/mes** en meses pico (mes 1 nurture), **1–2/mes** en meses de crucero.
- **Cada email gana su lugar** con relato, no con promo. La marca prohíbe el FOMO de pantalla completa ([[marca-viva-calendario-cosmico-2026-06-25]] §6.3).
- **Disciplina de escasez:** máximo 4–5 ventanas con código al año (las 4 estaciones + We Tripantu). Fuera de eso, ofrenda = valor agregado, no descuento (§3.3 de la rueda).
- **El email es aguas abajo de IG.** No inventa audiencia: nutre a quien ya entró al círculo y lo convierte en el tiempo. Mientras IG llena la lista, estos correos la calientan.

---

## 2. Los seis tipos que un negocio así necesita

| Tipo | Rol | Template | Frecuencia |
|---|---|---|---|
| **(a) Serie de bienvenida / nurture** | 2–3 correos tras el welcome; construir la relación, contar el origen, el oficio, el cuerpo como receptor | `nurture` | 3 en las 2 semanas post-suscripción |
| **(b) Drop de producto / "lo nuevo llegó al taller"** | Revelar piezas nuevas / limitadas; mini-catálogo; ofrenda atada a fecha cósmica | `drop` | 1 por estación solar (4/año) |
| **(c) Piercing & agendar sesión** | Empujar el servicio (Truckee/Tahoe), fittings privados, aftercare | `piercing` | 1 cada ~6–8 semanas |
| **(d) Editorial / journal ritual** | Cosmos, constelaciones, care; profundidad de marca sin vender directo | `editorial` | 1 cada 3–4 semanas |
| **(e) Fecha / estacional** | Anclada al calendario cósmico (equinoccios, solsticios, World UFO Day) | `drop` o `editorial` | según rueda |
| **(f) Reactivación / win-back** | Recuperar suscriptores dormidos; sin descuento por defecto | `reactivation` | 1 al cierre de semestre |

Todos comparten **un solo sistema visual** (ver §5): el del welcome aprobado.

---

## 3. Calendario mes a mes (jul → dic 2026)

> Cada fila = una campaña ya escrita en `wenu-platform/src/emails/campaigns.mjs` (id entre backticks).
> Asuntos y preheaders son los reales del código. Los códigos de cupón salen de la rueda cósmica.

### Mes 1 — JULIO · Nurture + primer editorial

| # | Fecha rel. | id campaña | Tipo | Segmento | Asunto | Preheader | Ángulo | CTA |
|---|---|---|---|---|---|---|---|---|
| 1 | welcome +3d | `nurture-1-origin` | nurture | nuevos suscriptores | *Where the pieces come from* | Wallmapu, between the Atacama Desert and the Mapuche cosmos. | El origen: qué es Wenu Mapu, de dónde nace | SEE THE COLLECTION → /shop |
| 2 | welcome +7d | `nurture-2-ritual` | nurture | nuevos suscriptores | *The body is the receiver* | An adornment is not decoration. It is tuning. | El rito de adornar; pieza que existe una sola vez | FIND YOUR PIECE → /shop |
| 3 | welcome +12d | `nurture-3-hands` | nurture | nuevos suscriptores | *Different hands, the same sky* | The person behind the studio — and an open door in Tahoe. | El/la maker + puente al servicio de piercing | MEET THE STUDIO → /about |
| 4 | ~2 jul (World UFO Day) o evergreen | `editorial-hidden-sky` | editorial | lista general | *We all come from the stars — a transmission* | What is remembered, what is told, and what we imagine — kept apart, on purpose. | Los 3 registros del cielo (Hidden Sky, ético) | READ THE TRANSMISSION → /journal |

`⚠ INPUT (4)`: confirmar que `/journal/world-ufo-day` esté **en vivo** antes de enviar (el draft [[email-draft-dia-ovni-2026-07-02]] lo condiciona). Si no, mover a evergreen sin fecha.

### Mes 2 — AGOSTO · Piercing + editorial constelaciones

| # | Ventana | id campaña | Tipo | Segmento | Asunto | Ángulo | CTA |
|---|---|---|---|---|---|---|---|
| 5 | ~1ª quincena | `piercing-book-tahoe` | piercing | lista general (geo Tahoe si hay dato) | *A door in Tahoe — book your session* | El servicio: piercer certificado, fittings privados, umbral con cuidado | BOOK A SESSION → /piercing |
| 6 | ~2ª quincena | `editorial-constellation` | editorial | lista general | *Map your ear like a constellation* | Curated ear como cosmos; herramienta /constelaciones; proyección ≠ promesa | OPEN THE CONSTELLATION → /constelaciones |

`⚠ INPUT (6)`: la nota [[project_constelaciones_oreja]] pide que cada anatomía la evalúe Ocin — el copy ya dice "projection, not promise". OK ético.

### Mes 3 — SEPTIEMBRE · Drop estacional (Equinoccio Pewü, 22 sep)

| # | Fecha astronómica | id campaña | Tipo | Segmento | Asunto | Código | Ventana |
|---|---|---|---|---|---|---|---|
| 7 | 22 sep (equinoccio) | `drop-equinox-pewun` | drop | lista general + First Circle | *The equinox opens — new to the studio* | `PEWUN` | 72 h reales |

`⚠ INPUT (7)`: **bloqueante** — elegir 1–3 piezas Wenumapu Origin con **stock real + foto-hero**, cargar precios reales, y crear el cupón `PEWUN` en Woo con fecha fin = cierre de ventana. Hoy el mini-catálogo usa imágenes placeholder (mood shot) y precios de referencia. Ver rueda §7 hueco #1.

### Mes 4 — OCTUBRE · Editorial care (temporada de sanación / downsize)

| # | Ventana | id campaña | Tipo | Segmento | Asunto | Ángulo | CTA |
|---|---|---|---|---|---|---|---|
| 8 | mediados oct | `editorial-care-season` | editorial | quien se perforó este año + general | *The quiet season of healing* | Otoño = tender; downsize como cuidado ordinario, sin claim médico | READ THE CARE GUIDE → /care-guide |

Base de contenido: [[brand/contenido-aftercare-downsize-recordatorio-2026-06-23]].

### Mes 5 — NOVIEMBRE · Drop de regalo (antesala solsticio, sin Black Friday gritón)

| # | Ventana | id campaña | Tipo | Segmento | Asunto | Ángulo | CTA |
|---|---|---|---|---|---|---|---|
| 9 | 2ª quincena nov | `drop-solstice-antesala` | drop | lista general | *A piece worth the giving* | Regalo con origen; "objeto que existe una sola vez"; **sin código, sin countdown falso** | SEE WHAT'S IN THE STUDIO → /shop |

Decisión de marca: en noviembre US grita Black Friday. Wenu Mapu **no**. Ofrenda = envío/empaque ritual, no % (rueda §5.1). Este email no lleva cupón a propósito.

### Mes 6 — DICIEMBRE · Drop solsticio Walüg (21 dic) + reactivación de cierre

| # | Fecha | id campaña | Tipo | Segmento | Asunto | Código | CTA |
|---|---|---|---|---|---|---|---|
| 10 | 21 dic (solsticio) | `drop-solstice-walung` | drop | general + First Circle | *The longest light — the Solar drop* | `WALUNG` | ENTER THE SOLAR DROP → /shop |
| 11 | ~28–30 dic | `reactivation-circle-open` | reactivation | **solo dormidos** (no abrieron en 60–90 d) | *The circle is still open* | — (sin descuento) | RETURN TO THE STUDIO → /shop |

`⚠ INPUT (10)`: mismo bloqueante que Pewü — pieza Atacama + author piece (2 uds reales) con foto y precio; cupón `WALUNG` en Woo. `(11)`: segmentar por engagement en MailerLite (no enviar a toda la lista).

---

## 4. Segmentación (cuando MailerLite esté conectado)

| Segmento | Definición | Recibe |
|---|---|---|
| **Nuevos** | suscritos < 14 días | serie nurture 1–3 |
| **First Circle** | toda la lista activa | drops + editoriales + fechas |
| **Piercing / local** | tag geo Tahoe o interés servicio | piercing-book + care |
| **Dormidos** | sin abrir 60–90 d | solo reactivación |

Tags ya existen en el modelo (`prisma.subscriber.tags`, ver `/newsletter/subscribe` en `api.mjs`). MailerLite replicará estos grupos.

---

## 5. El sistema de templates (mismo nivel que el welcome)

Templates HTML reutilizables en `wenu-platform/src/emails/`:

- **`templates.mjs`** — el design system extraído 1:1 del welcome aprobado: paleta obsidiana (tokens), **logo de glifos woven real** arriba, **mandala como sello de cierre**, tipografía serif (Georgia stack email-safe), **botón ember bulletproof**, tablas + estilos inline, ~600px, `color-scheme: dark` forzado, preheader oculto, unsubscribe. Un `renderBase()` gobierna el shell; cada variante elige qué bloques mostrar.
- **`campaigns.mjs`** — las 11 campañas con copy real (arriba), cada una llamando a su builder.
- **`preview.mjs`** — renderiza las 11 a HTML en disco + galería `index.html`.
- **`test-send.mjs`** — envía UNA campaña por SMTP Titan a una dirección de prueba.

Variantes (builders parametrizables — título, cuerpo, imagen/producto, CTA):

| Builder | Tipo | Bloques propios |
|---|---|---|
| `buildNurtureEmail` | nurture | eyebrow · headline · lead · mapudungun · imagen · body · CTA · tagline |
| `buildProductDropEmail` | drop | + hero · **grid de 3 productos** · **bloque ofrenda/cupón** |
| `buildPiercingEmail` | piercing | + link secundario a aftercare |
| `buildEditorialEmail` | editorial | body multi-párrafo · sign-off mapudungun · link secundario |
| `buildReactivationEmail` | reactivation | tono quieto, cupón opcional (default: ninguno) |

**Verificado en vivo (2026-07-05):** las 11 renderizan; screenshots en `wenu-platform/email-previews/shots/`. Test-send real por Titan SMTP de `nurture-1-origin` a `wenu.mapu8@gmail.com` → `sent` (messageId confirmado). Render idéntico al welcome: logo woven, headline ember, mood, botón ember, mandala, footer.

`sendWelcomeEmail()` en `api.mjs` **NO se tocó** — sigue siendo la referencia intacta.

---

## 6. Voz y ética (reglas aplicadas al copy)

- Voz canónica [[brand/01-identity/voz-de-marca]]: OK → ritual, ancestral, sacred, portal, cosmos, fragment, body, signal, cycle, threshold, intentional. NUNCA → beautiful, magical, perfect, positive energy, "Mapuche Root", genéricos IA.
- **Hidden Sky** ([[project_hidden_sky_etica]]): los 3 registros (cultura documentada / folclore / ficción) siempre separados. El editorial UFO lo hace explícito; ningún email presenta OVNIs ni contacto ET como verdad, ni funde cosmovisión mapuche con narrativa alienígena.
- **Sin claims de salud.** El email de care dice "small, ordinary act of care, **not a medical claim**". Piercing = servicio con seguridad (BBP), no promesa terapéutica.
- **Handmade vs sourced** ([[feedback_handmade_vs_sourced]]): el copy dice "matter with an origin", "short series", "worked" — nunca "handmade" sobre piezas curadas/importadas.

---

## 7. Qué queda para conectar con MailerLite

1. **Crear cuenta/API MailerLite** y verificar dominio (SPF/DKIM ya sirven a Titan; agregar registros MailerLite para no romper deliverability). `⚠ INPUT`
2. **Importar la lista** actual de `prisma.subscriber` (endpoint `/newsletter/stats` da el conteo) con sus tags → grupos MailerLite (§4).
3. **Cargar los 11 templates**: MailerLite acepta HTML custom. Pegar el HTML de cada `campaigns.mjs` (o exportar con `preview.mjs`). El diseño es HTML-safe, no depende de su editor.
4. **Automation nurture**: welcome (ya envía SMTP) → +3d nurture-1 → +7d nurture-2 → +12d nurture-3, como workflow de bienvenida. Alternativa sin MailerLite: cron en `wenu-api` que dispare `campaigns.mjs` por SMTP (el código ya lo permite).
5. **Cupones Woo** `PEWUN` / `WALUNG` con fecha fin real (§3, drops) antes de sus envíos.
6. **Assets de producto reales** para los mini-catálogos de drop (hoy placeholder). Bloqueante de los drops, no de nurture/editorial/piercing.
7. **Confirmar URLs en vivo**: `/journal/world-ufo-day`, `/constelaciones`, `/piercing`, `/care-guide`, `/about` antes de linkearlos.

Mientras MailerLite no esté: **el welcome ya sale por SMTP Titan** y cualquiera de las 11 puede enviarse manualmente con `test-send.mjs` (quitando el prefijo `[TEST]`). El sistema no bloquea; MailerLite solo agrega automatización y analítica.

---

## 8. Próximo paso concreto

El único envío listo-sin-input es la **serie nurture** (1–3): no depende de fotos de producto ni de fechas astronómicas, solo de la lista. En cuanto Ocin lo apruebe, conectar el workflow (MailerLite o cron SMTP) y encender el nurture. Los drops esperan foto-hero + stock real (hueco #1 de la rueda, sigue siendo el bloqueante de fondo).

---

## Fuentes / archivos

- Código: `wenu-platform/src/emails/{templates,campaigns,preview,test-send}.mjs`
- Previews: `wenu-platform/email-previews/*.html` + `shots/*.png`
- Referencia de diseño: `sendWelcomeEmail()` en `wenu-platform/src/api.mjs` (aprobado por Ocin)

<!-- wenu-backlinks -->
## Contexto

[[Home]] · [[00-Index/Contexto-MOC]] · [[marca-viva-calendario-cosmico-2026-06-25]] · [[modelo-negocio/03-roadmap-90d]] · [[email-draft-dia-ovni-2026-07-02]] · [[brand/01-identity/voz-de-marca]] · [[project_hidden_sky_etica]]
