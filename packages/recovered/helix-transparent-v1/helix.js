(() => {
  "use strict";

  const canvas = document.querySelector("#canvas");
  const ctx = canvas.getContext("2d", { alpha: true });

  // =========================
  // PARÁMETROS PRINCIPALES
  // =========================
  const CONFIG = {
    totalFrames: 240,      // 8 s a 30 fps
    turns: 3.0,            // vueltas verticales
    meridians: 34,         // líneas longitudinales
    parallels: 32,         // líneas horizontales
    verticalSteps: 180,    // suavidad de las curvas
    baseRadius: 0.245,     // radio relativo al ancho
    heightRatio: 0.84,     // altura relativa al canvas
    perspective: 3.8,
    lineAlpha: 0.78,
    mainLineAlpha: 0.96
  };

  let frame = 0;
  let paused = false;
  let darkLine = true;
  let lastTime = performance.now();
  let accumulator = 0;
  const frameDuration = 1000 / 30;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(2, Math.round(rect.width * dpr));
    const height = Math.max(2, Math.round(rect.height * dpr));

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    return {
      width,
      height,
      dpr,
      cx: width / 2,
      cy: height / 2,
      min: Math.min(width, height)
    };
  }

  function radiusProfile(v, phase) {
    // Termina en punta arriba y abajo.
    const envelope = Math.pow(Math.max(0, Math.sin(Math.PI * v)), 0.72);

    // Genera tres "vientres" que se desplazan durante el loop.
    const lobes =
      0.68 +
      0.24 * Math.cos(Math.PI * 4.0 * v - phase) +
      0.08 * Math.cos(Math.PI * 8.0 * v + phase * 2.0);

    // Respiración global, también cíclica.
    const breathing = 1.0 + 0.055 * Math.sin(phase);

    return Math.max(0, envelope * lobes * breathing);
  }

  function pointOnSurface(v, thetaOffset, phase, m) {
    const objectHeight = m.height * CONFIG.heightRatio;
    const radiusMax = m.width * CONFIG.baseRadius;

    const y = (v - 0.5) * objectHeight;
    const radius = radiusMax * radiusProfile(v, phase);

    // Torsión progresiva de la sección.
    const twist =
      Math.PI * 2 * CONFIG.turns * v +
      0.38 * Math.sin(Math.PI * 2 * v + phase) +
      phase * 0.25;

    const theta = thetaOffset + twist;
    let x = radius * Math.cos(theta);
    let z = radius * Math.sin(theta);

    // Rotación orbital leve. Cierra exactamente al completar 2π.
    const orbit = 0.19 * Math.sin(phase);
    const cosO = Math.cos(orbit);
    const sinO = Math.sin(orbit);
    const rotatedX = x * cosO + z * sinO;
    const rotatedZ = -x * sinO + z * cosO;
    x = rotatedX;
    z = rotatedZ;

    // Perspectiva simple.
    const normalizedZ = z / Math.max(1, radiusMax);
    const perspectiveScale =
      CONFIG.perspective / (CONFIG.perspective - normalizedZ);

    return {
      x: m.cx + x * perspectiveScale,
      y: m.cy + y * perspectiveScale,
      z,
      scale: perspectiveScale
    };
  }

  function strokePath(points, width, alpha, m) {
    if (points.length < 2) return;

    const rgb = darkLine ? "8,8,10" : "245,245,240";
    ctx.strokeStyle = `rgba(${rgb},${alpha})`;
    ctx.lineWidth = width * m.dpr;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i += 1) {
      ctx.lineTo(points[i].x, points[i].y);
    }

    ctx.stroke();
  }

  function drawMeridians(phase, m) {
    const paths = [];

    for (let column = 0; column < CONFIG.meridians; column += 1) {
      const thetaOffset =
        (column / CONFIG.meridians) * Math.PI * 2;

      const points = [];
      let averageZ = 0;

      for (let row = 0; row <= CONFIG.verticalSteps; row += 1) {
        const v = row / CONFIG.verticalSteps;
        const p = pointOnSurface(v, thetaOffset, phase, m);
        points.push(p);
        averageZ += p.z;
      }

      paths.push({
        points,
        z: averageZ / points.length,
        major:
          column === 0 ||
          column === Math.floor(CONFIG.meridians / 2)
      });
    }

    // Dibuja primero las líneas traseras.
    paths.sort((a, b) => a.z - b.z);

    for (const path of paths) {
      strokePath(
        path.points,
        path.major ? 2.15 : 0.72,
        path.major ? CONFIG.mainLineAlpha : CONFIG.lineAlpha,
        m
      );
    }
  }

  function drawParallels(phase, m) {
    for (let row = 1; row < CONFIG.parallels; row += 1) {
      const v = row / CONFIG.parallels;
      const points = [];
      const segments = 100;

      for (let column = 0; column <= segments; column += 1) {
        const thetaOffset = (column / segments) * Math.PI * 2;
        points.push(pointOnSurface(v, thetaOffset, phase, m));
      }

      strokePath(points, 0.68, CONFIG.lineAlpha * 0.84, m);
    }
  }

  function render() {
    const m = resize();

    // IMPORTANTE: borra el frame y conserva alfa 0.
    ctx.clearRect(0, 0, m.width, m.height);

    const phase =
      (frame % CONFIG.totalFrames) /
      CONFIG.totalFrames *
      Math.PI * 2;

    drawParallels(phase, m);
    drawMeridians(phase, m);
  }

  function animate(now) {
    const delta = now - lastTime;
    lastTime = now;

    if (!paused) {
      accumulator += delta;

      while (accumulator >= frameDuration) {
        frame = (frame + 1) % CONFIG.totalFrames;
        accumulator -= frameDuration;
      }
    }

    render();
    requestAnimationFrame(animate);
  }

  document.querySelector("#pause").addEventListener("click", (event) => {
    paused = !paused;
    event.currentTarget.textContent = paused ? "RESUME" : "PAUSE";
  });

  document.querySelector("#invert").addEventListener("click", () => {
    darkLine = !darkLine;
    render();
  });

  document.querySelector("#png").addEventListener("click", () => {
    // PNG conserva el canal alfa.
    const link = document.createElement("a");
    link.download = `kodex-helix-alpha-${String(frame).padStart(4, "0")}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  });

  window.addEventListener("resize", render);
  requestAnimationFrame(animate);
})();
