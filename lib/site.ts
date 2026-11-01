/**
 * Site-wide settings. This is the main file to edit for contact details,
 * social links and navigation.
 */
export const site = {
  name: "efficiovirtual",
  title: "efficiovirtual | Digital Marketing Agency: Google Ads, SEO, Social Media & Web Development",
  description:
    "efficiovirtual is a performance-focused digital marketing agency for brands in the USA, UK, Canada and Pakistan: Google Ads, SEO and Google Business Profile, social media marketing, website development, 3D websites, landing pages, marketing automation and creative design.",
  /** Countries we market to. Used in search-engine data on the homepage. */
  areasServed: ["United States", "United Kingdom", "Canada", "Pakistan"],
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://efficiovirtual.com",
  /** Contact email used by every email link and the contact form. */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "admin@efficiovirtual.com",
  /**
   * Optional: path to your own logo file inside /public, e.g. "/brand/logo.svg".
   * Leave as null to use the built-in vector version of the ev mark.
   */
  logoFile: null as string | null,
};

export const socials = [
  { name: "Instagram", href: "https://www.instagram.com/efficiovirtual/" },
  { name: "Facebook", href: "https://www.facebook.com/efficiovirtual/" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/efficiovirtual" },
  { name: "X", href: "https://x.com/efficiovirtual" },
] as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
