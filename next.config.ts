import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["momentum.redberryinternship.ge"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
