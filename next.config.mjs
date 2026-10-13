/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    // Standalone Westpaq client sample: a single static file in public/westpaq/.
    return [{ source: "/westpaq", destination: "/westpaq/index.html" }];
  },
  async headers() {
    return [
      {
        // The frame sequence never changes between deploys of the same name,
        // so let browsers and Vercel's edge cache it aggressively.
        source: "/video-split/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
