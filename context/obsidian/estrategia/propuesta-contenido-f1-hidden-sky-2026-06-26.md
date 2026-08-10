---
tipo: propuesta · contenido-visual · capa-narrativa
proyecto: wenu-mapu
creado: 2026-06-26
estado: PROPUESTA — no publicar, no construir (solo proponer)
autor_agente: agente de marca/contenido
duena: Ocin
preview: "[[estrategia/assets/preview-contenido-f1-hidden-sky-2026-06-26.html]]"
fuentes:
  - "[[brand/01-identity/BRAND-DNA]]"
  - "[[brand/02-visual-system/color-palette]]"
  - "[[brand/02-visual-system/typography]]"
  - "[[brand/01-identity/voz-de-marca]]"
  - "[[brand/08-copy-bank/copy-frontend]]"
  - "[[brand/filosofia-cosmica-somos-uno-2026-06-23]]"
  - "[[brand/norte-diseno-minimalismo-2026-06-23]]"
  - "[[brand/storytelling-colecciones-2026-06-23]]"
  - "[[estrategia/marca-viva-calendario-cosmico-2026-06-25]]"
tags: [propuesta, contenido, f1, hidden-sky, signal-archive, instagram, newsletter, archive, etica, dark-first]
---

# Propuesta — Contenido Visual F1 + The Hidden Sky

> [!warning] Esto es una PROPUESTA. No se publica nada, no se toca el sitio (`wenu-frontend`), no se sube nada a Instagram ni al newsletter. Es el mapa para que apruebes pieza por pieza antes de producir.

> Preview visual navegable (HTML, abre en navegador): [[estrategia/assets/preview-contenido-f1-hidden-sky-2026-06-26.html]]

---

## 0. Lo que cuestiono antes de empezar

[Suposición → ahora dato] El brief pide "usar JOYAS REALES cuando el contenido sea de producto (no renders falsos)". Eso choca con un hueco ya documentado: la auditoría reporta **50 de 51 productos sin foto** ([[estrategia/marca-viva-calendario-cosmico-2026-06-25]] §0). **El cuello de botella de F1 no es el diseño — es la fotografía.** Puedo entregarte todo el sistema visual (molde, tipografía, símbolos, tags, copy), pero las ranuras de "foto real" quedan vacías hasta que exista al menos una foto-hero por pieza destacada. Por eso en el preview las piezas de producto aparecen como **ranuras marcadas `[ FOTO REAL ]`**, no como renders inventados: respeto la regla literalmente — antes inventar nada, dejo el hueco visible.

[Seguro] No reinventé la paleta. La nota `brand/color-palette.md` es una sugerencia cálida vieja; la **fuente de verdad real es `tokens.css` v5 (canónico 2026-05-28)** del frontend, que ya es dark-first. Trabajé desde ahí.

[Seguro] El logo/símbolo es **original y se preserva**: el `wenu-mapu-mark.svg` (cruz de 4 direcciones + diamante escalonado + anillo bronce), el Antü de 8 puntas y el `cardinal-sigil.svg`. No los rediseñé; los reuso como sellos atmosféricos.

---

## 1. Sistema maestro (lo que respeté, no lo que inventé)

**Paleta dark-first canónica** (de `tokens.css`):

| Token | Hex | Rol |
|---|---|---|
| `--obsidian` | `#0a0a0a` | fondo base |
| `--charcoal` | `#121212` | capa elevada |
| `--bone` | `#f0ede8` | texto primario |
| `--ember` | `#c9a84c` | **único acento** (dorado vela) |
| `--bronze` | `#6a4a28` | acento dim / bordes |
| nebulosa (`violet/indigo/magenta/plum`) | — | **sólo atmósfera de fondo**, nunca producto ni texto |
| `--signal-blue` (nuevo, propuesto) | `#3a6ea5` | reservado para la capa Hidden Sky |

**Tipografías canónicas:** Instrument Serif (display/wordmark) · Cormorant Garamond italic (ritual/manifiesto) · Instrument Sans (body/e-commerce) · JetBrains Mono (signal/coordenadas/archive).

**Norte de diseño** ([[brand/norte-diseno-minimalismo-2026-06-23]]): una idea por pantalla, quitar es diseñar, un molde repetido = orden. El cosmos es atmósfera; el ámbar es el único acento; la oscuridad ritual se conserva.

