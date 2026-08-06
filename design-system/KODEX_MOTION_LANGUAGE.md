# KODEX−∞ MOTION LANGUAGE

Status: `CANONICAL MOTION STANDARD / V0.1`

## 1. Principle

Motion is a semantic channel and a temporal material. It is not a default decoration.

Every motion must be one of:

```text
DATA MOTION
STATE MOTION
INTERACTION MOTION
TRANSITION MOTION
ATMOSPHERIC MOTION
```

## 2. Motion vocabulary

| Motion | Canonical meaning |
|---|---|
| pulse | active state, guided timing or event |
| expansion | opening, increased scope or declared inhale timing |
| contraction | narrowing, protection, reduced scope or declared exhale timing |
| drift | low-priority ambient uncertainty or slow relation movement |
| vibration | instability or uncertainty |
| bifurcation | decision or documented divergence |
| sedimentation | archival accumulation and memory persistence |
| rupture | contradiction, anomaly or transition boundary |
| orbit | maintained relation or documented recurrence |
| dissolution | loss, expiry, forgetting or release |
| scan | active inspection when the scan changes what is revealed |
| whitening | Return, openness and resolved visibility |
| spectral separation | differentiation of previously entangled relations |

## 3. Scene motion stack

Default composition:

```text
1 protagonist movement
2 structural movements
2–4 micro-signals
```

Priority:

```text
PROTAGONIST > STRUCTURAL > MICRO-SIGNAL > ATMOSPHERE
```

At most two high-priority movements run simultaneously.

## 4. Temporal mix

Historical KODEX heuristic:

```text
70% slow
20% medium
10% fast
```

Use this as a rhythm principle, not a required measured distribution.

Fast motion should be brief and consequential. Permanent rapid motion is prohibited.

## 5. Lifecycle mapping

```yaml
DORMANT:
  amplitude: minimal
  purpose: latent presence

AWARE:
  amplitude: responsive
  purpose: acknowledge user presence

ENGAGED:
  amplitude: interaction-dependent
  purpose: expose consequence

OPEN:
  amplitude: decisive transition
  purpose: reveal accessible path or information

INTEGRATING:
  amplitude: reduced and relational
  purpose: connect memory and sources

RETURNING:
  amplitude: stabilizing
  purpose: ordinary orientation and widening

COMPLETE:
  amplitude: still or low
  purpose: artifact, sources and next action
```

## 6. Existing prototype compatibility

Existing `DORMANT → AWARE → OPEN` prototypes remain valid. New implementations should insert `ENGAGED`, `INTEGRATING` or `RETURNING` only when those functions are actually present.

## 7. Data motion rules

Data controls motion only when conversion is documented.

```yaml
data_motion:
  source_field: event_count
  source_unit: events_per_day
  visual_channel: pulse_frequency
  conversion: clamp(events_per_day / 10, 0.1, 1.0)
  limitation: visual pacing is normalized, not real-time occurrence
```

Forbidden:

- motion speed based on arbitrary “importance”;
- orbit implying a cycle when no cycle is documented;
- waves implying sound or physiology without a signal;
- growth implying accumulation when only category count exists.

## 8. State motion rules

State motion is driven by explicit software or experience state.

Examples:

- a source drawer opening;
- a contradiction becoming visible;
- a selected route bifurcating;
- guided pulse changing visual amplitude;
- Return reducing unresolved motion.

State motion must not be mistaken for measured data.

## 9. Interaction response

Targets:

- pointer/touch response begins perceptibly within approximately 100 ms when technically feasible;
- response uses damping rather than direct jitter;
- interaction remains functional under reduced motion when possible;
- touch does not require hover;
- actions produce visible state and memory consequences.

## 10. Transition behavior

Transitions should preserve continuity:

- carry one visual relation into the next node;
- avoid hard cuts unless rupture is meaningful;
- keep controls stable;
- avoid transition sequences longer than the content warrants;
- allow skip/reduced-motion behavior;
- never trap the user in an unskippable ritual animation.

## 11. Heart motion

Allowed modes:

### Natural breath

No imposed expansion/contraction timing. Visual field remains gently responsive or still.

### Guided pulse

Synthetic, declared timing. Label:

```text
GUIDED / NOT MEASURED
```

### Tap pulse

Approximate tempo derived from user taps. Label:

```text
USER INPUT / NOT MEDICAL
```

### Sensor pulse

Unavailable until real device integration, consent, signal quality and failure behavior exist.

## 12. Reduced motion

`prefers-reduced-motion` must:

- freeze or simplify continuous distortion;
- disable camera absorption and large parallax;
- remove persistent glitch;
- preserve state changes through opacity, cut or short transition;
- preserve all content and controls;
- provide an intentionally composed still state.

Motion-off mode should go further and remove nonessential animated response.

## 13. Performance adaptation

When frame performance is insufficient:

1. reduce DPR;
2. reduce particles and noise;
3. reduce feedback passes;
4. lower raymarch steps;
5. lower blur and post-processing;
6. switch to Canvas/SVG fallback;
7. switch to static fallback.

Never remove the source, question, legend or path controls to preserve a visual effect.

## 14. Loop standards

A loop intended as an asset must declare:

- total duration;
- frame rate;
- seamless-state method;
- alpha support;
- export format;
- reduced-motion still;
- whether the loop is atmosphere or information.

For transparent delivery prefer:

- PNG sequence;
- APNG;
- WebM alpha;
- ProRes 4444.

Standard MP4/H.264 is a preview format without alpha.

## 15. Sound coupling

Audio-reactive motion must expose the source:

```text
MIC
AUTHORED AUDIO
SYNTHETIC FALLBACK
NONE
```

Low/mid/high bands may control parameters, but the mapping must be documented. Audio energy does not automatically represent emotion, consciousness or biological state.

## 16. Motion QA

- protagonist remains recognizable after extended viewing;
- no visible loop seam when seamless loop is claimed;
- no loader-like orbit unless it represents loading;
- no unexpected flashing;
- Open transition remains legible and brief;
- reduced-motion mode appears designed;
- hidden scenes stop rendering;
- resources are disposed on unmount;
- mobile frame budget is tested on representative hardware;
- motion without meaning is removed or marked atmosphere.
