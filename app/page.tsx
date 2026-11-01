import type { Metadata } from "next";
import Link from "next/link";
import ChapterNav from "@/components/ChapterNav";
import ContactForm from "@/components/ContactForm";
import ServicesShowcase from "@/components/ServicesShowcase";
import StoryScene from "@/components/scene/StoryScene";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "efficiovirtual — Make your next digital move count" },
  description:
    "efficiovirtual helps brands grow with Google Ads, marketing automation, 3D websites, landing pages and creative design — strategy, creative and performance working as one system.",
  alternates: { canonical: "/" },
};

const stages = [
  {
    name: "Strategy",
    text: "We start with your goals, audience and numbers, then decide which channels, offers and messages deserve your budget — and how we’ll measure each one.",
  },
  {
    name: "Creative",
    text: "Ads, pages and visuals built from that plan, in one consistent voice. Every asset has a job to do and a clear next step for the people who see it.",
  },
  {
    name: "Performance",
    text: "We launch, track and refine — adjusting budgets, targeting and copy based on what the data shows, then feeding what we learn back into the strategy.",
  },
];

const fragments = ["Ads with no shared plan", "A website that doesn’t convert", "Follow-ups done by hand", "Creative that changes every campaign"];

const outcomes = [
  { title: "Reporting you can read", text: "Clear dashboards tied to the goals we agreed, not vanity numbers." },
  { title: "Decisions backed by data", text: "Budget moves towards what works, and away from what doesn’t." },
  { title: "A system that compounds", text: "Each campaign, page and email makes the next one smarter." },
];

function WordmarkReveal() {
  const letters = Array.from(site.name);
  return (
    <p className="wordmark-reveal display text-[clamp(3.2rem,14vw,8.5rem)] font-light italic leading-[0.9] text-cream" aria-label={site.name}>
      {letters.map((l, i) => (
        <span key={i} aria-hidden="true" style={{ ["--i" as string]: i }}>
          {l}
        </span>
      ))}
    </p>
  );
}

