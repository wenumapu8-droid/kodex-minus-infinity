#!/usr/bin/env node
/**
 * KODEX-∞ · BANCO DE FOTOCOPIA APLICADO A LA LIBRERÍA
 *
 * El banco (`scripts/lamina/` en el sitio) mide una lámina contra su
 * referencia. Esto es el mismo banco apuntando a la librería: renderiza un
 * TABLERO con todas las primitivas a valores fijos y semilla fija, lo captura,
 * y lo compara celda por celda contra una línea base guardada en
 * `tests/baseline/`.
 *
 * Por qué existe: la geometría de estas primitivas está calibrada contra las
 * láminas reales (ver docs/CALIBRATION.md). Cada constante — la razón 0,93 de
 * los anillos, el desfase asimétrico de las agujas, los anchos irregulares de
 * la barra — costó horas de medición y ninguna se defiende sola leyendo el
 * código: un cambio "porque se ve mejor" pasa una revisión humana sin ruido.
 * Lo único que lo atrapa es un número. Este script es ese número.
 *
 * Dos capas de medición, distintas y complementarias:
 *
 *  1. DERIVA contra la línea base. Responde "¿cambió el dibujo?". Es barata,
 *     corre sin las referencias a mano y es la que se ejecuta siempre.
 *  2. FIDELIDAD contra `reference/canon/*.png`. Responde "¿cambió a peor?".
 *     Requiere las referencias y una caja medida por celda; se salta sola si
 *     no están. Es la que sostiene la afirmación de que la librería reproduce
 *     las láminas, y no solamente que reproduce su propia captura de ayer.
 *
 * La capa 1 sin la capa 2 congela cualquier estado, incluido uno malo. La capa
 * 2 sin la capa 1 no ve las primitivas que todavía no tienen caja medida. Por
 * eso van las dos.
 *
 * Uso:
 *   node scripts/regression.mjs                  medir contra la línea base
 *   node scripts/regression.mjs --update         regrabar la línea base
 *   node scripts/regression.mjs --solo waveform  una sola celda
 *   node scripts/regression.mjs --umbral 0.5     tolerancia por celda, en %
 *
 * Códigos de salida:  0 sin regresión · 1 regresión · 2 no se pudo medir.
 */

