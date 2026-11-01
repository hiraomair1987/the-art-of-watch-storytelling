import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    ...["services", "about", "contact"].map((p) => ({ url: `${site.url}/${p}`, changeFrequency: "monthly" as const, priority: 0.9 })),
    ...services.map((s) => ({ url: `${site.url}/services/${s.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
