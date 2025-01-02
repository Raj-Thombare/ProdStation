import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nwvwhqqdwtjgafvitomf.supabase.co',
        port: "",

      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
        port: "",
      }
    ]
  },
};

export default nextConfig;
