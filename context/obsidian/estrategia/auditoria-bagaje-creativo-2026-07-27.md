---
tipo: auditoria
dominio: estrategia
fecha: 2026-07-27
autor: agente auditor de activos creativos
estado: v1
---

# Auditoría del bagaje creativo de Ocin — poner todo a disposición y dar valor

> Mandato: "auditar todo mi bagaje creativo y ponerlo a disposición de todos y dar valor con aquello."
> Alcance: `wenu-frontend`, `wenu-platform`, `wenu-agent-hub`, `wenu-kai`, `wenu-manifesto-ar`, vault [[Home]] y disco LaCie.
> Método: read-only. No se movió, borró ni modificó nada. "LISTO" = verificado leyendo el archivo; no se ejecutó ni build ni deploy, no hay verificación en vivo.
> Reglas respetadas: ética Hidden Sky (separar cultura documentada / arte-ficción KODEX / estrategia privada), handmade vs sourced, provenance honesto.

Enlaces: [[00-Index/WenuOS-Equipo-Agentico]] · [[estrategia/kodex-sistema-madre-2026-07-24]] · [[estrategia/manifiesto-arqueofuturismo-ritual-2026-07-24]]

---

## Resumen — 10 quick-wins (mayor valor, menor esfuerzo)

Ordenados por relación valor/esfuerzo. Todos son lanzables casi sin trabajo previo.

1. **Wenu Sigil — pack SVG** (`/Volumes/LaCie/Wenu mapu/Wenu-Sigil-2026/`). Emblema rotacional 4-fold original, 3 variantes SVG + README con paleta. Documentado como original (IP-limpio). Es el único asset totalmente LISTO e IP-seguro del disco. REGALAR como lead magnet o VENDER como pack de emblema vectorial. Esfuerzo S.
2. **Sets de imágenes KODEX — regalar** (`/Users/user1/wenu-frontend/public/img/kodex/`). 52 láminas archive + serie B/N ACHROMA + disco solar + tribe/patrones. Ya licenciados libres en `packs/LICENSE.txt` ("belongs to no one, and to all"). Falta solo zippear + hospedar. Máximo alineamiento con la marca "el archivo queda libre". Esfuerzo S.
3. **Micro-CLI de pipeline de imágenes** (`scripts/clean-images.mjs` + `scripts/gen-avif.mjs`). Strip EXIF → WebP → companions AVIF. Genéricos, idempotentes, un solo arg. OPEN-SOURCE casi sin tocar. Esfuerzo S.
4. **`security.ts` — sanitizador de secretos en logs** (`wenu-agent-hub/packages/shared/src/security.ts`). Redacta API keys/tokens/JWT de texto y objetos. Autocontenido, cero deps. OPEN-SOURCE / gist. Esfuerzo S.
5. **`perceptual-hash.mjs` — dHash dedupe de imágenes** (`wenu-agent-hub/lib/perceptual-hash.mjs`). dHash 64-bit + hamming, solo depende de `sharp`. OPEN-SOURCE / regalar. Esfuerzo S.
6. **Guía "Efectos web livianos en mobile"** ([[estrategia/efectos-livianos-mobile-wenu]]). Guía de ingeniería front-end pulida, con fuentes y checklist. No expone nada de Wenu. PUBLICAR (blog técnico). Esfuerzo S.
7. **Guía de cliente "Ear Stretching"** (`brand/contenido-guia-ear-stretching-2026-06-23.md`). Educativa, honesta, sin claims médicos. Ya marcada "lista para construir la página". PUBLICAR como `/ear-stretching` + reciclar a IG. Esfuerzo S.
8. **Manifiesto — Arqueofuturismo Ritual** ([[estrategia/manifiesto-arqueofuturismo-ritual-2026-07-24]]). Ensayo-manifiesto terminado, con su propia cláusula ética. Posiciona a Ocin como artista-pensador. PUBLICAR. Esfuerzo S.
9. **Guía "Cómo hice una mascota pixel-art con IA"** (`wenu-kai/KAI_FRAME_PROMPTS.md` + `KAI_PIXEL_ART_BRIEF.md`). Método honesto de consistencia img2img + template de brief de personaje, con pack de sprites gratis como imán. PUBLICAR + REGALAR. Esfuerzo S-M.
10. **Sistema de emails transaccionales dark-mode** (`wenu-platform/src/emails/templates.mjs`). 7 builders HTML deliverability-safe, "order shipped" con barra de progreso USPS y tracking multi-carrier. Módulo puro (sin SMTP). OPEN-SOURCE / TEMPLATE tras parametrizar assets. Alto valor. Esfuerzo M.