import { createRequire } from "node:module";
import { createReadStream, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { createServer } from "node:http";
import { dirname, extname, join, normalize } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const AQUI = dirname(fileURLToPath(import.meta.url));
const PAQUETE = join(AQUI, "..");
const BASE = join(PAQUETE, "tests", "baseline");
const SALIDA = join(PAQUETE, "tests", "regression-out");

const arg = (nombre, def) => {
  const i = process.argv.indexOf(nombre);
  return i > -1 ? process.argv[i + 1] : def;
};
const flag = (nombre) => process.argv.includes(nombre);

const ACTUALIZAR = flag("--update");
const SOLO = arg("--solo", null);
const PUERTO = Number(arg("--puerto", 4288));

/**
 * Tolerancias, en porcentaje de píxeles distintos dentro de la celda.
 *
 * 0,30 % no es un número redondo elegido a ojo: por debajo de eso las
 * diferencias que aparecen son de rasterizado (una curva que cae medio píxel
 * distinto según la versión de Chromium), y un banco que se queja del
 * rasterizado se apaga a la semana. Por encima, ya cambió el dibujo.
 */
const UMBRAL_CELDA = Number(arg("--umbral", 0.3));
/** Cuánto puede empeorar la fidelidad contra la referencia antes de fallar. */
const UMBRAL_FIDELIDAD = Number(arg("--umbral-fidelidad", 0.5));

/** Igual que el banco del sitio: mismos parámetros = puntajes comparables. */
const PIXELMATCH = { threshold: 0.12, includeAA: false };

// ── dependencias: se toman prestadas del banco, no se agregan al paquete ────
// La librería no tiene node_modules y no debería tenerlos por un test: son
// ~300 MB de navegador para un paquete de SVG sin dependencias de runtime.
// Se resuelven contra la instalación del sitio, que ya tiene el banco entero.
const RAICES = [
  process.env.KODEX_BANCO,
  PAQUETE,
  process.env.KODEX_WORK ?? "/Users/galvazincia/kodex-work",
].filter(Boolean);

function resolverBanco() {
  for (const raiz of RAICES) {
    try {
      const req = createRequire(join(raiz, "package.json"));
      req.resolve("playwright");
      req.resolve("pixelmatch");
      req.resolve("pngjs");
      return { req, raiz };
    } catch {
      /* probar la siguiente raíz */
    }
  }
  return null;
}

const banco = resolverBanco();
if (!banco) {
  console.error(`
  No se encontraron playwright / pixelmatch / pngjs.

  No son dependencias de este paquete a propósito: se usan las del banco de
  fotocopia. Buscadas en:
${RAICES.map((r) => `    ${r}`).join("\n")}

  Apuntá a la instalación correcta con KODEX_WORK=/ruta/al/sitio.
`);
  process.exit(2);
}

// Se importan por ruta resuelta, no por nombre: el paquete no las tiene y un
// import por nombre fallaría antes de poder explicar por qué. Los tres son CJS
// vistos desde ESM, así que la exportación puede venir en `default`.
const modulo = (nombre) => import(pathToFileURL(banco.req.resolve(nombre)).href);
const pw = await modulo("playwright");
const chromium = pw.chromium ?? pw.default?.chromium;
const pm = await modulo("pixelmatch");
const pixelmatch = typeof pm.default === "function" ? pm.default : pm;
const png = await modulo("pngjs");
const PNG = png.PNG ?? png.default?.PNG;
if (!chromium || !PNG || typeof pixelmatch !== "function") {
  console.error(`\n  el banco resolvió desde ${banco.raiz} pero las exportaciones no son las esperadas\n`);
  process.exit(2);
}

/** Dónde viven las láminas originales, para la capa de fidelidad. */
const REFERENCIAS =
  process.env.KODEX_REFERENCES ??
  join(process.env.KODEX_WORK ?? "/Users/galvazincia/kodex-work", "reference", "canon");

// ── el tablero ──────────────────────────────────────────────────────────────
/**
 * Una celda por primitiva, a valores fijos y semilla fija.
 *
 * `dibujo` es código que corre EN LA PÁGINA con `K` = el módulo de la
 * librería; devuelve el nodo a montar. `montar` es opcional y corre después de
 * insertarlo (lo necesita el canvas, que se pinta contra su caja ya medida).
 *
 * Convención: las celdas se AGREGAN AL FINAL. El empaquetado es por estantes en
 * orden, así que insertar una en el medio corre las cajas de todas las que
 * siguen y obliga a regrabar la línea base entera — que es justo la operación
 * que este script existe para desalentar.
 *
 * `ref` es opcional: cuando una celda tiene su caja medida sobre una lámina
 * real, se mide también la fidelidad. Ver docs/CALIBRATION.md para cómo se
 * saca esa caja (detect-regions → paneles → score-panel).
 */
const CELDAS = [
  { id: "journey-field", w: 1180, h: 520, dibujo: `K.journeyField({ title: "MEMORY CONVERGENCE", routes: 21 })` },
  { id: "signal-gauge", w: 300, h: 200, dibujo: `K.signalGauge({ value: 93, label: "COHERENCE" })` },
  { id: "waveform", w: 720, h: 140, dibujo: `K.waveform({ points: 72, amplitude: 32, seed: 8 })` },
  { id: "radial-scanner", w: 400, h: 400, dibujo: `K.radialScanner({ rings: 7, spokes: 16 })` },
  { id: "asset-slot", w: 360, h: 200, dibujo: `K.assetSlot({ label: "3D HEART", kind: "GLB / GLTF + FALLBACK PNG" })` },
  { id: "metric-bars", w: 420, h: 200, dibujo: `K.metricBars({ metrics: [{ label: "SIGNAL INTEGRITY", value: 93.1 }, { label: "COHERENCE", value: 89.4 }, { label: "ENTROPY", value: 76.2 }, { label: "OBSERVABILITY", value: 91.7 }] })` },
  { id: "radial-taxonomy", w: 400, h: 400, dibujo: `K.radialTaxonomy({ groups: 8, items: 64, seed: 18 })` },
  { id: "data-portrait", w: 300, h: 400, dibujo: `K.dataPortrait({ columns: 24, rows: 32, seed: 9 })` },
  { id: "stratigraphy", w: 560, h: 300, dibujo: `K.stratigraphy({ layers: 24, seed: 33 })` },
  { id: "toroidal-field", w: 400, h: 400, dibujo: `K.toroidalField({ lines: 34 })` },
  { id: "glyph-ring", w: 360, h: 360, dibujo: `K.glyphRing({ segments: 28, seed: 21 })` },
  { id: "activity-rings", w: 320, h: 320, dibujo: `K.activityRings()` },
  { id: "spotlight-card", w: 380, h: 240, dibujo: `K.spotlightCard({ eyebrow: "OBSERVER / 08", title: "THE FIELD RESPONDS", copy: "Pointer position becomes signal." })` },
  {
    id: "flow-field",
    w: 480, h: 280,
    dibujo: `K.flowField({ particles: 440, seed: 42 })`,
    // El canvas se pinta contra su caja: hay que montarlo después de insertarlo.
    // Con reducedMotion en "reduce" mountFlowField dibuja UN cuadro y no pide
    // rAF, así que la captura es reproducible sin congelar nada a mano.
    montar: `K.mountFlowField(nodo, { particles: 440, seed: 42 })`,
  },

  // ── primitivas calibradas portadas del kit de lámina ──────────────────────
  // Estas van a su TAMAÑO NATURAL, no a una caja cómoda: el SVG llena su celda,
  // así que una celda de otra proporción las estira y el banco terminaría
  // midiendo un escalado en vez de la geometría medida. 179×115 es el tamaño
  // real del DEPTH GRAPH en la lámina, y por eso el gráfico se mide ahí.
  {
    id: "ring-gauge", w: 140, h: 140,
    dibujo: `K.ringGauge({ d: 140, thickness: 26, gap: 3, rest: "currentColor", segments: [{ value: 42, color: "var(--kx-signal)" }, { value: 23, color: "var(--kx-signal-hot)" }, { value: 11, color: "var(--kx-warning)" }] })`,
  },
  { id: "bar-meter", w: 320, h: 10, dibujo: `K.barMeter({ width: 320, height: 10, value: 63, seed: 3 })` },
  {
    id: "step-graph", w: 179, h: 115,
    dibujo: `K.stepGraph({ width: 179, height: 115, seed: 5, fill: "rgba(169,92,255,.22)", labelsX: ["0", "1", "2", "3"], labelsY: ["0", "-1", "-2"] })`,
  },
  { id: "micrografia", w: 180, h: 90, dibujo: `K.micrografia({ width: 180, height: 90, seed: 11 })` },
  { id: "waveform-comb", w: 320, h: 60, dibujo: `K.waveform({ width: 320, height: 60, variant: "comb", seed: 8 })` },
  { id: "waveform-bars", w: 320, h: 60, dibujo: `K.waveform({ width: 320, height: 60, variant: "bars", seed: 8 })` },
];

/**
 * Geometría calibrada que existe medida en el kit del sitio y todavía no está
 * en la librería.
 *
 * Se lista acá y no como celda para que el tablero no falle por algo que aún no
 * existe, pero tampoco desaparezca de la vista: mientras haya algo en esta
 * lista, la librería no cubre la geometría medida completa. Al portar una
 * pieza se la mueve a CELDAS —al final— y se regraba la línea base.
 *
 * Vacía hoy: el kit está portado entero. Se llena sola la próxima vez que una
 * lámina deje una constante nueva.
 */
const PENDIENTES = [];

const ANCHO = 1280;
const PAD = 20;
const HUECO = 20;

/** Empaquetado por estantes: determinista, y en el mismo orden de CELDAS. */
function empaquetar(celdas) {
  let x = PAD;
  let y = PAD;
  let altoFila = 0;
  const cajas = [];
  for (const c of celdas) {
    if (c.w > ANCHO - PAD * 2) {
      console.error(`  la celda "${c.id}" (${c.w}px) no entra en el tablero de ${ANCHO}px`);
      process.exit(2);
    }
    if (x + c.w > ANCHO - PAD) {
      x = PAD;
      y += altoFila + HUECO;
      altoFila = 0;
    }
    cajas.push({ ...c, x, y });
    x += c.w + HUECO;
    altoFila = Math.max(altoFila, c.h);
  }
  return { cajas, alto: y + altoFila + PAD };
}

const { cajas, alto: ALTO } = empaquetar(CELDAS);
const huella = (c) => createHash("sha256").update(`${c.dibujo}|${c.montar ?? ""}|${c.w}x${c.h}`).digest("hex").slice(0, 12);

// ── la página ───────────────────────────────────────────────────────────────
/**
 * Tres decisiones que hacen que la captura sea repetible:
 *
 *  · Tipografía local explícita. tokens.css pide "IBM Plex Mono", que no está
 *    instalada; sin fijar el respaldo, la misma página cae en fuentes distintas
 *    según la máquina y el diff mide la fuente en vez del dibujo.
 *  · Fondo plano. El fondo con retícula de la galería es lindo y suma diferencia
 *    de ninguna primitiva.
 *  · Nada de motion.js. Las animaciones se apagan por `reducedMotion`, no
 *    porque nadie las llame: así queda probado que las primitivas se ven bien
 *    con movimiento reducido, que es como las ve parte del público.
 */
function paginaTablero() {
  const datos = JSON.stringify(cajas.map(({ id, x, y, w, h, dibujo, montar }) => ({ id, x, y, w, h, dibujo, montar: montar ?? null })));
  return `<!doctype html>
<meta charset="utf-8">
<title>KODEX visual library · tablero de regresión</title>
<link rel="stylesheet" href="/src/tokens.css">
<link rel="stylesheet" href="/gallery/styles.css">
<style>
  :root { --kx-mono: ui-monospace, Menlo, "DejaVu Sans Mono", monospace; }
  html, body { margin: 0; padding: 0; background: var(--kx-void); background-image: none; }
  body { width: ${ANCHO}px; height: ${ALTO}px; position: relative; overflow: hidden; }
  .celda { position: absolute; overflow: hidden; background: var(--kx-void); border: 0; display: grid; }
  .celda > * { width: 100%; height: 100%; min-height: 0; margin: 0; }
  .celda .kx-svg { width: 100%; height: 100%; }
</style>
<body>
<script type="module">
  import * as K from "/src/index.js";
  const CELDAS = ${datos};
  const medidas = [];
  for (const c of CELDAS) {
    const caja = document.createElement("div");
    caja.className = "celda";
    caja.id = "celda-" + c.id;
    caja.style.cssText = \`left:\${c.x}px;top:\${c.y}px;width:\${c.w}px;height:\${c.h}px\`;
    document.body.append(caja);
    const nodo = new Function("K", "return (" + c.dibujo + ")")(K);
    caja.append(nodo);
    if (c.montar) new Function("K", "nodo", c.montar)(K, nodo);
    const r = caja.getBoundingClientRect();
    medidas.push({ id: c.id, x: r.x, y: r.y, w: r.width, h: r.height });
  }
  // Paridad con el banco del sitio: compare.mjs llama a este gancho antes de
  // capturar. Acá no hay nada corriendo que congelar, y así sigue siendo.
  window.__kdxFreeze = () => {};
  window.__kdxCeldas = medidas;
  window.__kdxListo = true;
</script>
`;
}

// ── servidor ────────────────────────────────────────────────────────────────
const TIPOS = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".json": "application/json", ".svg": "image/svg+xml" };
const html = paginaTablero();
const servidor = createServer((req, res) => {
  const ruta = (req.url ?? "/").split("?")[0];
  if (ruta === "/" || ruta === "/__tablero.html") {
    res.writeHead(200, { "Content-Type": "text/html" }).end(html);
    return;
  }
  const archivo = normalize(join(PAQUETE, ruta));
  if (!archivo.startsWith(PAQUETE) || !existsSync(archivo)) {
    res.writeHead(404).end("no está");
    return;
  }
  res.writeHead(200, { "Content-Type": TIPOS[extname(archivo)] ?? "application/octet-stream" });
  createReadStream(archivo).pipe(res);
});
await new Promise((r) => servidor.listen(PUERTO, "127.0.0.1", r));

