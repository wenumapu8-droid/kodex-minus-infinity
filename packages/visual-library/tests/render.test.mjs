/**
 * El adaptador de render a string es lo que hace medible una lámina Astro SSG:
 * el banco de fotocopia captura el HTML del build, y si la primitiva sólo
 * existe después de hidratar, la captura sale vacía.
 *
 * Estas pruebas cuidan las dos propiedades de las que depende esa medición:
 *
 *  1. El string es una serialización FIEL del árbol del DOM. No hay dos
 *     geometrías; hay una y dos salidas. Se compara el árbol vivo contra el
 *     string parseado con un lector escrito acá, independiente del serializador
 *     que se está probando — si los dos compartieran código, un error de
 *     escapado o de autocierre pasaría inadvertido en ambos.
 *  2. Determinismo byte a byte. Con azar real, dos capturas de la misma página
 *     dan puntajes distintos y el equipo persigue ruido en vez de converger.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import {
  createDocument,
  primitiveRegistry,
  renderPrimitiveToString,
  renderToString,
  serializeNode,
  withDocument
} from "../src/render.js";

const ids = Object.keys(primitiveRegistry);

/* ─────────────────────────── lector independiente ─────────────────────────── */

const decode = (value) => String(value)
  .replace(/&lt;/g, "<")
  .replace(/&gt;/g, ">")
  .replace(/&quot;/g, '"')
  .replace(/&amp;/g, "&");

/**
 * Escáner de caracteres, no de expresiones regulares sobre etiquetas enteras:
 * a propósito no comparte nada con el serializador. Se apoya en que ningún
 * valor de atributo trae un `>` sin escapar — lo cual es, en sí, parte de lo
 * que se está afirmando.
 */
function fromHtml(html) {
  const out = [];
  let cursor = 0;
  while (cursor < html.length) {
    if (html[cursor] !== "<") {
      const next = html.indexOf("<", cursor);
      const end = next === -1 ? html.length : next;
      out.push({ text: decode(html.slice(cursor, end)) });
      cursor = end;
      continue;
    }
    const close = html.indexOf(">", cursor);
    assert.ok(close > cursor, `unterminated tag near: ${html.slice(cursor, cursor + 60)}`);
    const raw = html.slice(cursor + 1, close);
    cursor = close + 1;
    if (raw.startsWith("/")) continue;
    const body = raw.replace(/\/$/, "").trimEnd();
    const space = body.search(/\s/);
    const tag = space === -1 ? body : body.slice(0, space);
    const attrs = {};
    if (space !== -1) {
      const pattern = /([^\s=]+)="([^"]*)"/g;
      let attr;
      while ((attr = pattern.exec(body.slice(space))) !== null) attrs[attr[1]] = decode(attr[2]);
    }
    out.push({ tag, attrs });
  }
  return out;
}

/** El mismo recorrido, leído del árbol vivo en vez del string. */
function fromDom(node, out = []) {
  if (node.nodeType === 3) {
    out.push({ text: node.data });
    return out;
  }
  out.push({ tag: node.tagName, attrs: Object.fromEntries(node.attributes) });
  for (const child of node.childNodes) fromDom(child, out);
  return out;
}

/** Une textos contiguos y descarta los vacíos, en las dos lecturas por igual. */
function normalize(items) {
  const out = [];
  for (const item of items) {
    if (!("text" in item)) { out.push(item); continue; }
    if (!item.text) continue;
    const previous = out[out.length - 1];
    if (previous && "text" in previous) previous.text += item.text;
    else out.push({ text: item.text });
  }
  return out;
}

/* ───────────────────────────────── pruebas ───────────────────────────────── */

test("the registry exposes drawable primitives and no helpers", () => {
  assert.ok(ids.length >= 14, `expected the catalog's primitives, got ${ids.length}`);
  for (const id of ["radial-scanner", "waveform", "data-portrait", "journey-field"]) {
    assert.ok(ids.includes(id), `${id} must be renderable by id`);
  }
  // Reciben un nodo ajeno o montan un runtime: no se dibujan solos.
  for (const helper of ["create-svg", "apply-value-semantics", "mount-flow-field"]) {
    assert.ok(!ids.includes(helper), `${helper} is a helper, not a primitive`);
  }
  assert.throws(() => renderPrimitiveToString("no-such-primitive"), /unknown primitive/);
});

