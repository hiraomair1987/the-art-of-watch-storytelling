"use client";

import { useRef } from "react";
import type { Testimonial } from "@/lib/caseStudies";

/** Horizontal, swipeable testimonial cards with previous/next buttons. */
export default function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const track = useRef<HTMLUListElement>(null);
  const move = (dir: number) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 320) + 20), behavior: "smooth" });
  };
  return (
    <div>
      <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.2em] text-cream-muted">
        <span>{String(items.length).padStart(2, "0")} client stories</span>
        <div className="flex gap-2">
          <button type="button" className="round-btn" onClick={() => move(-1)} aria-label="Previous testimonials">
            ←
          </button>
          <button type="button" className="round-btn" onClick={() => move(1)} aria-label="Next testimonials">
            →
          </button>
        </div>
      </div>
      <ul ref={track} className="testimonial-track mt-6" tabIndex={0} aria-label="Client testimonials">
        {items.map((t, i) => (
          <li key={i} className="testimonial-card">
            <div className="flex items-start justify-between">
              {t.rating && !t.placeholder ? (
                <span className="text-[#f0a46b]" aria-label={`${t.rating} out of 5 stars`}>
                  {"★".repeat(t.rating)}
                </span>
              ) : (
                t.placeholder && <span className="case-badge static">Placeholder</span>
              )}
              <span className="font-heavy text-5xl leading-none text-[#f0a46b]/40" aria-hidden="true">
                “
              </span>
            </div>
            <blockquote className="mt-4 text-[15px] leading-relaxed text-cream">{t.quote}</blockquote>
            <p className="mt-6 border-t border-cream/10 pt-4">
              <span className="block font-medium text-cream">{t.name}</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em]">{t.context}</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
