import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import { GOOGLE_ADS_ID } from '@/config/analytics'
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
    ? 'بريمييرا لايف | شركة إنتاج أفلام في السعودية'
    : 'Premiera Live | Film Production Company in Saudi Arabia'
  const desc = isArabic
    ? 'ننتج الأفلام التجارية وأفلام الشركات والوثائقيات والرسوم المتحركة من الخبر لعملاء في أنحاء السعودية — ونبني المواقع والمنصات الرقمية داخليًا. أكثر من 15 عامًا وأكثر من 1,000 مشروع.'
    : 'A film production company in Al Khobar producing commercial films, corporate videos, documentaries, photography, and animation across Saudi Arabia — with custom websites and marketing built in-house. 15+ years, 1,000+ projects.'

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
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-ads-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ADS_ID}');
          `}
        </Script>
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
