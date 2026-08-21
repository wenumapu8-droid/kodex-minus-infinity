# CALIBRACIÓN

> En castellano a propósito: documenta un cuerpo de mediciones que se hizo y se
> escribió en castellano (`scripts/lamina/`, el kit de lámina del sitio), y
> traducirlo agrega una capa de interpretación justo donde importa el número
> exacto.

Las constantes geométricas de las primitivas de esta librería **no son
elecciones de diseño**. Son mediciones contra las láminas originales
(`reference/canon/*.png`), hechas una por una, comparando píxel a píxel. Cada
una tiene un valor porque los otros valores dieron peor, y ese "peor" está
medido, no opinado.

Este documento existe porque esa información no se defiende sola. Leyendo
`razon = 0.93` nadie ve que 0.82 se probó y colapsó; leyendo un desfase
asimétrico nadie ve que el simétrico se leía como ecualizador. Un cambio "porque
se ve mejor" pasa una revisión humana sin hacer ruido, y la lámina se aleja de
la referencia sin que nadie se entere hasta que hay que rehacerla.

---

## 1. De dónde salen los números

### El instrumento

El banco de fotocopia (`scripts/lamina/` en el repo del sitio) captura lo
construido en código y lo mide contra el PNG original:

- captura con Playwright a **deviceScaleFactor 1** y viewport exacto al tamaño
  de la referencia — capturar a 2× y reescalar mide el resampleo, no el diseño;
- animaciones apagadas y gancho `window.__kdxFreeze(0)` antes de disparar;
- diferencia con **pixelmatch**, `threshold: 0.12`, `includeAA: false`;
- puntaje **por región**, nunca global: en una lámina de 1672×941 el diff global
  está dominado por el héroe procedural y esconde que un panel entero está mal.

El resultado es un porcentaje de píxeles distintos dentro de una caja. Es el
único árbitro. "Se parece" no es un dato y con quince agentes dibujando no
converge: cada uno cree que ya está.

### El método por constante

1. se aísla la caja del panel en la referencia (`detect-regions.mjs`, luego
   ajuste a mano cuando el panel no tiene marco);
2. se dibuja la primitiva en esa caja exacta;
3. se **barre** el parámetro por valores discretos y se puntúa cada uno;
4. se toma el mínimo, y si hay meseta, el centro de la meseta.

Ejemplo real, el umbral de binarizado de los glifos: se barrió 34 / 45 / 55 / 65
/ 80 midiendo cada resultado contra la franja original. 34 engorda el trazo
(**7,64 %**), 80 lo rompe (**7,48 %**), y la meseta 45–65 da **6,01 %**. Quedó
55. Nadie eligió 55 mirando la pantalla.

### Los colores también se midieron

La tinta de los glifos se sacó muestreando el PNG, no del token de marca: es
**gris neutro `#787a77`** en los altos y `#565755` de media. Pintarlos del
naranja/violeta de acento es un error que salta enseguida en el diff.

---

## 2. Tabla de constantes

Origen: `src/components/kodex/lamina/kit/` del repo del sitio y su `README.md`.
Al portar una primitiva al Atlas, estos valores viajan tal cual.

### Disco radial (`RadialScanner` → `radial-scanner`)

| constante | valor medido | qué pasa si se cambia |
|---|---|---|
| progresión de radios de anillo | geométrica, **razón 0,93** | reparto parejo (`i * 25`, que es lo que hacía el Atlas antes de portar el kit) se lee como **blanco de tiro**; 0,82 los colapsa al centro y se lee como **diana** |
| opacidad por anillo | `0,16 + r()·0,70` | igualarlas convierte el instrumento en **figura de CAD**; el piso 0,16 existe porque por debajo el anillo desaparece y el disco se ve mordido |
| grosor por anillo | `0,28`, con `+0,50` en ~22 % de los anillos | el peso irregular es lo que distingue trazado de instrumento |
| trazos fríos | ~14 % de los anillos en color frío | en las referencias siempre hay unos pocos, nunca ninguno y nunca muchos |
| arranque de los radios | `rmax · 0,14` (o `núcleo/rmax + 0,06`) | **los radios no arrancan en el centro**: dejan libre el núcleo |
| largo de los radios | `rmax · (0,86 + r()·0,20)` | terminar todos parejos vuelve a leerse como diana |
| opacidad de radios | `0,08 + r()·0,26` | |
| marcas exteriores | de `rmax·1,02` a `1,07`; cada 5.ª a `1,14` | |
| trazo base | `stroke-width 0,3` | |

