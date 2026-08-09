export function mountFlowField(canvas, { particles = 360, seed = 42 } = {}) {
  if (!canvas?.getContext) return () => {};
  const context = canvas.getContext("2d");
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let frame = 0;
  let width = 0;
  let height = 0;
  let state = seed >>> 0;
  const random = () => ((state = (state * 1664525 + 1013904223) >>> 0) / 4294967296);
  const points = Array.from({ length: reduceMotion ? Math.min(90, particles) : particles }, () => ({ x: random(), y: random(), speed: .35 + random() * .75 }));
  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(devicePixelRatio || 1, 2);
    width = Math.max(1, rect.width); height = Math.max(1, rect.height);
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  const draw = (time = 0) => {
    context.fillStyle = "rgba(4, 3, 8, .075)";
    context.fillRect(0, 0, width, height);
    for (const point of points) {
      const x = point.x * width; const y = point.y * height;
      const angle = Math.sin(x * .008 + time * .00016) * 3 + Math.cos(y * .007 - time * .00011) * 2;
      point.x = (point.x + Math.cos(angle) * point.speed / width + 1) % 1;
      point.y = (point.y + Math.sin(angle) * point.speed / height + 1) % 1;
      context.fillStyle = `hsla(${267 + Math.sin(angle) * 25}, 92%, 72%, .68)`;
      context.fillRect(point.x * width, point.y * height, 1.25, 1.25);
    }
    if (!reduceMotion) frame = requestAnimationFrame(draw);
  };
  resize();
  context.fillStyle = "rgb(4,3,8)"; context.fillRect(0, 0, width, height);
  draw();
  addEventListener("resize", resize);
  return () => { cancelAnimationFrame(frame); removeEventListener("resize", resize); };
}
