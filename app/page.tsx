import Link from "next/link";
import SceneLoader from "@/components/SceneLoader";
import ChapterRail from "@/components/ChapterRail";
import TiltCard from "@/components/TiltCard";
import ServiceInView from "@/components/ServiceInView";
import ContactForm from "@/components/ContactForm";
import SocialLinks from "@/components/SocialLinks";
import { processSteps, services, stages } from "@/lib/content";
import { site, socials } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "efficiovirtual",
  url: site.url,
  email: site.contactEmail,
  description: site.description,
  sameAs: socials.map((s) => s.href),
  makesOffer: services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.name, description: s.summary } })),
};

/* Each <section data-chapter> is one chapter of the story. The numbers in
   data-state-start / data-state-end tell the 3D scene which layout to show. */
export default function Home() {
  return (
    <>
      <SceneLoader />
      <ChapterRail />
      <ServiceInView />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* 01 · Hero */}
      <section id="top" data-chapter data-state-start="0" aria-labelledby="hero-title" className="chapter chapter-tall" style={{ minHeight: "150vh" }}>
        <div className="chapter-pin">
          <div className="shell">
            <div className="max-w-2xl text-halo">
              <p className="eyebrow" data-reveal>
                Digital marketing studio
              </p>
              <h1 id="hero-title" className="display-xl mt-5" data-reveal style={{ ["--d" as string]: "120ms" }}>
                Make your next digital move <em className="italic text-accent">count.</em>
              </h1>
              <p className="lede mt-6 max-w-lg" data-reveal style={{ ["--d" as string]: "240ms" }}>
                efficiovirtual helps brands grow by joining clear strategy, standout creative and performance marketing — Google
                Ads, automation, 3D websites, landing pages and design, working as one.
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
          <a href="#challenge" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.24em] text-cream-muted hover:text-cream focus-visible:text-cream">
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
              When marketing is scattered, growth feels like guesswork.
            </h2>
            <p className="lede text-halo mx-auto mt-6 max-w-xl" data-reveal style={{ ["--d" as string]: "200ms" }}>
              Ads run in one place, the website lives in another, emails go out when someone remembers. Each piece might work
              on its own — but nobody can say what’s really driving results. Bring them together, and the picture gets clear.
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
                Strategy, creative and performance — connected.
              </h2>
            </div>
            <ol className="mt-[22vh] grid gap-4 md:grid-cols-3 lg:mt-[26vh]">
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

      {/* 04 · Services */}
      <section id="services" data-chapter data-state-start="4" aria-labelledby="services-title" className="chapter chapter-tall unpin-md">
        <div className="chapter-pin">
          <div className="shell">
            <div className="flex flex-col justify-between gap-4 text-halo md:flex-row md:items-end">
              <div className="max-w-xl">
                <p className="eyebrow" data-reveal>
                  Services
                </p>
                <h2 id="services-title" className="display-md mt-4" data-reveal style={{ ["--d" as string]: "100ms" }}>
                  Five ways we move your brand forward.
                </h2>
              </div>
              <p className="max-w-sm text-sm" data-reveal style={{ ["--d" as string]: "200ms" }}>
                Choose one, or combine them into a single plan. Every service is built to work with the others.{" "}
                <Link href="/services" className="text-link">
                  Compare all services
                </Link>
              </p>
            </div>
            <ul className="mt-[26vh] grid gap-3 sm:grid-cols-2 lg:mt-[22vh] lg:grid-cols-5">
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

      {/* 05 · Process */}
      <section id="process" data-chapter data-state-start="5" aria-labelledby="process-title" className="chapter chapter-tall">
        <div className="chapter-pin">
          <div className="shell">
            <div className="max-w-xl text-halo">
              <p className="eyebrow" data-reveal>
                Process
              </p>
              <h2 id="process-title" className="display-md mt-4" data-reveal style={{ ["--d" as string]: "100ms" }}>
                Three steps, repeated until it works.
              </h2>
              <ol className="mt-7 space-y-3">
                {processSteps.map((step, i) => (
                  <li key={step.name} data-reveal style={{ ["--d" as string]: `${200 + i * 120}ms` }}>
                    <TiltCard className="flex gap-5 px-5 py-4 sm:px-6">
                      <span className="font-display text-3xl leading-none text-accent tabular-nums" aria-hidden="true">
                        0{i + 1}
                      </span>
                      <div>
                        <h3 className="text-xl sm:text-2xl">{step.name}</h3>
                        <p className="mt-1 text-cream">{step.line}</p>
                        <p className="mt-2 text-sm">{step.detail}</p>
                      </div>
                    </TiltCard>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* 06 · Contact */}
      <section id="contact" data-chapter data-state-start="6" aria-labelledby="contact-title" className="chapter">
        <div className="shell grid gap-12 pb-24 pt-44 lg:min-h-screen lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
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
            <div className="mt-8" data-reveal style={{ ["--d" as string]: "300ms" }}>
              <a href={`mailto:${site.contactEmail}`} className="email-cta">
                <span className="text-[11px] uppercase tracking-[0.2em] text-cream-muted">Email us</span>
                <span className="font-display text-2xl text-cream sm:text-3xl">{site.contactEmail}</span>
              </a>
            </div>
            <div className="mt-8" data-reveal style={{ ["--d" as string]: "400ms" }}>
              <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-cream-muted">Follow efficiovirtual</p>
              <SocialLinks size="lg" />
            </div>
          </div>
          <div className="glass rounded-3xl p-6 sm:p-9" data-reveal style={{ ["--d" as string]: "200ms" }}>
            <h3 className="mb-6 text-2xl">Or send a quick message</h3>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
