import Link from "next/link";

type Crumb = { href: string; label: string };

export default function PageIntro({
  eyebrow,
  title,
  children,
  crumbs = [],
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
  crumbs?: Crumb[];
}) {
  return (
    <div className="readable max-w-2xl">
      {crumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-cream-dim">
          <ol className="flex flex-wrap items-center gap-2">
            {crumbs.map((c) => (
              <li key={c.href} className="flex items-center gap-2">
                <Link href={c.href} className="transition-colors hover:text-cream">
                  {c.label}
                </Link>
                <span aria-hidden="true">/</span>
              </li>
            ))}
          </ol>
        </nav>
      )}
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="h-chapter mt-6">{title}</h1>
      {children && <div className="lede mt-6 max-w-xl">{children}</div>}
    </div>
  );
}
