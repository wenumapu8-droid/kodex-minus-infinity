import { rng, smoothSeries, p2 } from "./rng.js";

const ns = "http://www.w3.org/2000/svg";

function el(name, attrs = {}) {
  const node = document.createElementNS(ns, name);
  for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, value);
  return node;
}

export function createSvg(viewBox = "0 0 1000 600", label = "KODEX visualization") {
  const svg = el("svg", { viewBox, role: "img", "aria-label": label });
  svg.classList.add("kx-svg");
  return svg;
}

/**
 * Caja de las primitivas calibradas: el viewBox va en unidades de lámina, y la
 * pieza es decorativa (aria-hidden) salvo que se le pase una etiqueta.
 */
function frame(width, height, { label = "", className = "" } = {}) {
  const svg = el("svg", { viewBox: `0 0 ${width} ${height}` });
  svg.classList.add("kx-svg");
  for (const name of String(className).split(/\s+/).filter(Boolean)) svg.classList.add(name);
  if (label) {
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", label);
  } else {
    svg.setAttribute("aria-hidden", "true");
  }
  return svg;
}

/**
 * Gris neutro medido de los glifos de las referencias. NO es el color de
 * acento: en las láminas los glifos y la mancha de micrografía son grises, y el
 * acento se reserva para la señal. Se usa con reserva de token para que la
 * paleta pueda sobrescribirlo sin que la primitiva pierda la medición.
 */
export const GLYPH_NEUTRAL = "#787a77";
const glyphInk = `var(--kx-glyph, ${GLYPH_NEUTRAL})`;

/**
 * Marca de figura sin escalar único: la dona de composición y el gráfico de
 * serie no tienen un número que anunciar. Simbólicas pasan por el contrato de
 * `applyValueSemantics`; medidas quedan como imagen etiquetada, nunca como un
 * medidor con un `aria-valuenow` inventado.
 */
function markFigure(node, { simbolico = true, label = "FIGURE" } = {}) {
  // La pieza deja de ser decorativa en cuanto se declara: aria-hidden y un rol
  // anunciable no pueden convivir.
  node.removeAttribute("aria-hidden");
  if (simbolico) return applyValueSemantics(node, { simbolico: true, label });
  node.setAttribute("data-symbolic", "false");
  node.setAttribute("role", "img");
  node.setAttribute("aria-label", String(label));
  return node;
}

// Value-bearing primitives are assembled node by node instead of through
// innerHTML: a caller-supplied label must never be able to inject the very ARIA
// roles this module is careful not to emit.
function box(tag, { className, text, attrs = {}, vars = {} } = {}) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = String(text);
  for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, String(value));
  for (const [key, value] of Object.entries(vars)) node.style.setProperty(key, String(value));
  return node;
}

/**
 * VISUAL_PASSPORT_PROTOCOL "No pseudo-telemetry": the numbers on the reference
 * plates are poster fiction. A symbolic mark must never tell a screen reader it
 * is a measurement, so it carries data-symbolic="true" and role="img" instead of
 * role="meter"/aria-valuenow. Only pass simbolico:false when the value really
 * comes from an engine measurement — that is the single case where the ARIA
 * measurement roles are admitted.
 */
export function applyValueSemantics(node, { simbolico = true, label = "VALUE", value = 0, min = 0, max = 100 } = {}) {
  if (simbolico) {
    node.setAttribute("data-symbolic", "true");
    node.setAttribute("role", "img");
    node.setAttribute("aria-label", `${label}: symbolic plate marking, not a system measurement`);
    for (const attr of ["aria-valuemin", "aria-valuemax", "aria-valuenow", "aria-valuetext"]) node.removeAttribute(attr);
    return node;
  }
  node.setAttribute("data-symbolic", "false");
  node.setAttribute("role", "meter");
  node.setAttribute("aria-label", String(label));
  node.setAttribute("aria-valuemin", String(min));
  node.setAttribute("aria-valuemax", String(max));
  node.setAttribute("aria-valuenow", String(value));
  return node;
}

