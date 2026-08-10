/**
 * KODEX−∞ · VISUAL LIBRARY · RENDER A STRING (SSG / Node)
 *
 * Problema. Las primitivas dibujan con `document.createElementNS`, así que sólo
 * existen después de hidratar. Las láminas son Astro SSG y el banco de fotocopia
 * mide el HTML del build: con primitivas solo-cliente la captura sale vacía y no
 * hay nada que medir.
 *
 * Solución. En vez de escribir un segundo dibujante que emita strings, este
 * módulo trae un DOM mínimo y hace correr la primitiva de siempre contra él,
 * después serializa el árbol. La geometría no se toca y, sobre todo, no se
 * duplica: la lámina estática y la lámina hidratada salen de la MISMA función.
 *
 * Es la diferencia que importa. Un renderer a string paralelo tendría que
 * repetir la razón 0,93 de los anillos, la asimetría de las agujas y los anchos
 * irregulares de la barra — cada constante medida a mano contra las láminas — y
 * el día que alguien calibre una de las dos copias, el banco mediría una lámina
 * que nadie ve. Acá no hay dos copias que puedan divergir.
 *
 * Uso desde el frontmatter de una lámina Astro:
 *
 *   ---
 *   import { renderToString, radialScanner } from "@kodex/visual-library";
 *   const disco = renderToString(radialScanner, { rings: 9, semilla: 7 });
 *   ---
 *   <Fragment set:html={disco} />
 *
 * O por id de catálogo, sin importar cada primitiva:
 *
 *   const disco = renderPrimitiveToString("radial-scanner", { rings: 9 });
 *
 * Determinismo. Este módulo no introduce azar: el orden de atributos es el de
 * inserción y el de nodos el del árbol, así que dos llamadas con la misma
 * semilla dan el mismo string byte a byte. Es lo que le permite al banco
 * comparar píxel a píxel sin perseguir ruido.
 *
 * Alcance del DOM mínimo: lo que las primitivas tocan y nada más — atributos,
 * classList, style, dataset, textContent, innerHTML, append. No es un navegador
 * y no pretende serlo; los listeners se aceptan y se ignoran, porque en el build
 * no hay puntero que los dispare.
 */

import * as primitives from "./primitives.js";
import * as journey from "./recipes/journey-field.js";

const SVG_NS = "http://www.w3.org/2000/svg";

/** Elementos HTML sin etiqueta de cierre. Dentro de SVG, lo vacío se autocierra. */
const HTML_VOID = new Set([
  "area", "base", "br", "col", "embed", "hr", "img", "input",
  "link", "meta", "param", "source", "track", "wbr"
]);

/** Elementos HTML cuyo contenido es texto crudo y no se escapa. */
const RAW_TEXT = new Set(["script", "style"]);

const TEXT_ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;" };
const ATTR_ESCAPES = { ...TEXT_ESCAPES, '"': "&quot;" };
const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };

