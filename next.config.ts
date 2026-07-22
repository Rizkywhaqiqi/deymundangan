import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  serverExternalPackages: [],
  // Optimasi untuk production build
  poweredByHeader: false,
  reactStrictMode: true,
  // Cache gambar dari imgbb dan supabase storage lebih lama
  images: {
    minimumCacheTTL: 86400, // 24 jam cache untuk gambar statis
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'imgbb.com',
      },
    ],
  },
  // Optimasi bundle
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
