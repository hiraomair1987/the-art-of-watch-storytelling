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
  /** Extra tags shown on the card, e.g. platforms used: ["WordPress", "Shopify"]. */
  tech?: string[];
  /** Optional link to the live website or app. */
  liveUrl?: string;
  /**
   * "client" = real client work. "concept" = a concept, demo or self-initiated
   * project — labelled clearly on the site and never shown with client results.
   */
  kind?: "client" | "concept";
  /** Extra screenshots shown on the case study page. */
  gallery?: string[];
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
  {
    slug: "westpaq-cleaning-services",
    published: true,
    kind: "concept",
    title: "A single-page website concept for a Houston commercial cleaning company",
    client: "Westpaq Cleaning Services",
    industry: "Commercial cleaning",
    country: "USA",
    services: ["website-development", "landing-pages", "creative-design"],
    metric: "Website concept · single page",
    tech: ["HTML", "CSS", "JavaScript"],
    summary:
      "A fast, single-page website concept for a women-owned commercial cleaning company serving facilities across Greater Houston.",
    challenge:
      "Commercial buyers — facility managers, office administrators and procurement teams — need to see quickly that a cleaner understands their type of building, can be trusted on site, and is easy to get a quote from. The concept had to present six very different facility types clearly and lead every visitor towards a custom quote request.",
    approach:
      "We designed a focused one-page site built around the quote journey. Sections cover the facilities served (retail, offices, government, industrial, medical and educational), why clients choose the company, a three-step path from first contact to a cleaning plan, reviews, credentials and a detailed quote form.\n\nThe page is a single lightweight HTML file with inline CSS, JavaScript and SVG, plus compressed WebP photos, so it loads quickly on any connection and can be hosted anywhere. Sample photos and details are placeholders until the company confirms its own.",
    results: [],
    image: "/case-studies/westpaq.webp",
    gallery: ["/case-studies/westpaq-2.webp"],
  },
  {
    slug: "brightway-cleaning-demo",
    published: true,
    kind: "concept",
    title: "A ready-to-adapt website demo for cleaning businesses",
    client: "Brightway Cleaning Co. (demo)",
    industry: "Residential & commercial cleaning",
    country: "USA",
    services: ["website-development", "landing-pages"],
    metric: "Demo website · cleaning industry",
    tech: ["HTML", "CSS", "JavaScript"],
    summary:
      "A demo site for a fictional Houston cleaning company, built to show cleaning businesses what their own website could look like.",
    challenge:
      "Many small cleaning businesses rely on word of mouth and have no website, or one that doesn’t win quotes. They need to see a realistic example before committing — one that reflects their services, builds trust and makes booking easy.",
    approach:
      "We built a complete demo for a fictional brand, Brightway Cleaning Co., covering home, apartment, deep, move-in/move-out, office and post-construction cleaning. It includes trust points, a three-step booking explanation, review and FAQ sections, and a free-quote form, all clearly marked as sample content.\n\nThe demo is designed to be quickly adapted for a real business: the brand, logo, contact details, services, reviews and photos can be swapped without rebuilding the page.",
    results: [],
    image: "/case-studies/brightway.webp",
    gallery: ["/case-studies/brightway-2.webp"],
  },
  {
    slug: "aetherion-space-travel",
    published: true,
    kind: "concept",
    title: "An immersive 3D landing page for a luxury space-travel concept",
    client: "Aetherion",
    industry: "Luxury travel (concept)",
    country: "Global",
    services: ["3d-websites", "website-development", "creative-design"],
    metric: "3D website concept",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
    summary:
      "A cinematic landing page for a fictional luxury space-travel brand, built around an interactive 3D orbital carousel.",
    challenge:
      "A premium travel experience has to feel extraordinary from the first screen — while still loading quickly, working on phones and remaining usable for people who prefer less motion.",
    approach:
      "The hero is a 3D orbital carousel of destinations that visitors can browse with arrow buttons, the keyboard, swipes, drags or by clicking a planet. On phones, and for visitors who prefer reduced motion, a lighter version of the stage is shown instead.\n\nThe rest of the page covers destinations, life aboard, the crew, a booking enquiry form and an app promotion section. It’s built with Next.js, Tailwind CSS and Framer Motion, with content kept separate from the design so it’s easy to update.",
    results: [],
    image: "/case-studies/aetherion.webp",
    gallery: ["/case-studies/aetherion-2.webp"],
  },
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
  { quote: "Each testimonial can show the client’s name, company and a star rating from a real review.", name: "Client name", context: "Industry", placeholder: true },
];

/**
 * PORTFOLIO NUMBERS ("What the numbers look like") — real figures only.
 * The first one counts published case studies automatically.
 * Replace the placeholders with your best real results and set `placeholder: false`.
 */
export type Stat = { value: string; label: string; placeholder?: boolean };
export const stats: Stat[] = [
  { value: "auto", label: "Case studies published" },
  { value: "00%", label: "Best result — add your top client result", placeholder: true },
  { value: "00", label: "Best PageSpeed score at launch", placeholder: true },
];

/** SECTORS ("The sectors we know best"). Replace with the industries you work with most. */
export type Sector = { name: string; text: string; placeholder?: boolean };
export const sectors: Sector[] = [
  { name: "Sector one", text: "Describe the industry and the kind of work you do for it.", placeholder: true },
  { name: "Sector two", text: "Describe the industry and the kind of work you do for it.", placeholder: true },
  { name: "Sector three", text: "Describe the industry and the kind of work you do for it.", placeholder: true },
  { name: "Sector four", text: "Describe the industry and the kind of work you do for it.", placeholder: true },
];

/** FAQ about the case studies themselves. Keep answers true to how you publish results. */
export const caseFaqs: { q: string; a: string; topic: "Results" | "Working together" }[] = [
  {
    q: "Are these numbers real?",
    a: "Yes. Every result published on this page comes from the client’s own analytics, ad accounts or reporting tools, and is shared with their permission. We don’t publish projections or estimates as results.",
    topic: "Results",
  },
  {
    q: "Why don’t all case studies name the client?",
    a: "Some clients prefer not to be named publicly. In those cases we describe the industry and market instead, while keeping the results accurate.",
    topic: "Results",
  },
  {
    q: "How do you measure results?",
    a: "We agree the key measures at the start — such as enquiries, sales, cost per lead or organic traffic — set up tracking before launch, and compare against the starting point.",
    topic: "Results",
  },
  {
    q: "Can you get similar results for my business?",
    a: "Every business, market and budget is different, so we never promise specific results. We’ll look at your situation and explain honestly what we think is achievable.",
    topic: "Working together",
  },
  {
    q: "Do you work in my industry or country?",
    a: "We work remotely with businesses in the USA, the UAE, Canada, the UK and Pakistan across many industries. Tell us about your business and we’ll let you know how we can help.",
    topic: "Working together",
  },
  {
    q: "How do I start a project?",
    a: "Email admin@efficiovirtual.com or use the contact form with a few lines about your business and goals. We’ll reply with questions or suggested next steps.",
    topic: "Working together",
  },
];

export const publishedCaseStudies = caseStudies.filter((c) => c.published);
export const getCaseStudy = (slug: string) => publishedCaseStudies.find((c) => c.slug === slug);
