/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'standalone',
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/home',
  //       permanent: true,
  //     },
  //   ];
  // },
  images: {
    domains: ['www.eef.or.th', 'inwfile.com', 'encrypted-tbn0.gstatic.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.eef.or.th',
        pathname: '/wp-content/**',
        search: '**',
      },
      {
        protocol: 'https',
        hostname: 'inwfile.com',
        pathname: '/s-e/**',
        search: '**',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        pathname: '/images/**',
        search: '**',
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
