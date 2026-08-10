# 🎨 Brand Kit — Wenu Mapu

## Filosofía de Marca

**Wenu Mapu** significa "Tierra Nueva" en mapudungun. Representa la artesanía que conecta cuerpo y tierra, piezas únicas que cuentan historias ancestrales mezcladas con el cosmos.

**Tono:** Místico, artesanal, sofisticado pero accesible  
**Personalidad:** Auténtico, cuidadoso, detallista, artesanal premium

---

## 🌈 Paleta de Colores

### Primarios
| Color | Hex | RGB | Uso |
|-------|-----|-----|-----|
| **Oro Wenu** | `#C9A962` | 201, 169, 98 | Acentos principales, CTAs |
| **Oro Oscuro** | `#8B6914` | 139, 105, 20 | Títulos, énfasis |
| **Negro Cósmico** | `#0A0A0F` | 10, 10, 15 | Fondos principales |
| **Gris Espacial** | `#1A1A25` | 26, 26, 37 | Tarjetas, contenedores |

### Secundarios
| Color | Hex | Uso |
|-------|-----|-----|
| **Blanco Lunar** | `#F0E6D3` | Texto principal |
| **Gris Neblina** | `#A89F8F` | Texto secundario |
| **Verde Éxito** | `#4ADE80` | Estados positivos |
| **Amarillo Alerta** | `#FBBF24` | Warnings |
| **Rojo Error** | `#EF4444` | Errores críticos |

### Gradientes
```css
/* Gradiente Principal */
background: linear-gradient(135deg, #C9A962 0%, #8B6914 100%);

/* Gradiente Cósmico */
background: linear-gradient(180deg, #0A0A0F 0%, #1A1A25 100%);

/* Gradiente Místico */
background: linear-gradient(135deg, #C9A962 0%, #6366F1 100%);
```

---

## ✒️ Tipografía

### Títulos (Display)
- **Font:** Cinzel
- **Fallback:** serif
- **Uso:** Títulos principales, logotipos, headers
- **Google Fonts:** `https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap`

### Cuerpo (Body)
- **Font:** Cormorant Garamond
- **Fallback:** Georgia, serif
- **Uso:** Textos, descripciones, cuerpo de página
- **Google Fonts:** `https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&display=swap`

### Monospace (Código/Técnico)
- **Font:** SF Mono
- **Fallback:** Monaco, monospace
- **Uso:** Código, logs, datos técnicos

---

## 📐 Espaciado y Tamaños

### Escala de Espaciado
```
xs:  4px   (0.25rem)
sm:  8px   (0.5rem)
md:  16px  (1rem)
lg:  24px  (1.5rem)
xl:  32px  (2rem)
2xl: 48px  (3rem)
3xl: 64px  (4rem)
```

### Tamaños de Fuente
```
xs:   12px  (0.75rem)
sm:   14px  (0.875rem)
base: 16px  (1rem)
lg:   18px  (1.125rem)
xl:   20px  (1.25rem)
2xl:  24px  (1.5rem)
3xl:  32px  (2rem)
4xl:  48px  (3rem)
```

### Bordes
```
radio-sm:  4px   (botones pequeños)
radio-md:  8px   (botones, inputs)
radio-lg:  12px  (tarjetas)
radio-xl:  16px  (modales)
```

---

## 🔤 Logotipo

### Nombre
**WENU MAPU** — Todo en mayúsculas, Cinzel Bold

### Variaciones
1. **Horizontal:** Logo + tagline en una línea
2. **Vertical:** Logo sobre tagline
3. **Ícono:** Solo "W" estilizado con símbolo mapu
4. **Minimal:** Solo nombre sin tagline

### Clear Space
Margen mínimo igual al alto de la letra "W"

### Tamaño Mínimo
- Digital: 120px de ancho
- Print: 30mm de ancho

---

## 📝 Tagline

**"Joyería Corporal Artesanal"**

