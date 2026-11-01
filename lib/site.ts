/**
 * Site-wide settings. This is the main file to edit for contact details,
 * social links and navigation.
 */
export const site = {
  name: "efficiovirtual",
  title: "efficiovirtual | Digital Marketing, Google Ads & Web Design",
  description:
    "Grow your brand with Google Ads, marketing automation, 3D websites, landing pages, and creative design from efficiovirtual.",
  /** Markets where efficiovirtual takes on clients (remote work). Used in structured data and homepage copy. */
  areasServed: ["United States", "United Arab Emirates", "Canada", "United Kingdom", "Pakistan"],
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://efficiovirtual.com",
  /** Contact email used by every email link and the contact form. */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "admin@efficiovirtual.com",
  /**
   * Optional: path to your own logo file inside /public, e.g. "/brand/logo.svg".
   * Leave as null to use the built-in vector version of the ev mark.
   */
  logoFile: null as string | null,
  /**
   * Google Search Console "HTML tag" verification code (only the content="..." part).
   * Paste it here or set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION in Vercel.
   */
  googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
  /** Bing Webmaster Tools verification code (optional). */
  bingSiteVerification: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ?? "",
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
  { href: "/case-studies", label: "Case Studies" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
