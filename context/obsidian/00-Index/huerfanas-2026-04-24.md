---
tipo: plan
fecha: 2026-04-24
estado: pendiente-ejecucion
---

# Notas Huerfanas — Plan de Reconexion 2026-04-24

> Notas sin backlinks entrantes desde otros `.md` del vault (excluye 90-Archivo, .obsidian).
> Lista priorizada por valor operativo. NO ejecutar todavia — solo plan.

---

## 1. `progreso/2026-04-23-antigravity-mcp`

**Por que vale:** Documenta la integracion MCP de Antigravity con WenuOS del 23-abr: config, herramientas disponibles en Cascade, nuevos comandos `/mcp` en Telegram. Conocimiento operativo clave, unico lugar donde esta registrado.

**Propuesta de enlaces entrantes:**
- Agregar en `[[operaciones/estado-sistema]]` como referencia bajo "Integraciones MCP"
- Agregar en `[[00-Index/Operaciones-MOC]]` bajo una nueva subseccion "Progreso / Changelog"

---

## 2. `progreso/2026-04-23-estado-sistema`

**Por que vale:** Snapshot del sistema del 23-abr: tablas SQLite, estado PM2, decisiones activas de arquitectura (jerarquia de modelos, memoria compartida). Referencia de estado real en fecha puntual.

**Propuesta de enlaces entrantes:**
- Agregar en `[[operaciones/estado-sistema]]` como snapshot historico ("Ver tambien: estado 2026-04-23")
- Agregar en `[[00-Index/Operaciones-MOC]]` junto al punto anterior

---

## 3. `operaciones/agentes/brand-marketing-agent`

**Por que vale:** Define el rol del agente de marca, sus entradas/salidas y la division de trabajo con `design-agent`. Sin esto, el MOC de agentes queda incompleto para el dominio brand.

**Propuesta de enlaces entrantes:**
- Agregar en `[[00-Index/Agentes-MOC]]` bajo la tabla de agentes operativos
- Agregar en `[[brand/MARCA-maestro]]` bajo una seccion "Agente responsable"

---

## 4. `operaciones/agentes/telegram-command-agent`

**Por que vale:** Documenta la interfaz remota principal del sistema. Muy relevante dado que los comandos MCP de Telegram son un hito reciente (ver nota 1).

**Propuesta de enlaces entrantes:**
- Agregar en `[[00-Index/Agentes-MOC]]` bajo agentes operativos
- Agregar en `[[operaciones/comandos-telegram]]` como "Agente que los procesa"

---

## 5. `operaciones/agentes/obsidian-memory-agent`

**Por que vale:** Describe el agente que administra la memoria operativa del vault, es decir, el agente que ejecuta la tarea actual. Sin backlinks es invisible en el grafo.

**Propuesta de enlaces entrantes:**
- Agregar en `[[00-Index/Agentes-MOC]]` bajo agentes operativos
- Agregar en `[[00-Index/Claude-MOC]]` bajo "Flujo" como "Agente escritor del vault"

---

## 6. `operaciones/agentes/seo-agent`

**Por que vale:** Define estrategia SEO orgánica y su separacion de ads. Conecta con el dominio WooCommerce y el catalogo de productos.

**Propuesta de enlaces entrantes:**
- Agregar en `[[00-Index/Agentes-MOC]]` bajo agentes operativos
- Agregar en `[[00-Index/Proyectos-MOC]]` bajo "Productos" como "Agente SEO"

---

## 7. `operaciones/agentes/local-router`

**Por que vale:** Contiene la regla de routing simple/mediana/critica entre modelos locales y avanzados. Es la logica que reduce costos en todo el sistema. Ningun MOC la referencia.

**Propuesta de enlaces entrantes:**
- Agregar en `[[00-Index/Agentes-MOC]]` bajo agentes operativos
- Agregar en `[[wenuos-sistema-maestro]]` bajo una seccion de "Routing de modelos"

---

## 8. `operaciones/reportes/reporte-1776416580064`

**Por que vale:** Reporte automatico del 2026-04-17 con estado de servicios (Telegram, Discord, WooCommerce). Datos historicos que permiten trazar evolucion del sistema.

**Propuesta de enlaces entrantes:**
- Agregar en `[[00-Index/Operaciones-MOC]]` bajo "Reportes" con fecha explicita
- Agregar en `[[operaciones/reportes/wenuos-estado]]` como referencia historica anterior

---

## 9. `operaciones/reportes/wenuos-estado`

**Por que vale:** Estado del sistema al 2026-04-21 con metricas de productos (223 total, 30 publicados). Es el snapshot mas reciente antes de los progresos del 23-abr.

**Propuesta de enlaces entrantes:**
- Agregar en `[[00-Index/Operaciones-MOC]]` bajo "Reportes"
- Agregar en `[[informe-hoy]]` como "Ultimo reporte de estado"

---

## 10. `productos/templates/producto-template`

**Por que vale:** Template oficial con frontmatter, flujo de publicacion y backlinks al Home. Es la base para crear cada ficha WM-*. Sin backlinks, cualquier agente que cree productos puede ignorarlo.

**Propuesta de enlaces entrantes:**
- Agregar en `[[00-Index/Proyectos-MOC]]` bajo "Productos" como "Template de ficha"
- Agregar en `[[WENU_MAPU_CONTEXT]]` bajo una seccion de "Recursos operativos"

---

## Notas adicionales detectadas (sin backlinks, menor prioridad)

- `operaciones/agentes/mail-agent` — agente de email sin referencia en MOC
- `operaciones/agentes/woo-agent` — agente WooCommerce sin referencia en MOC
- `operaciones/agentes/coordinator` — agente coordinador sin referencia en MOC
- `operaciones/agentes/reviewer` — sin referencia en MOC
- `operaciones/agentes/architect` — sin referencia en MOC
- `operaciones/agentes/builder` — sin referencia en MOC
- `operaciones/agentes/coder` — sin referencia en MOC
- `operaciones/agentes/docs` — sin referencia en MOC
- `operaciones/agentes/planner-agent` — sin referencia en MOC
- `operaciones/agentes/content-agent` — sin referencia en MOC
- `WENU_MAPU_CONTEXT` — nadie lo enlaza aunque es archivo maestro de sincronizacion
- `estrategia/brand-kit` — solo referenciado desde Contexto-MOC, no tiene salidas

> Accion sugerida: completar `[[00-Index/Agentes-MOC]]` con todos los agentes de `operaciones/agentes/` en una pasada unica.

#huerfanas #plan #grafo
