import type { Metadata } from "next";
import { site } from "./site";

/**
 * Builds the full set of SEO tags for a page: title, description, canonical
 * URL, Open Graph (link previews) and Twitter card. Use it in every page so
 * nothing is accidentally inherited from another page.
 *
 * `title` gets " — efficiovirtual" added automatically unless `absoluteTitle` is true.
 * Keep titles under ~60 characters and descriptions under ~155 so Google doesn't cut them off.
 */
export function pageMeta({
  title,
  description,
  path,
  absoluteTitle = false,
  image = "/opengraph-image",
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  /** Link-preview image path. Defaults to the site-wide image. */
  image?: string;
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} — efficiovirtual`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: "efficiovirtual",
      type: "website",
      locale: "en",
      images: [{ url: image, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image] },
  };
}

/** Breadcrumb structured data. `items` are [name, path] pairs, starting after Home. */
export function breadcrumbLd(items: [string, string][]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [["Home", "/"], ...items].map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: `${site.url}${path === "/" ? "" : path}`,
    })),
  };
}

/** Reference to the business entity defined on the homepage. */
export const businessRef = { "@type": "ProfessionalService", "@id": `${site.url}/#business`, name: "efficiovirtual", url: site.url };
