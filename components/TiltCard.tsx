"use client";

import { useRef, type HTMLAttributes, type PointerEvent } from "react";

type Props = HTMLAttributes<HTMLDivElement> & { as?: "div" | "article" | "li"; max?: number; active?: boolean };

/** A card that tilts a few degrees towards the pointer and lights up under it. */
export default function TiltCard({ as = "div", max = 5, active, className = "", children, onPointerMove, onPointerLeave, ...rest }: Props) {
  const ref = useRef<HTMLElement>(null);
  const Tag = as as "div";

  function move(e: PointerEvent<HTMLDivElement>) {
    onPointerMove?.(e);
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--ry", `${(x - 0.5) * max * 2}deg`);
    el.style.setProperty("--rx", `${(0.5 - y) * max * 2}deg`);
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
  }

  function leave(e: PointerEvent<HTMLDivElement>) {
    onPointerLeave?.(e);
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`tilt relative ${className}`}
      data-active={active ? "true" : undefined}
      onPointerMove={move}
      onPointerLeave={leave}
      {...rest}
    >
      {children}
    </Tag>
  );
}
