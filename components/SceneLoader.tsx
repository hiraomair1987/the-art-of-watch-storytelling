"use client";

import dynamic from "next/dynamic";

// three.js is loaded after the page is interactive, so text and navigation never wait for it.
const Scene = dynamic(() => import("./Scene"), { ssr: false });

type Props = {
  /** Show one service's 3D object (service detail pages). */
  detailIndex?: number;
  /** Hold one story layout instead of following scroll (0–6, see Scene.tsx). */
  fixedState?: number;
};

export default function SceneLoader({ detailIndex, fixedState }: Props) {
  return (
    <div className="scene-layer" aria-hidden="true">
      <Scene detailIndex={detailIndex} fixedState={fixedState} />
      <div className="scene-scrim" />
    </div>
  );
}
