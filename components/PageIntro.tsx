import type { ReactNode } from "react";

/** The opening block used at the top of inner pages (Services, About, Contact). */
export default function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return (
    <section aria-labelledby="page-title" className="pb-12 pt-48 md:pb-16 md:pt-56">
      <div className="shell">
        <div className="max-w-3xl text-halo">
          <p className="eyebrow">
            {eyebrow}
          </p>
          <h1 id="page-title" className="display-xl mt-5">
            {title}
          </h1>
          {children && (
            <div className="lede mt-6 max-w-2xl">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