**Voz** ([[brand/01-identity/voz-de-marca]] + [[brand/01-identity/BRAND-DNA]] §8): OK → *ritual, ancestral, sacred, portal, cosmos, fragment, body, signal, cycle, origin, threshold*. NUNCA → *beautiful, magical, enchanted, perfect, unique (sobreusado), positive energy*.

**Frase-semilla** ([[brand/filosofia-cosmica-somos-uno-2026-06-23]]): *"Different hands, different lands — the same sky."*

---

# PARTE A — Fase 1 · Contenido visual

> Diez piezas, un solo molde repetido. Cada una: **objetivo · layout · copy · paleta · uso**. Preview de cada una en el HTML.

## Pieza 01 — Hero visual (Homepage)

- **Objetivo:** la primera respiración del sitio como portal entre tierra y cosmos. Una sola frase honesta, un solo CTA (regla de "una idea por pantalla").
- **Layout:** texto a la izquierda; símbolo WM original grande y tenue sangrando al borde derecho; nebulosa apagada + estrellas pequeñas detrás. Sin eyebrows apilados.
- **Copy:** *Title:* "Ritual adornment for the sacred body." · *Lede:* "Different hands, different lands — the same sky." · *CTA:* "Enter the catalog".
- **Paleta:** obsidiana base · hueso texto · ámbar (CTA + eyebrow) · nebulosa sólo atmósfera.
- **Uso:** `/`. Reusa el mark existente; no lo rediseña.

## Pieza 02 — Banner "Current Cycle"

- **Objetivo:** mostrar la ventana viva del [[estrategia/marca-viva-calendario-cosmico-2026-06-25|calendario cósmico]] (estación + colección + tema + código), sin popup ni FOMO de pantalla completa.
- **Layout:** masthead con velo lateral (`--scrim-strong`) para legibilidad; eyebrow con la estación (ej. "We Tripantu"), título, sub, "Enter the cycle".
- **Copy:** "The Celestial Cycle is open." / "Meteorite, cosmos, the year's first light — for 48 hours."
- **Paleta:** según tema activo (Nocturno / Solar / Atardecer). Nocturno por defecto.
- **Uso:** hero de la colección destacada y bloque de home. Banner quieto, no modal.

## Pieza 03 — Banner "Stone Commissions"

- **Objetivo:** abrir la puerta a comisiones de pieza única (forma + metal + piedra), coherente con `/custom-orders`.
- **Layout:** mismo molde de masthead; fondo de forja/taller (gradiente cálido tierra), ámbar mínimo, sin cosmos saturado.
- **Copy:** "Forge your own ritual stone." / "Form · metal · stone — a one-of-one shaped to you. Reply in 48h."
- **Paleta:** obsidiana + bronce + un toque ámbar. Tierra cálida, no nebulosa.
- **Uso:** `/custom-orders` y bloque de home secundario.

## Pieza 04 — Banner "Piercing Appointments"

- **Objetivo:** capa de confianza del servicio de piercing (credencial **BBP / APP** real de Ocin).
- **Layout:** masthead sobrio, velo; eyebrow "Piercing · By appointment".
- **Copy:** "The body, marked with care." / "Private fittings & piercing by a certified piercer. Truckee, CA."
- **Paleta:** obsidiana + un halo magenta-apagado muy bajo (humano, no clínico-frío).
- **Uso:** `/piercing`. CTA a solicitar cita (DM/email), no checkout.

## Pieza 05 — Banner "Aftercare"

- **Objetivo:** dar entrada a la guía de cuidado, bilingüe (EN + ES), tono sereno.
- **Layout:** masthead casi clínico, limpio; eyebrow "Aftercare · Cuidado posterior".
- **Copy:** "Cada cuerpo es un territorio sagrado." / "Adornarlo requiere conciencia y cuidado. EN + ES guide." (texto canónico de [[brand/01-identity/BRAND-DNA]] §11).
- **Paleta:** obsidiana + gris frío leve. Ámbar sólo como hilo (no protagonista).
- **Uso:** `/aftercare`.

## Pieza 06 — Seis posts base de Instagram feed

