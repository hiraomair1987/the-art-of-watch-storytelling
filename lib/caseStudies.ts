/**
 * CASE STUDIES — edit this file to add your real projects.
 *
 * Each entry starts as a placeholder (`published: false`). Placeholders show on
 * the Case Studies page as "coming soon" cards and are hidden from Google.
 *
 * To publish one:
 *   1. Fill in client, title, summary, challenge, approach and results with
 *      real, approved information (get the client's permission first).
 *   2. Optional: add an image to /public/case-studies/ (e.g. "client-name.jpg",
 *      about 1600×1000 px) and set `image: "/case-studies/client-name.jpg"`.
 *   3. Change `published` to `true`.
 * The case study then gets its own page at /case-studies/<slug>, appears in the
 * sitemap, and the Case Studies page becomes visible to Google.
 */

export type CaseStudy = {
  /** Web address: /case-studies/<slug>. Use lowercase words joined by hyphens. */
  slug: string;
  published: boolean;
  /** Short headline, e.g. "Rebuilding a Google Ads account for a dental clinic". */
  title: string;
  client: string;
  industry: string;
  country: string;
  /** Service slugs from lib/content.ts, e.g. ["google-ads", "landing-pages"]. */
  services: string[];
  /** One or two sentences shown on the card. */
  summary: string;
  /** Headline result shown on the showcase card, e.g. "73% more leads". Real results only. */
  metric?: string;
  challenge: string;
  approach: string;
  /** Real, verifiable results only — e.g. "Cost per lead down 32% in 90 days". */
  results: string[];
  /** Optional client quote (with permission). */
  quote?: { text: string; name: string; role: string };
  /** Optional image path inside /public, e.g. "/case-studies/client.jpg". */
  image?: string;
};

const placeholder = (n: number, services: string[]): CaseStudy => ({
  slug: `case-study-${n}`,
  published: false,
  title: "Case study coming soon",
  client: "Client name",
  industry: "Industry",
  country: "Country",
  services,
  summary: "The client, their challenge, what we did and the results will appear here.",
  challenge: "",
  approach: "",
  results: [],
});

export const caseStudies: CaseStudy[] = [
  placeholder(1, ["google-ads"]),
  placeholder(2, ["marketing-automation"]),
  placeholder(3, ["3d-websites"]),
  placeholder(4, ["landing-pages"]),
  placeholder(5, ["creative-design"]),
  placeholder(6, ["seo-google-business"]),
  placeholder(7, ["social-media-marketing"]),
  placeholder(8, ["app-development"]),
];

/**
 * TESTIMONIALS shown on the Case Studies page.
 * Replace the placeholders with real quotes (with the client's permission) and
 * set `placeholder: false`. Add `rating` (1–5) only if it comes from a real review.
 */
export type Testimonial = { quote: string; name: string; context: string; rating?: number; placeholder?: boolean };

export const testimonials: Testimonial[] = [
  { quote: "Your first client testimonial will appear here.", name: "Client name", context: "Industry", placeholder: true },
  { quote: "Add real quotes from happy clients in lib/caseStudies.ts.", name: "Client name", context: "Industry", placeholder: true },
  { quote: "Testimonials rotate automatically, one at a time.", name: "Client name", context: "Industry", placeholder: true },
];

export const publishedCaseStudies = caseStudies.filter((c) => c.published);
export const getCaseStudy = (slug: string) => publishedCaseStudies.find((c) => c.slug === slug);