// ── captura ─────────────────────────────────────────────────────────────────
/**
 * deviceScaleFactor 1 y viewport exacto, igual que compare.mjs: capturar a 2x y
 * reescalar mete diferencia de resampleo y el puntaje deja de medir el diseño.
 */
let navegador;
try {
  navegador = await chromium.launch();
} catch (e) {
  await new Promise((r) => servidor.close(r));
  console.error(`
  Chromium no arrancó: ${e.message.split("\n")[0]}

  Si falta el navegador:  cd ${banco.raiz} && npx playwright install chromium
`);
  process.exit(2);
}
const contexto = await navegador.newContext({
  viewport: { width: ANCHO, height: ALTO },
  deviceScaleFactor: 1,
  reducedMotion: "reduce",
  colorScheme: "dark",
});
const pagina = await contexto.newPage();
const fallos = [];
pagina.on("pageerror", (e) => fallos.push(String(e.message)));
pagina.on("console", (m) => m.type() === "error" && fallos.push(m.text()));

await pagina.goto(`http://127.0.0.1:${PUERTO}/__tablero.html`, { waitUntil: "load" });
try {
  await pagina.waitForFunction("window.__kdxListo === true", null, { timeout: 15000 });
} catch {
  await navegador.close();
  await new Promise((r) => servidor.close(r));
  console.error(`\n  el tablero no terminó de montarse:\n${fallos.map((f) => `    ${f}`).join("\n") || "    (sin errores en consola)"}\n`);
  process.exit(2);
}
await pagina.evaluate(() => window.__kdxFreeze(0));

