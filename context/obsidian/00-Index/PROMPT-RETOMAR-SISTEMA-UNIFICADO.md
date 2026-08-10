---
tipo: prompt-bootstrap
fecha: 2026-05-04
proposito: Permitir que cualquier sesion IA (Claude Code / OpenCode / etc) retome el trabajo de construccion del sistema unificado Wenu Mapu sin perder contexto
---

# Prompt para continuar: Sistema Unificado Wenu Mapu

> **Copialo entero y pegalo en una conversación nueva** con Claude Code, OpenCode, o cualquier IA que tenga acceso al filesystem de esta Mac.

---

## Contexto

Soy **Nicolás Ortega García ("Ocin")**, founder de **Wenu Mapu SpA** — joyería corporal ritual con raíz mapuche. Operación 100% online desde Truckee, California. Sitio: `wenumapuonline.com` (WooCommerce). Instagram: `@wenu__mapu`.

Vengo arrastrando 3 semanas de trabajo con IA donde armamos parches que no terminan de cerrar. Necesito que ahora construyas el sistema correcto: **una base de datos unificada que conecte foto-disco-Instagram-sitio-compras**, y que cuando entre una foto al bot Telegram el sistema sepa "esto ya existe en X, está publicado en IG el día Y, no está en WC todavía".

**Mi visión** (palabras propias del 4 mayo 2026):
> "Si tengo foto publicada en Instagram → debe existir foto en disco → debe poder publicarse al sitio. Y debe haber una base de datos que conecte todo."

## Estado del sistema (verificá antes de tocar)

```bash
# Ya están instalados y corriendo:
which opencode                                          # OpenCode CLI
brew services list | grep postgres                      # Postgres 16
ls /Users/user1/wenu-platform/prisma/schema.prisma      # Prisma schema
pm2 list                                                # PM2 con wenu-bot online
ls /Users/user1/Downloads/instagram-wenu__mapu-*.zip    # IG export 64MB
```

Bot Telegram: `wenu-bot` en PM2 (script en `dist/apps/telegram-bot/src/index.js`, fuente en `apps/telegram-bot/src/index.ts`).

## Documentos canónicos que DEBES leer primero

Lee estos archivos completos antes de codear nada:

1. `/Users/user1/Obsidian/WenuAgent/brand/BRAND-DNA-2026-05-03.md` — voz real de la marca, materiales, naming patterns. **Toda generación de copy debe basarse en este documento, no inventar voz**.
2. `/Users/user1/Obsidian/WenuAgent/30-Auditorias/2026-05-02-audit-360-business.md` — diagnóstico del negocio.
3. `/Users/user1/Obsidian/WenuAgent/10-Proyectos/wenu-studio/00-arquitectura.md` — arquitectura objetivo (12 roles de agencia AI).
4. `/Users/user1/Obsidian/WenuAgent/30-Auditorias/2026-05-03-runbook-incidentes.md` — runbook de incidentes.
5. `/Users/user1/.claude/projects/-Users-user1/memory/MEMORY.md` — memoria persistente (índice).

## Recursos disponibles (paths reales)

```
~/wenu-agent-hub/                              # monorepo principal
  apps/telegram-bot/                           # bot que usa el usuario
  lib/photo-pipeline.mjs                       # vision IA Groq+Gemini, fuzzy match
  lib/telegram-notify.mjs                      # helper para sendMessage
  lib/photo-optimizer.mjs                      # WebP via sharp
  lib/gemini-image.mjs                         # Nanobanana wrapper
  data/sourcing/compras-index.json             # 56 compras Aliexpress, $351.74 invertidos
  data/product-master/products.json            # 64+ productos
  data/photo-classification/manifest-*.json    # análisis de fotos
  scripts/                                     # ~50 scripts utilitarios

~/wenu-platform/                               # Postgres + Prisma
  prisma/schema.prisma                         # 22 tablas: Product, ProductPhoto, etc

~/wenumapu-system/                             # sistema viejo
  organize-agent.js                            # foto auto-classify

/Volumes/LaCie/Wenu mapu/                      # disco externo del usuario
  WenuMapu/📸 _INVENTARIO_FOTOS/               # 7,767+ fotos
    _SIN_CLASIFICAR/   _ERROR/   _PROCESADOS/  WM-PLG/  WM-HAN/  ...
    _RAW_SOURCE/       # 5,163 RAWs movidos acá

  Backups/                                     # backups diarios
    2026-05-XX_*/                              # snapshots del sistema local

~/Downloads/
  backup-4.11.2026_21-47-21_wenumap1.tar.gz    # cPanel HostGator full (805MB, MD5 verified)
  instagram-wenu__mapu-2026-04-13-972uPGm6.zip # IG export 64MB sin desempaquetar
  Wenu Mapu _ Ornaments tribe jewelry.htm      # snapshot homepage (con voz real)

/tmp/wenu-restore/                             # backup WP extraído
  mysql/wenumap1_wp652.sql                     # 54MB, BD del 11-abril (pre-desastre)
  full/                                        # todo el wp-content/uploads/ (6,526 fotos)
  extracted/products.json                      # 38 productos del backup con desc HTML

~/Obsidian/WenuAgent/                          # vault del usuario (lee CLAUDE.md ahí)
```

