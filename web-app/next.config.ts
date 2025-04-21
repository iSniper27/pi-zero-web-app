import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  output: "standalone",
  crossOrigin: 'anonymous',
};

export default nextConfig;
