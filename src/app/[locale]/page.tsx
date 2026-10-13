import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import HeroSection from '@/components/sections/HeroSection'
import BrandMarqueeSection from '@/components/sections/BrandMarqueeSection'
import IdentitySection from '@/components/sections/IdentitySection'
import IntroSection from '@/components/sections/IntroSection'
import FeaturedProductionsSection from '@/components/sections/FeaturedProductionsSection'
import DivisionsSection from '@/components/sections/DivisionsSection'
import GrowthSystemSection from '@/components/sections/GrowthSystemSection'
import WhyBothSection from '@/components/sections/WhyBothSection'
import WhyPremieraSection from '@/components/sections/WhyPremieraSection'
import FounderLetterSection from '@/components/sections/FounderLetterSection'
import FinalCTASection from '@/components/sections/FinalCTASection'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isArabic = locale === 'ar'
  const domain = 'https://www.premieralive.com'
  const canonical = `${domain}/${locale}`

  return {
    title: isArabic
      ? 'بريمييرا لايف | إنتاج أفلام وبث مباشر في السعودية'
      : 'Premiera Live | Live Streaming & Film Production in Saudi Arabia',
    description: isArabic
      ? 'بريمييرا لايف شركة إنتاج سينمائي وبث مباشر من مقرها في الخبر بالسعودية. ننتج الأفلام التجارية وأفلام الشركات والوثائقيات والبث متعدد الكاميرات والفعاليات المباشرة.'
      : 'Premiera Live is a live streaming and film production company in Al Khobar, Saudi Arabia — producing commercial films, corporate videos, documentaries, and multi-camera live broadcasts across the Gulf.',
    alternates: {
      canonical,
      languages: {
        'en-SA': `${domain}/en`,
        'ar-SA': `${domain}/ar`,
        'x-default': `${domain}/en`,
      },
    },
    openGraph: {
      title: isArabic
        ? 'بريمييرا لايف | إنتاج أفلام وبث مباشر في السعودية'
        : 'Premiera Live | Live Streaming & Film Production in Saudi Arabia',
      description: isArabic
        ? 'بريمييرا لايف شركة إنتاج سينمائي وبث مباشر من مقرها في الخبر بالسعودية.'
        : 'Premiera Live is a live streaming and film production company in Al Khobar producing across Saudi Arabia.',
      url: canonical,
      locale: isArabic ? 'ar_SA' : 'en_SA',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: isArabic
        ? 'بريمييرا لايف | إنتاج أفلام وبث مباشر في السعودية'
        : 'Premiera Live | Live Streaming & Film Production in Saudi Arabia',
      description: isArabic
        ? 'بريمييرا لايف شركة إنتاج سينمائي وبث مباشر من مقرها في الخبر بالسعودية.'
        : 'Premiera Live is a live streaming and film production company in Al Khobar producing across Saudi Arabia.',
    },
  }
}

export default async function Page({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <HeroSection />
      <BrandMarqueeSection />
      <IdentitySection />
      <IntroSection />
      <FeaturedProductionsSection />
      <DivisionsSection />
      <GrowthSystemSection id="process" />
      <WhyBothSection />
      <WhyPremieraSection />
      <FounderLetterSection />
      <FinalCTASection />
    </>
  )
}
