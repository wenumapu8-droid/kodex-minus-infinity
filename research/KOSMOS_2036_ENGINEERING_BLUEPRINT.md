# KOSMOS 2036 — Engineering Blueprint

**Proyecto:** KODEX−∞  
**Versión:** 0.1 / diseño de evolución y prototipo offline  
**Fecha:** 2026-10-11  
**Estatus:** KOSMOS 2036 es un nombre elegido por el creador (CANONICAL); el software actual es un PROTOTYPE, no una app conectada o desplegada.  
**Tesis:** una máquina temporal creíble debe poder registrar pronósticos verificables, representar incertidumbre y aprender de su desempeño, no afirmar acceso privilegiado al futuro.

## 1. Resumen ejecutivo

La familia de calculadoras KOSMOS-1 (~1977) es una inspiración válida por su diseño de interacción, no por su teoría de biorritmos. El aparato combinaba una calculadora de cuatro operaciones y una rutina que calculaba la posición de tres ciclos supuestos de 23, 28 y 33 días a partir de fechas; incluía memoria de dos nacimientos, selección de fecha, compatibilidad y navegación de un día hacia adelante/atrás. Su arquitectura conocida mediante patente es teclado → procesador TI 1100 → ROM/RAM/programa → pantalla fluorescente + luces LED.

**Reconstrucción comprobada a nivel documental:** US4184202A, patente de Ian S. McCrae, prioridad 1977-05-21; publicación 1980-01-15. Incluye figuras con diagramas de bloques, lógica LED, salidas y algoritmo.

**No comprobado aquí:** placa física del ejemplar del video, esquemas eléctricos completos, firmware extraído, señales eléctricas reales, tolerancias, y si su chip coincide con una variante específica. Sin acceso al equipo original no se debe presentar una ingeniería inversa física completa.

### 1.1 Evidencia e incertidumbre

| Tema | Hallazgo | Clase |
|---|---|---|
| Teclado, B1/B2, BIO, DATE, R/F y C/S | Descripción operativa en patente y manual | VERIFIED (documental) |
| Cálculo de tres ciclos por módulo | Algoritmo descrito en patente | VERIFIED (documental) |
| Hardware TI 1100 (familia) | Arquitectura descrita en patente | VERIFIED (documental del diseño patentado) |
| Chip en cada variante fabricada | Coleccionistas documentan TMC1170/TMC1172 | REFERENCE, requiere foto del chip del ejemplar |
| Capacidad predictiva humana de biorritmos | Evidencia científica negativa; no validado | REJECTED AS SCIENTIFIC FORECAST |
| KOSMOS 2036 como sistema de pronóstico | Diseño conceptual y prototipo offline | CANONICAL + PROTOTYPE |
| Mejorar precisión en datos de la empresa | No demostrado sin datos reales y pruebas fuera de muestra | NEEDS_CONFIRMATION |
| Dispositivo físico nuevo con controles | Dirección propuesta, no construido | SPECULATIVE |

Fuentes:
- Patente: https://patents.google.com/patent/US4184202A/en
- Manual original (56 páginas): https://www.manualslib.com/manual/1368988/Kosmos-Kosmos-1.html
- Colección de calculadoras TI: https://www.facele.eu/index.php/calculators-no-ti/kosmos
- Revisión de 134 estudios, T. Hines (1998), PMID 9775660: https://pubmed.ncbi.nlm.nih.gov/9775660/

## 2. Máquina original — especificación inversa (capa lógica)

### 2.1 Registros y eventos

- `B1`: registrar primera fecha de nacimiento en el formato MMDDYY.
- `B2`: registrar segunda fecha de nacimiento; también selecciona el sujeto.
- `DATE`: registrar fecha de consulta, incluyendo día de semana calculado.
- `BIO`: calcular tres posiciones de ciclo de la fecha/sujeto activos.
- `C/S`: comparar desplazamientos de fase entre B1 y B2 para porcentajes nominales de compatibilidad.
- `R`: decrementar un día la consulta y recalcular.
- `F`: incrementar un día la consulta y recalcular.
- `CLR`: borrar entrada de cálculo; no equivale necesariamente a borrar todos los registros.
- Teclado 0–9 y aritmética: operaciones convencionales independientes.

