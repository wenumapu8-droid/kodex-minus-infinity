---
type: brand-reference · credentials
topic: credenciales reales · CV · certificados
status: canonical
date: 2026-05-30
source: Drive folder `Body Piercing • Certifications & Compliance` (ID 1lVTD8h6BqYcsb7QhXelu3j8Xy3bwEIsP) + CV PDF parseado
---

# Credenciales reales — Nicolás Ortega · Wenu Mapu

> Esta es la fuente canónica para mostrar credenciales en `/piercing` (sección "What you can review before you reserve") y para schema.org `Person.hasCredential`.

## Perfil

- **Nombre legal completo:** Rodrigo Nicolás Ortega García.
- **Nombre profesional / branded:** Nicolás Ortega (también firma como Ocin · Nico).
- **Apodos:** Nico (familia), Ocin (Nico al revés).
- **Email profesional:** Ocinkey8@gmail.com · marimari@wenumapuonline.com.
- **Teléfono:** (408) 500-6211.
- **Behance:** behance.net/wenumapu.
- **LinkedIn:** linkedin.com/in/nicolas-ortega-790538279.
- **Studio location:** Truckee / North Lake Tahoe, CA — Lucky 7 Tattoo & Piercing + TRUTH TATTOO STUDIO.

### Uso de nombres
- **Documentos oficiales / legales:** Rodrigo Nicolás Ortega García (o Rodrigo Ortega cuando se acorta).
- **Marca / website / portafolio:** Nicolás Ortega (forma pública preferida).
- **Personal / amigable:** Nico, Ocin.
- **Schema.org `Person`:** `name` = legal completo, `givenName` = "Rodrigo Nicolás", `familyName` = "Ortega García", `alternateName` = ["Nicolás Ortega", "Ocin", "Nico"].

---

## Education & Certifications (en orden de impacto para la página)

### 🥇 APP Core Essentials Vol. 4 — Association of Professional Piercers
- **Periodo:** Octubre 2025 – Diciembre 2025
- **Formato:** Online
- **Contenido:** Professional training in jewelry for initial piercings, anatomy-based techniques (nostril, high nostril, forward helix, flat, faux rook), point-of-use sterilization, safe room practices, APP-aligned hygiene standards.
- **Por qué importa:** APP es el gold standard internacional de piercing profesional. Si lo destacas como #1, eleva todo el perfil.

### 🥈 Mentorship — Bryan Gutiérrez @modifica.tu.ser
- **Periodo:** 2025 – Presente
- **Formato:** Online ongoing
- **Contenido:** Ongoing guidance in anatomy, needle handling theory, jewelry standards, safe studio practices.
- **Cómo mostrarlo:** "Active mentorship under @modifica.tu.ser."

### 🥉 Bloodborne Pathogens (BBP) Certification — American Heart Association
- **Periodo:** 2023 – 2027 (vigente)
- **Tipo:** OSHA-compliant bloodborne pathogens safety for body art environments.
- **Files in Drive:**
  - `Rodrigo_Ortega_BBP100-Certificate (5).pdf` (más reciente — 2026-06-03)
  - `Rodrigo_Ortega_BBP100-Certificate (3).pdf` (2025-11)
  - `Heartsaver_Bloodborne_Course_Certificate_ucm_497405.pdf` (AHA)

### First Aid / CPR / AED — American Heart Association
- **Vigencia:** Valid through 2025 (PRÓXIMO A VENCER — renovar).
- **Contenido:** Emergency response, CPR, AED operation, workplace safety.
- **Files in Drive:** `Student_eCard.pdf` (AHA student card).

### Continuing Education — Professional Piercers Collective
- **Periodo:** Noviembre 2025 (continuing)
- **Formato:** Online seminars.
- **Contenido:** Ear and facial piercing theory, anatomy fundamentals, needle-modification concepts, jewelry selection, studio hygiene, business/pricing.
- **Files in Drive:**
  - `Certificado PPC JAVIER TECHERA 2026_20251231_161251_0016.jpg`
  - `Certificado ppc mes continuo1_20251123_143455_0003.jpg`
  - `Certificado ppc mes continuo1_20251116_141037_0007.jpg`

