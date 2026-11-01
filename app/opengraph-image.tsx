import { renderOg, ogSize } from "@/lib/og";

export const alt = "efficiovirtual — Digital marketing that moves your brand forward.";
export const size = ogSize;
export const contentType = "image/png";

export default function OG() {
  return renderOg("Digital marketing agency", "Digital marketing that moves your brand forward.");
}
