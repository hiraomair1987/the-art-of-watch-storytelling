import * as THREE from "three";

/**
 * The efficiovirtual 3D world: one persistent scene of glass panels, luminous
 * threads, glowing nodes and dust. Every chapter of the homepage story is a
 * different arrangement of the same objects, and the scroll position (the
 * "story" value, 0 → 5) blends between those arrangements.
 *
 * Plain Three.js, no framework: the page only talks to it through the small
 * API returned by createWorld().
 */

export type WorldOptions = {
  canvas: HTMLCanvasElement;
  reducedMotion: boolean;
  coarsePointer: boolean;
  /** Font stack used for the small 3D labels (pass the page's body font). */
  labelFont?: string;
  onContextLost?: () => void;
};

export type World = {
  /** Raw story position: 0 = opening … 5 = closing. Fractions are transitions. */
  setStory(s: number, immediate?: boolean): void;
  /** Highlight one of the five service panels (0–4). */
  setFocus(i: number): void;
  /** Pointer position in −1…1 on both axes (desktop only). */
  setPointer(x: number, y: number): void;
  setReducedMotion(reduced: boolean): void;
  resize(): void;
  dispose(): void;
};

/* ---------------------------------------------------------------- palette */

const C = {
  violet: new THREE.Color("#9f84ff"),
  violetSoft: new THREE.Color("#cdbdff"),
  magenta: new THREE.Color("#e2559f"),
  cream: new THREE.Color("#f5eee6"),
  glass: new THREE.Color("#8f78dc"),
  glassEmissive: new THREE.Color("#2e1650"),
};

/* ---------------------------------------------------------------- helpers */

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const damp = (current: number, target: number, lambda: number, dt: number) =>
  lerp(current, target, 1 - Math.exp(-lambda * dt));

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function roundedRect(w: number, h: number, r: number) {
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
  return s;
}

function glowTexture(inner = "rgba(255,255,255,1)", mid = "rgba(200,180,255,0.35)") {
  const size = 128;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, inner);
  grad.addColorStop(0.25, mid);
  grad.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** A soft diagonal light streak, laid over each panel so it reads as glass. */