### Hepatitis B Declination Statement
- **File:** `Hepatitis B Declination Statement (PDF).pdf` (file de compliance — documenta que entendió y rechazó vacuna obligatoria, requerido por OSHA).

### Symposium / Simposio
- **File:** `Certificados Simpósio (1).pdf` — asistencia a un simposio (necesitamos abrir el archivo para detalles).

### 🎓 Industrial Design Program — Duoc UC
- **Periodo:** Marzo 2016 – Agosto 2020
- **Lugar:** Santiago, Chile
- **Contenido:** Service and product design with global, human-centered approach. Creativity, conceptual thinking, visual communication, digital tools.

### 🏗 Technical Diploma in Construction, Environment & Territory
- **Periodo:** Agosto 2010 – Mayo 2014
- **Lugar:** Milan, Italy
- **Contenido:** Drafting, structural basics, surveying, environmental management.

---

## Experience

- **Studio Assistant & Front Desk Support · TRUTH TATTOO STUDIO** — Truckee, CA · Agosto 2023 – Presente (part-time).
- **Photographer (self-employed)** — Septiembre 2018 – Presente. Fine detail / metal / gem / jewelry macro for online showcases.
- **Line Cook, Front Counter & Produce · New Moon Natural Foods** — Truckee, CA · Diciembre 2022 – Presente (part-time).

---

## Skills (categorizadas para schema y para badge ui)

### Piercing & Studio Operations
Sterile tool handling · Tray & station setup · Jewelry organization · Studio hygiene standards · Workflow discipline.

### Safety & Compliance
OSHA-compliant bloodborne pathogens · CPR/AED certified · PPE protocols · Cross-contamination prevention · Point-of-use sterilization basics.

### Jewelry Knowledge
Threadless systems · Titanium ASTM F-136 · Gold 14k for initial piercings · Sizing & anatomy considerations · Micro-gem & fine jewelry handling.

### Customer Experience
Client communication · Aftercare guidance · Reception & scheduling.

### Technical Skills
Macro photography · Nikon camera setup · Lighting & micro-surface capture · Basic photo retouching · Digital catalog creation.

---

## Implementación pendiente

### En `/piercing` (sección "Credentials & Compliance")
Reemplazar la sección actual con un grid de cards basadas en este documento:

```
🌑 APP Core Essentials Vol. 4 (2025) — Association of Professional Piercers
🌑 Mentorship under Bryan Gutiérrez · @modifica.tu.ser (2025–present)
🌑 Bloodborne Pathogens (OSHA-compliant) — AHA (2023–2027)
🌑 First Aid / CPR / AED — AHA (valid through 2025) [renovar pronto]
🌑 Continuing Ed · Professional Piercers Collective (2025)
🌑 Hep B Declination on file
```

Cada card linkea al PDF subido a `/public/credentials/<filename>.pdf` (Ocin sube los PDFs al proyecto cuando pueda).

### En schema.org (Base.astro o `/about`)
Agregar al Person schema un `hasCredential` array:

```json
"hasCredential": [
  {"@type": "EducationalOccupationalCredential", "name": "APP Core Essentials Vol. 4", "credentialCategory": "certificate", "recognizedBy": {"@type": "Organization", "name": "Association of Professional Piercers"}, "validIn": {"@type": "Country", "name": "US"}, "dateCreated": "2025-12"},
  {"@type": "EducationalOccupationalCredential", "name": "Bloodborne Pathogens Certification", "credentialCategory": "certificate", "recognizedBy": {"@type": "Organization", "name": "American Heart Association"}, "validFrom": "2023", "expires": "2027"},
  {"@type": "EducationalOccupationalCredential", "name": "First Aid / CPR / AED", "credentialCategory": "certificate", "recognizedBy": {"@type": "Organization", "name": "American Heart Association"}}
]
```

Eso lo lee Google para el Knowledge Panel.

---

<!-- wenu-backlinks -->
## 🔗 Contexto
- [[30-Auditorias/2026-05-29-ux-audit-jerarquia-comercial]]
- [[brand/01-identity/regla-handmade-vs-sourced]]
- Drive folder: https://drive.google.com/drive/folders/1lVTD8h6BqYcsb7QhXelu3j8Xy3bwEIsP
