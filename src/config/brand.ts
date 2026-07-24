export const brand = {
  name: 'Premiera Live',
  nameAr: 'بريمييرا لايف',
  tagline: 'Film Production Company in Saudi Arabia',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? '',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://premieralive.com',
  mediaUrl: process.env.NEXT_PUBLIC_MEDIA_URL ?? 'https://premiera-live-media.s3.us-east-1.amazonaws.com',
  siteIndexable: process.env.NEXT_PUBLIC_SITE_INDEXABLE === 'true',
}
