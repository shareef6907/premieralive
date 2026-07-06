import { MetadataRoute } from 'next'
import { brand } from '@/config/brand'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      // When site is not indexable, block all crawlers
      disallow: brand.siteIndexable ? [] : ['/'],
    },
    sitemap: `${brand.siteUrl}/sitemap.xml`,
  }
}
