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

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
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
