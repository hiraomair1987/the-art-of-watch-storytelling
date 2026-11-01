import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "efficiovirtual",
    short_name: "efficiovirtual",
    description: "Digital marketing, Google Ads and web design.",
    start_url: "/",
    display: "standalone",
    background_color: "#14030f",
    theme_color: "#5d0755",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