- **Objetivo:** un molde de feed coherente que mezcle objeto, producto y narrativa sin saturar.
- **Layout (3×3, los 6 base):** (1) **Object** — frase + cosmos; (2) **Piece** — foto real sobre panel hueso; (3) **Process** — taller/forja; (4) **Signal** — 1 de cada 8–12, capa Hidden Sky; (5) **Piece** — foto real; (6) **Words** — manifiesto en Cormorant italic.
- **Copy:** captions dark, precisos, cósmicos; palabras OK del brand book. Ejemplos: "Stone that fell from the sky.", "Born from the Earth, guided by the Cosmos.", "The seven are watching." (signal).
- **Paleta:** obsidiana + nebulosa atmósfera + panel hueso (`--product-panel #e7e1d4`) detrás de fotos de estudio.
- **Uso:** @wenu__mapu. La pieza de producto SIEMPRE con foto real.

## Pieza 07 — Seis story templates

- **Objetivo:** plantillas 9:16 reutilizables por ventana del calendario.
- **Layout (6):** Drop · Piece(foto) · Process(video) · Signal(coordenadas) · Quote(ritual) · Care(EN·ES).
- **Copy:** mínimo, mono arriba + display al centro. El **sticker de código** (ej. `wetripantu`) aparece SÓLO en la story de apertura de ofrenda, nunca en cada una.
- **Paleta:** por tema activo; signal-blue sólo en la story Signal.
- **Uso:** stories @wenu__mapu, encajando con el guion por ventana de [[estrategia/marca-viva-calendario-cosmico-2026-06-25]] §6.1.

## Pieza 08 — Tres banners de newsletter

- **Objetivo:** captar a "the first circle" sin ruido.
- **Layout/Copy:**
  - **General** — "Join the circle." / "New pieces, cycles & care — once a moon."
  - **Estacional** — "The cycle is turning." / "Be first when the offering opens." (fondo nebulosa).
  - **VIP oculto** — "Receive the last transmission." (capa Hidden Sky, ver Parte B · egg 07; borde signal-blue, distinto del general).
- **Paleta:** obsidiana + bronce en el campo de email; ámbar en el botón general, signal-blue en el VIP.
- **Uso:** footer del sitio (general/estacional) + premio del Hidden Sky (VIP).

## Pieza 09 — Sistema visual "Archive"

- **Objetivo:** dar hogar a piezas de ciclos pasados (vendidas o retiradas) **sin descontarlas**. Archivo = memoria con valor, no liquidación (coherente con la regla de repricing de [[estrategia/marca-viva-calendario-cosmico-2026-06-25]] §5.1).
- **Layout:** grilla de fichas numeradas; cada una con foto real, nº de serie, fecha y estado (SOLD / ARCHIVED / PAST CYCLE). Grano fino + mono.
- **Copy:** "Nothing here is for sale at a discount. The archive is memory, not liquidation."
- **Paleta:** obsidiana + sand silenciado + grano; ámbar sólo en el nº de serie.
- **Uso:** `/archive`. Es también la entrada del **Obsidian Archive** (Parte B · egg 05).

## Pieza 10 — Sistema de TAGS visuales

Seis etiquetas, una gramática (mono, mayúsculas leves, borde 1px, sin relleno salvo *commission*). Reutilizan el badge existente del sitio (`LIMITED` / `one of one`), no inventan sistema nuevo.

| Tag | Color | Significado |
|---|---|---|
| `◆ one of one` | ámbar | lo irrepetible (stock = 1) |
| `limited object` | bronce | serie corta real |
| `current cycle` | plata | pieza de la ventana activa |
| `piercing` | violeta apagado | servicio / pieza de piercing |
| `custom commission` | bone sobre carbón | encargo a medida |
| `archive` | sand silenciado | ciclo pasado, valor sostenido |

- **Regla de honestidad:** `one of one` y `limited` SÓLO en piezas genuinamente limitadas (meteorito, autor, Celestial). Un plug de acero reponible nunca lleva esa narrativa.

---

# PARTE B — The Hidden Sky / El Cielo Oculto / The Signal Archive

> Capa de profundidad **opcional**. Señales, archivos ocultos, micro-portales descubribles. **Nunca domina la navegación ni reemplaza el e-commerce.** Se siente como un archivo secreto latiendo bajo una casa de joyería ritual.

## La regla ética — INNEGOCIABLE (lo más importante del brief)

