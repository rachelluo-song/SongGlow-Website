import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // Send the strongest legacy catalog URLs directly to their one
        // canonical host and slug in a single permanent hop.
        source: "/components/chip-resistors/:part",
        has: [{ type: "host", value: "www.songglow.com" }],
        destination: "https://songglow.com/components/chip-resistor/:part",
        permanent: true,
      },
      {
        source: "/components/chip-resistors",
        has: [{ type: "host", value: "www.songglow.com" }],
        destination: "https://songglow.com/components/chip-resistor",
        permanent: true,
      },
      {
        // Consolidate every remaining www URL on the canonical production
        // origin. Next emits a search-engine-friendly 308 for permanent=true.
        source: "/:path*",
        has: [{ type: "host", value: "www.songglow.com" }],
        destination: "https://songglow.com/:path*",
        permanent: true,
      },
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
