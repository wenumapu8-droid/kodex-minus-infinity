export function mountQuietFrames(root = document) {
  const frames = root.querySelectorAll('[data-kdx-quiet-frame]:not([data-kdx-mounted])');

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.setAttribute('data-kdx-entered', '');
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.35 });

  for (const frame of frames) {
    frame.setAttribute('data-kdx-mounted', '');
    observer.observe(frame);
  }

  return () => observer.disconnect();
}
