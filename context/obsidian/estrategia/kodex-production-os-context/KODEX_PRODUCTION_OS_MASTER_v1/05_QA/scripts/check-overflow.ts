export function checkOverflow() {
  const root = document.documentElement;
  const result = {
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    scrollWidth: root.scrollWidth,
    scrollHeight: root.scrollHeight,
    horizontalOverflow: root.scrollWidth > window.innerWidth + 1,
    verticalOverflow: root.scrollHeight > window.innerHeight + 1,
  };

  (window as typeof window & { __KODEX_OVERFLOW__?: unknown }).__KODEX_OVERFLOW__ = result;
  return result;
}
