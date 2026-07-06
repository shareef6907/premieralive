import { MetadataRoute } from 'next'
import { brand } from '@/config/brand'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = brand.siteUrl
  return [
    {
      url: `${base}/en`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${base}/ar`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]
}
