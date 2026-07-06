import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { brand } from '@/config/brand'

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
    ? 'بريميرا لايف | وكالة تسويق في السعودية'
    : 'Premiera Live | Marketing Agency in Saudi Arabia'
  const desc = isArabic
    ? 'وكالة تسويق وإبداع في السعودية — نصنع علامات تجارية لا يمكن تجاهلها.'
    : 'Marketing and creative agency in Saudi Arabia — making brands impossible to ignore.'

  return {
    title,
    description: desc,
    alternates: {
      canonical: `${brand.siteUrl}/${locale}`,
      languages: {
        en: `${brand.siteUrl}/en`,
        ar: `${brand.siteUrl}/ar`,
      },
    },
    openGraph: {
      title,
      description: desc,
      url: `${brand.siteUrl}/${locale}`,
      siteName: brand.name,
      locale: isArabic ? 'ar_SA' : 'en_US',
      type: 'website',
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
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Nav />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
