"use client";

/**
 * The single, shared 3D world behind every page.
 *
 * One fixed WebGL canvas holds a set of glass panels, a luminous thread, a
 * glowing core, one 3D object per service and a particle field. Each story chapter
 * is a "state" (a full layout of those objects plus a camera pose). Scroll
 * position maps to a continuous value `t` between states, with holds while a
 * chapter is on screen, and everything is interpolated from that one number.
 *
 * If WebGL is unavailable the component renders nothing and the CSS
 * background (violet light on plum) carries the page on its own.
 */

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { LOGO_CENTER, LOGO_PATH } from "@/lib/logo";

type Props = {
  /** When set, the scene shows a single service object (used on service pages). */
  detailIndex?: number;
  /** When set, the scene holds one story layout instead of following scroll (used on inner pages). */
  fixedState?: number;
};

const PANELS = 18;
const THREAD_CTRL = 9;
const THREAD_SAMPLES = 180;
const STATES = 7; // 0 opening · 1 scattered · 2 aligned · 3 approach · 4 services · 5 process · 6 closing

/* ------------------------------------------------------------------ utils */

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (v: number) => {
  const x = clamp(v);
  return x * x * (3 - 2 * x);
};
const lerp = (a: number, b: number, f: number) => a + (b - a) * f;
const damp = (current: number, target: number, lambda: number, dt: number) =>
  lerp(current, target, 1 - Math.exp(-lambda * dt));

function glowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d")!;
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, "rgba(255,255,255,1)");
  grd.addColorStop(0.25, "rgba(255,255,255,0.55)");
  grd.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grd;
  g.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** Abstract interface sketches drawn on some panels: "digital elements". */
function uiTexture(kind: number) {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 170;
  const g = c.getContext("2d")!;
  const bar = (x: number, y: number, w: number, h: number, a: number) => {
    g.fillStyle = `rgba(232,245,253,${a})`;
    g.beginPath();
    g.roundRect(x, y, w, h, h / 2);
    g.fill();
  };
  if (kind === 0) {
    bar(22, 26, 120, 12, 0.85);
    bar(22, 54, 200, 7, 0.4);
    bar(22, 70, 180, 7, 0.4);
    bar(22, 86, 150, 7, 0.4);
    g.fillStyle = "rgba(39,159,229,0.85)";
    g.beginPath();
    g.roundRect(22, 118, 84, 26, 13);
    g.fill();
  } else if (kind === 1) {
    // rising columns — an abstract "growth" mark, no data implied
    const hs = [28, 44, 40, 64, 78, 104];
    hs.forEach((h, i) => bar(26 + i * 36, 146 - h, 20, h, 0.35 + i * 0.1));
    g.strokeStyle = "rgba(39,159,229,0.9)";
    g.lineWidth = 3;
    g.beginPath();
    hs.forEach((h, i) => (i ? g.lineTo(36 + i * 36, 132 - h) : g.moveTo(36, 132 - h)));
    g.stroke();
  } else {
    g.strokeStyle = "rgba(232,245,253,0.7)";
    g.lineWidth = 3;
    g.beginPath();
    g.arc(62, 82, 38, 0, Math.PI * 2);
    g.stroke();
    g.fillStyle = "rgba(39,159,229,0.7)";
    g.beginPath();
    g.arc(62, 82, 14, 0, Math.PI * 2);
    g.fill();
    bar(120, 52, 110, 10, 0.8);
    bar(120, 76, 96, 7, 0.4);
    bar(120, 92, 80, 7, 0.4);
    bar(120, 108, 100, 7, 0.4);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function roundedPanelGeometry(w: number, h: number, r: number, depth: number) {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  const geo = new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: false, curveSegments: 5 });
  geo.translate(0, 0, -depth / 2);
  return geo;
}

/* --------------------------------------------------------------- states */

type State = {
  pos: THREE.Vector3[];
  rot: THREE.Vector3[];
  scale: number[];
  panelOpacity: number;
  thread: THREE.Vector3[];
  reveal: number;
  core: THREE.Vector3;
  coreScale: number;
  nodes: THREE.Vector3[]; // two satellite orbs used in the approach chapter
  nodeScale: number;
  emblem: number; // 0–1 presence of the 3D logo at the core
  cam: THREE.Vector3;
  look: THREE.Vector3;
};

type Layout = { lx: number; portrait: boolean };

