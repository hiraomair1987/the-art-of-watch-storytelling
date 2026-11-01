import type { Metadata } from "next";
import Link from "next/link";
import SceneLoader from "@/components/SceneLoader";
import PageIntro from "@/components/PageIntro";
import TiltCard from "@/components/TiltCard";
import CtaBand from "@/components/CtaBand";
import { locations } from "@/lib/locations";
import { site } from "@/lib/site";
import { breadcrumbLd, pageMeta } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = pageMeta({
  title: "Where We Work: USA, UAE, Canada, UK & Pakistan",
  description:
    "efficiovirtual works remotely with businesses in the USA, UAE, Canada, UK and Pakistan. See how we adapt digital marketing to each market.",
  path: "/locations",
});

const jsonLd = [
  breadcrumbLd([["Where we work", "/locations"]]),
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Markets efficiovirtual works in",
    itemListElement: locations.map((l, i) => ({ "@type": "ListItem", position: i + 1, name: l.country, url: `${site.url}/locations/${l.slug}` })),
  },
];

export default function LocationsPage() {
  return (
    <>
      <SceneLoader fixedState={2} />
      <JsonLd data={jsonLd} />
      <PageIntro eyebrow="Where we work" title="One remote team, five markets.">
        <p>
          We work remotely with businesses in the USA, the UAE, Canada, the UK and Pakistan. Each market has its own
          language, rules and buying habits — choose yours to see what we take into account.
        </p>
      </PageIntro>
      <section aria-label="Markets" className="pb-16">
        <ul className="shell grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {locations.map((l, i) => (
            <li key={l.slug} data-reveal style={{ ["--d" as string]: `${i * 80}ms` }}>
              <TiltCard className="flex h-full flex-col p-7">
                <h2 className="text-2xl">{l.country}</h2>
                <p className="mt-3 flex-1 text-[15px]">{l.intro[0]}</p>
                <Link href={`/locations/${l.slug}`} className="arrow-link stretched mt-5">
                  Digital marketing in {l.inSentence} <span aria-hidden="true">→</span>
                </Link>
              </TiltCard>
            </li>
          ))}
        </ul>
      </section>
      <CtaBand />
    </>
  );
}
