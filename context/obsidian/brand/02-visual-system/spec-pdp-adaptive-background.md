---
type: spec · ui visual
topic: PDP (product detail page) con fondo adaptativo al color de la foto macro del producto
status: idea propuesta · listo para implementar post-Vegas
date: 2026-06-04
relacionado: [[spec-hero-rediseno-tapa-libro]] · [[quality-bar-vegas]]
fuente: idea Ocin 2026-06-04
---

# Spec — PDP con fondo adaptativo a la foto

> Ocin: *"que la página de producto sea tan bella que cambie de color el fondo según el color de fondo de la foto macro del producto"*
>
> Idea: cada producto "vive" en su propia atmósfera cromática. La página respira el color del fondo de su foto. Una pieza fotografiada sobre obsidian profundo → página obsidian profunda. Una sobre sand cálida → página warm sand. La pieza no compite con el entorno; el entorno la honra.

---

## Por qué esto es brand-correcto

1. **Dark luxury ritual** — cada pieza se trata como un objeto único, no como un item de catálogo. Es exactamente lo que hacen Aesop, Lemaire, Saint Laurent en sus product pages: la página se reorganiza alrededor de la pieza.
2. **Real photo first** — refuerza la regla canónica. La foto es la fuente de verdad; la página es contenedor que se acomoda a ella, no al revés.
3. **Diferenciación** — competidores (BVLA, Anatometal, Maria Tash) tienen PDP con fondo fijo. Hacer fondo adaptativo es **firma visual única** de Wenu Mapu.
4. **Coherencia con la cosmovisión** — el cosmos en el libro Wenumapu tiene paletas variables (rosa nebula, púrpura, azul). Cada pieza puede ser una "estrella" con su propio cielo.

---

## Cómo se vería

### Estado A — pieza sobre obsidian
- Foto: pieza titanium gold sobre fondo obsidian profundo `#080706`
- Página: fondo obsidian completo, texto bone `#F2EDE4`
- Acento ember `#C4935A` en CTA + precio
- Sensación: ritual, secreto, museo

### Estado B — pieza sobre bone
- Foto: ring sterling silver sobre fondo bone `#F2EDE4`
- Página: fondo bone, texto obsidian, sand para subtítulos
- Acento bronze `#8A6A43`
- Sensación: editorial limpio, gallery

### Estado C — pieza con tinte cálido (amatista)
- Foto: amatista hangers sobre fondo púrpura muy desaturado
- Página: fondo `mix(--obsidian, #2a1c3e, 0.6)` — púrpura sutil enmarcado en oscuro
- Acento ember
- Sensación: ritual stone

### Estado D — pieza sobre madera
- Foto: wooden ear weights sobre wood texture cálida
- Página: fondo `mix(--obsidian, #3a2c1e, 0.7)` — marrón cálido apagado
- Acento ember más saturado
- Sensación: organic, slow

---

## Cómo funciona técnicamente

### Approach recomendado: extracción **build-time** (Astro SSG)

**Por qué build-time, no runtime:**
- Astro es SSG → la página se genera estática. Performance perfecto.
- Sin FOUC (flash of unstyled content) — el color ya está en el HTML
- Sin JS extra cliente, sin canvas
- Lighthouse Performance no se ve afectado

**Stack:**
```bash
npm install sharp node-vibrant
```

**Workflow:**

1. En `src/lib/woo.ts` (o helper nuevo `src/lib/palette.ts`):
   - Al cargar productos desde WC, por cada producto descargar la foto macro
   - Usar `sharp` para extraer un crop de 40x40px de las esquinas (top-left, top-right, bottom-left, bottom-right)
   - Promediar los 4 colores → ese es el "color de fondo" verdadero (evita usar dominante de la pieza misma)
   - Pasarlo por `node-vibrant` para variantes (vibrant, muted, dark, light)
   - Cachear el resultado por SKU (no recomputar entre builds si la foto no cambió)

2. En `src/pages/p/[slug].astro`:
   - Recibir el `bgColor` como prop o parte del product data
   - Inyectar como CSS custom property en el `<style>` del frontmatter

**Código ejemplo:**

```astro
---
// src/pages/p/[slug].astro
import { getProduct, getProductPalette } from '../../lib/woo';

const { slug } = Astro.params;
const product = await getProduct(slug);
const palette = await getProductPalette(product.image); 
// palette = { bg: '#0a0807', text: '#F2EDE4', accent: '#C4935A', isDark: true }
---

<Base title={product.name} preloadImage={product.image}>
  <style define:vars={{
    pdpBg: palette.bg,
    pdpText: palette.text,
    pdpAccent: palette.accent
  }}>
    body {
      background: var(--pdpBg);
      color: var(--pdpText);
      transition: background 1.2s cubic-bezier(0.22, 1, 0.36, 1);
    }
    .pdp__price { color: var(--pdpAccent); }
    .pdp__cta { 
      border-color: var(--pdpText); 
      color: var(--pdpText); 
    }
  </style>
  
  <article class="pdp">
    <img src={product.image} alt={product.name} class="pdp__hero" />
    <h1 class="pdp__title">{product.name}</h1>
    <p class="pdp__price">${product.price}</p>
    <!-- ... -->
  </article>
</Base>
```

