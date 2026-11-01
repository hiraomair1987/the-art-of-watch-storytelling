"use client";

import { useState } from "react";

type Faq = { q: string; a: string; topic: string };

/** FAQ list with a search box and topic filter. */
export default function CaseFaq({ items }: { items: Faq[] }) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("All");
  const topics = ["All", ...Array.from(new Set(items.map((f) => f.topic)))];
  const q = query.trim().toLowerCase();
  const shown = items.filter((f) => (topic === "All" || f.topic === topic) && (!q || (f.q + f.a).toLowerCase().includes(q)));

  return (
    <div className="mx-auto max-w-3xl">
      <label htmlFor="faq-search" className="sr-only">
        Search questions
      </label>
      <input id="faq-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search questions…" className="faq-search" />
      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter questions by topic">
        {topics.map((t) => (
          <button key={t} type="button" className={`filter-pill ${topic === t ? "is-active" : ""}`} aria-pressed={topic === t} onClick={() => setTopic(t)}>
            {t}
          </button>
        ))}
      </div>
      <div className="mt-6 space-y-3">
        {shown.map((f) => (
          <details key={f.q} className="faq glass rounded-2xl">
            <summary>
              <h3 className="font-sans text-base font-medium text-cream sm:text-[17px]">{f.q}</h3>
              <span className="faq-icon" aria-hidden="true" />
            </summary>
            <p className="px-5 pb-5 text-[15px] leading-relaxed sm:px-6">{f.a}</p>
          </details>
        ))}
        {!shown.length && (
          <p className="text-center text-sm" role="status">
            No questions match “{query}”.
          </p>
        )}
      </div>
    </div>
  );
}