/**
 * KIT · DONA / ANILLO DE ESTADO
 *
 * La dona de SIGNAL COMPOSITION, los anillos de porcentaje, los medidores
 * circulares. Se dibuja con `stroke-dasharray` sobre un círculo y no con arcos
 * de path: un arco por segmento son cuatro comandos y un cálculo trigonométrico
 * por gajo, y a 40 px de diámetro no se nota la diferencia.
 *
 * `segments` acepta varios valores (una dona de composición) o uno solo (un
 * medidor de porcentaje).
 */
export function ringGauge({
  /** diámetro exterior */
  d = 92,
  /** grosor del anillo */
  thickness = Math.max(3, d * 0.22),
  /** [{ value, color }] — los valores se normalizan solos */
  segments = [{ value: 1, color: "currentColor" }],
  /** hueco entre gajos, en grados */
  gap = 0,
  /** color del resto del anillo cuando los segmentos no suman el total */
  rest = "",
  /** arranca arriba (-90) por defecto, como en las referencias */
  from = -90,
  simbolico = true,
  /** pieza interna de otra primitiva: la semántica la pone el contenedor */
  decorative = false,
  label = "RING",
  className = ""
} = {}) {
  const R = (d - thickness) / 2;
  const C = 2 * Math.PI * R;
  const total = segments.reduce((sum, s) => sum + (Number(s.value) || 0), 0) || 1;

  const svg = frame(d, d, { className: `kx-ring-gauge ${className}`.trim() });
  if (!decorative) markFigure(svg, { simbolico, label });

  const g = el("g", {
    transform: `rotate(${from} ${d / 2} ${d / 2})`,
    fill: "none",
    "stroke-width": String(thickness)
  });
  if (rest) g.append(el("circle", { cx: d / 2, cy: d / 2, r: p2(R), stroke: rest, opacity: "0.22", class: "kx-ring-track" }));

  // Se acumula el desfase para encadenar los gajos. dashoffset corre en sentido
  // horario negativo, de ahí el signo.
  let acc = 0;
  for (const segment of segments) {
    const frac = (Number(segment.value) || 0) / total;
    const long = C * frac - (gap / 360) * C;
    g.append(el("circle", {
      cx: d / 2, cy: d / 2, r: p2(R),
      stroke: segment.color || "currentColor",
      "stroke-dasharray": `${p2(Math.max(0, long))} ${p2(C)}`,
      "stroke-dashoffset": p2(-C * acc),
      class: "kx-ring-arc"
    }));
    acc += frac;
  }
  svg.append(g);
  return svg;
}

/**
 * Medidor de señal del Atlas, ahora sobre el anillo calibrado del kit en vez de
 * un conic-gradient. Conserva la firma `{ value, label, max, simbolico }`.
 */
export function signalGauge({ value = 72, label = "SIGNAL", max = 100, simbolico = true } = {}) {
  const root = document.createElement("figure");
  root.className = "kx-gauge";
  const safe = Math.max(0, Math.min(max, Number(value) || 0));
  const filled = max ? safe / max : 0;
  const ring = box("div", { className: "kx-gauge__ring", vars: { "--value": filled } });
  ring.append(ringGauge({
    d: 92,
    thickness: 9,
    decorative: true,
    rest: "currentColor",
    segments: [{ value: filled, color: "var(--kx-signal-hot, currentColor)" }]
  }));
  ring.append(box("span", { text: safe.toFixed(0), attrs: { "aria-hidden": "true" } }));
  applyValueSemantics(ring, { simbolico, label, value: safe, max });
  root.append(ring, box("figcaption", { text: label }));
  return root;
}

/**
 * KIT · ONDA
 *
 * Aparece en las 17 láminas y casi nunca es la misma: hay ondas de peine
 * (agujas apretadas), de trazo continuo y de barras. Una sola primitiva con
 * `variant` en vez de tres, porque comparten la serie y la caja.
 *
 * Lo medido, de fábrica: en el peine las agujas NO son simétricas respecto del
 * eje — cada una sale desplazada. Simétricas se leen como ecualizador, no como
 * señal.
 *
 * La firma vieja del Atlas (`{ points, amplitude, seed }`) sigue funcionando.
 */