### Reglas para que NO se rompa la marca

1. **Clamp de saturación:** si el color extraído es muy saturado (S > 0.4), reducir saturación al 0.25 antes de usar. La marca es dark luxury — no neon.
2. **Mix con tokens canónicos:** nunca usar el color extraído puro como fondo. Siempre `mix(extracted, --obsidian, 0.65)` para mantener fondo predominantemente dark.
3. **Texto auto-contraste:** calcular si bg es dark o light (luminancia < 0.5 → dark, usar bone; > 0.5 → light, usar obsidian).
4. **Acento:** elegir entre `--ember` (warm) o `--bronze` (cool) según hue del bg. Hue 0-60 (warm) → ember; 180-300 (cool) → bronze; resto → mix.
5. **Fallback:** si la extracción falla o el color resulta inválido (NaN, undefined), usar `--obsidian` por default. Cero riesgo de page rota.

### Transición visual

Cuando el usuario navega entre productos del shop:
- Body transitions `background-color` con `transition: background-color 0.8s ease`
- Hero image fade-in
- Texto stagger reveal
- Sensación: la página "respira" al cambiar de pieza

---

## Variante extra (opcional, post-MVP)

### Sub-gradiente local

Además del bg sólido, añadir un radial-gradient muy sutil que da profundidad:

```css
body {
  background: 
    radial-gradient(ellipse at center 30%, 
      color-mix(in oklch, var(--pdpBg), white 5%) 0%, 
      var(--pdpBg) 60%, 
      color-mix(in oklch, var(--pdpBg), black 8%) 100%);
}
```

Esto crea un halo sutil detrás de la pieza y vignette en bordes — sin ser "decorativo", sólo respiración.

### Audio (post-Vegas, post-MVP, idea wild)

Algunos PDP de joyería ritual reproducen 2-3 segundos de sonido ambient sutil (cuenco tibetano, viento, etc.) al cargar. Sólo si vibra con el ritual de la marca.

---

## Costos / consideraciones

- **Build time:** +2-5s por producto la primera vez (descarga foto + análisis). Con cache, +0.1s.
- **Bundle:** +200KB en deps de build (sharp + vibrant) pero NO van al cliente — solo build server.
- **Lighthouse:** sin impacto (todo SSR).
- **Mantenimiento:** cuando se sube foto nueva en WC, hay que invalidar el cache de palette para esa pieza. Hacerlo automático en el sync NocoDB → WC.

---

## Roadmap

**Fase 1 (MVP — post-Vegas, 1 día de trabajo):**
- Implementar extracción de palette en build
- Aplicar a UN producto piloto (ej. Ritual Ring Vacamuerta) para validar
- Comparar visual vs versión actual
- Decisión de continuar

**Fase 2 (rollout, 1-2 días):**
- Aplicar a todos los PDP del catálogo
- Audit de QA: cada PDP no debe tener contraste insuficiente
- Fix edge cases (productos sin foto → fallback obsidian)

**Fase 3 (refinamiento):**
- Sub-gradiente radial
- Hero image transitions
- Mobile QA exhaustivo

**Fase 4 (opcional, exploración):**
- Audio ambient
- Páginas de categoría también con paleta promedio de los productos de esa categoría

---

## Inspiración (sitios que hacen algo parecido)

- **Lemaire** — fondo crema/sand en PDP, productos sobre fondo neutro
- **Aesop** — bg cálido / tonos tierra que se acomodan a línea de producto
- **Bvlgari** PDP — fondos black/sand según pieza
- **Mejuri** — bg muted suave que respira con la pieza
- **A24 movie pages** — cada página usa la paleta del poster
- **Spotify Now Playing** — bg cambia con la cover art del album (referencia técnica clásica)

---

## Riesgo a mitigar

**El de "rompe la consistencia de marca":** si cada PDP tiene un fondo diferente, ¿la marca se pierde?
- Respuesta: NO, porque (a) el rango de colores está clampeado a la paleta brand (mix con obsidian), (b) tipografía, layout, spacing, CTA, header y footer permanecen idénticos, (c) el voice (copy + Mapudungun) es el ancla. Lo único que cambia es el "aire" de fondo.

**El de "se ve random":** si las fotos no tienen un fondo consistente, las pages se ven caóticas.
- Respuesta: refuerza la regla [[regla-produccion-real-photo-first]] de que las fotos de producto tengan fondo limpio (obsidian o bone). El día que Ocin haga sesión foto pro, definir 3 backgrounds canónicos: obsidian / bone / wood. Las pages serán una de esas 3 atmósferas — variedad suficiente sin caos.

---

<!-- wenu-backlinks -->
## 🔗 Contexto
- [[spec-hero-rediseno-tapa-libro]] — hero también respira el lenguaje visual
- [[quality-bar-vegas]] — esto refuerza la regla "pro, nothing left to chance"
- [[regla-produccion-real-photo-first]] — fotos de producto tienen que tener fondo limpio para que esto funcione
- [[BRAND-DNA-2026-05-03]] — voz dark luxury ritual
