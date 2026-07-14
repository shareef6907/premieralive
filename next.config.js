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
  async redirects() {
    return [
      {
        source: '/en/services/business-software-development-saudi-arabia',
        destination: '/en/services/app-development-saudi-arabia',
        permanent: true,
      },
      {
        source: '/ar/services/business-software-development-saudi-arabia',
        destination: '/ar/services/app-development-saudi-arabia',
        permanent: true,
      },
    ]
  },
}

module.exports = withNextIntl(nextConfig)
