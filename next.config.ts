import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  distDir: './dist',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.myanimelist.net',
        pathname: '/images/**'
      }
    ]
  }
};

export default nextConfig;
