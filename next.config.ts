import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/ungdomskort",
        destination: "/work/ungdomskort",
      },
      {
        source: "/xbit",
        destination: "/work/xbit",
      },
      {
        source: "/ipupisiciliani",
        destination: "/work/pupisiciliani",
      },
      {
        source: "/pupisiciliani",
        destination: "/work/pupisiciliani",
      },
    ];
  },
};

export default nextConfig;
