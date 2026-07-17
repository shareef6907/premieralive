import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import SmoothScroll from '@/components/SmoothScroll'
import CursorGlow from '@/components/CursorGlow'
import { brand } from '@/config/brand'
import { IMAGES } from '@/config/media'

const locales = ['en', 'ar']

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isArabic = locale === 'ar'
  const title = isArabic
    ? 'بريمييرا لايف | أفلام ومواقع وتسويق في السعودية'
    : 'Premiera Live | Film, Web & Marketing Agency in Saudi Arabia'
  const desc = isArabic
    ? 'ننتج الأفلام، ونبني المواقع المخصصة، وندير حملات التسويق للشركات في السعودية. أكثر من 15 عامًا، وأكثر من 1,000 مشروع، وأكثر من 20 علامة عالمية.'
    : 'We produce films, build custom websites, and run marketing retainers for businesses in Saudi Arabia. 15+ years, 1,000+ projects, 20+ global brands.'

  return {
    title,
    description: desc,
    alternates: {
      canonical: `https://www.premieralive.com/${locale}`,
      languages: {
        'en-SA': 'https://www.premieralive.com/en',
        'ar-SA': 'https://www.premieralive.com/ar',
        'x-default': 'https://www.premieralive.com/en',
      },
    },
    openGraph: {
      title,
      description: desc,
      url: `https://www.premieralive.com/${locale}`,
      siteName: brand.name,
      locale: isArabic ? 'ar_SA' : 'en_SA',
      type: 'website',
      images: [
        {
          url: IMAGES.ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: desc,
    },
    robots: {
      index: brand.siteIndexable,
      follow: brand.siteIndexable,
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!locales.includes(locale)) notFound()

  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <SmoothScroll>
            <CursorGlow />
            <Nav />
            <main>{children}</main>
            <Footer />
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
