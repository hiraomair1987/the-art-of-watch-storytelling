import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SceneLoader from "@/components/SceneLoader";
import TiltCard from "@/components/TiltCard";
import { getService, services, stages } from "@/lib/content";
import { site } from "@/lib/site";
import { breadcrumbLd, businessRef, pageMeta } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const s = getService(params.slug);
  if (!s) return {};
  const title = s.page?.titleAbsolute ?? s.seoTitle;
  return pageMeta({
    title,
    absoluteTitle: Boolean(s.page?.titleAbsolute),
    description: s.seoDescription,
    path: `/services/${s.slug}`,
    image: `/services/${s.slug}/opengraph-image`,
  });
}

export default function ServicePage({ params }: Params) {
  const s = getService(params.slug);
  if (!s) notFound();
  const index = services.indexOf(s);
  const others = services.filter((o) => o.slug !== s.slug);

  return (
    <>
      <SceneLoader detailIndex={index} />
      <JsonLd
        data={[
          breadcrumbLd([
            ["Services", "/services"],
            [s.name, `/services/${s.slug}`],
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: s.h1,
            serviceType: s.name,
            description: s.seoDescription,
            url: `${site.url}/services/${s.slug}`,
            provider: businessRef,
            areaServed: site.areasServed.map((name) => ({ "@type": "Country", name })),
          },
          ...(s.page
            ? [
                {
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: s.page.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
                },
              ]
            : []),
        ]}
      />

      <section aria-labelledby="svc-title" className="relative flex min-h-[88vh] items-center pb-16 pt-48 max-md:items-end">
        <div className="shell">
          <nav aria-label="Breadcrumb" className="text-sm">
            <ol className="flex flex-wrap items-center gap-2 text-cream-muted">
              <li>
                <Link href="/" className="footer-link">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/services" className="footer-link">
                  Services
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-cream">
                {s.name}
              </li>
            </ol>
          </nav>
          <div className="max-w-2xl text-halo">
            <p className="eyebrow mt-10">
              {s.short}
            </p>
            <h1 id="svc-title" className="display-lg mt-4">
              {s.h1}
            </h1>
            {s.page ? (
              <div className="lede mt-6 space-y-4">
                {s.page.intro.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            ) : (
              <>
                <p className="mt-6 text-xl text-cream sm:text-2xl">{s.summary}</p>
                <p className="lede mt-5">{s.intro}</p>
              </>
            )}
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href={`/contact?service=${s.slug}`} className="btn btn-primary">
                Let’s talk about {s.name} <span aria-hidden="true">→</span>
              </Link>
              <Link href="/services" className="btn btn-ghost">
                All services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {s.page ? (
        <>
          {s.page.sections.map((sec, k) => (
            <section key={sec.heading} aria-labelledby={`sec-${k}`} className="py-10">
              <div className="shell">
                <div className={`glass max-w-4xl rounded-3xl p-7 sm:p-10 ${k % 2 ? "lg:ml-auto" : ""}`} data-reveal>
                  <h2 id={`sec-${k}`} className="display-md">
                    {sec.heading}
                  </h2>
                  {sec.paragraphs?.map((p) => (
                    <p key={p} className="mt-4 text-[17px] leading-relaxed">
                      {p}
                    </p>
                  ))}
                  {sec.listIntro && <p className="mt-4 text-[17px]">{sec.listIntro}</p>}
                  {sec.list && (
                    <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                      {sec.list.map((x) => (
                        <li key={x} className="flex gap-3 text-cream">
                          <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                          {x}
                        </li>
                      ))}
                    </ul>
                  )}
                  {sec.note && <p className="mt-5 text-sm text-cream-muted">{sec.note}</p>}
                </div>
              </div>
            </section>
          ))}

          <section aria-labelledby="process-title" className="py-16">
            <div className="shell">
              <h2 id="process-title" className="display-md max-w-xl" data-reveal>
                {s.page.processTitle}
              </h2>
              <ol className="mt-8 grid gap-4 md:grid-cols-3">
                {s.page.process.map((st, i) => (
                  <li key={st.name} data-reveal style={{ ["--d" as string]: `${i * 100}ms` }}>
                    <TiltCard className="h-full p-7">
                      <p className="font-display text-3xl text-accent tabular-nums" aria-hidden="true">
                        0{i + 1}
                      </p>
                      <h3 className="mt-3 text-2xl">{st.name}</h3>
                      <p className="mt-2">{st.text}</p>
                    </TiltCard>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section aria-labelledby="svc-cta" className="py-10">
            <div className="shell">
              <div className="cta-band flex flex-col items-start justify-between gap-6 rounded-3xl p-8 sm:flex-row sm:items-center sm:p-12" data-reveal>
                <div>
                  <h2 id="svc-cta" className="display-md">
                    {s.page.cta.heading}
                  </h2>
                  <p className="mt-3 max-w-xl text-cream">
                    {s.page.cta.text.split(site.contactEmail).map((part, i, arr) => (
                      <span key={i}>
                        {part}
                        {i < arr.length - 1 && (
                          <a href={`mailto:${site.contactEmail}`} className="text-link">
                            {site.contactEmail}
                          </a>
                        )}
                      </span>
                    ))}
                  </p>
                </div>
                <Link href={`/contact?service=${s.slug}`} className="btn btn-primary shrink-0">
                  Let’s talk <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </section>

          <section aria-labelledby="svc-faq" className="py-16">
            <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <h2 id="svc-faq" className="display-md" data-reveal>
                {s.name}: common questions
              </h2>
              <div className="space-y-3">
                {s.page.faqs.map((f) => (
                  <details key={f.q} className="faq glass rounded-2xl">
                    <summary>
                      <h3 className="font-sans text-base font-medium text-cream sm:text-[17px]">{f.q}</h3>
                      <span className="faq-icon" aria-hidden="true" />
                    </summary>
                    <p className="px-5 pb-5 text-[15px] leading-relaxed sm:px-6">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
      <section aria-labelledby="includes-title" className="py-20">
        <div className="shell grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div className="glass rounded-3xl p-7 sm:p-10" data-reveal>
            <h2 id="includes-title" className="display-md">
              What’s included
            </h2>
            <ul className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {s.includes.map((x) => (
                <li key={x} className="flex gap-3 text-cream">
                  <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass rounded-3xl p-7 sm:p-10" data-reveal style={{ ["--d" as string]: "120ms" }}>
            <h2 className="display-md">A good fit if…</h2>
            <ul className="mt-8 space-y-4">
              {s.fit.map((x) => (
                <li key={x} className="border-b border-cream/10 pb-4 text-cream last:border-0">
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="how-title" className="py-20">
        <div className="shell">
          <p className="eyebrow" data-reveal>
            How we work
          </p>
          <h2 id="how-title" className="display-md mt-4 max-w-xl" data-reveal>
            Strategy, creative and performance — working as one.
          </h2>
          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {stages.map((st, i) => (
              <li key={st.name} data-reveal style={{ ["--d" as string]: `${i * 100}ms` }}>
                <TiltCard className="h-full p-7">
                  <p className="text-sm tabular-nums text-violet-300">0{i + 1}</p>
                  <h3 className="mt-3 text-2xl">{st.name}</h3>
                  <p className="mt-2">{st.line}</p>
                </TiltCard>
              </li>
            ))}
          </ol>
        </div>
      </section>

        </>
      )}

      <section aria-labelledby="more-title" className="pb-28 pt-12">
        <div className="shell">
          <h2 id="more-title" className="display-md" data-reveal>
            Other services
          </h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <li key={o.slug} data-reveal>
                <TiltCard className="h-full p-6">
                  <h3 className="text-xl">{o.name}</h3>
                  <p className="mt-2 text-sm">{o.summary}</p>
                  <Link href={`/services/${o.slug}`} className="arrow-link stretched mt-4">
                    Explore {o.name} <span aria-hidden="true">→</span>
                  </Link>
                </TiltCard>
              </li>
            ))}
          </ul>
          <div className="glass mt-16 flex flex-col items-start justify-between gap-6 rounded-3xl p-8 sm:flex-row sm:items-center sm:p-10" data-reveal>
            <h2 className="display-md max-w-lg">Ready to make your next move count?</h2>
            <Link href={`/contact?service=${s.slug}`} className="btn btn-primary shrink-0">
              Let’s talk <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
