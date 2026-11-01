"use client";

import dynamic from "next/dynamic";

// three.js is loaded after hydration so text and navigation are usable first.
const Scene = dynamic(() => import("./Scene"), { ssr: false });

export default function SceneLoader({ detailIndex }: { detailIndex?: number }) {
  return (
    <div className="scene-layer" aria-hidden="true">
      <Scene detailIndex={detailIndex} />
      <div className="scene-scrim" />
    </div>
  );
}
