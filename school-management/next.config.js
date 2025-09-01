/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Remove standalone for Vercel
  poweredByHeader: false,
  compress: true,
  // Ensure proper trailing slash handling
  trailingSlash: false,
}

module.exports = nextConfig
