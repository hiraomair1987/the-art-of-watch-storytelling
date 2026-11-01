import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center pt-40">
      <div className="shell">
        <p className="eyebrow">404</p>
        <h1 className="display-lg mt-4">This page drifted out of orbit.</h1>
        <p className="lede mt-5 max-w-md">The link may be old or mistyped. Let’s get you back on course.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-primary">
            Back to home
          </Link>
          <Link href="/contact" className="btn btn-ghost">
            Let’s talk
          </Link>
        </div>
      </div>
    </section>
  );
}
