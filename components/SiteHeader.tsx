"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/lib/site";
import { services } from "@/lib/content";
import Wordmark from "./Wordmark";

/**
 * Three-band header:
 *  1. thin deep-plum strip (email)
 *  2. dark-burgundy bar (logo, main navigation, "Let's talk")
 *  3. terracotta strip (links to each service)
 */
export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu after navigating.
  useEffect(() => setOpen(false), [pathname]);

  // Mobile menu: Escape closes it, focus moves into it when it opens.
  useEffect(() => {
    if (!open) return;
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      {/* Band 1 · thin deep-plum strip */}
      <div className="hdr-top">
        <div className="shell flex h-full items-center justify-between gap-4 text-[11px] tracking-[0.14em]">
          <p className="hidden uppercase md:block">Google Ads · SEO · Social Media · Web Development</p>
          <a href={`mailto:${site.contactEmail}`} className="hdr-top-link">
            {site.contactEmail}
          </a>
        </div>
      </div>

      {/* Band 2 · dark-burgundy main navigation */}
      <div className="hdr-main">
        <div className="shell flex h-full items-center justify-between gap-6">
          <Link href="/" className="link-quiet text-xl md:text-[1.55rem]" aria-label="efficiovirtual — home">
            <Wordmark />
          </Link>

          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-8 text-[15px]">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="nav-link" aria-current={isActive(item.href) ? "page" : undefined}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/contact" className="btn btn-primary hidden h-10 px-5 text-sm sm:inline-flex">
              Let&rsquo;s talk
            </Link>
            <button
              ref={buttonRef}
              type="button"
              className="menu-btn md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span aria-hidden="true" className={`menu-icon ${open ? "is-open" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Band 3 · terracotta services strip */}
      <nav aria-label="Services" className="hdr-services">
        <ul className="shell hdr-services-list">
          {services.map((s) => (
            <li key={s.slug}>
              <Link href={`/services/${s.slug}`} className="svc-link" aria-current={pathname === `/services/${s.slug}` ? "page" : undefined}>
                {s.navLabel}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile menu */}
      <div id="mobile-menu" ref={menuRef} hidden={!open} className="hdr-mobile md:hidden">
        <nav aria-label="Mobile">
          <ul className="shell flex flex-col gap-1 pb-6 pt-4">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="mobile-link" aria-current={isActive(item.href) ? "page" : undefined} onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-3">
              <Link href="/contact" className="btn btn-primary w-full" onClick={() => setOpen(false)}>
                Let&rsquo;s talk
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
