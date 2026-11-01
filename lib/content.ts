export type Stage = { name: string; line: string; points: string[] };

export const stages: Stage[] = [
  {
    name: "Strategy",
    line: "Start with where growth is realistically available.",
    points: [
      "Research into your audience, competitors and search demand",
      "Goals tied to enquiries and sales, not vanity metrics",
      "A channel plan that fits your budget and stage",
    ],
  },
  {
    name: "Creative",
    line: "Give people a clear reason to stop, read and act.",
    points: [
      "Messaging that sounds like your brand",
      "Ads, pages and visuals designed as one system",
      "Variations made to be tested, not guessed",
    ],
  },
  {
    name: "Performance",
    line: "Measure what happens, then put effort where it works.",
    points: [
      "Conversion tracking set up before campaigns go live",
      "Ongoing testing of audiences, bids, pages and creative",
      "Plain-language reporting with clear next steps",
    ],
  },
];

export type Step = { name: string; line: string; detail: string };

export const processSteps: Step[] = [
  {
    name: "Understand",
    line: "We learn how your business wins customers today.",
    detail:
      "We look at your goals, audience, offer, budget and existing marketing — what is working, what isn’t, and where the gaps are — so the plan is built around your business rather than a template.",
  },
  {
    name: "Create",
    line: "We build the pieces as one connected system.",
    detail:
      "Campaigns, landing pages, automations, websites and creative are planned together, with tracking in place before anything launches, so every part supports the others.",
  },
  {
    name: "Improve",
    line: "We measure, learn and refine.",
    detail:
      "We review results regularly, test new ideas, and move time and budget toward what performs — then report back in plain language so you always know what changed and why.",
  },
];

export type Faq = { q: string; a: string };

/** Homepage FAQ. Also published as FAQ data for Google. Keep answers honest and specific. */
export const homeFaqs: Faq[] = [
  {
    q: "What digital marketing services does efficiovirtual offer?",
    a: "Our core services are Google Ads management, marketing automation, 3D website design, landing page design and creative design. We also offer SEO and Google Business Profile setup, social media marketing, and website development and maintenance. You can use one service on its own or combine several into a single plan.",
  },
  {
    q: "What does Google Ads management include?",
    a: "It covers keyword and competitor research, campaign setup or restructuring, ad copy, conversion tracking, and ongoing optimisation of bids, budgets, audiences and ads. We explain what we change and why in regular, plain-language reports.",
  },
  {
    q: "What can marketing automation do for my business?",
    a: "Marketing automation sends the right message at the right moment without manual work — for example welcome emails for new subscribers, follow-ups for new leads, reminders for abandoned enquiries, or re-engagement emails for past customers. We map your customer journey first, then build the emails, triggers and CRM workflows around it.",
  },
  {
    q: "Why choose a 3D website, and will it be slow?",
    a: "A 3D website can explain a product or brand in a more memorable, interactive way than a standard page. Speed and accessibility are part of the build: essential content loads first, 3D loads afterwards, files are kept small, and simpler fallbacks are provided for older devices and for visitors who prefer reduced motion.",
  },
  {
    q: "How is a landing page different from a regular web page?",
    a: "A landing page is built for one specific goal, such as booking a call or buying a product, and usually matches a particular ad or campaign. It removes distractions, answers likely questions, and makes the next step obvious — which is why it is often the missing link between ad clicks and real enquiries.",
  },
  {
    q: "What creative design work do you provide?",
    a: "We design ad creative for search, social and display, social media graphics and short motion pieces, brand identity updates, presentations and product visuals. Creative is produced in variations so it can be tested and improved over time.",
  },
  {
    q: "Do you offer SEO and Google Business Profile setup?",
    a: "Yes. We research the terms your customers search for, improve your website’s content and technical health so it can compete in search results, and set up and optimise your Google Business Profile so you can appear in Google Maps and local searches.",
  },
  {
    q: "Which social media platforms do you manage?",
    a: "Whichever platforms you need. We plan content, community management and paid social campaigns around where your customers actually spend their time.",
  },
  {
    q: "Do you look after websites after they launch?",
    a: "Yes, if you need it — and for as long as you need it. Ongoing care can include updates, backups, security, speed checks and content changes.",
  },
  {
    q: "Can we work together remotely?",
    a: "Yes. We work remotely by email and scheduled calls, share work in progress for feedback, and agree communication times that suit your time zone.",
  },
  {
    q: "How do we get started?",
    a: "Email admin@efficiovirtual.com or use the contact form. Tell us what you offer, who your customers are and what you would like to improve. We’ll reply with questions or suggested next steps — there’s no obligation to continue.",
  },
];

