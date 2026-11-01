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
  /** Broad sector used for the filter tabs and "sectors we know best" (e.g. "Travel"). */
  sector?: string;
  /** Country of the client/project. Leave empty ("") if you'd rather not say. */
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
  /** Optional full-page screenshot (tall image). Shown in a scrolling browser frame on the case study page. */
  fullPage?: string;
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
    slug: "vanessa-river-travel",
    sector: "Travel",
    published: true,
    kind: "client",
    title: "A travel website for creator Vanessa River",
    client: "Vanessa River",
    industry: "Travel & tourism",
    country: "",
    services: ["website-development", "creative-design"],
    metric: "WordPress website",
    tech: ["WordPress", "Elementor"],
    summary:
      "A WordPress website for travel creator Vanessa River, showcasing her tour packages, her story and ways for followers to stay in touch.",
    challenge:
      "Vanessa needed one place to present her travel packages, introduce herself to new visitors and build a following of people interested in her trips — with a look that matched the feel of her travel content.",
    approach:
      "We designed and built a WordPress website with Elementor. A full-width hero sets the tone, followed by a “What I do” section presenting tour packages for Dubai, Canada, Australia, Switzerland, London and the USA.\n\nThe site also includes a press logo strip, an about section, a newsletter sign-up, an Instagram gallery and a footer with navigation, email sign-up, social links and site search.",
    results: [],
    image: "/case-studies/vanessa-river.png",
  },
  {
    slug: "harry-narang-consulting",
    sector: "Professional services",
    published: true,
    kind: "client",
    title: "A personal brand website for agile consultant Harry Narang",
    client: "Harry Narang",
    industry: "Consulting & training",
    country: "",
    services: ["website-development", "creative-design"],
    metric: "WordPress website",
    tech: ["WordPress", "Elementor"],
    summary:
      "A personal brand website for Harry Narang, a consultant, trainer and author specialising in agile product development and business transformation.",
    challenge:
      "Harry’s audience includes organisations looking for agile training, consulting and speaking. The website needed to establish credibility quickly and guide visitors to the right service and to his newsletter.",
    approach:
      "We designed and built a WordPress website with Elementor, opening with a clear statement of Harry’s mission and a newsletter sign-up. Media logos and headline figures follow, then a “How can Harry help you?” section covering training, consulting and his international network.\n\nFurther sections include an embedded video, a client logo wall, a reviews carousel, a photo gallery and a newsletter call to action, with a consistent red-and-white identity throughout.",
    results: [],
    image: "/case-studies/harry-narang.webp",
    fullPage: "/case-studies/harry-narang-full.webp",
  },
  {
    slug: "beehost-hosting",
    sector: "Technology",
    published: true,
    kind: "client",
    title: "A hosting and domains website for BeeHost",
    client: "BeeHost",
    industry: "Web hosting",
    country: "",
    services: ["website-development", "creative-design"],
    metric: "WordPress website",
    tech: ["WordPress", "Elementor"],
    summary:
      "A bright, conversion-focused website for BeeHost, presenting web hosting, domains, email hosting and SSL certificates with clear pricing.",
    challenge:
      "Hosting buyers compare plans and prices carefully. BeeHost needed a site that explains its services simply, makes pricing easy to compare and guides visitors to sign up or get in touch.",
    approach:
      "We designed and built a WordPress website with Elementor in BeeHost’s yellow-and-navy colours. It covers core services (web hosting, domain services, email hosting and SSL certificates), advanced services such as reseller, managed and cloud hosting, and pricing plans laid out side by side.\n\nThe site also includes a blog section, a team section, a call-to-action band, a newsletter sign-up and a detailed footer with contact and help links.",
    results: [],
    image: "/case-studies/beehost.png",
  },
  {
    slug: "developer-portfolio",
    sector: "Professional services",
    published: true,
    kind: "client",
    title: "A portfolio website for a web developer",
    client: "Developer Portfolio",
    industry: "Personal brand",
    country: "",
    services: ["website-development", "creative-design"],
    metric: "Portfolio website",
    tech: ["WordPress"],
    summary:
      "A clean portfolio website presenting a developer’s work, skills and testimonials, with a clear path to get in touch.",
    challenge:
      "A developer’s website has to show their work and skills at a glance, and make it easy for potential clients or employers to make contact.",
    approach:
      "We designed a portfolio layout with a bold “I build digital experiences” hero and a “View my work” call to action, followed by an about section, project cards, testimonials, a skills chart and contact options, all in a navy, white and orange palette.",
    results: [],
    image: "/case-studies/portfolio.png",
  },
  {
    slug: "westpaq-cleaning-services",
    sector: "Cleaning services",
    published: true,
    kind: "client",
    liveUrl: "https://westpaq-cleaning-services.vercel.app",
    title: "A single-page website for a Houston commercial cleaning company",
    client: "Westpaq Cleaning Services",
    industry: "Commercial cleaning",
    country: "USA",
    services: ["website-development", "landing-pages", "creative-design"],
    metric: "Single-page website",
    tech: ["HTML", "CSS", "JavaScript"],
    summary:
      "A fast, single-page website for Westpaq Cleaning Services, a women-owned commercial cleaning company serving facilities across Greater Houston.",
    challenge:
      "Commercial buyers — facility managers, office administrators and procurement teams — need to see quickly that a cleaner understands their type of building, can be trusted on site, and is easy to get a quote from. The website had to present six very different facility types clearly and lead every visitor towards a custom quote request.",
    approach:
      "We designed a focused one-page site built around the quote journey. Sections cover the facilities served (retail, offices, government, industrial, medical and educational), why clients choose the company, a three-step path from first contact to a cleaning plan, reviews, credentials and a detailed quote form.\n\nThe page is a single lightweight HTML file with inline CSS, JavaScript and SVG, plus compressed WebP photos, so it loads quickly on any connection and can be hosted anywhere.",
    results: [],
    image: "/case-studies/westpaq.webp",
    gallery: ["/case-studies/westpaq-2.webp"],
  },
  {
    slug: "brightway-cleaning-demo",
    sector: "Cleaning services",
    published: true,
    kind: "concept",
    liveUrl: "https://cleaning-website-demo-sigma.vercel.app",
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
    sector: "Travel",
    published: true,
    kind: "client",
    liveUrl: "https://aetherion-mocha.vercel.app",
    title: "An immersive 3D landing page for a luxury space-travel brand",
    client: "Aetherion",
    industry: "Luxury travel",
    country: "Global",
    services: ["3d-websites", "website-development", "creative-design"],
    metric: "3D website",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
    summary:
      "A cinematic landing page for Aetherion, a luxury space-travel brand, built around an interactive 3D orbital carousel.",
    challenge:
      "A premium travel experience has to feel extraordinary from the first screen — while still loading quickly, working on phones and remaining usable for people who prefer less motion.",
    approach:
      "The hero is a 3D orbital carousel of destinations that visitors can browse with arrow buttons, the keyboard, swipes, drags or by clicking a planet. On phones, and for visitors who prefer reduced motion, a lighter version of the stage is shown instead.\n\nThe rest of the page covers destinations, life aboard, the crew, a booking enquiry form and an app promotion section. It’s built with Next.js, Tailwind CSS and Framer Motion, with content kept separate from the design so it’s easy to update.",
    results: [],
    image: "/case-studies/aetherion.webp",
    gallery: ["/case-studies/aetherion-2.webp"],
  },
  {
    slug: "revsol",
    published: true,
    kind: "client",
    sector: "Industrial & safety supplies",
    title: "A product-led website for a Pakistani fire safety, tools and water pump supplier",
    client: "Revsol",
    industry: "Fire safety, tools & industrial supplies",
    country: "Pakistan",
    services: ["website-development", "creative-design"],
    metric: "Business website",
    summary:
      "A comprehensive business website for Revsol, bringing fire extinguishers, power tools, safety gear, piping and water pumps together in one clear, easy-to-browse place.",
    challenge:
      "Revsol supplies a wide range of products — from fire extinguishers and PPE to power tools, piping and water pumps — for homes, businesses and industrial sites across Pakistan. Customers needed to find the right category quickly, understand the services on offer and get in touch without wading through a cluttered catalogue.",
    approach:
      "We designed and built a structured website that leads with Revsol’s “all in one place” promise and three key strengths: quality tools with warranty, certified fire safety and PPE solutions, and complete piping and water pump services.\n\nThe page is organised into clear product sections — power tools and hardware, fire protection equipment and services (supply, refilling, maintenance, delivery and installation), water and pressure pumps, safety gear and PPE, emergency lighting and public address systems — each with a direct call to action. A searchable FAQ, a blog area for buying guides, brand logos and a trust section support both visitors and search visibility, with a WhatsApp button for quick enquiries.",
    results: [],
    image: "/case-studies/revsol.webp",
    fullPage: "/case-studies/revsol-full.webp",
  },
];

