"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useMemo, useState } from "react";
import type { CaseStudy } from "@/lib/caseStudies";
import LogoMark from "./LogoMark";

type Props = { items: CaseStudy[]; serviceNames: Record<string, string> };

/** Filterable grid of case studies ("Behind the work"), filtered by sector. */
export default function CaseGrid({ items, serviceNames }: Props) {
  const [filter, setFilter] = useState("all");
  const tabs = useMemo(() => {
    const used = Array.from(new Set(items.filter((c) => c.published && c.sector).map((c) => c.sector as string)));
    return ["all", ...used];
  }, [items]);
  const shown = items.filter((c) => filter === "all" || c.sector === filter);

  return (
    <>
      <div className="mt-8 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter case studies by industry">
        {tabs.map((key) => (
          <button key={key} type="button" className={`filter-pill ${filter === key ? "is-active" : ""}`} aria-pressed={filter === key} onClick={() => setFilter(key)}>
            {key === "all" ? "All work" : key}
          </button>
        ))}
      </div>
      <ul className="mt-10 grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((c, i) => {
          const tags = [...c.services.map((s) => serviceNames[s]).filter(Boolean), ...(c.tech ?? [])];
          return (
            <li key={c.slug} className="group relative flex flex-col">
              <div className="grid-thumb">
                {c.image ? (
                  <img src={c.image} alt={`${c.client} — screenshot of the project`} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]" />
                ) : (
                  <LogoMark className="case-thumb-mark" />
                )}
                {!c.published && <span className="case-badge">Placeholder</span>}
                {c.published && c.kind === "concept" && <span className="case-badge concept">{c.badge ?? "Concept"} project</span>}
              </div>
              <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-cream-muted">
                {c.published ? [c.industry, c.country].filter(Boolean).join(" · ") : "Industry · Country"}
              </p>
              <h3 className="mt-2 font-heavy text-2xl uppercase leading-none tracking-[-0.03em] text-cream">
                {c.published ? c.client : `Case study ${String(i + 1).padStart(2, "0")}`}
              </h3>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed">{c.summary}</p>
              <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5" aria-label="Services and tools">
                {tags.map((t) => (
                  <li key={t} className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#f0a46b]">
                    <span aria-hidden="true">● </span>
                    {t}
                  </li>
                ))}
              </ul>
              {c.published ? (
                <Link href={`/case-studies/${c.slug}`} className="mono-link stretched mt-5">
                  View {c.client} case study <span aria-hidden="true">→</span>
                </Link>
              ) : (
                <p className="mt-5 font-mono text-xs uppercase tracking-[0.16em] text-cream-muted">Coming soon</p>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}