Nota transversal: el vault es disciplinado con Hidden Sky. El único punto de cuidado editorial es el [[estrategia/kodex-canon-64-sistemas-2026-07-24|canon de 64 sistemas]]: al llevarlo a formato público hay que preservar visible su regla de "referencia → extracción estructural → traducción original" para símbolos de culturas vivas/restringidas.

---

## (A) Productos digitales — regalar / vender

### A1 · Archivo KODEX — 52 láminas generativas
- Ubicación: `/Users/user1/wenu-frontend/public/img/kodex/archive/arch-01.jpg … arch-52.jpg`
- Qué es: colección completa de láminas generativas tecno-tribales de Ocin. Arte abstracto, NO reclama cosmovisión mapuche (limpio éticamente).
- Formato: imágenes (JPG). Estado: LISTO (existen y se sirven en el sitio).
- Recomendación: REGALAR + PACK ("THE ARCHIVE · 52 plates" ya definido en `store.astro`).
- Ángulo: base gratuita que construye comunidad; el gancho "el archivo queda libre" es diferenciador de marca del laboratorio.
- Esfuerzo: S (regalar) / M (empaquetar .zip hospedado).

### A2 · Serie B/N "ACHROMA" + edición "conjuncion"
- Ubicación: `/Users/user1/wenu-frontend/public/img/kodex/works/bw-01.jpg … bw-11.jpg` + `conjuncion.jpg`
- Qué es: "las formas verdaderas" en blanco y negro; `conjuncion` es la pieza-edición #01.
- Formato: imágenes (JPG). Estado: LISTO.
- Recomendación: PACK (ACHROMA, la serie más print-ready) + VENDER `conjuncion` como edición numerada (ya modelada en `editions.astro`).
- Ángulo: alto contraste "de museo"; `conjuncion` tiene narrativa de coleccionable. Falta print-on-demand conectado.
- Esfuerzo: S.

### A3 · Serie "DISCO SOLAR" — 11 láminas
- Ubicación: `/Users/user1/wenu-frontend/public/img/kodex/disco/disco-01.jpg … disco-11.jpg` (originales hi-res en `/Volumes/LaCie/Wenu mapu/kodex-disco-solar-originales/`)
- Qué es: fractales neón / señal en color. Los originales en LaCie son la fuente hi-res.
- Formato: imágenes (JPG). Estado: LISTO (web) / los hi-res habilitan print.
- Recomendación: PACK + TEMPLATE-PRESET (stickers/tees POD) + VENDER prints/editions desde los originales.
- Ángulo: el color pop es lo más "wearable"/merch; enchufa directo al proyecto /kodex existente.
- Esfuerzo: S (web) / M (editions print).

### A4 · Serie "TRIBE SPACE" + patrones
- Ubicación: `/Users/user1/wenu-frontend/public/img/kodex/behance/tribe-01…05.webp` + `patrones-01…05.webp`
- Qué es: máscara/cuerpo/signo (tribe) y patrones repetibles (patrones).
- Formato: imágenes (WebP). Estado: LISTO (tribe) / MATERIA PRIMA (patrones: falta verificar que sean seamless).
- Recomendación: PACK (tribe) + TEMPLATE-PRESET (patrones → tiles textiles/fondos vendibles o regalables).
- Ángulo: los patrones son los de mayor reuso comercial (fondos, textil, wallpapers).
- Esfuerzo: S (tribe) / M (validar y empaquetar patrones seamless).

### A5 · Licencia libre de packs KODEX
- Ubicación: `/Users/user1/wenu-frontend/public/img/kodex/packs/LICENSE.txt`
- Qué es: licencia "belongs to no one, and to all — print, remix, wear, project". Único archivo en `packs/`.
- Formato: texto. Estado: LISTO (texto).
- Recomendación: PUBLICAR junto a cada pack.
- Flag honesto: los `.zip` de packs NO existen en el repo todavía; `scripts/kodex-wire-packs.mjs` los cablea a WooCommerce (IDs 3434-3437) desde hosting externo. Para "regalar" hay que zippear + hospedar primero. En `store.astro` el FREE DOWNLOAD figura AVAILABLE pero prints/stickers/tees/NFT/donate están en COMING SOON hasta conectar cuentas.
- Esfuerzo: S.

### A6 · Wenu Sigil — pack de emblema vectorial
- Ubicación: `/Volumes/LaCie/Wenu mapu/Wenu-Sigil-2026/`
- Qué es: sigilo de marca rotacional 4-fold, original (no un calco), 3 variantes SVG (master currentColor, oro-sobre-obsidiana, hueso) + README con paleta.
- Formato: vector SVG. Estado: LISTO. IP-limpio y documentado como original.
- Recomendación: PACK / VENDER / REGALAR — pack de emblema vectorial o descarga gratis "brand sigil".
- Ángulo: merch, sellos, stickers; el único asset del disco totalmente listo e IP-seguro.
- Esfuerzo: S.

