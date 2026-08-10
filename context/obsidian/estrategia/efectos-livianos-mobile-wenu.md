---
title: Efectos visuales inmersivos livianos en mobile — Estándar Wenu Mapu
tipo: guia-ingenieria
estado: canon
fecha: 2026-07-04
aplica-a: wenu-frontend (Astro SSG, dark cósmico ritual)
regla: TODO efecto visual nuevo del sitio DEBE pasar la checklist final antes de mergear.
---

# Efectos visuales inmersivos livianos (mobile-first) — Estándar Wenu Mapu

> Guía de ingeniería, no de marketing. La estética es dark cósmica ritual (obsidiana + ámbar + polvo estelar), y esa atmósfera se logra **barato**. El sitio corre en teléfonos de gama media/baja de gente que descubre la marca por Instagram. Un efecto que crashea o traba **pierde al cliente en el primer scroll**. Este documento es el estándar: se construye liviano de entrada, no se construye pesado y después se arregla.
>
> **La regla de oro de todo el doc:** si un efecto no puede degradarse a algo estático y bello en un teléfono barato, no va.

---

## 0. El caso real que motivó este estándar

Tuvimos un efecto que **crasheaba teléfonos de gama media/baja**. La causa fue la suma de dos errores clásicos, cada uno multiplicador del otro:

1. **Canvas a resolución retina, full-viewport.** Un canvas del tamaño de la pantalla, escalado por `devicePixelRatio` (2x o 3x en teléfonos), significa pintar **4x a 9x más píxeles por frame**. Un canvas "de 400×800" en un iPhone es en realidad un buffer de 1200×2400 = ~2.9 millones de píxeles redibujados 60 veces por segundo.
2. **`pointermove` sin throttle.** El handler de puntero disparaba lógica de dibujo en cada evento. `pointermove`/`mousemove` emiten **muchos más de 60 eventos por segundo**; sin throttle, cada movimiento del dedo forzaba trabajo extra fuera del ciclo de rAF, saturando el main thread y la memoria GPU.

Resultado: presión de memoria GPU + main thread bloqueado → el navegador móvil mata la pestaña. **Todo lo que sigue existe para que esto no vuelva a pasar.**

---

## 1. Presupuesto de performance mobile (el contrato)

**Objetivo: 60fps sostenido en gama media/baja.** A 60fps hay **16.67 ms por frame**. De esos, el navegador ya consume parte (composición, GC, sistema). Presupuesto de trabajo real que podés gastar:

| Recurso | Presupuesto mobile | Nota |
|---|---|---|
| **Tiempo por frame (tu código)** | **≤ 8–10 ms** | Dejá margen. Si tu efecto sostiene 10ms y el sistema hace lo suyo, seguís en 60fps. Pasado 16.67ms → frames caídos = jank visible. |
| **Long tasks** | **0 tareas > 50 ms** | Cualquier bloqueo >50ms del main thread es "long task": congela scroll y tap. |
| **Memoria GPU (texturas/capas)** | **Baja y acotada** | Cada capa compuesta (`will-change`, `transform:translateZ(0)`, canvas grande) reserva una textura. En gama baja la memoria GPU es escasa; muchas capas o texturas grandes → OOM → crash. |
| **Píxeles de canvas** | **DPR capado a 1–1.5 en mobile** | Ver §2. Un canvas retina full-viewport es el error #1. |
| **Partículas / strips / nodos** | **Tope duro (ej. ≤120 en mobile)** | El costo escala lineal con la cantidad. Definí un `MAX` por tier. |
| **Listeners de alta frecuencia** | **Siempre throttled + passive** | `scroll`, `pointermove`, `resize`, `deviceorientation`. |

**Por qué crashean los teléfonos de gama media/baja** (no es "son lentos", es física):
- **Menos RAM y memoria GPU compartida.** Un buffer retina full-viewport puede ser decenas de MB; sumá capas promovidas y el compositor se queda sin memoria → el SO mata la pestaña.
- **GPU y ancho de banda de memoria menores.** Rellenar millones de píxeles por frame (fill-rate) es lo primero que se satura: blur, sombras grandes, gradientes animados y canvas retina son fill-rate killers.
- **Térmico.** Aunque no crashee, el teléfono se calienta, el SO hace throttling y los fps se desploman a mitad de sesión (efecto que "andaba bien" los primeros 10s).
- **Main thread único y frágil.** Si tu JS bloquea el main thread, no hay scroll ni tap: la UI se siente rota aunque técnicamente no crashee.