export function waveform({
  width = 720,
  height = 120,
  seed = 8,
  /** comb = agujas verticales · line = trazo continuo · bars = columnas */
  variant = "line",
  /** cuántas muestras. Más muestras = señal más apretada. */
  points,
  n = points,
  color = "currentColor",
  weight = 0.8,
  /** 0 = ruido blanco · 0.9 = señal con deriva */
  inertia = variant === "comb" ? 0.2 : 0.82,
  /** recorta la amplitud contra los bordes de la caja */
  margin = 1,
  /** alto útil de la señal; por defecto la caja menos el margen */
  amplitude,
  /** línea de eje: la onda de trazo del Atlas siempre la tuvo */
  axis = variant === "line",
  label = "Signal waveform",
  className = ""
} = {}) {
  const samples = Math.max(2, Math.floor(n ?? (variant === "bars" ? width / 3 : width / 1.6)));
  const span = amplitude ?? height - margin * 2;
  const mid = height / 2;
  const values = smoothSeries(seed, samples, inertia, 0.06, 1);
  const random = rng(seed ^ 0x9e37);
  const step = width / (samples - 1 || 1);

  const svg = frame(width, height, { label, className: `kx-waveform kx-waveform--${variant} ${className}`.trim() });
  if (axis) svg.append(el("line", { x1: "0", y1: String(mid), x2: String(width), y2: String(mid), class: "kx-hairline" }));

  if (variant === "line") {
    const d = values.map((v, i) => `${i ? "L" : "M"}${p2(i * step)} ${p2(mid + (v - 0.5) * span)}`).join("");
    svg.append(el("path", { d, fill: "none", stroke: color, "stroke-width": weight, "stroke-linejoin": "round", class: "kx-signal-line" }));
    return svg;
  }

  if (variant === "comb") {
    for (let i = 0; i < values.length; i++) {
      const a = (values[i] * span) / 2;
      const off = (random() - 0.5) * span * 0.18;
      svg.append(el("line", {
        x1: p2(i * step), y1: p2(mid - a + off),
        x2: p2(i * step), y2: p2(mid + a + off),
        stroke: color, "stroke-width": weight, class: "kx-waveform__needle"
      }));
    }
    return svg;
  }

  for (let i = 0; i < values.length; i++) {
    const barHeight = p2(values[i] * span);
    svg.append(el("rect", {
      x: p2(i * step), y: p2(height - margin - barHeight),
      width: p2(Math.max(0.8, step * 0.55)), height: barHeight,
      fill: color, class: "kx-waveform__bar"
    }));
  }
  return svg;
}

/**
 * KIT · SCANNER RADIAL
 *
 * La pieza más repetida de las 17 láminas: el disco de anillos y radios que
 * aparece como diagrama de estado, mira, mapa polar, rosa de los vientos y
 * fondo de casi todo.
 *
 * Tres cosas que se midieron contra las láminas y quedan aquí de fábrica:
 *
 *  · Los anillos NO se reparten parejo. Van en progresión geométrica de razón
 *    ~0.93, que es lo que los agrupa hacia el centro y da profundidad. Parejos
 *    (i*25, que es lo que hacía esta función) se lee como blanco de tiro; con
 *    0.82 colapsan al centro y se lee como diana.
 *  · No hay dos anillos con el mismo brillo. El peso irregular es lo que
 *    distingue un instrumento de una figura de CAD.
 *  · Los radios no arrancan en el centro exacto: dejan libre el núcleo.
 *
 * `eccentricity` achata el disco: 1 es circular, 0.5 es una elipse de túnel
 * visto de frente.
 */
