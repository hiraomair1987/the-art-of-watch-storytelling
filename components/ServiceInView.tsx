"use client";

import { useEffect } from "react";

/**
 * On touch screens there is no hover, so the service card closest to the
 * middle of the screen lights up its 3D object instead.
 */
export default function ServiceInView() {
  useEffect(() => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-service-index]"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset.serviceIndex);
            window.dispatchEvent(new CustomEvent("ev:service", { detail: i }));
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" },
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);
  return null;
}