### Onda (`Waveform` → `waveform`)

| constante | valor medido | qué pasa si se cambia |
|---|---|---|
| desfase de aguja (peine) | `(r() − 0,5) · alto · 0,18` | **las agujas no son simétricas respecto del eje**; simétricas se leen como ecualizador |
| inercia de la serie | `0,20` peine · `0,82` línea y barras | inercia 0 es ruido blanco: dientes parejos, sin forma. Los instrumentos de las referencias tienen deriva |
| muestras | `w / 1,6` peine y línea · `w / 3` barras | |
| ancho de barra | `max(0,8; paso · 0,55)` | |
| grosor por defecto | `0,8` | |

### Barra de progreso (`BarMeter`)

| constante | valor medido | qué pasa si se cambia |
|---|---|---|
| **no es sólida** | tira de marcas verticales | sólida se lee como `<progress>` de navegador |
| ancho de marca | `paso · (0,45 + r()·0,75)`, piso 0,7 px | anchos iguales se leen como trama regular y delatan que es CSS |
| separación | `paso · (0,28 + r()·0,50)` | |
| paso por defecto | `3 px` | |
| opacidad del tramo vacío | `0,16` | |

### Dona (`RingGauge`)

| constante | valor medido |
|---|---|
| arranque | `−90°` (arriba), como en todas las referencias |
| grosor | `max(3; d · 0,22)` |
| resto del anillo | opacidad `0,22` |
| técnica | `stroke-dasharray` sobre un círculo, no arcos por gajo: a 40 px de diámetro no se nota y ahorra cuatro comandos y trigonometría por segmento |

### Serie con área (`StepGraph`)

| constante | valor medido | qué pasa si se cambia |
|---|---|---|
| tendencia | exponencial, `t^1,6 · 0,85` | lineal no arranca plana ni se dispara al final, que es la forma de la referencia |
| diente | `0,16` sobre la tendencia | |
| recorte | `0,02 … 0,98` | |
| retícula | `stroke-width 0,3`, opacidad `0,2`, por defecto 5×4 | |
| márgenes | `16 px` izquierda y `9 px` abajo **solo si hay etiquetas** | un gráfico sin ejes debe llenar su caja entera; si flota, el diff lo castiga por desplazamiento aunque el dibujo esté bien |
| etiquetas | `5,5 px`, `letter-spacing 0,06em`, opacidad `0,75` | |
| resultado | **8,04 %** contra la referencia, a mano | |

### Micrografía (`Micrografia`)

| constante | valor medido | qué pasa si se cambia |
|---|---|---|
| **no es texto** | son marcas que imitan la mancha | a 2–3 px nada es legible, y poner texto real sería **inventar contenido** — prohibido por el protocolo de passports |
| renglón | `3 px`, marca `1 px` | |
| densidad | `0,72` | |
| ancho de palabra | `5 px · (0,3 + r()·1,4)`, separación `5 px · (0,22 + r()·0,35)` | |
| sangría inicial | `r() · palabra · 0,8` | los bloques de la referencia no arrancan todos en el mismo x, y esa irregularidad es la mitad del efecto |
| fin de renglón | `w · (0,55 + r()·0,45)` | |
| renglones vacíos | `12 %` | |
| opacidad | `0,5` | |
| implementación | **un solo `<path>`** de rectángulos | a densidad alta son cientos de marcas por bloque y N elementos hacen pesado el DOM |

