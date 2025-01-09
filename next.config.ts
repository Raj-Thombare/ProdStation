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
      },
      {
        protocol: 'https',
        hostname: 'http://prodstation.rajthombare.xyz',
        port: "",
      }
    ]
  },
};

export default nextConfig;
