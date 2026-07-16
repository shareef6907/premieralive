import { MetadataRoute } from 'next'
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://www.premieralive.com/sitemap.xml',
    host: 'https://www.premieralive.com',
  }
}