### A7 · Kai — pack de sprites pixel-art (personaje original)
- Ubicación: `/Users/user1/wenu-kai/frames_clean/` + `frames.json` + `frames_clean/eyes.json`
- Qué es: mascota pixel-art original (cachorro Pastor Australiano blue-merle, heterocromía, bobtail) — 18 poses/expresiones limpias con fondo transparente.
- Formato: sprite-set. Estado: LISTO como stills / NO cumple el spec del propio brief (son PNG ~150×140 de una pose, no strips animados 64×64 ni fuente Aseprite).
- Recomendación: PACK / REGALAR — "free cute pixel companion pack" (itch.io freebie / lead magnet).
- Ángulo: audiencia dev/indie; imán de tráfico hacia la tienda.
- Flag honesto: NO venderlo como "sprite sheet game-ready animado" — son poses estáticas. Como charm pack / giveaway es honesto.
- Esfuerzo: S-M.

### A8 · Portal dimensional "experience" (pieza de marca)
- Ubicación: `/Users/user1/wenu-frontend/public/experience/` (`index.html`, `journey.js/css`, `portal-run.js/css`, `README.md`, `AUDIT-FINAL.md`)
- Qué es: landing-portal 2D-canvas autocontenido (sin Three.js): loader ceremonial, star map de 10 estrellas, deep-portals con texto, journey guiado hacia la tienda.
- Formato: interactivo. Estado: LISTO (documentado, con audit y protocolo de fidelidad cultural).
- Recomendación: PUBLICAR (es el norte de marca; la memoria dice NO tocar/quitar). NO open-sourcear tal cual, NO revender el contenido cultural.
- Ángulo: identidad central de Wenu Mapu; valor de marca, no de reventa.
- Flag ético: usa términos mapuche documentados (Antü, Küyen, Lafken…). El README ya trae protocolo honesto (traducción directa, disclaimer "open to correction", pide revisión de consultor mapuche antes del launch público). Mantener separado del arte KODEX abstracto.
- Esfuerzo: S (ya hecho).

---

## (B) Repos & herramientas — open-source

### B1 · Micro-CLI de pipeline de imágenes estáticas
- Ubicación: `/Users/user1/wenu-frontend/scripts/clean-images.mjs` + `scripts/gen-avif.mjs` (+ `process-photos.mjs`)
- Qué es: strip EXIF + re-encode a WebP (idempotente, toma `[root]` como arg) y genera companions AVIF por mtime. `process-photos` hace variantes responsive pero está acoplado a NocoDB.
- Formato: código (Node + sharp). Estado: LISTO (clean-images, gen-avif) / NECESITA TRABAJO (process-photos).
- Recomendación: OPEN-SOURCE — micro-CLI "static image pipeline (EXIF-strip + WebP + AVIF)".
- Ángulo: cualquier dev de sitios estáticos lo quiere; los dos juntos son publicables casi sin edición.
- Esfuerzo: S (clean-images + gen-avif) / M (process-photos).

### B2 · `security.ts` — sanitizador de secretos
- Ubicación: `/Users/user1/wenu-agent-hub/packages/shared/src/security.ts`
- Qué es: redacta API keys / tokens / JWT / `KEY=valor` de texto y objetos antes de loguear o persistir; helpers `isLocalhostUrl`, `redactPathForDisplay`.
- Formato: código (TS). Estado: LISTO (autocontenido, sin deps).
- Recomendación: OPEN-SOURCE / REGALAR (gist o micro-paquete npm).
- Ángulo: utilidad universal para logs seguros; cero fricción.
- Esfuerzo: S.

### B3 · `perceptual-hash.mjs` — dHash de imágenes
- Ubicación: `/Users/user1/wenu-agent-hub/lib/perceptual-hash.mjs`
- Qué es: dHash 64-bit + hamming + md5 sobre `sharp` (HEIC/JPG/PNG/WebP). Detección de duplicados/near-dupes.
- Formato: código. Estado: LISTO (solo depende de `sharp`).
- Recomendación: OPEN-SOURCE / REGALAR.
- Ángulo: dedupe de fotos sin servicios externos; muy citable.
- Esfuerzo: S.

### B4 · Abstracción multi-provider LLM (local-first)
- Ubicación: `/Users/user1/wenu-agent-hub/packages/provider-{llamacpp,ollama,openai,anthropic,groq,woocommerce}/`, `packages/shared/src/`, `packages/core-orchestrator/src/`
- Qué es: interfaz uniforme `LanguageModelProvider` (generateReply/healthCheck/isConfigured) con implementaciones local (llama.cpp/Ollama) y cloud, más una `ExecutionPolicy` (respond/execute/require-approval por intent+riesgo).
- Formato: código (TS estricto). Estado: LISTO (build funciona).
- Recomendación: OPEN-SOURCE.
- Ángulo: patrón "local-first con fallback cloud opt-in" limpio y tipado; router de LLM sin frameworks pesados. Combinable con B7 en un "local-first agent kit".
- Esfuerzo: M (extraer del monorepo + genericizar README).

