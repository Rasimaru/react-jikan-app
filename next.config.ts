import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  distDir: './dist',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.myanimelist.net',
        pathname: '/images/**'
      }
    ],
    unoptimized: true
  }
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
