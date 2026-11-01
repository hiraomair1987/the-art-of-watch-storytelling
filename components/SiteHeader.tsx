"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { nav } from "@/lib/site";
import Wordmark from "./Wordmark";

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
    <header className={`site-header ${scrolled || open ? "is-solid" : ""}`}>
      <div className="shell flex h-16 items-center justify-between gap-6 md:h-20">
        <Link href="/" className="link-quiet text-xl md:text-2xl" aria-label="efficiovirtual — home">
          <Wordmark />
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="nav-link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
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

      <nav id="mobile-nav" aria-label="Mobile" hidden={!open} className="md:hidden">
        <ul className="shell flex flex-col gap-1 pb-6 pt-2">
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