Nunca mezclar cosmovisión mapuche / pueblos originarios documentados con maestros ascendidos / OVNIs / Pléyades / civilizaciones alienígenas como si fueran la misma tradición o verdad histórica. Siempre tres niveles, siempre etiquetados:

| Nivel | Nombre | Qué es | Tags |
|---|---|---|---|
| **1** | **Documented Culture** | Histórico / ancestral / astronómico, con fuentes y respeto. Antü, wanglen, We Tripantu, platería mapuche, astronomía maya. Acreditado, **jamás disfraz**. | `DOCUMENTED` · `ARCHIVE ENTRY` |
| **2** | **Folklore / Myth** | Luces malas, relatos de campo, tradición oral. **Señalado explícitamente como folclore**, nunca como hecho. | `FOLKLORE` · `UNCLASSIFIED` |
| **3** | **Wenu Mapu Fiction / Signals** | Especulativo / poético / esotérico: OVNIs, transmisiones, maestros silenciosos, Pléyades, entidades, señales. **Ficción declarada — nunca presentada como verdad factual.** | `SIGNAL` · `TRANSMISSION` · `WENU MAPU FICTION` · `UNKNOWN ORIGIN` |

> [!danger] Los "códigos de lengua alienígena" Lemuria/Atlantis viven SÓLO como elemento de ficción visual, siempre con tag **WENU MAPU FICTION**. Jamás como historia real. Esto extiende el guardrail de reverencia de [[brand/filosofia-cosmica-somos-uno-2026-06-23]]: *ante la duda, menos afirmación, más reverencia*. Lo sagrado documentado (Nivel 1) y la ficción de marca (Nivel 3) **nunca comparten encuadre sin la etiqueta que los separa.**

### Los 7 easter eggs

#### 1 · PLEIADES — Seven Signals — `Nivel 3 · WM Fiction`
- **Concepto:** siete puntos de luz idénticos a las estrellas de fondo, repartidos por el sitio; hallar las 7 abre un modal secreto.
- **Ubicación:** footer, archive, página de piedras, one-of-one, fondos de ciclo. Una por zona.
- **Mecánica:** hover → glow azul-eléctrico tenue; click registra la estrella (sesión); 7/7 → modal.
- **Copy:** **"THE SEVEN ARE WATCHING."** + CTA al Signal Archive.
- **Visual:** Pléyades como atmósfera, azul muy bajo, estrella de hueso. Sin "aliens".

#### 2 · THE WANDERING LIGHT / LUZ MALA — `Nivel 2 · Folklore`
- **Concepto:** luz ambarina tenue que aparece y deriva — la *luz mala* del campo, tratada como folclore.
- **Ubicación:** sólo páginas de materia terrestre (obsidiana, meteorito, archive).
- **Mecánica:** aparece tras inactividad; sigue el cursor un instante; click → micro-relato etiquetado `FOLKLORE`.
- **Copy:** **"It appears where the earth remembers."**
- **Visual:** punto ámbar difuso, humo, sin figura. Etiqueta FOLKLORE siempre visible.

#### 3 · THE VISITORS — `Nivel 3 · WM Fiction`
- **Concepto:** sub-archivo de piezas presentadas como "objetos sin clasificar" recuperados — ficción de expediente sobre piezas reales.
- **Ubicación:** capa dentro del Archive y del Signal Field.
- **Mecánica:** se entra por código/coordenada; cada objeto es una pieza real con ficha tipo expediente.
- **Copy:** **"UNCLASSIFIED OBJECT. ORIGIN UNKNOWN."**
- **Visual:** cartografía, coordenadas mono, metal oxidado, grano. Tag `UNKNOWN ORIGIN` / `WM FICTION`.

#### 4 · THE ASCENDED ARCHIVE — `Nivel 3 · WM Fiction (sin religión real)`
- **Concepto:** archivo de "transmisiones" de figuras poéticas inventadas — The Quiet Teachers, The Silent Ones, The Keepers, The Observers. Ficción explícita, **sin doctrina ni nombres apropiados**.
- **Ubicación:** nodo profundo del Signal Field; entries numeradas.
- **Mecánica:** cada entry es texto breve (TRANSMISSION 001, SIGNAL 004) con tag `WENU MAPU FICTION`.
- **Copy:** **"The body remembers what language forgets."**
- **Visual:** Cormorant italic + mono de archivo. Cero iconografía de religión real o de pueblo originario.