export function radialScanner({
  width = 400,
  height = 400,
  /** cuántos anillos */
  rings = 12,
  /** cuántos radios */
  spokes = 32,
  seed = 7,
  /** radio del anillo exterior, en unidades del viewBox */
  rmax = Math.min(width, height) * 0.46,
  /** razón de la progresión: <1 aprieta hacia el centro */
  ratio = 0.93,
  /** 1 = círculo · <1 = elipse achatada */
  eccentricity = 1,
  /** centro, en fracción de la caja */
  cx = 0.5,
  cy = 0.5,
  color = "currentColor",
  /** color frío de contrapunto; en las referencias siempre hay unos pocos trazos */
  cool = "",
  /** radio del núcleo oscuro (el punto de fuga). 0 lo desactiva. */
  core = 0,
  /** marcas cortas sobre el anillo exterior */
  ticks = 0,
  label = "Radial scanner",
  className = ""
} = {}) {
  const CX = width * cx;
  const CY = height * cy;
  const random = rng(seed);

  // El orden de consumo del rng es parte de la calibración: cambiarlo cambia el
  // dibujo. El corto-circuito de `cool` está a propósito — sin color frío no se
  // saca el número, igual que en el kit.
  const ringSpec = Array.from({ length: rings }, (_, i) => ({
    r: p2(rmax * Math.pow(ratio, i)),
    // Peso irregular, pero acotado: por debajo de 0.16 el anillo desaparece y
    // el disco se ve mordido en vez de trazado.
    o: p2(0.16 + random() * 0.7),
    gr: p2(0.28 + (random() < 0.22 ? 0.5 : 0)),
    cool: !!cool && random() < 0.14
  }));

  const spokeSpec = Array.from({ length: spokes }, (_, i) => {
    const a = (i * 2 * Math.PI) / spokes;
    // Los radios no arrancan en el centro: dejan libre el núcleo.
    const r0 = rmax * (core ? core / rmax + 0.06 : 0.14);
    const r1 = rmax * (0.86 + random() * 0.2);
    return {
      x1: p2(CX + Math.cos(a) * r0), y1: p2(CY + Math.sin(a) * r0 * eccentricity),
      x2: p2(CX + Math.cos(a) * r1), y2: p2(CY + Math.sin(a) * r1 * eccentricity),
      o: p2(0.08 + random() * 0.26)
    };
  });

  const tickSpec = Array.from({ length: ticks }, (_, i) => {
    const a = (i * 2 * Math.PI) / ticks;
    const r0 = rmax * 1.02;
    const r1 = rmax * (i % 5 === 0 ? 1.14 : 1.07);
    return {
      x1: p2(CX + Math.cos(a) * r0), y1: p2(CY + Math.sin(a) * r0 * eccentricity),
      x2: p2(CX + Math.cos(a) * r1), y2: p2(CY + Math.sin(a) * r1 * eccentricity)
    };
  });

  const svg = frame(width, height, { label, className: `kx-radial-scanner ${className}`.trim() });
  const g = el("g", { fill: "none", stroke: color, "stroke-width": "0.3" });
  for (const spoke of spokeSpec) g.append(el("line", { x1: spoke.x1, y1: spoke.y1, x2: spoke.x2, y2: spoke.y2, opacity: spoke.o }));
  for (const ring of ringSpec) {
    g.append(el("ellipse", {
      cx: p2(CX), cy: p2(CY),
      rx: ring.r, ry: p2(ring.r * eccentricity),
      opacity: ring.o, "stroke-width": ring.gr,
      stroke: ring.cool ? cool : color
    }));
  }
  for (const tick of tickSpec) g.append(el("line", { x1: tick.x1, y1: tick.y1, x2: tick.x2, y2: tick.y2, opacity: "0.5", "stroke-width": "0.4" }));
  svg.append(g);

  if (core > 0) {
    const node = el("ellipse", { cx: p2(CX), cy: p2(CY), rx: p2(core), ry: p2(core * eccentricity) });
    node.style.setProperty("fill", "var(--kx-void, #000)");
    svg.append(node);
  }
  return svg;
}

/**
 * KIT · MEDIDOR DE BARRAS
 *
 * La barra de progreso de las láminas NO es sólida: es una tira de marcas
 * verticales de anchos irregulares. Sólida se lee como un `<progress>` de
 * navegador; con las marcas se lee como instrumento. Es el detalle que separa
 * DESCENT PROGRESS y SIGNAL STRENGTH de una barra cualquiera.
 */
