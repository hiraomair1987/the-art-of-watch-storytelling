import Link from "next/link";
import Wordmark from "./Wordmark";
import { services } from "@/lib/services";
import { nav, site } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-white/[0.08] bg-plum-950/85 backdrop-blur-xl">
      <div className="shell grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:py-20">
        <div className="max-w-sm">
          <Wordmark />
          <p className="mt-5 text-sm leading-relaxed text-cream-dim">
            A digital marketing agency bringing strategy, creative and performance together — so every move you make online counts.
          </p>
          <a href={`mailto:${site.contactEmail}`} className="link mt-6 inline-block text-sm">
            {site.contactEmail}
          </a>
        </div>

        <nav aria-label="Services">
          <h2 className="text-xs font-semibold uppercase tracking-[0.24em] text-cream-dim">Services</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="text-cream-muted transition-colors hover:text-cream focus-visible:text-cream">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer">
          <h2 className="text-xs font-semibold uppercase tracking-[0.24em] text-cream-dim">Company</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-cream-muted transition-colors hover:text-cream focus-visible:text-cream">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/services" className="text-cream-muted transition-colors hover:text-cream focus-visible:text-cream">
                All services
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="shell flex flex-col gap-3 border-t border-white/[0.06] py-6 text-xs text-cream-dim sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} efficiovirtual. All rights reserved.</p>
        <p>Strategy · Creative · Performance</p>
      </div>
    </footer>
  );
}
