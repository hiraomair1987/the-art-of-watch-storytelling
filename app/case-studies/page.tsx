import type { Metadata } from "next";
import Link from "next/link";
import SceneLoader from "@/components/SceneLoader";
import JsonLd from "@/components/JsonLd";
import WorkMarquee from "@/components/WorkMarquee";
import TestimonialRotator from "@/components/TestimonialRotator";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import CaseGrid from "@/components/CaseGrid";
import CaseFaq from "@/components/CaseFaq";
import SideRails from "@/components/SideRails";
import { caseFaqs, caseStudies, publishedCaseStudies, sectors, stats, testimonials } from "@/lib/caseStudies";
import { services } from "@/lib/content";
import { site } from "@/lib/site";
import { breadcrumbLd, pageMeta } from "@/lib/seo";
import { withAvailableImages } from "@/lib/caseStudyImages";

const hasPublished = publishedCaseStudies.length > 0;
const hasConcepts = publishedCaseStudies.some((c) => c.kind === "concept");
const serviceNames = Object.fromEntries(services.map((s) => [s.slug, s.name]));

export const metadata: Metadata = {
  ...pageMeta({
    title: "Case Studies",
    description: "Websites, 3D experiences and digital marketing projects by efficiovirtual — the brief, what we designed and built, and the results.",
    path: "/case-studies",
  }),
  // Hidden from Google until at least one real case study is published.
  robots: hasPublished ? undefined : { index: false, follow: true },
};

const jsonLd = [
  breadcrumbLd([["Case studies", "/case-studies"]]),
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "efficiovirtual case studies",
    itemListElement: publishedCaseStudies.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.client, url: `${site.url}/case-studies/${c.slug}` })),
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: caseFaqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  },
];