---

## 2. Reglas de oro (no negociables)

### 2.1 Animá SOLO `transform` y `opacity`
Son las dos únicas propiedades que el navegador puede animar **en el compositor (GPU)** sin recalcular layout ni repintar. Modifican los *property trees* directamente en el hilo compositor; el resto rehace el layout tree en el main thread — operación mucho más cara. ([Motion](https://motion.dev/magazine/web-animation-performance-tier-list), [Browser Rendering Guide 2026](https://abdallahzakzouk.com/blog/browser-rendering-performance-guide))

- ✅ `transform: translate3d() / scale() / rotate()`, `opacity`
- ❌ `width/height`, `top/left/right/bottom`, `margin/padding`, `filter`/`box-shadow` **animados** sobre áreas grandes

### 2.2 Nunca animes propiedades de layout
`width, height, margin, padding, top/left` fuerzan **reflow** (layout thrashing) cada frame. Es el mayor culpable de jank. ([DEV](https://dev.to/nasehbadalov/optimizing-performance-in-css-animations-what-to-avoid-and-how-to-improve-it-bfa)) Para mover/agrandar usá `transform`.

### 2.3 No mezcles lecturas y escrituras de layout en el mismo frame
Leer `offsetHeight`/`scrollTop`/`getBoundingClientRect` **después** de escribir estilos fuerza un *synchronous layout*. Patrón correcto: **leé todo primero, escribí todo después**, dentro de una sola callback de rAF. ([Motion Magazine](https://motion.dev/magazine/web-animation-performance-tier-list))

### 2.4 Evitá `filter: blur()`, `backdrop-filter` y `box-shadow` animados sobre áreas grandes
- `backdrop-filter` **re-renderiza toda la escena de atrás, la difumina y compone encima** — de lo más caro que hay. Mobile aguanta ~3–5 blurs simultáneos y solo con radios < 20px; animar un blur grande baja los fps y **calienta el dispositivo**. ([MDN backdrop-filter](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/backdrop-filter), [SliderRevolution](https://www.sliderrevolution.com/resources/css-blur-effect/))
- Si necesitás glow/aura, **no** lo hagas con `blur` animado ni `box-shadow` que cambia. Usá un **gradiente radial estático con `mask-image`** (ver §5.2) — se pinta una vez y solo se le anima `opacity`/`transform`.

### 2.5 Canvas: capá el DPR en mobile (el fix del crash)
Nunca uses `devicePixelRatio` crudo para un canvas grande en mobile. Cap:

```js
// DPR capado: crisp suficiente, sin buffer retina que revienta la GPU
const isMobile = matchMedia('(pointer: coarse)').matches;
const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
canvas.width  = Math.floor(cssW * dpr);
canvas.height = Math.floor(cssH * dpr);
canvas.style.width  = cssW + 'px';
canvas.style.height = cssH + 'px';
ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // dibujás en coords CSS
```

DPR 1–1.5 en mobile recorta el fill-rate **entre 2.6x y 6x** frente a DPR 3, con diferencia visual mínima para polvo estelar/partículas. ([three.js discourse](https://discourse.threejs.org/t/animate-low-performance-on-mobile-with-window-devicepixelratio-resize/23628), [MDN Optimizing canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas))

### 2.6 `will-change` con moderación y con timing
Cada `will-change` reserva una capa/textura GPU. En una página con muchos elementos promovidos, la presión de memoria **empeora** el rendimiento. Aplicalo solo en la ventana corta antes de animar y limpialo al terminar; no lo dejes puesto "por si acaso" en decenas de elementos. ([Motion Magazine](https://motion.dev/magazine/web-animation-performance-tier-list))

---

## 3. Canvas / rAF bien hechos (patrón de referencia)

Todo efecto con canvas del sitio sigue este esqueleto. Cubre: **un solo rAF, pausa fuera de viewport, pausa con pestaña oculta, pointer throttled + passive, DPR capado, tope de partículas.**

```js
function startStarfield(canvas) {
  const ctx = canvas.getContext('2d', { alpha: true });
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse = matchMedia('(pointer: coarse)').matches;
  const dpr = Math.min(devicePixelRatio || 1, coarse ? 1.5 : 2);

  // Tope de partículas por tier (ver §4)
  const MAX = tier() === 'low' ? 40 : coarse ? 90 : 160;
  let stars = [], raf = 0, running = false, w = 0, h = 0;

  function resize() {
    const r = canvas.getBoundingClientRect();
    w = r.width; h = r.height;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  // Pointer THROTTLED al ritmo de frame + PASSIVE (no bloquea scroll)
  let px = 0.5, py = 0.5, queued = false;
  function onPointer(e) {
    if (queued) return;          // throttle: 1 lectura por frame máx
    queued = true;
    requestAnimationFrame(() => {
      px = e.clientX / w; py = e.clientY / h;
      queued = false;
    });
  }

  function frame() {
    if (!running) return;
    ctx.clearRect(0, 0, w, h);
    for (const s of stars) {
      s.y += s.v;                 // SOLO mover, sin leer layout
      if (s.y > h) s.y = 0;
      ctx.globalAlpha = s.a;
      ctx.fillRect(s.x + (px - 0.5) * s.p, s.y, s.r, s.r); // parallax barato
    }
    raf = requestAnimationFrame(frame);   // UN SOLO rAF, encadenado
  }

  function play()  { if (running || reduce) return; running = true; raf = requestAnimationFrame(frame); }
  function pause() { running = false; cancelAnimationFrame(raf); }

  // Pausar cuando SALE del viewport (no gastes frames en algo invisible)
  new IntersectionObserver(([e]) => e.isIntersecting ? play() : pause(),
    { threshold: 0 }).observe(canvas);

  // Pausar cuando la pestaña se oculta (batería + no matar el device de fondo)
  document.addEventListener('visibilitychange',
    () => document.hidden ? pause() : play());

  addEventListener('resize', debounce(resize, 150), { passive: true });
  if (!coarse) addEventListener('pointermove', onPointer, { passive: true });

  resize();
  stars = seed(MAX, w, h);       // sembrar UNA vez, no por frame
  if (reduce) drawStaticFrame(); // reduced-motion → un frame estático y listo
}
```

Reglas del patrón:
- **Un solo `requestAnimationFrame` encadenado.** Nunca dos loops, nunca `setInterval` para animar. rAF ya throttlea en pestañas de fondo y sincroniza con el refresh. ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas), [Treehouse](https://blog.teamtreehouse.com/efficient-animations-with-requestanimationframe))
- **`IntersectionObserver` para pausar fuera de viewport.** El hero no debe seguir animando cuando el usuario scrolleó al footer.
- **`visibilitychange` / `document.hidden`** para pausar con pestaña oculta o app en background (batería, térmico).
- **Pointer/scroll: throttled al frame + `{ passive: true }`.** `passive` deja al navegador scrollear sin esperar tu handler. En touch, considerá **no** enganchar pointer parallax (el dedo tapa la pantalla) y usar solo drift automático.
- **Sembrá partículas una vez.** Nada de `new`/allocación por frame → dispara GC → micro-stutters. Reusá objetos.
- **Tope duro de partículas por tier.** Nunca "las que entren".

---

## 4. Device tiering (degradación elegante)

La estética se mantiene en todos lados; lo que cambia es **cuánto trabajo se hace**. Detectá el tier una vez al cargar y ramificá.

```js
function tier() {
  const m = matchMedia;
  if (m('(prefers-reduced-motion: reduce)').matches) return 'off';

  const saveData = navigator.connection?.saveData === true;
  const mem   = navigator.deviceMemory   ?? 4;   // GB (Chromium; undefined en Safari/FF)
  const cores = navigator.hardwareConcurrency ?? 4;
  const coarse = m('(pointer: coarse)').matches; // touch/mobile

  if (saveData) return 'low';
  if (mem <= 2 || cores <= 2) return 'low';       // gama baja real
  if (coarse && (mem <= 4 || cores <= 4)) return 'mid';
  return coarse ? 'mid' : 'high';
}
```

| Tier | Señal | Qué se sirve |
|---|---|---|
| `off` | `prefers-reduced-motion: reduce` | **Sin animación.** Frame estático bello (gradiente + estrellas pintadas una vez). Obligatorio honrarlo. |
| `low` | `saveData`, `deviceMemory ≤ 2`, `cores ≤ 2` | **Versión estática:** imagen/SVG/CSS-gradient de fondo. Cero canvas, cero rAF. |
| `mid` | touch + gama media | Canvas con `MAX` reducido, DPR 1.25, sin pointer parallax (solo drift). |
| `high` | desktop / gama alta | Efecto completo, DPR 2, pointer parallax throttled. |

Notas de robustez:
- `navigator.deviceMemory` y `saveData` son **solo Chromium** (Safari/Firefox devuelven `undefined`). Por eso usamos **defaults conservadores** (`?? 4`) y combinamos con `pointer: coarse`, que sí es universal. ([Adaptive Loading — Addy Osmani](https://dev.to/addyosmani/adaptive-loading-improving-web-performance-on-low-end-devices-1m69), [builder.io](https://www.builder.io/blog/web-apis-smooth-resource-intensive-apps))
- **`prefers-reduced-motion` es no negociable.** Es accesibilidad, no una preferencia de gama. Siempre chequeado primero. ([MDN / matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas))
- **Regla de oro del tiering:** el fallback `low`/`off` debe verse **intencional y lindo**, no "roto". Un gradiente cósmico estático con puntitos de estrella pintados una vez es indistinguible de premium en una foto fija.

---

## 5. Catálogo de efectos seguros para Wenu

Marca de costo: 🟢 barato (composición/estático) · 🟡 medio (medir, capar) · 🔴 caro (evitar animado sobre áreas grandes).

### 5.1 Starfield / polvo estelar 🟢🟡
La firma cósmica del sitio. Barato si se hace bien.
- **Barato:** canvas 2D con DPR capado (§2.5), `fillRect` de 1–2px (no `arc`/círculos: menos fill-rate), `MAX` por tier, un solo rAF, pausado por IntersectionObserver. Drift vertical lento con `opacity` variando.
- **Aún más barato (tier low/off):** SVG o PNG estático con puntos + un CSS `@keyframes` de `opacity` en 3–4 capas (twinkle) usando solo `opacity`. Cero JS.
- **Caro (evitar):** un canvas por estrella, `shadowBlur` en canvas (mata fill-rate), círculos con gradiente por partícula.

### 5.2 Glow / aura con `mask-image` 🟢
Halo ámbar alrededor de una pieza o título **sin blur animado**.
- Un `div` con `background: radial-gradient(...)` en `--ember`/`--cosmic-glow`, recortado con `mask-image` (radial) para bordes suaves. Se pinta **una vez**; se anima solo `opacity` o `transform: scale()` para latido (breathing).
- ❌ Nunca `filter: blur()` animado ni `box-shadow` que cambia de radio cada frame (§2.4).

### 5.3 Parallax por scroll o tilt (CSS) 🟢🟡
- **Scroll parallax barato:** capas con `transform: translate3d(0, calc(var(--scroll)*k), 0)`, actualizando `--scroll` **una vez por frame** en un rAF alimentado por un scroll listener `{ passive:true }` throttled. Nunca leer `scrollY` y escribir estilo en el mismo tick sin batch.
- **Tilt (giroscopio):** `deviceorientation` throttled al frame, mapeado a `transform` de 2–3 capas. En mobile suele ser suficiente y evita el pointer. Cap del ángulo para que sea sutil.
- 🟡 Medí: muchas capas grandes con parallax = muchas texturas. 3–4 capas máximo.

### 5.3b Reveals al scroll (IntersectionObserver) 🟢
Fade-in / rise de cards y secciones (ya lo usa el sitio en Featured/Categories/Cardinals).
- `IntersectionObserver` agrega una clase que dispara una transición de **`opacity` + `transform: translateY()`** y nada más. Un solo observer para muchos elementos. Desconectá el observer tras revelar (one-shot). Honra `prefers-reduced-motion` (aparecer sin desplazamiento).

### 5.4 Sensación 3D con CSS `perspective` / `translateZ` 🟢
Profundidad ritual sin WebGL.
- `perspective` en el contenedor + `transform: translateZ()` / `rotateX/Y` en hijos. Se compone en GPU, es barato. Ideal para la "puerta"/portal de secciones, cards que se inclinan sutil al entrar.
- Mantené `transform-style: preserve-3d` acotado a pocos nodos. No anides escenas 3D grandes.

### 5.5 Banda espectral / "frecuencia" 🟢🟡
La banda tipo ecualizador/onda ("TUNE IN"). Barata si es **estática + drift sutil**.
- **Barato:** SVG o gradiente estático de la onda + una animación de `transform: translateX()` en loop (marquee de la textura) o `opacity` pulsante. Da sensación de "señal viva" sin recalcular nada.
- 🟡 Si es canvas reactivo (barras que cambian), aplicá tope de barras, DPR capado, y **no** una barra = un nodo DOM; dibujá todo en un canvas.
- ❌ 60 divs con `height` animado (layout thrash puro, §2.2).

### 5.6 OVNI / sprite WebP 🟢
Elemento narrativo (capa "Hidden Sky").
- Sprite **WebP** (o AVIF) posicionado, animado solo con `transform` (traslación en arco) y `opacity`. Un solo elemento. Preferí un WebP optimizado a un SVG con muchos paths animados.
- Si "flota", `transform: translate3d()` en `@keyframes`, nunca `top/left`.

### 5.7 Geometría sagrada SVG 🟢🟡
Cruces cardinales, constelaciones, líneas rituales (ya en `CardinalGrid`, `/constelaciones`).
- **Barato:** SVG estático; animar trazo con `stroke-dashoffset` (transición de `opacity`/`transform` es aún más barata) para "dibujar" líneas. Pocos paths.
- 🟡 Constelaciones interactivas: dibujá los nodos/líneas en **un canvas** o un SVG con pocos elementos; no cientos de `<circle>` animados individualmente. Reveal por IntersectionObserver, no loop permanente.

---

## 6. Qué evitar — red flags (lo que crashea o traba)

- 🔴 **Canvas full-viewport a DPR retino** (el crash real). Siempre capar DPR en mobile (§2.5).
- 🔴 **`pointermove`/`mousemove` sin throttle y sin `passive`.** Emiten >>60 ev/s; saturan main thread. Throttlealos al frame; en touch, evitá el pointer.
- 🔴 **`filter: blur()` / `backdrop-filter` animados** sobre áreas grandes. Fill-rate killer + calienta el device. ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/backdrop-filter))
- 🔴 **`box-shadow` animado** (blur/spread cambiante) en elementos grandes. Repaint cada frame.
- 🔴 **Animar `width/height/top/left/margin`** → reflow/layout thrash (§2.2).
- 🔴 **`setInterval` para animar.** No sincroniza con el refresh ni pausa en background. Usá rAF.
- 🔴 **Loop que sigue corriendo fuera de viewport o con pestaña oculta.** Batería, térmico, muerte en background.
- 🔴 **Allocar objetos por frame** (partículas nuevas, arrays) → GC → stutters. Sembrá y reusá.
- 🔴 **`will-change` permanente en muchos elementos** → presión de memoria GPU. Scoped y temporal.
- 🔴 **Un nodo DOM por partícula/barra** (100 divs animados). Un canvas, no 100 elementos.
- 🔴 **`shadowBlur` en contexto canvas.** Extremadamente caro por píxel.
- 🔴 **Ignorar `prefers-reduced-motion`.** Es accesibilidad + el escape hatch más barato.

---

## 7. Cómo probar (antes de decir "anda")

1. **Teléfono real de gama baja/media** (no solo el simulador). Scrolleá el efecto completo, entrá y salí de la sección, bloqueá/desbloqueá la pantalla, dejá la pestaña 30s de fondo y volvé. Buscá: jank, calor, batería, y que **no** haya crash/reload de la pestaña.
2. **DevTools → Performance**, con **CPU throttling 4x/6x** y **Network throttling**. Grabá durante el efecto: mirá que no haya **frames > 16.67ms** sostenidos ni **long tasks (>50ms)**. Revisá "Rendering → Frame Rendering Stats" (FPS meter) y **"Paint flashing"** (áreas verdes = repaint; el efecto no debería repintar zonas grandes constantemente).
3. **DevTools → Rendering → "Layer borders"**: contá capas. Si el efecto crea decenas de capas, hay `will-change`/promoción de más.
4. **Lighthouse / PageSpeed Insights (modo mobile)**: chequeá que el efecto no degrade LCP/INP/CLS. El hero animado no debe empujar el LCP ni causar layout shift.
5. **Memoria**: DevTools → Memory / Performance memory track. El heap y la memoria GPU deben **estabilizarse**, no crecer indefinido (leak = allocación por frame).
6. **Emulá `deviceMemory` y `saveData`** (DevTools → Network → "Add custom" / Sensors) para verificar que el tier `low`/`off` sirve la versión estática.
7. **Activá "Reduce motion"** en el SO y verificá que el efecto cae a estático limpio.

([Adaptive Loading — Addy Osmani](https://dev.to/addyosmani/adaptive-loading-improving-web-performance-on-low-end-devices-1m69), [Motion Magazine](https://motion.dev/magazine/web-animation-performance-tier-list))

---

## 8. CHECKLIST — antes de mergear cualquier efecto nuevo

Copiá esto al PR/commit del efecto. **Todos los ítems deben estar tildados.**

```
EFECTO: __________________________  UBICACIÓN: __________________

PRESUPUESTO
[ ] 60fps en gama media/baja real (probado en teléfono, no solo simulador)
[ ] Sin frames >16.67ms sostenidos ni long tasks >50ms (Performance, CPU 6x)
[ ] Memoria estable (no crece por frame); sin allocación por frame

REGLAS DE ORO
[ ] Solo animo transform / opacity (nada de width/height/top/left/margin)
[ ] No leo layout (offset*/getBoundingClientRect) después de escribir en el mismo frame
[ ] Sin filter/backdrop-filter/box-shadow ANIMADOS sobre áreas grandes
[ ] Glow/aura hecho con radial-gradient + mask-image (no blur animado)
[ ] will-change scoped y temporal (no permanente en muchos nodos)

CANVAS / rAF (si aplica)
[ ] DPR capado a 1–1.5 en mobile (matchMedia pointer:coarse)
[ ] Un solo requestAnimationFrame encadenado (nada de setInterval)
[ ] Pausa con IntersectionObserver al salir del viewport
[ ] Pausa con visibilitychange / document.hidden
[ ] pointer/scroll/resize throttled al frame y { passive: true }
[ ] Tope duro de partículas/barras/nodos por tier (MAX definido)
[ ] Partículas sembradas una vez y reusadas (sin new por frame)

DEVICE TIERING
[ ] tier() detecta low/mid/high (hardwareConcurrency, deviceMemory, coarse, saveData)
[ ] Tier low/off sirve versión ESTÁTICA bella (SVG/CSS/imagen, cero canvas)
[ ] prefers-reduced-motion → frame estático, honrado y probado

PRUEBAS
[ ] Lighthouse mobile: no degrada LCP/INP/CLS
[ ] Paint flashing: no repinta zonas grandes constantemente
[ ] Entrar/salir de sección, bloquear pantalla, 30s en background → sin crash
[ ] El fallback estático se ve intencional, no "roto"
```

Si un ítem no se puede tildar, el efecto **se simplifica hasta que se pueda** — no se mergea "y después lo optimizamos".

---

## Fuentes

- [The Web Animation Performance Tier List — Motion Magazine](https://motion.dev/magazine/web-animation-performance-tier-list)
- [The Complete Browser Rendering Guide for 2026 — Abdallah Zakzouk](https://abdallahzakzouk.com/blog/browser-rendering-performance-guide)
- [Optimizing Performance in CSS Animations — DEV](https://dev.to/nasehbadalov/optimizing-performance-in-css-animations-what-to-avoid-and-how-to-improve-it-bfa)
- [Animation performance guide — Motion](https://motion.dev/docs/performance)
- [Optimizing canvas — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas)
- [Efficient Animations with requestAnimationFrame — Treehouse](https://blog.teamtreehouse.com/efficient-animations-with-requestanimationframe)
- [Low performance on mobile with devicePixelRatio — three.js discourse](https://discourse.threejs.org/t/animate-low-performance-on-mobile-with-window-devicepixelratio-resize/23628)
- [backdrop-filter — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/backdrop-filter)
- [CSS Blur Effect — SliderRevolution](https://www.sliderrevolution.com/resources/css-blur-effect/)
- [Adaptive Loading: Improving Web Performance on low-end devices — Addy Osmani](https://dev.to/addyosmani/adaptive-loading-improving-web-performance-on-low-end-devices-1m69)
- [Web APIs for smooth resource intensive apps — builder.io](https://www.builder.io/blog/web-apis-smooth-resource-intensive-apps)

<!-- wenu-backlinks -->
Ver también: [[Home]] · [[estrategia]] · brand tokens en `wenu-frontend/src/styles/tokens.css` (--cosmic-glow, --cosmic-star, --nebula-*)