/**
 * TESTIMONIALS shown on the Case Studies page.
 * Replace the placeholders with real quotes (with the client's permission) and
 * set `placeholder: false`. Add `rating` (1–5) only if it comes from a real review.
 */
export type Testimonial = { quote: string; name: string; context: string; rating?: number; placeholder?: boolean };

export const testimonials: Testimonial[] = [
  { quote: "Client testimonial coming soon.", name: "Client name", context: "Industry", placeholder: true },
  { quote: "Client testimonial coming soon.", name: "Client name", context: "Industry", placeholder: true },
  { quote: "Client testimonial coming soon.", name: "Client name", context: "Industry", placeholder: true },
];

/**
 * PORTFOLIO NUMBERS ("What the numbers look like") — real figures only.
 * "auto:projects", "auto:sectors" and "auto:services" are counted from the
 * published case studies. You can also add your own real figures, e.g.
 * { value: "320%", label: "Best organic increase" } — only with client permission.
 */
export type Stat = { value: string; label: string; placeholder?: boolean };
export const stats: Stat[] = [
  { value: "auto:projects", label: "Projects published" },
  { value: "auto:sectors", label: "Industries served" },
  { value: "auto:services", label: "Services delivered across these projects" },
];

/** SECTORS ("The sectors we know best"). Each name should match the `sector` of your case studies. */
export type Sector = { name: string; text: string; placeholder?: boolean };
export const sectors: Sector[] = [
  { name: "Travel", text: "Story-led travel websites and immersive 3D experiences for travel brands and creators." },
  { name: "Professional services", text: "Personal brand and consulting websites that build credibility and lead visitors to get in touch." },
  { name: "Technology", text: "Clear, pricing-led websites that help hosting and technology businesses explain what they offer." },
  { name: "Cleaning services", text: "Quote-focused websites for commercial and residential cleaning companies." },
  { name: "Industrial & safety supplies", text: "Product-led websites that help suppliers present wide ranges of equipment clearly and turn browsing into enquiries." },
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
