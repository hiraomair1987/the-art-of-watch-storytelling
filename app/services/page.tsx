import type { Metadata } from "next";
import Link from "next/link";
import SceneLoader from "@/components/SceneLoader";
import PageIntro from "@/components/PageIntro";
import TiltCard from "@/components/TiltCard";
import CtaBand from "@/components/CtaBand";
import { services } from "@/lib/content";
import { site } from "@/lib/site";
import { breadcrumbLd, pageMeta } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = pageMeta({
  title: "Digital Marketing Services",
  description:
    "Google Ads, SEO, social media, marketing automation, websites, 3D web design, landing pages and creative design — explore efficiovirtual’s services.",
  path: "/services",
});

const jsonLd = [
  breadcrumbLd([["Services", "/services"]]),
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "efficiovirtual services",
    itemListElement: services.map((s, i) => ({ "@type": "ListItem", position: i + 1, name: s.name, url: `${site.url}/services/${s.slug}` })),
  },
];

export default function ServicesPage() {
  return (
    <>
      <SceneLoader fixedState={4} />
      <JsonLd data={jsonLd} />
      <PageIntro eyebrow="Services" title="Everything you need to grow, working together.">
        <p>Eight services, each useful on its own and stronger together. Here’s what each one does and what it includes.</p>
      </PageIntro>

      <nav aria-label="On this page" className="pb-10">
        <ul className="shell flex flex-wrap gap-2">
          {services.map((s) => (
            <li key={s.slug}>
              <a href={`#${s.slug}`} className="chip">
                {s.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="shell space-y-6 pb-16">
        {services.map((s, i) => (
          <section key={s.slug} id={s.slug} aria-labelledby={`${s.slug}-title`} className="scroll-mt-48" data-reveal>
            <TiltCard serviceIndex={i} className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[1.1fr_1fr]">
              <div>
                <p className="text-sm tabular-nums text-violet-300">0{i + 1} · {s.short}</p>
                <h2 id={`${s.slug}-title`} className="display-md mt-3">
                  {s.name}
                </h2>
                <p className="mt-4 text-lg text-cream">{s.summary}</p>
                <p className="mt-3">{s.intro}</p>
                <div className="relative z-10 mt-7 flex flex-wrap gap-3">
                  <Link href={`/services/${s.slug}`} className="btn btn-ghost">
                    More about {s.name}
                  </Link>
                  <Link href={`/contact?service=${s.slug}`} className="arrow-link self-center">
                    Discuss this service <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
              <div>
                <h3 className="eyebrow">What’s included</h3>
                <ul className="mt-4 space-y-3">
                  {s.includes.map((x) => (
                    <li key={x} className="flex gap-3 text-cream">
                      <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          </section>
        ))}
      </div>
      <CtaBand />
    </>
  );
}