function buildStates({ lx, portrait }: Layout): State[] {
  const r = mulberry32(11);
  const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
  const states: State[] = [];
  const zoom = portrait ? 1.45 : 1;

  const blank = (): State => ({
    pos: [],
    rot: [],
    scale: [],
    panelOpacity: 1,
    thread: [],
    reveal: 1,
    core: v(0, 0, 0),
    coreScale: 1,
    nodes: [v(0, 0, 0), v(0, 0, 0)],
    nodeScale: 0,
    emblem: 0,
    cam: v(0, 0, 10 * zoom),
    look: v(0, 0, 0),
  });

  // 0 · Opening — a calm constellation beside the headline
  {
    const s = blank();
    const c = portrait ? v(0, 4.6, -4.5) : v(3.25 * lx, 0.1, -0.4);
    for (let i = 0; i < PANELS; i++) {
      const k = i + 0.5;
      const phi = Math.acos(1 - (2 * k) / PANELS);
      const theta = Math.PI * (1 + Math.sqrt(5)) * k;
      const rad = 2.7 + r() * 0.6;
      const p = v(Math.cos(theta) * Math.sin(phi) * rad, Math.cos(phi) * rad * 0.85, Math.sin(theta) * Math.sin(phi) * rad * 0.6);
      s.pos.push(p.add(c));
      s.rot.push(v((r() - 0.5) * 0.5, Math.atan2(p.x - c.x, 6) * 0.6 + (r() - 0.5) * 0.4, (r() - 0.5) * 0.3));
      s.scale.push(0.5 + r() * 0.4);
    }
    for (let k = 0; k < THREAD_CTRL; k++) {
      const u = k / (THREAD_CTRL - 1);
      const a = u * Math.PI * 2.4 + 0.6;
      s.thread.push(v(Math.cos(a) * 3.3, (u - 0.5) * 3.4, Math.sin(a) * 2).add(c));
    }
    s.reveal = 0.62;
    s.core.copy(c);
    s.coreScale = 1;
    s.emblem = 1;
    s.nodes = [c.clone(), c.clone()];
    s.cam.set(0, 0, 10 * zoom);
    s.look.set(0, 0, 0);
    states.push(s);
  }

  // 1 · Scattered — disconnected pieces drifting apart
  {
    const s = blank();
    for (let i = 0; i < PANELS; i++) {
      let p = v((r() - 0.5) * 17 * Math.max(lx, 0.6), (r() - 0.5) * 9.5, -8 + r() * 9.5);
      if (Math.abs(p.x) < 3 && Math.abs(p.y) < 1.8 && p.z > -4) p = p.add(v(0, 0, -5));
      s.pos.push(p);
      s.rot.push(v((r() - 0.5) * 2.2, (r() - 0.5) * 2.6, (r() - 0.5) * 1.8));
      s.scale.push(0.55 + r() * 0.5);
    }
    for (let k = 0; k < THREAD_CTRL; k++) s.thread.push(v((r() - 0.5) * 14, (r() - 0.5) * 8, -6 + r() * 4));
    s.reveal = 0;
    s.core.set(0, 0, -6);
    s.coreScale = 0.35;
    s.nodes = [s.core.clone(), s.core.clone()];
    s.cam.set(0, 0.6, 13 * zoom);
    s.look.set(0, 0, -2);
    states.push(s);
  }

  // 2 · Aligned — the pieces close into a ring around the message
  {
    const s = blank();
    const rx = portrait ? 2.4 : 5.2 * Math.max(lx, 0.8);
    const ry = portrait ? 4.2 : 2.9;
    for (let i = 0; i < PANELS; i++) {
      const a = (i / PANELS) * Math.PI * 2 + Math.PI / 2;
      s.pos.push(v(Math.cos(a) * rx, Math.sin(a) * ry, -1.5 + Math.sin(a * 2) * 0.3));
      s.rot.push(v(0, -Math.cos(a) * 0.35, 0));
      s.scale.push(0.72);
    }
    for (let k = 0; k < THREAD_CTRL; k++) {
      const a = (k / (THREAD_CTRL - 1)) * Math.PI * 2 + Math.PI / 2;
      s.thread.push(v(Math.cos(a) * rx, Math.sin(a) * ry, -1.6));
    }
    s.reveal = 1;
    s.core.set(0, 0, -3.5);
    s.coreScale = 0.7;
    s.nodes = [s.core.clone(), s.core.clone()];
    s.cam.set(0.6, 0, 10.5 * zoom);
    s.look.set(0, 0, -1);
    states.push(s);
  }

  // 3 · Approach — three connected clusters: strategy, creative, performance
  {
    const s = blank();
    const cx = portrait ? [-1.55, 0, 1.55] : [-3.6 * lx, 0, 3.6 * lx];
    const cy = portrait ? 3.2 : 1.05;
    const centers = cx.map((x, i) => v(x, cy + (i === 1 ? 0.25 : 0), 0));
    for (let i = 0; i < PANELS; i++) {
      const g = i % 3;
      const j = Math.floor(i / 3) - 2.5;
      const c = centers[g];
      s.pos.push(v(c.x + j * 0.09, c.y + j * 0.07, c.z - 0.6 - j * 0.28));
      s.rot.push(v(-0.08, (g - 1) * -0.35 + j * 0.1, j * 0.04));
      s.scale.push(portrait ? 0.4 : 0.62);
    }
    s.thread = [];
    for (let k = 0; k < THREAD_CTRL; k++) {
      const u = k / (THREAD_CTRL - 1);
      const x = lerp(cx[0] - 2.4, cx[2] + 2.4, u);
      s.thread.push(v(x, cy + Math.sin(u * Math.PI * 2) * 0.35, 0.35));
    }
    s.reveal = 1;
    s.core.copy(centers[1]).add(v(0, 0, 0.4));
    s.coreScale = 0.75;
    s.nodes = [centers[0].clone().add(v(0, 0, 0.4)), centers[2].clone().add(v(0, 0, 0.4))];
    s.nodeScale = 0.75;
    s.cam.set(0, 0.8, 11 * zoom);
    s.look.set(0, 0.6, 0);
    states.push(s);
  }

  // 4 · Services — panels become a quiet backdrop; service objects take the stage
  {
    const s = blank();
    for (let i = 0; i < PANELS; i++) {
      const col = i % 6;
      const row = Math.floor(i / 6);
      s.pos.push(v((col - 2.5) * 2.9 * Math.max(lx, 0.55), (row - 1) * 2.1 + 0.6, -10));
      s.rot.push(v(0, 0, 0));
      s.scale.push(1.35);
    }
    for (let k = 0; k < THREAD_CTRL; k++) {
      const u = k / (THREAD_CTRL - 1);
      const x = (u - 0.5) * (portrait ? 6 : 13 * lx);
      s.thread.push(v(x, (portrait ? 3 : 1.15) - 0.5 * Math.pow((u - 0.5) * 2, 2), -1.2));
    }
    s.panelOpacity = 0.28;
    s.reveal = 1;
    s.core.set(0, 0.8, -5);
    s.coreScale = 0.5;
    s.nodes = [s.core.clone(), s.core.clone()];
    s.cam.set(0, 0.3, 10 * zoom);
    s.look.set(0, 0.3, 0);
    states.push(s);
  }

  // 5 · Outcome — an upward path, step by step
  {
    const s = blank();
    const x0 = portrait ? -1.6 : 0.6 * lx;
    const x1 = portrait ? 1.6 : 5.6 * lx;
    const y0 = portrait ? -4.2 : -3;
    const y1 = portrait ? 4.2 : 2.4;
    for (let i = 0; i < PANELS; i++) {
      const u = i / (PANELS - 1);
      s.pos.push(v(lerp(x0, x1, u) + Math.sin(u * Math.PI) * 0.7, lerp(y0, y1, Math.pow(u, 1.15)), lerp(-1.2, 1.2, u)));
      s.rot.push(v(-1.05, 0.35 - u * 0.5, 0));
      s.scale.push(portrait ? 0.5 : 0.68);
    }
    for (let k = 0; k < THREAD_CTRL; k++) {
      const u = k / (THREAD_CTRL - 1);
      s.thread.push(v(lerp(x0, x1, u) + Math.sin(u * Math.PI) * 0.7, lerp(y0, y1, Math.pow(u, 1.15)) + 0.22, lerp(-1.2, 1.2, u)));
    }
    s.reveal = 1;
    s.core.set(x1 + 0.2, y1 + 0.55, 1.4);
    s.coreScale = 1.15;
    s.emblem = 0.5;
    s.nodes = [s.core.clone(), s.core.clone()];
    s.cam.set(portrait ? 0 : -1.2, -0.6, 11 * zoom);
    s.look.set(portrait ? 0 : 1.2, 0.5, 0);
    states.push(s);
  }

  // 6 · Closing — a calm, connected system
  {
    const s = blank();
    const R = portrait ? 3 : 5.6 * Math.max(lx, 0.8);
    const tilt = 1.15;
    const c = portrait ? v(0, -3.2, -4) : v(0.6, -1.4, -5);
    for (let i = 0; i < PANELS; i++) {
      const a = (i / PANELS) * Math.PI * 2;
      const p = v(Math.cos(a) * R, 0, Math.sin(a) * R).applyAxisAngle(new THREE.Vector3(1, 0, 0), -tilt + Math.PI / 2);
      s.pos.push(p.add(c));
      s.rot.push(v(0, -a + Math.PI / 2, 0));
      s.scale.push(0.55);
    }
    for (let k = 0; k < THREAD_CTRL; k++) {
      const a = (k / (THREAD_CTRL - 1)) * Math.PI * 2;
      s.thread.push(v(Math.cos(a) * R, 0, Math.sin(a) * R).applyAxisAngle(new THREE.Vector3(1, 0, 0), -tilt + Math.PI / 2).add(c));
    }
    s.reveal = 1;
    s.core.copy(c);
    s.coreScale = 1.3;
    s.nodes = [c.clone(), c.clone()];
    s.cam.set(0, 0.2, 10 * zoom);
    s.look.set(0, 0, -1);
    states.push(s);
  }

  return states;
}

