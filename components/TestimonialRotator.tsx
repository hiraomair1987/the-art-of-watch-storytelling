"use client";

import { useEffect, useState } from "react";
import type { Testimonial } from "@/lib/caseStudies";

/** Shows one testimonial at a time and moves to the next every few seconds. Pauses on hover or focus. */
export default function TestimonialRotator({ items }: { items: Testimonial[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || items.length < 2) return;
    const id = setInterval(() => setI((n) => (n + 1) % items.length), 6500);
    return () => clearInterval(id);
  }, [paused, items.length]);

  if (!items.length) return null;
  const t = items[i];

  return (
    <figure
      className="testimonial"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div key={i} className="testimonial-body">
        {t.placeholder && <span className="case-badge static mb-3 inline-block">Placeholder</span>}
        <blockquote className="text-lg italic leading-relaxed text-cream sm:text-xl">“{t.quote}”</blockquote>
        <figcaption className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-[0.16em]">
          {t.rating && !t.placeholder && (
            <span className="text-[#f0a46b]" aria-label={`${t.rating} out of 5 stars`}>
              {"★".repeat(t.rating)}
            </span>
          )}
          <span className="text-cream">{t.name}</span>
          <span aria-hidden="true">·</span>
          <span>{t.context}</span>
        </figcaption>
      </div>
      {items.length > 1 && (
        <div className="mt-5 flex gap-2">
          {items.map((_, n) => (
            <button
              key={n}
              type="button"
              className={`testimonial-dot ${n === i ? "is-active" : ""}`}
              aria-label={`Show testimonial ${n + 1} of ${items.length}`}
              aria-current={n === i ? "true" : undefined}
              onClick={() => setI(n)}
            />
          ))}
        </div>
      )}
    </figure>
  );
}
