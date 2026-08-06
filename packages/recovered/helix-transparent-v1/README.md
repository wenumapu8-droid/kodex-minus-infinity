# KODEX — Hélice transparente

## Abrir

Abre `index.html` en Chrome, Edge, Firefox o Safari.

## Transparencia

El canvas usa contexto alfa y cada frame se limpia con:

```js
ctx.clearRect(0, 0, canvas.width, canvas.height);
```

No se dibuja ningún fondo.

## Cambiar color

Dentro de `helix.js`:

```js
let darkLine = true;
```

- `true`: líneas negras.
- `false`: líneas blancas.

También puedes alternarlo con el botón `BLACK / WHITE`.

## Loop perfecto

La fase siempre recorre exactamente:

```js
0 → 2π
```

en `240` frames.

## Exportar un fotograma PNG transparente

Pulsa `SAVE PNG`.

## Exportar animación con transparencia

Captura los frames como PNG y codifica WebM VP9 con alfa:

```bash
ffmpeg -framerate 30 -i frame_%04d.png \
  -c:v libvpx-vp9 \
  -pix_fmt yuva420p \
  -auto-alt-ref 0 \
  kodex-helix-alpha.webm
```

MP4/H.264 convencional no conserva transparencia.
