"use client";

import { useEffect, useRef, useState } from "react";
import type { World } from "./world";

type Props = {
  /** "story" follows the homepage chapters; "static" holds one chapter (sub-pages). */
  mode?: "story" | "static";
  /** Story value to hold in static mode (0–5). */
  story?: number;
  /** Service panel to bring forward (0–4). */
  focus?: number;
};

export const FOCUS_EVENT = "ev:focus";
export const CHAPTER_EVENT = "ev:chapter";

function webglAvailable() {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
  } catch {
    return false;
  }
}

type Section = { top: number; bottom: number };

/**
 * Maps the viewport centre to a story value. Chapter n "holds" at n ± 0.2 while
 * its section fills the screen; the 0.6 between chapters is the transition,
 * spread across the scroll distance around each section boundary.
 */
function storyFromScroll(sections: Section[], c: number, vh: number, docEnd: number) {
  const n = sections.length;
  if (n === 0) return { s: 0, chapter: 0 };
  const half: number[] = [];
  for (let i = 0; i < n - 1; i++) {
    const h0 = sections[i].bottom - sections[i].top;
    const h1 = sections[i + 1].bottom - sections[i + 1].top;
    half.push(Math.max(40, Math.min(vh * 0.42, h0 * 0.45, h1 * 0.45)));
  }
  for (let i = 0; i < n; i++) {
    const boundary = i < n - 1 ? sections[i + 1].top : Infinity;
    const transStart = i < n - 1 ? boundary - half[i] : Infinity;
    const holdStart = i === 0 ? vh / 2 : sections[i].top + half[i - 1];
    if (c < transStart) {
      const holdEnd = i < n - 1 ? transStart : Math.max(holdStart + 1, docEnd);
      const v = Math.min(1, Math.max(0, (c - holdStart) / Math.max(1, holdEnd - holdStart)));
      return { s: i - 0.2 + 0.4 * v, chapter: i };
    }
    if (i < n - 1 && c < boundary + half[i]) {
      const u = (c - transStart) / (2 * half[i]);
      return { s: i + 0.2 + 0.6 * u, chapter: u < 0.5 ? i : i + 1 };
    }
  }
  return { s: n - 1, chapter: n - 1 };
}

export default function StoryScene({ mode = "story", story = 0, focus = 0 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const worldRef = useRef<World | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  // Keep latest props available to the long-lived effect.
  const propsRef = useRef({ mode, story, focus });
  propsRef.current = { mode, story, focus };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    let reduced = reducedQuery.matches;
    let disposed = false;
    let sections: Section[] = [];
    let lastChapter = -1;
    let lastScrollY = window.scrollY;
    let swayTarget = 0;

    const measure = () => {
      const els = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));
      sections = els.map((el) => {
        const r = el.getBoundingClientRect();
        const top = r.top + window.scrollY;
        return { top, bottom: top + r.height };
      });
    };

    const onScroll = () => {
      if (propsRef.current.mode !== "story") return;
      const vh = window.innerHeight;
      const c = window.scrollY + vh / 2;
      const docEnd = document.documentElement.scrollHeight - vh / 2;
      const { s, chapter } = storyFromScroll(sections, c, vh, docEnd);
      if (chapter !== lastChapter) {
        lastChapter = chapter;
        window.dispatchEvent(new CustomEvent(CHAPTER_EVENT, { detail: chapter }));
      }
      const w = worldRef.current;
      if (!w) return;
      if (reduced) {
        // No scroll-tied motion: jump to each chapter's resting composition.
        w.setStory(chapter === 1 ? 1.2 : chapter, true);
      } else {
        w.setStory(Math.min(5, Math.max(0, s)));
      }
      // On touch screens, a slow sway tied to scrolling replaces mouse parallax.
      if (coarse && !reduced) {
        const dy = window.scrollY - lastScrollY;
        lastScrollY = window.scrollY;
        swayTarget = Math.max(-0.35, Math.min(0.35, swayTarget * 0.8 + dy * 0.004));
        w.setPointer(Math.sin(window.scrollY * 0.0012) * 0.4, swayTarget);
      }
    };

    const onFocus = (e: Event) => {
      const i = (e as CustomEvent<number>).detail;
      if (typeof i === "number") worldRef.current?.setFocus(i);
    };

    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || reduced) return;
      worldRef.current?.setPointer((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
    };

    const onResize = () => {
      measure();
      worldRef.current?.resize();
      onScroll();
    };

    const onReducedChange = () => {
      reduced = reducedQuery.matches;
      worldRef.current?.setReducedMotion(reduced);
      onScroll();
    };

    measure();
    onScroll();
    const ro = new ResizeObserver(onResize);
    ro.observe(document.body);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener(FOCUS_EVENT, onFocus);
    reducedQuery.addEventListener("change", onReducedChange);
    if (!coarse) window.addEventListener("pointermove", onPointer, { passive: true });

    const fail = () => {
      document.documentElement.dataset.webgl = "off";
      setFailed(true);
    };

    if (!webglAvailable()) {
      fail();
    } else {
      import("./world")
        .then(({ createWorld }) => {
          if (disposed) return;
          const w = createWorld({
            canvas,
            reducedMotion: reduced,
            coarsePointer: coarse,
            labelFont: getComputedStyle(document.body).fontFamily,
            onContextLost: fail,
          });
          worldRef.current = w;
          const { mode: m, story: st, focus: fo } = propsRef.current;
          w.setFocus(fo);
          if (m === "static") w.setStory(st, true);
          else {
            lastChapter = -1;
            onScroll();
            const vh = window.innerHeight;
            const { s } = storyFromScroll(sections, window.scrollY + vh / 2, vh, document.documentElement.scrollHeight - vh / 2);
            if (!reduced) w.setStory(Math.min(5, Math.max(0, s)), true);
          }
          requestAnimationFrame(() => setReady(true));
        })
        .catch(fail);
    }

    return () => {
      disposed = true;
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener(FOCUS_EVENT, onFocus);
      window.removeEventListener("pointermove", onPointer);
      reducedQuery.removeEventListener("change", onReducedChange);
      worldRef.current?.dispose();
      worldRef.current = null;
    };
  }, []);

  // Static pages can change focus/story without rebuilding the world.
  useEffect(() => {
    const w = worldRef.current;
    if (!w) return;
    w.setFocus(focus);
    if (mode === "static") w.setStory(story);
  }, [mode, story, focus]);

  return (
    <div aria-hidden="true" className="scene-layer">
      <div className="scene-fallback" />
      {!failed && <canvas ref={canvasRef} className={`scene-canvas ${ready ? "is-ready" : ""}`} />}
      <div className="scene-veil" />
    </div>
  );
}