### B5 · Sistema de emails transaccionales/marketing
- Ubicación: `/Users/user1/wenu-platform/src/emails/templates.mjs` (+ `preview.mjs`, `campaigns.mjs`, `ship-order.mjs`)
- Qué es: biblioteca de emails HTML dark-mode (tablas ~600px, "bulletproof buttons", 7 builders: nurture, product-drop, piercing, editorial, reactivation, order-confirmed, order-shipped con progreso USPS + tracking multi-carrier). Módulo PURO (sin SMTP), UTM automático, ES/EN.
- Formato: template/código. Estado: LISTO (usable como librería; assets/paleta parametrizables).
- Recomendación: TEMPLATE-PRESET / OPEN-SOURCE.
- Ángulo: emails deliverability-safe sin depender de un ESP; el set "order shipped con barra de progreso" rara vez es open-source.
- Esfuerzo: M (parametrizar `ASSETS`/`PALETTE`/dominios).

### B6 · Generador de ficha técnica de producto (HTML→PDF)
- Ubicación: `/Users/user1/wenu-platform/src/technical-sheet.mjs`
- Qué es: renderiza una spec-sheet HTML (grid de medición SVG + tabla de specs) y la exporta a PNG/PDF vía `puppeteer-core`; también variante SVG.
- Formato: template + código. Estado: LISTO (render genérico; toma campos de NocoDB).
- Recomendación: TEMPLATE-PRESET.
- Ángulo: "spec sheet imprimible desde datos de producto" reutilizable por cualquier tienda; patrón HTML→puppeteer→PDF didáctico.
- Esfuerzo: M (desacoplar nombres de campo NocoDB; Chrome path configurable).

### B7 · `obsidian-memory` — memoria de agente sobre Markdown
- Ubicación: `/Users/user1/wenu-agent-hub/packages/obsidian-memory/`
- Qué es: trata un vault Obsidian como FS (appendDailyNote, saveConversationSummary, searchVaultText, createNoteFromTelegram) sin API ni plugins.
- Formato: código. Estado: LISTO-ish (API pequeña, funciona).
- Recomendación: OPEN-SOURCE (junto a B4 como "local-first agent kit").
- Ángulo: popular en la comunidad Obsidian + LLM.
- Esfuerzo: M.

### B8 · `gemini-image.mjs` — limpieza de foto de producto con IA
- Ubicación: `/Users/user1/wenu-agent-hub/lib/gemini-image.mjs` (+ `scripts/run-nano-banana-task.mjs`)
- Qué es: cliente Gemini 2.5 Flash Image que "restaura" fotos de producto (luz/fondo/foco) con un prompt que prohíbe alterar la pieza física; guard de free-tier.
- Formato: código + prompt. Estado: NECESITA TRABAJO (prompt y ruta `.env` hardcodeados a Wenu).
- Recomendación: OPEN-SOURCE (wrapper genérico) + el prompt como TEMPLATE-PRESET aparte.
- Ángulo: "AI product-photo cleanup que NO inventa producto" es un caso e-commerce muy demandado.
- Esfuerzo: M.

### B9 · Kai — widget de mascota inyectable
- Ubicación: `/Users/user1/wenu-kai/demo/kai_inject_urls.js` (versión lean; `kai_inject.js` es la misma con sprites base64 embebidos, multi-MB)
- Qué es: widget flotante autoinyectable con motor de poses + globo de diálogo; se suelta en cualquier sitio con un script.
- Formato: código. Estado: NECESITA TRABAJO (funciona como snippet; no es lib configurable/documentada).
- Recomendación: OPEN-SOURCE ("drop a living mascot into any site in one script").
- Ángulo: nicho simpático; usa la versión `_urls` (la `_inject.js` embebida es demasiado pesada).
- Esfuerzo: M.

