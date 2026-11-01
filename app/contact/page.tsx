import type { Metadata } from "next";
import SceneLoader from "@/components/SceneLoader";
import ContactForm from "@/components/ContactForm";
import SocialLinks from "@/components/SocialLinks";
import { site } from "@/lib/site";
import { breadcrumbLd, businessRef, pageMeta } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = pageMeta({
  title: "Contact efficiovirtual | Let’s Talk",
  description:
    "Contact efficiovirtual about Google Ads, SEO, websites and more. Email admin@efficiovirtual.com or send a message about your project.",
  path: "/contact",
  absoluteTitle: true,
});

const jsonLd = [
  breadcrumbLd([["Contact", "/contact"]]),
  {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact efficiovirtual",
    url: `${site.url}/contact`,
    about: { ...businessRef, email: site.contactEmail },
  },
];

export default function ContactPage() {
  return (
    <>
      <SceneLoader fixedState={6} />
      <JsonLd data={jsonLd} />
      <section aria-labelledby="page-title" className="pb-24 pt-48 md:pt-56">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div className="text-halo">
            <p className="eyebrow">
              Contact
            </p>
            <h1 id="page-title" className="display-xl mt-5">
              Let’s talk.
            </h1>
            <p className="lede mt-6 max-w-md">
              Tell us about your brand, your goals and your timing. We read every message and reply with honest next steps.
            </p>
            <div className="mt-8">
              <a href={`mailto:${site.contactEmail}`} className="email-cta">
                <span className="text-[11px] uppercase tracking-[0.2em] text-cream-muted">Email us</span>
                <span className="font-display text-2xl text-cream sm:text-3xl">{site.contactEmail}</span>
              </a>
            </div>
            <div className="mt-8">
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
