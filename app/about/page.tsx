import type { Metadata } from "next";
import SceneLoader from "@/components/SceneLoader";
import PageIntro from "@/components/PageIntro";
import TiltCard from "@/components/TiltCard";
import CtaBand from "@/components/CtaBand";
import { processSteps, stages } from "@/lib/content";
import { site } from "@/lib/site";
import { breadcrumbLd, businessRef, pageMeta } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = pageMeta({
  title: "About efficiovirtual | Digital Marketing Agency",
  description:
    "efficiovirtual is a digital marketing agency joining strategy, creative and performance marketing so every part of your marketing works together.",
  path: "/about",
  absoluteTitle: true,
});

const jsonLd = [
  breadcrumbLd([["About", "/about"]]),
  { "@context": "https://schema.org", "@type": "AboutPage", name: "About efficiovirtual", url: `${site.url}/about`, about: businessRef },
];

const beliefs = [
  {
    title: "Connected beats busy",
    text: "More channels don’t mean more growth. A few pieces that work together will outperform many that don’t.",
  },
  {
    title: "Honest numbers only",
    text: "We set up tracking properly, report what actually happened, and never promise results we can’t stand behind.",
  },
  {
    title: "Craft still matters",
    text: "Performance marketing works better when the creative is good. We care about both, equally.",
  },
];

export default function AboutPage() {
  return (
    <>
      <SceneLoader fixedState={2} />
      <JsonLd data={jsonLd} />
      <PageIntro eyebrow="About efficiovirtual" title="A studio for brands that want growth to make sense.">
        <p>
          efficiovirtual is a digital marketing studio. We plan, build and run the pieces that bring customers in — ads,
          automations, websites, landing pages and creative — and we make them work as one system you can understand.
        </p>
      </PageIntro>

      <section aria-labelledby="beliefs-title" className="py-12">
        <div className="shell">
          <h2 id="beliefs-title" className="display-md max-w-xl" data-reveal>
            What we believe
          </h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {beliefs.map((b, i) => (
              <li key={b.title} data-reveal style={{ ["--d" as string]: `${i * 100}ms` }}>
                <TiltCard className="h-full p-7">
                  <h3 className="text-2xl">{b.title}</h3>
                  <p className="mt-3">{b.text}</p>
                </TiltCard>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="how-title" className="py-12">
        <div className="shell grid gap-10 lg:grid-cols-2">
          <div data-reveal>
            <h2 id="how-title" className="display-md">
              How we think
            </h2>
            <ul className="mt-6 space-y-5">
              {stages.map((s) => (
                <li key={s.name} className="border-b border-cream/10 pb-5 last:border-0">
                  <h3 className="text-xl">{s.name}</h3>
                  <p className="mt-1">{s.line}</p>
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal style={{ ["--d" as string]: "120ms" }}>
            <h2 className="display-md">How we work</h2>
            <ol className="mt-6 space-y-5">
              {processSteps.map((s, i) => (
                <li key={s.name} className="flex gap-4 border-b border-cream/10 pb-5 last:border-0">
                  <span className="font-display text-2xl text-accent" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="text-xl">{s.name}</h3>
                    <p className="mt-1">{s.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <CtaBand title="Let’s see where your next move should be." />
    </>
  );
}
