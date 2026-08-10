# MASTER IMPLEMENTATION PROMPT — KODEX QUIET FRAMES

Implement a reusable Quiet Frames / Archive Interludes subsystem inside the existing Astro KODEX project.

## Read first

- KODEX_QUIET_FRAMES_MASTER_CONTEXT.md
- QUIET_FRAMES_DESIGN_SYSTEM.md
- quiet-frames-presets.json
- quiet-frame.schema.json

## Objective

Create silent editorial interludes between dense KODEX scenes.

The result must feel:

- minimal;
- archival;
- monochrome;
- intentional;
- museum-grade;
- technologically restrained;
- visually breathable.

It must not feel like:

- another HUD scene;
- a SaaS landing;
- a carousel;
- a generic portfolio;
- a cyberpunk overlay;
- a large image with random codes.

## Required files

- `src/components/kodex/interludes/KodexQuietFrame.astro`
- `src/styles/kodex-quiet-frames.css`
- `src/scripts/kodex-quiet-frames.ts`
- `src/lib/kodex/quietFrames.ts`

## Required presets

1. Archive Fragment
2. Signal Residue
3. Body Index
4. Terrain Memory
5. Threshold Sheet
6. Constellation Plate
7. Field Note
8. Symbol Breath

## Functional requirements

- image and symbol modes;
- six ratios;
- five geometry families;
- left, center and right alignment;
- one optional accent;
- vertical code rail;
- metadata;
- reduced motion;
- keyboard-safe links;
- mobile-specific layout;
- zero horizontal overflow;
- no accidental scroll when used as a full-viewport interlude.

## Motion

Use only:

- slow fade;
- mask reveal;
- image drift <= 3px;
- subtle scanline;
- microtext reveal;
- rare flicker.

Do not add:

- constant glitch;
- orbit systems;
- multipass WebGL;
- large parallax;
- several simultaneous motions.

## Acceptance criteria

Desktop:
- 70% perceived empty space;
- image or symbol occupies 20–35%;
- only one geometry family;
- readable microtext;
- no decorative telemetry.

Mobile:
- 390×844 and 412×915;
- `scrollWidth === innerWidth`;
- no content cut on right;
- rail converted to horizontal;
- image <= 44dvh;
- safe-area respected.

Performance:
- no WebGL dependency;
- images lazy loaded;
- CSS-only motion;
- observer disconnected on teardown;
- reduced-motion version visually complete.

Deliver:
- modified files;
- screenshots for all eight presets;
- desktop and mobile validation;
- overflow metrics;
- honest limitations.
