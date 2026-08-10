# Authoring Guide

## Crear un módulo nuevo

1. Define una función narrativa.
2. Elige un motor existente.
3. Crea un preset en `src/data/modules.json`.
4. Usa parámetros semánticos.
5. Asigna una escena.
6. Define tags.
7. Añade wrapper en `src/modules/`.
8. Valida en los ocho ambientes.
9. Prueba mobile.
10. Registra costo de rendimiento.

## Cuándo crear un renderer nuevo

Solo cuando la geometría o la interacción no pueda expresarse con los motores existentes.

No crear un renderer nuevo solo para cambiar color, velocidad, densidad o cantidad de nodos.

## Convenciones

```text
KDX-FX-001
KDX-FX-002
...
```

Cada módulo debe responder a:

- signal
- focus
- anomaly
- pointer
- audio
- atmosphere
- quality
