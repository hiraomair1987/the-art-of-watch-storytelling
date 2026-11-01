"use client";

import { useEffect, useState } from "react";

const chapters = [
  { id: "top", label: "Home" },
  { id: "challenge", label: "The challenge" },
  { id: "approach", label: "Our approach" },
  { id: "services", label: "Services" },
  { id: "process", label: "Process" },
  { id: "contact", label: "Let’s talk" },
];

/** A quiet progress rail: shows where you are in the story and lets you jump. */
export default function ChapterRail() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const els = chapters.map((c) => document.getElementById(c.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <nav aria-label="Story chapters" className="chapter-rail">
      <ol>
        {chapters.map((c, i) => (
          <li key={c.id}>
            <a href={`#${c.id}`} aria-current={active === c.id ? "step" : undefined} className="rail-link">
              <span className="rail-label">
                <span className="tabular-nums opacity-60">0{i + 1}</span> {c.label}
              </span>
              <span className="rail-dot" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
