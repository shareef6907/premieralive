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

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isArabic = locale === 'ar'
  const domain = 'https://www.premieralive.com'
  const canonical = `${domain}/${locale}`

  return {
    title: isArabic
      ? 'بريمييرا لايف | إنتاج سينمائي وتجارب رقمية في السعودية'
      : 'Premiera Live | Cinematic Production & Digital Experiences in Saudi Arabia',
    description: isArabic
      ? 'بريمييرا لايف شركة إنتاج سينمائي وتجارب رقمية من مقرها في الخبر بالسعودية — نصنع الأفلام التجارية وأفلام الشركات والوثائقيات والتصوير الاحترافي، ونبني المواقع والمنصات وأنظمة الذكاء الاصطناعي للشركات في أنحاء السعودية.'
      : 'Premiera Live is a cinematic production and digital experiences company based in Al Khobar, Saudi Arabia — producing commercial films, corporate videos, documentaries, and professional photography, and building websites, platforms, and AI systems for businesses across Saudi Arabia.',
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
        ? 'بريمييرا لايف | إنتاج سينمائي وتجارب رقمية في السعودية'
        : 'Premiera Live | Cinematic Production & Digital Experiences in Saudi Arabia',
      description: isArabic
        ? 'بريمييرا لايف شركة إنتاج سينمائي وتجارب رقمية من مقرها في الخبر بالسعودية.'
        : 'Premiera Live is a cinematic production and digital experiences company based in Al Khobar, Saudi Arabia.',
      url: canonical,
      locale: isArabic ? 'ar_SA' : 'en_SA',
    },
    twitter: {
      card: 'summary_large_image',
      title: isArabic
        ? 'بريمييرا لايف | إنتاج سينمائي وتجارب رقمية في السعودية'
        : 'Premiera Live | Cinematic Production & Digital Experiences in Saudi Arabia',
      description: isArabic
        ? 'بريمييرا لايف شركة إنتاج سينمائي وتجارب رقمية من مقرها في الخبر بالسعودية.'
        : 'Premiera Live is a cinematic production and digital experiences company based in Al Khobar, Saudi Arabia.',
    },
  }
}

export default async function Page({
  params,
}: Props) {
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
