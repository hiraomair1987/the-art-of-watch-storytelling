import type { Metadata } from "next";
import SceneLoader from "@/components/SceneLoader";
import ContactForm from "@/components/ContactForm";
import SocialLinks from "@/components/SocialLinks";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with efficiovirtual at admin@efficiovirtual.com or send a message about your project.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <SceneLoader fixedState={6} />
      <section aria-labelledby="page-title" className="pb-24 pt-48 md:pt-56">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div className="text-halo">
            <p className="eyebrow" data-reveal>
              Contact
            </p>
            <h1 id="page-title" className="display-xl mt-5" data-reveal style={{ ["--d" as string]: "100ms" }}>
              Let’s talk.
            </h1>
            <p className="lede mt-6 max-w-md" data-reveal style={{ ["--d" as string]: "200ms" }}>
              Tell us about your brand, your goals and your timing. We read every message and reply with honest next steps.
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
            <h2 className="mb-6 text-2xl">Send a message</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