export function barMeter({
  width = 180,
  height = 8,
  /** porcentaje lleno */
  value = 0,
  seed = 3,
  color = "currentColor",
  /** color del tramo vacío; por defecto una versión apagada del lleno */
  empty = "",
  /** marco alrededor */
  bordered = false,
  /** ancho medio de cada marca, en px */
  step = 3,
  simbolico = true,
  label = "METER",
  className = ""
} = {}) {
  const random = rng(seed);
  const safe = Math.max(0, Math.min(100, Number(value) || 0));
  const filled = (width * safe) / 100;

  // Anchos irregulares acumulados: si todas las marcas miden lo mismo el patrón
  // se lee como trama regular y delata que es CSS.
  const marks = [];
  let x = 0;
  while (x < width) {
    const markWidth = step * (0.45 + random() * 0.75);
    marks.push({ x: p2(x), w: p2(Math.max(0.7, markWidth)), on: x < filled });
    x += markWidth + step * (0.28 + random() * 0.5);
  }

  const root = document.createElement("div");
  root.className = `kx-bar-meter${bordered ? " kx-bar-meter--bordered" : ""}${className ? ` ${className}` : ""}`;
  root.style.setProperty("width", `${width}px`);
  root.style.setProperty("height", `${height}px`);
  applyValueSemantics(root, { simbolico, label, value: safe });

  const svg = frame(width, height, { className: "kx-bar-meter__svg" });
  for (const mark of marks) {
    svg.append(el("rect", {
      x: mark.x, y: "0", width: mark.w, height: String(height),
      fill: mark.on ? color : empty || color,
      opacity: mark.on ? "1" : "0.16"
    }));
  }
  root.append(svg);
  return root;
}

/**
 * KIT · GRÁFICO DE SERIE
 *
 * El DEPTH GRAPH y sus parientes: una curva ascendente dentada, con relleno de
 * área, retícula fina y etiquetas de eje.
 *
 * Se dibuja a mano y no con una librería de gráficos a propósito. ECharts pesa
 * 61 MB en `node_modules` y trae su propio motor de ejes y márgenes, que no es
 * direccionable al píxel; para reproducir un gráfico de 179×115 con los ticks
 * donde ya están, pelea en cada píxel — la versión a mano mide 8,04 % contra la
 * referencia. Lo único que conviene traer de fuera si hace falta es `d3-shape`
 * y `d3-scale`: matemática pura, sin opinión sobre el DOM.
 */
export function stepGraph({
  width = 179,
  height = 115,
  seed = 5,
  /** valores 0..1; si no se pasan, se generan deterministas */
  values,
  n = 42,
  /** sube la serie hacia la derecha, como el DEPTH GRAPH */
  trend = 0.85,
  /** dientes de sierra sobre la tendencia */
  tooth = 0.16,
  color = "currentColor",
  fill = "",
  /** retícula: [columnas, filas]; [0,0] la apaga */
  grid = [5, 4],
  gridColor = "",
  labelsX = [],
  labelsY = [],
  labelColor = "",
  simbolico = true,
  label = "SERIES",
  className = ""
} = {}) {
  // Márgenes: se reservan sólo si hay etiquetas. Un gráfico sin ejes debe
  // llenar su caja entera, o queda flotando y el diff lo castiga por
  // desplazamiento.
  const mL = labelsY.length ? 16 : 0;
  const mB = labelsX.length ? 9 : 0;
  const pw = width - mL;
  const ph = height - mB;

  const base = values ?? smoothSeries(seed, n, 0.55, 0, 1);
  const points = base.map((v, i) => {
    const t = i / (base.length - 1 || 1);
    // La tendencia es exponencial, no lineal: así la curva arranca plana y se
    // dispara al final, que es la forma que tiene en la referencia.
    const rise = Math.pow(t, 1.6) * trend;
    const y = Math.max(0.02, Math.min(0.98, rise + (v - 0.5) * tooth + 0.06));
    return { x: p2(mL + t * pw), y: p2(ph - y * ph) };
  });

  const line = points.map((point, i) => `${i ? "L" : "M"}${point.x} ${point.y}`).join("");
  const area = `${line}L${p2(mL + pw)} ${p2(ph)}L${p2(mL)} ${p2(ph)}Z`;
  const [gc, gr] = grid;

  const svg = frame(width, height, { className: `kx-step-graph ${className}`.trim() });
  markFigure(svg, { simbolico, label });

  if (gc > 0 || gr > 0) {
    const g = el("g", { stroke: gridColor || color, "stroke-width": "0.3", opacity: "0.2" });
    for (let i = 0; i <= gc; i++) {
      const x = p2(mL + (i * pw) / gc);
      g.append(el("line", { x1: x, y1: "0", x2: x, y2: p2(ph) }));
    }
    for (let i = 0; i <= gr; i++) {
      const y = p2((i * ph) / gr);
      g.append(el("line", { x1: p2(mL), y1: y, x2: p2(width), y2: y }));
    }
    svg.append(g);
  }

  if (fill) svg.append(el("path", { d: area, fill, class: "kx-step-graph__area" }));
  svg.append(el("path", { d: line, fill: "none", stroke: color, "stroke-width": "0.9", "stroke-linejoin": "round", class: "kx-step-graph__line" }));

  // Tipografía de eje inline para que la primitiva no dependa del CSS de la
  // galería. Tinta: gris de glifo, no el acento.
  const labelStyle = "font-family:var(--kx-mono, ui-monospace, monospace);font-size:5.5px;letter-spacing:.06em;opacity:.75";
  const axisLabel = (text, attrs) => {
    const node = el("text", { ...attrs, fill: labelColor || glyphInk, style: labelStyle, class: "kx-step-graph__label", "aria-hidden": "true" });
    node.textContent = String(text);
    svg.append(node);
  };
  labelsY.forEach((text, i) => axisLabel(text, {
    x: p2(mL - 3),
    y: p2((i * ph) / Math.max(1, labelsY.length - 1) + 2),
    "text-anchor": "end"
  }));
  labelsX.forEach((text, i) => axisLabel(text, {
    x: p2(mL + (i * pw) / Math.max(1, labelsX.length - 1)),
    y: p2(height - 1),
    "text-anchor": "middle"
  }));
  return svg;
}

