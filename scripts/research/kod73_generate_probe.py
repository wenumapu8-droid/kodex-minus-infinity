#!/usr/bin/env python3
"""Generate a rights-safe synthetic image for the KOD-73 SHARP smoke proof.

This image exists only to prove that the external research pipeline can produce a
3DGS PLY. It is not KODEX canon and is not a substitute for Ocín artwork.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter


def radial_orb(size: int = 1024) -> Image.Image:
    image = Image.new("RGB", (size, size), (7, 8, 10))
    px = image.load()

    cx = size * 0.50
    cy = size * 0.47
    radius = size * 0.30

    # Simple shaded orb with an intentionally asymmetric highlight and depth cue.
    light_x = cx - radius * 0.45
    light_y = cy - radius * 0.55

    for y in range(size):
        for x in range(size):
            dx = (x - cx) / radius
            dy = (y - cy) / radius
            rr = dx * dx + dy * dy
            if rr <= 1.0:
                z = math.sqrt(max(0.0, 1.0 - rr))
                nx, ny, nz = dx, dy, z
                lx = (light_x - x) / radius
                ly = (light_y - y) / radius
                lz = 1.4
                norm = math.sqrt(lx * lx + ly * ly + lz * lz)
                lx, ly, lz = lx / norm, ly / norm, lz / norm
                diffuse = max(0.0, nx * lx + ny * ly + nz * lz)
                rim = (1.0 - z) ** 2
                r = int(18 + 45 * diffuse + 20 * rim)
                g = int(25 + 170 * diffuse + 45 * rim)
                b = int(32 + 115 * diffuse + 80 * rim)
                px[x, y] = (min(r, 255), min(g, 255), min(b, 255))

    draw = ImageDraw.Draw(image, "RGBA")

    # Perspective floor lines create additional monocular depth signals.
    horizon = int(size * 0.74)
    vanishing = (int(size * 0.50), int(size * 0.57))
    for i in range(-8, 9):
        bottom_x = int(size * (0.5 + i * 0.09))
        draw.line([vanishing, (bottom_x, size)], fill=(80, 130, 100, 70), width=2)
    for j in range(1, 8):
        t = j / 8
        y = int(horizon + (size - horizon) * (t**1.8))
        draw.line([(0, y), (size, y)], fill=(80, 130, 100, 55), width=2)

    # A few foreground occluders force the model to reason about layering.
    draw.ellipse(
        [int(size * 0.15), int(size * 0.68), int(size * 0.34), int(size * 0.87)],
        fill=(12, 20, 18, 255),
        outline=(95, 210, 145, 120),
        width=3,
    )
    draw.ellipse(
        [int(size * 0.72), int(size * 0.62), int(size * 0.90), int(size * 0.82)],
        fill=(10, 16, 18, 255),
        outline=(80, 170, 210, 110),
        width=3,
    )

    glow = Image.new("RGBA", image.size, (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse(
        [int(cx - radius * 1.05), int(cy - radius * 1.05), int(cx + radius * 1.05), int(cy + radius * 1.05)],
        outline=(80, 255, 150, 65),
        width=18,
    )
    glow = glow.filter(ImageFilter.GaussianBlur(radius=18))
    return Image.alpha_composite(image.convert("RGBA"), glow).convert("RGB")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", type=Path, required=True)
    args = parser.parse_args()

    args.output.parent.mkdir(parents=True, exist_ok=True)
    image = radial_orb()
    image.save(args.output, format="PNG", optimize=True)

    payload = args.output.read_bytes()
    record = {
        "status": "SYNTHETIC_TEST_INPUT",
        "purpose": "KOD-73 SHARP mechanical smoke proof only",
        "width": image.width,
        "height": image.height,
        "mode": image.mode,
        "bytes": len(payload),
        "sha256": hashlib.sha256(payload).hexdigest(),
    }
    print(json.dumps(record, indent=2))


if __name__ == "__main__":
    main()
