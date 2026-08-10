"""
KODEX Impossible Forms Vol. 1
Compact procedural source reference.

This module exposes the point-generating equations used by the pack's twelve
families. It intentionally separates geometry from rendering so the same data
can be sent to Pillow, Matplotlib, Blender, Three.js, WebGL or a shader pipeline.
"""
from __future__ import annotations
import math
from dataclasses import dataclass
import numpy as np

TAU = math.tau

@dataclass(frozen=True)
class Preset:
    id: str
    kind: str
    accent: str
    secondary: str

def rotate_x(p: np.ndarray, angle: float) -> np.ndarray:
    c, s = math.cos(angle), math.sin(angle)
    q = p.copy()
    y, z = q[:, 1].copy(), q[:, 2].copy()
    q[:, 1], q[:, 2] = y*c-z*s, y*s+z*c
    return q

def rotate_y(p: np.ndarray, angle: float) -> np.ndarray:
    c, s = math.cos(angle), math.sin(angle)
    q = p.copy()
    x, z = q[:, 0].copy(), q[:, 2].copy()
    q[:, 0], q[:, 2] = x*c+z*s, -x*s+z*c
    return q

def cube_edges() -> list[tuple[np.ndarray, np.ndarray]]:
    v = [np.array([x, y, z], float) for x in (-1, 1)
         for y in (-1, 1) for z in (-1, 1)]
    return [(a, b) for i, a in enumerate(v) for j, b in enumerate(v)
            if j > i and np.sum(a != b) == 1]

def transmutation_cube(t: float, strands: int = 5) -> list[np.ndarray]:
    curves: list[np.ndarray] = []
    for edge_index, (a, b) in enumerate(cube_edges()):
        tangent = b-a
        axis1 = np.array([tangent[1], -tangent[0], 0.0])
        if np.linalg.norm(axis1) < 0.1:
            axis1 = np.array([1.0, 0.0, 0.0])
        axis1 /= np.linalg.norm(axis1)
        axis2 = np.cross(tangent, axis1)
        axis2 /= np.linalg.norm(axis2)
        for strand in range(strands):
            u = np.linspace(0.0, 1.0, 80)
            taper = np.sin(np.pi*u)
            phase = strand/strands*TAU + edge_index*0.3
            p = a[None, :]*(1-u[:, None]) + b[None, :]*u[:, None]
            p += axis1[None, :]*(np.cos(u*TAU*2.2+t*1.2+phase)*0.06*taper)[:, None]
            p += axis2[None, :]*(np.sin(u*TAU*2.2-t+phase)*0.06*taper)[:, None]
            curves.append(rotate_x(rotate_y(p, t*0.72), 0.55+0.13*math.sin(t)))
    return curves

def mobius_weave(t: float, bands: int = 18) -> list[np.ndarray]:
    curves = []
    for band in range(bands):
        u = np.linspace(0.0, TAU, 160)
        v = (band/(bands-1)-0.5)*0.65
        p = np.c_[
            (1+v*np.cos(u/2))*np.cos(u),
            (1+v*np.cos(u/2))*np.sin(u),
            v*np.sin(u/2),
        ]
        curves.append(rotate_x(rotate_y(p, t*0.54), 0.62))
    return curves

def torus_knot_reactor(t: float, filaments: int = 28, p: int = 2, q: int = 5) -> list[np.ndarray]:
    curves = []
    for i in range(filaments):
        u = np.linspace(0.0, TAU, 180)
        offset = (i/(filaments-1)-0.5)*0.25
        radius = 0.82+0.22*np.cos(q*u+offset*6)
        pts = np.c_[
            (radius+offset*np.cos(q*u))*np.cos(p*u),
            (radius+offset*np.cos(q*u))*np.sin(p*u),
            0.22*np.sin(q*u)+offset*np.sin(q*u),
        ]
        curves.append(rotate_x(rotate_y(pts, t*0.6), 0.52))
    return curves

def chrysalis_spiral(t: float, strands: int = 48) -> list[np.ndarray]:
    curves, u = [], np.linspace(-1.0, 1.0, 130)
    for j in range(strands):
        phase = j/strands*TAU
        taper = (1-np.abs(u))**0.62
        width = 0.46*taper*(0.68+0.32*np.sin(phase*3+t*0.5)**2)
        theta = phase+1.85*u+0.7*np.sin(t+u*2.1)
        pts = np.c_[
            0.42*np.sin((u+1)*np.pi*1.1+t*0.42)+0.12*np.sin(u*np.pi*4.5+t*0.9)+width*np.cos(theta),
            u*1.15,
            0.2*np.sin(u*np.pi*2.7-t*0.75)+width*np.sin(theta),
        ]
        curves.append(rotate_x(rotate_y(pts, t*0.68), 0.52))
    return curves

def serpent_lattice(t: float, ribs: int = 18) -> list[np.ndarray]:
    curves, u = [], np.linspace(-1.2, 1.2, 140)
    for side in (-1, 1):
        center = np.c_[
            0.38*np.sin(u*2.2+t*0.65+side*1.2),
            u,
            0.38*np.cos(u*2.2+t*0.65+side*1.2),
        ]
        for rib in range(ribs):
            phase = rib/ribs*TAU
            radius = 0.16+0.025*np.sin(u*5-t+side)
            curves.append(center+np.c_[np.cos(phase)*radius, np.zeros_like(u), np.sin(phase)*radius])
    return curves

def orbital_cocoon(t: float, latitudes: int = 20, longitudes: int = 14) -> list[np.ndarray]:
    curves = []
    for j in range(latitudes):
        latitude = (j/(latitudes-1)-0.5)*math.pi
        u = np.linspace(0.0, TAU, 150)
        radius = np.cos(latitude)*(1+0.07*np.sin(u*5+t*1.2+j*0.3))
        curves.append(np.c_[radius*np.cos(u), np.sin(latitude)*np.ones_like(u), radius*np.sin(u)])
    for j in range(longitudes):
        u = np.linspace(-math.pi/2, math.pi/2, 130)
        longitude = j/longitudes*TAU+t*0.08
        r = np.cos(u)
        curves.append(np.c_[r*np.cos(longitude), np.sin(u), r*np.sin(longitude)])
    return curves

def archive_vortex(t: float, gates: int = 26) -> list[np.ndarray]:
    curves = []
    for depth in range(gates):
        z = -1.8+depth/(gates-1)*3.4
        scale = 0.12+depth/(gates-1)*1.1
        sides = 6+(depth % 5)
        a = np.linspace(0.0, TAU, sides+1)+t*0.18*(1 if depth % 2 else -1)+depth*0.14
        warp = 1+0.12*np.sin(a*3+t+depth)
        curves.append(np.c_[np.cos(a)*scale*warp, np.sin(a)*scale*warp, z+0.07*np.sin(a*4+t)])
    return curves

GENERATORS = {
    "transmutation-cube": transmutation_cube,
    "mobius-weave": mobius_weave,
    "torus-knot-reactor": torus_knot_reactor,
    "chrysalis-spiral": chrysalis_spiral,
    "serpent-lattice": serpent_lattice,
    "orbital-cocoon": orbital_cocoon,
    "archive-vortex": archive_vortex,
}
