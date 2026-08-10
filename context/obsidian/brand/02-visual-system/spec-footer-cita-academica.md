---
type: spec · ui footer
topic: Rediseño del footer con ancla académica al libro Wenumapu (Canio & Pozo, 2015)
status: spec listo para ejecutar
date: 2026-06-03
relacionado: [[wenumapu-libro-canon-astronomia-mapuche]]
---

# Spec — Footer con cita académica

> El footer actual lista 17 links en 4 columnas (Shop / Learn / Visit / Legal). Funcional. Lo que falta es un **ancla de autoridad** que respalde por qué la marca se llama Wenu Mapu y por qué tenemos derecho a usar el vocabulario.
>
> Esta sección se agrega ENCIMA del footer de links actual — una banda editorial corta antes del cierre.

---

## Pre-footer: cita Montecino

### Markup

```html
<section class="prefooter">
  <div class="prefooter__inner">
    <blockquote class="prefooter__quote">
      Los astros emergen adosados a su cuerpo, a su vida cotidiana 
      y a su futuro. No hay lejanía, sino distancia con las estrellas, 
      planetas, constelaciones y otros astros que pueblan esa tierra 
      que es también el cielo.
    </blockquote>
    <p class="prefooter__attrib">
      <span class="attrib__name">Sonia Montecino Aguirre</span>
      <span class="attrib__credential">Premio Nacional de Humanidades y Ciencias Sociales, 2013</span>
    </p>
    <p class="prefooter__source">
      contratapa de <cite>Wenumapu — Astronomía y Cosmología Mapuche</cite>,
      Margarita Canio Llanquinao y Gabriel Pozo Menares,
      OCHOLIBROS, 2015 · ISBN 978-956-335-205-4
    </p>
  </div>
</section>
```

### CSS

```css
.prefooter {
  padding: 8rem 2rem 6rem;
  background: var(--obsidian);
  border-top: 1px solid rgba(168, 163, 154, 0.18);
  text-align: center;
}
.prefooter__inner {
  max-width: 720px;
  margin: 0 auto;
}
.prefooter__quote {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: clamp(1.25rem, 2.4vw, 1.75rem);
  line-height: 1.55;
  color: var(--bone);
  letter-spacing: 0.01em;
  margin: 0 0 2.5rem;
  position: relative;
  quotes: "“" "”";
}
.prefooter__quote::before {
  content: open-quote;
  position: absolute;
  left: -0.5em;
  top: -0.4em;
  font-size: 3em;
  color: var(--sand);
  opacity: 0.4;
  font-family: var(--font-display);
}
.prefooter__attrib {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin: 0 0 1rem;
}
.attrib__name {
  font-family: var(--font-display);
  font-size: var(--text-base);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--sand);
}
.attrib__credential {
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  color: var(--silver);
  letter-spacing: 0.04em;
}
.prefooter__source {
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  color: var(--silver);
  letter-spacing: 0.06em;
  opacity: 0.7;
  margin: 0;
  max-width: 560px;
  margin: 0 auto;
}
.prefooter__source cite {
  font-style: italic;
}

@media (max-width: 480px) {
  .prefooter { padding: 5rem 1.25rem 4rem; }
  .prefooter__quote::before { font-size: 2em; left: -0.3em; top: -0.2em; }
}
```

---

## Footer principal: añadir línea de ancla

Modificación al `Footer.astro` actual — agregar UNA línea al cierre del footer, debajo de los 4 columnas:

```html
<div class="footer__canon">
  <p>
    Wenu Mapu honra la cosmovisión mapuche documentada por 
    <strong>Margarita Canio Llanquinao</strong> y 
    <strong>Gabriel Pozo Menares</strong> en
    <cite>Wenumapu — Astronomía y Cosmología Mapuche</cite>
    (OCHOLIBROS, 2015).
  </p>
  <p class="footer__canon-isbn">ISBN 978-956-335-205-4</p>
</div>
```

```css
.footer__canon {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(168, 163, 154, 0.12);
  text-align: center;
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  color: var(--silver);
  letter-spacing: 0.06em;
  line-height: 1.7;
}
.footer__canon p { margin: 0; }
.footer__canon strong {
  color: var(--sand);
  font-weight: 500;
}
.footer__canon cite { font-style: italic; }
.footer__canon-isbn {
  margin-top: 0.5rem !important;
  opacity: 0.6;
}
```

---

