"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ServiceIcon from "./ServiceIcon";
import TiltCard from "./TiltCard";
import { FOCUS_EVENT } from "./scene/StoryScene";
import { services } from "@/lib/services";

/**
 * The five services as interactive cards. The card nearest the middle of the
 * screen — or the one under the pointer / keyboard focus — is "active", and the
 * 3D carousel brings the matching glass panel forward.
 */
export default function ServicesShowcase() {
  const [active, setActive] = useState(0);
  const hovering = useRef<number | null>(null);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent(FOCUS_EVENT, { detail: active }));
  }, [active]);

  useEffect(() => {
    const items = Array.from(listRef.current?.querySelectorAll<HTMLElement>("[data-service-index]") ?? []);
    const io = new IntersectionObserver(
      (entries) => {
        if (hovering.current !== null) return;
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.serviceIndex));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const engage = (i: number) => {
    hovering.current = i;
    setActive(i);
  };
  const release = () => {
    hovering.current = null;
  };

  return (
    <ol ref={listRef} className="grid gap-4 sm:gap-5">
      {services.map((s, i) => (
        <li key={s.slug} data-service-index={i} data-reveal style={{ ["--delay" as string]: `${i * 60}ms` }}>
          <TiltCard
            as="article"
            active={active === i}
            aria-labelledby={`svc-${s.slug}`}
            onPointerEnter={() => engage(i)}
            onPointerLeave={release}
            onFocus={() => engage(i)}
            onBlur={release}
            className={`glass group overflow-hidden p-6 sm:p-7 ${
              active === i ? "border-violet-soft/40 bg-plum-800/75 shadow-[0_30px_80px_-30px_rgba(159,132,255,0.55)]" : ""
            }`}
          >
            <div className="flex items-start gap-5">
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border transition-colors duration-300 ${
                  active === i ? "border-magenta/50 bg-magenta/10 text-cream" : "border-white/10 bg-white/[0.03] text-violet-soft"
                }`}
              >
                <ServiceIcon index={i} className="h-8 w-8" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cream-dim">
                  <span className="text-violet-soft">0{i + 1}</span> · {s.short}
                </p>
                <h3 id={`svc-${s.slug}`} className="mt-2 font-display text-2xl font-normal tracking-tight sm:text-[1.75rem]">
                  {s.name}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-cream-muted">{s.summary}</p>
                <Link
                  href={`/services/${s.slug}`}
                  className="mt-5 inline-flex items-center gap-2 rounded-full text-sm font-semibold text-cream underline decoration-transparent underline-offset-4 transition-colors hover:decoration-magenta focus-visible:decoration-magenta"
                >
                  Explore {s.name}
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </TiltCard>
        </li>
      ))}
    </ol>
  );
}
