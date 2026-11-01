import { renderOg, ogSize } from "@/lib/og";
import { getService, services } from "@/lib/content";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "efficiovirtual service";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default function OG({ params }: { params: { slug: string } }) {
  const s = getService(params.slug);
  return renderOg("efficiovirtual services", s ? s.seoTitle : "Digital marketing services");
}
