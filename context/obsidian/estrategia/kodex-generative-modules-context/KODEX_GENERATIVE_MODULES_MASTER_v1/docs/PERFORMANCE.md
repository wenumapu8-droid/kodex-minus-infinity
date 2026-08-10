# Performance

## Full
- DPR 1.75
- 60 FPS target
- particle scale 1.0

## Balanced
- DPR 1.25
- 30 FPS target
- particle scale 0.62

## Low power
- DPR 1.0
- 24 FPS target
- particle scale 0.34

## Rules

- Only one hero module should animate at full size.
- Stop hidden scenes.
- Destroy listeners on scene exit.
- Do not update DOM every frame.
- Prefer Canvas 2D for quiet frames, typography and micrographics.
- Escalate to WebGL only for effects that genuinely need it.
