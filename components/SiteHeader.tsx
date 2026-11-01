"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import Wordmark from "./Wordmark";

/**
 * Three stacked bands: plum utility strip, deep maroon brand bar,
 * a thin plum rule, then a terracotta navigation strip.
 */
export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      {/* Layer 1 · plum utility strip */}
      <div className="hdr-top" aria-hidden={scrolled}>
        <div className="shell flex h-full items-center justify-between text-[11px] uppercase tracking-[0.2em]">
          <p className="hidden sm:block">Strategy · Creative · Performance</p>
          <a href={`mailto:${site.contactEmail}`} className="hdr-top-link normal-case tracking-normal" tabIndex={scrolled ? -1 : undefined}>
            {site.contactEmail}
          </a>
        </div>
      </div>

      {/* Layer 2 · maroon brand bar */}
      <div className="hdr-main">
        <div className="shell flex h-full items-center justify-between gap-6">
          <Link href="/" className="link-quiet text-xl md:text-[1.65rem]" aria-label="efficiovirtual — home">
            <Wordmark />
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden text-[11px] uppercase tracking-[0.2em] text-sand/80 lg:inline">Jump to</span>
            <Link href="/#services" className="hdr-jump hidden lg:inline">
              Services /
            </Link>
            <Link href="/#contact" className="hdr-jump mr-3 hidden lg:inline">
              Contact
            </Link>
            <Link href="/#contact" className="btn btn-primary hidden h-10 px-5 text-sm sm:inline-flex">
              Let&rsquo;s talk
            </Link>
            <button
              type="button"
              className="menu-btn md:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((o) => !o)}
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span aria-hidden="true" className={`menu-icon ${open ? "is-open" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Thin plum rule */}
      <div className="hdr-rule" aria-hidden="true" />

      {/* Layer 3 · terracotta navigation */}
      <nav aria-label="Primary" className="hdr-nav">
        <ul className="shell flex h-full items-center justify-center gap-4 text-[10.5px] uppercase tracking-[0.12em] sm:gap-12 sm:text-[12px] sm:tracking-[0.18em]">
          {nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="nav-link">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <nav id="mobile-nav" aria-label="Mobile" hidden={!open} className="hdr-mobile md:hidden">
        <ul className="shell flex flex-col gap-1 pb-6 pt-3">
          {nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="mobile-link" onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            </li>
          ))}
          <li className="pt-3">
            <Link href="/#contact" className="btn btn-primary w-full" onClick={() => setOpen(false)}>
              Let&rsquo;s talk
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
