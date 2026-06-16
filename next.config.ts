import type { NextConfig } from "next";

const storageUrl = process.env.NEXT_PUBLIC_LARAVEL_STORAGE_BASE_URL;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: storageUrl
      ? [
          {
            protocol: new URL(storageUrl).protocol.replace(":", "") as "http" | "https",
            hostname: new URL(storageUrl).hostname,
            port: new URL(storageUrl).port,
            pathname: "/storage/**",
          },
        ]
      : [],
  },
};

export default nextConfig;