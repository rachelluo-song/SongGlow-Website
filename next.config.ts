import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // Preserve authority from the catalog's former plural category slug.
        source: "/components/chip-resistors/:part",
        destination: "/components/chip-resistor/:part",
        permanent: true,
      },
      {
        source: "/components/chip-resistors",
        destination: "/components/chip-resistor",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
