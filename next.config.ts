import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "neodb.social",
        pathname: "/m/**",
      },
    ],
  },
};

export default nextConfig;
