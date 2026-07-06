const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin('./src/i18n.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'premiera-live-media.s3.us-east-1.amazonaws.com',
      },
    ],
  },
}

module.exports = withNextIntl(nextConfig)
