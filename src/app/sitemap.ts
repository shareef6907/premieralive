import { MetadataRoute } from 'next'
import { brand } from '@/config/brand'
import { ALL_SLUGS } from '@/config/services'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = brand.siteUrl
  const now = new Date()

  const serviceUrls: MetadataRoute.Sitemap = ALL_SLUGS.flatMap((slug) => [
    {
      url: `${base}/en/services/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${base}/ar/services/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ])

  return [
    {
      url: `${base}/en`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${base}/ar`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${base}/en/services`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${base}/ar/services`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...serviceUrls,
  ]
}