/* ------------------------------------------------------- service objects */

function buildServiceObjects(glass: THREE.Material, edge: THREE.LineBasicMaterial, accent: THREE.Material) {
  const withEdges = (geo: THREE.BufferGeometry, mat: THREE.Material = glass) => {
    const m = new THREE.Mesh(geo, mat);
    m.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo, 25), edge));
    return m;
  };
  const objs: THREE.Group[] = [];

  // Google Ads — a target: precision at the moment of intent
  {
    const g = new THREE.Group();
    g.add(withEdges(new THREE.TorusGeometry(0.72, 0.05, 12, 64)));
    g.add(withEdges(new THREE.TorusGeometry(0.46, 0.05, 12, 48)));
    g.add(new THREE.Mesh(new THREE.SphereGeometry(0.16, 24, 16), accent));
    objs.push(g);
  }
  // Marketing Automation — a loop that keeps itself moving
  {
    const g = new THREE.Group();
    const m = new THREE.Mesh(new THREE.TorusKnotGeometry(0.46, 0.11, 160, 16, 2, 3), glass);
    g.add(m);
    const wire = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.TorusKnotGeometry(0.46, 0.11, 60, 4, 2, 3)), edge);
    g.add(wire);
    objs.push(g);
  }
  // 3D Websites — a dimensional object inside a frame
  {
    const g = new THREE.Group();
    const outer = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(0.82, 0)), edge);
    g.add(outer);
    const cube = withEdges(new THREE.BoxGeometry(0.62, 0.62, 0.62));
    cube.rotation.set(0.6, 0.7, 0);
    g.add(cube);
    objs.push(g);
  }
  // Landing Pages — one page, one clear action
  {
    const g = new THREE.Group();
    g.add(withEdges(roundedPanelGeometry(0.95, 1.35, 0.08, 0.05)));
    const lineMat = new THREE.MeshBasicMaterial({ color: 0xe8f5fd, transparent: true, opacity: 0.55 });
    [0.42, 0.24, 0.1].forEach((y, i) => {
      const l = new THREE.Mesh(new THREE.PlaneGeometry(i ? 0.62 : 0.5, i ? 0.05 : 0.09), lineMat);
      l.position.set(i ? 0 : -0.06, y, 0.035);
      g.add(l);
    });
    const btn = new THREE.Mesh(new THREE.CapsuleGeometry(0.08, 0.28, 4, 12), accent);
    btn.rotation.z = Math.PI / 2;
    btn.position.set(-0.08, -0.32, 0.06);
    g.add(btn);
    objs.push(g);
  }
  // Creative Design — a faceted prism catching the light
  {
    const g = new THREE.Group();
    g.add(withEdges(new THREE.OctahedronGeometry(0.66, 0)));
    const moon = new THREE.Mesh(new THREE.SphereGeometry(0.1, 20, 12), accent);
    moon.position.set(0.85, 0.35, 0);
    moon.name = "moon";
    g.add(moon);
    objs.push(g);
  }
  // Website Development & Maintenance — stacked browser windows
  {
    const g = new THREE.Group();
    [0, 1, 2].forEach((k) => {
      const w = withEdges(roundedPanelGeometry(1.15, 0.78, 0.07, 0.04));
      w.position.set(-0.18 + k * 0.18, 0.14 - k * 0.14, -0.25 + k * 0.25);
      g.add(w);
    });
    [0, 1, 2].forEach((k) => {
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.035, 12, 8), accent);
      dot.position.set(0.0 + k * 0.09, 0.2, 0.29);
      g.add(dot);
    });
    objs.push(g);
  }
  // SEO & Google Business — a magnifying lens over a location point
  {
    const g = new THREE.Group();
    const lens = withEdges(new THREE.TorusGeometry(0.5, 0.07, 14, 64));
    lens.position.set(-0.12, 0.12, 0);
    g.add(lens);
    const handle = withEdges(new THREE.CylinderGeometry(0.06, 0.06, 0.55, 16));
    handle.position.set(0.4, -0.42, 0);
    handle.rotation.z = Math.PI / 4;
    g.add(handle);
    const pin = new THREE.Mesh(new THREE.SphereGeometry(0.14, 20, 14), accent);
    pin.position.set(-0.12, 0.18, 0);
    g.add(pin);
    const tip = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.2, 16), accent);
    tip.rotation.x = Math.PI;
    tip.position.set(-0.12, 0.0, 0);
    g.add(tip);
    objs.push(g);
  }
  // Social Media Marketing — a hub with orbiting connections
  {
    const g = new THREE.Group();
    g.add(withEdges(new THREE.IcosahedronGeometry(0.36, 1)));
    const orbit = new THREE.Group();
    orbit.name = "orbiters";
    [0, 1, 2].forEach((k) => {
      const a = (k / 3) * Math.PI * 2;
      const node = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 10), accent);
      node.position.set(Math.cos(a) * 0.78, Math.sin(a) * 0.25, Math.sin(a) * 0.78);
      orbit.add(node);
    });
    g.add(orbit);
    g.add(new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.TorusGeometry(0.78, 0.004, 4, 64)), edge));
    g.children[g.children.length - 1].rotation.x = Math.PI / 2;
    objs.push(g);
  }
  return objs;
}

