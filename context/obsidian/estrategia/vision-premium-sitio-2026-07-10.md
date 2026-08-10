---
title: Visión premium del sitio — Norte de diseño
fecha: 2026-07-10
tipo: referencia-diseno
estado: vision-objetivo
naturaleza: mockups aproximados generados con IA (estimado visual, NO estado actual del sitio)
autor_intencion: Ocin
tags: [diseno, mockups, norte, frontend, roadmap, vision]
carpeta_assets: "[[estrategia/mockups-vision-2026-07-10]]"
respaldo_lacie: "/Volumes/LaCie/Wenu mapu/mockups-vision-2026-07-10/"
---

# Visión premium del sitio — Norte de diseño (2026-07-10)

> [!important] Qué es esto
> Ocin mandó **10 mockups PNG** que representan la **visión objetivo** del sitio Wenu Mapu: cómo quiere que se vea y se sienta la experiencia completa (checkout, cuentas, portal, booking, PDP, colecciones).
> Son **aproximaciones / estimados visuales generados con IA** — un norte de diseño, **NO el estado actual** del sitio en producción. Sirven como referencia de dirección, no como especificación literal ni como "ya está hecho".
> Preservados en 3 lugares (regla persistir-en-3): esta nota + PNGs en Obsidian + respaldo en LaCie. Nunca borrar.

## Ubicación de los 10 mockups

- **Obsidian (canónico vault):** `~/Obsidian/WenuAgent/estrategia/mockups-vision-2026-07-10/`
- **LaCie (respaldo):** `/Volumes/LaCie/Wenu mapu/mockups-vision-2026-07-10/`
- **Origen:** subidos por Ocin el 2026-07-10.

## Los 10 mockups — pantalla, elementos clave y capa técnica

Leyenda de capa:
- 🟢 **FRONTEND ya posible** — se puede construir como página estática Astro (UI/layout/contenido); no requiere backend de usuario.
- 🔴 **BACKEND fase 2** — requiere cuentas / login / persistencia / pagos / booking. No es solo maquetar.

### 1. Checkout — `checkout.png` 🟡 (UI 🟢 / pago 🔴)
Flujo de 3 pasos: **contact → shipping → payment**. Order summary lateral. Métodos: **Apple Pay / Google Pay + tarjeta**.
- 🟢 Frontend: layout de los 3 pasos, order summary, estados de formulario.
- 🔴 Backend: procesamiento real de pago (Apple/Google Pay, tarjeta), impuestos/envío, creación de orden. Vive en `wenu-platform` (pagos), no en el SSG.

### 2. Order confirmation "RITUAL COMPLETE" — `order-confirmation-ritual-complete.png` 🟡 (UI 🟢 / cuenta 🔴)
Número de orden, status, tracking, opciones **save history / create account**.
- 🟢 Frontend: pantalla de confirmación (plantilla).
- 🔴 Backend: número de orden real, tracking, guardar historial y crear cuenta.

### 3. Restore access — `restore-access.png` 🔴 BACKEND fase 2
**Password reset por email.**
- 🔴 Requiere sistema de auth + envío de email (Titan SMTP / Hermes). Fase 2.

### 4. Cart "THE BUNDLE" — `cart-the-bundle.png` 🟡 (UI 🟢 / estado 🔴)
Line items, **progreso de free-shipping**, código promo, "proceed to checkout", logos "we accept".
- 🟢 Frontend: página de carrito, barra de free-ship, logos de pago (maquetable con JS de cliente/localStorage para el carrito).
- 🔴 Backend: promos server-side, cálculo de envío real, sesión de carrito persistente.

### 5. Account dashboard "YOUR PORTAL" — `account-portal.png` 🔴 BACKEND fase 2
Orders / wishlist / addresses / account / **appointments** / **saved constellations** + **tribe points / loyalty**.
- 🔴 Todo esto necesita cuentas, base de datos de usuario, wishlist persistente, historial de citas, loyalty. Fase 2 completa.

