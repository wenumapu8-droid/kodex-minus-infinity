# Base de conocimiento — Joyería de piercing (fundamento de dominio)
> Para que los agentes (diseño + inventario) definan taxonomía y carguen datos en NocoDB con criterio experto. 2026-06-22.
> Fuentes: APP / Infinite Body / BodyArtForms / FreshTrends. Cruzar con el saber de Nico (piercer APP-trained).

## 1. Joya según el LUGAR (placement → tipo de joya)

**Oreja**
- Lóbulo (lobe): labret/flat-back stud, aro (hoop/seamless), barbell. Estirado → plug, tunnel, hanger, ear weight.
- Helix / forward helix: flat-back stud (16G, largo típico 6–8mm), aro pequeño.
- Conch: stud (16G, ~8mm), o aro grande (orbital). 
- Tragus / rook / daith / snug / industrial: stud o curved barbell; daith → clicker/aro; industrial → barbell recto largo.

**Nariz**
- Nostril: nostril screw / L-bend / nose bone / flat-back stud (20G–18G), o aro/hoop.
- Septum: clicker, circular barbell (herradura), seamless ring, retainer.
- Bridge: barbell recto curvado.

**Cara / boca**
- Labret (bajo el labio): flat-back stud / push-pin (threadless), 14G–16G.
- Medusa/philtrum, Monroe, Madonna, side labret: flat-back stud.
- Lengua (tongue): barbell recto.

**Cuerpo**
- Navel (ombligo): curved barbell (banana), reverse, floating; charms.
- Nipple: barbell recto o aro.

## 2. Tipos de joya (vocabulario canónico)
- **Flat-back / labret stud** (push-pin si es threadless): el más versátil (lóbulo, helix, nostril, labret).
- **Barbell**: recto (lengua, industrial, nipple) o **curvo/banana** (navel, rook).
- **Captive bead ring (CBR)** / **seamless/segment ring**: aros.
- **Clicker**: aro con bisagra — septum, daith, lóbulo.
- **Circular barbell** (herradura): septum, otros.
- **Nostril screw / L-bend**: nariz.
- **Plug / tunnel**: lóbulo estirado (tunnel = hueco). 
- **Hanger / ear weight**: colgante con peso para lóbulo estirado.

## 3. Calibre (gauge) — sistema y conversión
Gauge baja = más grueso. Equivalencias clave:
- 20G ≈ 0.8mm · 18G ≈ 1.0mm · 16G ≈ 1.2mm · 14G ≈ 1.6mm · 12G ≈ 2.0mm · 10G ≈ 2.4mm · 8G ≈ 3.2mm · 6G ≈ 4mm · 4G ≈ 5mm · 2G ≈ 6mm · 0G ≈ 8mm · 00G ≈ 10mm. Más grande: 11mm, 12mm, 14mm, 16mm… (mm directo).
- Calibres de inicio típicos: nostril 20G/18G · helix/conch/tragus 16G · labret/lengua 14G · navel 14G · lóbulo 20G/18G (luego se estira).
- Largo (length) importa por lugar: helix ~6–8mm, conch ~8mm, labret según anatomía.

## 4. Threading (clave para "fresh" vs healed)
- **Threadless / press-fit (push-pin)**: NeoMetal; 18G/16G (oreja, nostril), 14G (labret/lip). Cómodo, ideal.
- **Internally threaded**: rosca interna, SIN rosca expuesta → mejor para piercings nuevos (no raspa el canal). Estándar de calidad.
- **Externally threaded**: rosca expuesta → EVITAR en piercings frescos (daña tejido). Señal de baja calidad.

## 5. Materiales (seguridad)
- **Titanio implant-grade ASTM F-136**: estándar para piercings nuevos y sensibles. Bio-compatible, hipoalergénico. (Lenguaje canónico Wenu.)
- **Oro 14k sólido**: apto para iniciales de calidad.
- Niobio, vidrio: aptos.
- **Orgánicos (madera, piedra, hueso, asta)**: SOLO para lóbulos ESTIRADOS y YA SANADOS — nunca piercing fresco.
- Acero quirúrgico: uso diario en piezas ya sanadas; no ideal para frescos sensibles.