/* ------------------------------------------------------------ component */

export default function Scene({ detailIndex, fixedState }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: window.devicePixelRatio < 2, alpha: true, powerPreference: "high-performance" });
    } catch {
      document.documentElement.dataset.webgl = "off";
      return;
    }

    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    let reduced = reduceQuery.matches;
    const isDetail = typeof detailIndex === "number";

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x200519, 0.05);
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 80);

    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;

    scene.add(new THREE.AmbientLight(0xa46aa8, 0.55));
    const key = new THREE.DirectionalLight(0xffeadb, 0.9);
    key.position.set(3, 5, 6);
    scene.add(key);
    // Brand lighting: plum fill, brand-blue key, warm terracotta rim
    const plum = new THREE.PointLight(0xb03ca6, 60, 40, 2);
    plum.position.set(-6, -2, 4);
    scene.add(plum);
    const blue = new THREE.PointLight(0x279fe5, 45, 30, 2);
    blue.position.set(6, 4, 4);
    scene.add(blue);
    const terracotta = new THREE.PointLight(0xe0703f, 45, 26, 2);
    terracotta.position.set(1, -4, 5);
    scene.add(terracotta);

    const root = new THREE.Group();
    scene.add(root);

    // Materials
    const glass = new THREE.MeshPhysicalMaterial({
      color: 0x5d0755,
      emissive: 0x2a0424,
      metalness: 0.15,
      roughness: 0.16,
      clearcoat: 1,
      clearcoatRoughness: 0.18,
      envMapIntensity: 0.85,
      transparent: true,
      opacity: 0.34,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const edge = new THREE.LineBasicMaterial({ color: 0x8fcaf0, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending, depthWrite: false });
    const accent = new THREE.MeshBasicMaterial({ color: 0x279fe5, toneMapped: false });
    const glow = glowTexture();
    const uiTex = [uiTexture(0), uiTexture(1), uiTexture(2)];
    const uiMats = uiTex.map(
      (map) => new THREE.MeshBasicMaterial({ map, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }),
    );

    // Panels
    const panelGeo = roundedPanelGeometry(1.5, 1, 0.1, 0.035);
    const panelEdges = new THREE.EdgesGeometry(panelGeo, 30);
    const uiGeo = new THREE.PlaneGeometry(1.34, 0.89);
    const panels: THREE.Group[] = [];
    const stagger: number[] = [];
    const bobSeed: number[] = [];
    const rnd = mulberry32(3);
    for (let i = 0; i < PANELS; i++) {
      const g = new THREE.Group();
      g.add(new THREE.Mesh(panelGeo, glass));
      g.add(new THREE.LineSegments(panelEdges, edge));
      if (i % 3 !== 2) {
        const ui = new THREE.Mesh(uiGeo, uiMats[i % 3 === 0 ? (i / 3) % 3 : (i + 1) % 3]);
        ui.position.z = 0.02;
        g.add(ui);
      }
      root.add(g);
      panels.push(g);
      stagger.push(rnd());
      bobSeed.push(rnd() * Math.PI * 2);
    }

    // Core + satellite nodes
    const orbMat = new THREE.MeshBasicMaterial({ color: 0xe8f5fd, fog: false, toneMapped: false });
    const makeOrb = () => {
      const g = new THREE.Group();
      g.add(new THREE.Mesh(new THREE.SphereGeometry(0.2, 24, 16), orbMat));
      const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: glow, color: 0x279fe5, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false, fog: false }));
      halo.scale.setScalar(2.2);
      g.add(halo);
      root.add(g);
      return g;
    };
    const core = makeOrb();
    const coreSphere = core.children[0];

    // The ev logo as a glass emblem at the heart of the world
    const emblemGroup = new THREE.Group();
    const emblemMat = new THREE.MeshPhysicalMaterial({
      // Brand logo blue (#039EFD) — the emblem keeps the logo's own colour.
      color: 0x039efd,
      emissive: 0x039efd,
      emissiveIntensity: 0.35,
      toneMapped: false,
      fog: false,
      metalness: 0.35,
      roughness: 0.16,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
      envMapIntensity: 0.45,
      side: THREE.DoubleSide,
    });
    {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg"><path d="${LOGO_PATH}" fill="#000" fill-rule="evenodd"/></svg>`;
      const shapes = new SVGLoader().parse(svg).paths.flatMap((p) => SVGLoader.createShapes(p));
      const geo = new THREE.ExtrudeGeometry(shapes, { depth: 46, bevelEnabled: true, bevelThickness: 8, bevelSize: 5, bevelSegments: 2, curveSegments: 10 });
      const k = 2.5 / LOGO_CENTER.size;
      geo.translate(-LOGO_CENTER.x, -LOGO_CENTER.y, -23);
      geo.scale(k, -k, k);
      geo.computeVertexNormals();
      const mesh = new THREE.Mesh(geo, emblemMat);
      emblemGroup.add(mesh);
      emblemGroup.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo, 40), edge));
    }
    emblemGroup.scale.setScalar(0.0001);
    root.add(emblemGroup);
    const nodes = [makeOrb(), makeOrb()];

    // Luminous thread
    const ctrl = Array.from({ length: THREAD_CTRL }, () => new THREE.Vector3());
    const curve = new THREE.CatmullRomCurve3(ctrl, false, "centripetal");
    const threadPos = new Float32Array(THREAD_SAMPLES * 3);
    const threadGeo = new THREE.BufferGeometry();
    threadGeo.setAttribute("position", new THREE.BufferAttribute(threadPos, 3));
    const thread = new THREE.Line(threadGeo, new THREE.LineBasicMaterial({ color: 0xa0d3f1, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false }));
    thread.frustumCulled = false;
    root.add(thread);
    const beads = new THREE.Points(
      threadGeo,
      new THREE.PointsMaterial({ map: glow, color: 0x7cc4f0, size: 0.16, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false }),
    );
    beads.frustumCulled = false;
    root.add(beads);
    const pulse = new THREE.Sprite(new THREE.SpriteMaterial({ map: glow, color: 0xe8f5fd, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false }));
    pulse.scale.setScalar(0.7);
    root.add(pulse);

    // Service objects
    const services = buildServiceObjects(glass, edge, accent);
    services.forEach((g) => {
      g.scale.setScalar(0.0001);
      root.add(g);
    });
    const svcHover = services.map(() => 0);
    let activeService = -1;

    // Particles
    const small = window.innerWidth < 768;
    const PCOUNT = small ? 500 : 1100;
    const pPos = new Float32Array(PCOUNT * 3);
    const pCol = new Float32Array(PCOUNT * 3);
    const cA = new THREE.Color(0x8fcaf0);
    const cB = new THREE.Color(0x279fe5);
    const cC = new THREE.Color(0xeeebe4);
    const pr = mulberry32(21);
    for (let i = 0; i < PCOUNT; i++) {
      pPos[i * 3] = (pr() - 0.5) * 30;
      pPos[i * 3 + 1] = (pr() - 0.5) * 18;
      pPos[i * 3 + 2] = -14 + pr() * 18;
      const roll = pr();
      const c = roll < 0.7 ? cA : roll < 0.88 ? cC : cB;
      pCol.set([c.r, c.g, c.b], i * 3);
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute("color", new THREE.BufferAttribute(pCol, 3));
    const particles = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({ map: glow, size: 0.07, vertexColors: true, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true }),
    );
    scene.add(particles);

    /* ---------------------------------------------------- layout + scroll */

    let layout: Layout = { lx: 1, portrait: false };
    let states = buildStates(layout);
    let svcLayout: { p: THREE.Vector3; s: number }[] = [];

    type Seg = { y0: number; y1: number; t0: number; t1: number };
    let segs: Seg[] = [];

    function measureChapters() {
      const els = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));
      const vh = window.innerHeight;
      const list: Seg[] = [];
      let prevEnd: { y: number; t: number } | null = null;
      els.forEach((el, i) => {
        const top = el.getBoundingClientRect().top + window.scrollY;
        const h = el.offsetHeight;
        const s0 = Number(el.dataset.stateStart ?? 0);
        const s1 = Number(el.dataset.stateEnd ?? s0);
        const holdStart = i === 0 ? 0 : top - vh * 0.15;
        const holdEnd = Math.max(holdStart, top + h - vh * 0.85);
        if (prevEnd) list.push({ y0: prevEnd.y, y1: holdStart, t0: prevEnd.t, t1: s0 });
        list.push({ y0: holdStart, y1: holdEnd, t0: s0, t1: s1 });
        prevEnd = { y: holdEnd, t: s1 };
      });
      segs = list;
    }

    function scrollT() {
      if (isDetail) return 4;
      if (typeof fixedState === "number") return fixedState;
      if (!segs.length) return 0;
      const y = window.scrollY;
      if (y <= segs[0].y0) return segs[0].t0;
      for (const s of segs) {
        if (y <= s.y1) {
          const f = s.y1 > s.y0 ? (y - s.y0) / (s.y1 - s.y0) : 1;
          return lerp(s.t0, s.t1, smooth(f));
        }
      }
      return segs[segs.length - 1].t1;
    }

    function resize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const aspect = w / h;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, w < 768 ? 1.5 : 1.75));
      renderer.setSize(w, h, false);
      camera.aspect = aspect;
      camera.fov = aspect < 0.9 ? 50 : 42;
      camera.updateProjectionMatrix();
      layout = { lx: aspect < 0.9 ? 0.42 : clamp(aspect / 1.75, 0.62, 1.05), portrait: aspect < 0.9 };
      states = buildStates(layout);
      const { lx, portrait } = layout;
      if (isDetail) {
        svcLayout = services.map(() => ({ p: portrait ? new THREE.Vector3(0, 2.6, -1) : new THREE.Vector3(3.3 * lx, 0.2, 1.2), s: portrait ? 1.25 : 1.9 }));
      } else {
        svcLayout = services.map((_, i) => {
          const mid = (services.length - 1) / 2;
          if (portrait) {
            const a = (i - mid) * 0.4;
            return { p: new THREE.Vector3(Math.sin(a) * 2.7, 3.2 + (i % 2 ? 0.35 : -0.1), Math.cos(a) * 1 - 1.2), s: 0.42 };
          }
          return { p: new THREE.Vector3((i - mid) * 1.62 * lx, 1.05 + (i % 2 ? 0.22 : -0.05), 0.3 - Math.abs(i - mid) * 0.18), s: 0.68 };
        });
      }
      measureChapters();
      needsRender = true;
    }

    /* ------------------------------------------------------- interaction */

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    let scrollVel = 0;
    let lastScroll = window.scrollY;
    let needsRender = true;

    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onScroll = () => {
      const y = window.scrollY;
      scrollVel += (y - lastScroll) * 0.0009;
      lastScroll = y;
      needsRender = true;
    };
    const onService = (e: Event) => {
      activeService = (e as CustomEvent<number>).detail;
    };
    const onReduce = () => {
      reduced = reduceQuery.matches;
    };

    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);
    window.addEventListener("ev:service", onService);
    reduceQuery.addEventListener?.("change", onReduce);
    const ro = new ResizeObserver(() => measureChapters());
    ro.observe(document.body);

    resize();

    /* --------------------------------------------------------- animation */

    let tShown = scrollT();
    let raf = 0;
    let last = performance.now();
    let elapsed = 0;
    let shown = false;
    const tmpA = new THREE.Vector3();
    const tmpB = new THREE.Vector3();
    const camPos = new THREE.Vector3();
    const camLook = new THREE.Vector3();
    const euler = new THREE.Euler();

    function mixVec(out: THREE.Vector3, a: THREE.Vector3, b: THREE.Vector3, f: number) {
      return out.copy(a).lerp(b, f);
    }

    function frame(now: number) {
      raf = requestAnimationFrame(frame);
      if (document.hidden) return;
      const dt = clamp((now - last) / 1000, 0, 0.05);
      last = now;
      const motion = !reduced;
      if (motion) elapsed += dt;

      // Scroll → story position
      const target = scrollT();
      tShown = motion ? damp(tShown, target, 5, dt) : Math.round(target);
      const t = clamp(tShown, 0, STATES - 1);
      const i0 = Math.min(STATES - 2, Math.floor(t));
      const f = t - i0;
      const A = states[i0];
      const B = states[i0 + 1];

      // Pointer / touch parallax
      const finePointer = hoverQuery.matches && motion;
      pointer.x = damp(pointer.x, finePointer ? pointer.tx : 0, 3, dt);
      pointer.y = damp(pointer.y, finePointer ? pointer.ty : 0, 3, dt);
      scrollVel = motion ? damp(scrollVel, 0, 2.5, dt) : 0;
      const sway = clamp(scrollVel, -0.25, 0.25);

      // Panels
      for (let i = 0; i < PANELS; i++) {
        const lf = smooth((f - stagger[i] * 0.3) / 0.7);
        const p = panels[i];
        mixVec(p.position, A.pos[i], B.pos[i], lf);
        tmpA.copy(A.rot[i]).lerp(B.rot[i], lf);
        if (motion) {
          const bob = Math.sin(elapsed * 0.45 + bobSeed[i]);
          p.position.y += bob * 0.06;
          tmpA.x += bob * 0.025;
        }
        p.rotation.set(tmpA.x, tmpA.y, tmpA.z);
        p.scale.setScalar(lerp(A.scale[i], B.scale[i], lf));
      }
      glass.opacity = 0.34 * lerp(A.panelOpacity, B.panelOpacity, f);
      edge.opacity = 0.6 * lerp(A.panelOpacity, B.panelOpacity, f) + 0.1;

      // Core + nodes
      mixVec(core.position, A.core, B.core, f);
      core.scale.setScalar(lerp(A.coreScale, B.coreScale, f) * (motion ? 1 + Math.sin(elapsed * 1.1) * 0.04 : 1));
      nodes.forEach((n, k) => {
        mixVec(n.position, A.nodes[k], B.nodes[k], f);
        n.scale.setScalar(Math.max(0.0001, lerp(A.nodeScale, B.nodeScale, smooth(f))));
      });

      // Emblem
      const em = lerp(A.emblem, B.emblem, smooth(f));
      coreSphere.scale.setScalar(Math.max(0.0001, 1 - em));
      emblemGroup.visible = em > 0.01;
      emblemGroup.position.copy(core.position).add(tmpA.set(0, 0, 0.35));
      emblemGroup.scale.setScalar(Math.max(0.0001, em * (layout.portrait ? 0.7 : 1) * (0.6 + 0.4 * lerp(A.coreScale, B.coreScale, f))));
      emblemGroup.rotation.set(
        -pointer.y * 0.18 + (motion ? Math.sin(elapsed * 0.4) * 0.05 : 0),
        pointer.x * 0.32 + (motion ? Math.sin(elapsed * 0.3) * 0.12 : 0) - 0.12,
        0,
      );

      // Thread
      for (let k = 0; k < THREAD_CTRL; k++) mixVec(ctrl[k], A.thread[k], B.thread[k], smooth(f));
      for (let s = 0; s < THREAD_SAMPLES; s++) {
        curve.getPoint(s / (THREAD_SAMPLES - 1), tmpB);
        threadPos[s * 3] = tmpB.x;
        threadPos[s * 3 + 1] = tmpB.y;
        threadPos[s * 3 + 2] = tmpB.z;
      }
      threadGeo.attributes.position.needsUpdate = true;
      const reveal = lerp(A.reveal, B.reveal, smooth(f));
      const visible = Math.floor(THREAD_SAMPLES * reveal);
      threadGeo.setDrawRange(0, Math.max(0, visible));
      threadGeo.computeBoundingSphere();
      if (visible > 2 && motion) {
        const u = clamp(((elapsed * 0.08) % 1) * reveal);
        curve.getPoint(u, pulse.position);
        (pulse.material as THREE.SpriteMaterial).opacity = 0.9 * Math.sin(Math.PI * (u / Math.max(reveal, 0.001)));
      } else {
        (pulse.material as THREE.SpriteMaterial).opacity = 0;
      }

      // Service objects: present around the services state (or always on detail pages)
      const svcWeight = isDetail ? 1 : smooth(1 - Math.abs(t - 4) * 1.4);
      services.forEach((g, k) => {
        const lay = svcLayout[k];
        const isOn = isDetail ? k === detailIndex : true;
        svcHover[k] = damp(svcHover[k], activeService === k ? 1 : 0, 6, dt);
        const h = svcHover[k];
        const scale = isOn ? lay.s * svcWeight * (1 + h * 0.18) : 0;
        g.scale.setScalar(Math.max(0.0001, scale));
        g.visible = scale > 0.002;
        g.position.copy(lay.p);
        g.position.y += (1 - svcWeight) * -1.5 + (motion ? Math.sin(elapsed * 0.6 + k) * 0.05 : 0);
        g.position.z += h * 0.8;
        const spin = motion ? Math.sin(elapsed * 0.35 + k * 1.3) * 0.35 : 0;
        g.rotation.set(0.15 + pointer.y * 0.25 * h + (k === 1 ? 0.4 : 0), spin + pointer.x * 0.5 * h + (k === 0 ? 0.3 : 0), 0);
        const moon = g.getObjectByName("moon");
        if (moon && motion) moon.position.set(Math.cos(elapsed * 0.5) * 0.9, 0.3, Math.sin(elapsed * 0.5) * 0.9);
        const orbiters = g.getObjectByName("orbiters");
        if (orbiters && motion) orbiters.rotation.y = elapsed * 0.45;
      });

      // Particles: slow drift, a touch of scroll depth
      particles.rotation.y = t * 0.06 + (motion ? elapsed * 0.004 : 0);
      particles.position.y = t * 0.35;

      // Camera
      mixVec(camPos, A.cam, B.cam, smooth(f));
      mixVec(camLook, A.look, B.look, smooth(f));
      camPos.x += pointer.x * 0.55;
      camPos.y += -pointer.y * 0.35;
      camera.position.copy(camPos);
      camera.lookAt(camLook);
      euler.set(-pointer.y * 0.03, pointer.x * 0.06 + sway * 0.6, sway * 0.12);
      root.rotation.copy(euler);

      const settled = Math.abs(tShown - target) < 0.0005 && Math.abs(pointer.x - pointer.tx) < 0.001;
      if (!motion && settled && !needsRender && shown) return;
      needsRender = false;
      renderer.render(scene, camera);
      if (!shown) {
        shown = true;
        canvas!.dataset.ready = "true";
      }
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      window.removeEventListener("ev:service", onService);
      reduceQuery.removeEventListener?.("change", onReduce);
      ro.disconnect();
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose?.();
        const mat = m.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
        else mat?.dispose?.();
      });
      [glow, envTex, ...uiTex].forEach((tx) => tx.dispose());
      pmrem.dispose();
      renderer.dispose();
    };
  }, [detailIndex, fixedState]);

  return <canvas ref={canvasRef} className="scene-canvas" aria-hidden="true" />;
}
