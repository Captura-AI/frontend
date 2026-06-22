import type { NextConfig } from "next";

// Derive the backend hostname from the same env var resolveImageUrl uses,
// so next/image's allowlist stays in sync with the actual API origin.
const backendRoot = (
  process.env["NEXT_PUBLIC_API_BASE_URL"] ?? "http://localhost:1337/api"
).replace(/\/api$/, "");

const backendUrl = new URL(backendRoot);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: backendUrl.protocol.replace(":", "") as "http" | "https",
        hostname: backendUrl.hostname,
        ...(backendUrl.port ? { port: backendUrl.port } : {}),
        pathname: "/uploads/**",
      },
    ],
  },
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
