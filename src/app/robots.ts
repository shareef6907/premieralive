import { MetadataRoute } from 'next'
import { brand } from '@/config/brand'

export default function robots(): MetadataRoute.Robots {
  const indexable = brand.siteIndexable
  return {
    rules: indexable
      ? { userAgent: '*', allow: '/' }
      : { userAgent: '*', disallow: '/' },
    sitemap: `https://www.premieralive.com/sitemap.xml`,
  }
}
