import type { NextConfig } from "next";

// Backend root URL — strips trailing /api so we proxy raw file paths correctly.
const backendRoot = (
  process.env["NEXT_PUBLIC_API_BASE_URL"] ?? "http://localhost:1337/api"
).replace(/\/api$/, "");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Proxy /uploads/** through Next.js so next/image can optimise backend-served
  // files without triggering the private-IP SSRF block. resolveImageUrl returns
  // root-relative "/uploads/..." paths that hit this rewrite instead of going
  // directly to the backend with an absolute URL.
  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: `${backendRoot}/uploads/:path*`,
      },
    ];
  },
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
