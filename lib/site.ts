export const site = {
  name: "efficiovirtual",
  title: "efficiovirtual — Digital marketing, creative and 3D web",
  description:
    "efficiovirtual helps brands grow through strategy, creative and performance marketing: Google Ads, marketing automation, 3D websites, landing pages and creative design.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://efficiovirtual.com",
  /**
   * Where the contact form sends messages (opens the visitor's mail app).
   * Override with NEXT_PUBLIC_CONTACT_EMAIL in your hosting environment.
   */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "admin@efficiovirtual.com",
};

export const nav = [
  { href: "/#approach", label: "Approach" },
  { href: "/#services", label: "Services" },
  { href: "/#outcome", label: "Outcome" },
  { href: "/#contact", label: "Contact" },
] as const;
