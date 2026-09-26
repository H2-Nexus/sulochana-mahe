import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // StrictMode double-runs effects in development, which would replay the cloud
  // intro and boot the animation runtime twice.
  reactStrictMode: false,
  poweredByHeader: false,
};

export default nextConfig;