### Arte fija (glifos, sellos, emblemas, códigos de barras)

| constante | valor medido | notas |
|---|---|---|
| color de tinta | **`#787a77`** altos · `#565755` media | **gris neutro, NO el color de acento** |
| umbral de binarizado | `55` (meseta 45–65 = 6,01 %) | 34 → 7,64 % · 80 → 7,48 % |
| emblema alado | umbral `26` | su luminancia máxima es 74; con 55 se parte en cinco fragmentos |
| sobremuestreo | `×8`, kernel `nearest` | vtracer traza contornos: sobre 20 px salen escalonados, sobre 160 px salen limpios |
| inversión | obligatoria | vtracer binario traza lo oscuro; acá la tinta es lo claro |

Los glifos **no se dibujan**: se trazan del original con `glyphs.mjs`. Siete
glifos en 90 segundos con 6,01 % de diferencia. Un agente gastó ~100 k tokens en
seis de los mismos y los entregó, por su propia descripción, como
«reconstrucciones a ojo» — que es un techo de fidelidad, no un resultado.

### Reglas transversales

| regla | por qué |
|---|---|
| **determinismo**: `rng(semilla)` mulberry32, nunca `Math.random()` | el banco compara píxel a píxel; con azar real dos capturas de la misma página dan puntajes distintos y el equipo persigue ruido en vez de converger |
| `serieSuave` con inercia `0,75` por defecto | una serie independiente se ve como ruido blanco; los instrumentos tienen deriva |
| redondeo a 2 decimales (`p2`) | evita SVG con 14 dígitos por punto, y hace el diff de código legible |
| **telemetría simbólica**: `data-symbolic="true"` por defecto | los números de las referencias son ficción del póster. El canon **prohíbe** presentarlos como estado real del sistema. Solo `simbolico={false}` cuando el valor viene de una medición real del motor |
| sin librerías de gráficos | ECharts pesa 61 MB en `node_modules` y trae su propio motor de ejes y márgenes, no direccionable al píxel. Para un tablero propio es la herramienta correcta; para **reproducir** un gráfico de 179×115 con los ticks donde ya están, pelea en cada píxel. Si hace falta matemática, `d3-shape` y `d3-scale`: unos KB puros, sin opinión sobre el DOM |

---

## 3. Cómo se pierde la calibración

Se pierde así, y siempre así:

1. alguien mira una primitiva y le parece que **se ve mejor** con otro valor;
2. el cambio pasa la revisión, porque leyendo el diff de código es un número
   distinto y nada más;
3. la línea base del banco se regraba «para dejarlo en verde»;
4. a partir de ahí el banco certifica el dibujo nuevo, y la referencia deja de
   ser el árbitro.

El paso 3 es el irreversible: mientras la línea base sea la vieja, el número
grita. Una vez regrabada, no queda rastro.

**Regla:** cambiar una de estas constantes exige **volver a medir**, no volver a
mirar. El procedimiento mínimo es: barrer el parámetro, puntuar cada valor
contra la referencia, y adjuntar los números en el commit. Si no hay número, no
hay cambio.

Corolario: un valor que empeora la fidelidad puede aceptarse igual — a veces se
paga fidelidad por accesibilidad o por rendimiento — pero se acepta **sabiendo
cuánto cuesta**, y eso queda escrito.

---

## 4. El banco como test de regresión

`scripts/regression.mjs` es el banco apuntado a esta librería.

```bash
npm run test:regression                  # medir
node scripts/regression.mjs --update     # regrabar la línea base (deliberado)
node scripts/regression.mjs --solo waveform
node scripts/regression.mjs --umbral 0.5
```

Va aparte de `npm test` a propósito: `npm test` son contratos de datos y corre
en cualquier lado en un segundo; esto necesita un navegador y la instalación del
sitio al lado. Un test suite que no corre sin 300 MB de navegador se termina
saltando entero, y con él los contratos.

