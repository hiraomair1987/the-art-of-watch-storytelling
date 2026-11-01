import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SceneLoader from "@/components/SceneLoader";
import TiltCard from "@/components/TiltCard";
import CtaBand from "@/components/CtaBand";
import { getLocation, locations } from "@/lib/locations";
import { services } from "@/lib/content";
import { site } from "@/lib/site";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const l = getLocation(params.slug);
  if (!l) return {};
  return {
    title: l.title,
    description: l.description,
    alternates: { canonical: `/locations/${l.slug}` },
    openGraph: { title: `${l.title} — efficiovirtual`, description: l.description, url: `/locations/${l.slug}` },
  };
}

export default function LocationPage({ params }: Params) {
  const l = getLocation(params.slug);
  if (!l) notFound();
  const others = locations.filter((o) => o.slug !== l.slug);
  const url = `${site.url}/locations/${l.slug}`;

  // Only verified facts: the service, the provider and the country it is offered in.
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `Digital marketing services in ${l.country}`,
      serviceType: "Digital marketing",
      url,
      description: l.description,
      provider: { "@type": "ProfessionalService", "@id": `${site.url}/#business`, name: "efficiovirtual", url: site.url },
      areaServed: { "@type": "Country", name: l.country },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services",
        itemListElement: services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.name } })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "Where we work", item: `${site.url}/locations` },
        { "@type": "ListItem", position: 3, name: l.country, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: l.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  return (
    <>
      <SceneLoader fixedState={6} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section aria-labelledby="loc-title" className="pb-16 pt-48 md:pt-56">
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
                <Link href="/locations" className="footer-link">
                  Where we work
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-cream">
                {l.country}
              </li>
            </ol>
          </nav>
          <div className="max-w-2xl text-halo">
            <p className="eyebrow mt-10" data-reveal>
              Where we work
            </p>
            <h1 id="loc-title" className="display-lg mt-4" data-reveal style={{ ["--d" as string]: "100ms" }}>
              {l.h1}
            </h1>
            <div className="lede mt-6 space-y-4" data-reveal style={{ ["--d" as string]: "200ms" }}>
              {l.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-9 flex flex-wrap gap-3" data-reveal style={{ ["--d" as string]: "300ms" }}>
              <Link href="/contact" className="btn btn-primary">
                Let’s talk <span aria-hidden="true">→</span>
              </Link>
              <a href="#services-available" className="btn btn-ghost">
                See available services
              </a>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="consider-title" className="py-12">
        <div className="shell">
          <h2 id="consider-title" className="display-md max-w-2xl" data-reveal>
            What we take into account in {l.inSentence}
          </h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {l.considerations.map((c, i) => (
              <li key={c.title} data-reveal style={{ ["--d" as string]: `${i * 80}ms` }}>
                <TiltCard className="h-full p-7">
                  <h3 className="text-2xl">{c.title}</h3>
                  <p className="mt-3">{c.text}</p>
                </TiltCard>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="services-available" aria-labelledby="svc-title" className="scroll-mt-48 py-12">
        <div className="shell">
          <h2 id="svc-title" className="display-md" data-reveal>
            Services available
          </h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <li key={s.slug} data-reveal>
                <TiltCard className="h-full p-5">
                  <h3 className="text-lg">{s.name}</h3>
                  <p className="mt-1.5 text-sm">{s.forWho}</p>
                  <Link href={`/services/${s.slug}`} className="arrow-link stretched mt-3">
                    Explore {s.name} <span aria-hidden="true">→</span>
                  </Link>
                </TiltCard>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="work-title" className="py-12">
        <div className="shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div data-reveal>
            <h2 id="work-title" className="display-md">
              Working together
            </h2>
            <p className="lede mt-5">{l.workingTogether}</p>
            <p className="mt-4">
              Email{" "}
              <a href={`mailto:${site.contactEmail}`} className="text-link">
                {site.contactEmail}
              </a>{" "}
              to start a conversation.
            </p>
          </div>
          <div>
            <h2 className="display-md" data-reveal>
              Common questions
            </h2>
            <div className="mt-6 space-y-3">
              {l.faqs.map((f) => (
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
        </div>
      </section>

      <nav aria-labelledby="other-title" className="py-10">
        <div className="shell">
          <h2 id="other-title" className="eyebrow">
            Other markets we work in
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/locations/${o.slug}`} className="chip">
                  {o.country}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <CtaBand title={`Ready to grow your business in ${l.inSentence}?`} />
    </>
  );
}
