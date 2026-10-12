# KOSMOS 2036 — iDevice / Intelligence of Possible Futures

**Proyecto:** KODEX−∞ · **Fecha:** 11 oct 2026 · **Documento:** exploración de arquitectura de producto y UX (propuesta, no canon aprobado)  
**Artefacto de prueba:** `KOSMOS_2036_DEVICE_UX_v1.html`  
**Estado:** interfaz experimental local; simulación basada en datos sintéticos; teclado científico determinista; memoria local voluntaria; sin backend, sin IA ejecutándose, sin sensores garantizados, sin pronósticos reales calibrados.  
**Nombre:** KOSMOS 2036 (canónico por decisión explícita del creador).

## 1. Tesis

KOSMOS 2036 es una interfaz científica, creativa y filosófica para observar sistemas, representar incertidumbre, comparar escenarios condicionales, intervenir sobre supuestos explícitos y recordar lo sucedido. No predice la voluntad individual, diagnostica estados psicológicos ni asegura acceso a futuros determinados. El observador conserva el control de sus datos, hipótesis y decisiones.

Se apoya en el sistema KODEX: **SEÑAL → FORMA → INTERACCIÓN → MEMORIA → MUTACIÓN → RETORNO** y en las siete escenas existentes. Se sitúa en `MACHINE`, envía artefactos consensuados a `ARCHIVE`, conecta simulaciones científicas pertinentes a `COSMOLOGY` y devuelve resultados/contrastes a `RETURN`.

## 2. Cuatro capas que nunca deben mezclarse

| Capa | Fuente | Resultado | Qué significa / qué NO significa |
|---|---|---|---|
| **CÁLCULO** | Fórmula explícita | Resultado determinista | Reproducible; no conocimiento de conducta futura |
| **MEDICIÓN** | Sensor, evento, API o declaración voluntaria | Observación registrada con unidad, fecha, calidad | No autoriza inferencias mentales ni causales |
| **PRONÓSTICO** | Observaciones anteriores y modelo evaluado | Distribución/intervalos condicionados a datos | Solo es creíble si derrota baselines y se calibra fuera de muestra |
| **SIMULACIÓN** | Supuestos, parámetros, reglas | Trayectorias posibles | Un slider no demuestra causalidad |
| **ORÁCULO SIMBÓLICO** | Texto, narración y estética | Pregunta, metáfora, interpretación | No es predicción científica |

Antes de permitir una cifra de confianza: historial suficiente, conjuntos temporales separados, modelo/versionado, métricas y validación de intervalos. Cuando no haya suficiente evidencia, la respuesta correcta es **NO DETERMINABLE**.

## 3. La experiencia del iDevice

### 3.1 Modo consola principal

- Panel escultural negro grafito: materialidad metálica, luz de fósforo, precisión editorial.
- Una pantalla de instrumentación y un único foco visual. La belleza no debe esconder la categoría de conocimiento.
- 4 espacios primarios: `SIMULAR` / `CALCULAR` / `MEMORIA` / `VISIÓN 2036`.
- Pantalla con tres gramáticas: **OBSERVADO** (línea blanca continua), **BASE** (línea verde-azulada), **ELECCIÓN** (violeta punteado). Una región sombreada ilustra variación, **no** una banda estadística calibrada en el prototipo.
- Navegación temporal `R / F` heredada semánticamente del artefacto de 1977; `B1 / B2` compara futuro base y escenario elegido.
- Pestaña `CALCULAR`: teclado científico real con operadores, exponentes y funciones, radianes, procesado local.
- Pestaña `MEMORIA`: opt-in para journaling en este navegador, visualización de eventos, exportación y borrado. Sin servidor externo.
- Pestaña `VISIÓN 2036`: diseño narrativo claramente marcado como ficción conceptual.

### 3.2 Sesión ideal (90 segundos)

1. El visitante elige una pregunta: «¿Cómo podría evolucionar este sistema?».
2. Elige **una métrica** con definición y fuente. Si no hay datos, entra al **sandbox sintético**, indicado de forma persistente.
3. Elige un horizonte: 7, 30 o 90 días. El visor señala hasta dónde llega la observación y dónde empieza la hipótesis.
4. Ajusta una intervención voluntaria. Aparece B2; nunca reemplaza B1, de forma que las dos trayectorias siguen visibles.
5. Pregunta «¿Qué sabemos? ¿Qué asumimos? ¿Qué podría invalidar esto?». El motor explicador cita los datos y devuelve también límites.
6. Decide si guarda el escenario. Ningún permiso ni registro es obligatorio para experimentar.
7. Cuando la fecha llega, la máquina invita a comparar con hechos y ajustar las condiciones del próximo experimento.

### 3.3 Señal física y sensores

