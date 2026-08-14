# KODEX−∞ Motion Primitive Contracts v0

Status: `EXPERIMENTAL / RESEARCH CONTRACT / M0-SAFE`
Date: `2026-08-14`

This document converts the first-20 reference audit into a small reusable motion vocabulary **without adding runtime code**.

It is subordinate to:

- `SKILL.md`;
- `canon/KODEX_CANON.md`;
- `canon/KODEX_EPISTEMIC_STANDARD.md`;
- `product/EXPERIENCE_ARCHITECTURE.md`;
- `research/REFERENCE_EXTRACTION_PROTOCOL.md`.

A primitive is not a visual effect preset. It is a bounded transformation that receives declared state/content and returns a visual response with a known semantic role, accessibility fallback and failure behavior.

## Shared contract

Every primitive must eventually declare:

```yaml
primitive:
  id: ""
  status: RESEARCH | PROTOTYPE | IMPLEMENTED | TESTED | DEPRECATED
  semantic_role: []
  accepted_inputs: []
  outputs: []
  state_source: "upstream node / interaction state"
  writes_session_memory: false
  may_trigger_memory_event: false
  reduced_motion_behavior: ""
  non_visual_equivalent: ""
  performance_measurements: []
  evidence_required: []
  forbidden_uses: []
```

### Governing rules

1. A primitive never infers identity, emotion, consciousness, biological state or cultural meaning from pointer movement.
2. A primitive does not decide the visitor's route. Route/state logic comes from the node/edge/session-memory system.
3. A primitive may visualize a committed event but does not manufacture one.
4. Motion and color never carry essential meaning alone.
5. Reduced motion preserves the same state and available action.
6. A visual quantity is data only when mapped to admitted data.
7. A waveform/progress signal is real only when connected to a real declared signal/playback source.
8. External reference identity, artwork, logos, morphology and recognizable composition remain outside implementation.
9. Performance is measured in prototypes; this document does not claim achieved frame rate, memory use or GPU cost.

---

# A — RASTER / EARLY-COMPUTER CONTRACT

Working primitive family: `KDX-MP-A`

Reference basis:

- `KDX-MOTION-REF-001`;
- `KDX-MOTION-REF-002`.

## Semantic role

Represent a signal, record or machine field whose **material character** is intentionally low-resolution or discretized.

Rasterization may communicate:

- historical/technical materiality;
- bounded signal quality;
- transformed archive media;
- a distinct machine-state layer.

It must not be applied globally merely to make KODEX look retro.

## Candidate sub-primitives

```text
LowResBuffer
VisualFrameLimiter
PixelQuantize
PaletteCycle
CRTSurface
StarField
```

These are research names, not implementation evidence.

## Accepted inputs

- KODEX-owned image, generated field or proxy geometry;
- declared internal render resolution;
- declared visual cadence target;
- palette/state tokens;
- optional real archive media;
- upstream interaction state.

## Outputs

- intentionally discretized visual field;
- local raster media window;
- bounded temporal cadence;
- optional state-specific signal disturbance.

## Rules

- Keep semantic HTML/vector navigation outside the low-resolution buffer whenever possible.
- Nearest-neighbor scaling may preserve raster character when explicitly chosen.
- Palette cycling is a transformation of a declared palette, not evidence that the source reference used palette cycling.
- Whole-screen CRT/glitch is rejected by default.
- Rare disruption may communicate anomaly or committed transition only when the upstream state declares it.

## Reduced motion

- Freeze continuous translation/cycling.
- Preserve raster composition, hierarchy, labels and current state.
- A static depth hierarchy may use size/brightness without motion.

## Non-visual equivalent

Expose record title, source, state, media description and available actions outside the raster surface.

## Forbidden uses

- hiding essential copy inside illegible pixels;
- global nostalgia filter across unrelated scenes;
- random scan/glitch unrelated to state;
- copying source demoscene objects, logos or lettering;
- presenting low fidelity as proof of historical authenticity.

## Prototype evidence required

- desktop screenshot;
- constrained-width/mobile screenshot;
- reduced-motion screenshot;
- short recording if temporal cadence is used;
- measured runtime/performance report;
- source/rights record for any media shown.

---

# B — OPTICAL / FIELD-STATE CONTRACT

Working primitive family: `KDX-MP-B`

Reference basis:

- `KDX-MOTION-REF-003`;
- `KDX-MOTION-REF-005`.