### 2.2 Algoritmo reproducible

Dadas dos fechas, `birthday` y `query`, calcular `D = days(query) - days(birthday)` de forma determinista, con zona temporal de calendario definida. Para T ∈ {23,28,33}, generar `cycle_day = (D mod T) + 1` (los registros muestran día de 1 a T). Las luces rojas originales correspondían a posiciones consideradas **críticas** en la teoría histórica y las ámbar a **picos** de fase, no a datos medidos.

El panel de curvas era una **referencia gráfica impresa**; no una pantalla de ondas analógicas en movimiento. El resultado numérico venía de la pantalla VFD. **La emulación en la app no debe presentar las curvas como indicadores fisiológicos.**

### 2.3 Para ingeniería inversa electrónica real

Si se consigue un ejemplar: fotografía sin alterar (frente, reverso, PCB), identificación precisa del integrado y pantalla, continuidad de pistas con multímetro, medidas de alimentación con resistencia de limitación de corriente, captura del teclado por matriz, lógica de multiplexación LED/VFD, registro de estados de I/O por cada botón y contraste con la patente. No aplicar tensión externa a pines o VFD sin verificar requisitos. Preservar batería antigua y documentar corrosión. Solo desoldar/chip-off si existe consentimiento sobre una unidad prescindible. Comparar variantes de chip para evitar extrapolar.

**Entregable de esta etapa:** `1977_REFERENCE_STATE_MACHINE.md`, tablas I/O y pruebas contra ejemplos de la patente.

## 3. Evolución conceptual y funcional

### 3.1 Categorías que KOSMOS 2036 no debe confundir

1. **Cálculo determinista:** efemérides, calendarios o fenómenos con modelos físicos establecidos y supuestos claros. Un eclipse calculado con efemérides no equivale a predecir decisiones humanas.
2. **Pronóstico estadístico:** valores futuros de una serie observable (solicitudes, visitas, pedidos), con errores medidos e intervalos.
3. **Simulación condicional:** qué podría pasar bajo supuestos explícitos; no se infiere causalidad de un slider.
4. **Exploración cualitativa:** expertos, historias, señales culturales y escenarios a largo plazo, sin presentar porcentajes falsos.
5. **Oráculo simbólico:** interpretación artística/introspectiva, inequívocamente diferenciada de conocimiento probado.

### 3.2 Promesa comercial honesta

«KOSMOS 2036 convierte observaciones en pronósticos contrastables, muestra futuros condicionados a supuestos y conserva un registro de qué acertó y qué falló.»

### 3.3 Módulos de producto

| Módulo | Input | Output | Criterio de validación |
|---|---|---|---|
| `OBSERVE` | Datos reales con autor, fecha, unidad y calidad | Serie validada | Completitud, frescura, procedencia |
| `PREDICT` | Serie histórica y predictores realmente disponibles al pronosticar | Pronóstico probabilístico, horizonte, abstención si no alcanza | Error fuera de muestra vs baselines |
| `BRANCH` | Supuestos de un escenario A/B | Árbol de escenarios condicionados | Sensibilidad; no inferir causalidad sin diseño válido |
| `EXPLAIN` | Salida estructurada del motor, fuentes, supuestos | Resumen legible con límites | No introducir datos o causalidad no respaldados |
| `REMEMBER` | Pronóstico emitido y posterior dato real | Libro de predicciones, fecha y versión | Integridad, reproducción, auditoría |
| `CALIBRATE` | Conjunto histórico de predicciones maduras | Cobertura y error por horizonte | Coverage, WIS/CRPS/Brier según salida |
| `LEGACY 1977` | Fecha nacimiento, fecha consulta | Posiciones modulares 23/28/33 | Coincidencia con patente; sin reclamo científico |

