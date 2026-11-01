export type Service = {
  slug: string;
  index: number;
  name: string;
  short: string;
  /** One-line benefit used on cards. */
  summary: string;
  intro: string;
  included: string[];
  process: { title: string; text: string }[];
  fit: string[];
};

export const services: Service[] = [
  {
    slug: "google-ads",
    index: 0,
    name: "Google Ads",
    short: "Search, Performance Max, YouTube",
    summary:
      "Campaigns structured around search intent, so your budget reaches people who are already looking for what you offer.",
    intro:
      "We plan, build and manage Google Ads accounts around the searches that matter to your business. Clear structure, honest tracking and steady optimisation keep spend pointed at the people most likely to act.",
    included: [
      "Account audit and keyword research",
      "Search, Performance Max, Display and YouTube campaigns",
      "Ad copy and extensions written for each audience",
      "Conversion tracking with Google Tag Manager and GA4",
      "Bid, budget and negative keyword management",
      "Plain-language reporting on what is and isn’t working",
    ],
    process: [
      { title: "Audit & plan", text: "Review your account, competitors and tracking, then agree goals, budgets and what we’ll measure." },
      { title: "Build & launch", text: "Structure campaigns by intent, write the ads and connect them to the right landing pages." },
      { title: "Refine", text: "Adjust bids, queries and creative every week based on real conversion data." },
    ],
    fit: ["Businesses ready to capture existing demand", "Teams who want clear reporting on ad spend", "Accounts that have grown messy over time"],
  },
  {
    slug: "marketing-automation",
    index: 1,
    name: "Marketing Automation",
    short: "Email, nurture, CRM workflows",
    summary:
      "Email journeys and CRM workflows that follow up at the right moment, without adding to your team’s workload.",
    intro:
      "We design the journeys that happen after someone first finds you — welcome sequences, lead nurturing, reminders and handoffs to sales — and connect them to the tools you already use.",
    included: [
      "Customer journey and lifecycle mapping",
      "Welcome, nurture and re-engagement email sequences",
      "Lead scoring and sales handoff rules",
      "CRM setup and clean-up",
      "Form, ad and website integrations",
      "Testing and ongoing improvements",
    ],
    process: [
      { title: "Map", text: "Chart every step from first visit to customer and find where people drop off or wait." },
      { title: "Automate", text: "Build the emails, triggers and workflows, and connect them to your CRM and site." },
      { title: "Improve", text: "Review open, click and conversion data and tune timing, content and segments." },
    ],
    fit: ["Teams following up with leads by hand", "Businesses with a CRM that isn’t pulling its weight", "Brands with a long consideration cycle"],
  },
  {
    slug: "3d-websites",
    index: 2,
    name: "3D Websites",
    short: "Immersive, real-time web experiences",
    summary:
      "Immersive websites with real-time 3D that make your brand memorable — and still load fast on every device.",
    intro:
      "We design and build websites that use real-time 3D to tell your story: products you can explore, scenes that respond to scroll, and interactions that reward attention — always with accessible, fast fallbacks.",
    included: [
      "Concept, storyboard and art direction",
      "Real-time 3D with WebGL and Three.js",
      "Scroll-driven storytelling and interactions",
      "Optimised models and textures for fast loading",
      "Responsive, touch-friendly behaviour",
      "Reduced-motion and no-3D fallbacks",
    ],
    process: [
      { title: "Story", text: "Define what the experience should make people feel and do, then storyboard each moment." },
      { title: "Craft", text: "Design the 3D world and interface together, and build it with performance budgets from day one." },
      { title: "Launch", text: "Test across devices and browsers, then hand over a site your team can update." },
    ],
    fit: ["Product launches that need to stand out", "Brands with a visual story to tell", "Companies replacing a dated website"],
  },
  {
    slug: "landing-pages",
    index: 3,
    name: "Landing Pages",
    short: "Focused pages for one offer",
    summary:
      "Focused pages for one offer and one audience, with clear messaging, fast load times and forms that are easy to finish.",
    intro:
      "A good landing page does one thing well. We write, design and build pages that match the ad or email that brought someone there, answer their questions and make the next step obvious.",
    included: [
      "Message and offer positioning",
      "Copywriting and page structure",
      "Responsive design and development",
      "Form and CRM connections",
      "Analytics and conversion tracking",
      "A/B testing of headlines, layouts and offers",
    ],
    process: [
      { title: "Clarify", text: "Pin down the audience, offer and single action the page needs to drive." },
      { title: "Design & build", text: "Write and design a fast, focused page that keeps the promise made by the ad." },
      { title: "Test", text: "Measure what people do and test changes that make the action easier." },
    ],
    fit: ["Paid campaigns sending traffic to a homepage", "New products, events or offers", "Teams that want to test ideas quickly"],
  },
  {
    slug: "creative-design",
    index: 4,
    name: "Creative Design",
    short: "Ad creative, brand and campaign visuals",
    summary:
      "Ad creative, brand visuals and campaign assets designed as one system, so you look consistent wherever people find you.",
    intro:
      "We create the visuals that carry your campaigns — from social and display ads to brand assets and motion — designed as a system so every piece feels like it belongs to you.",
    included: [
      "Campaign concepts and art direction",
      "Static, animated and video ad creative",
      "Social media and display assets in every size",
      "Brand guidelines and visual systems",
      "3D renders and motion graphics",
      "Templates your team can reuse",
    ],
    process: [
      { title: "Concept", text: "Start from your strategy and audience to find an idea worth repeating." },
      { title: "Design", text: "Develop the visual system and produce assets for every channel and format." },
      { title: "Iterate", text: "Use performance data to refresh creative before it wears out." },
    ],
    fit: ["Brands whose ads look different on every channel", "Campaigns that need fresh creative regularly", "Teams without in-house design capacity"],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
