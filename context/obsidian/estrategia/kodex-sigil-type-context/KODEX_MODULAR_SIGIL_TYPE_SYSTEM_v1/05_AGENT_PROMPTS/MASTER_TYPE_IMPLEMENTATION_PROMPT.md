# MASTER AGENT PROMPT — MODULAR SIGIL TYPOGRAPHY

Implement the KODEX modular sigil type system without turning the whole interface into an illegible display font.

## Required hierarchy

1. KDX Sigil Grid for signatures and 1–3 word commands.
2. Oxanium or Chakra Petch for readable display.
3. Geist Mono or IBM Plex Mono for interface.
4. Geist for editorial copy.

## Required styles

- block
- ritual
- signal
- outline

## Required presets

Preserve the original eight Quiet Frame presets and add:
- Indie Deep
- Chill Out
- Dark Ambient
- Ritual Dub

## Acceptance criteria

- Sigil text remains vector and selectable through accessible labels.
- No font binary is committed without verified license.
- No paragraph is rendered in sigil mode.
- Mobile hero words fit 100vw without clipping.
- `aria-label` communicates the real text.
- Reduced motion keeps all typography readable.
- The result feels authored, not like a generic sci-fi font pack.