test("every primitive renders to a string with no DOM in scope", () => {
  assert.equal(globalThis.document, undefined, "the suite must start without a document");
  for (const id of ids) {
    const html = renderPrimitiveToString(id);
    assert.ok(html.length > 0, `${id} rendered nothing`);
    assert.ok(html.startsWith("<"), `${id} must render markup, got: ${html.slice(0, 40)}`);
    assert.doesNotMatch(html, /undefined|NaN|\[object /, `${id} leaked a placeholder value`);
  }
  assert.equal(globalThis.document, undefined, "renderToString must not leave a document behind");
});

test("string and DOM carry the same geometry, tag for tag and attribute for attribute", () => {
  for (const id of ids) {
    // Un solo dibujo, dos lecturas: si divergen, es el serializador.
    const { dom, html } = withDocument(() => {
      const node = primitiveRegistry[id]();
      return { dom: normalize(fromDom(node)), html: normalize(fromHtml(serializeNode(node))) };
    });
    assert.deepEqual(html, dom, `${id}: the string is not a faithful reading of the DOM tree`);
    assert.ok(dom[0]?.tag, `${id}: expected an element at the root, got ${JSON.stringify(dom[0])}`);
  }
});

test("the same geometry survives non-default options too", () => {
  const cases = [
    ["radial-scanner", { rings: 9, spokes: 24 }],
    ["waveform", { seed: 4 }],
    ["data-portrait", { columns: 9, rows: 11, seed: 3 }],
    ["journey-field", { routes: 5, title: "RETURN", heart: false }],
    ["metric-bars", { metrics: [{ label: "SIGNAL", value: 61.4 }], simbolico: false }]
  ];
  for (const [id, options] of cases) {
    const { dom, html } = withDocument(() => {
      const node = primitiveRegistry[id](options);
      return { dom: normalize(fromDom(node)), html: normalize(fromHtml(serializeNode(node))) };
    });
    assert.deepEqual(html, dom, `${id} with options diverged between DOM and string`);
  }
});

test("the same seed gives byte-identical markup, a different seed does not", () => {
  for (const id of ids) {
    assert.equal(
      renderPrimitiveToString(id, { seed: 12 }),
      renderPrimitiveToString(id, { seed: 12 }),
      `${id} is not deterministic for a fixed seed`
    );
  }
  // Las primitivas con jitter tienen que reaccionar a la semilla: si dos
  // semillas dieran lo mismo, el "determinismo" sería una constante disfrazada.
  for (const id of ["waveform", "data-portrait", "stratigraphy", "radial-taxonomy"]) {
    assert.notEqual(
      renderPrimitiveToString(id, { seed: 1 }),
      renderPrimitiveToString(id, { seed: 2 }),
      `${id} ignores its seed`
    );
  }
});

test("determinism holds across a fresh module instance, not just a warm one", async () => {
  const first = renderPrimitiveToString("radial-taxonomy", { seed: 7 });
  const reloaded = await import(`../src/render.js?instance=${Date.now()}`);
  assert.equal(reloaded.renderPrimitiveToString("radial-taxonomy", { seed: 7 }), first);
});

/** Los comentarios sí nombran `Math.random` — para prohibirlo. Se miran aparte. */
const stripComments = (source) => source
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .replace(/(^|[^:])\/\/.*$/gm, "$1");

test("no primitive reaches for real randomness", async () => {
  const dir = new URL("../src/", import.meta.url);
  const files = (await readdir(dir, { recursive: true })).filter((name) => name.endsWith(".js"));
  assert.ok(files.length >= 5, "the scan found suspiciously few sources");
  for (const name of files) {
    const code = stripComments(await readFile(new URL(name, dir), "utf8"));
    assert.doesNotMatch(code, /Math\s*\.\s*random/, `${name} uses Math.random; the copy bench cannot converge on it`);
    assert.doesNotMatch(code, /Date\s*\.\s*now\s*\(/, `${name} varies with the clock`);
  }
});

test("caller text cannot break out of the markup it is placed in", () => {
  const hostile = '"><script>alert(1)</script>';
  const html = renderPrimitiveToString("signal-gauge", { value: 40, label: hostile });
  assert.doesNotMatch(html, /<script/, "a label escaped into a tag");
  assert.ok(html.includes("&lt;script&gt;"), "the label should survive as text, escaped");
  assert.deepEqual(
    normalize(fromHtml(html)),
    withDocument(() => normalize(fromDom(primitiveRegistry["signal-gauge"]({ value: 40, label: hostile })))),
    "escaping must not change what the DOM says the label is"
  );
});

test("svg primitives keep the viewBox the copy bench measures against", () => {
  for (const id of ids) {
    const html = renderPrimitiveToString(id);
    if (!html.startsWith("<svg")) continue;
    const [root] = fromHtml(html);
    assert.match(root.attrs.viewBox ?? "", /^0 0 [\d.]+ [\d.]+$/, `${id} has no measurable viewBox`);
  }
});

/* ──────────────────── el DOM mínimo, contra el DOM de verdad ──────────────── */

test("the minimal document behaves like the DOM subset the primitives use", () => {
  const doc = createDocument();
  const el = doc.createElement("div");

  el.classList.add("a", "b", "a");
  assert.equal(el.getAttribute("class"), "a b", "classList must not repeat a name");
  el.classList.remove("a");
  assert.equal(el.className, "b");
  assert.equal(el.classList.contains("b"), true);

  el.dataset.kxRing = "SIGNAL";
  assert.equal(el.getAttribute("data-kx-ring"), "SIGNAL", "dataset must kebab-case its keys");

  el.setAttribute("style", "--layer:3");
  assert.equal(el.getAttribute("style"), "--layer:3", "a hand-written style attribute stays verbatim");
  el.style.setProperty("--columns", 22);
  assert.equal(el.style.getPropertyValue("--layer"), "3", "setProperty must not drop what was already there");
  el.style.opacity = 0.5;
  assert.equal(el.style.opacity, "0.5");

  const child = doc.createElementNS("http://www.w3.org/2000/svg", "circle");
  child.setAttribute("r", 4);
  el.append(child, "tail");
  assert.equal(el.firstElementChild, child);
  assert.equal(el.textContent, "tail");

  child.textContent = "";
  assert.equal(child.childNodes.length, 0, "an empty textContent clears the children");
});

test("innerHTML round-trips the markup the primitives write through it", () => {
  const doc = createDocument();
  const el = doc.createElement("article");
  el.innerHTML = '<header><p>KODEX−∞ / RECIPE 001</p><h2 class="t">A &amp; B</h2></header>';
  assert.equal(el.children.length, 1);
  assert.equal(el.firstElementChild.tagName, "header");
  assert.equal(el.firstElementChild.children[1].getAttribute("class"), "t");
  assert.equal(el.firstElementChild.children[1].textContent, "A & B", "entities must decode on the way in");
  assert.equal(
    el.innerHTML,
    '<header><p>KODEX−∞ / RECIPE 001</p><h2 class="t">A &amp; B</h2></header>',
    "and re-encode on the way out"
  );

  el.insertAdjacentHTML("beforeend", "<p>TAIL</p>");
  assert.equal(el.lastElementChild.tagName, "p");
  assert.equal(el.lastElementChild.textContent, "TAIL");
});

test("empty elements close the way each namespace expects", () => {
  const doc = createDocument();
  const svg = doc.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.append(doc.createElementNS("http://www.w3.org/2000/svg", "circle"));
  assert.equal(serializeNode(svg), "<svg><circle /></svg>");

  const div = doc.createElement("div");
  assert.equal(serializeNode(div), "<div></div>", "an empty div must not self-close");
  div.append(doc.createElement("br"));
  assert.equal(serializeNode(div), "<div><br></div>", "void HTML elements take no closing tag");
});

test("renderToString accepts a primitive or an already-built node", () => {
  const direct = renderToString(primitiveRegistry.waveform, { seed: 3 });
  const staged = withDocument(() => renderToString(primitiveRegistry.waveform({ seed: 3 })));
  assert.equal(direct, staged);
});