## Página dedicada: `/canon`

Como complemento, crear una **página dedicada de respaldo académico** que se enlace desde el pre-footer y desde el about.

URL: `/canon` o `/source` o `/wenumapu-libro` (decidir slug)

Contenido:
- Imagen de la tapa del libro (si tenemos derechos de uso — preguntar a OCHOLIBROS)
- Resumen del libro: 2-3 párrafos
- Autores: bio corta de Canio + Pozo
- Lista de los 30 autores de los relatos orales en lengua mapuche (la página del libro fotografiada)
- Bibliografía sugerida
- Link de compra del libro (OCHOLIBROS o Buscalibre)
- Disclaimer ético: "Wenu Mapu opera comercialmente con el nombre 'Wenu Mapu SpA'. Honramos la fuente y direccionamos lectores hacia los autores."

### Markup base

```html
<section class="canon-page">
  <header class="canon__header">
    <p class="eyebrow">fuente</p>
    <h1 class="canon__title">El libro que da nombre a esta marca</h1>
  </header>
  
  <div class="canon__hero">
    <!-- imagen de la tapa o ilustración propia -->
  </div>
  
  <article class="canon__body">
    <p class="canon__lede">
      Wenu Mapu — el mundo de arriba — no es un nombre inventado por esta marca.
      Es un concepto cosmológico mapuche documentado sistemáticamente por dos 
      autores mapuches que dedicaron años a registrar la astronomía y cosmología 
      de su pueblo: <strong>Margarita Canio Llanquinao</strong> 
      (Lof Kuzako, hablante nativa de mapuzungun) y 
      <strong>Gabriel Pozo Menares</strong> (Doctor en Historia de América).
    </p>
    
    <h2>Sobre el libro</h2>
    <p>
      <cite>Wenumapu: Astronomía y Cosmología Mapuche</cite> 
      (OCHOLIBROS, Temuco, 2015 · ISBN 978-956-335-205-4) reúne el 
      conocimiento de decenas de hablantes mapuche del Wallmapu — los 
      territorios que hoy se conocen como Chile y Argentina. Es un texto 
      bilingüe, en mapuzungun y castellano, con ilustraciones del cielo.
    </p>
    
    <h2>Los 30 autores de los relatos orales</h2>
    <p>
      El libro recoge la voz de 30 hablantes mapuche que aportaron relatos 
      en lengua original. Sus nombres están en cada copia del libro y los 
      reproducimos aquí en reconocimiento:
    </p>
    <ul class="canon__voices">
      <li>Clementina Neculfilu</li>
      <li>Marta Parra</li>
      <li>Aurelia Domihual</li>
      <li>Seberiana Ancanao</li>
      <li>Juana Beltrán</li>
      <li>Aurora Quidel</li>
      <li>Margarita Canio</li>
      <li>Victorina Canio</li>
      <li>Ángela Llanquinao</li>
      <li>María Angélica Llanquinao</li>
      <li>María Angélica Llancavil</li>
      <li>María Pulman</li>
      <li>Laura Aillapan</li>
      <li>Segundo Aninao</li>
      <li>Juan Canio</li>
      <li>Ramón Naupa</li>
      <li>Bernardo Mariluan</li>
      <li>Víctor Ancan</li>
      <li>Cristóbal Huincateo</li>
      <li>Alejandro Huilcapan</li>
      <li>Belisario Pitriqueo</li>
      <li>José Meliñir</li>
      <li>Raúl Levi</li>
      <li>Luis Llanquinao</li>
      <li>Domiciano Cabrera</li>
      <li>Eugenio Millaqueo</li>
      <li>Antonio Mariláf</li>
      <li>Juan Segundo Huenufil</li>
      <li>Ramón Huenufil</li>
      <li>Antonio Cayupul</li>
    </ul>
    
    <h2>Nuestra posición</h2>
    <p>
      Esta marca opera comercialmente bajo el nombre <strong>Wenu Mapu SpA</strong>. 
      No es una institución cultural mapuche, ni un sello étnico autorizado. 
      Es un proyecto de joyería ritual fundado en Truckee, California por 
      <strong>Rodrigo Nicolás Ortega García</strong>, que opera tomando como 
      fuente esta cosmovisión documentada.
    </p>
    <p>
      Reconocemos a los autores. Direccionamos hacia el libro. No reclamamos 
      autoridad académica sobre el contenido del libro mismo.
    </p>
    
    <h2>Para profundizar</h2>
    <p>
      El libro está disponible en librerías de Chile (Buscalibre, OCHOLIBROS 
      directo) y por pedido internacional. Recomendamos su lectura completa 
      a quien quiera entender de verdad lo que estamos llevando en el cuerpo.
    </p>
    
    <p class="canon__cta">
      <a href="https://www.ocholibros.cl" target="_blank" rel="noopener noreferrer">
        OCHOLIBROS →
      </a>
    </p>
  </article>
</section>
```

