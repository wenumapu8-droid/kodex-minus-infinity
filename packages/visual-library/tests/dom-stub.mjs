/**
 * Minimal DOM stand-in so primitives can be asserted in `node --test` without
 * pulling a headless browser or jsdom into the dependency list. It covers only
 * what the primitives touch: attributes, class list, inline custom properties,
 * text and child append.
 */
class StubElement {
  constructor(tag, namespace = null) {
    this.tagName = tag;
    this.namespaceURI = namespace;
    this.attributes = new Map();
    this.children = [];
    this.textContent = "";
    this.style = { setProperty: (key, value) => { this.style[key] = String(value); } };
    this.classList = { add: (...names) => { this._classes.push(...names); } };
    this._classes = [];
  }

  get className() { return this._classes.join(" "); }
  set className(value) { this._classes = String(value).split(/\s+/).filter(Boolean); }

  setAttribute(name, value) { this.attributes.set(name, String(value)); }
  getAttribute(name) { return this.attributes.has(name) ? this.attributes.get(name) : null; }
  hasAttribute(name) { return this.attributes.has(name); }
  removeAttribute(name) { this.attributes.delete(name); }
  append(...nodes) { this.children.push(...nodes); }
  get firstElementChild() { return this.children[0] ?? null; }

  /** Every element in the subtree, self included. */
  walk() { return [this, ...this.children.flatMap((child) => child.walk())]; }
}

export function installDomStub() {
  globalThis.document = {
    createElement: (tag) => new StubElement(tag),
    createElementNS: (namespace, tag) => new StubElement(tag, namespace)
  };
}

export { StubElement };
