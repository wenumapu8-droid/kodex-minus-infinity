# QA CHECKLIST — QUIET FRAMES

## Visual

- [ ] Perceived empty space is 60–75%.
- [ ] One focal image or symbol.
- [ ] One geometry family.
- [ ] One accent maximum.
- [ ] Microcopy is short and readable.
- [ ] The frame does not resemble a dashboard.
- [ ] No decorative telemetry.

## Desktop

- [ ] 1440×900.
- [ ] 1920×1080.
- [ ] Asymmetry feels intentional.
- [ ] Rail does not compete with the chamber.
- [ ] No accidental scroll.

## Mobile

- [ ] 390×844.
- [ ] 412×915.
- [ ] 430×932.
- [ ] `scrollWidth === innerWidth`.
- [ ] Navigation inside safe-area.
- [ ] Image <= 44dvh.
- [ ] No elements cut on the right.
- [ ] Rail becomes horizontal.

## Accessibility

- [ ] Correct alt text.
- [ ] Focus visible.
- [ ] Reduced motion.
- [ ] Text contrast AA.
- [ ] Semantic section.
- [ ] No image-only critical information.

## Performance

- [ ] Lazy loading.
- [ ] No WebGL.
- [ ] CSS-only motion.
- [ ] Observer teardown.
- [ ] No layout recalculation every frame.
