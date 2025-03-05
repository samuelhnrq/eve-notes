import type { NextConfig } from "next";

const config: NextConfig = {
  async redirects() {
    return [
      {
        destination: "/notes",
        source: "/",
        permanent: true,
      },
    ];
  },
};

export default config;
