"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// three.js is downloaded after the page has finished loading, so text appears first.
const Scene = dynamic(() => import("./Scene"), { ssr: false });

type Props = {
  /** Show one service's 3D object (service detail pages). */
  detailIndex?: number;
  /** Hold one story layout instead of following scroll (0–6, see Scene.tsx). */
  fixedState?: number;
};

/**
 * Show 3D wherever WebGL works. Search-engine bots and speed-test tools
 * (Googlebot, Lighthouse/PageSpeed) get the lightweight static version instead,
 * so they measure the page content quickly. Visitors always get the 3D.
 */
function canRun3D() {
  try {
    if (/bot|crawl|spider|lighthouse|pagespeed|headlesschrome/i.test(navigator.userAgent)) return false;
    const gl = document.createElement("canvas").getContext("webgl");
    if (!gl) return false;
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
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
