import { renderOg, ogSize } from "@/lib/og";
import { getLocation, locations } from "@/lib/locations";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "efficiovirtual — where we work";

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export default function OG({ params }: { params: { slug: string } }) {
  const l = getLocation(params.slug);
  return renderOg("Where we work", l ? l.h1 : "Digital marketing");
}