- **Touch y teclado** siempre disponibles como medios principales.
- **Giroscopio opcional:** cambia la perspectiva de un objeto/visor, no el pronóstico de una persona. Requiere permiso donde proceda y HTTPS para producción.
- **Haptic opcional:** confirmación de operaciones cuando el navegador lo permita, sin depender de ello.
- **Audio opcional:** sonificación de series o patrones generativos, nunca acceso oculto al micrófono.
- **Voz opcional:** preguntas introducidas explícitamente; transcripción local cuando sea viable.
- **Cámara opcional:** experiencias AR o lectura de objetos con contexto y permisos; sin reconocimiento de identidad por defecto.
- Las funciones deben tener equivalentes accesibles con teclas/botones; `prefers-reduced-motion` y `pause` como políticas obligatorias.

Fuentes: [MDN sensores](https://developer.mozilla.org/en-US/docs/Web/API/Device_orientation_events); [MDN permisos](https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent/requestPermission_static); [MDN WebGPU](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API); [WCAG animación](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions); [WCAG gestos](https://www.w3.org/WAI/WCAG22/Understanding/pointer-gestures).

## 4. Modelo de observador: registrar actos ≠ conocer a una persona

### 4.1 Eventos permitidos con finalidad clara

Proponer un modelo de evento mínimo y **voluntario**:

```json
{
  "event_id":"generated-uuid",
  "session_id":"ephemeral-random-id",
  "occurred_at":"ISO-8601 UTC",
  "type":"scenario_saved",
  "context":{"module":"KOSMOS-2036","mode":"SIMULAR"},
  "declaration":{"goal":"user-selected-goal-id"},
  "configuration":{"horizon_days":30,"scenario_id":"branch-B2"},
  "consent_receipt":"consent-id-if-opted-in",
  "retention_policy":"session|local-opt-in|synced-opt-in"
}
```

Ese esquema es una **propuesta futura**, no una API en uso. No guardar por defecto coordenadas precisas de cursor, secuencias de teclas en campos de texto, dirección IP de forma persistente, ubicación, biometría ni sonidos originales. Menos aún inferir sexo, salud, ideología, carácter o «alma» del usuario desde navegación web.

**Niveles:**

- `ANONYMOUS`: exploración sin cuenta, sin perfil persistente.
- `LOCAL`: memoria explícita en el dispositivo; exportar, revisar, eliminar.
- `CONNECTED`: usuario autoriza fuentes concretas, finalidad, duración y sincronización segura; revocar por fuente.
- `COLLECTIVE`: solo métricas agregadas y medidas para evitar reidentificación, con reglas claras y aprobación específica cuando corresponda.

La afirmación «el usuario pasó 7 min en COSMOLOGY» puede describir un registro concreto. La afirmación «el usuario busca la verdad espiritual» es una **hipótesis**, y debería requerir confirmación directa o descartarse. La máquina debe permitir contestar «no, eso no me describe».

Normativa y diseño: [Principios GDPR Comisión Europea](https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/principles-gdpr_en); revisar legislación correspondiente antes de lanzar en cada territorio. El consentimiento no reemplaza todas las obligaciones legales de seguridad y transparencia.

### 4.2 Derechos del observador en UX

- «Qué sé de ti»: inventario claro de datos observados, declarados e inferidos.
- «Por qué llegué a esta respuesta»: fuentes, supuestos y límites.
- «Corrígeme»: anular inferencias, expresar intención real.
- «Olvídame»: borrar información personal y desconectar fuentes; no retener perfiles ocultos.
- «Modo anónimo»: funcionalidad de exploración básica sin perfil.
- «Elegir otro camino»: alternativas igualmente visibles, sin empujar a una conducta.
- «Apagar la máquina»: sensor, micrófono, sincronización, IA y notificaciones controlados por separado.

## 5. Sistema técnico de producción

```text
KODEX WEB / PWA — ARC / CALC / FUTURES
     │
     ├─ Interfaz accesible: HTML + SVG + Canvas / WebGL-WebGPU progresivo
     ├─ Calculadora científica determinista (parser seguro, tests)
     ├─ Simulador interactivo local (parámetros versionados)
     ├─ Datos de usuario: off por defecto; on-device/local-first opcional
     │   └─ Consentimiento por propósito; exportación y eliminación
     │
     └─ Backend de pronóstico (SOLO cuando haya métricas reales)
         ├─ ingestión y control de calidad (Cloudflare / GA4 / CSV autorizado)
         ├─ datos temporales + catálogo de procedencia
         ├─ baselines + backtests de origen móvil
         ├─ modelos avanzados solo si mejoran el baseline
         ├─ pronósticos sellados con as_of, cutoff, hashes y versión
         ├─ evaluación posterior MAE/WIS/coverage/Brier según problema
         └─ LLM EXPLICADOR: redacta; no inventa cifras ni confianza
```

**Visualización:** WebGPU puede aportar simulaciones complejas en dispositivos compatibles, con WebGL/SVG/Canvas como fallback. Gráficos de alta complejidad no aumentan por sí mismos la certeza científica. **AI:** modelos locales pueden ayudar con privacidad en algunos dispositivos, pero rendimiento, calidad y soporte deben evaluarse. No suponer disponibilidad universal.

**Método:** cross-validation con origen temporal móvil y datos previos solamente, comparando naive/seasonal-naive; scoring por horizonte y segmento. Referencias: [FPP3 / Time Series CV](https://otexts.com/fpp3/tscv.html) y [NIST / Measure](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/).

## 6. El dilema del libre albedrío: precaución de diseño

- Una predicción mostrada al usuario puede cambiar su conducta. Eso produce bucles de realimentación: pronosticar e intervenir no son experimentos neutrales.
- Un modelo que observa elecciones no puede concluir que esas elecciones están determinadas o que conoce todas las condiciones del usuario.
- No mostrar «tu destino más probable» como ranking normativo o psicológico.
- En interfaces de decisión humana, presentar **alternativas**, incertidumbres, variables controlables y opción explícita de ignorar el sistema.
- Si una decisión es sensible (salud, empleo, finanzas), incrementar exigencias de evidencia, revisión humana y límites del producto; no lanzar extrapolaciones psicológicas sin base.

## 7. Experiencia especulativa: civilización de 2036+ y distopía

**Horizonte luminoso:** un atlas de futuros compartido, con memoria de errores; gemelos digitales de fenómenos ambientales y proyectos, modelos de simulación colectivos transparentes, agentes que se critican mutuamente, deliberación pública y el derecho a no ser modelado. El individuo no es una variable domesticada sino un agente con facultad de corregir y actuar.

**Distopía ficcional:** el dispositivo acumula perfiles invisibles, atribuye probabilidades de conducta sin validación, manipula decisiones para confirmarse y comercializa sus «profecías». Esta versión puede existir como ensayo crítico inmersivo dentro de KODEX, jamás como arquitectura real oculta.

Una civilización avanzada no se define por recolectar más datos personales: se define por construir sistemas capaces de aprender **sin apropiarse del observador**.

## 8. Diseño experimental del producto por etapas

| Etapa | Alcance entregable | Criterio de terminado |
|---|---|---|
| `S0` | UX lab offline + calculadora + simulación artificial + consentimiento local | Tests interacción móvil y escritorio, teclado científico, exportar/borrar, a11y básica |
| `S1` | Primer problema real acotado (p. ej. sesiones diarias de KODEX, si existen logs adecuados) | Definición de métrica, fuente autorizada, datos históricos de calidad, backtests reproducibles |
| `S2` | Forecast ledger + scoring al madurar resultados | Desempeño vs baseline publicado y cobertura conocida; abstención cuando no hay evidencia |
| `S3` | Preguntas en lenguaje natural y explicación documental; sensores opcionales; instalación PWA | Evaluación de accesibilidad, permisos, protección de datos y QA en móviles reales |
| `S4` | Gemelos digitales y planificación interactiva específica por dominio | Simulaciones contrastadas con datos y expertos pertinentes; límites causales visibles |
| `S5` | iDevice físico experimental y exposición artística | Diseño industrial, electrónica, firmware, pruebas térmicas/eléctricas y mantenimiento |

### Trabajo inmediato para agentes de desarrollo

1. Abrir y auditar `KOSMOS_2036_DEVICE_UX_v1.html`; mantener la distinción entre datos sintéticos y reales.
2. Ejecutar pruebas visuales e interacción en Android Chrome, iOS Safari y desktop; corregir los fallos detectados.
3. Migrar UI hacia componentes del stack real KODEX sin modificar escenas aprobadas.
4. Crear módulos tipados `ObservedSeries`, `Scenario`, `ForecastRun`, `MemoryConsent`, `ModelEvidence`.
5. Conectar una sola fuente verificada y con permisos, documentar métricas y valor de baseline.
6. Diseñar una política de consentimiento, expiración, exportación y eliminación antes de almacenar perfiles.
7. Añadir pruebas para cálculos matemáticos, errores de predicción y etiquetado epistemológico.
8. No desplegar producción ni activar captura real de datos sin aprobación y revisión de seguridad.

## 9. Elementos exclusivos del canon KODEX

- Dos líneas de señal/barcode avanzan desde extremos y se encuentran en el presente; al coincidir se sella una **versión del pronóstico**, no una verdad sobrenatural.
- Portal/anillo mecánico 3D: representa entrada al instrumento, no contiene controles críticos invisibles.
- Estados `DORMANT / AWARE / OPEN`: afectan interacción y motion; el modo silencioso sigue siendo completamente funcional.
- Integración opcional con la «fuente/oráculo de Delfos digital» como reflexión introspectiva, aislada del motor científico.
- Cualquier dato o recurso cultural debe registrar procedencia; no presentar estética antigua como evidencia ancestral.

**Criterio de éxito:** una experiencia hermosa y comprensible que no confunda simulación con predicción, en la que cada pronóstico maduro pueda auditarse, y cada persona pueda usar la máquina sin entregar su intimidad a cambio.