## 4. Arquitectura recomendada en KODEX

```text
FUENTES / OBSERVACIÓN
Cloudflare Web Analytics, GA4, ecommerce cuando se autorice
                 │
                 ▼
INGESTA: identidad de fuente + UTC + versión + control de calidad
                 │
                 ▼
OBSERVATION STORE  ────────────────► SNAPSHOTS DE DATOS
  PostgreSQL/Timescale o similar                 │
                 │                              ▼
                 ▼                          AUDITORÍA
MOTOR DE PREVISIÓN                                     
  (baselines → ETS/ARIMA → modelos avanzados si mejoran)
                 │
                 ├────────► Bandas e incertidumbre, evidencia
                 ├────────► Modelo de escenarios
                 ▼
FORECAST LEDGER: as_of, cutoff, inputs, hash, modelo y versión
                 │
                 ▼
FRONT KOSMOS 2036 (Astro + islas JS; Canvas/SVG/WebGL opcional)
                 │
                 ▼
AL MADURAR LA FECHA → ACTUALS → MAE, WIS, COBERTURA, DRIFT
                 │
                 └────────► nuevos análisis, sin editar pronósticos viejos
```

### 4.1 Regla de modelos

Empieza por pronósticos triviales; si el modelo «inteligente» no mejora la predicción naive/seasonal naive en validación temporal, no declararlo superior. Evaluar por horizonte, segmento y cortes reales. Separar entrenamiento, selección, calibración y prueba final para evitar leakage. No extrapolar más allá del horizonte justificable. Abstenerse si faltan datos, cambió el proceso generador o la cobertura está mal calibrada.

Literatura: Rob Hyndman y George Athanasopoulos, *Forecasting: Principles and Practice*, https://otexts.com/fpp3/tscv.html y https://otexts.com/fpp3/accuracy.html. Servicios especializados existentes: Google Cloud BigQuery ML Forecasting https://docs.cloud.google.com/bigquery/docs/forecasting-overview.

### 4.2 IA generativa: rol limitado y útil

El lenguaje natural permite formular preguntas, traducir variables, resumir evidencias y ayudar a elegir escenarios. **El LLM no debe inventar valores ni probabilidades.** Los números deben provenir del motor estadístico, funciones deterministas o datos autenticados. Guardar ID de los datos, modelo, fecha, instrucciones, resultados y advertencias.

## 5. Diseño de datos de una predicción verificable

```json
{
  "forecast_id": "uuid",
  "as_of": "2026-10-11T20:00:00Z",
  "status": "ISSUED",
  "target": "kodex.daily_validated_sessions",
  "unit": "sessions/day",
  "horizon_days": 14,
  "data_cutoff": "2026-10-10",
  "source_ids": ["cloudflare:<zone-or-dataset>", "ga4:<property>"],
  "data_snapshot_sha256": "<cryptographic hash>",
  "model_id": "seasonal-naive-v1",
  "training_metadata": {"history_days": 180, "validation_strategy": "rolling_origin"},
  "results": [{"date": "2026-10-12", "estimate": null, "p10": null, "p90": null}],
  "calibration": {"actual_coverage_80": null, "sample_size": 0},
  "limitations": ["Values are illustrative placeholders in this schema; no model is executed here."]
}
```

Nota: este JSON es solo un **esquema ilustrativo**, con fechas/valores nulos; no representa una predicción real. En producción, guardar los pronósticos emitidos en un registro append-only y protegerlos con hashes criptográficos, versionado y control de permisos. El JSON descargado por el prototipo offline no posee garantía de inalterabilidad.

## 6. Capa de experiencia: reinterpretación no literal