// Las cajas reales de la página son la verdad; si no coinciden con las
// calculadas, algo del CSS movió el tablero y todas las comparaciones estarían
// midiendo un desplazamiento. Mejor detenerse que reportar quince regresiones.
const medidas = await pagina.evaluate(() => window.__kdxCeldas);
const desfase = medidas.filter((m, i) => Math.abs(m.x - cajas[i].x) > 0.5 || Math.abs(m.y - cajas[i].y) > 0.5 || Math.abs(m.w - cajas[i].w) > 0.5 || Math.abs(m.h - cajas[i].h) > 0.5);
if (desfase.length) {
  await navegador.close();
  await new Promise((r) => servidor.close(r));
  console.error(`\n  el CSS movió las celdas respecto del empaquetado: ${desfase.map((d) => d.id).join(", ")}\n`);
  process.exit(2);
}

const captura = await pagina.screenshot({ clip: { x: 0, y: 0, width: ANCHO, height: ALTO }, animations: "disabled" });
const versionChromium = navegador.version();
await navegador.close();
await new Promise((r) => servidor.close(r));

if (fallos.length) {
  console.error(`\n  errores en la página (la captura puede estar incompleta):\n${fallos.map((f) => `    ${f}`).join("\n")}\n`);
  process.exit(2);
}

