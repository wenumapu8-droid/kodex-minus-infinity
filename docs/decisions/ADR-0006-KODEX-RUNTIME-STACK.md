# ADR-0006 — KODEX runtime stack and integration boundary

Status: `ACCEPTED FOR VERTICAL SLICE V0`

Date: `2026-08-06`

## Context

The existing implementation repository already uses:

```text
Astro 6
TypeScript / JavaScript modules
GSAP
Three.js
native DOM / SVG / Canvas / WebGL
Sharp
Cloudflare-oriented build command
```

The canonical architecture requires:

- one active `100svh` scene;
- stable routing and Browser Back/Forward;
- semantic pointer, touch and keyboard interaction;
- DOM for meaning and controls;
- SVG for diagrams and artifacts;
- Canvas for lightweight generative output and drawing;
- WebGL for depth and impossible-space systems;
- voice, captions, audio layers and session memory;
- reduced-motion and non-WebGL fallbacks;
- an optional moderated public wall.

Adding multiple overlapping animation or component frameworks before the vertical slice would increase bundle, lifecycle and agent-coordination complexity without proving product value.

## Decision

Use the existing Astro implementation and minimize new runtime dependencies.

### Core

```text
Astro
TypeScript
CSS tokens and custom properties
native Web APIs
```

### Animation

```text
GSAP
CSS transitions / Web Animations API for trivial states
```

GSAP remains the primary timeline and interface-animation system because it already exists in the implementation repository.

Do not add Motion or Anime.js during V0 unless a documented capability gap remains after prototype evidence.

### 3D and shaders

```text
Three.js only where it reduces renderer boilerplate
raw WebGL2 / GLSL where existing prototypes already use it effectively
```

Three.js is not the default for every scene. DOM/SVG/Canvas remain preferred when they deliver the same meaning at lower cost.

### UI framework

Do not add React during V0.

Astro components, framework-free TypeScript modules and custom elements are sufficient for the first shell, scenes, overlays and interaction primitives. A framework island may be reconsidered only for a bounded subsystem with measured complexity that cannot be handled cleanly otherwise.

### Scroll

Do not use Lenis in the no-scroll core journey.

Lenis may remain installed for unrelated existing routes, but KODEX core scenes use native fixed viewport behavior. THE COMMONS uses native document scrolling and must remain usable without scroll interpolation.

### Audio

Start with the Web Audio API and native `HTMLAudioElement`.

Add an audio library only when the canonical voice/audio prototype proves a specific scheduling, mixing or cross-browser gap.

### Voice and language model integration

Use provider adapters rather than binding KODEX to one vendor.

```ts
interface VoiceProvider {
  speak(input: VoiceRequest): Promise<VoiceResult>;
  stop(): void;
  available(): Promise<boolean>;
}

interface OracleProvider {
  respond(input: OracleRequest): Promise<OracleResponse>;
}
```

Required adapters:

1. pre-recorded canonical audio;
2. browser/system TTS fallback;
3. remote TTS provider adapter;
4. OpenRouter-compatible Oracle adapter;
5. disabled/offline adapter.

The base journey must remain complete when every remote provider is unavailable.

### Data and session memory

Use a typed client-side session store with versioned serialization.

V0 persistence:

- memory by default;
- optional session storage for refresh continuity;
- explicit export/import for path artifacts;
- no account required;
- no passive cursor history.

### THE COMMONS backend

Keep a provider-neutral boundary:

```text
Astro client
→ contribution API
→ validation and rate limit
→ moderation queue
→ Postgres-compatible database
→ approved public API
→ optional server-sent-event invalidation
```

Do not store public messages as Git commits.

Provider selection is deferred until the local prototype and moderation workflow are validated. Avoid WebSockets in V0.

### Content integrations

```text
Google Drive = private asset warehouse
Obsidian = private context and curation warehouse
GitHub canonical repository = approved source of truth
wenu-frontend = implementation runtime
Linear = production planning and dependencies
```

No automatic Drive/Obsidian-to-public-GitHub publication is permitted.

## Repository topology

Keep two repositories for V0:

```text
kodex-minus-infinity
  canon, schemas, registries, reference algorithm, work packets

wenu-frontend
  Astro runtime, existing assets, scenes and deployment configuration
```

Do not create additional repositories until one of these boundaries becomes necessary:

- reusable public SDK with independent release lifecycle;
- separately deployed Commons service;
- commercial asset-delivery repository that must remain private.

## Implementation branch

Create the implementation branch from the most advanced verified branch:

```text
feature/kodex-depth-engine
→ feature/kodex-vertical-slice-v0
```

Do not start from an older `main` implementation and do not overwrite source history.

## Rejected for V0

- React as default scene runtime;
- Motion plus Anime.js plus GSAP simultaneously;
- a chart library before the semantic chart primitives are known;
- mandatory AI or TTS dependency;
- WebSocket infrastructure for the wall;
- microservices before the vertical slice;
- a third repository only for architectural aesthetics;
- smooth-scroll interception inside the core journey.

## Consequences

Positive:

- fewer overlapping systems;
- existing KODEX code remains reusable;
- simpler lifecycle and cleanup;
- faster mobile validation;
- easier context handoff between agents;
- remote AI/audio providers remain replaceable.

Tradeoffs:

- some custom interaction and chart components must be built;
- the Astro runtime must enforce clear module contracts;
- a future Creator Toolkit may require extraction after V0.

## Review trigger

Revisit this decision only after the vertical slice records concrete evidence of a missing capability, performance problem or independent deployment boundary.

## Deployment

No deployment is authorized by this ADR.