### 6. Book a piercing — `book-a-piercing.png` 🔴 BACKEND fase 2
4 pasos: **placement → jewelry → date → time**, health & safety, botón reserve.
- 🟢 Frontend parcial: el wizard de 4 pasos y la info de health&safety se pueden maquetar; conecta con la herramienta `/constelaciones` existente.
- 🔴 Backend: disponibilidad real de fechas/horas y **reserva** requieren sistema de booking. Fase 2.

### 7. About "OUR ORIGIN" — `about-our-origin.png` 🟢 FRONTEND ya posible
Fundador, filosofía, valores. (Nota: el mockup dice "Aukan Lefimán" — **verificar contra el origen real de la marca** antes de publicar; ver memoria `reference_wenu_origen_marca`. El copy de /about ya requería corrección.)
- 🟢 Página de contenido estática. Construible ahora.

### 8. PDP "LUNAR ORBIT NOSTRIL STUD" — `pdp-lunar-orbit.png` 🟢 FRONTEND ya posible
Galería, selector **material / gauge / size / single-pair**, "add to bundle", technical details, "you may also love".
- 🟢 Es el detalle de producto (`/p/[slug]`). Datos de WooCommerce en build time. Los selectores y detalles técnicos son frontend. "Add to bundle" = carrito cliente.

### 9. Collections — `collections.png` 🟢 FRONTEND ya posible
Grid de colecciones: **Origin / Solar / Araucanía / Atacama / Neo / Eclipse**, con "N objects released".
- 🟢 Grid de colecciones estático, alimentado por categorías/colecciones de WooCommerce.

### 10. Sign up "JOIN THE TRIBE" — `signup-join-the-tribe.png` 🔴 BACKEND fase 2
Nombre / email / password / confirm, create account, **sign up with Google**, log in.
- 🔴 Auth completa (email+password, OAuth Google). Fase 2.

## Checklist de construcción (orden sugerido)

**Fase 1 — Frontend (construible ahora, sin backend de usuario):**
- [ ] PDP premium — galería + selectores material/gauge/size + technical details + "you may also love" (`pdp-lunar-orbit`)
- [ ] Collections — grid Origin/Solar/Araucanía/Atacama/Neo/Eclipse (`collections`)
- [ ] About "Our Origin" — filosofía + valores (verificar copy de origen real) (`about-our-origin`)
- [ ] Cart page "The Bundle" — line items + free-ship + promo (UI + carrito cliente) (`cart-the-bundle`)
- [ ] Checkout UI — layout de 3 pasos + order summary (sin conectar pago aún) (`checkout`)
- [ ] Order confirmation — plantilla "Ritual Complete" (sin datos reales aún) (`order-confirmation-ritual-complete`)

**Fase 2 — Backend (cuentas / pagos / booking; requiere `wenu-platform`):**
- [ ] Conectar pago real en checkout (Apple/Google Pay + tarjeta)
- [ ] Orden real + tracking en confirmation
- [ ] Auth: Sign up "Join the Tribe" (email/password + Google) (`signup-join-the-tribe`)
- [ ] Restore access — password reset por email (`restore-access`)
- [ ] Account dashboard "Your Portal" — orders/wishlist/addresses/appointments/saved-constellations/loyalty (`account-portal`)
- [ ] Book a piercing — booking real de fecha/hora + reserve (`book-a-piercing`)

> [!note] Regla de honestidad
> Nada de esto está "hecho" hasta verificar en vivo en `wenumapuonline.com`. Estos mockups son el **norte**, no el estado. Distinguir siempre coded / deployed / verified-live.

## Enlaces

- Arquitectura / benchmark objetivo: [[wultufe-benchmark-arquitectura-2026-06-29]]
- MOC raíz: [[Home]]
- Assets de los mockups: `estrategia/mockups-vision-2026-07-10/`
- Contexto de terminar el sitio: [[00-Index/PROMPT-MAESTRO-WENU-100-OPERATIVO]]

<!-- wenu-backlinks -->
Relacionado: [[Home]] · [[wultufe-benchmark-arquitectura-2026-06-29]] · [[00-Index/Proyectos-MOC]]