const actual = PNG.sync.read(captura);
mkdirSync(SALIDA, { recursive: true });
writeFileSync(join(SALIDA, "tablero.png"), captura);

// ── comparación ─────────────────────────────────────────────────────────────
const rutaBase = join(BASE, "board.png");
const rutaManifiesto = join(BASE, "board.json");
const rutaFidelidad = join(BASE, "fidelity.json");
const hayBase = existsSync(rutaBase) && existsSync(rutaManifiesto);

/** Recorta una caja de un PNG. */
function recortar(png, { x, y, w, h }) {
  const out = new PNG({ width: w, height: h });
  PNG.bitblt(png, out, x, y, w, h, 0, 0);
  return out;
}

/** Diferencia dos recortes del mismo tamaño. Devuelve % y el mapa. */
function diferencia(a, b) {
  const d = new PNG({ width: a.width, height: a.height });
  const malos = pixelmatch(a.data, b.data, d.data, a.width, a.height, PIXELMATCH);
  return { pct: (malos / (a.width * a.height)) * 100, malos, mapa: d };
}

/** Tríptico línea base | actual | diff, que es lo único que dice hacia dónde corregir. */
function triptico(a, b, d, destino) {
  const { width: w, height: h } = a;
  const t = new PNG({ width: w * 3 + 16, height: h });
  for (let i = 3; i < t.data.length; i += 4) t.data[i] = 255;
  PNG.bitblt(a, t, 0, 0, w, h, 0, 0);
  PNG.bitblt(b, t, 0, 0, w, h, w + 8, 0);
  PNG.bitblt(d, t, 0, 0, w, h, w * 2 + 16, 0);
  mkdirSync(dirname(destino), { recursive: true });
  writeFileSync(destino, PNG.sync.write(t));
}

const manifiesto = {
  _nota: "Generado por scripts/regression.mjs. La línea base se regraba a propósito, nunca de paso: ver docs/CALIBRATION.md.",
  generado: new Date().toISOString(),
  entorno: { node: process.version, plataforma: process.platform, chromium: versionChromium },
  tablero: { ancho: ANCHO, alto: ALTO, pad: PAD, hueco: HUECO },
  umbrales: { celda: UMBRAL_CELDA, fidelidad: UMBRAL_FIDELIDAD, pixelmatch: PIXELMATCH },
  celdas: cajas.map((c) => ({ id: c.id, x: c.x, y: c.y, w: c.w, h: c.h, huella: huella(c), dibujo: c.dibujo, ref: c.ref ?? null })),
  pendientes: PENDIENTES.map(([id, nota]) => ({ id, nota })),
};

