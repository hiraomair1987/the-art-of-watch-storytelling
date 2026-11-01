/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SceneLoader from "@/components/SceneLoader";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import { getCaseStudy, publishedCaseStudies } from "@/lib/caseStudies";
import { getService } from "@/lib/content";
import { breadcrumbLd, businessRef, pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

type Params = { params: { slug: string } };

// Only published case studies get a page.
export function generateStaticParams() {
  return publishedCaseStudies.map((c) => ({ slug: c.slug }));
}
export const dynamicParams = false;

export function generateMetadata({ params }: Params): Metadata {
  const c = getCaseStudy(params.slug);
  if (!c) return {};
  return pageMeta({ title: `${c.client} Case Study`, description: c.summary, path: `/case-studies/${c.slug}`, image: c.image });
}

export default function CaseStudyPage({ params }: Params) {
  const c = getCaseStudy(params.slug);
  if (!c) notFound();
  const services = c.services.map((s) => getService(s)).filter(Boolean);

  return (
    <>
      <SceneLoader fixedState={6} />
      <JsonLd
        data={[
          breadcrumbLd([
            ["Case studies", "/case-studies"],
            [c.client, `/case-studies/${c.slug}`],
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: c.title,
            description: c.summary,
            url: `${site.url}/case-studies/${c.slug}`,
            ...(c.image ? { image: `${site.url}${c.image}` } : {}),
            author: businessRef,
            publisher: businessRef,
          },
        ]}
      />

      <article>
        <header className="pb-12 pt-48 md:pt-56">
          <div className="shell max-w-4xl">
            <nav aria-label="Breadcrumb" className="text-sm">
              <ol className="flex flex-wrap items-center gap-2 text-cream-muted">
                <li>
                  <Link href="/" className="footer-link">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/case-studies" className="footer-link">
                    Case studies
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-cream">
                  {c.client}
                </li>
              </ol>
            </nav>
            <p className="eyebrow mt-10">
              {c.industry} · {c.country}
            </p>
            <h1 className="display-lg mt-4 text-halo">{c.title}</h1>
            <p className="lede mt-6">{c.summary}</p>
          </div>
        </header>

        {c.image && (
          <div className="shell max-w-5xl pb-12">
            <img src={c.image} alt={`${c.client} — ${c.title}`} className="w-full rounded-3xl border border-cream/10" />
          </div>
        )}

        <div className="shell grid max-w-5xl gap-6 pb-16 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-6">
            <section className="glass rounded-3xl p-7 sm:p-9" aria-labelledby="challenge">
              <h2 id="challenge" className="display-md">
                The challenge
              </h2>
              <p className="mt-4 whitespace-pre-line">{c.challenge}</p>
            </section>
            <section className="glass rounded-3xl p-7 sm:p-9" aria-labelledby="approach">
              <h2 id="approach" className="display-md">
                What we did
              </h2>
              <p className="mt-4 whitespace-pre-line">{c.approach}</p>
            </section>
          </div>
          <aside className="space-y-6">
            {c.results.length > 0 && (
              <section className="cta-band rounded-3xl p-7" aria-labelledby="results">
                <h2 id="results" className="text-2xl">
                  Results
                </h2>
                <ul className="mt-4 space-y-3">
                  {c.results.map((r) => (
                    <li key={r} className="flex gap-3 text-cream">
                      <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      {r}
                    </li>
                  ))}
                </ul>
              </section>
            )}
            <section className="glass rounded-3xl p-7" aria-labelledby="services-used">
              <h2 id="services-used" className="text-2xl">
                Services
              </h2>
              <ul className="mt-4 space-y-2">
                {services.map((s) => (
                  <li key={s!.slug}>
                    <Link href={`/services/${s!.slug}`} className="text-link">
                      {s!.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
            {c.quote && (
              <figure className="glass rounded-3xl p-7">
                <blockquote className="font-display text-xl text-cream">“{c.quote.text}”</blockquote>
                <figcaption className="mt-4 text-sm">
                  {c.quote.name}, {c.quote.role}
                </figcaption>
              </figure>
            )}
          </aside>
        </div>
      </article>
      <CtaBand />
    </>
  );
}
