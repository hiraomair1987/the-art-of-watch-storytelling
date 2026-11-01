import Link from "next/link";
import { nav, site } from "@/lib/site";
import { services } from "@/lib/content";
import Wordmark from "./Wordmark";
import SocialLinks from "./SocialLinks";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell grid gap-12 py-16 md:grid-cols-[1.5fr_1fr_1fr] md:py-20">
        <div>
          <Link href="/" className="link-quiet text-2xl" aria-label="efficiovirtual — home">
            <Wordmark />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream-muted">
            Strategy, creative and performance marketing for brands that want every digital move to count.
          </p>
          <a href={`mailto:${site.contactEmail}`} className="text-link mt-6 inline-block text-sm">
            {site.contactEmail}
          </a>
          <SocialLinks className="mt-6" />
        </div>
        <nav aria-label="Footer services">
          <h2 className="eyebrow">Services</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="footer-link">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Footer">
          <h2 className="eyebrow">Explore</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="footer-link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="footer-base">
        <div className="shell flex flex-col gap-2 py-5 text-xs sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} efficiovirtual. All rights reserved.</p>
          <p>efficiovirtual.com</p>
        </div>
      </div>
    </footer>
  );
}