if (!hayBase || ACTUALIZAR) {
  mkdirSync(BASE, { recursive: true });
  writeFileSync(rutaBase, captura);
  writeFileSync(rutaManifiesto, JSON.stringify(manifiesto, null, 2));
  const fid = medirFidelidad(actual, cajas);
  if (fid.length) {
    writeFileSync(
      rutaFidelidad,
      JSON.stringify(
        {
          _nota: "Fidelidad medida contra reference/canon/*.png. Un número que SUBE es una pérdida de calibración; no se regraba para 'ponerlo en verde'.",
          generado: manifiesto.generado,
          celdas: Object.fromEntries(fid.map((f) => [f.id, +f.pct.toFixed(3)])),
        },
        null,
        2
      )
    );
  }
  console.log(`\n  línea base ${hayBase ? "REGRABADA" : "creada"} · ${cajas.length} celdas · ${ANCHO}×${ALTO}`);
  console.log(`  → tests/baseline/board.png`);
  if (hayBase) {
    console.log(`
  Recordá por qué esto es delicado: la línea base es el estado calibrado. Si se
  regraba sin volver a medir contra reference/canon, el banco pasa a certificar
  el dibujo nuevo y la calibración se pierde sin dejar rastro.`);
  }
  console.log();
  process.exit(0);
}

const base = PNG.sync.read(readFileSync(rutaBase));
const previo = JSON.parse(readFileSync(rutaManifiesto, "utf8"));
const previas = new Map(previo.celdas.map((c) => [c.id, c]));

const filas = [];
for (const c of cajas) {
  if (SOLO && c.id !== SOLO) continue;
  const antes = previas.get(c.id);
  if (!antes) {
    filas.push({ id: c.id, estado: "NUEVA", detalle: "no está en la línea base — regrabá con --update" });
    continue;
  }
  if (antes.w !== c.w || antes.h !== c.h) {
    filas.push({ id: c.id, estado: "GEOMETRÍA", detalle: `la celda pasó de ${antes.w}×${antes.h} a ${c.w}×${c.h}` });
    continue;
  }
  if (antes.huella !== huella(c)) {
    filas.push({ id: c.id, estado: "PARÁMETROS", detalle: "cambió la llamada del tablero, no la primitiva — el número no es comparable" });
    continue;
  }
  const a = recortar(base, antes);
  const b = recortar(actual, c);
  const { pct, mapa } = diferencia(a, b);
  const mal = pct > UMBRAL_CELDA;
  if (mal) triptico(a, b, mapa, join(SALIDA, "celdas", `${c.id}.png`));
  filas.push({ id: c.id, estado: mal ? "DERIVA" : "ok", pct });
}

for (const c of previo.celdas) {
  if (!cajas.some((x) => x.id === c.id) && (!SOLO || SOLO === c.id)) {
    filas.push({ id: c.id, estado: "FALTA", detalle: "estaba en la línea base y ya no está en el tablero" });
  }
}

// ── capa 2 · fidelidad contra las láminas reales ────────────────────────────
/**
 * Mide cada celda que tenga caja medida contra el recorte de su lámina.
 *
 * Sin esto el banco solo sabe si el dibujo cambió. Con esto sabe si cambió a
 * peor, que es la pregunta. Se salta sola cuando no hay referencias montadas:
 * un banco que no corre sin el repo del sitio al lado no lo corre nadie.
 */
function medirFidelidad(png, celdas) {
  const out = [];
  for (const c of celdas) {
    if (!c.ref) continue;
    const ruta = join(REFERENCIAS, `${c.ref.slug}.png`);
    if (!existsSync(ruta)) {
      out.push({ id: c.id, ausente: `no está ${ruta}` });
      continue;
    }
    const { x, y, w, h } = c.ref.caja;
    if (w !== c.w || h !== c.h) {
      out.push({ id: c.id, ausente: `la caja medida es ${w}×${h} y la celda ${c.w}×${c.h}: no son comparables` });
      continue;
    }
    const lamina = PNG.sync.read(readFileSync(ruta));
    const ref = recortar(lamina, { x, y, w, h });
    const mio = recortar(png, c);
    const { pct, mapa } = diferencia(ref, mio);
    triptico(ref, mio, mapa, join(SALIDA, "fidelidad", `${c.id}.png`));
    out.push({ id: c.id, pct, slug: c.ref.slug });
  }
  return out;
}

