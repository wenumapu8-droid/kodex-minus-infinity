# KODEX−∞ TYPOGRAPHY

Status: `CANONICAL ROLE SYSTEM / FONT SELECTION PENDING`

## Purpose

Typography must stabilize the experience while visual systems move. It carries hierarchy, reading, source access and technical precision.

## Roles

### Display

Use for short declarations, scene names and primary questions.

Requirements:

- distinctive silhouette;
- strong mobile behavior;
- limited line count;
- no continuous animation;
- not used for dense reading.

### Editorial

Use for body copy, context, methods, source summaries and case studies.

Requirements:

- high legibility;
- comfortable x-height and spacing;
- line length near 45–75 characters depending on language and viewport;
- multiple language support where needed.

### Interface

Use for navigation, controls, labels and legends.

Requirements:

- clear at small sizes;
- distinguishable letterforms;
- readable uppercase and numerals;
- stable width where state changes should not shift layout excessively.

### Mono / technical

Use only for:

- actual code;
- source IDs;
- verified runtime telemetry;
- file paths;
- formulas and transformations.

Do not use monospaced text to make arbitrary metadata appear factual.

## Hierarchy

```text
QUESTION / DECLARATION
SCENE OR MODULE NAME
PRIMARY EXPLANATION
ACTION
LEGEND / ANNOTATION
SOURCE / METHOD
TECHNICAL DETAIL
```

The source and method layer can be visually quieter but must remain readable and reachable.

## Responsive rules

- use fluid sizing with bounded minimum and maximum;
- prevent display text from exceeding the artwork's available negative space;
- avoid clipped line boxes on mobile;
- preserve CTA and exit visibility;
- move dense metadata into overlays rather than reducing it below readable size;
- test Spanish and English length differences.

## Motion rules

Allowed:

- brief reveal;
- meaningful redaction/unredaction;
- state transition from unresolved to legible;
- typographic particles when text is data and remains recoverable.

Avoid:

- permanent jitter;
- animated every-letter headlines;
- continuous ticker without user purpose;
- type distortion that destroys source names or accessibility.

## Font rights

No font family becomes canonical until:

- web/app/desktop rights are understood;
- redistribution rules are known;
- repository publication is permitted;
- fallback stack is defined;
- accents and required languages are supported;
- performance is acceptable.

Do not commit font binaries to this repository unless redistribution is explicitly permitted.

## Interim system

Until font selection is approved, implementations should use role variables rather than hard-coded proprietary family names:

```css
--kdx-font-display: system-ui, sans-serif;
--kdx-font-editorial: ui-serif, serif;
--kdx-font-interface: system-ui, sans-serif;
--kdx-font-mono: ui-monospace, monospace;
```

These are fallbacks, not the final KODEX identity.

## Accessibility

- body text should generally not fall below 16px equivalent on mobile;
- controls remain readable at text zoom;
- line height supports comprehension;
- text is not embedded only in images;
- contrast is tested in dark and Return states;
- source names and evidence classifications remain available to assistive technology.