## 6. Cómo aplicar esto (acciones)
**Taxonomía del sitio (diseño):** organizar "piercing jewelry" por LUGAR/tipo: Septum · Nostril · Labret/Lip · Helix/Conch/Ear cartilage · Lobe · Navel · Stretched (plugs/tunnels/hangers/weights). Mapear cada producto por su nombre/forma (ring→aro, clicker→septum, curved barbell→navel, labret→lip/ear, plug→stretched…).
**Datos NocoDB (inventario):** llenar por producto, con criterio: `Tipo de pieza` (labret/barbell/ring/clicker/plug/tunnel/hanger…), `Subtipo piercing`/placement (septum/nostril/lobe/helix/navel…), `Medida`/gauge (con mm), `Threading` (threadless/internal/external), `Material` (titanium F-136 / silver 950 / 14k / steel / wood…). Inferir del nombre + foto + referencia Ali; marcar confianza; dudosos → confirmar con Ocin.

## 7. MATRIZ MUCHOS-A-MUCHOS (clave) — una joya sirve varios piercings
**Principio:** la joya NO es uno-a-uno con el piercing. Un aro/clicker/barbell sirve VARIOS lugares según **tipo + diámetro + anatomía + calibre**. Por eso en el catálogo **un producto puede aparecer bajo varios filtros de piercing** a la vez.

**Aros / clickers / seamless / segment (por DIÁMETRO):**
- 6–6.5mm: tragus, helix, septum, daith, lóbulo fino, nostril.
- 8mm: lóbulo, helix, daith, septum (el más universal).
- 10mm: septum, nostril alto, lóbulo, daith.
- 11–12mm+ (hasta 18mm): daith, conch, lóbulo grande, septum statement.
→ O sea: **un clicker/aro de 8mm puede listarse en septum + daith + helix + lobe + nostril**.

**Por TIPO de joya → piercings que sirve:**
- Flat-back / labret stud: lóbulo, helix, conch, tragus, flat, nostril, labret/medusa/monroe.
- Barbell recto: lengua, industrial, nipple.
- Curved barbell (banana): navel, rook, eyebrow, daith a veces.
- Circular barbell (herradura): septum, nipple, oreja, septum.
- Clicker / seamless / CBR (aros): septum, daith, nostril, helix, lóbulo, conch, lip — **según diámetro**.
- Nostril screw / L-bend: nostril.
- Plug / tunnel / hanger / weight: lóbulo ESTIRADO.

**Por PIERCING → joya que le sirve:**
- Septum: clicker, circular barbell, seamless ring (8–10mm).
- Daith: clicker/aro chico (6–8mm), curved barbell.
- Nostril: stud/labret (20–18G), screw/L-bend, aro 6–8mm.
- Helix/forward helix: flat-back stud (16G, 6–8mm), aro chico.
- Conch: stud (16G, ~8mm), aro grande/orbital (10–12mm).
- Tragus/rook: stud chico, curved barbell.
- Lóbulo: stud, aro (8–10mm), barbell; estirado → plug/tunnel/hanger/weight.
- Navel: curved barbell (banana) 14G.
- Nipple: barbell recto o aro, 14G.

**Implicancia comercial (lo que pidió Ocin):** cuando alguien pregunta "¿qué tenés para mi daith?", la respuesta es todo aro/clicker de 6–8mm del catálogo — aunque el nombre del producto diga "septum". El sitio debe poder mostrar eso. → **filtro por piercing = muchos-a-muchos**, basado en tipo+diámetro, no en el nombre.

<!-- Relacionado: voz-de-marca.md · BRAND-DNA.md · manual-de-marca-pro-2026-06-21.md · specs-by-sku.json -->