Renderiza un tablero con **todas** las primitivas a valores fijos y semilla
fija, lo captura con Playwright y lo compara **celda por celda** contra
`tests/baseline/board.png`. El informe nombra la primitiva que cambió y deja un
tríptico `línea base | actual | diff` en `tests/regression-out/celdas/<id>.png`.

Mide en dos capas, y hacen falta las dos:

| capa | pregunta que responde | necesita |
|---|---|---|
| **deriva** contra `tests/baseline/board.png` | ¿cambió el dibujo? | nada, corre siempre |
| **fidelidad** contra `reference/canon/*.png` | ¿cambió a peor? | las referencias montadas y una caja medida por celda |

La capa de deriva sola congela cualquier estado, incluido uno malo. La de
fidelidad sola no ve las primitivas que todavía no tienen caja medida.

**Umbrales.** 0,30 % de píxeles distintos por celda. Por debajo de eso lo que
aparece son diferencias de rasterizado (una curva que cae medio píxel distinto
según la versión de Chromium) y un banco que se queja del rasterizado se apaga
en una semana. La fidelidad tolera 0,50 puntos de empeoramiento antes de fallar.

**Dependencias.** Ninguna nueva. Playwright, pixelmatch y pngjs se resuelven
contra la instalación del sitio (`KODEX_WORK`, por defecto
`~/kodex-work`); las referencias, contra `KODEX_REFERENCES`. Este paquete no
tiene `node_modules` y no va a tener 300 MB de navegador por un test.

**El tablero incluye el CSS.** Carga `src/tokens.css` y `gallery/styles.css`,
porque hoy las clases `kx-*` viven ahí y sin ellas las primitivas no se ven como
se ven. La consecuencia es deliberada: un cambio en la hoja de la galería que
pise una primitiva aparece como regresión de esa primitiva. Es información real
—la geometría medida se puede perder por CSS igual que por un número— y ya pasó
una vez mientras se escribía este banco.

**La línea base es específica de la máquina.** Depende de la versión de Chromium
y de las tipografías instaladas (el tablero fija un respaldo monoespaciado local
porque `IBM Plex Mono` no está). En otra máquina se regraba una vez y se anota
el entorno, que ya viaja en `tests/baseline/board.json`.

### Dar de alta la fidelidad de una celda

Hoy ninguna celda tiene caja medida y el script lo dice en cada corrida. Para
darla de alta:

1. sacar la caja del panel en la lámina (§5);
2. poner la celda **exactamente** de ese tamaño en `CELDAS`, dentro de
   `scripts/regression.mjs`, y agregarle
   `ref: { slug: "t01-03-descent-tunnel", caja: { x, y, w, h } }`;
3. correr `--update`: el puntaje medido queda anotado en
   `tests/baseline/fidelity.json` como el techo a respetar.

A partir de ahí, cualquier cambio que aleje esa primitiva de la lámina falla con
nombre y apellido.

### Al portar geometría nueva

El tablero cubre hoy las 20 celdas de la librería, incluidas las seis piezas
calibradas del kit (`ring-gauge`, `bar-meter`, `step-graph`, `micrografia` y las
variantes peine y barras de la onda). Esas seis van **a su tamaño natural**, no
a una caja cómoda: el SVG llena su celda, así que una celda de otra proporción
las estira y el banco pasaría a medir un escalado en vez de la geometría medida.
Por eso el gráfico de serie se mide en 179×115, que es su tamaño en la lámina.

`scripts/regression.mjs` lleva además una lista `PENDIENTES`, hoy vacía: es
donde se anota geometría medida que todavía no está en la librería, para que no
desaparezca de la vista. Se imprime en cada corrida.

Al agregar una celda va **al final** de `CELDAS`: el empaquetado es por estantes
en orden, así que insertar en el medio corre las cajas de todas las que siguen y
obliga a regrabar la línea base entera.

---

