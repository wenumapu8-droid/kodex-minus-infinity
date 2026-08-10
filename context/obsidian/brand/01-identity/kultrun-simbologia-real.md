---
type: brand-reference
topic: kultrún · Mapuche cosmovisión
status: canonical
last_updated: 2026-05-29
source: investigación de Ocin + referencias visuales tradicionales
---

# Kultrún — Simbología real

> El kultrún es un instrumento sagrado Mapuche.
> Representa la **Tierra** (centro) y el **Universo**, marcando los **4 puntos cardinales** y las **4 estaciones**.
> Su superficie es el **microcosmos simbólico** de la machi y de la cosmovisión Wallmapu.

Cuando construimos cualquier "cosmic map", portal, divider o navegación basada en la cuatripartición Mapuche, **estos son los símbolos correctos y su significado**. No usar swirls genéricos, soles random ni estrellas decorativas — la simbología es específica y reconocible para la comunidad.

---

## Estructura general

- **Círculo** dividido por una **cruz** (cuadrantes NE/NO/SE/SO).
- La cruz se marca con **líneas gruesas** + a veces líneas auxiliares que radian del centro hacia los bordes.
- Centro = la **Tierra** / el ombligo cósmico.
- 4 cuadrantes = 4 dimensiones de la realidad (espacial + temporal + elemental).

---

## Los 4 puntos cardinales (Meli Witran Mapu — "tierra de los cuatro lugares")

| Cardinal | Mapudungun | Dirección física | Estación | Elemento | Símbolo en el kultrún |
|---|---|---|---|---|---|
| Este | **Puel Mapu** | Hacia la cordillera (Argentina) | **Rimü** (Otoño) | **Küruf** (Viento) | espiral de 4 brazos |
| Norte | **Pikun Mapu** | Tierras del norte | **Puken** (Invierno) | **Ko** (Agua) | luna creciente |
| Oeste | **Lafken / Gulu Mapu** | Hacia el mar (Pacífico) | **Pewü** (Primavera) | **Mapu** (Tierra) | espiral de 4 brazos |
| Sur | **Willi / Williche Mapu** | Tierras del sur | **Walüng** (Verano) | **Antü** (Sol) | estrella de 8 puntas |

(Hay variantes: algunas tradiciones ponen el sol en el este o asocian moon/water al oeste. Lo importante es **mantener la cuatripartición y los 4 símbolos**: luna, sol-estrella, 2 espirales. Confirmar la asignación con un kimche / lonko cuando publiquemos contenido.)

---

## Los 4 símbolos — descripción visual exacta

### 1. Luna creciente (Ko · Agua)
- Forma de **media luna** (crescent), no luna gibosa ni llena.
- Apertura hacia arriba o hacia el lado, abierta y curva.
- Línea fina, sin relleno (en kultrún tradicional pintado).
- No es un símbolo decorativo de "moon emoji" — es austero, geométrico, dibujado a mano sobre cuero.

### 2. Estrella de 8 puntas (Antü · Sol)
- **8 puntas exactas** (no 5, no 6, no 12).
- Cuatro puntas mayores (cardinales) + cuatro puntas menores entre ellas.
- Las puntas se forman desde dos cuadrados superpuestos rotados 45° (geometría octagonal).
- Es el **wünelfe** / sol radiante — máxima fuerza.
- Línea fina, contorno solamente. Sin gradiente, sin glow.

### 3. Espiral de 4 brazos (Küruf / Mapu — Viento o Tierra)
- **NO es un swirl genérico ni un yin-yang**. Es una espiral específica:
  - 4 brazos curvos que salen de un punto central.
  - Cada brazo termina en una pequeña curva o vuelta.
  - Se ve como **un molino de viento estilizado** o **una hélice de 4 aspas con curvatura ritual**.
  - Asimétrico-rotacional: todos los brazos giran en el mismo sentido.
- En kultrún a menudo se pintan dos: uno para Küruf (viento) y otro para Mapu (tierra).

### 4. (Variantes) Trutruka / Espadas / Líneas auxiliares
- Algunas representaciones muestran adicionalmente **líneas radiales** dentro de cada cuadrante (parecidas a rayos).
- Esto NO son decoración — representa la energía que fluye desde el centro hacia los bordes.