/**
 * KIT · MICROGRAFÍA
 *
 * La capa de "texto" ilegible de 2-3 px que llena los huecos de las
 * referencias. Es lo que más se echa de menos en la reproducción y lo que nadie
 * pone, porque mirando la lámina no se ve como contenido: se ve como suciedad.
 * Pero es justamente eso lo que le da peso de instrumento — sin ella los
 * paneles quedan limpios y la lámina se lee como maqueta.
 *
 * NO es texto y no debe serlo. A ese tamaño nada es legible, y poner texto real
 * sería inventar contenido, que es exactamente lo que el protocolo de passports
 * prohíbe. Son marcas que imitan la MANCHA del texto: renglones de guiones de
 * largo variable, con sangrías y huecos.
 *
 * Se dibuja con un solo <path> en vez de N elementos: a densidad alta son
 * cientos de marcas por bloque y el DOM se hace pesado.
 */
export function micrografia({
  width = 180,
  height = 90,
  seed = 11,
  /** alto de cada renglón, en px */
  line = 3,
  /** alto de la marca dentro del renglón */
  mark = 1,
  /** 0..1 — cuánto del renglón se llena */
  density = 0.72,
  /** ancho medio de cada palabra, en px */
  word = 5,
  color = glyphInk,
  opacity = 0.5,
  /** deja renglones vacíos, como los párrafos de la referencia */
  gaps = 0.12,
  className = ""
} = {}) {
  const random = rng(seed);
  const parts = [];

  for (let y = 0; y + mark <= height; y += line) {
    if (random() < gaps) continue;
    // Sangría inicial: los bloques de texto de la referencia no arrancan todos
    // en el mismo x, y esa irregularidad es la mitad del efecto.
    let x = random() * word * 0.8;
    // Cada renglón tiene su propio largo, como un párrafo justificado a la izquierda.
    const end = width * (0.55 + random() * 0.45);
    while (x < end) {
      const wordWidth = word * (0.3 + random() * 1.4);
      if (random() < density) {
        const run = p2(Math.min(wordWidth, end - x));
        parts.push(`M${p2(x)} ${p2(y)}h${run}v${mark}h-${run}z`);
      }
      x += wordWidth + word * (0.22 + random() * 0.35);
    }
  }

  const svg = frame(width, height, { className: `kx-micrografia ${className}`.trim() });
  svg.style.setProperty("pointer-events", "none");
  svg.append(el("path", { d: parts.join(""), fill: color, opacity: String(opacity) }));
  return svg;
}

export function assetSlot({ kind = "GLB / PNG / SVG", label = "ASSET SLOT" } = {}) {
  const root = document.createElement("div");
  root.className = "kx-asset-slot";
  root.innerHTML = `<span class="kx-asset-slot__mark">◇</span><strong>${label}</strong><small>${kind}</small>`;
  return root;
}

