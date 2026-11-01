import Link from "next/link";
import SceneLoader from "@/components/SceneLoader";
import ChapterRail from "@/components/ChapterRail";
import TiltCard from "@/components/TiltCard";
import ServiceInView from "@/components/ServiceInView";
import ContactForm from "@/components/ContactForm";
import Wordmark from "@/components/Wordmark";
import { services, stages } from "@/lib/content";
import { site } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "efficiovirtual",
  url: site.url,
  email: site.contactEmail,
  description: site.description,
  makesOffer: services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.name, description: s.summary } })),
};

export default function Home() {
  return (
    <>
      <SceneLoader />
      <ChapterRail />
      <ServiceInView />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* 01 · Opening */}
      <section id="top" data-chapter data-state-start="0" aria-labelledby="hero-title" className="chapter chapter-tall" style={{ minHeight: "150vh" }}>
        <div className="chapter-pin">
          <div className="shell">
            <div className="max-w-2xl text-halo">
              <p className="text-2xl text-cream sm:text-3xl" data-reveal>
                <Wordmark />
              </p>
              <h1 id="hero-title" className="display-xl mt-6" data-reveal style={{ ["--d" as string]: "120ms" }}>
                Make your next digital move <em className="italic text-accent">count.</em>
              </h1>
              <p className="lede mt-6 max-w-lg" data-reveal style={{ ["--d" as string]: "240ms" }}>
                We help brands grow by joining sharp strategy, standout creative and performance marketing that’s measured
                every step of the way.
              </p>
              <div className="mt-9 flex flex-wrap gap-3" data-reveal style={{ ["--d" as string]: "360ms" }}>
                <Link href="#contact" className="btn btn-primary">
                  Let’s talk <span aria-hidden="true">→</span>
                </Link>
                <Link href="#services" className="btn btn-ghost">
                  Explore services
                </Link>
              </div>
            </div>
          </div>
          <a href="#challenge" className="scroll-cue absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.24em] text-cream-muted hover:text-cream focus-visible:text-cream">
            Scroll to begin
          </a>
        </div>
      </section>

      {/* 02 · The challenge */}
      <section id="challenge" data-chapter data-state-start="1" data-state-end="2" aria-labelledby="challenge-title" className="chapter chapter-tall" style={{ minHeight: "220vh" }}>
        <div className="chapter-pin">
          <div className="shell text-center">
            <p className="eyebrow" data-reveal>
              The challenge
            </p>
            <h2 id="challenge-title" className="display-lg text-halo mx-auto mt-5 max-w-4xl" data-reveal style={{ ["--d" as string]: "100ms" }}>
              Attention is earned. <br className="hidden sm:block" />
              Growth is designed.
            </h2>
            <p className="lede text-halo mx-auto mt-6 max-w-xl" data-reveal style={{ ["--d" as string]: "200ms" }}>
              Ads in one place, a website in another, emails nobody owns. Scattered efforts make noise. When every piece is
              planned to work together, they start to move people.
            </p>
          </div>
        </div>
      </section>

      {/* 03 · Our approach */}
      <section id="approach" data-chapter data-state-start="3" aria-labelledby="approach-title" className="chapter chapter-tall unpin-md">
        <div className="chapter-pin">
          <div className="shell">
            <div className="max-w-2xl text-halo">
              <p className="eyebrow" data-reveal>
                Our approach
              </p>
              <h2 id="approach-title" className="display-md mt-4" data-reveal style={{ ["--d" as string]: "100ms" }}>
                Three stages, one connected system.
              </h2>
            </div>
            <ol className="mt-[26vh] grid gap-4 md:grid-cols-3 lg:mt-[30vh]">
              {stages.map((s, i) => (
                <li key={s.name} data-reveal style={{ ["--d" as string]: `${150 + i * 120}ms` }}>
                  <TiltCard className="h-full p-6 sm:p-7">
                    <p className="flex items-center gap-3 text-sm text-violet-300">
                      <span className="grid h-7 w-7 place-items-center rounded-full border border-violet-300/40 text-xs tabular-nums">{i + 1}</span>
                      <span className="h-px flex-1 bg-gradient-to-r from-violet-300/40 to-transparent" aria-hidden="true" />
                    </p>
                    <h3 className="mt-5 text-2xl sm:text-[1.7rem]">{s.name}</h3>
                    <p className="mt-2 text-cream">{s.line}</p>
                    <ul className="mt-4 space-y-1.5 text-sm">
                      {s.points.map((p) => (
                        <li key={p} className="flex gap-2.5">
                          <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </TiltCard>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 04 · Our services */}
      <section id="services" data-chapter data-state-start="4" aria-labelledby="services-title" className="chapter chapter-tall unpin-md">
        <div className="chapter-pin">
          <div className="shell">
            <div className="flex flex-col justify-between gap-4 text-halo md:flex-row md:items-end">
              <div className="max-w-xl">
                <p className="eyebrow" data-reveal>
                  Our services
                </p>
                <h2 id="services-title" className="display-md mt-4" data-reveal style={{ ["--d" as string]: "100ms" }}>
                  Five ways we move your brand forward.
                </h2>
              </div>
              <p className="max-w-sm text-sm" data-reveal style={{ ["--d" as string]: "200ms" }}>
                Use one on its own, or combine them into a single plan. Each one is a piece of the same connected system.
              </p>
            </div>
            <ul className="mt-[30vh] grid gap-3 sm:grid-cols-2 lg:mt-[26vh] lg:grid-cols-5">
              {services.map((s, i) => (
                <li key={s.slug} data-reveal style={{ ["--d" as string]: `${120 + i * 80}ms` }}>
                  <TiltCard serviceIndex={i} className="flex h-full flex-col p-5">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-violet-300">{s.short}</p>
                    <h3 className="mt-3 text-[1.45rem] leading-tight">{s.name}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed">{s.summary}</p>
                    <Link href={`/services/${s.slug}`} className="arrow-link stretched mt-5" aria-label={`${s.name}: see details`}>
                      See details <span aria-hidden="true">→</span>
                    </Link>
                  </TiltCard>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 05 · The outcome */}
      <section id="outcome" data-chapter data-state-start="5" aria-labelledby="outcome-title" className="chapter chapter-tall">
        <div className="chapter-pin">
          <div className="shell">
            <div className="max-w-xl text-halo">
              <p className="eyebrow" data-reveal>
                The outcome
              </p>
              <h2 id="outcome-title" className="display-lg mt-5" data-reveal style={{ ["--d" as string]: "100ms" }}>
                Growth you can measure, and keep.
              </h2>
              <p className="lede mt-6" data-reveal style={{ ["--d" as string]: "200ms" }}>
                No guesswork and no quick spikes that fade. Every channel is tracked, every decision has a reason, and each
                step builds on the last — so progress is clear today and still compounding next year.
              </p>
              <ul className="mt-8 grid gap-3 text-sm sm:grid-cols-2" data-reveal style={{ ["--d" as string]: "300ms" }}>
                {["Tracking you can trust", "Reporting in plain language", "Budget that follows results", "Systems that keep working"].map((x) => (
                  <li key={x} className="flex items-center gap-3 text-cream">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_#f07ac8]" aria-hidden="true" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 06 · Closing */}
      <section id="contact" data-chapter data-state-start="6" aria-labelledby="contact-title" className="chapter">
        <div className="shell grid gap-12 pb-24 pt-44 lg:min-h-screen lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-16">
          <div className="text-halo">
            <p className="eyebrow" data-reveal>
              Let’s talk
            </p>
            <h2 id="contact-title" className="display-lg mt-5" data-reveal style={{ ["--d" as string]: "100ms" }}>
              Ready to make your next move count?
            </h2>
            <p className="lede mt-6 max-w-md" data-reveal style={{ ["--d" as string]: "200ms" }}>
              Tell us where you are and where you want to be. We’ll reply with honest next steps — even if that means
              starting small.
            </p>
            <p className="mt-8 text-sm" data-reveal style={{ ["--d" as string]: "300ms" }}>
              Prefer email?{" "}
              <a href={`mailto:${site.contactEmail}`} className="text-link">
                {site.contactEmail}
              </a>
            </p>
          </div>
          <div className="glass rounded-3xl p-6 sm:p-9" data-reveal style={{ ["--d" as string]: "200ms" }}>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