### B10 · WebAR procedural (motor/skeleton) — manifiesto
- Ubicación: `/Users/user1/wenu-manifesto-ar/src/` (`ar/ scene/ ui/ config/ interaction/ audio/`)
- Qué es: framework config-driven MindAR + Three.js procedural (sin Blender/GLB): escena vertical de niveles/fuerzas/partículas/audio con fallback sin-AR. Arquitectura limpia por su CLAUDE.md.
- Formato: código / interactivo. Estado: NECESITA TRABAJO para generalizar (contenido baked en `manifesto.js`).
- Recomendación: TEMPLATE / OPEN-SOURCE — pero solo el MOTOR vacío, nunca el texto cultural.
- Ángulo: "WebAR markerless-friendly sin pipeline de modelos 3D" es una combinación rara; audiencia dev/creative-tech.
- Correccion de estado: el `.mind` target SÍ existe (`public/assets/target/wenu-card.mind`); la suposición previa de que faltaba está desactualizada. Build/live no verificado.
- Flag ético: open-sourcear el skeleton (arrays LEVELS/FORCES vacíos en un demo genérico); NO enviar la cosmología mapuche como "tema/template".
- Esfuerzo: L.

### Notas de seguridad (bloque B)
- No se vieron valores de claves hardcodeados en agent-hub ni platform; los "hits" son regex de detección. Todo carga de `.env` vía dotenv.
- Antes de compartir cualquier repo: asegurar que `.env` no viaje, y limpiar rutas absolutas cableadas (`~/wenu-agent-hub/.env`, `/Volumes/LaCie/...`, Chrome path). Nunca imprimir valores de secretos.
- Menor prioridad open-source (materia prima muy acoplada al negocio): `scripts/sync-noco-to-woo.mjs` (patrón NocoDB→WooCommerce), generadores `generate-spec-card.mjs`/`generate-collection-banner.mjs` (SVG→sharp), `classify-routes.mjs` (triage foto→producto human-in-the-loop), Catálogo Vivo. Sirven mejor como casos/posts que como libs.

---

## (C) Conocimiento & prompts — publicar

### C1 · Guía "Efectos web livianos en mobile"
- Ubicación: `/Users/user1/Obsidian/WenuAgent/estrategia/efectos-livianos-mobile-wenu.md`
- Qué es: guía de ingeniería front-end (performance de animación en móviles gama baja): presupuesto de frame, patrón canvas/rAF, device-tiering, checklist de PR, ~10 fuentes citadas.
- Formato: guía técnica. Estado: LISTO.
- Recomendación: PUBLICAR (blog técnico / dev.to / gist). Quitar solo la línea final de tokens internos.
- Ángulo: dev que hace sitios "Awwwards" sin matar teléfonos baratos. Genérico, no expone nada de Wenu.
- Esfuerzo: S.

### C2 · Guía de cliente "Ear Stretching"
- Ubicación: `/Users/user1/Obsidian/WenuAgent/brand/contenido-guia-ear-stretching-2026-06-23.md`
- Qué es: guía de cliente para estiramiento de lóbulo (reglas de oro, tabla de gauge, materiales, blowouts), tono responsable, sin claims médicos.
- Formato: guía / página web lista. Estado: LISTO.
- Recomendación: PUBLICAR (página `/ear-stretching` + reciclar a IG/journal).
- Ángulo: clientes de piercing/stretching; educa y convierte. Provenance limpio (APP-standard, autor piercer real).
- Esfuerzo: S.

### C3 · Base de conocimiento — joyería de piercing ("Body jewelry 101")
- Ubicación: `/Users/user1/Obsidian/WenuAgent/brand/01-identity/conocimiento-joyeria-piercing.md`
- Qué es: referencia de dominio (placement→joya, gauge, threading, materiales). Fundada en APP / BodyArtForms / saber del fundador.
- Formato: guía de referencia. Estado: MATERIA PRIMA → NECESITA TRABAJO (escrita "para agentes/NocoDB").
- Recomendación: REGALAR / PUBLICAR (reeditar como guía pública para lector humano).
- Ángulo: clientes nuevos + SEO fuerte de nicho.
- Esfuerzo: M.

### C4 · KODEX−∞ — manifiesto + fórmula + geometría (cuerpo de arte/filosofía)
- Ubicación: [[estrategia/manifiesto-arqueofuturismo-ritual-2026-07-24]] · [[estrategia/kodex-sistema-madre-2026-07-24]] · [[estrategia/kodex-formula-maestra-2026-07-24]] · [[estrategia/kodex-geometria-retorno-2026-07-24]]
- Qué es: manifiesto artístico (5 principios, eje −∞→0→+∞) + el "método creativo" formalizado (mapa de tres territorios, fórmulas con notación matemática, teorema del retorno).
- Formato: ensayo / obra conceptual. Estado: LISTO como texto; MATERIA PRIMA como microsite.
- Recomendación: PUBLICAR (portal KODEX + ensayo largo; posible zine/PDF).
- Ángulo: posiciona a Ocin como artista-pensador. Doble lectura declarada: "entra por lo espiritual, descubre dominio de diseño/sistemas". Diferenciador de portafolio fuerte.
- Nota de honestidad: filosofía especulativa original de Ocin — publicar como arte y pensamiento, no como afirmación científica o cultural. Los docs manejan bien esa separación.
- Esfuerzo: S-M (texto) / L (microsite).