## Credenciales en `.env`

`/Users/user1/wenu-agent-hub/.env` (permisos 600):
- `GROQ_API_KEY` ✓ (free tier, llama-4-scout vision + llama-3.3 text)
- `OPENAI_API_KEY` ✓
- `GEMINI_API_KEY` ✓ (free tier limitado)
- `ANTHROPIC_API_KEY` (vacío — Nico debe activar billing si querés Claude pago)
- `WOOCOMMERCE_URL` / `WOOCOMMERCE_KEY` / `WOOCOMMERCE_SECRET` ✓
- `WP_USER` / `WP_APP_PASSWORD` ✓ (para subir media a WP)
- `TELEGRAM_BOT_TOKEN` / `TELEGRAM_ALLOWED_CHAT_IDS=5773729925` ✓
- `NOTION_API_KEY` ✓

## Plan de 3 pasos (en orden, no saltar)

### Paso 1 — Desempaquetar e indexar Instagram

```bash
mkdir -p /tmp/wenu-ig
cd /tmp/wenu-ig
unzip "/Users/user1/Downloads/instagram-wenu__mapu-2026-04-13-972uPGm6.zip"
# Estructura típica: media/posts/YYYYMM/*.jpg + content/posts_1.json
```

Crear script `scripts/index-instagram.mjs` que parsea los posts, extrae caption + foto + fecha, output a `data/sourcing/instagram-posts.json`. Verificar que captura el post "Bronze Snake Ear Weights" del 4 julio 2023.

### Paso 2 — Base de datos unificada en Postgres

Extender `wenu-platform/prisma/schema.prisma` con tabla:

```prisma
model UnifiedPhoto {
  id                String   @id @default(cuid())
  filePath          String   @unique
  source            String   // 'lacie' | 'wp_backup' | 'instagram' | 'wc'
  perceptualHash    String?  // para dedup
  fileHashMd5       String?  // para detectar archivos identicos
  width             Int?
  height            Int?
  mimeType          String?
  igPostId          String?
  igCaption         String?
  igDate            DateTime?
  linkedProductSku  String?  // si esta vinculada a producto WC
  linkedProductId   Int?     // wooId
  metadata          Json?
  createdAt         DateTime @default(now())
  lastSeenAt        DateTime @updatedAt
  
  @@index([perceptualHash])
  @@index([linkedProductSku])
  @@index([source])
}
```

`prisma migrate dev --name unified_photos` para aplicar.

Crear `scripts/index-all-photos.mjs` que recorre:
1. `/Volumes/LaCie/Wenu mapu/WenuMapu/📸 _INVENTARIO_FOTOS/` → source='lacie'
2. `/tmp/wenu-restore/full/.../wp-content/uploads/` → source='wp_backup'
3. `/tmp/wenu-ig/media/posts/` → source='instagram'
4. WC `/wp-json/wc/v3/products` → source='wc' (cada producto tiene `images[]`)

Para cada foto: calcular **perceptual hash** (usar `image-hash` npm package o `sharp` + algoritmo dHash propio), MD5 del archivo, dimensiones, mimeType. Insertar en Postgres.

Esperado: ~14,000+ filas en `unified_photos`. Tiempo estimado: 30-60 min de procesamiento.

### Paso 3 — Bot con búsqueda en el índice

Modificar `apps/telegram-bot/src/index.ts` handler de `bot.on("photo")`:

