/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { CaseStudy } from "@/lib/caseStudies";
import LogoMark from "./LogoMark";

function Card({ c, index, hidden }: { c: CaseStudy; index: number; hidden?: boolean }) {
  const name = c.published ? c.client : `Case study ${String(index + 1).padStart(2, "0")}`;
  const metric = c.published ? c.metric : "Result coming soon";
  const inner = (
    <>
      <div className="work-thumb">
        {c.published && c.image ? (
          <>
            <img src={c.image} alt={hidden ? "" : `${c.client} project screenshot`} loading="lazy" className="h-full w-full object-cover object-top" />
            {c.kind === "concept" && <span className="case-badge concept">Concept</span>}
          </>
        ) : (
          <>
            <LogoMark className="case-thumb-mark" />
            <span className="case-badge">Placeholder</span>
          </>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-heavy text-2xl leading-[1.05] tracking-[-0.03em] text-cream sm:text-[1.7rem]">{name}</h3>
        {metric && <p className="mt-2 font-mono text-[13px] uppercase tracking-[0.14em] text-[#f0a46b]">{metric}</p>}
      </div>
      <span className="work-arrow" aria-hidden="true">
        →
      </span>
    </>
  );
  return (
    <li className="work-card" aria-hidden={hidden || undefined}>
      {c.published ? (
        <Link href={`/case-studies/${c.slug}`} className="work-card-link" tabIndex={hidden ? -1 : undefined} aria-label={hidden ? undefined : `${c.client} case study`}>
          {inner}
        </Link>
      ) : (
        <div className="work-card-link">{inner}</div>
      )}
    </li>
  );
}

/** A column of case-study cards that slowly scrolls upward on its own (pauses on hover or keyboard focus). */
export default function WorkMarquee({ items }: { items: CaseStudy[] }) {
  return (
    <div className="work-marquee">
      <ul className="work-track" style={{ ["--dur" as string]: `${items.length * 7}s` }}>
        {items.map((c, i) => (
          <Card key={c.slug} c={c} index={i} />
        ))}
        {/* Duplicate set makes the loop seamless; hidden from screen readers and keyboard. */}
        {items.map((c, i) => (
          <Card key={`${c.slug}-dup`} c={c} index={i} hidden />
        ))}
      </ul>
    </div>
  );
}
