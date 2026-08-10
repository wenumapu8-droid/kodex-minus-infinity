# KODEX−∞ Living Elements Live Gallery

Una sola página muestra simultáneamente:

1. Portal Ring
2. Mandala Organism
3. Signal Band
4. Signal Sphere
5. Jaguar Tunnel
6. Cardinal Compass
7. Tile Infection Field

## Abrir inmediatamente

En esta carpeta ejecuta:

```bash
python3 -m http.server 8080
```

En Windows también puede ser:

```bat
py -m http.server 8080
```

Abre:

```text
http://localhost:8080
```

## Verlo desde el teléfono

El teléfono y el computador deben estar en la misma red Wi‑Fi.

Busca la IP local del computador y abre:

```text
http://IP-DEL-COMPUTADOR:8080
```

Ejemplo:

```text
http://192.168.1.25:8080
```

Autoriza Python en el firewall para redes privadas si el sistema lo solicita.

## Edición

Todo está dentro de `index.html`.

- CSS: bloque `<style>`
- animaciones: bloque `<script>`
- función de cada organismo:
  - `portal()`
  - `mandala()`
  - `band()`
  - `sphere()`
  - `tunnel()`
  - `compass()`
  - `tiles()`

Guarda el archivo y recarga el navegador.

## Qué representa

Es un laboratorio ejecutable de comportamiento. Usa glifos geométricos
provisionales generados por código. El paso posterior es sustituir la función
`glyph()` por los SVG/SDF exactos de los diseños KODEX, manteniendo los
motores de movimiento.
