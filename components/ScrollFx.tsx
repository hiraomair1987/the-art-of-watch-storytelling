"use client";

import { useEffect } from "react";

/**
 * Scroll and pointer effects for showcase pages:
 * - [data-parallax="0.1"]  moves an element at a slightly different speed while scrolling
 * - [data-scroll-x="12"]   slides an element sideways in step with scroll (percent of its width)
 * - [data-count]           counts a number up from zero when it comes into view
 * - [data-spotlight]       a soft light that follows the mouse inside the element
 * All content is in the HTML from the start — these only add motion.
 */
export default function ScrollFx() {
  useEffect(() => {
    const parallax = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    const slides = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-x]"));
    let raf = 0;

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      for (const el of parallax) {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) continue;
        const centre = (r.top + r.height / 2 - vh / 2) / vh;
        el.style.transform = `translate3d(0, ${(-centre * Number(el.dataset.parallax) * 220).toFixed(1)}px, 0)`;
      }
      for (const el of slides) {
        const box = (el.parentElement ?? el).getBoundingClientRect();
        const progress = (vh - box.top) / (vh + box.height);
        el.style.transform = `translate3d(${(-progress * Number(el.dataset.scrollX)).toFixed(2)}%, 0, 0)`;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // Count-up numbers
    const counters = Array.from(document.querySelectorAll<HTMLElement>("[data-count]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          io.unobserve(el);
          const text = el.dataset.count ?? el.textContent ?? "";
          const match = text.match(/^(\D*)(\d+)(.*)$/);
          if (!match) continue;
          const [, pre, num, post] = match;
          const target = Number(num);
          const width = num.length;
          const start = performance.now();
          const step = (now: number) => {
            const t = Math.min(1, (now - start) / 1300);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = `${pre}${String(Math.round(target * eased)).padStart(width, "0")}${post}`;
            if (t < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.6 },
    );
    counters.forEach((el) => io.observe(el));

    // Mouse spotlight
    const spots = Array.from(document.querySelectorAll<HTMLElement>("[data-spotlight]"));
    const onMove = (e: PointerEvent) => {
      const el = e.currentTarget as HTMLElement;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
      el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
    };
    spots.forEach((el) => el.addEventListener("pointermove", onMove));

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      spots.forEach((el) => el.removeEventListener("pointermove", onMove));
    };
  }, []);
  return null;
}
