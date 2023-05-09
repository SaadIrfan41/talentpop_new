/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'talentpop.s3.amazonaws.com',
      },
    ],
  },
}

module.exports = nextConfig
