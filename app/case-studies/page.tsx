/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import SceneLoader from "@/components/SceneLoader";
import PageIntro from "@/components/PageIntro";
import TiltCard from "@/components/TiltCard";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import LogoMark from "@/components/LogoMark";
import { caseStudies, publishedCaseStudies } from "@/lib/caseStudies";
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
  return (
    <>
      <SceneLoader fixedState={3} />
      <JsonLd data={breadcrumbLd([["Case studies", "/case-studies"]])} />
      <PageIntro eyebrow="Case studies" title="Projects and results.">
        <p>
          {hasPublished
            ? "A closer look at projects we’ve delivered: the challenge, what we did and what changed."
            : "We’re preparing detailed case studies. Check back soon — or get in touch to talk about your project."}
        </p>
      </PageIntro>

      <section aria-label="Case studies" className="pb-16">
        <ul className="shell grid gap-5 md:grid-cols-2 lg:grid-cols-4">
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
                    <p className="text-[11px] uppercase tracking-[0.18em] text-violet-300">{tags.join(" · ")}</p>
                    <h2 className="mt-2 text-xl leading-snug">{c.published ? c.title : "Case study coming soon"}</h2>
                    <p className="mt-2 flex-1 text-sm">{c.summary}</p>
                    {c.published ? (
                      <Link href={`/case-studies/${c.slug}`} className="arrow-link stretched mt-4">
                        Read the {c.client} case study <span aria-hidden="true">→</span>
                      </Link>
                    ) : (
                      <p className="mt-4 text-sm text-cream-muted">Coming soon</p>
                    )}
                  </div>
                </TiltCard>
              </li>
            );
          })}
        </ul>
      </section>
      <CtaBand title="Want your project to be our next case study?" />
    </>
  );
}
