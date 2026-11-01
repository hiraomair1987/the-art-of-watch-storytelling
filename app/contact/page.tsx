import type { Metadata } from "next";
import { Suspense } from "react";
import ContactForm from "@/components/ContactForm";
import ContactFormFromQuery from "@/components/ContactFormFromQuery";
import PageIntro from "@/components/PageIntro";
import StoryScene from "@/components/scene/StoryScene";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — Let’s talk",
  description: "Tell efficiovirtual about your goals. Get in touch about Google Ads, marketing automation, 3D websites, landing pages or creative design.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <StoryScene mode="static" story={5} />
      <div className="relative z-10 pb-28 pt-36 lg:pt-44">
        <div className="shell grid items-start gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div>
            <PageIntro eyebrow="Let’s talk" title="Make your next digital move count." crumbs={[{ href: "/", label: "Home" }]}>
              Share a little about your business and what you’d like to achieve. We’ll reply with honest thoughts and a suggested
              first step.
            </PageIntro>
            <dl className="readable mt-10 space-y-5 text-[15px]">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.24em] text-cream-dim">Email</dt>
                <dd className="mt-1.5">
                  <a href={`mailto:${site.contactEmail}`} className="link">
                    {site.contactEmail}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.24em] text-cream-dim">What to include</dt>
                <dd className="mt-1.5 max-w-sm text-cream-muted">Your goals, your timeline, and anything you’ve already tried.</dd>
              </div>
            </dl>
          </div>
          <Suspense fallback={<ContactForm />}>
            <ContactFormFromQuery />
          </Suspense>
        </div>
      </div>
    </>
  );
}