const escapeText = (value) => String(value).replace(/[&<>]/g, (char) => TEXT_ESCAPES[char]);
const escapeAttr = (value) => String(value).replace(/[&<>"]/g, (char) => ATTR_ESCAPES[char]);

const decodeEntities = (value) => String(value).replace(
  /&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g,
  (match, body) => {
    if (body[0] === "#") {
      const code = body[1] === "x" || body[1] === "X"
        ? parseInt(body.slice(2), 16)
        : parseInt(body.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : match;
    }
    return ENTITIES[body.toLowerCase()] ?? match;
  }
);

/** `strokeWidth` → `stroke-width`. Las propiedades custom (`--x`) pasan enteras. */
const kebab = (name) => (name.startsWith("--") ? name : name.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`));

const NODE_ELEMENT = 1;
const NODE_TEXT = 3;
const NODE_FRAGMENT = 11;

class KxText {
  constructor(data) {
    this.nodeType = NODE_TEXT;
    this.data = String(data);
    this.parentNode = null;
  }
  get textContent() { return this.data; }
  set textContent(value) { this.data = String(value); }
}

class KxParent {
  constructor() {
    this.childNodes = [];
    this.parentNode = null;
  }

  get children() { return this.childNodes.filter((child) => child.nodeType === NODE_ELEMENT); }
  get firstChild() { return this.childNodes[0] ?? null; }
  get firstElementChild() { return this.children[0] ?? null; }
  get lastElementChild() { const kids = this.children; return kids[kids.length - 1] ?? null; }
  get childElementCount() { return this.children.length; }

  append(...nodes) {
    for (const item of nodes) this.appendChild(toNode(item));
    return undefined;
  }

  appendChild(node) {
    if (node.nodeType === NODE_FRAGMENT) {
      for (const child of [...node.childNodes]) this.appendChild(child);
      node.childNodes = [];
      return node;
    }
    if (node.parentNode) node.parentNode.removeChild(node);
    node.parentNode = this;
    this.childNodes.push(node);
    return node;
  }

  prepend(...nodes) {
    const incoming = [];
    for (const item of nodes) {
      const node = toNode(item);
      if (node.nodeType === NODE_FRAGMENT) { incoming.push(...node.childNodes); node.childNodes = []; }
      else incoming.push(node);
    }
    for (const node of incoming) { node.parentNode?.removeChild(node); node.parentNode = this; }
    this.childNodes.unshift(...incoming);
  }

  insertBefore(node, reference) {
    if (!reference) return this.appendChild(node);
    const index = this.childNodes.indexOf(reference);
    if (index < 0) return this.appendChild(node);
    node.parentNode?.removeChild(node);
    node.parentNode = this;
    this.childNodes.splice(index, 0, node);
    return node;
  }

  removeChild(node) {
    const index = this.childNodes.indexOf(node);
    if (index >= 0) this.childNodes.splice(index, 1);
    node.parentNode = null;
    return node;
  }

  replaceChildren(...nodes) {
    for (const child of this.childNodes) child.parentNode = null;
    this.childNodes = [];
    this.append(...nodes);
  }

  get textContent() { return this.childNodes.map((child) => child.textContent).join(""); }
  set textContent(value) {
    for (const child of this.childNodes) child.parentNode = null;
    this.childNodes = [];
    const text = String(value);
    if (text) this.appendChild(new KxText(text));
  }

  /** Todos los elementos del subárbol, incluido el propio. Útil para asertar. */
  walk() {
    const self = this.nodeType === NODE_ELEMENT ? [this] : [];
    return [...self, ...this.childNodes.flatMap((child) => (child.walk ? child.walk() : []))];
  }
}

class KxFragment extends KxParent {
  constructor() { super(); this.nodeType = NODE_FRAGMENT; }
}

class KxElement extends KxParent {
  constructor(tagName, namespaceURI = null) {
    super();
    this.nodeType = NODE_ELEMENT;
    this.tagName = tagName;
    this.localName = tagName;
    this.namespaceURI = namespaceURI;
    this.attributes = new Map();
    this.listeners = [];
  }

  setAttribute(name, value) { this.attributes.set(name, String(value)); }
  setAttributeNS(_namespace, name, value) { this.setAttribute(name, value); }
  getAttribute(name) { return this.attributes.has(name) ? this.attributes.get(name) : null; }
  hasAttribute(name) { return this.attributes.has(name); }
  removeAttribute(name) { this.attributes.delete(name); }
  removeAttributeNS(_namespace, name) { this.removeAttribute(name); }

  get id() { return this.getAttribute("id") ?? ""; }
  set id(value) { this.setAttribute("id", value); }

  get className() { return this.getAttribute("class") ?? ""; }
  set className(value) { this.setAttribute("class", value); }

  get classList() {
    const element = this;
    const read = () => element.className.split(/\s+/).filter(Boolean);
    const write = (list) => {
      if (list.length) element.setAttribute("class", list.join(" "));
      else element.removeAttribute("class");
    };
    return {
      get value() { return element.className; },
      get length() { return read().length; },
      item: (index) => read()[index] ?? null,
      contains: (name) => read().includes(name),
      add: (...names) => {
        const list = read();
        for (const name of names) if (name && !list.includes(name)) list.push(name);
        write(list);
      },
      remove: (...names) => write(read().filter((name) => !names.includes(name))),
      toggle: (name, force) => {
        const list = read();
        const has = list.includes(name);
        const next = force === undefined ? !has : Boolean(force);
        if (next && !has) list.push(name);
        if (!next && has) list.splice(list.indexOf(name), 1);
        write(list);
        return next;
      }
    };
  }

  /**
   * `style` se apoya en el atributo, no en un estado paralelo: una primitiva
   * puede escribir `style` por `setAttribute` y después tocarlo por
   * `setProperty` sin que se pisen. El atributo puesto a mano se conserva tal
   * cual mientras nadie lo modifique por propiedad.
   */
  get style() {
    const element = this;
    const read = () => parseStyle(element.getAttribute("style") ?? "");
    const write = (map) => {
      const text = [...map].map(([name, value]) => `${name}: ${value}`).join("; ");
      if (text) element.setAttribute("style", `${text};`);
      else element.removeAttribute("style");
    };
    const api = {
      setProperty(name, value) { const map = read(); map.set(kebab(name), String(value)); write(map); },
      getPropertyValue(name) { return read().get(kebab(name)) ?? ""; },
      removeProperty(name) { const map = read(); map.delete(kebab(name)); write(map); },
      get cssText() { return element.getAttribute("style") ?? ""; },
      set cssText(value) { element.setAttribute("style", value); }
    };
    return new Proxy(api, {
      get: (target, prop) => (typeof prop === "string" && !(prop in target)
        ? read().get(kebab(prop)) ?? ""
        : target[prop]),
      set: (target, prop, value) => {
        if (typeof prop !== "string") return true;
        if (prop in target) target[prop] = value;
        else api.setProperty(kebab(prop), value);
        return true;
      }
    });
  }

  get dataset() {
    const element = this;
    return new Proxy({}, {
      get: (_target, prop) => (typeof prop === "string" ? element.getAttribute(`data-${kebab(prop)}`) ?? undefined : undefined),
      set: (_target, prop, value) => { element.setAttribute(`data-${kebab(prop)}`, value); return true; },
      has: (_target, prop) => element.hasAttribute(`data-${kebab(prop)}`),
      deleteProperty: (_target, prop) => { element.removeAttribute(`data-${kebab(prop)}`); return true; },
      ownKeys: () => [...element.attributes.keys()]
        .filter((name) => name.startsWith("data-"))
        .map((name) => name.slice(5).replace(/-([a-z])/g, (_m, char) => char.toUpperCase())),
      getOwnPropertyDescriptor: () => ({ enumerable: true, configurable: true })
    });
  }

  get innerHTML() { return this.childNodes.map((child) => serializeNode(child)).join(""); }
  set innerHTML(html) { this.replaceChildren(parseHtml(String(html), this.namespaceURI)); }

  get outerHTML() { return serializeNode(this); }

  insertAdjacentHTML(position, html) {
    const fragment = parseHtml(String(html), this.namespaceURI);
    const where = String(position).toLowerCase();
    if (where === "beforeend") this.appendChild(fragment);
    else if (where === "afterbegin") this.prepend(fragment);
    else if (where === "beforebegin") this.parentNode?.insertBefore(fragment, this);
    else if (where === "afterend") this.parentNode?.insertBefore(fragment, this.nextSibling());
    else throw new Error(`insertAdjacentHTML: unsupported position "${position}"`);
  }

  nextSibling() {
    const siblings = this.parentNode?.childNodes ?? [];
    return siblings[siblings.indexOf(this) + 1] ?? null;
  }

  remove() { this.parentNode?.removeChild(this); }

  // En el build no hay puntero: se aceptan y se anotan, no se disparan nunca.
  addEventListener(type, handler) { this.listeners.push({ type, handler }); }
  removeEventListener(type, handler) {
    const index = this.listeners.findIndex((item) => item.type === type && item.handler === handler);
    if (index >= 0) this.listeners.splice(index, 1);
  }
}

function toNode(item) {
  if (item && typeof item === "object" && "nodeType" in item) return item;
  return new KxText(item);
}

function parseStyle(text) {
  const map = new Map();
  for (const chunk of String(text).split(";")) {
    const split = chunk.indexOf(":");
    if (split < 0) continue;
    const name = chunk.slice(0, split).trim();
    const value = chunk.slice(split + 1).trim();
    if (name) map.set(name, value);
  }
  return map;
}

/**
 * Parser de HTML acotado al markup que la propia librería escribe por
 * `innerHTML`: etiquetas, atributos entrecomillados, texto y anidamiento. No
 * hace recuperación de errores como un navegador — si el markup viene mal
 * cerrado, es un bug de la primitiva y conviene que se note.
 */
const TAG = /<(\/?)([a-zA-Z][^\s/>]*)((?:[^>"']|"[^"]*"|'[^']*')*?)(\/?)>/g;
const ATTR = /([^\s"'=<>/]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;

function parseHtml(html, namespaceURI = null) {
  const fragment = new KxFragment();
  const stack = [fragment];
  const top = () => stack[stack.length - 1];
  let cursor = 0;
  let match;
  TAG.lastIndex = 0;
  while ((match = TAG.exec(html)) !== null) {
    const [raw, closing, rawName, rawAttrs, selfClosing] = match;
    const text = html.slice(cursor, match.index);
    if (text) top().appendChild(new KxText(decodeEntities(text)));
    cursor = match.index + raw.length;
    const name = rawName.toLowerCase();
    if (closing) {
      for (let depth = stack.length - 1; depth > 0; depth--) {
        if (stack[depth].tagName === name) { stack.length = depth; break; }
      }
      continue;
    }
    const element = new KxElement(name, name === "svg" ? SVG_NS : namespaceURI);
    ATTR.lastIndex = 0;
    let attr;
    while ((attr = ATTR.exec(rawAttrs)) !== null) {
      const value = attr[2] ?? attr[3] ?? attr[4] ?? "";
      element.setAttribute(attr[1], decodeEntities(value));
    }
    top().appendChild(element);
    if (!selfClosing && !HTML_VOID.has(name)) stack.push(element);
  }
  const tail = html.slice(cursor);
  if (tail) top().appendChild(new KxText(decodeEntities(tail)));
  return fragment;
}

/** Un nodo del DOM mínimo → string. Es el único lugar que decide el markup. */
export function serializeNode(node) {
  if (node === null || node === undefined) return "";
  if (typeof node === "string" || typeof node === "number") return escapeText(node);
  if (Array.isArray(node)) return node.map(serializeNode).join("");
  if (node.nodeType === NODE_TEXT) {
    return RAW_TEXT.has(node.parentNode?.tagName) ? node.data : escapeText(node.data);
  }
  if (node.nodeType === NODE_FRAGMENT) return node.childNodes.map(serializeNode).join("");
  if (node.nodeType !== NODE_ELEMENT) {
    throw new TypeError("serializeNode expects a node from this module's document");
  }

  const tag = node.tagName;
  let open = `<${tag}`;
  for (const [name, value] of node.attributes) open += ` ${name}="${escapeAttr(value)}"`;
  const inner = node.childNodes.map(serializeNode).join("");
  if (inner) return `${open}>${inner}</${tag}>`;
  if (node.namespaceURI === SVG_NS) return `${open} />`;
  if (HTML_VOID.has(tag)) return `${open}>`;
  return `${open}></${tag}>`;
}

/** Document mínimo: lo que las primitivas piden y nada más. */
export function createDocument() {
  const doc = {
    createElement: (tag) => new KxElement(String(tag).toLowerCase(), null),
    createElementNS: (namespace, tag) => new KxElement(String(tag), namespace || null),
    createTextNode: (text) => new KxText(text),
    createDocumentFragment: () => new KxFragment(),
    documentElement: null,
    body: null
  };
  doc.documentElement = new KxElement("html", null);
  doc.body = new KxElement("body", null);
  doc.documentElement.appendChild(doc.body);
  return doc;
}

/**
 * Corre `build` con el DOM mínimo instalado en `globalThis.document` y lo
 * restaura al salir, incluso si `build` tira. Es síncrono a propósito: en Node
 * nada se intercala, así que el global no se le escapa a nadie más.
 *
 * Se instala aun habiendo navegador: el string tiene que salir igual en el
 * build y en el cliente, y así jamás se toca el DOM real.
 */
export function withDocument(build) {
  const had = Object.prototype.hasOwnProperty.call(globalThis, "document");
  const previous = globalThis.document;
  globalThis.document = createDocument();
  try {
    return build(globalThis.document);
  } finally {
    if (had) globalThis.document = previous;
    else delete globalThis.document;
  }
}

/**
 * Primitiva → string de SVG/HTML, sin DOM y sin hidratar.
 *
 * Acepta la función de la primitiva (`renderToString(radialScanner, { rings: 9 })`)
 * o un nodo ya construido con este mismo document.
 */
export function renderToString(primitive, options = {}) {
  if (typeof primitive === "function") return withDocument(() => serializeNode(primitive(options)));
  return serializeNode(primitive);
}

/**
 * La misma primitiva contra el DOM que haya. En el navegador es la llamada de
 * siempre; sirve para que un llamador escriba un solo camino y elija la salida.
 */
export function renderToDom(primitive, options = {}) {
  if (typeof primitive !== "function") return primitive;
  if (globalThis.document) return primitive(options);
  return withDocument(() => primitive(options));
}

/**
 * Registro id → primitiva, derivado de los exports en vez de escrito a mano:
 * `radialScanner` queda como `radial-scanner`. Así una primitiva nueva del kit
 * es renderizable por id el mismo día que se exporta, sin que nadie se acuerde
 * de anotarla acá — que es exactamente como una lista a mano se queda vieja.
 *
 * Una primitiva se dibuja sola a partir de un objeto de opciones con default
 * (`length === 0`) y no lleva prefijo de verbo. Los ayudantes que operan sobre
 * un nodo ajeno o sobre el entorno —`createSvg`, `applyValueSemantics`,
 * `mountFlowField`— quedan afuera: no se renderizan por id.
 */
const kebabId = (name) => name.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);
const HELPER_PREFIX = /^(create|apply|mount|hydrate|make|with|render|install|load|animate)[A-Z]/;

export const primitiveRegistry = Object.freeze(Object.fromEntries(
  [...Object.entries(primitives), ...Object.entries(journey)]
    .filter(([name, value]) => typeof value === "function"
      && value.length === 0
      && /^[a-z]/.test(name)
      && !HELPER_PREFIX.test(name))
    .map(([name, value]) => [kebabId(name), value])
));

export function primitiveById(id) {
  const build = primitiveRegistry[id];
  if (!build) throw new Error(`unknown primitive "${id}"; known: ${Object.keys(primitiveRegistry).sort().join(", ")}`);
  return build;
}

/** Primitiva por id de catálogo → string. El camino corto para Astro. */
export function renderPrimitiveToString(id, options = {}) {
  return renderToString(primitiveById(id), options);
}

/** Primitiva por id de catálogo → DOM. */
export function renderPrimitiveToDom(id, options = {}) {
  return renderToDom(primitiveById(id), options);
}