### CSS

```css
.canon-page {
  max-width: 720px;
  margin: 0 auto;
  padding: 6rem 2rem;
  color: var(--bone);
}
.canon__header { text-align: center; margin-bottom: 4rem; }
.canon__title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3.5rem);
  line-height: 1.15;
  letter-spacing: 0.01em;
  margin: 0.5rem 0;
}
.canon__lede {
  font-family: var(--font-serif);
  font-size: var(--text-lg);
  line-height: 1.7;
  color: var(--bone);
}
.canon__body h2 {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  margin: 3rem 0 1rem;
  color: var(--sand);
}
.canon__voices {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 0.5rem 1.5rem;
  margin: 1.5rem 0 2rem;
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  color: var(--sand);
}
.canon__voices li::before {
  content: "·  ";
  color: var(--ember);
}
.canon__cta {
  text-align: center;
  margin-top: 3rem;
}
.canon__cta a {
  color: var(--ember);
  font-family: var(--font-display);
  letter-spacing: 0.12em;
  text-decoration: none;
  border-bottom: 1px solid var(--ember);
  padding-bottom: 4px;
}
```

---

## Implementación

**Archivos a crear:**
- `src/components/PrefooterQuote.astro` (la cita Montecino)
- `src/pages/canon.astro` (la página de respaldo)

**Archivos a modificar:**
- `src/components/Footer.astro` — agregar bloque `.footer__canon` al final
- `src/layouts/Base.astro` — incluir `<PrefooterQuote />` antes del `<Footer />` (con prop opcional `noQuote` para deshabilitar en checkout o páginas tipo error)
- `src/styles/global.css` — agregar las clases del pre-footer y canon page

**Footer link nuevo:**
En la columna "Legal" o "Learn", agregar:
- *Source · The book that named us* → `/canon`

**SEO:**
La página `/canon` debería:
- Tener `<meta description>` mencionando el libro
- JSON-LD Schema.org `Book` con autores
- Open Graph image: foto de la tapa (si tenemos permiso) o ilustración propia
- `<link rel="canonical">` propio

---

## Decisiones que necesita Ocin

1. **¿Mostrar la cita Montecino en TODAS las páginas (pre-footer global) o solo en home + about + canon?** → Recomiendo **global pero solo en páginas editoriales** (home, about, care-guide, lines/*). Skip en `/p/[slug]`, `/shop`, `/checkout` donde rompería el rythm comercial.

2. **¿Usar la imagen de la tapa del libro en `/canon`?** → Requiere permiso de OCHOLIBROS y/o autores. Si no, crear una ilustración propia inspirada (no replica) en el estilo.

3. **¿Linkear directo a OCHOLIBROS o a Buscalibre?** → Probablemente OCHOLIBROS directo (editorial original). Verificar que el libro esté in stock.

4. **¿Página separada `/canon` o sección del `/about`?** → Página separada. Permite link directo desde footer y desde el pre-footer quote. Mejor SEO.

---

## QA checklist

- [ ] Pre-footer no aparece en `/checkout`, `/p/[slug]`, `/shop`
- [ ] Cita Montecino legible en mobile (línea no superar 70 caracteres)
- [ ] Footer canon link funciona y página `/canon` renderiza
- [ ] Lista de 30 autores legible en mobile (1 columna)
- [ ] ISBN copiable / seleccionable
- [ ] Contraste de attrib__credential vs obsidian > AA
- [ ] OpenGraph image para `/canon` definida
- [ ] JSON-LD Book schema validado en Google Rich Results

---

<!-- wenu-backlinks -->
## 🔗 Contexto
- [[wenumapu-libro-canon-astronomia-mapuche]] — fuente completa
- [[spec-hero-rediseno-tapa-libro]] — el hero también referencia el libro
- [[spec-coleccion-6-lineas-canonicas]] — las líneas se respaldan en este canon