1. Calcular perceptual hash de la foto entrante.
2. Query Postgres: `SELECT * FROM unified_photos WHERE hamming(perceptualHash, $1) < 8 ORDER BY hamming ASC LIMIT 5`.
3. Si hay match → devolver "expediente unificado":
   ```
   🔍 Esta foto ya está conectada:
   📁 Disco LaCie: <path>
   📸 Instagram: <fecha> "<caption>"
   🛒 WooCommerce: <SKU> ($<precio>)
   ```
4. Botón único: "✅ Publicar usando esta info" / "📝 Crear nuevo".

## Reglas absolutas (NO romper)

1. **No destructivo**: cada cambio en WC, products.json, o disco debe tener `--dry-run` por default y backup previo.
2. **Voz Wenu Mapu canonical**: SIEMPRE leer `BRAND-DNA-2026-05-03.md` antes de generar copy. **Nunca inventar palabras** como "Earthbeat", "Mapuche Root", "Earthborn", "Ancestral Stone" — son parches IA genéricos.
3. **Foto-first**: el inventario real son las fotos del disco, no la BD. La BD refleja, no manda.
4. **No tocar sitio en vivo sin confirmación explícita**: WC tiene 6 productos publicados que el cliente ve. Cualquier cambio sobre ellos requiere aprobación humana.
5. **Reusar lo que existe**: antes de escribir un script nuevo, buscar en `~/wenu-agent-hub/scripts/` y `lib/` si ya hay algo similar.
6. **Persistir progreso**: actualizar `~/.claude/projects/-Users-user1/memory/MEMORY.md` y `Obsidian/WenuAgent/00-Index/` con cada hito.

## Lo que NO hacer

- ❌ Aplicar más parches al `productFlow` del bot Telegram. Está limitado por diseño.
- ❌ Generar productos en WC sin verificar que la foto exista en LaCie/IG.
- ❌ Borrar cualquier producto en WC sin backup explícito.
- ❌ Inventar precios. El usuario aplica multiplicador x3-x4 sobre costo. Si no tenés costo, dejar `null` y avisar.
- ❌ Subir copy genérico tipo "Discover the magical beauty of...". El brand prohíbe explícitamente "magical/enchanted/beautiful/perfect".

## Verificación de éxito

Cuando termines los 3 pasos, debe pasar este test:

1. Mandar al bot la foto del **par de serpientes de bronce con regla** (ya está en `/Users/user1/wenu-agent-hub/local-vault/sistema/logs/fotos/producto-1777864451148.jpg`).
2. Bot debe responder en menos de 30s con:
   ```
   🔍 Match encontrado:
   📸 Instagram: 4 julio 2023 — "Bronze Snake Ear Weights — LIMITED STOCK"
   📁 También está en: <paths LaCie>
   🛒 NO está publicado en WC todavía
   💡 Sugerencia: crear "Bronze Snake Ear Weights" con caption IG y foto LaCie
   ```
3. Si el bot **vuelve a crear un producto draft nuevo** ignorando que ya existe, el sistema falló. Hay que iterar.

## Punto de entrada AHORA

```bash
# 1. Verificar que tenés todo:
which opencode && pg_isready && pm2 list | grep wenu-bot

# 2. Leer BRAND-DNA primero:
cat "/Users/user1/Obsidian/WenuAgent/brand/BRAND-DNA-2026-05-03.md"

# 3. Empezar Paso 1: desempaquetar IG export
mkdir -p /tmp/wenu-ig && cd /tmp/wenu-ig
unzip "/Users/user1/Downloads/instagram-wenu__mapu-2026-04-13-972uPGm6.zip"
ls -la /tmp/wenu-ig/
```

## Cómo notificar progreso al usuario

Usar Telegram al user `5773729925` vía:
```bash
cd /Users/user1/wenu-agent-hub
node -e 'import("./lib/telegram-notify.mjs").then(m=>m.tgSend("mensaje aca"))'
```

Mandar TG en cada hito (cada paso completo). Texto en español, tono cálido, sin emojis excesivos.

---

**Fin del prompt portable**. Si lo tomas, tu primer movimiento debe ser: leer BRAND-DNA + listar archivos del IG export desempaquetado + reportar al usuario qué encontraste antes de empezar a indexar.
