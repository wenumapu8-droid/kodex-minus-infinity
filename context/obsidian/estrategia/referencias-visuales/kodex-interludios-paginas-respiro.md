---
tipo: referencia-visual
proyecto: KODEX
fecha: 2026-08-01
estado: propuesta (idea de Ocin)
---

# KODEX — Interludios / páginas de respiro

Idea de Ocin (2026-08-01, llegando a casa): entre las escenas densas del viaje KODEX,
intercalar **páginas de respiro muy minimalistas** — al estilo de una **portada de CD**:
una foto/video + **letras verticales**. Para no sobrecargar y dar ritmo.

Referencia: `kodex-interludios-cd-minimalista-ref.jpg` (screenshot de reproductor; la
portada del medio — B&N granulada, montaña/wireframe con tipografía blanca en bloque —
es la que más pega con KODEX; NO el verde del player).

## Lectura de COWORK (asesor)
- **Doble beneficio**: respiro visual + **respiro de GPU** (una página sin shader entre
  dos escenas pesadas mejora fluidez móvil). Alinea con el canon: "signal before noise",
  "margins as breath".
- **Dosis**: 2–3 interludios como **transiciones entre bloques densos** (no uno tras cada
  escena, o se siente relleno y alarga el viaje). Respiro puntual, no destino.
- **Contenido de cada interludio**:
  - Paleta KODEX: obsidiana + hueso + UN acento (no el verde del ref).
  - Una sola línea del manifiesto/mantra, **verbatim**.
  - **Letras verticales**: latín + una palabra en mapudungun.
  - Una foto/video de Ocin (o un paisaje quieto, tipo la montaña B&N del ref).
  - Cero decoración; todo diegético.
- **Implementación**: encajan como transición (KodexTransition) o folio-interludio entre
  escenas. Costo bajo (sin WebGL). Respetar no-scroll, reduced-motion, dos registros.

## Pendiente
- [ ] COWORK: especificar "INTERLUDIOS" en COWORK-BRIDGE.md para que Codex los cablee
      (si Ocin confirma).

[[Home]] · [[00-Index/WenuOS-Modelo-Canonico]]