### C5 · KODEX y Cosmología — "Colapso Luminoso"
- Ubicación: `/Users/user1/Obsidian/WenuAgent/estrategia/kodex-cosmologia-astronomia-2026-07-24.md`
- Qué es: traducción del eje KODEX a astrofísica real, separando ciencia de símbolo; incluye sección "EVITAR" (no vender pseudociencia con glitter).
- Formato: ensayo / guía visual. Estado: LISTO (texto).
- Recomendación: PUBLICAR. Auto-consciente de su ética; distingue lo demostrado de lo simbólico.
- Esfuerzo: S-M.

### C6 · Canon de 64 sistemas — atlas genealógico  (revisión editorial obligatoria)
- Ubicación: [[estrategia/kodex-canon-64-sistemas-2026-07-24]]
- Qué es: atlas comparado de 64 sistemas humanos de codificación (mandala, kültrung, khipu, Ifá, nsibidi, código genético, Voyager…) + 12 formas primitivas propias.
- Formato: ensayo/atlas. Estado: NECESITA TRABAJO.
- Recomendación: PUBLICAR con revisión editorial cuidadosa.
- Flag ético (importante): el doc ya incluye su "REGLA ÉTICA FUNDAMENTAL" (no Frankenstein sagrado; "aprender de la relación, no saquear el símbolo" para culturas vivas/restringidas: kültrung, Ifá, nsibidi, Diné, wampum). Antes de publicar verificar que esa separación quede VISIBLE en la versión pública; el riesgo es que una versión "linda para web" recorte esa parte.
- Esfuerzo: M.

### C7 · Guía "Cómo hice una mascota pixel-art con IA"
- Ubicación: `/Users/user1/wenu-kai/KAI_FRAME_PROMPTS.md` + `KAI_PIXEL_ART_BRIEF.md`
- Qué es: método reproducible de consistencia img2img (prompts por frame) + template completo de character-bible / brief de comisión.
- Formato: texto. Estado: MATERIA PRIMA (contenido fuerte, falta editar a post).
- Recomendación: PUBLICAR (blog/newsletter/Gumroad) con el pack de sprites A7 como imán.
- Ángulo: ángulo AI-art oportuno; drive de tráfico a la tienda.
- Esfuerzo: S-M.

### C8 · Wenu Content Operating System
- Ubicación: `/Users/user1/Obsidian/WenuAgent/contenido/content-operating-system-2026-07-23.md`
- Qué es: sistema de producción de contenido para creador solo — carpetas, naming, shot-lists, checklists, biblioteca de CTA, scoring, reciclaje.
- Formato: template / playbook. Estado: LISTO (usable).
- Recomendación: TEMPLATE-PRESET / PUBLICAR ("content OS para makers"). Neutralizar la sección de CTAs con sabor Wenu.
- Ángulo: creadores/marcas de una persona; genérico y reusable.
- Esfuerzo: S-M.

### C9 · Modelo de equipo agéntico "empresa de uno"
- Ubicación: [[00-Index/WenuOS-Equipo-Agentico]]
- Qué es: blueprint de cómo una persona opera como compañía completa con subagentes + cron + "cerebro" CLAUDE.md, con 8 reglas duras (fuente única, no-IA-en-runtime, deploy serializado, provenance honesto).
- Formato: ensayo / case-study. Estado: NECESITA TRABAJO (muy específico de Wenu).
- Recomendación: PUBLICAR como case-study anonimizado ("cómo corro mi negocio con un equipo de agentes"). Tema muy demandado.
- Ángulo: solopreneurs / gente de IA. El modelo es lo valioso, no la infra concreta.
- Esfuerzo: M.

### C10 · Skill — scraper de órdenes AliExpress
- Ubicación: `/Users/user1/Obsidian/WenuAgent/00-Skills/skill-aliexpress-orders-scraper.md`
- Qué es: playbook reproducible (JS de extracción + clasificador jewelry/non + trampas) para recuperar historial de compras y calcular margen. Único "skill" real de la carpeta.
- Formato: skill / tutorial. Estado: NECESITA TRABAJO (contiene nombres de proveedores reales).
- Recomendación: REGALAR / PUBLICAR como tutorial tras QUITAR la tabla de suppliers.
- Ángulo: vendedores e-commerce que calculan cost/margin.
- Esfuerzo: M.

