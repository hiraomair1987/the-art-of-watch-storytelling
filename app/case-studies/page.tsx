/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import SceneLoader from "@/components/SceneLoader";
import TiltCard from "@/components/TiltCard";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import LogoMark from "@/components/LogoMark";
import WorkMarquee from "@/components/WorkMarquee";
import TestimonialRotator from "@/components/TestimonialRotator";
import { caseStudies, publishedCaseStudies, testimonials } from "@/lib/caseStudies";
import { getService } from "@/lib/content";
import { breadcrumbLd, pageMeta } from "@/lib/seo";

const hasPublished = publishedCaseStudies.length > 0;

export const metadata: Metadata = {
  ...pageMeta({
    title: "Case Studies",
    description: "Digital marketing, web and app projects by efficiovirtual — the challenge, what we did and the results.",
    path: "/case-studies",
  }),
  // Hidden from Google until at least one real case study is published.
  robots: hasPublished ? undefined : { index: false, follow: true },
};

export default function CaseStudiesPage() {
  const count = String(caseStudies.length).padStart(2, "0");

  return (
    <>
      <SceneLoader fixedState={1} />
      <JsonLd data={breadcrumbLd([["Case studies", "/case-studies"]])} />

      {/* Showcase: intro on the left, auto-scrolling work column on the right */}
      <section aria-labelledby="page-title" className="work-hero">
        <div className="shell grid gap-14 pb-16 pt-44 lg:min-h-screen lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16 lg:pb-10 lg:pt-36">
          <div>
            <p className="bracket-eyebrow">Selected work — five markets, one team</p>
            <h1 id="page-title" className="work-title mt-6">
              Our case studies
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-cream-muted sm:text-xl">
              Brands we design, build and grow — and what changed for them.
              {hasPublished ? " Every project below is a real client engagement." : " Our first detailed case studies are on their way."}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-heat">
                Start a project
              </Link>
              <a href="#all-case-studies" className="btn-outline-mono">
                See all case studies <span aria-hidden="true">→</span>
              </a>
            </div>
            <div className="mt-12 border-t border-cream/10 pt-8">
              <TestimonialRotator items={testimonials} />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between border-b border-cream/10 pb-4 font-mono text-xs uppercase tracking-[0.22em]">
              <h2 className="font-mono text-xs font-medium text-[#f0a46b]">Selected work</h2>
              <span className="text-cream-muted">{count} case studies</span>
            </div>
            <WorkMarquee items={caseStudies} />
          </div>
        </div>
      </section>

      {/* Full list */}
      <section id="all-case-studies" aria-labelledby="all-title" className="scroll-mt-48 pb-16 pt-10">
        <div className="shell">
          <h2 id="all-title" className="font-heavy text-3xl uppercase tracking-[-0.03em] text-cream sm:text-4xl" data-reveal>
            All case studies
          </h2>
          <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {caseStudies.map((c, i) => {
              const tags = c.services.map((s) => getService(s)?.name).filter(Boolean) as string[];
              return (
                <li key={c.slug} data-reveal style={{ ["--d" as string]: `${(i % 4) * 80}ms` }}>
                  <TiltCard className="flex h-full flex-col overflow-hidden">
                    <div className="case-thumb">
                      {c.published && c.image ? (
                        <img src={c.image} alt={`${c.client} — ${c.title}`} className="h-full w-full object-cover" loading="lazy" />
                      ) : (
                        <LogoMark className="case-thumb-mark" />
                      )}
                      {!c.published && <span className="case-badge">Placeholder</span>}
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-violet-300">{tags.join(" · ")}</p>
                      <h3 className="mt-2 text-xl leading-snug">{c.published ? c.title : "Case study coming soon"}</h3>
                      <p className="mt-2 flex-1 text-sm">{c.summary}</p>
                      {c.published ? (
                        <Link href={`/case-studies/${c.slug}`} className="arrow-link stretched mt-4">
                          Read the {c.client} case study <span aria-hidden="true">→</span>
                        </Link>
                      ) : (
                        <p className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-cream-muted">Coming soon</p>
                      )}
                    </div>
                  </TiltCard>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <CtaBand title="Want your project to be our next case study?" />
    </>
  );
}
