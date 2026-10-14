/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    // Standalone Westpaq client sample in public/westpaq/. Redirect (not rewrite) so the
    // page's relative image paths resolve under /westpaq/.
    return [{ source: "/westpaq", destination: "/westpaq/index.html", permanent: false }];
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