### C11 · Manual de marca PRO (case-study de sistema de marca ritual-oscuro)
- Ubicación: `/Users/user1/Obsidian/WenuAgent/brand/manual-de-marca-pro-2026-06-21.md`
- Qué es: "la ley" dark-first — tipografía (4 familias/1 rol), color (oro único acento), espaciado, sistema claro/oscuro. Filosofía "Apple con chamán".
- Formato: brand-system / template. Estado: NECESITA TRABAJO (mezcla ley con hallazgos de audit interno).
- Recomendación: TEMPLATE-PRESET / PUBLICAR como mini case-study. Separar "la ley" (publicable) del "audit" (interno).
- Ángulo: diseñadores/marcas pequeñas que buscan coherencia sin agencia.
- Esfuerzo: M.

### NO-PUBLICAR — prompts y material interno
- `prompts-arquitecto.md` / `prompts-ingeniero.md`: prompt-pack genérico de baja calidad, con texto corrupto (caracteres chinos incrustados, typos). No publicar tal cual; hay packs mejores en el mundo. Baja prioridad.
- `prompt-maestro.md` + [[00-Index/PROMPT-MAESTRO-WENU-100-OPERATIVO]]: system-prompt operativo interno (expone rutas, SKUs, credenciales-por-nombre, estado del negocio). NO publicar crudo; su lección de "provenance honesto / verificar en vivo" alimenta el case-study C9.
- `BRAND-DNA.md` / `voz-de-marca.md` / `copy-frontend.md`: fuente de verdad de marca con datos operativos (teléfono, email, precios). NO publicar crudo; su metodología destilada alimenta C11.
- `estudio-thewhole-website-2026-07-24.md`: estudio de la obra de otro; referencia interna. El insight técnico pertenece, si acaso, a C1.

---

## (D) Materia prima con potencial

### D1 · KODEX WORLD — motor audiovisual WebGL2
- Ubicación: `/Users/user1/wenu-frontend/src/pages/kodex/world.astro` (+ `src/lib/kodex.js`)
- Qué es: instrumento en vivo — Signal Gate → engine WebGL2 → cadena de efectos (mirror/distort/color/feedback) con lab modular y export.
- Formato: interactivo / código. Estado: NECESITA TRABAJO (Phase 1+2; es un lab, no un producto empaquetado).
- Recomendación: OPEN-SOURCE a mediano plazo (shader-toy / generative-art / VJ tool) o PUBLICAR como demo.
- Ángulo: la parte más técnicamente valiosa; un "VJ/generative lab" open-source posicionaría fuerte al autor. Requiere sacar deps de marca.
- Esfuerzo: L.

### D2 · KODEX "libro digital" (portal/lector códice)
- Ubicación: `/Users/user1/wenu-frontend/src/pages/kodex/index.astro` + `folio/[folio].astro`, `works.astro`, `movement/[key].astro` (engine `src/scripts/kodex-engine.js`, `src/lib/kodexBook.js`, `src/styles/kodex.css`)
- Qué es: experiencia de lectura tipo códice con HUD/scan/glitch, engine propio.
- Formato: interactivo / código. Estado: LISTO como experiencia (desplegado en preview según memoria); NECESITA TRABAJO para desacoplar como template.
- Recomendación: PUBLICAR como pieza de portfolio/arte tal cual; OPEN-SOURCE solo si se generaliza.
- Ángulo: showcase nivel Awwwards que valida el laboratorio.
- Esfuerzo: S (mostrar) / L (template genérico).

### D3 · Pipeline de visión foto→producto + generadores de gráficos
- Ubicación: `/Users/user1/wenu-agent-hub/lib/photo-pipeline.mjs`, `/Users/user1/wenu-platform/src/vitrina-vision.mjs`, `scripts/generate-spec-card.mjs`, `scripts/generate-collection-banner.mjs`
- Qué es: analizador foto→JSON multi-proveedor con few-shot; conteo de piezas en vitrina; generadores SVG→sharp de spec-cards y banners.
- Formato: código + prompts. Estado: MATERIA PRIMA (prompts 100% dominio joyería; rutas/SKUs hardcodeados).
- Recomendación: TEMPLATE-PRESET si se parametriza — patrón "vision-to-structured-JSON" y "gráficos de e-commerce desde datos, sin Canva".
- Ángulo: tiendas pequeñas / catalogación por visión. El patrón es el valor, no el código listo.
- Esfuerzo: L.

### D4 · KODEX disco-solar originals (hi-res)
- Ubicación: `/Volumes/LaCie/Wenu mapu/kodex-disco-solar-originales/`
- Qué es: 11 JPG source hi-res (`disco-01..11`), el arte original detrás del microsite KODEX.
- Formato: imágenes hi-res. Estado: LISTO como arte crudo / MATERIA PRIMA como producto.
- Recomendación: VENDER / PACK — prints, editions numeradas, feature de editions en /kodex.
- Ángulo: arte original listo para print; enchufa al proyecto /kodex existente.
- Esfuerzo: M.

