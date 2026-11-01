import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import ServicesShowcase from "@/components/ServicesShowcase";
import StoryScene from "@/components/scene/StoryScene";

export const metadata: Metadata = {
  title: "Services — Google Ads, automation, 3D websites, landing pages and creative",
  description:
    "Explore efficiovirtual’s services: Google Ads, marketing automation, 3D websites, landing pages and creative design — built to work together.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <StoryScene mode="static" story={3} focus={0} />
      <div className="relative z-10 pb-28 pt-36 lg:pt-44">
        <div className="shell">
          <div className="max-w-xl">
            <PageIntro eyebrow="Our services" title="Five services, one connected system." crumbs={[{ href: "/", label: "Home" }]}>
              Each service stands on its own, and each one is stronger alongside the others. Choose a starting point below, or tell us
              your goal and we’ll recommend one.
            </PageIntro>
            <div className="mt-14">
              <ServicesShowcase />
            </div>
            <div className="mt-12 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">
                Let’s talk <span className="arrow" aria-hidden="true">→</span>
              </Link>
              <Link href="/#approach" className="btn-ghost">
                See our approach
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