export default function HomePage() {
  return (
    <>
      <StoryScene mode="story" />
      <ChapterNav />

      {/* 1 — Opening */}
      <section id="top" data-chapter aria-labelledby="hero-title" className="relative z-10 min-h-[130vh]">
        <div className="sticky top-0 flex min-h-screen items-center pb-16 pt-28">
          <div className="shell">
            <div className="readable max-w-2xl">
              <p className="eyebrow" data-reveal>
                Digital marketing agency
              </p>
              <div className="mt-6">
                <WordmarkReveal />
              </div>
              <h1 id="hero-title" className="display mt-6 max-w-xl text-balance text-[2rem] sm:text-5xl" data-reveal style={{ ["--delay" as string]: "500ms" }}>
                Make your next digital move count.
              </h1>
              <p className="lede mt-6 max-w-lg" data-reveal style={{ ["--delay" as string]: "650ms" }}>
                We help brands grow by joining up strategy, creative and performance marketing — so every campaign, page and email
                pulls in the same direction.
              </p>
              <div className="mt-9 flex flex-wrap gap-3" data-reveal style={{ ["--delay" as string]: "800ms" }}>
                <Link href="#contact" className="btn-primary">
                  Let’s talk <span className="arrow" aria-hidden="true">→</span>
                </Link>
                <Link href="#services" className="btn-ghost">
                  Explore services
                </Link>
              </div>
            </div>
            <div className="mt-16 hidden items-center gap-4 text-xs uppercase tracking-[0.24em] text-cream-dim sm:flex" aria-hidden="true">
              <span className="scroll-cue" />
              Scroll to explore
            </div>
          </div>
        </div>
      </section>

      {/* 2 — The challenge */}
      <section id="challenge" data-chapter aria-labelledby="challenge-title" className="relative z-10 min-h-screen lg:min-h-[200vh]">
        <div className="flex min-h-screen items-center py-24 lg:sticky lg:top-0">
          <div className="shell">
            <div className="readable max-w-xl">
              <p className="eyebrow" data-reveal>
                01 — The challenge
              </p>
              <h2 id="challenge-title" className="h-chapter mt-6" data-reveal>
                Attention is earned. Growth is designed.
              </h2>
              <p className="lede mt-6" data-reveal>
                Most brands don’t lack activity. They lack connection. Ads run in one place, the website lives in another, and
                emails go out on their own. Each piece works hard — but alone.
              </p>
              <ul className="mt-8 flex flex-wrap gap-2" data-reveal aria-label="Common gaps">
                {fragments.map((f) => (
                  <li key={f} className="rounded-full border border-white/10 bg-plum-900/50 px-4 py-2 text-sm text-cream-muted backdrop-blur">
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-[15px] font-medium text-cream" data-reveal>
                We bring the pieces into one plan, so every touchpoint moves people forward.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 — Our approach */}
      <section id="approach" data-chapter aria-labelledby="approach-title" className="relative z-10 min-h-screen lg:min-h-[180vh]">
        <div className="flex min-h-screen items-center py-24 lg:sticky lg:top-0">
          <div className="shell">
            <div className="readable max-w-xl">
              <p className="eyebrow" data-reveal>
                02 — Our approach
              </p>
              <h2 id="approach-title" className="h-chapter mt-6" data-reveal>
                Three stages. One connected system.
              </h2>
              <ol className="mt-10 space-y-7">
                {stages.map((s, i) => (
                  <li key={s.name} className="grid grid-cols-[auto_1fr] gap-x-5" data-reveal style={{ ["--delay" as string]: `${i * 120}ms` }}>
                    <span className="mt-1 flex h-9 w-9 items-center justify-center rounded-full border border-violet-soft/40 bg-plum-900/60 font-display text-sm text-violet-soft">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-2xl font-normal tracking-tight">{s.name}</h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-cream-muted">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* 4 — Our services */}
      <section id="services" data-chapter aria-labelledby="services-title" className="relative z-10 py-28 lg:py-40">
        <div className="shell">
          <div className="max-w-xl">
            <div className="readable">
              <p className="eyebrow" data-reveal>
                03 — Our services
              </p>
              <h2 id="services-title" className="h-chapter mt-6" data-reveal>
                Everything growth needs, working together.
              </h2>
              <p className="lede mt-6" data-reveal>
                Five services, one team. Use one on its own or combine them — they’re designed to share data, messaging and goals.
              </p>
            </div>
            <div className="mt-12">
              <ServicesShowcase />
            </div>
            <p className="mt-8 text-sm text-cream-dim" data-reveal>
              Not sure where to start?{" "}
              <Link href="/services" className="link">
                Compare all services
              </Link>{" "}
              or{" "}
              <Link href="#contact" className="link">
                ask us
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* 5 — The outcome */}
      <section id="outcome" data-chapter aria-labelledby="outcome-title" className="relative z-10 min-h-screen lg:min-h-[180vh]">
        <div className="flex min-h-screen items-center py-24 lg:sticky lg:top-0">
          <div className="shell">
            <div className="readable max-w-xl">
              <p className="eyebrow" data-reveal>
                04 — The outcome
              </p>
              <h2 id="outcome-title" className="h-chapter mt-6" data-reveal>
                Growth you can measure — and keep building on.
              </h2>
              <p className="lede mt-6" data-reveal>
                When strategy, creative and performance share one plan, results stop depending on a single lucky campaign. You
                see what’s working, why, and where to invest next.
              </p>
              <ul className="mt-10 grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
                {outcomes.map((o, i) => (
                  <li key={o.title} className="border-l border-violet-soft/30 pl-5" data-reveal style={{ ["--delay" as string]: `${i * 120}ms` }}>
                    <h3 className="text-base font-semibold text-cream">{o.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-cream-muted">{o.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6 — Closing */}
      <section id="contact" data-chapter aria-labelledby="contact-title" className="relative z-10 pb-28 pt-28 lg:pb-36 lg:pt-40">
        <div className="shell grid items-start gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div className="readable lg:sticky lg:top-32">
            <p className="eyebrow" data-reveal>
              05 — Let’s talk
            </p>
            <h2 id="contact-title" className="h-chapter mt-6" data-reveal>
              Ready to make your next move count?
            </h2>
            <p className="lede mt-6 max-w-md" data-reveal>
              Tell us where you are and where you want to be. We’ll come back with honest thoughts on what to do first — whether
              that’s a campaign, a page or a complete system.
            </p>
            <p className="mt-8 text-sm text-cream-dim" data-reveal>
              Or email us directly at{" "}
              <a href={`mailto:${site.contactEmail}`} className="link">
                {site.contactEmail}
              </a>
            </p>
          </div>
          <div data-reveal>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