function sheenTexture() {
  const w = 256;
  const h = 160;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const g = c.getContext("2d")!;
  const grad = g.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, "rgba(255,255,255,0.0)");
  grad.addColorStop(0.32, "rgba(255,255,255,0.0)");
  grad.addColorStop(0.42, "rgba(255,240,250,0.32)");
  grad.addColorStop(0.5, "rgba(255,255,255,0.06)");
  grad.addColorStop(0.62, "rgba(255,255,255,0.0)");
  grad.addColorStop(1, "rgba(255,255,255,0.08)");
  g.fillStyle = grad;
  g.fillRect(0, 0, w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function labelTexture(text: string, font: string) {
  const w = 512;
  const h = 128;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const g = c.getContext("2d")!;
  g.clearRect(0, 0, w, h);
  g.font = `500 44px ${font}`;
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillStyle = "rgba(245,238,230,0.92)";
  if ("letterSpacing" in g) (g as unknown as { letterSpacing: string }).letterSpacing = "6px";
  g.fillText(text.toUpperCase(), w / 2, h / 2);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/* ------------------------------------------------------------- the states */

// Arrangements the panels move between, in story order.
const OPEN = 0;
const SCATTER = 1;
const ALIGN = 2;
const APPROACH = 3;
const SERVICES = 4;
const OUTCOME = 5;
const CLOSE = 6;
const STATE_COUNT = 7;

/**
 * Story value → arrangement. Each chapter n holds around s = n (±0.2); the
 * stretches in between are transitions. The challenge chapter assembles the
 * scattered panels while the reader is on it.
 */
const KEYS: [number, number][] = [
  [0, OPEN],
  [0.2, OPEN],
  [0.8, SCATTER],
  [1.2, ALIGN],
  [1.8, APPROACH],
  [2.2, APPROACH],
  [2.8, SERVICES],
  [3.2, SERVICES],
  [3.8, OUTCOME],
  [4.2, OUTCOME],
  [4.8, CLOSE],
  [5, CLOSE],
];

function storyToState(s: number) {
  if (s <= KEYS[0][0]) return KEYS[0][1];
  for (let i = 0; i < KEYS.length - 1; i++) {
    const [s0, a] = KEYS[i];
    const [s1, b] = KEYS[i + 1];
    if (s <= s1) return a === b ? a : lerp(a, b, easeInOut((s - s0) / (s1 - s0)));
  }
  return KEYS[KEYS.length - 1][1];
}

type CamKey = { pos: THREE.Vector3; target: THREE.Vector3 };
const CAMERA: CamKey[] = [
  { pos: new THREE.Vector3(0, 0, 9), target: new THREE.Vector3(0, 0, 0) },
  { pos: new THREE.Vector3(0, 0.4, 10.6), target: new THREE.Vector3(0, 0, -1) },
  { pos: new THREE.Vector3(0.5, 0.2, 8.8), target: new THREE.Vector3(0, 0, 0) },
  { pos: new THREE.Vector3(-0.7, 0.5, 8.4), target: new THREE.Vector3(0, 0, 0) },
  { pos: new THREE.Vector3(0, 0.5, 8.2), target: new THREE.Vector3(0, 0.05, -1) },
  { pos: new THREE.Vector3(-1.1, -1.2, 9.6), target: new THREE.Vector3(0, 0.25, 0) },
  { pos: new THREE.Vector3(0, 0.2, 11.2), target: new THREE.Vector3(0, 0, -1) },
];

/** How far the whole world sits to the right of centre, so text on the left stays clear. */
const SHIFT = [2.7, 1.5, 2.3, 2.4, 2.3, 2.5, 0];

const PANEL_COUNT = 15;
const PANEL_W = 1.6;
const PANEL_H = 1.0;

// The three approach nodes: Strategy, Creative, Performance.
const NODES = [new THREE.Vector3(-1.25, 1.3, 0), new THREE.Vector3(1.55, 0.35, -0.5), new THREE.Vector3(-0.25, -1.45, 0.35)];

// The upward path of the outcome chapter.
const PATH_START = new THREE.Vector3(-2.0, -1.95, 0.8);
const PATH_END = new THREE.Vector3(1.8, 2.15, -1.4);

type PanelLayout = { pos: THREE.Vector3; rot: THREE.Vector3; scale: number; opacity: number };

type Panel = {
  group: THREE.Group;
  glass: THREE.Mesh<THREE.ShapeGeometry, THREE.MeshPhysicalMaterial>;
  sheen: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  edge: THREE.LineLoop<THREE.BufferGeometry, THREE.LineBasicMaterial>;
  motif: THREE.LineSegments<THREE.BufferGeometry, THREE.LineBasicMaterial>;
  emblem?: Emblem;
  layouts: PanelLayout[];
  focus: number;
  phase: number;
};

type Emblem = {
  root: THREE.Group;
  materials: { material: THREE.Material & { opacity: number }; base: number }[];
  spin: (root: THREE.Group, dt: number, active: boolean) => void;
};

/* ------------------------------------------------------------------ world */

export function createWorld(opts: WorldOptions): World {
  const { canvas } = opts;
  let reduced = opts.reducedMotion;
  const coarse = opts.coarsePointer;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: window.devicePixelRatio < 2,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x160a1d, 0.055);

  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 80);
  camera.position.copy(CAMERA[0].pos);

  /* lights */
  scene.add(new THREE.AmbientLight(0x7a5a9a, 0.9));
  const keyLight = new THREE.PointLight(C.violet, 55, 0, 2);
  keyLight.position.set(4, 3.5, 5);
  scene.add(keyLight);
  const rimLight = new THREE.PointLight(C.magenta, 22, 0, 2);
  rimLight.position.set(-4, -2.5, 2.5);
  scene.add(rimLight);
  const warm = new THREE.DirectionalLight(0xffe8d6, 0.7);
  warm.position.set(2, 4, 6);
  scene.add(warm);

  const world = new THREE.Group();
  scene.add(world);

  const disposables: { dispose: () => void }[] = [];
  const track = <T extends { dispose: () => void }>(x: T) => {
    disposables.push(x);
    return x;
  };

  const glowTex = track(glowTexture());
  const magentaGlowTex = track(glowTexture("rgba(255,235,245,1)", "rgba(226,85,159,0.4)"));
  const sheenTex = track(sheenTexture());

  /* ------------------------------------------------------------ particles */

  const particleCount = coarse ? 380 : 900;
  const pGeo = track(new THREE.BufferGeometry());
  {
    const rand = mulberry32(7);
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const tint = new THREE.Color();
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (rand() - 0.5) * 26;
      pos[i * 3 + 1] = (rand() - 0.5) * 16;
      pos[i * 3 + 2] = -14 + rand() * 18;
      tint.copy(rand() < 0.12 ? C.magenta : rand() < 0.5 ? C.violetSoft : C.cream);
      col[i * 3] = tint.r;
      col[i * 3 + 1] = tint.g;
      col[i * 3 + 2] = tint.b;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    pGeo.setAttribute("color", new THREE.BufferAttribute(col, 3));
  }
  const pMat = track(
    new THREE.PointsMaterial({
      size: 0.06,
      map: glowTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    }),
  );
  const particles = new THREE.Points(pGeo, pMat);
  scene.add(particles);

  /* ------------------------------------------------------- ambient threads */

  const threadMat = (color: THREE.Color, opacity: number) =>
    track(
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );

  function makeThread(curve: THREE.Curve<THREE.Vector3>, radius: number, color: THREE.Color, opacity: number, segments = 160) {
    const core = new THREE.Mesh(track(new THREE.TubeGeometry(curve, segments, radius, 6, false)), threadMat(color, opacity));
    const halo = new THREE.Mesh(track(new THREE.TubeGeometry(curve, segments, radius * 4, 6, false)), threadMat(color, opacity * 0.18));
    const g = new THREE.Group();
    g.add(halo, core);
    return { group: g, core, halo, base: opacity };
  }

  const ambient = new THREE.Group();
  world.add(ambient);
  const ambientThreads = [
    [new THREE.Vector3(-9, -3, -6), new THREE.Vector3(-3, -1.2, -3), new THREE.Vector3(2, 0.4, -4), new THREE.Vector3(9, 2.6, -7)],
    [new THREE.Vector3(-8, 3.5, -8), new THREE.Vector3(-2, 1.8, -5), new THREE.Vector3(3, 2.6, -6), new THREE.Vector3(10, -1, -9)],
    [new THREE.Vector3(-7, -4.5, -2), new THREE.Vector3(0, -2.6, -2.5), new THREE.Vector3(4, -3.2, -3), new THREE.Vector3(9, -1.5, -5)],
  ].map((pts, i) => {
    const t = makeThread(new THREE.CatmullRomCurve3(pts), 0.01, i === 2 ? C.magenta : C.violetSoft, i === 2 ? 0.28 : 0.4);
    ambient.add(t.group);
    return t;
  });

  /* ---------------------------------------------------------------- core */

  const core = new THREE.Group();
  const coreSphere = new THREE.Mesh(
    track(new THREE.IcosahedronGeometry(0.32, 4)),
    track(new THREE.MeshBasicMaterial({ color: C.cream, transparent: true, fog: false, toneMapped: false })),
  );
  const coreGlow = new THREE.Sprite(
    track(new THREE.SpriteMaterial({ map: magentaGlowTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.85 })),
  );
  coreGlow.scale.setScalar(3.2);
  const coreHalo = new THREE.Sprite(
    track(new THREE.SpriteMaterial({ map: glowTex, color: C.violet, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.35 })),
  );
  coreHalo.scale.setScalar(7);
  core.add(coreHalo, coreGlow, coreSphere);
  world.add(core);

  const CORE_KEYS: { pos: THREE.Vector3; scale: number }[] = [
    { pos: new THREE.Vector3(0, 0, 0), scale: 1 },
    { pos: new THREE.Vector3(0, 0, -1.5), scale: 0.55 },
    { pos: new THREE.Vector3(0, 0, -0.9), scale: 0.6 },
    { pos: new THREE.Vector3(0.1, 0.05, -0.6), scale: 0.0 },
    { pos: new THREE.Vector3(0, 0.05, -1.3), scale: 0.0 },
    { pos: PATH_END.clone().add(new THREE.Vector3(0.15, 0.55, 0)), scale: 0.85 },
    { pos: new THREE.Vector3(2.4, 0.3, -1.6), scale: 1.15 },
  ];

  /* --------------------------------------------------------- approach nodes */

  const labelFont = opts.labelFont || "system-ui, sans-serif";
  const nodeNames = ["Strategy", "Creative", "Performance"];
  const nodeGroup = new THREE.Group();
  world.add(nodeGroup);
  const nodes = NODES.map((p, i) => {
    const g = new THREE.Group();
    g.position.copy(p);
    const orb = new THREE.Mesh(
      track(new THREE.IcosahedronGeometry(0.2, 3)),
      track(
        new THREE.MeshPhysicalMaterial({
          color: i === 1 ? C.magenta : C.violetSoft,
          emissive: i === 1 ? C.magenta : C.violet,
          emissiveIntensity: 0.9,
          roughness: 0.2,
          clearcoat: 1,
          transparent: true,
        }),
      ),
    );
    const glow = new THREE.Sprite(
      track(new THREE.SpriteMaterial({ map: i === 1 ? magentaGlowTex : glowTex, color: i === 1 ? 0xffffff : C.violet, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending })),
    );
    glow.scale.setScalar(1.8);
    const ring = new THREE.Mesh(
      track(new THREE.TorusGeometry(0.36, 0.006, 6, 80)),
      track(new THREE.MeshBasicMaterial({ color: C.violetSoft, transparent: true, opacity: 0.7, depthWrite: false, blending: THREE.AdditiveBlending })),
    );
    const labelMat = track(
      new THREE.SpriteMaterial({ map: track(labelTexture(nodeNames[i], labelFont)), transparent: true, depthWrite: false, opacity: 0.9 }),
    );
    const label = new THREE.Sprite(labelMat);
    label.scale.set(1.6, 0.4, 1);
    label.position.set(0, -0.56, 0.1);
    g.add(glow, ring, orb, label);
    nodeGroup.add(g);
    return { group: g, orb, glow, ring, label };
  });

  const approachCurve = new THREE.CatmullRomCurve3(
    [
      NODES[0],
      new THREE.Vector3(0.4, 1.35, -0.1),
      NODES[1],
      new THREE.Vector3(1.05, -1.0, 0.1),
      NODES[2],
      new THREE.Vector3(-1.45, -0.1, 0.25),
    ],
    true,
    "centripetal",
  );
  const approachThread = makeThread(approachCurve, 0.016, C.violetSoft, 0.85, 240);
  world.add(approachThread.group);

  /* ------------------------------------------------------------ outcome path */

  const pathPoints: THREE.Vector3[] = [];
  for (let k = 0; k < PANEL_COUNT; k++) {
    const f = k / (PANEL_COUNT - 1);
    const p = new THREE.Vector3().lerpVectors(PATH_START, PATH_END, f);
    p.x += Math.sin(f * Math.PI * 2) * 0.35;
    p.z += Math.sin(f * Math.PI) * 0.4;
    pathPoints.push(p);
  }
  const outcomeCurve = new THREE.CatmullRomCurve3(
    [PATH_START.clone().add(new THREE.Vector3(-0.6, -0.5, 0.2)), ...pathPoints.map((p) => p.clone().add(new THREE.Vector3(0, 0.12, 0.05))), CORE_KEYS[OUTCOME].pos.clone()],
    false,
    "centripetal",
  );
  const outcomeThread = makeThread(outcomeCurve, 0.02, C.magenta, 0.9, 260);
  world.add(outcomeThread.group);

  /* ----------------------------------------------------------------- panels */

  const panelShape = roundedRect(PANEL_W, PANEL_H, 0.09);
  const panelGeo = track(new THREE.ShapeGeometry(panelShape, 6));
  const edgeGeo = track(new THREE.BufferGeometry().setFromPoints(panelShape.getPoints(8).map((p) => new THREE.Vector3(p.x, p.y, 0.002))));
  const sheenGeo = track(new THREE.PlaneGeometry(PANEL_W * 0.98, PANEL_H * 0.96));

  // Little interface sketches drawn on the panels — the "digital elements".
  const motifGeos = [
    // Heading + text lines
    [[-0.6, 0.28, 0.1, 0.28], [-0.6, 0.12, 0.45, 0.12], [-0.6, 0.0, 0.3, 0.0], [-0.6, -0.12, 0.4, -0.12], [-0.6, -0.3, -0.2, -0.3]],
    // Bar chart
    [[-0.5, -0.32, -0.5, -0.1], [-0.3, -0.32, -0.3, 0.02], [-0.1, -0.32, -0.1, -0.05], [0.1, -0.32, 0.1, 0.15], [0.3, -0.32, 0.3, 0.3], [-0.62, -0.32, 0.45, -0.32]],
    // Image frame + caption
    [[-0.6, -0.05, -0.05, -0.05], [-0.05, -0.05, -0.05, 0.32], [-0.05, 0.32, -0.6, 0.32], [-0.6, 0.32, -0.6, -0.05], [0.1, 0.25, 0.6, 0.25], [0.1, 0.12, 0.5, 0.12], [-0.6, -0.25, 0.3, -0.25]],
  ].map((segs) => {
    const pts: THREE.Vector3[] = [];
    for (const [x1, y1, x2, y2] of segs) pts.push(new THREE.Vector3(x1, y1, 0.004), new THREE.Vector3(x2, y2, 0.004));
    return track(new THREE.BufferGeometry().setFromPoints(pts));
  });

  const rand = mulberry32(42);
  const panels: Panel[] = [];
  for (let i = 0; i < PANEL_COUNT; i++) {
    const group = new THREE.Group();
    const glass = new THREE.Mesh(
      panelGeo,
      track(
        new THREE.MeshPhysicalMaterial({
          color: C.glass,
          emissive: C.glassEmissive,
          emissiveIntensity: 0.6,
          roughness: 0.22,
          metalness: 0.05,
          clearcoat: 1,
          clearcoatRoughness: 0.15,
          iridescence: 0.6,
          iridescenceIOR: 1.35,
          transparent: true,
          opacity: 0.2,
          side: THREE.DoubleSide,
          depthWrite: false,
        }),
      ),
    );
    const sheen = new THREE.Mesh(
      sheenGeo,
      track(new THREE.MeshBasicMaterial({ map: sheenTex, transparent: true, opacity: 0.55, depthWrite: false, blending: THREE.AdditiveBlending })),
    );
    sheen.position.z = 0.003;
    const edge = new THREE.LineLoop(
      edgeGeo,
      track(new THREE.LineBasicMaterial({ color: C.violetSoft, transparent: true, opacity: 0.6, depthWrite: false, blending: THREE.AdditiveBlending })),
    );
    const motif = new THREE.LineSegments(
      motifGeos[i % motifGeos.length],
      track(new THREE.LineBasicMaterial({ color: C.cream, transparent: true, opacity: 0.22, depthWrite: false, blending: THREE.AdditiveBlending })),
    );
    group.add(glass, sheen, edge, motif);
    world.add(group);
    const panel: Panel = { group, glass, sheen, edge, motif, layouts: [], focus: 0, phase: rand() * Math.PI * 2 };
    if (i < 5) {
      panel.emblem = makeEmblem(i);
      panel.emblem.root.position.z = 0.22;
      group.add(panel.emblem.root);
      motif.visible = false;
    }
    panels.push(panel);
  }

  function makeEmblem(kind: number): Emblem {
    const root = new THREE.Group();
    const materials: Emblem["materials"] = [];
    const line = (color: THREE.Color, opacity: number) => {
      const m = track(new THREE.LineBasicMaterial({ color, transparent: true, opacity, depthWrite: false, blending: THREE.AdditiveBlending }));
      materials.push({ material: m, base: opacity });
      return m;
    };
    const basic = (color: THREE.Color, opacity = 1) => {
      const m = track(new THREE.MeshBasicMaterial({ color, transparent: true, opacity, depthWrite: false }));
      materials.push({ material: m, base: opacity });
      return m;
    };
    const circle = (r: number) => {
      const pts: THREE.Vector3[] = [];
      for (let k = 0; k <= 64; k++) {
        const a = (k / 64) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0));
      }
      return track(new THREE.BufferGeometry().setFromPoints(pts));
    };
    let spin: Emblem["spin"] = () => {};

    if (kind === 0) {
      // Google Ads — a target: intent, found.
      [0.36, 0.24, 0.12].forEach((r, k) => {
        const l = new THREE.Line(circle(r), line(k === 2 ? C.magenta : C.violetSoft, 0.85));
        l.position.z = k * 0.04;
        root.add(l);
      });
      const dot = new THREE.Mesh(track(new THREE.SphereGeometry(0.045, 16, 16)), basic(C.magenta));
      dot.position.z = 0.1;
      const arrow = new THREE.Line(
        track(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0.62, 0.42, 0.25), new THREE.Vector3(0.05, 0.04, 0.1)])),
        line(C.cream, 0.9),
      );
      root.add(dot, arrow);
      spin = (r, dt, active) => {
        r.rotation.z += dt * (active ? 0.25 : 0.06);
      };
    } else if (kind === 1) {
      // Marketing automation — a loop that keeps running.
      const torus = new THREE.Mesh(track(new THREE.TorusGeometry(0.3, 0.008, 8, 96)), basic(C.violetSoft, 0.9));
      root.add(torus);
      const beads = new THREE.Group();
      for (let k = 0; k < 3; k++) {
        const a = (k / 3) * Math.PI * 2;
        const b = new THREE.Mesh(track(new THREE.SphereGeometry(0.055, 16, 16)), basic(k === 0 ? C.magenta : C.cream));
        b.position.set(Math.cos(a) * 0.3, Math.sin(a) * 0.3, 0);
        beads.add(b);
      }
      root.add(beads);
      spin = (_r, dt, active) => {
        beads.rotation.z -= dt * (active ? 0.9 : 0.2);
      };
    } else if (kind === 2) {
      // 3D websites — a dimensional object.
      const cube = new THREE.LineSegments(track(new THREE.EdgesGeometry(new THREE.BoxGeometry(0.46, 0.46, 0.46))), line(C.violetSoft, 0.95));
      const ico = new THREE.LineSegments(track(new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(0.16, 0))), line(C.magenta, 0.9));
      root.add(cube, ico);
      root.rotation.set(0.5, 0.6, 0);
      spin = (r, dt, active) => {
        r.rotation.y += dt * (active ? 0.5 : 0.1);
      };
    } else if (kind === 3) {
      // Landing pages — layered pages with one clear action.
      const pageGeo = track(new THREE.BufferGeometry().setFromPoints(roundedRect(0.5, 0.64, 0.04).getPoints(6).map((p) => new THREE.Vector3(p.x, p.y, 0))));
      for (let k = 0; k < 3; k++) {
        const l = new THREE.LineLoop(pageGeo, line(C.violetSoft, 0.35 + k * 0.28));
        l.position.set(-0.12 + k * 0.08, 0.08 - k * 0.06, k * 0.06);
        root.add(l);
      }
      const cta = new THREE.Mesh(track(new THREE.PlaneGeometry(0.26, 0.07)), basic(C.magenta, 0.95));
      cta.position.set(0.04, -0.12, 0.13);
      const lines = new THREE.LineSegments(
        track(
          new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(-0.12, 0.2, 0.13),
            new THREE.Vector3(0.22, 0.2, 0.13),
            new THREE.Vector3(-0.12, 0.09, 0.13),
            new THREE.Vector3(0.14, 0.09, 0.13),
          ]),
        ),
        line(C.cream, 0.85),
      );
      root.add(cta, lines);
      spin = (r, dt) => {
        r.rotation.y = Math.sin(performance.now() * 0.0004) * 0.25;
        void dt;
      };
    } else {
      // Creative design — an organic, iridescent form.
      const knotMat = track(
        new THREE.MeshPhysicalMaterial({
          color: C.violetSoft,
          emissive: C.magenta,
          emissiveIntensity: 0.25,
          roughness: 0.25,
          metalness: 0.3,
          iridescence: 1,
          iridescenceIOR: 1.6,
          clearcoat: 1,
          transparent: true,
        }),
      );
      materials.push({ material: knotMat, base: 1 });
      const knot = new THREE.Mesh(track(new THREE.TorusKnotGeometry(0.2, 0.055, 160, 16, 2, 3)), knotMat);
      root.add(knot);
      spin = (r, dt, active) => {
        knot.rotation.x += dt * (active ? 0.4 : 0.08);
        knot.rotation.y += dt * (active ? 0.25 : 0.05);
        void r;
      };
    }
    return { root, materials, spin };
  }

  /* ---------------------------------------------------------------- layouts */

  let aspect = 1;
  let layoutClass: "wide" | "medium" | "narrow" = "wide";

  function buildLayouts() {
    const r = mulberry32(1234);
    const narrow = layoutClass === "narrow";
    const spreadX = narrow ? 2.6 : 4.8;
    const spreadY = narrow ? 4.2 : 3.4;

    panels.forEach((p, i) => {
      const L: PanelLayout[] = new Array(STATE_COUNT);

      // OPEN: a loose orbit of glass around the glowing core.
      const a = (i / PANEL_COUNT) * Math.PI * 2 + (r() - 0.5) * 0.3;
      const rad = 1.7 + r() * 0.9;
      const open: PanelLayout = {
        pos: new THREE.Vector3(Math.cos(a) * rad, Math.sin(a) * rad * 0.78, -0.6 + Math.sin(a * 2) * 0.7 - r() * 1.4),
        rot: new THREE.Vector3((r() - 0.5) * 0.5, -Math.cos(a) * 0.45, (r() < 0.3 ? Math.PI / 2 : 0) + (r() - 0.5) * 0.3),
        scale: 0.5 + r() * 0.3,
        opacity: 1,
      };
      L[OPEN] = open;

      // SCATTER: disconnected pieces drifting in every direction.
      L[SCATTER] = {
        pos: new THREE.Vector3((r() - 0.5) * 2 * spreadX, (r() - 0.5) * 2 * spreadY, -5 + r() * 5.5),
        rot: new THREE.Vector3((r() - 0.5) * 2.4, (r() - 0.5) * 2.4, (r() - 0.5) * 2.4),
        scale: 0.45 + r() * 0.4,
        opacity: 0.75,
      };

      // ALIGN: the same pieces, composed into one ordered wall.
      const col = i % 5;
      const row = Math.floor(i / 5);
      const gx = (col - 2) * 1.04;
      const gy = (1 - row) * 0.7;
      const yaw = -0.42;
      L[ALIGN] = {
        pos: new THREE.Vector3(gx * Math.cos(yaw), gy, -gx * Math.sin(yaw) * -1 - 0.2),
        rot: new THREE.Vector3(0, yaw, 0),
        scale: 0.6,
        opacity: 1,
      };

      // APPROACH: five panels fan out behind each of the three stage nodes.
      const node = NODES[row];
      const phi = Math.PI / 2 + (col - 2) * 0.5 + row * 0.9;
      L[APPROACH] = {
        pos: new THREE.Vector3(node.x + Math.cos(phi) * 0.85, node.y + Math.sin(phi) * 0.62, node.z - 0.45 - col * 0.03),
        rot: new THREE.Vector3(0, 0, phi - Math.PI / 2),
        scale: 0.3,
        opacity: 0.9,
      };

      // SERVICES is computed per frame (it follows the focused service).
      L[SERVICES] = { pos: new THREE.Vector3(), rot: new THREE.Vector3(), scale: 1, opacity: 1 };

      // OUTCOME: an ascending path of steps.
      const order = (i * 7) % PANEL_COUNT; // interleave so every panel travels
      const f = order / (PANEL_COUNT - 1);
      L[OUTCOME] = {
        pos: pathPoints[order].clone(),
        rot: new THREE.Vector3(-1.05, -0.35, 0.1),
        scale: 0.36 + f * 0.2,
        opacity: 0.9,
      };

      // CLOSE: everything settles back into a calm, wider orbit.
      L[CLOSE] = {
        pos: new THREE.Vector3(open.pos.x * 1.7, open.pos.y * 1.45, open.pos.z - 1.8),
        rot: open.rot.clone().multiplyScalar(0.6),
        scale: open.scale * 1.05,
        opacity: 0.6,
      };

      p.layouts = L;
    });
  }

  let focusTarget = 0;
  let focusC = 0;

  function servicesLayout(i: number, out: PanelLayout) {
    if (i < 5) {
      // A shallow carousel; the focused service comes forward to the centre.
      const ang = (i - focusC) * 0.62;
      const R = 3.1;
      out.pos.set(Math.sin(ang) * R, 0.1, Math.cos(ang) * R - R);
      out.rot.set(0, ang * 0.9, 0);
      out.scale = 1.1;
      // Fade panels far from the focused one so the carousel stays compact.
      out.opacity = Math.max(0.12, 1 - Math.abs(i - focusC) * 0.4);
    } else {
      const base = panels[i].layouts[OPEN];
      out.pos.set(base.pos.x * 2.4, base.pos.y * 1.8, -6.5 + base.pos.z);
      out.rot.copy(base.rot);
      out.scale = base.scale;
      out.opacity = 0.35;
    }
  }

  /* --------------------------------------------------------------- runtime */

  let storyTarget = 0;
  let story = 0;
  let pointerTX = 0;
  let pointerTY = 0;
  let pointerX = 0;
  let pointerY = 0;
  let shift = SHIFT[0];
  let dirty = true;
  let running = true;
  let raf = 0;
  let last = performance.now();
  let time = 0;

  const tmpA: PanelLayout = { pos: new THREE.Vector3(), rot: new THREE.Vector3(), scale: 1, opacity: 1 };
  const tmpB: PanelLayout = { pos: new THREE.Vector3(), rot: new THREE.Vector3(), scale: 1, opacity: 1 };
  const camPos = new THREE.Vector3();
  const camTarget = new THREE.Vector3();

  function layoutFor(p: Panel, i: number, state: number, out: PanelLayout) {
    if (state === SERVICES) {
      servicesLayout(i, out);
      return out;
    }
    const l = p.layouts[state];
    out.pos.copy(l.pos);
    out.rot.copy(l.rot);
    out.scale = l.scale;
    out.opacity = l.opacity;
    return out;
  }

  /** Weight of a given state at state-value t (1 at the state, 0 one step away). */
  const weight = (t: number, state: number) => clamp01(1 - Math.abs(t - state));

  function update(dt: number) {
    const lambda = reduced ? 1000 : 4.2;
    story = damp(story, storyTarget, lambda, dt);
    if (Math.abs(story - storyTarget) < 0.0005) story = storyTarget;
    focusC = damp(focusC, focusTarget, reduced ? 1000 : 5, dt);
    if (Math.abs(focusC - focusTarget) < 0.001) focusC = focusTarget;

    const motion = reduced ? 0 : 1;
    if (!reduced) time += dt;

    pointerX = damp(pointerX, pointerTX, 3, dt);
    pointerY = damp(pointerY, pointerTY, 3, dt);

    const t = storyToState(story);
    const a = Math.floor(t);
    const b = Math.min(a + 1, STATE_COUNT - 1);
    const f = t - a;

    /* world placement */
    const shiftScale = layoutClass === "wide" ? 1 : layoutClass === "medium" ? 0.55 : 0;
    shift = lerp(SHIFT[a], SHIFT[b], f) * shiftScale;
    world.position.x = shift;
    world.rotation.y = pointerX * 0.06 * motion;
    world.rotation.x = -pointerY * 0.035 * motion;

    /* camera */
    camPos.lerpVectors(CAMERA[a].pos, CAMERA[b].pos, f);
    camTarget.lerpVectors(CAMERA[a].target, CAMERA[b].target, f);
    const distScale = layoutClass === "narrow" ? 1.45 + Math.max(0, 0.75 - aspect) * 0.9 : layoutClass === "medium" ? 1.12 : 1;
    camPos.z *= distScale;
    camPos.x += pointerX * 0.45 * motion;
    camPos.y += -pointerY * 0.3 * motion;
    camera.position.copy(camPos);
    camera.lookAt(camTarget);

    /* panels */
    const dim = layoutClass === "narrow" ? 0.75 : 1;
    const wServices = weight(t, SERVICES);
    panels.forEach((p, i) => {
      layoutFor(p, i, a, tmpA);
      layoutFor(p, i, b, tmpB);
      const g = p.group;
      g.position.lerpVectors(tmpA.pos, tmpB.pos, f);
      g.rotation.set(lerp(tmpA.rot.x, tmpB.rot.x, f), lerp(tmpA.rot.y, tmpB.rot.y, f), lerp(tmpA.rot.z, tmpB.rot.z, f));
      let s = lerp(tmpA.scale, tmpB.scale, f);
      const op = lerp(tmpA.opacity, tmpB.opacity, f) * dim;

      // Gentle idle float — small and slow.
      g.position.y += Math.sin(time * 0.5 + p.phase) * 0.04 * motion;
      g.rotation.z += Math.sin(time * 0.3 + p.phase) * 0.012 * motion;

      // Focus (services chapter only).
      const isFocus = i < 5 && Math.round(focusTarget) === i;
      p.focus = damp(p.focus, isFocus ? 1 : 0, reduced ? 1000 : 6, dt);
      const fw = p.focus * wServices;
      s *= 1 + fw * 0.08;
      g.position.z += fw * 0.35;
      g.scale.setScalar(s);

      p.glass.material.opacity = 0.2 * op * (1 + fw * 0.4);
      p.glass.material.emissiveIntensity = 0.6 + fw * 0.5;
      p.sheen.material.opacity = 0.5 * op;
      p.edge.material.opacity = (0.5 + fw * 0.45) * op;
      p.edge.material.color.copy(C.violetSoft).lerp(C.magenta, fw * 0.55);
      p.motif.material.opacity = 0.22 * op * (1 - wServices * 0.6);

      if (p.emblem) {
        const vis = Math.max(wServices, 0);
        p.emblem.root.visible = vis > 0.01;
        p.emblem.root.scale.setScalar(0.4 + vis * 0.6);
        const strength = (0.45 + p.focus * 0.55) * vis * (layoutClass === "narrow" ? 0.8 : 1);
        p.emblem.materials.forEach((m) => (m.material.opacity = m.base * strength * Math.min(1, op / dim)));
        if (motion) p.emblem.spin(p.emblem.root, dt, isFocus);
        p.motif.visible = vis < 0.5;
      }
    });

    /* core */
    const ca = CORE_KEYS[a];
    const cb = CORE_KEYS[b];
    core.position.lerpVectors(ca.pos, cb.pos, f);
    const coreScale = lerp(ca.scale, cb.scale, f) * (1 + Math.sin(time * 0.8) * 0.03 * motion);
    core.scale.setScalar(Math.max(coreScale, 0.0001));
    core.visible = coreScale > 0.01;
    if (layoutClass === "narrow") {
      (coreHalo.material as THREE.SpriteMaterial).opacity = 0.22;
    } else {
      (coreHalo.material as THREE.SpriteMaterial).opacity = 0.35;
    }

    /* approach nodes + thread */
    const wApproach = weight(t, APPROACH);
    nodeGroup.visible = wApproach > 0.01;
    nodes.forEach((n, i) => {
      const appear = clamp01((story - 1.45 - i * 0.08) / 0.3) * wApproach;
      n.group.scale.setScalar(Math.max(appear, 0.0001));
      n.ring.rotation.z = time * 0.2 + i;
      n.ring.rotation.x = 0.4 + Math.sin(time * 0.4 + i) * 0.1;
      (n.label.material as THREE.SpriteMaterial).opacity = 0.9 * clamp01((story - 1.7) / 0.2) * wApproach * (layoutClass === "narrow" ? 0.8 : 1);
    });
    drawThread(approachThread, clamp01((story - 1.45) / 0.5), wApproach);

    /* outcome thread */
    const wOutcome = weight(t, OUTCOME);
    drawThread(outcomeThread, clamp01((story - 3.45) / 0.65), wOutcome);

    /* ambient threads */
    ambientThreads.forEach((th, i) => {
      const m = th.core.material as THREE.MeshBasicMaterial;
      m.opacity = th.base * (layoutClass === "narrow" ? 0.6 : 1) * (1 - wApproach * 0.4);
      (th.halo.material as THREE.MeshBasicMaterial).opacity = m.opacity * 0.18;
      th.group.position.y = Math.sin(time * 0.15 + i * 2) * 0.12 * motion;
    });

    /* particles */
    particles.rotation.y = time * 0.008;
    particles.position.y = -story * 0.35; // dust drifts past as the story moves
  }

  function drawThread(th: ReturnType<typeof makeThread>, progress: number, visibility: number) {
    const visible = visibility > 0.01 && progress > 0.001;
    th.group.visible = visible;
    if (!visible) return;
    for (const mesh of [th.core, th.halo]) {
      const geo = mesh.geometry as THREE.TubeGeometry;
      const total = geo.index ? geo.index.count : 0;
      const ring = geo.parameters.radialSegments * 6;
      geo.setDrawRange(0, Math.floor((total * progress) / ring) * ring);
    }
    (th.core.material as THREE.MeshBasicMaterial).opacity = th.base * visibility;
    (th.halo.material as THREE.MeshBasicMaterial).opacity = th.base * 0.18 * visibility;
  }

  function frame(now: number) {
    if (!running) return;
    raf = requestAnimationFrame(frame);
    const dt = Math.min((now - last) / 1000, 1 / 20);
    last = now;
    if (document.hidden) return;
    // With reduced motion, only draw when something actually changed.
    if (reduced && !dirty) return;
    dirty = false;
    update(dt);
    renderer.render(scene, camera);
  }

  function resize() {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    aspect = w / h;
    const next = aspect < 0.9 ? "narrow" : aspect < 1.3 ? "medium" : "wide";
    const maxDpr = coarse ? 1.5 : 1.75;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr));
    renderer.setSize(w, h, false);
    camera.aspect = aspect;
    camera.fov = next === "narrow" ? 50 : 40;
    camera.updateProjectionMatrix();
    if (next !== layoutClass || panels[0].layouts.length === 0) {
      layoutClass = next;
      buildLayouts();
    }
    dirty = true;
  }

  const onLost = (e: Event) => {
    e.preventDefault();
    opts.onContextLost?.();
  };
  canvas.addEventListener("webglcontextlost", onLost);

  resize();
  update(0);
  renderer.render(scene, camera);
  raf = requestAnimationFrame(frame);

  return {
    setStory(s, immediate) {
      storyTarget = s;
      if (immediate) story = s;
      dirty = true;
    },
    setFocus(i) {
      focusTarget = Math.max(0, Math.min(4, i));
      dirty = true;
    },
    setPointer(x, y) {
      if (reduced) return;
      pointerTX = x;
      pointerTY = y;
    },
    setReducedMotion(r) {
      reduced = r;
      if (r) {
        pointerTX = pointerTY = 0;
      }
      dirty = true;
    },
    resize,
    dispose() {
      running = false;
      cancelAnimationFrame(raf);
      canvas.removeEventListener("webglcontextlost", onLost);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
    },
  };
}
