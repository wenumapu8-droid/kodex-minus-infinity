---
title: Wenu Platform — MOC
date: 2026-04-23
status: activo
tags: [plataforma, BD, prisma, postgres, adminjs, fastify, MOC]
---

# Wenu Platform — MOC

Wenu Platform es el backend centralizado de Wenu Mapu: una base de datos PostgreSQL con 22 tablas gestionada mediante Prisma ORM, ubicada en `~/wenu-platform/`. Expone una API Fastify y un admin CRUD basado en AdminJS. La Fase 1 (schema completo, migraciones, seed inicial y administracion via Prisma Studio en `:5555`) quedo cerrada el 2026-04-21. Las fases siguientes integran el panel AdminJS, la API Fastify documentada y el bot Telegram de operaciones.

---

## Decisiones

- [[10-Proyectos/wenu-platform/00-Arquitectura-Propuesta|Arquitectura propuesta]] — stack completo, fases, schema SQL
- Decision de admin CRUD: `~/wenu-platform/decisiones/admin-crud.md` — se elige **AdminJS** con adaptador `@adminjs/prisma` sobre Fastify 5; descarta PocketBase (incompatible con Postgres existente) y Refine (requiere API CRUD previa).

---

## Notas relacionadas

- [[10-Proyectos/wenu-platform/00-Arquitectura-Propuesta]] — propuesta de arquitectura completa: stack, schema 22 tablas, roadmap por fases
- [[WENU_MAPU_CONTEXT]] — contexto global del proyecto; menciona Prisma Studio en :5555
- [[00-Index/Proyectos-MOC]] — MOC padre de todos los proyectos activos

---

## Proximos pasos

1. Instalar AdminJS (`npm install adminjs @adminjs/prisma @adminjs/fastify @fastify/session @fastify/cookie tslib` desde `~/wenu-platform/`).
2. Crear `src/admin.mjs` y registrar las 22 tablas via `Prisma.dmmf.datamodel.models`.
3. Levantar API Fastify con el router de AdminJS montado en `/admin`.
4. Prototipo bot Telegram: comandos de consulta a la BD (stock, ordenes, clientes) via el mismo servidor Fastify.
5. Una vez resuelto SSL en Cloudflare Tunnel: exponer `/admin` en `wenumapuonline.com/admin`.

---

[[Home]] · [[00-Index/Proyectos-MOC]] · [[00-Index/Operaciones-MOC]]

#plataforma #BD #prisma #postgres #adminjs #fastify
