/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: [
      '@react-pdf/renderer',
      'pdfkit',
    ],
    outputFileTracingIncludes: {
      '/api/**/*': [
        './node_modules/pdfkit/js/standard-fonts/**',
        './node_modules/pdfkit/js/data/**',
        './node_modules/@react-pdf/**',
        './public/fonts/**',
        './public/brand/**',
      ],
    },
  },
  // Redirect old Studio OS page paths to /agency
  async redirects() {
    const studioPages = [
      '/login',
      '/dashboard',
      '/crm',
      '/prospects',
      '/clients',
      '/tasks',
      '/payments',
      '/finance',
      '/revenue',
      '/accounting',
      '/team',
      '/whatsapp',
      '/proposals',
      '/replies',
      '/outbound',
    ];
    const redirects = [];
    for (const page of studioPages) {
      redirects.push({
        source: page,
        destination: `/agency${page}`,
        permanent: true,
      });
      // Nested /proposals routes
      if (page === '/proposals') {
        redirects.push({
          source: '/proposals/new',
          destination: '/agency/proposals/new',
          permanent: true,
        });
        redirects.push({
          source: '/proposals/rates',
          destination: '/agency/proposals/rates',
          permanent: true,
        });
        redirects.push({
          source: '/proposals/:id',
          destination: '/agency/proposals/:id',
          permanent: true,
        });
      }
    }
    return redirects;
  },
};
module.exports = nextConfig;
