import { MetadataRoute } from 'next'
import { ALL_SLUGS } from '@/config/services'
import { MARKETING_SLUGS } from '@/config/marketingServices'

const BASE = 'https://www.premieralive.com'
const now = new Date()

export default function sitemap(): MetadataRoute.Sitemap {
  const serviceUrls = ALL_SLUGS.flatMap((slug) => [
    { url: `${BASE}/en/services/${slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE}/ar/services/${slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
  ])

  const marketingUrls = MARKETING_SLUGS.flatMap((slug) => [
    { url: `${BASE}/en/marketing/${slug}`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${BASE}/ar/marketing/${slug}`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
  ])

  return [
    { url: `${BASE}/en`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/ar`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/en/digital`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/ar/digital`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/en/services`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/ar/services`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/en/marketing`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/ar/marketing`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    ...serviceUrls,
    ...marketingUrls,
  ]
}
