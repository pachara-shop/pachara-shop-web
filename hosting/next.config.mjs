/** @type {import('next').NextConfig} */
import pkg from './next-i18next.config.js';
const { i18n } = pkg;

const nextConfig = {
  i18n,
  swcMinify: true,
  output: 'standalone',
  experimental: {},
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ];
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
