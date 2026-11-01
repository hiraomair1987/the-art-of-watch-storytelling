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
    summary: "Show up at the exact moment people search for what you sell, and pay only for the clicks that matter.",
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
    summary: "Turn one-time interest into lasting relationships with messages that send themselves at the right time.",
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
    summary: "Give visitors a reason to stay: interactive 3D experiences that tell your story and stay fast.",
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
    summary: "One page, one goal. Fast, focused pages that turn ad clicks into enquiries and sales.",
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
    summary: "Visuals with a point of view — consistent across every ad, post and page your audience sees.",
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