export default function CaseStudiesPage() {
  const count = String(caseStudies.length).padStart(2, "0");
  const items = withAvailableImages(caseStudies);

  return (
    <>
      <SceneLoader fixedState={1} />
      <JsonLd data={jsonLd} />
      <SideRails />

      {/* 1 · Showcase hero */}
      <section aria-labelledby="page-title" className="work-hero">
        <div className="shell grid gap-14 pb-16 pt-44 lg:min-h-screen lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16 lg:pb-10 lg:pt-36">
          <div>
            <p className="bracket-eyebrow">Selected work — five markets, one team</p>
            <h1 id="page-title" className="work-title mt-6">
              Our case studies
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-cream-muted sm:text-xl">
              Brands and ideas we design, build and grow — and what changed for them.
              {hasConcepts ? " Concept projects are clearly labelled." : ""}
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
            <WorkMarquee items={items} />
          </div>
        </div>
      </section>

      {/* 2 · Portfolio numbers */}
      <section aria-labelledby="numbers-title" className="py-20 lg:py-28">
        <div className="shell grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div data-reveal>
            <p className="bracket-eyebrow">Across the portfolio</p>
            <h2 id="numbers-title" className="work-title mt-6 !text-[clamp(2.2rem,5vw,4.4rem)]">
              What the numbers look like when you publish them.
            </h2>
            <div className="mt-7 max-w-xl space-y-5 text-[17px] leading-relaxed">
              <p>
                We only publish figures that come from a client’s own analytics or ad accounts, and only with their
                permission. Concept projects show what we designed and built — never invented results.
              </p>
              <p>
                Long-term growth is the number we care about most. Paid traffic stops the day the budget does; a strong
                website, clear tracking and search visibility keep working.
              </p>
            </div>
          </div>
          <dl className="stats-list">
            {stats.map((s) => (
              <div key={s.label} className="stat-row" data-reveal>
                <dt className="order-2 max-w-[11rem] text-right font-mono text-xs uppercase leading-relaxed tracking-[0.22em] text-cream">
                  {s.label}
                  {s.placeholder && <span className="case-badge static mt-2 block w-fit lg:ml-auto">Placeholder</span>}
                </dt>
                <dd className={`stat-value ${s.placeholder ? "opacity-40" : ""}`}>{s.value === "auto" ? publishedCaseStudies.length : s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 3 · Behind the work */}
      <section id="all-case-studies" aria-labelledby="all-title" className="scroll-mt-48 py-16">
        <div className="shell">
          <div className="text-center" data-reveal>
            <p className="bracket-eyebrow inline-block">Behind the work</p>
            <h2 id="all-title" className="work-title mx-auto mt-5 max-w-3xl !text-[clamp(2rem,4.6vw,4rem)]">
              {publishedCaseStudies.length ? `${numberWord(publishedCaseStudies.length)} projects, shown in full` : "Projects, shown in full"}
            </h2>
          </div>
          <CaseGrid items={items} serviceNames={serviceNames} />
        </div>
      </section>

      {/* 4 · Sectors */}
      <section aria-labelledby="sectors-title" className="py-20">
        <div className="shell">
          <div className="text-center" data-reveal>
            <p className="bracket-eyebrow inline-block">By industry</p>
            <h2 id="sectors-title" className="work-title mt-5 !text-[clamp(2rem,4.2vw,3.6rem)]">
              The sectors we <span className="heat-text">know best</span>
            </h2>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sectors.map((s, i) => (
              <li key={s.name + i} className="sector-card" data-reveal style={{ ["--d" as string]: `${i * 80}ms` }}>
                {s.placeholder && <span className="case-badge static mb-3 inline-block">Placeholder</span>}
                <h3 className="text-xl text-cream">{s.name}</h3>
                <p className="mt-2 text-sm">{s.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5 · Client stories */}
      <section aria-labelledby="stories-title" className="py-20">
        <div className="shell">
          <div className="text-center" data-reveal>
            <p className="bracket-eyebrow inline-block">Client stories</p>
            <h2 id="stories-title" className="work-title mt-5 !text-[clamp(2rem,4.2vw,3.6rem)]">
              What clients say
            </h2>
            <p className="mx-auto mt-4 max-w-xl">In their own words — about what we designed, built and grew together.</p>
          </div>
          <div className="mt-10">
            <TestimonialCarousel items={testimonials} />
          </div>
        </div>
      </section>

      {/* 6 · FAQ */}
      <section aria-labelledby="cs-faq-title" className="py-20">
        <div className="shell">
          <div className="text-center" data-reveal>
            <p className="bracket-eyebrow inline-block">About this work</p>
            <h2 id="cs-faq-title" className="work-title mt-5 !text-[clamp(2rem,4.2vw,3.6rem)]">
              Questions about <span className="heat-text">our case studies</span>
            </h2>
          </div>
          <div className="mt-10">
            <CaseFaq items={caseFaqs} />
          </div>
        </div>
      </section>

      {/* 7 · Closing call to action over a scrolling word band */}
      <section aria-labelledby="cs-cta-title" className="ticker-cta">
        <div className="ticker-words" aria-hidden="true">
          <span>Design · Build · Grow · Design · Build · Grow · Design · Build · Grow · </span>
          <span>Design · Build · Grow · Design · Build · Grow · Design · Build · Grow · </span>
        </div>
        <div className="shell relative py-24 text-center">
          <p className="bracket-eyebrow inline-block">Next step</p>
          <h2 id="cs-cta-title" className="work-title mx-auto mt-5 max-w-4xl !text-[clamp(2.2rem,5.4vw,4.8rem)]">
            Let’s make your project <span className="heat-text">the next one here</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg">
            Tell us what you’d like to build or grow. We’ll reply with honest next steps.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn-heat">
              Start a project
            </Link>
            <a href={`mailto:${site.contactEmail}`} className="btn-outline-mono">
              Email us <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <div className="ticker-band" aria-hidden="true">
          <div className="ticker-band-track">
            {Array.from({ length: 2 }).map((_, k) => (
              <span key={k}>
                Design ✦ Strategy ✦ Google Ads ✦ SEO ✦ 3D Websites ✦ Apps ✦ SaaS ✦ Automation ✦ Creative ✦&nbsp;
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function numberWord(n: number) {
  const w = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve"];
  return w[n] ?? String(n);
}
