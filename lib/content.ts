export type Stage = { name: string; line: string; points: string[] };

export const stages: Stage[] = [
  {
    name: "Strategy",
    line: "Find where growth is actually available.",
    points: ["Audience and search-demand research", "Clear goals tied to revenue, not vanity metrics", "A channel plan sized to your budget"],
  },
  {
    name: "Creative",
    line: "Make the message impossible to scroll past.",
    points: ["Positioning and messaging that sounds like you", "Ads, pages and visuals built as one system", "Every asset made to be tested"],
  },
  {
    name: "Performance",
    line: "Measure, learn, and put budget where it works.",
    points: ["Conversion tracking set up properly from day one", "Regular testing of bids, audiences and creative", "Plain-language reporting you can act on"],
  },
];

export type Step = { name: string; line: string; detail: string };

export const processSteps: Step[] = [
  {
    name: "Understand",
    line: "We learn your business before touching a campaign.",
    detail: "Goals, audience, offer, budget and what has or hasn't worked so far — so the plan fits you, not a template.",
  },
  {
    name: "Create",
    line: "We build the pieces as one connected system.",
    detail: "Campaigns, pages, automations and creative designed together, with tracking set up before anything goes live.",
  },
  {
    name: "Improve",
    line: "We measure, learn and refine — continuously.",
    detail: "Regular testing and clear reporting, so budget moves toward what works and each month builds on the last.",
  },
];

export type Faq = { q: string; a: string };

/** Homepage FAQ. Also published as FAQ data for Google. Keep answers honest and specific. */
export const homeFaqs: Faq[] = [
  {
    q: "What does a digital marketing agency like efficiovirtual do?",
    a: "We plan, build and run the channels that bring you customers: Google Ads campaigns, landing pages, marketing automation, 3D and interactive websites, and the creative behind them. Everything is tracked, so you can see what is working.",
  },
  {
    q: "Do you work with businesses in the USA, UK, Canada and Pakistan?",
    a: "Yes. We work remotely with brands in all four countries and plan campaigns, language and timing around each market — including British or American spelling, local search terms and time zones.",
  },
  {
    q: "Is efficiovirtual a good fit for small businesses and startups?",
    a: "Yes. Many of our services, such as a Google Ads audit, a single landing page or a first email sequence, are designed to start small and grow as results come in.",
  },
  {
    q: "How much do Google Ads cost?",
    a: "It depends on your industry, location and goals. You set the ad budget and pay Google directly; our management fee is separate. We recommend a starting budget only after looking at your market, so you don’t overspend while testing.",
  },
  {
    q: "Won’t a 3D website be slow?",
    a: "Not when it’s built carefully. We load 3D after the essential content, keep files small, and provide simpler fallbacks for older phones and for people who prefer reduced motion.",
  },
  {
    q: "How do we get started?",
    a: "Email admin@efficiovirtual.com or use the contact form. Tell us what you sell, who you sell to and what you want to improve, and we’ll reply with honest next steps.",
  },
];

export type Service = {
  slug: string;
  name: string;
  short: string;
  summary: string;
  intro: string;
  includes: string[];
  fit: string[];
};

export const services: Service[] = [
  {
    slug: "google-ads",
    name: "Google Ads",
    short: "Search, Performance Max and YouTube",
    summary: "Google Ads management that puts you in front of people the moment they search for what you sell — so budget goes to clicks that matter.",
    intro:
      "We build and manage Google Ads accounts around intent: the right keywords, tight ad groups, honest ad copy and landing pages that match. Then we keep refining so spend follows results.",
    includes: [
      "Account audit or clean build",
      "Keyword and competitor research",
      "Search, Performance Max, Display and YouTube campaigns",
      "Conversion tracking with Google Tag Manager and GA4",
      "Ongoing bid, budget and creative testing",
      "Monthly reporting in plain language",
    ],
    fit: ["You want leads or sales from search", "Your current account feels like a black box", "You need tracking you can trust"],
  },
  {
    slug: "marketing-automation",
    name: "Marketing Automation",
    short: "Email, CRM and lead nurturing",
    summary: "Email marketing automation and CRM workflows that turn one-time interest into repeat customers, without manual follow-up.",
    intro:
      "We map the journey from first click to repeat customer, then build the emails, triggers and CRM workflows that move people along it — without your team doing it by hand.",
    includes: [
      "Customer journey and lifecycle mapping",
      "Welcome, nurture and re-engagement sequences",
      "Lead scoring and CRM pipeline setup",
      "Form, ad and website integrations",
      "Segmentation and personalisation",
      "Testing and deliverability checks",
    ],
    fit: ["Leads go cold before sales follows up", "You send the same email to everyone", "Your tools don't talk to each other"],
  },
  {
    slug: "3d-websites",
    name: "3D Websites",
    short: "Immersive, scroll-driven web experiences",
    summary: "3D website design with interactive, scroll-driven storytelling that keeps visitors engaged — and still loads fast.",
    intro:
      "We design and build websites with real-time 3D and scroll-driven storytelling — the kind of site people remember — while keeping performance, accessibility and search visibility in check.",
    includes: [
      "Concept, storyboard and art direction",
      "Real-time 3D with WebGL",
      "Scroll and pointer-driven interaction",
      "Fallbacks for older devices and reduced motion",
      "Responsive build for desktop, tablet and mobile",
      "SEO-friendly, semantic structure",
    ],
    fit: ["Your product deserves more than a template", "You're launching something new", "You want your site to be part of the brand"],
  },
  {
    slug: "landing-pages",
    name: "Landing Pages",
    short: "Focused pages built to convert",
    summary: "High-converting landing page design: one page, one goal, built to turn ad clicks into enquiries and sales.",
    intro:
      "We write, design and build landing pages for a single action — book, buy, sign up — and match them to the ads that send traffic, so every click lands somewhere that makes sense.",
    includes: [
      "Conversion-focused copywriting",
      "Design matched to your campaigns",
      "Fast, mobile-first build",
      "Form and CRM integration",
      "Analytics and event tracking",
      "A/B test variants",
    ],
    fit: ["You're paying for ad traffic that doesn't convert", "You're launching an offer or campaign", "Your homepage is doing too many jobs"],
  },
  {
    slug: "creative-design",
    name: "Creative Design",
    short: "Brand, ad and social creative",
    summary: "Ad creative, social media design and brand identity that look consistent across every ad, post and page.",
    intro:
      "We create the visual side of your marketing: ad creative, social content, brand assets and motion — designed as one system so your brand looks the same everywhere and every piece can be tested.",
    includes: [
      "Ad creative for search, social and display",
      "Social media graphics and short motion",
      "Brand identity refresh and guidelines",
      "Presentation and sales materials",
      "3D renders and product visuals",
      "Creative variations for testing",
    ],
    fit: ["Your ads look like everyone else's", "Your brand feels inconsistent across channels", "You need fresh creative regularly"],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