export function metricBars({ metrics = [], simbolico = true } = {}) {
  const root = document.createElement("div");
  root.className = "kx-metrics";
  root.setAttribute("data-symbolic", simbolico ? "true" : "false");
  root.setAttribute("role", "group");
  root.setAttribute("aria-label", simbolico
    ? "Symbolic plate markings, not system measurements"
    : "Measured metrics");
  for (const metric of metrics) {
    const value = Math.max(0, Math.min(100, Number(metric.value) || 0));
    const row = box("div", { className: "kx-metric" });
    row.append(
      box("span", { text: metric.label, attrs: { "aria-hidden": "true" } }),
      box("i", { vars: { "--value": `${value}%` } }),
      box("b", { text: `${value.toFixed(1)}%`, attrs: { "aria-hidden": "true" } })
    );
    applyValueSemantics(row, { simbolico, label: metric.label ?? "METRIC", value });
    root.append(row);
  }
  return root;
}

export function radialTaxonomy({ groups = 7, items = 42, seed = 18 } = {}) {
  const svg = createSvg("0 0 600 600", "Radial taxonomy");
  const g = el("g", { transform: "translate(300 300)" });
  let state = seed >>> 0;
  const random = () => ((state = (state * 1664525 + 1013904223) >>> 0) / 4294967296);
  for (let group = 0; group < groups; group++) {
    const start = (group / groups) * Math.PI * 2;
    const end = ((group + .82) / groups) * Math.PI * 2;
    const radius = 100 + random() * 54;
    const x1 = Math.cos(start) * radius;
    const y1 = Math.sin(start) * radius;
    const x2 = Math.cos(end) * radius;
    const y2 = Math.sin(end) * radius;
    g.append(el("path", { d: `M0 0 Q ${x1.toFixed(1)} ${y1.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`, class: "kx-taxonomy-branch" }));
  }
  for (let index = 0; index < items; index++) {
    const angle = (index / items) * Math.PI * 2;
    const radius = 220 + (index % 3) * 14;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    g.append(el("line", { x1: String(Math.cos(angle) * 150), y1: String(Math.sin(angle) * 150), x2: String(x), y2: String(y), class: "kx-hairline" }));
    g.append(el("circle", { cx: String(x), cy: String(y), r: index % 7 === 0 ? "4" : "2", class: "kx-node" }));
  }
  g.append(el("circle", { r: "152", class: "kx-orbit" }));
  svg.append(g);
  return svg;
}

export function dataPortrait({ columns = 22, rows = 34, seed = 9 } = {}) {
  const root = document.createElement("div");
  root.className = "kx-data-portrait";
  // The digits are texture that imitates the plate's stain. They are never a
  // readout, so there is no simbolico:false path here.
  root.setAttribute("data-symbolic", "true");
  root.setAttribute("role", "img");
  root.setAttribute("aria-label", "Data portrait: symbolic digit texture, not a data readout");
  root.style.setProperty("--columns", columns);
  let state = seed >>> 0;
  const random = () => ((state = (state * 1103515245 + 12345) >>> 0) / 4294967296);
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      const nx = (column / (columns - 1)) * 2 - 1;
      const ny = (row / (rows - 1)) * 2 - 1;
      const head = (nx * nx) / .42 + ((ny + .18) * (ny + .18)) / .76 < 1;
      const shoulders = ny > .48 && Math.abs(nx) < .92 - (ny - .48) * .7;
      const visible = (head || shoulders) && random() > .22;
      const digit = document.createElement("span");
      digit.textContent = visible ? String(Math.floor(random() * 10)) : "";
      digit.style.opacity = visible ? String(.25 + random() * .75) : "0";
      root.append(digit);
    }
  }
  return root;
}

