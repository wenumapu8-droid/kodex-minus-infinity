# KODEX−∞ GENERATIVE MODULES MASTER v1

Biblioteca original de **72 módulos generativos** para KODEX, construida con Canvas 2D y sin dependencias.

## Qué contiene

- 72 conceptos codificados.
- 12 motores compartidos:
  - orbital
  - portal
  - telemetry
  - pattern
  - network
  - organism
  - particles
  - field
  - anomaly
  - quiet
  - architecture
  - typography
- 8 atmósferas:
  - Deep
  - Chill Out
  - Acid
  - Ritual
  - Specimen
  - Archive
  - Cosmology
  - Descent
- 3 perfiles:
  - full
  - balanced
  - low-power
- Componente Astro.
- Demo con selector de los 72 módulos.
- Wrappers individuales para cada concepto.
- Estado global, puntero, audio probe y métricas.
- Documentación de integración y QA.

## Importante

Los 72 módulos están implementados mediante motores compartidos y presets diferenciados. No son 72 shaders completamente independientes. Esta arquitectura permite mantener consistencia, rendimiento y evolución sin duplicar miles de líneas.

## Abrir demo

```bash
cd KODEX_GENERATIVE_MODULES_MASTER_v1
python3 -m http.server 8080
```

Abrir:

```text
http://localhost:8080
```

## Integración básica

```js
import { mountKodexModule } from './src/core/engine.js';

const module = mountKodexModule({
  canvas: '#canvas',
  module: 'moth-oracle',
  atmosphere: 'ritual',
  quality: 'balanced',
});

module.setState({
  signal: 0.82,
  focus: 0.61,
  anomaly: 0.18,
});
```

## Astro

Copia:

```text
src/astro/KodexGenerativeModule.astro
src/styles/kodex-generative-modules.css
public/assets/kodex/modules/
```

Uso:

```astro
<KodexGenerativeModule
  module="acid-cellular"
  atmosphere="acid"
  quality="balanced"
/>
```

## API

```js
engine.setModule('root-lattice');
engine.setAtmosphere('cosmology');
engine.setQuality('low-power');
engine.setState({ signal: 0.9, focus: 0.7 });
engine.start();
engine.stop();
engine.destroy();
```
