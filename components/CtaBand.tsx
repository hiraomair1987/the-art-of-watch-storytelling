import Link from "next/link";

/** A closing "Let's talk" panel used at the bottom of inner pages. */
export default function CtaBand({ href = "/contact", title = "Ready to make your next move count?" }: { href?: string; title?: string }) {
  return (
    <section aria-label="Get in touch" className="pb-28 pt-8">
      <div className="shell">
        <div className="cta-band flex flex-col items-start justify-between gap-6 rounded-3xl p-8 sm:flex-row sm:items-center sm:p-12" data-reveal>
          <h2 className="display-md max-w-xl">{title}</h2>
          <Link href={href} className="btn btn-primary shrink-0">
            Let’s talk <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
