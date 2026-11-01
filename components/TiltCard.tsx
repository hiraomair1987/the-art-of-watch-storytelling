"use client";

import { useRef, type ReactNode, type PointerEvent } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Index of the matching 3D service object to highlight while hovered or focused. */
  serviceIndex?: number;
};

const announce = (i: number) => window.dispatchEvent(new CustomEvent("ev:service", { detail: i }));

/** A glass card that tilts slightly toward a mouse pointer and glows where it is touched. */
export default function TiltCard({ children, className = "", serviceIndex }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${(0.5 - y) * 7}deg`);
    el.style.setProperty("--ry", `${(x - 0.5) * 9}deg`);
    el.style.setProperty("--gx", `${x * 100}%`);
    el.style.setProperty("--gy", `${y * 100}%`);
  }

  function reset() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }

  const has = typeof serviceIndex === "number";

  return (
    <div
      ref={ref}
      className={`tilt-card ${className}`}
      data-service-index={has ? serviceIndex : undefined}
      onPointerMove={onMove}
      onPointerEnter={() => has && announce(serviceIndex!)}
      onPointerLeave={() => {
        reset();
        if (has) announce(-1);
      }}
      onFocus={() => has && announce(serviceIndex!)}
      onBlur={() => has && announce(-1)}
    >
      <div className="tilt-glow" aria-hidden="true" />
      {children}
    </div>
  );
}