#### 5 · THE BLACK STAR — `Nivel 3 · WM Fiction`
- **Concepto:** una estrella negra que "se activa" en páginas de materia oscura y abre el Obsidian Archive.
- **Ubicación:** obsidiana, meteorito, plata oxidada.
- **Mecánica:** punto negro casi invisible; hover pulsa azul; click → Obsidian Archive (la cara oscura del Archive, pieza 09).
- **Copy:** **"THE BLACK STAR IS ACTIVE."** · CTA **"ENTER THE OBSIDIAN ARCHIVE."**
- **Visual:** negro sobre negro, halo azul mínimo, sin saturación.

#### 6 · SIGNAL FIELD — `Nivel 3 · WM Fiction`
- **Concepto:** página/módulo oculto = mapa de exploración. Campo estelar + símbolos WM originales + puntos de luz clickeables + líneas orbitales → enlaces a productos/archivos/señales. **Mapa, no videojuego infantil.**
- **Ubicación:** experience portal / hidden nav; se llega desde otros eggs.
- **Mecánica:** nodos clickeables sobre órbitas tenues; símbolo WM original al centro; cada nodo = enlace real.
- **Copy:** mínimo, mono: "SIGNAL FIELD" + coordenadas por nodo.
- **Visual:** cosmos oscuro, líneas orbitales, ámbar + azul muy bajos, símbolos originales.

#### 7 · LAST TRANSMISSION — `Nivel 3 · WM Fiction (VIP real)`
- **Concepto:** lista VIP oculta, **distinta del newsletter general**: acceso anticipado, one-of-one, archivo, comisiones, drops y una señal mensual.
- **Ubicación:** premio final del Hidden Sky (tras Pléyades 7/7, o link enterrado en footer).
- **Mecánica:** formulario propio = segmento aparte en MailerLite. 1 "Signal from the Archive" al mes, máximo.
- **Copy:** **"RECEIVE THE LAST TRANSMISSION."**
- **Visual:** azul señal, mono, sobrio. Único egg con conversión real (lista de correo).

#### Nota de UX — el reveal "descubrir → desbloquear → recibir señal"

> Referencia de **mecánica** que mandó Ocin: el popup de Urban Body Jewelry ("UNLOCK 10% OFF / first purchase", email-capture). Tomamos **sólo la mecánica** — descubrir algo, desbloquear acceso, capturar email — y **descartamos el estilo** (amarillo, gritado, genérico, intrusivo). Lo traducimos al sistema First Circle / Last Transmission con voz Wenu Mapu.

**Principio:** no es un cupón emergente. Es **recibir una transmisión secreta**. El usuario no "gana 10%": *sintoniza una frecuencia* que estaba oculta. El valor no es el descuento — es el **acceso** (anticipado, one-of-one, archivo, señal mensual).

**El flujo de descubrimiento (no es un popup de entrada):**

1. **Disparador = un easter egg, no la carga de página.** El micro-formulario NUNCA aparece solo al entrar al sitio (eso sería el popup ruidoso que rechazamos). Aparece **sólo después de un descubrimiento**: completar las 7 Pléyades (egg 01), activar la Black Star (egg 05), o tocar un nodo del Signal Field (egg 06). El esfuerzo de descubrir *es* el filtro de calidad de la lista.
2. **El reveal (estado "señal encontrada").** Fade-in lento (no salto), fondo que se oscurece apenas (`--scrim-mid`, no negro total — el sitio sigue visible detrás), sin "X" agresiva: se cierra con Esc o click afuera. Línea mono arriba: `SIGNAL · UNLOCKED` o `TRANSMISSION INCOMING`.
3. **El micro-formulario (elegante, una sola línea).** Un único campo con placeholder `frequency / email` (no "enter your email to save 10%"), botón **`TUNE IN`** en signal-blue. Bajo el campo, en mono pequeño, lo que se desbloquea: `EARLY ACCESS · ONE-OF-ONE · ARCHIVE · MONTHLY SIGNAL`. Nada de porcentajes.
4. **La confirmación = recibir, no comprar.** Tras enviar: `YOU ARE ON THE FREQUENCY.` / "The next signal arrives with the coming moon." Opcional: revelar un fragmento inmediato (una entrada de archivo, una coordenada, una pieza no listada) como primera transmisión — la recompensa es contenido, no un código.

