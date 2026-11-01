import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageIntro from "@/components/PageIntro";
import ServiceIcon from "@/components/ServiceIcon";
import StoryScene from "@/components/scene/StoryScene";
import { getService, services } from "@/lib/services";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const s = getService(params.slug);
  if (!s) return {};
  return {
    title: `${s.name} services`,
    description: `${s.summary} ${s.name} by efficiovirtual.`,
    alternates: { canonical: `/services/${s.slug}` },
  };
}

export default function ServicePage({ params }: Params) {
  const s = getService(params.slug);
  if (!s) notFound();
  const others = services.filter((o) => o.slug !== s.slug);

  return (
    <>
      <StoryScene mode="static" story={3} focus={s.index} />
      <div className="relative z-10 pb-28 pt-36 lg:pt-44">
        <div className="shell">
          <div className="max-w-2xl">
            <PageIntro
              eyebrow={`Service 0${s.index + 1} · ${s.short}`}
              title={s.name}
              crumbs={[
                { href: "/", label: "Home" },
                { href: "/services", label: "Services" },
              ]}
            >
              {s.intro}
            </PageIntro>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href={`/contact?service=${s.slug}`} className="btn-primary">
                Talk to us about {s.name} <span className="arrow" aria-hidden="true">→</span>
              </Link>
              <Link href="/services" className="btn-ghost">
                All services
              </Link>
            </div>
          </div>

          <section aria-labelledby="included" className="mt-24 max-w-2xl">
            <h2 id="included" className="display text-3xl sm:text-4xl">
              What’s included
            </h2>
            <ul className="glass mt-8 grid gap-x-8 gap-y-4 p-6 sm:grid-cols-2 sm:p-8">
              {s.included.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-cream-muted">
                  <svg viewBox="0 0 20 20" aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-magenta" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 10.5l4 4 8-9" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="process" className="mt-20 max-w-2xl">
            <h2 id="process" className="display text-3xl sm:text-4xl">
              How we work
            </h2>
            <ol className="mt-8 grid gap-4 sm:grid-cols-3">
              {s.process.map((p, i) => (
                <li key={p.title} className="glass p-6" data-reveal style={{ ["--delay" as string]: `${i * 100}ms` }}>
                  <span className="font-display text-sm text-violet-soft">0{i + 1}</span>
                  <h3 className="mt-3 text-lg font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream-muted">{p.text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="fit" className="mt-20 max-w-2xl">
            <h2 id="fit" className="display text-3xl sm:text-4xl">
              A good fit for
            </h2>
            <ul className="mt-6 space-y-3">
              {s.fit.map((f) => (
                <li key={f} className="border-l border-violet-soft/30 pl-5 text-[15px] text-cream-muted">
                  {f}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="related" className="mt-24">
            <h2 id="related" className="text-xs font-semibold uppercase tracking-[0.24em] text-cream-dim">
              Works well with
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/services/${o.slug}`}
                    className="glass group flex items-center gap-4 p-5 transition duration-300 hover:-translate-y-0.5 hover:border-violet-soft/40 focus-visible:border-violet-soft/40"
                  >
                    <span className="text-violet-soft transition-colors group-hover:text-cream">
                      <ServiceIcon index={o.index} className="h-8 w-8" />
                    </span>
                    <span className="font-display text-lg text-cream">{o.name}</span>
                    <span aria-hidden="true" className="ml-auto text-cream-dim transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="glass mt-24 flex flex-col items-start gap-6 p-8 sm:p-10 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="display text-3xl">Let’s make your next move count.</h2>
              <p className="mt-2 text-cream-muted">Tell us about your goals and we’ll suggest a sensible first step.</p>
            </div>
            <Link href={`/contact?service=${s.slug}`} className="btn-primary shrink-0">
              Let’s talk <span className="arrow" aria-hidden="true">→</span>
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}