export type Service = {
  slug: string;
  name: string;
  /** Shorter label used in the terracotta services strip in the header. */
  navLabel: string;
  /** Who the service is most useful for (shown on homepage cards). */
  forWho: string;
  short: string;
  summary: string;
  intro: string;
  includes: string[];
  fit: string[];
};

export const services: Service[] = [
  {
    slug: "google-ads",
    forWho: "Businesses that want enquiries or sales from people already searching for what they offer.",
    navLabel: "Google Ads",
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
    forWho: "Teams whose leads and customers need consistent follow-up without extra manual work.",
    navLabel: "Automation",
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
    forWho: "Brands launching a product, service or identity that deserves a memorable first impression.",
    navLabel: "3D Websites",
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
    forWho: "Anyone running ads or campaigns who needs more of those clicks to become enquiries.",
    navLabel: "Landing Pages",
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
    forWho: "Brands that need consistent, test-ready visuals across ads, social media and the web.",
    navLabel: "Creative",
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
  {
    slug: "website-development",
    forWho: "Businesses that need a reliable website — and someone to keep it running.",
    name: "Website Development & Maintenance",
    navLabel: "Web Development",
    short: "Websites built and looked after",
    summary: "Website development and maintenance: fast, secure, mobile-friendly sites — plus ongoing updates, backups and fixes so your site keeps working.",
    intro:
      "We design and build websites that load quickly, work on every screen and make it easy for visitors to contact or buy from you. After launch we keep them healthy with updates, backups, monitoring and changes whenever you need them.",
    includes: [
      "Website design and development",
      "Built on the platform that suits you — WordPress, Shopify or custom code",
      "Mobile-first, fast-loading pages",
      "Security updates, backups and uptime monitoring",
      "Content and page updates on request",
      "Speed and technical health checks",
    ],
    fit: ["Your website is slow, dated or hard to update", "Nobody is responsible for keeping it running", "You’re launching a new business or brand"],
  },
  {
    slug: "seo-google-business",
    forWho: "Businesses that want to be found in Google Search and Maps without paying per click.",
    name: "SEO & Google Business",
    navLabel: "SEO",
    short: "Search engine optimization and local search",
    summary: "Search engine optimization and Google Business Profile setup that help customers find you on Google Search and Google Maps.",
    intro:
      "We research what your customers search for, then improve your website’s content, structure and technical health so it can rank. For local businesses we set up and optimise your Google Business Profile so you appear in Maps and nearby searches.",
    includes: [
      "Keyword research for your market and country",
      "On-page SEO: titles, content and page structure",
      "Technical SEO: speed, indexing and structured data",
      "Google Business Profile setup and optimisation",
      "Local SEO for city and regional searches",
      "Monthly ranking and traffic reporting",
    ],
    fit: ["You don’t show up when customers search for you", "Your business needs a Google listing or Maps presence", "You want leads that don’t depend on paying per click"],
  },
  {
    slug: "social-media-marketing",
    forWho: "Brands that want a steady, on-brand social presence that brings in enquiries.",
    name: "Social Media Marketing",
    navLabel: "Social Media",
    short: "Organic content and paid social",
    summary: "Social media marketing on the platforms your customers use — content, community management and paid social ads that grow your audience.",
    intro:
      "We plan, design and publish content that fits your brand, look after your community, and run paid social campaigns that reach the right people — then report on what actually brings in enquiries and sales.",
    includes: [
      "Social media strategy and content calendar",
      "Post, carousel and short video design",
      "Community management",
      "Paid social campaigns on Meta and LinkedIn",
      "Audience targeting and retargeting",
      "Monthly performance reporting",
    ],
    fit: ["You post inconsistently or not at all", "Followers aren’t turning into customers", "You want to run social ads properly"],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