## 5. Flujo completo para la próxima lámina

Los tiempos son medidos, no estimados.

```
                                              ┌─ referencia: reference/canon/<slug>.png
                                              │
  1 · detect-regions ──► regions/<slug>.json  ┘   retícula de paneles, automática
          │
  2 · medir cajas por banda ──► paneles/<slug>.json
          │
  3 · glyphs.mjs ──► glyphs/<slug>/*.svg          arte fija: se traza, no se dibuja
          │
  4 · componer desde recetas ──► la lámina
          │
  5 · score-panel ──► un panel, 2,7 s             iterar hasta que el número baje
          │
  6 · iterate ──► la lámina entera + historial
```

**1 · Detectar la retícula.**

```bash
node scripts/lamina/detect-regions.mjs <slug> [--min-run 0.16] [--ink 26]
```

Las láminas son marcos claros de 1 px sobre negro: una fila con un tramo
continuo largo de tinta es una regla horizontal, y cruzando reglas sale la
retícula. `--min-run` va bajo a propósito (0,16) porque el marco de un panel
cruza su columna, no la lámina entera; con 0,55 solo aparece el marco exterior.
Los paneles sin marco no los detecta: ésos se ajustan a mano sobre el JSON, y
los `nombre` puestos a mano sobreviven a volver a correrlo.

Automático y no a ojo porque son 17 láminas de 8 a 11 paneles cada una: ~170
cajas. Y sobre todo porque **las cajas medidas del archivo son la verdad**,
mientras que las estimadas mirando la imagen meten error dentro del instrumento
de medición.

**2 · Medir las cajas por banda.** Del JSON de regiones sale
`paneles/<slug>.json`: id, nombre y caja de cada panel, que es la unidad de
trabajo y de puntaje. Es donde se reparte el trabajo sin que nadie pise a nadie.

**3 · Trazar la arte fija.**

```bash
node scripts/lamina/glyphs.mjs <slug> --band y0,y1 --x x0,x1 --umbral 55
```

Glifos, sellos, emblemas y códigos de barras **no van en el kit ni se dibujan**:
son dibujos fijos y se sacan del original. Si un glifo se parte en fragmentos,
es luminancia baja: bajar el umbral solo para ése (el emblema alado va a 26).

**4 · Componer desde recetas.** Los paneles se arman con las primitivas del kit
y las recetas JSON del Atlas. Antes de dibujar algo nuevo, mirar el kit: la
lámina 1 terminó con **trece juegos distintos de medidores** porque trece
agentes dibujaron cada uno el suyo.

**5 · Puntuar panel por panel.**

```bash
node scripts/lamina/score-panel.mjs <slug> <PanelId> --triptico   # 2,7 s
```

Sirve el dev server en vez de construir y recorta a la caja del panel. Guarda
historial por panel, así que dice `MEJORA` / `EMPEORÓ` respecto de la corrida
anterior — la única pregunta que importa mientras se itera. En la primera lámina
los agentes verificaban con `astro build` entero: 19 segundos y 1.558 páginas
para mirar un recuadro de 547×110. Fue uno de los dos grandes sumideros de costo
(el otro fue redibujar a ojo lo que se puede trazar).

**6 · Cerrar la vuelta.**

```bash
node scripts/lamina/iterate.mjs <slug> --crops
```

Build → servir → capturar → puntuar por región → recortar comparaciones →
guardar la vuelta. Guarda **historial global**, que es lo que atrapa el fallo
clásico del bucle: un cambio mejora un panel y empeora tres, y sin serie nadie
se entera hasta que la lámina entera está peor que hace cinco vueltas. Reporta
solo las regiones que empeoraron más de 1,5 puntos.

**7 · Devolver lo aprendido.** Si de la lámina sale una constante nueva o se
corrige una vieja: al kit, a esta tabla, y al tablero de
`scripts/regression.mjs`. Una medición que se queda en el `out/` de una lámina
se vuelve a pagar en la siguiente.