- **Panel principal:** gabinete oscuro de instrumentación futurista inspirado en el KOSMOS-1, sin copiar carcasa/logo histórico.
- **Señal:** los datos observados forman una línea sólida; la previsión otra; la incertidumbre una región; las hipótesis una trayectoria distinta.
- **Botón `R/F`:** navegación temporal con eje de evidencia e inspección de predicciones pasadas. Ver pasado auténtico requiere cargar snapshots reales.
- **`B1/B2`:** comparar estrategias, inversiones de tiempo o decisiones de producto con supuestos declarados.
- **Luces de estado:** verde = datos/validación conformes; ámbar = incertidumbre/deriva; rojo = datos insuficientes o predicción superada por baseline. Nunca usar los colores para sugerir destino personal.
- **Ritual del encuentro:** dos segmentos de código de barras avanzan desde extremos; al encontrarse se sella un forecast ID con fecha, fuente y checksum. La animación **representa** la captura, no crea la verdad.
- **Siete escenas:** MACHINE aloja la consola; ARCHIVE guarda experimentos; COSMOLOGY contiene cálculos astronómicos cuando existan fuentes; RETURN confronta pronóstico y observación. Evitar introducir una escena octava.
- **Accesibilidad:** controles teclado/tacto, lectura textual y tabla accesible, reducción de movimiento, fallback Canvas/SVG, contraste y rendimiento móvil.

## 7. Implementación actual (VERIFIED: tests ejecutados)

Archivos generados:
- `KOSMOS_2036_LAB_v0.html` — app autocontenida, ejecutable localmente en navegador.
- `KOSMOS_2036_ENGINE_v0.js` — módulo puro reusable para agentes.
- `KOSMOS_2036_TESTS_v0.js` — test de cálculos e ingestión.
- `KOSMOS_2036_ENGINEERING_BLUEPRINT.md` — este documento.

Implementado:
- Vista de 1977 con cálculo de tres fases por módulo.
- Series temporales CSV diarias `date,value`, 49+ días completos, 120+ recomendados.
- Datos de demostración **sintéticos y explícitamente identificados**, sin acceso a los datos del usuario.
- Tres pronosticadores básicos: naive, seasonal naive y tendencia semanal amortiguada.
- Selección retrospectiva con origen móvil (sin incorporar datos posteriores al origen).
- Ventana final reservada para evaluación MAE del modelo frente a naive.
- Bandas heurísticas basadas en errores históricos; **no calibradas externamente**.
- Horizonte de 7, 14 o 30 días.
- Bifurcación porcentual hipotética separada de forecast base.
- Guardado JSON del pronóstico y verificación cuando datos posteriores coincidan con fechas.
- Layout responsive y pantalla Canvas, sin librerías externas ni red.

No implementado:
- Conexión real a Cloudflare/GA4/Wënü Mäpü, autenticación, sync, base de datos, seguridad multiusuario, deployment, almacenamiento append-only, modelos probabilísticos calibrados, explicaciones LLM, monitorización en vivo, dispositivo físico, validación científica de dominios elegidos, inferencia causal.

**Test observado el 2026-10-11, en dataset sintético:** 7 días seasonal MAE 1.71 vs naive 12.71; 14 días seasonal MAE 7.29 vs naive 9.29; 30 días seasonal MAE 9.80 vs naive 8.70. Son valores de ejemplo generados por un dataset artificial y no prueban rendimiento real. De hecho, a 30 días se muestra un fallo útil: la referencia ingenua fue mejor.

### 7.1 Uso

1. Abrir `KOSMOS_2036_LAB_v0.html` en un navegador moderno (o servirlo desde un host estático con HTTPS).
2. Cambiar los horizontes; estudiar las diferencias respecto a los datos de demostración.
3. Preparar CSV con columnas `date,value` y fechas ISO consecutivas; importar.
4. Exportar el JSON. En días posteriores, importar un CSV actualizado y comparar con el JSON original.
5. Importante: la fuente demo y la fuente real son distintas; no mezclar ambas como si fueran el mismo experimento.

## 8. Roadmap de producción propuesto

### S0 / Funciones esenciales — COMPLETADO COMO PROTOTIPO

Emulación matemática, forecasting simple, escenarios visibles, evaluación, JSON y demo local. Tests unitarios y comprobación visual en tamaños desktop/móvil. Sin despliegue.