**Copy del reveal (borrador):**

> `SIGNAL · UNLOCKED`
> **You found the seven.**
> Few do. Receive the Last Transmission — early access, one-of-one pieces, and the archive, once a moon.
> `[ frequency / email ]` **TUNE IN**
> *Different hands, different lands — the same sky.*

**Lo que SÍ tomamos de la referencia:** gating real (algo se desbloquea), captura de email en el momento de mayor curiosidad, una sola acción clara. **Lo que NO:** color de alarma, "% OFF", urgencia falsa, popup de entrada, copy de cupón, segunda llamada agresiva. La conversión existe, pero disfrazada de pertenencia, no de oferta.

> [!note] Diferencia con el newsletter general (pieza 08): el **First Circle** es la captura pública y abierta del footer ("Join the circle"). El **Last Transmission** es su versión oculta y ganada — mismo backend (MailerLite) pero **segmento distinto**, sólo alcanzable por descubrimiento. Uno se ofrece; el otro se encuentra.

### Distribución y dosis (cómo vive sin invadir)

- **WEB:** footer, archive, experience portal, páginas de piedras, one-of-one, fondos de ciclo, hidden nav, hover states. **Nunca en el flujo de compra.**
- **INSTAGRAM:** 1 post "Signal" cada 8–12. Stories con códigos / coordenadas / cielo. El feed NO se vuelve UFO.
- **NEWSLETTER:** 1 "Signal from the Archive" al mes, máximo. Vive en la lista VIP, no en el general.

### Lenguaje visual del Hidden Sky

Cosmos oscuro · nebulosas apagadas · azul noche · rojo mineral sutil · luz azul eléctrica muy baja · humo · obsidiana · meteorito · metal oxidado · estrellas pequeñas · coordenadas · cartas astrales · granulado · líneas orbitales · texturas de archivo.

> [!danger] NO usar: alienígenas verdes · platillos caricaturescos · ilustración conspiranoica · "ancient aliens" como historia · símbolos indígenas mezclados con ovnis sin contexto · New Age genérico · galaxias saturadas · arcoíris cósmicos · claims de contacto extraterrestre como verdad.

---

## Qué necesito de Ocin para aprobar / producir

1. **Fotografía (bloqueante).** Al menos 1 foto-hero por pieza destacada. Sin ella, las ranuras `[ FOTO REAL ]` quedan vacías y F1 no puede salir del molde. ¿Qué piezas tienen foto lista hoy?
2. **Validación de copy.** ¿Hero EN/ES? El brand book mezcla home en inglés y secciones (aftercare, copy-frontend) en español. Confirmá idioma por pieza.
3. **`--signal-blue` (#3a6ea5).** Color nuevo propuesto SÓLO para la capa Hidden Sky. ¿Lo apruebas o preferís resolver la señal con ámbar/bronce existentes?
4. **Alcance del Hidden Sky en F1.** ¿Entra ya en esta fase o se separa a F2? Mi recomendación: F1 = Parte A + diseñar/aprobar la matriz ética y los 7 eggs en papel; construirlos va después, para no frenar el e-commerce.
5. **Last Transmission (egg 07).** ¿Creo el segmento VIP en MailerLite separado del general? Es el único egg con conversión real.
6. **Mapudungun.** Igual que en el calendario: grafía/significado de los términos rituales los validás vos como portador de la cultura.

---

## Fuentes

- [[brand/01-identity/BRAND-DNA]] · [[brand/01-identity/voz-de-marca]] · [[brand/08-copy-bank/copy-frontend]]
- [[brand/02-visual-system/color-palette]] · [[brand/02-visual-system/typography]]
- [[brand/filosofia-cosmica-somos-uno-2026-06-23]] · [[brand/norte-diseno-minimalismo-2026-06-23]] · [[brand/storytelling-colecciones-2026-06-23]]
- [[estrategia/marca-viva-calendario-cosmico-2026-06-25]]
- Frontend (sólo lectura): `wenu-frontend/src/styles/tokens.css` (v5 canónico), `themes.css`, `public/img/brand/wenu-mapu-mark.svg`, `public/img/brand/svg/kultrun-sun-antu.svg`, `public/img/graphics/cardinal-sigil.svg`
- Preview: [[estrategia/assets/preview-contenido-f1-hidden-sky-2026-06-26.html]]
