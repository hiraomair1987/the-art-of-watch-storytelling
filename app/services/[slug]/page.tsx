import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SceneLoader from "@/components/SceneLoader";
import TiltCard from "@/components/TiltCard";
import { getService, services, stages } from "@/lib/content";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const s = getService(params.slug);
  if (!s) return {};
  return {
    title: `${s.name} services`,
    description: s.summary,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { title: `${s.name} — efficiovirtual`, description: s.summary, url: `/services/${s.slug}` },
  };
}

export default function ServicePage({ params }: Params) {
  const s = getService(params.slug);
  if (!s) notFound();
  const index = services.indexOf(s);
  const others = services.filter((o) => o.slug !== s.slug);

  return (
    <>
      <SceneLoader detailIndex={index} />

      <section aria-labelledby="svc-title" className="relative flex min-h-[88vh] items-center pb-16 pt-32 max-md:items-end">
        <div className="shell">
          <nav aria-label="Breadcrumb" className="text-sm" data-reveal>
            <ol className="flex flex-wrap items-center gap-2 text-cream-muted">
              <li>
                <Link href="/" className="footer-link">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/#services" className="footer-link">
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
            <p className="eyebrow mt-10" data-reveal>
              {s.short}
            </p>
            <h1 id="svc-title" className="display-xl mt-4" data-reveal style={{ ["--d" as string]: "100ms" }}>
              {s.name}
            </h1>
            <p className="mt-6 text-xl text-cream sm:text-2xl" data-reveal style={{ ["--d" as string]: "200ms" }}>
              {s.summary}
            </p>
            <p className="lede mt-5" data-reveal style={{ ["--d" as string]: "300ms" }}>
              {s.intro}
            </p>
            <div className="mt-9 flex flex-wrap gap-3" data-reveal style={{ ["--d" as string]: "400ms" }}>
              <Link href={`/?service=${s.slug}#contact`} className="btn btn-primary">
                Let’s talk about {s.name} <span aria-hidden="true">→</span>
              </Link>
              <Link href="/#services" className="btn btn-ghost">
                All services
              </Link>
            </div>
          </div>
        </div>
      </section>

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
                  <Link href={`/services/${o.slug}`} className="arrow-link stretched mt-4" aria-label={`${o.name}: see details`}>
                    See details <span aria-hidden="true">→</span>
                  </Link>
                </TiltCard>
              </li>
            ))}
          </ul>
          <div className="glass mt-16 flex flex-col items-start justify-between gap-6 rounded-3xl p-8 sm:flex-row sm:items-center sm:p-10" data-reveal>
            <h2 className="display-md max-w-lg">Ready to make your next move count?</h2>
            <Link href={`/?service=${s.slug}#contact`} className="btn btn-primary shrink-0">
              Let’s talk <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
