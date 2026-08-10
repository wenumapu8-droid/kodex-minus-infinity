export class KodexAccessibilityManager {
  readonly reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  readonly highContrast = matchMedia('(prefers-contrast: more)');
  readonly coarsePointer = matchMedia('(pointer: coarse)');

  apply(root: HTMLElement = document.documentElement): void {
    root.dataset.kdxReducedMotion = String(this.reducedMotion.matches);
    root.dataset.kdxHighContrast = String(this.highContrast.matches);
    root.dataset.kdxCoarsePointer = String(this.coarsePointer.matches);
  }

  bindKeyboard(options: {
    next(): void;
    previous(): void;
    openIndex(): void;
    closeOverlay(): void;
    toggleSound(): void;
  }): () => void {
    const onKey = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return;
      const target = event.target as HTMLElement | null;
      if (target?.matches('input, textarea, select, [contenteditable="true"]')) return;

      if (event.key === 'ArrowRight') options.next();
      if (event.key === 'ArrowLeft') options.previous();
      if (event.key.toLowerCase() === 'i') options.openIndex();
      if (event.key === 'Escape') options.closeOverlay();
      if (event.key.toLowerCase() === 's') options.toggleSound();
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }
}