---

## Lo que NO se debe hacer (errores visuales comunes en branding)

- ❌ Usar swirls de tatuaje genéricos o spirals de Photoshop como sustituto del küruf.
- ❌ Reemplazar la luna creciente por un disco lleno o un símbolo lunar abstracto.
- ❌ Usar estrella de 5 puntas (pentagram) o 6 puntas (Star of David) — son símbolos de otras tradiciones.
- ❌ Animaciones de spinner / rueda giratoria — el kultrún es estático, su rotación es ritual, no visual.
- ❌ Colores random: tradicionalmente la paleta del kultrún pintado es **rojo + amarillo + negro/marrón sobre cuero claro**. En nuestro contexto dark-luxury, traducir a **bronze + bone + obsidian**.
- ❌ Texto en español sin acompañamiento en Mapudungun cuando se nombran los lugares.

---

## Aplicación práctica en wenu-frontend

Componentes que deben respetar esta simbología:
- `src/components/CardinalGrid.astro` (la sección "Küme kimün" de las 4 direcciones).
- Cualquier divider tipo `PatternBand` en variant "altar".
- El sello del oráculo (sigil que gira lento en `PowerAnimalsOracle.astro`) — si lo basamos en kultrún en vez de chakana genérica.
- Posibles favicons / og:images.

Cada uno debe usar las SVG canónicas (definir un set en `public/img/brand/symbols/`):
- `kultrun-moon.svg`
- `kultrun-sun-8.svg`
- `kultrun-spiral-4arm.svg`
- `kultrun-cross.svg` (la cruz interior con sus líneas auxiliares)

---

## Sobre la chakana

La chakana (cruz andina escalonada) es de la tradición **quechua/aymara**, NO Mapuche.
Lo que se ve en el logo de Wenu Mapu como "chakana" es en realidad un **mandala textil mapuche con motivos de 4 svásticas** (los 4 küruf girando en torno al centro) — es una representación tejida del kultrún, no la chakana andina.

Cuando hablemos públicamente del símbolo:
- ✅ "Mandala textil mapuche"
- ✅ "Sello kultrún"
- ✅ "4 küruf" o "4 swastikas mapuche"
- ❌ "Chakana" (es préstamo de otra tradición; respetuoso de las dos culturas mantenerlo separado)

---

## Referencias usadas (screenshots de investigación 2026-05-29)

- Mapu Chillkantukun Zugu — "Descolonizando el Mapa del Wallmapu" (Puel/Willi/Lafken/Pikun + Puken/Rimu/Pewü/Walüng + 4 símbolos).
- Pinterest "Diseña tu propio Kultrún" — esquema escolar limpio con luna, sol-8, 2 espirales.
- Facebook Kimeltuwe — "Vientos y división territorial Mapuche" (Mawün / Nagpa / Püraap / Waywen küruf).
- Powerpoint "Significado Kultrún" (Facultad de Ciencias) — Ko · Küruf · Mapu · Antü con sus íconos.
- Pueblos Originarios — diagrama del Meli Witran Mapu con cruz central y 4 küruf giratorios.

Archivos crudos: ver `/Users/user1/Library/.../uploads/{715dff79,6b5336a0,a84934e7,30bf88e8,6dfbced5,e930e68c}` (transitorios; capturar buenas referencias en `brand/02-visual-system/kultrun-references/` cuando se renueve la carpeta).

---

## Próximos pasos

- [ ] Verificar la asignación quadrante↔símbolo con un kimche / referente Mapuche antes de imprimir o tatuar (existen variantes regionales).
- [ ] Crear las 4 SVG canónicas y reemplazar los símbolos genéricos actuales en `CardinalGrid.astro`.
- [ ] Actualizar la documentación del brand-system para que cite este archivo como fuente.

---

<!-- wenu-backlinks -->
## 🔗 Contexto
- [[02-visual-system/brand-system]]
- [[01-identity/MARCA-maestro]]
- [[02-visual-system/patterns-textures]]
