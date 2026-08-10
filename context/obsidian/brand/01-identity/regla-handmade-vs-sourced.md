---
type: brand-policy
topic: integridad de origen — handmade vs sourced
status: canonical · prioridad crítica
date: 2026-05-30
trigger: Ocin avisó 2026-05-30 que mucho del inventario es importado (China / AliExpress) y NO sabe siempre cuál es cuál.
---

# Regla canónica — Handmade vs Sourced

## Por qué existe esta regla
Ocin confirmó que **buena parte del inventario** (especialmente piercing/jewelry comprada en AliExpress, mercados de China, etc.) **NO es hecha a mano** por él. En algunos casos él mismo no sabe el origen exacto.

**Reclamar "handmade" sobre piezas importadas en un sitio público es:**
- Falsa publicidad (riesgo legal en USA, especialmente con FTC).
- Daño a la credibilidad de marca cuando un cliente investigue.
- Inconsistente con la posición premium honesta que Wenu Mapu quiere construir.

Y al revés: muchas piezas SÍ son hechas a mano por Ocin / por artistas locales (Galo, Jimmy, Alai Wakan, etc.) y **deben destacarse** porque esa es la diferenciación real.

---

## Las 3 categorías de origen

Cada pieza del inventario debe quedar etiquetada con UNA de estas:

### 🔨 HAND-FORGED · WENU MAPU
Pieza creada físicamente por Ocin en Truckee o en colaboración con otro artista nombrado (Galo Escultor, Jimmy de Atacama, Alai Wakan, etc.).
- Comunicar como: "**Hand-forged in Truckee**" / "**Crafted by Ocin**" / "**Hand-cast in collaboration with [artist name]**".
- Atributos típicos: hangers de bronce, ear weights únicos, ritual rings, piezas con meteorito.

### 🌿 CURATED · INDEPENDENT ARTISTS
Pieza comprada o consignada de artistas independientes, joyeros artesanales o pequeños talleres con autoría verificable (no producción masiva).
- Comunicar como: "**Curated · [Artist name or studio]**" / "**Sourced from independent makers**".
- Atributos típicos: piezas únicas con autoría documentable.

### 🏷 IMPORTED · BODY-SAFE SELECTION
Pieza importada (China, AliExpress, mercados internacionales) **sin autoría verificable** o de producción masiva. Wenu Mapu la curó por seguridad y diseño, no la fabricó.
- Comunicar como: "**Curated import**" / "**Selected for body-safe standard**" / "**Studio-curated piece**".
- NUNCA usar: "handmade", "hand-forged", "hand-cast", "artisan-crafted", "ritually forged".
- Atributos típicos: piercing titanio internally-threaded, labrets con CZ, gemas sintéticas.

---

## Aplicación en NocoDB

Agregar campo `Origen` (single-select enum) a la tabla `Piezas` con valores:
- `hand-forged`
- `curated-independent`
- `imported-curated`

Hasta hoy muchos records no tienen esta info. Auditar pieza por pieza con Ocin en próxima sesión. Si está la duda, marcar `imported-curated` por defecto (más seguro legalmente que afirmar handmade incorrectamente).

---

## Aplicación en el sitio web (wenu-frontend)

### En product card (`/p/[slug]`)
Mostrar un badge claro arriba del título:
- 🔨 **HAND-FORGED** (texto bone, fondo bronze dim, borde dorado)
- 🌿 **CURATED · [ARTIST]**
- ⊙ **CURATED IMPORT** (sin emoji o con un icono sobrio)

### En el copy general
- Reemplazar el copy actual genérico "handmade jewelry" / "handcrafted" por algo más preciso:
  - ✅ "Body jewelry curated and crafted with care."
  - ✅ "Hand-forged originals and curated imports — every piece tested for body-safe standard."
  - ❌ "All our jewelry is handmade in Truckee."

### En la página `/about`
Sección honesta:
> "Wenu Mapu offers two layers of adornment: pieces hand-forged in Truckee by Ocin and collaborating artists, and curated imports selected for body-safe standard. Each product card tells you which is which — because origin is part of the ritual."

Esa transparencia ES la diferenciación premium. Otros venden cualquier cosa como "handmade tribal" sin reparo. Wenu Mapu dice la verdad.

---

## Pendiente operativo

- [ ] Agregar enum `Origen` a NocoDB (al ya existente `Categoría`, `Material`, `Color`, etc.).
- [ ] Auditar cada record y asignar origen. Default = `imported-curated` ante la duda.
- [ ] Actualizar `WooProduct` attributes para soportar este campo.
- [ ] Refactor `/p/[slug]` para mostrar el badge.
- [ ] Limpiar copy del sitio que dice "handmade" genéricamente.
- [ ] Sumar al script de sync una validación: si el record en NocoDB no tiene `Origen`, NO publicar el producto en WC hasta que sea revisado.

---

## Bonus — frases que SÍ funcionan

Cuando Ocin no esté seguro del origen, puede usar lenguaje verdadero sin sobrepromesa:
- "Studio-curated."
- "Selected for ritual integrity."
- "Body-safe titanium, internally threaded."
- "Carried by Wenu Mapu."
- "From our curated selection."

Cuando sí es Hand-forged:
- "Hand-forged in Truckee."
- "Cast by Ocin."
- "One of a kind — created in our studio."
- "Made for you, by us."
- "From our forge."

---

<!-- wenu-backlinks -->
## 🔗 Contexto
- [[30-Auditorias/2026-05-29-ux-audit-jerarquia-comercial]] — el audit habló de "necesitas prueba real".
- [[brand/01-identity/MARCA-maestro]]
- [[02-Operaciones/integraciones/inventario]]
