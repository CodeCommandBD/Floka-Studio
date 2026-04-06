import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
    ],
  },
  turbopack: {
    // Explicitly set the workspace root to resolve the "inferred root" warning.
    // Next.js 16 requires this to be an absolute path.
    root: path.resolve("."),
    resolveAlias: {
      // Add any aliases if needed
    },
  },
};

export default nextConfig;