const fidelidad = medirFidelidad(actual, SOLO ? cajas.filter((c) => c.id === SOLO) : cajas);
const registro = existsSync(rutaFidelidad) ? JSON.parse(readFileSync(rutaFidelidad, "utf8")).celdas ?? {} : {};
const peorFidelidad = [];
for (const f of fidelidad) {
  if (f.ausente || registro[f.id] === undefined) continue;
  if (f.pct - registro[f.id] > UMBRAL_FIDELIDAD) peorFidelidad.push({ ...f, antes: registro[f.id] });
}

// ── informe ─────────────────────────────────────────────────────────────────
const barra = (p) => "█".repeat(Math.min(30, Math.round(p * 10))).padEnd(30, "·");
console.log(`\n  TABLERO ${ANCHO}×${ALTO} · ${cajas.length} celdas · umbral ${UMBRAL_CELDA}% · chromium ${versionChromium}\n`);
for (const f of filas) {
  if (f.estado === "ok" || f.estado === "DERIVA") {
    const marca = f.estado === "ok" ? "  " : "!!";
    console.log(`  ${marca} ${f.id.padEnd(18)} ${f.pct.toFixed(3).padStart(7)}%  ${barra(f.pct)}`);
  } else {
    console.log(`  !! ${f.id.padEnd(18)} ${f.estado.padEnd(11)} ${f.detalle}`);
  }
}

if (fidelidad.length) {
  console.log(`\n  FIDELIDAD contra reference/canon`);
  for (const f of fidelidad) {
    if (f.ausente) console.log(`     ${f.id.padEnd(18)} (sin medir: ${f.ausente})`);
    else {
      const antes = registro[f.id];
      const nota = antes === undefined ? "sin registro previo" : f.pct > antes ? `EMPEORÓ ${(f.pct - antes).toFixed(2)}` : f.pct < antes ? `mejoró ${(antes - f.pct).toFixed(2)}` : "igual";
      console.log(`     ${f.id.padEnd(18)} ${f.pct.toFixed(2).padStart(6)}%  vs ${f.slug}  (${nota})`);
    }
  }
} else {
  console.log(`\n  FIDELIDAD: ninguna celda tiene caja medida todavía (campo "ref" en CELDAS).`);
  console.log(`  Mientras siga así, esto mide deriva y no fidelidad. Ver docs/CALIBRATION.md.`);
}

if (PENDIENTES.length) {
  console.log(`\n  PENDIENTES de portar desde el kit (no cubiertas por el tablero):`);
  for (const [id, nota] of PENDIENTES) console.log(`     ${id.padEnd(18)} ${nota}`);
}

const rotas = filas.filter((f) => f.estado !== "ok");
if (!rotas.length && !peorFidelidad.length) {
  console.log(`\n  sin regresión.\n`);
  process.exit(0);
}

console.log(`\n  REGRESIÓN\n`);
for (const f of rotas) {
  if (f.estado === "DERIVA") {
    console.log(`    ${f.id}: ${f.pct.toFixed(3)}% de píxeles distintos (umbral ${UMBRAL_CELDA}%)`);
    console.log(`      tests/regression-out/celdas/${f.id}.png   (línea base | actual | diff)`);
  } else {
    console.log(`    ${f.id}: ${f.estado} — ${f.detalle}`);
  }
}
for (const f of peorFidelidad) {
  console.log(`    ${f.id}: la fidelidad contra ${f.slug} empeoró ${f.antes.toFixed(2)}% → ${f.pct.toFixed(2)}%`);
  console.log(`      tests/regression-out/fidelidad/${f.id}.png   (referencia | actual | diff)`);
}
console.log(`
  Si el cambio es deliberado: volvé a medir contra la referencia ANTES de
  regrabar. Regrabar primero y mirar después es exactamente cómo se pierde una
  constante calibrada — el banco pasa a certificar el dibujo nuevo y nadie se
  entera de que la lámina se alejó.
`);
process.exit(1);
