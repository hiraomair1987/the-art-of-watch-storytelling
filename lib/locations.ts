/**
 * Country ("area") pages.
 *
 * What these pages may say about efficiovirtual: it works remotely with
 * businesses in these markets and offers its listed services there.
 * Everything else on a page is general, factual information about marketing
 * in that country — not claims about offices, local teams, clients, results
 * or certifications. Add real business details here only once confirmed.
 */

export type MarketPoint = { title: string; text: string };
export type LocationFaq = { q: string; a: string };

export type Location = {
  slug: string;
  /** Country name as used in sentences, e.g. "the UAE". */
  inSentence: string;
  /** Full country name, used in structured data. */
  country: string;
  /** Short label for links and breadcrumbs. */
  label: string;
  title: string;
  description: string;
  h1: string;
  intro: string[];
  /** Market-specific considerations — the unique content of each page. */
  considerations: MarketPoint[];
  /** How remote collaboration works for this market. */
  workingTogether: string;
  faqs: LocationFaq[];
};

export const locations: Location[] = [
  {
    slug: "united-states",
    inSentence: "the USA",
    country: "United States",
    label: "USA",
    title: "Digital Marketing for US Businesses",
    description:
      "Google Ads management, marketing automation, 3D websites, landing pages and creative design for businesses in the USA, delivered remotely by efficiovirtual.",
    h1: "Digital marketing for businesses in the USA",
    intro: [
      "efficiovirtual works remotely with businesses across the United States, helping them turn search, social and website traffic into enquiries and sales.",
      "The US is one of the most competitive advertising markets in the world, so clear targeting, strong landing pages and careful measurement matter more than ever. We build campaigns, pages and follow-up that work together, and report on what each part contributes.",
    ],
    considerations: [
      {
        title: "Competitive ad auctions",
        text: "Many US industries have high cost-per-click in Google Ads. Tight keyword targeting, negative keywords, strong ad relevance and a well-matched landing page help each click work harder.",
      },
      {
        title: "Many regions, one campaign plan",
        text: "Customers are spread across several time zones and very different local markets. We consider location targeting, ad scheduling by time zone and region-specific messaging where it makes sense.",
      },
      {
        title: "Email and privacy rules",
        text: "Marketing emails must follow the CAN-SPAM Act, and several states — such as California — have their own privacy laws. Automations are set up with clear opt-outs and consent-aware tracking.",
      },
      {
        title: "US English and conventions",
        text: "Ad copy, landing pages and creative use American spelling, date formats and US dollar pricing, so your brand reads as familiar to local customers.",
      },
    ],
    workingTogether:
      "We work by email and scheduled calls, agreeing meeting times that suit your time zone — whether you are on the East Coast, West Coast or in between.",
    faqs: [
      {
        q: "Can you run Google Ads campaigns targeting specific US states or cities?",
        a: "Yes. Google Ads supports targeting by country, state, city, postcode (ZIP code) or radius, and we choose the setup that matches where your customers are and where you can serve them.",
      },
      {
        q: "Do you work with US businesses remotely?",
        a: "Yes. All of our work with US businesses is remote, using email and scheduled calls at times that suit your time zone.",
      },
      {
        q: "Will my marketing emails follow US rules?",
        a: "We build email automations with clear sender details, an easy unsubscribe option and consent-aware sign-up forms, in line with the CAN-SPAM Act. For specific legal questions, we recommend confirming with your own legal adviser.",
      },
    ],
  },
  {
    slug: "united-arab-emirates",
    inSentence: "the UAE",
    country: "United Arab Emirates",
    label: "UAE",
    title: "Digital Marketing for UAE Businesses",
    description:
      "Google Ads, marketing automation, 3D websites, landing pages and creative design for businesses in the UAE, delivered remotely by efficiovirtual.",
    h1: "Digital marketing for businesses in the UAE",
    intro: [
      "efficiovirtual works remotely with businesses in the United Arab Emirates, from Dubai and Abu Dhabi to the other emirates, helping them reach customers through search, social and well-designed websites.",
      "The UAE has a diverse, highly connected audience that expects polished digital experiences. We plan campaigns, landing pages and creative that reflect who your customers are and how they search.",
    ],
    considerations: [
      {
        title: "Arabic and English audiences",
        text: "Customers search and browse in both Arabic and English. We plan which campaigns, keywords and pages need each language, and keep the experience consistent across both.",
      },
      {
        title: "Seasonal moments",
        text: "Ramadan, Eid, the summer months and major shopping events change how people search and buy. Campaign timing, budgets and creative are planned around these periods rather than left unchanged.",
      },
      {
        title: "Mobile-first and premium expectations",
        text: "Most browsing happens on phones, and audiences are used to premium brand experiences. Fast, mobile-first landing pages and high-quality creative are essential.",
      },
      {
        title: "Data protection",
        text: "The UAE has a federal personal data protection law, and some free zones have their own rules. Forms, tracking and email automations are set up with consent and clear privacy information.",
      },
    ],
    workingTogether:
      "We work by email and scheduled calls, agreeing meeting times that suit Gulf Standard Time and your working week.",
    faqs: [
      {
        q: "Can you run campaigns in Arabic as well as English?",
        a: "We plan bilingual campaign structures, keywords and landing pages so each language has its own ads and pages. Tell us which languages you need and we’ll confirm how translation and review will work for your project.",
      },
      {
        q: "Do you work with UAE businesses remotely?",
        a: "Yes. We work remotely with businesses in the UAE by email and scheduled calls at times that suit your schedule.",
      },
      {
        q: "Should we change our ads during Ramadan?",
        a: "Usually, yes. Search behaviour, browsing times and buying intent often shift during Ramadan and Eid, so we review timing, messaging and budgets for that period.",
      },
    ],
  },
  {
    slug: "canada",
    inSentence: "Canada",
    country: "Canada",
    label: "Canada",
    title: "Digital Marketing for Canadian Businesses",
    description:
      "Google Ads management, marketing automation, 3D websites, landing pages and creative design for businesses in Canada, delivered remotely by efficiovirtual.",
    h1: "Digital marketing for businesses in Canada",
    intro: [
      "efficiovirtual works remotely with businesses across Canada, helping them attract customers through Google Ads, high-converting landing pages, marketing automation and standout creative.",
      "Canada combines large distances, several time zones and two official languages. We plan campaigns and follow-up that reflect where your customers are and how they prefer to be reached.",
    ],
    considerations: [
      {
        title: "Consent rules for email",
        text: "Canada’s Anti-Spam Legislation (CASL) requires consent before sending commercial emails and texts. Marketing automations are built around clear opt-ins, sender identification and easy unsubscribes.",
      },
      {
        title: "English and French",
        text: "If you sell in Quebec or to French-speaking customers, French-language campaigns and pages may be expected or required. We plan the campaign structure so each language can be targeted properly.",
      },
      {
        title: "Regional targeting",
        text: "Customers in Toronto, Vancouver, Calgary or Halifax can behave very differently. Location targeting and region-specific messaging help budget go where you can actually serve customers.",
      },
      {
        title: "Canadian conventions",
        text: "Pricing in Canadian dollars and wording that feels local help your ads and pages read as trustworthy to Canadian customers.",
      },
    ],
    workingTogether:
      "We work by email and scheduled calls, agreeing meeting times across Canada’s time zones — from Pacific to Atlantic.",
    faqs: [
      {
        q: "Will our email marketing follow Canada’s anti-spam law?",
        a: "We design sign-up forms and automations around CASL’s consent, identification and unsubscribe requirements. For specific legal advice, we recommend confirming with your own legal adviser.",
      },
      {
        q: "Can you target only certain provinces or cities?",
        a: "Yes. Google Ads and social platforms let us target by province, city or radius, so your budget focuses on the areas you serve.",
      },
      {
        q: "Do you work with Canadian businesses remotely?",
        a: "Yes. All of our work with Canadian businesses is remote, by email and scheduled calls at times that suit your time zone.",
      },
    ],
  },
  {
    slug: "united-kingdom",
    inSentence: "the UK",
    country: "United Kingdom",
    label: "UK",
    title: "Digital Marketing for UK Businesses",
    description:
      "Google Ads management, marketing automation, 3D websites, landing pages and creative design for businesses in the UK, delivered remotely by efficiovirtual.",
    h1: "Digital marketing for businesses in the UK",
    intro: [
      "efficiovirtual works remotely with businesses across the United Kingdom, helping them grow through Google Ads, conversion-focused landing pages, marketing automation and creative that stands out.",
      "UK customers are used to comparing options carefully before they buy. We build campaigns and pages that answer their questions clearly and make the next step easy.",
    ],
    considerations: [
      {
        title: "Privacy and email rules",
        text: "UK GDPR and the Privacy and Electronic Communications Regulations (PECR) set rules for marketing emails, cookies and tracking. Forms, consent banners and automations are set up with these in mind.",
      },
      {
        title: "British English",
        text: "Ads, landing pages and emails use British spelling and phrasing — optimisation, personalised, colour — and pricing in pounds sterling, so your brand reads naturally to UK audiences.",
      },
      {
        title: "Local and national targeting",
        text: "Whether you serve one city, a region or the whole UK, location targeting and Google Business Profile optimisation help you appear where customers are searching.",
      },
      {
        title: "Considered buyers",
        text: "Many UK buyers research and compare before enquiring. Clear pricing information, honest messaging and well-structured landing pages help build trust.",
      },
    ],
    workingTogether:
      "We work by email and scheduled calls, agreeing meeting times that suit UK working hours.",
    faqs: [
      {
        q: "Do you write in British English?",
        a: "Yes. Copy for UK campaigns, pages and emails uses British spelling and phrasing.",
      },
      {
        q: "Will our tracking and emails respect UK privacy rules?",
        a: "We set up consent-aware tracking, cookie banners and email sign-ups with UK GDPR and PECR in mind. For specific legal advice, we recommend confirming with your own legal adviser.",
      },
      {
        q: "Do you work with UK businesses remotely?",
        a: "Yes. We work remotely with UK businesses by email and scheduled calls during UK working hours.",
      },
    ],
  },
  {
    slug: "pakistan",
    inSentence: "Pakistan",
    country: "Pakistan",
    label: "Pakistan",
    title: "Digital Marketing for Pakistani Businesses",
    description:
      "Google Ads, marketing automation, 3D websites, landing pages and creative design for businesses in Pakistan, delivered remotely by efficiovirtual.",
    h1: "Digital marketing for businesses in Pakistan",
    intro: [
      "efficiovirtual works remotely with businesses in Pakistan — in Lahore, Karachi, Islamabad and beyond — helping them reach customers through search, social media and fast, modern websites.",
      "Pakistan’s online audience is young, growing and overwhelmingly mobile. We plan campaigns, landing pages and follow-up around how your customers actually browse, compare and get in touch.",
    ],
    considerations: [
      {
        title: "Mobile-first audiences",
        text: "Most people browse on smartphones, often on mobile data. Lightweight landing pages, fast-loading websites and thumb-friendly forms make a real difference to enquiries.",
      },
      {
        title: "English, Urdu and Roman Urdu",
        text: "Customers search in English, Urdu and Roman Urdu. Keyword research covers all three so campaigns and content match how people really type.",
      },
      {
        title: "Messaging-led enquiries",
        text: "Many customers prefer to contact businesses through messaging apps such as WhatsApp. We can plan click-to-message ads and landing pages that make that first conversation easy.",
      },
      {
        title: "Seasonal demand",
        text: "Ramadan, Eid, wedding season and major sales events change search and buying patterns. Budgets and creative are planned around these moments.",
      },
    ],
    workingTogether:
      "We work by email and scheduled calls, agreeing meeting times that suit Pakistan Standard Time.",
    faqs: [
      {
        q: "Do you do keyword research in Urdu and Roman Urdu?",
        a: "Yes. We include English, Urdu and Roman Urdu search terms in keyword research where they are relevant to your business.",
      },
      {
        q: "Can ads send enquiries to WhatsApp?",
        a: "Yes. Click-to-message ads and landing pages with a WhatsApp button can make it easier for customers to start a conversation.",
      },
      {
        q: "Do you work with businesses in Pakistan remotely?",
        a: "Yes. We work remotely with businesses across Pakistan by email and scheduled calls.",
      },
    ],
  },
];

export const getLocation = (slug: string) => locations.find((l) => l.slug === slug);