## Semantic role

Represent:

- focus or resonance;
- maintained relation;
- cyclic connection;
- transition readiness;
- anomaly/stabilization;

through phase, symmetry, line fields or abstract circulation.

It does **not** represent measured consciousness, human energy, spiritual rank or physical field strength unless a separate admitted data source specifically supports the narrower claim.

## Candidate sub-primitives

```text
MotionStateController
WaveDistortion / PhaseField
OrbitField
SignalPulse
```

## Accepted inputs

- upstream node/interaction state;
- KODEX-owned geometry or abstract topology;
- relation IDs/edges when real relations are being shown;
- declared phase, density, symmetry and amplitude parameters;
- accessibility mode.

## Outputs

- state-dependent optical field;
- relation trace/circulation;
- bounded aperture/open event;
- stabilization or de-emphasis state.

## Rules

- Apparent motion can be sufficient; literal animation is not mandatory.
- Optical density and contrast must be controlled to avoid discomfort.
- A committed transition may use one bounded opening event rather than permanent maximal motion.
- Relation lines must correspond to real semantic relations when they function as information.
- Symbolic topology must be visibly separable from empirical measurement.

## Reduced motion

- lower spatial frequency when necessary;
- remove phase travel and circulating traces;
- preserve topology, labels and selected relation;
- provide direct state changes rather than resonance animation.

## Non-visual equivalent

Expose current state, selected relation/topology, source status and transition/action in semantic UI.

## Forbidden uses

- rapid flashing;
- pseudo-biometric or pseudo-spiritual metrics;
- making pointer proximity look like mind/energy detection;
- unlabeled symbolic diagrams presented as scientific instruments;
- copying exact source interference fields.

## Prototype evidence required

- normal-motion recording;
- reduced-motion screenshot/recording;
- keyboard/touch state parity evidence;
- visual-comfort review;
- epistemic labels for symbolic/abstract field use;
- measured performance report.

---

# C — LIVING / PARAMETRIC-FORM CONTRACT

Working primitive family: `KDX-MP-C`

Reference basis:

- `KDX-MOTION-REF-004`;
- first-20 candidates 13–15: KODEX Motion Reference Cards for Living Figure, Parametric Helix and Torque Mesh.

Status note: candidates 13–15 remain `NEEDS_PROVENANCE` before promotion into `KDX-MOTION-KDX-*` implementation records.

## Semantic role

Represent transformation, growth, breathing-like rhythm, deformation or continuity through a bounded parametric form.

"Living" describes visual continuity/responsiveness. It does not claim biological life, sentience or consciousness.

## Candidate parameter vocabulary

```text
phase
turns
radius / amplitude
twist / torsion
frequency
mesh density
local material response
filament response
```

These parameters may be used only after the target form and implementation method are independently defined.

## Accepted inputs

- KODEX-owned geometry/curves/masks;
- declared parameter ranges;
- upstream interaction/state input;
- optional real audio amplitude/frequency features only if a real signal is connected;
- accessibility mode.

## Outputs

- seamless or bounded deformation;
- local expansion/contraction;
- torsion/phase evolution;
- material or filament response;
- static resolved state under reduced motion.

## Rules

- The form's identity remains legible through its cycle.
- Local deformation is preferred over moving the entire viewport.
- A loop must return to its initial state if it is declared seamless.
- Parameter values are implementation controls, not biological measurements.
- If an Ocín artwork is adapted, the original work remains intact and the motion adapter must respect allowed transformations.

## Reduced motion

- freeze at an authored representative state or allow user-triggered discrete state changes;
- remove perpetual twist/translation;
- preserve morphology, labels and action affordances.

## Non-visual equivalent

Describe the form, current transformation state, source/author, allowed action and any real parameter meaning.

## Forbidden uses

- copying external organism morphology;
- implying a form senses the visitor;
- calling generated rhythm a heartbeat/breath measurement;
- continuous maximal deformation that destroys authorial legibility;
- treating printed pseudo-code as verified executable implementation.

## Prototype evidence required

- source/provenance for geometry/artwork;
- parameter-range documentation;
- seamless-loop test when claimed;
- desktop/mobile/reduced-motion evidence;
- performance measurements;
- visual review confirming original art remains legible where applicable.

---

# D — INFORMATION-TRANSFORMATION CONTRACT

Working primitive family: `KDX-MP-D`

Reference basis:

- `KDX-MOTION-REF-006`;
- `KDX-MOTION-REF-007`;
- `KDX-MOTION-REF-009`.

## Semantic role

Animate **changes in information structure** rather than decorate a chart.

Supported conceptual transformations include:

```text
FRAGMENTS → AGGREGATE
AGGREGATE → FRAGMENTS
FULL GRAPH → SELECTED RELATION SET
LAYER HISTORY → SELECTED STRATUM
STATE A → STATE B
CONTINUITY → DOCUMENTED RUPTURE
```

## Accepted inputs

- admitted records/entities;
- declared relation edges;
- real category/group fields;
- real time/version ordering;
- actual counts where counts are shown;
- upstream selection state.

## Outputs

- reversible filtering;
- relation reveal;
- ordered layer reveal;
- aggregation/dissolution;
- source-linked inspection state.

## Rules

- Preserve spatial orientation during filtering whenever possible.
- Colors, density and particle/token counts must map to declared fields if they imply information.
- A rupture animation is allowed only when the underlying source/state contains a real discontinuity, contradiction or anomaly.
- Tiny marks may be visual, but interaction hit areas must remain accessible.
- Selection and inspection are distinguishable from committed route decisions.

## Reduced motion

- replace travel/morph with immediate state swap, opacity grouping or static before/after views;
- preserve selection, ordering and source access;
- offer structured list/table alternatives.

## Non-visual equivalent

Expose the same entities, groups, order, relations, counts and provenance as structured semantic content.

## Forbidden uses

- decorative data particles with fake counts;
- numerals that look measured but are synthetic;
- random network edges;
- reordering strata for visual convenience;
- a chart that becomes less interpretable because it moves.

## Prototype evidence required

- data/field mapping document;
- desktop/mobile state screenshots;
- keyboard navigation evidence;
- reduced-motion/static comparison;
- source/provenance inspection path;
- test that filtering preserves correct entities/relations.

---

# E — EDITORIAL / MEDIA-STATE CONTRACT

Working primitive family: `KDX-MP-E`

Reference basis:

- `KDX-MOTION-REF-008`.

Static composition references supporting the broader editorial system:

- Graph Garmata study;
- Brass Hands study;
- Rendah Mag Issue 014 screenshot.

These static references are **not** motion blueprints.

## Semantic role

Let authorial art, text, sound and archive media change state within a stable editorial composition.

The interface should feel alive because media/state changes are meaningful and traceable, not because every panel floats.

## Accepted inputs

- Ocín/KODEX media with known rights;
- archive metadata/provenance;
- real audio/video playback state;
- upstream selection/inspection state;
- captions/transcripts where applicable.

## Outputs

- bounded media reveal/replace;
- real playback progress;
- selected/inspected state;
- source/provenance reveal;
- optional route-memory confirmation pulse.

## Rules

- Macro composition and authorial work remain dominant.
- Media transitions are triggered by real state changes.
- Audio progress/waveforms require a real signal.
- A selected work may write route memory only when the node contract declares a later consequence.
- Editorial motion must not reproduce recognizable source-site layouts.

## Reduced motion

- direct media swaps or low-amplitude opacity changes;
- no parallax or sliding panels required;
- playback controls remain fully functional.

## Non-visual equivalent

Expose title, author, media type, playback state, transcript/caption, provenance and actions in semantic HTML.

## Forbidden uses

- fake playback/activity;
- auto-motion that competes with artwork;
- copied external photography/type/layout;
- generic animated-card UI;
- decorative audio spectrum with no signal.

## Prototype evidence required

- rights/source record for displayed media;
- keyboard/touch control evidence;
- captions/transcripts where applicable;
- reduced-motion screenshot;
- recording of actual media-state transitions;
- measured performance report.

---

# Cross-family composition rule

A scene should use the minimum primitive set required by its state/question.

Recommended reasoning sequence:

```text
NODE QUESTION
→ CONTENT / SOURCE
→ USER ACTION
→ STATE CHANGE
→ INFORMATION CONSEQUENCE
→ CHOOSE 0–2 PRIMARY MOTION FAMILIES
→ DEFINE REDUCED MOTION
→ PROTOTYPE
→ MEASURE / REVIEW
```

Do not combine all five families in one viewport simply because they exist.

# Next gate

The next research task is a **scene/node applicability matrix** that maps the five primitive families onto the finite vertical slice without creating new nodes or scenes.

No production implementation is authorized by this document.
