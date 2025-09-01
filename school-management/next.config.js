/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  poweredByHeader: false,
  compress: true,
  trailingSlash: false,
  // Ensure proper build output
  distDir: '.next',
}

module.exports = nextConfig
