---
tipo: referencia
fecha: 2026-05-12
tags: [skills, claude, productividad, referencia-rapida]
relacionado: [[00-Index/Skills-MOC]] · [[00-Index/Agentes-MOC]] · [[00-Index/Marimari-Norte]]
---

# Skills — Cuándo invocar cada una

> Referencia rápida: en qué momento del flujo Wenu Mapu invocar cada skill.
> Mantener cortita. Si una skill se usa <1 vez/mes, sacarla.

## Vault

- [[Vault-MOC|Vault MOC]] · [[Skills-MOC|Skills MOC completo]]

---

## Skills mattpocock (instaladas 2026-05-12)

| Skill | Cuándo invocarla | Disparador |
|---|---|---|
| **grill-me** | Antes de tocar Etsy, email V2, WooCommerce, o cualquier decisión reversible con costo | "grill me", "stress-test este plan" |
| **caveman** | Daily report, triage matutino, status rápido cuando hay prisa | "caveman mode", "less tokens", "be brief" |
| **diagnose** | Bug en email-agent, indexador unified, smoke notebooklm-py falla, o cualquier "no entiendo qué pasó" | "diagnose this", "debug this", "está roto" |

Path local: `~/.claude/skills/{grill-me,caveman,diagnose}/SKILL.md`

---

## Skills Anthropic ya cargadas (infrautilizadas)

| Skill | Cuándo invocarla en Wenu |
|---|---|
| `anthropic-skills:canvas-design` | Poster IG, flyer cita Truckee, hero Etsy, banner aftercare |
| `anthropic-skills:pdf` | Guía aftercare, ficha wholesale, manual operativo |
| `anthropic-skills:docx` | Email wholesale, press-kit, propuesta vitrina-en-estudios |
| `anthropic-skills:pptx` | Pitch deck wholesale (pendiente desde [[Plan-Maestro-2026-05-01]]) |
| `anthropic-skills:xlsx` | Tracker ventas Etsy+WC+IG, finanzas (gap $600 sin diagnosticar) |
| `anthropic-skills:skill-creator` | Construir skills propias: etsy-sync, ig-metrics, notebooklm-bridge |
| `anthropic-skills:consolidate-memory` | 1x/mes para podar MEMORY.md (ya >24 entradas) |
| `wordpress.com:preview-designs` | Iterar diseño `aftercare.wenumapuonline.com` sin tocar WP |
| `adspirer:keyword-research` | Validar tags Etsy con CPC real antes de listar productos |
| `adspirer:campaign-performance` | Cuando arranque Meta Ads para piercing Truckee |
| `adspirer:ad-campaign-best-practices` | Brief antes de gastar primer dólar en ads |

---

## Skills de diseño Fase 1+2 (instaladas 2026-05-12)

| Skill / herramienta | Dónde | Cuándo invocarla |
|---|---|---|
| **ui-ux-pro-max** | `~/.claude/skills/ui-ux-pro-max/` | Diseñar dashboards, landing, e-commerce, ficha producto. Claude la activa sola con keywords UI/UX |
| **Pollinations image gen** | `~/wenu-agent-hub/gemini-image/generate.py` (default provider) | Carrusel IG, historias, hero Etsy, banner. Gratis, sin auth |
| **Gemini image gen** | mismo script `--provider gemini` | Variantes con `--ref` para mantener brand kit. **Pendiente activar billing** |
| **21st.dev Magic MCP** | MCP `magic` en `~/.claude.json` | Generar componentes shadcn/ui con semantic search. Reiniciar Claude Code |
| **Higgsfield MCP oficial** | MCP `higgsfield` en `~/.claude.json` | Piezas hero campaña, video corto, modelos exclusivos. OAuth + freemium |
| **Open-Generative-AI desktop** | App descargada en `~/Downloads/Open.Generative.AI-1.0.11.dmg` | UI con 200+ modelos. Para batch / comparar. Inferencia local lenta en Intel Mac |

## Pendiente sesión futura

- Activar billing Google Cloud para desbloquear Gemini image (https://console.cloud.google.com/billing).
- Conseguir y configurar API key 21st.dev Magic.
- Construir skill propia `etsy-sync` con `skill-creator` para activar [[20-Operaciones/etsy-activacion-2026-05-11|Wenumapu8]].
- Decidir si construir MCP `notebooklm-bridge` tras smoke test de `notebooklm-py` (ver `~/wenu-agent-hub/notebooklm/README.md`).
- Correr `consolidate-memory` antes de fin de mes.
- **Fase 3**: MCPs ecosistema (n8n, WP/WC, Gmail, MailerLite, Postgres).
- **Fase 4**: construir agente `wenu-ceo-weekly` con LaunchAgent lunes 7am.
- **Fase 5**: inteligencia competitiva (precios, proveedores, referentes).

<!-- wenu-backlinks -->
[[Home]] · [[Skills-MOC]] · [[Agentes-MOC]]
