"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// three.js is only downloaded once we know the device can show 3D smoothly,
// and only after the page has finished loading — so text appears first.
const Scene = dynamic(() => import("./Scene"), { ssr: false });

type Props = {
  /** Show one service's 3D object (service detail pages). */
  detailIndex?: number;
  /** Hold one story layout instead of following scroll (0–6, see Scene.tsx). */
  fixedState?: number;
};

/** Quick check for hardware-accelerated WebGL, without loading three.js. */
function canRun3D() {
  try {
    const nav = navigator as Navigator & { deviceMemory?: number };
    if ((nav.hardwareConcurrency ?? 8) <= 2 || (nav.deviceMemory ?? 8) <= 1) return false;
    const gl = document.createElement("canvas").getContext("webgl");
    if (!gl) return false;
    const info = gl.getExtension("WEBGL_debug_renderer_info");
    const gpu = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : "";
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return !/swiftshader|llvmpipe|software|basic render/i.test(gpu);
  } catch {
    return false;
  }
}

export default function SceneLoader({ detailIndex, fixedState }: Props) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const start = () => {
      if (cancelled) return;
      if (canRun3D()) setReady(true);
      else document.documentElement.dataset.webgl = "off";
    };
    const whenIdle = () => {
      const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
      if (ric) ric(start, { timeout: 2000 });
      else setTimeout(start, 600);
    };
    if (document.readyState === "complete") whenIdle();
    else window.addEventListener("load", whenIdle, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener("load", whenIdle);
    };
  }, []);

  return (
    <div className="scene-layer" aria-hidden="true">
      {ready && <Scene detailIndex={detailIndex} fixedState={fixedState} />}
      <div className="scene-scrim" />
    </div>
  );
}