### D5 · Biblioteca 30_MARKETING (LaCie)
- Ubicación: `/Volumes/LaCie/Wenu mapu/30_MARKETING/`
- Qué es: archivo profundo de marketing — banners, gráficos de feed IG, product graphics, variantes de logo (PSD/PDF/SVG/JPEG), template de booklet, renders de modelo, `.CR2` raw, clips `.mp4`. Vintages mezcladas 2021-2026.
- Formato: imágenes / mixed. Estado: MATERIA PRIMA (inconsistente).
- Recomendación: PACK curado — un subconjunto podría volverse pack de templates/presets, pero requiere selección pesada.
- Ángulo: material crudo para repurposing de contenido.
- Esfuerzo: L (gated por curaduría).

### D6 · Vision mockups 2026-07-10 (referencia de build, no venta)
- Ubicación: `/Volumes/LaCie/Wenu mapu/mockups-vision-2026-07-10/`
- Qué es: 10 mockups UI full-page (checkout, PDP lunar-orbit, cart, account portal, book-a-piercing, collections, about, signup, order-confirmation).
- Formato: imágenes (design comps). Estado: MATERIA PRIMA.
- Recomendación: uso interno (spec/referencia de build); a lo sumo portfolio/case-study. No es asset vendible.
- Esfuerzo: —.

### D7 · Kai — motor de poses / prototipos demo
- Ubicación: `/Users/user1/wenu-kai/demo/*.html` (`kai_rig`, `kai_vivo`, `kai_pixel`, `kai_dark`…)
- Qué es: ~10 prototipos HTML de iteración del rig/animación de Kai.
- Formato: código/interactivo. Estado: MATERIA PRIMA (scratch de iteración).
- Recomendación: uno podría limpiarse en una página demo pública del widget B9.
- Esfuerzo: M.
- Nota: los PNG con prefijo `_` en `wenu-kai/` (`_montage*`, `_px_*`, `_pxf_*`, `_eyes_check`…) son renders de test QA, NO deliverables.

---

## DO-NOT-PUBLISH — estrategia / negocio privado

Exponen finanzas, mercado, precios, tácticas o estado real del negocio. Mantener internos:

- `estrategia/informe-financiero-estrategico-2026-07-21.md` — ingresos reales, runway personal.
- `estrategia/foda-estrategia-empresa-2026-06-22.md` — FODA, ~195 SKU, deuda técnica.
- `estrategia/estudio-mercado-2026-06-23.md` — estudio de mercado.
- `estrategia/plan-ofertas-lanzamiento-2026-07.md` — pricing/ofertas.
- `estrategia/modelo-negocio/` (BMC, financiero, roadmap-90d, vision-12m, operacion, glosario-tiers).
- `estrategia/email-marketing-6-meses-2026.md`, `estrategia/plan-contenido-anual-wenu-2026-2027.md`, `estrategia/calendario-editorial-2026.md` — el método (C8/C9) es publicable; los calendarios concretos no.
- `wenu-platform/prisma/schema.prisma` — modelo de datos del negocio (referencia interna).
- Posible excepción: `estrategia/politica-uso-ia-wenu-2026-07-17.md` — una política de transparencia de IA suele ser publicable como declaración de marca. Revisar por separado.

---

## Conteo por categoría

- (A) Productos digitales para regalar/vender: 8 entradas (KODEX archive, ACHROMA/conjuncion, disco solar, tribe/patrones, licencia, Wenu Sigil, Kai sprite pack, portal experience).
- (B) Repos & herramientas open-source: 10 entradas (pipeline imágenes, security.ts, perceptual-hash, providers LLM, emails, technical-sheet, obsidian-memory, gemini-image, Kai widget, WebAR skeleton).
- (C) Conocimiento & prompts publicar: 11 entradas + bloque NO-PUBLICAR.
- (D) Materia prima con potencial: 7 entradas.

## Recomendación de secuencia de lanzamiento

1. Semana 1 (esfuerzo S, todo LISTO): Wenu Sigil pack, guía efectos livianos, guía ear-stretching, manifiesto arqueofuturismo, y publicar los 3 micro-tools (clean-images/gen-avif, security.ts, perceptual-hash) en un repo "wenu-tools".
2. Semana 2: zippear + hospedar los packs KODEX (regalar el archive) + guía Kai con pack gratis.
3. Semana 3-4 (esfuerzo M): sistema de emails open-source, technical-sheet template, case-study "empresa de uno" (C9), edition print de conjuncion / disco solar.

<!-- wenu-backlinks -->
---
Enlaces: [[Home]] · [[00-Index/WenuOS-Equipo-Agentico]] · [[estrategia/kodex-sistema-madre-2026-07-24]] · [[project_kodex_microsite]]