### S1 / Conexión real — NEXT

- Elegir **una sola métrica** con historial suficiente y objetivo medible (ej. sesiones validadas del sitio KODEX o pedidos diarios Wënü Mäpü).
- Configurar fuente: Cloudflare GraphQL Analytics API o GA4 Data API con permisos mínimos. Tráfico HTTP y sesiones de usuarios NO son equivalentes: registrar diferencias, filtrado de bots y definiciones.
- Backfill de 90–180+ días si están disponibles y sin inventar registros faltantes.
- Guardado diario con timestamps UTC y controles de calidad.
- Desplegar ruta experimental `/kodex/labs/kosmos-2036` fuera de escenas canónicas hasta revisión y aprobación.

Fuentes: https://developers.cloudflare.com/analytics/graphql-api/tutorials/end-customer-analytics/ ; https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties/runReport

### S2 / Evidencia y memoria — NEXT

- Guardar pronósticos con ID/versionado, hash SHA-256 y cutoff de datos.
- Cron para emitir pronósticos a la misma hora diariamente; zona horaria explícita.
- Evaluación automática al recibir observaciones maduras; métricas de MAE, cobertura, comparación con baseline y cambios de distribución.
- Dashboard público/privado **sin exponer credenciales o información sensible**.
- Registrar días en los que el sistema no puede predecir responsablemente.

Fuente Cron: https://developers.cloudflare.com/workers/configuration/cron-triggers/

### S3 / KOSMOS 2036 PRO — FUTURO

- Modelos seleccionados por dominio (ETS/ARIMA y más adelante gradient boosting u otros) solo si demuestran mejoría en rolling backtests.
- Datos exógenos realmente observables al momento de predecir.
- Simulaciones Monte Carlo para incertidumbre paramétrica cuando existan supuestos cuantificables.
- Escenarios contrafactuales con limitaciones causales explícitas.
- Capas 3D/WebGL como presentación, no como sustitutos del rigor.
- App instalable (PWA), exportación de pruebas, módulos de observación y tablero de precisión.
- Dispositivo físico opcional, nunca condición para obtener un motor útil.

## 9. Reglas duras para agentes

1. Auditar ruta, framework y estado actual del repositorio antes de editar.
2. Crear rama de trabajo, nunca sobrescribir escenas aprobadas sin permiso.
3. No afirmar que `2036` permite pronósticos exactos a diez años. Para 2036 solo escenarios exploratorios y/o cálculos deterministas justificables por dominio.
4. Prohibido entrenar y evaluar sobre el mismo futuro; evitar leakage.
5. Prohibido calcular «confianza 95%» con números creados por una IA de texto.
6. Prohibido incorporar nacimiento/biorritmos a modelos de decisiones personales, médicas o financieras.
7. Indicar siempre dataset demo, real, simulado o no disponible.
8. Preservar la procedencia del KOSMOS-1 y comprobar marcas comerciales antes de comercializar «KOSMOS 2036».
9. Todo resultado debe declarar `REFERENCE / CONCEPT / PROTOTYPE / IMPLEMENTED / TESTED / DEPLOYED` y `VERIFIED / CANONICAL / INFERRED / SPECULATIVE`.
10. Ningún despliegue, cambio externo o conexión con APIs con datos privados sin consentimiento y verificación previa.

## 10. Definición de éxito

No es éxito que una visualización diga «82% de probabilidad» sin evidencia. Es éxito que, transcurridos suficientes ciclos completos y documentados, el sistema publique un historial de pronósticos fechados, con información preservada y pruebas verificables de si mejora o no sobre referencias sencillas en el dominio elegido. Aunque ocasionalmente una referencia naive siga siendo mejor, el sistema debe reconocerlo.

**Frase de producto propuesta:** «KOSMOS 2036 · No interpreta el destino. Explora lo que los datos permiten anticipar y lo que nuestras decisiones pueden transformar.»