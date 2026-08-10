# Dependency Decision Matrix

| Need | Preferred | Avoid |
|---|---|---|
| Static structure | Astro | Full SPA by default |
| State orchestration | Native store or XState if justified | Ad-hoc globals |
| DOM/SVG choreography | GSAP or Web Animations | Multiple animation libraries |
| Fullscreen shader | WebGL2/OGL/custom | Three.js for trivial effects |
| 3D scene | Three.js or OGL | CSS pseudo-3D for complex geometry |
| Quiet graphics | Canvas/SVG/CSS | Heavy WebGL |
| Audio scheduling | Tone.js | Manual timing loops |
| Audio analysis | Meyda/Web Audio | DOM-frequency updates |
| Testing | Playwright | Screenshot review only |
| GPU inspection | Spector.js | FPS label alone |
