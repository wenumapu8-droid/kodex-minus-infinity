---
tipo: referencia
fecha: 2026-05-01
tags: [infraestructura, puertos, canónico]
relacionado: [[00-Index/Plan-Maestro-2026-05-01]] · [[WENU_MAPU_CONTEXT]]
---

# Mapa Canónico de Puertos — WenuOS

> Fuente de verdad para puertos locales. Actualizar aquí ante cualquier cambio.
> Última actualización: 2026-05-01

---

## Servicios activos

| Puerto | Servicio | Archivo principal | Proceso PM2/launchd |
|--------|---------|-------------------|---------------------|
| **:3333** | wenumapu-system Express (dashboard + API análisis fotos) | `~/wenumapu-system/server/index.js` | `com.wenuos.server` |
| **:3335** | wenu-platform Fastify API (PostgreSQL/Prisma) | `~/wenu-platform/src/api.mjs` | `com.wenu.api` |
| **:4321** | wenu-frontend Astro (dev server / serve dist) | `~/wenu-frontend/` | `com.wenu.frontend` *(nuevo)* |
| **:5432** | PostgreSQL 16 | — | launchd postgres |
| **:5555** | Prisma Studio (admin visual BD) | `~/wenu-platform/` | manual: `npx prisma studio` |
| **:5678** | n8n workflows | `~/wenuos-system/n8n/` | `com.wenu.n8n` |
| **:3399** | Health gateway unificado | *(pendiente crear)* | `com.wenu.health-gateway` |

## Servicios pendientes

| Puerto | Servicio | Estado |
|--------|---------|--------|
| :3399 | Health gateway (agrega :3333, :3335, :5432, :5678, cloudflared) | **Pendiente crear** |

## Cloudflare Tunnel

| Hostname público | → Puerto local | Estado |
|-----------------|---------------|--------|
| `wenuos.wenumapuonline.com` | :3333 | ✅ Activo (53+ días uptime) |
| `wenumapuonline.com` (raíz) | :4321 | 🔨 En configuración |
| `n8n.wenumapuonline.com` | :5678 | ⚠️ Sin Access policy |
| `admin.wenumapuonline.com` | :5555 | ⚠️ Pendiente |

## Comandos rápidos

```bash
# Ver todos los puertos en uso
lsof -iTCP -sTCP:LISTEN | grep -E "333|443|567|432|555|432"

# Estado de los principales servicios
curl -s http://localhost:3333/api/status | python3 -m json.tool | head -20
curl -s http://localhost:3335/health 2>/dev/null || echo "3335 down"
ps aux | grep cloudflared | grep -v grep

# Reiniciar todo vía PM2
cd ~/wenu-agent-hub && npx pm2 restart all

# Ver logs n8n
cat ~/wenuos-system/n8n/logs/n8n.log 2>/dev/null | tail -20
```
