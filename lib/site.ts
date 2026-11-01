export const site = {
  name: "efficiovirtual",
  title: "efficiovirtual — Digital marketing agency",
  description:
    "efficiovirtual is a digital marketing agency for Google Ads, marketing automation, 3D websites, landing pages and creative design. Strategy, creative and performance in one connected system.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://efficiovirtual.com",
  /**
   * Address the contact form writes to, and the address shown on the page.
   * Override with NEXT_PUBLIC_CONTACT_EMAIL.
   */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@efficiovirtual.com",
  /**
   * Optional: a form endpoint that accepts a JSON POST (Formspree, Basin, a webhook...).
   * When set, the form submits there. When not set, it opens the visitor's mail app instead.
   */
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "",
};

export const nav = [
  { href: "/#approach", label: "Approach" },
  { href: "/#services", label: "Services" },
  { href: "/#outcome", label: "Outcome" },
  { href: "/contact", label: "Contact" },
] as const;

/** The six chapters of the homepage story, in order. Ids double as anchor targets. */
export const chapters = [
  { id: "top", label: "Intro" },
  { id: "challenge", label: "Challenge" },
  { id: "approach", label: "Approach" },
  { id: "services", label: "Services" },
  { id: "outcome", label: "Outcome" },
  { id: "contact", label: "Let’s talk" },
] as const;