Alternativas:
- "Arte que llevas puesto"
- "Tu ritual de moda"
- "Tierra nueva, estilo único"

---

## 🎭 Iconografía

### Estilo
- Líneas limpias, 2px stroke
- Esquinas ligeramente redondeadas
- Color único o con tinte dorado

### Íconos del Sistema (WenuOS)
```
📸  Clasificación de fotos
📦  Inventario/Stock
🛒  WooCommerce
📧  Email
🤖  Agente IA
⚡  Optimización
📊  Dashboard/Métricas
🔧  Configuración
✅  Éxito
⚠️  Warning
❌  Error
🎯  Objetivo
💜  Accent/Cool
✨  Sparkle/魔法
🌙  Místico
```

---

## 📐 Componentes UI

### Botones

**Primario**
```css
background: #C9A962;
color: #0A0A0F;
padding: 12px 24px;
border-radius: 8px;
font-family: 'Cormorant Garamond', serif;
font-weight: 600;
border: none;
```
*Hover: brightness(1.1)*

**Secundario**
```css
background: transparent;
color: #C9A962;
border: 1px solid #C9A962;
padding: 12px 24px;
border-radius: 8px;
```
*Hover: background rgba(201, 169, 98, 0.1)*

**Ghost**
```css
background: transparent;
color: #A89F8F;
border: none;
padding: 8px 16px;
```
*Hover: color #F0E6D3*

### Tarjetas
```css
background: #12121A;
border: 1px solid rgba(201, 169, 98, 0.2);
border-radius: 12px;
padding: 24px;
```
*Hover: border-color rgba(201, 169, 98, 0.4)*

### Badges/Estados
```
🟢 Online/Success: #4ADE80 bg con 20% opacity
🟡 Warning: #FBBF24 bg con 20% opacity
🔴 Error: #EF4444 bg con 20% opacity
🔵 Info: #60A5FA bg con 20% opacity
```

### Inputs
```css
background: #0A0A0F;
border: 1px solid rgba(201, 169, 98, 0.3);
border-radius: 8px;
padding: 12px 16px;
color: #F0E6D3;
font-family: 'Cormorant Garamond', serif;
```
*Focus: border-color #C9A962*

---

## 🖼️ Fotografía de Producto

### Estilo
- Fondo: Blanco puro o negro profundo
- Luz: Natural, suave,sin sombras duras
- Angulación: 45° o flatlay
- Edición: Mínima, colores realistas

### Required
- Foto principal (square 1:1)
- Foto detalle (material)
- Foto en uso (en cuerpo)
- Foto empaque

---

## 🎯 Usos Permitidos y No Permitidos

### ✅ Permitido
- Usar colores de marca en fondos oscuros
- Combinar tipografías Cinzel + Cormorant
- Usar gradiente oro en botones CTAs
- Agregar sombras sutiles con tinte dorado

### ❌ No Permitido
- Cambiar colores primarios
- Usar fuentes diferentes a las designadas
- Aplicar efectos de distorsión al logo
- Usar sobre fondos muy saturados
- Agregar bordes redondeados exagerados

---

## 📱 Aplicaciones

### Logo App (1024x1024)
- Fondo: Gradiente #0A0A0F → #1A1A25
- Logo dorado centrado
- Sin tagline

### Favicon (32x32)
- Ícono W estilizado dorado
- Fondo transparente

### Social Media
- Instagram: 1080x1080 o 1080x1350
- Story: 1080x1920
- Portada Facebook: 820x312

---

## 🌐 Assets Digitales

### Favicon
```
/favicon.ico
/favicon-16.png
/favicon-32.png
/apple-touch-icon.png
```

### Open Graph
```
/og-image.jpg (1200x630)
```

---

*Brand Kit Wenu Mapu v1.0 — 2026-04-17*
*Actualizado por WenuOS*


<!-- wenu-backlinks -->
## 🔗 Contexto
- [[Home]] · [[00-Index/Contexto-MOC]]
