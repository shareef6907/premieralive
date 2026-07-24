import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Premiera Live',
    short_name: 'Premiera',
    description: 'A film production company in Al Khobar producing commercial films, corporate videos, documentaries, photography, and animation across Saudi Arabia — with custom websites and marketing built in-house. 15+ years, 1,000+ projects.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