export function stratigraphy({ layers = 20, seed = 33 } = {}) {
  const svg = createSvg("0 0 720 360", "Layered stratigraphy");
  let state = seed >>> 0;
  const random = () => ((state = (state * 1664525 + 1013904223) >>> 0) / 4294967296);
  for (let layer = 0; layer < layers; layer++) {
    const points = [];
    for (let index = 0; index <= 30; index++) {
      const x = (index / 30) * 720;
      const wave = Math.sin(index * .42 + layer * .25) * (8 + layer * .25);
      const y = 54 + layer * 12 + wave + (random() - .5) * 5;
      points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    svg.append(el("polyline", { points: points.join(" "), class: "kx-strata", style: `--layer:${layer}` }));
  }
  return svg;
}

export function toroidalField({ lines = 28 } = {}) {
  const svg = createSvg("0 0 600 600", "Toroidal field");
  const g = el("g", { transform: "translate(300 300)" });
  for (let index = 0; index < lines; index++) {
    const offset = (index - (lines - 1) / 2) * 7;
    const width = 105 + Math.abs(offset) * .55;
    g.append(el("path", { d: `M 0 -210 C ${width} -150, ${width} ${offset}, 0 0 C -${width} ${offset}, -${width} 150, 0 210`, class: "kx-field-line", style: `--delay:${-index * .13}s` }));
  }
  g.append(el("circle", { r: "24", class: "kx-node" }));
  svg.append(g);
  return svg;
}

export function glyphRing({ segments = 24, seed = 21 } = {}) {
  const svg = createSvg("0 0 500 500", "Procedural glyph ring");
  const g = el("g", { transform: "translate(250 250)" });
  for (let index = 0; index < segments; index++) {
    const angle = (360 / segments) * index;
    const length = 18 + ((index * seed) % 4) * 8;
    const segment = el("path", { d: `M 0 -180 l ${length} -${length} l ${length} ${length} l -${length} ${length} Z`, class: "kx-glyph", transform: `rotate(${angle})` });
    g.append(segment);
  }
  g.append(el("circle", { r: "180", class: "kx-orbit" }), el("circle", { r: "112", class: "kx-hairline" }));
  svg.append(g);
  return svg;
}

export function activityRings({ metrics = [
  { label: "COHERENCE", value: 92 },
  { label: "SIGNAL", value: 71 },
  { label: "MEMORY", value: 48 }
], simbolico = true } = {}) {
  const svg = createSvg("0 0 320 320", simbolico
    ? "Nested activity rings: symbolic plate markings, not system measurements"
    : "Nested activity rings");
  svg.setAttribute("data-symbolic", simbolico ? "true" : "false");
  if (!simbolico) {
    // role="img" would make the individual meters presentational.
    svg.setAttribute("role", "group");
  }
  const g = el("g", { transform: "translate(160 160) rotate(-90)" });
  metrics.slice(0, 4).forEach((metric, index) => {
    const radius = 118 - index * 28;
    const circumference = 2 * Math.PI * radius;
    const value = Math.max(0, Math.min(100, Number(metric.value) || 0));
    g.append(el("circle", { r: radius, class: "kx-ring-track" }));
    const ring = el("circle", {
      r: radius,
      class: "kx-ring-value",
      "data-kx-ring": metric.label,
      "data-value": value,
      "stroke-dasharray": circumference,
      "stroke-dashoffset": circumference * (1 - value / 100),
      style: `--ring:${index}`
    });
    if (!simbolico) applyValueSemantics(ring, { simbolico, label: metric.label ?? "RING", value });
    g.append(ring);
  });
  svg.append(g);
  return svg;
}

export function spotlightCard({ eyebrow = "SPECIMEN", title = "SIGNAL NODE", copy = "A reusable interface surface that reacts to the observer." } = {}) {
  const root = document.createElement("article");
  root.className = "kx-spotlight-card";
  root.innerHTML = `<i aria-hidden="true"></i><small>${eyebrow}</small><strong>${title}</strong><p>${copy}</p>`;
  const update = (event) => {
    const rect = root.getBoundingClientRect();
    root.style.setProperty("--x", `${event.clientX - rect.left}px`);
    root.style.setProperty("--y", `${event.clientY - rect.top}px`);
    root.style.setProperty("--rx", `${((event.clientY - rect.top) / rect.height - .5) * -7}deg`);
    root.style.setProperty("--ry", `${((event.clientX - rect.left) / rect.width - .5) * 7}deg`);
  };
  root.addEventListener("pointermove", update);
  root.addEventListener("pointerleave", () => { root.style.setProperty("--rx", "0deg"); root.style.setProperty("--ry", "0deg"); });
  return root;
}

export function flowField({ particles = 360, seed = 42 } = {}) {
  const canvas = document.createElement("canvas");
  canvas.className = "kx-flow-field";
  canvas.setAttribute("aria-label", "Procedural signal flow field");
  canvas.dataset.particles = String(particles);
  canvas.dataset.seed = String(seed);
  return canvas;
}
