import { setRequestLocale } from 'next-intl/server'
import HeroSection from '@/components/sections/HeroSection'
import BrandMarqueeSection from '@/components/sections/BrandMarqueeSection'
import FourPillarsSection from '@/components/sections/FourPillarsSection'
import GoalPickerSection from '@/components/sections/GoalPickerSection'
import WorkSection from '@/components/sections/WorkSection'
import AISystemsSection from '@/components/sections/AISystemsSection'
import ProcessSection from '@/components/sections/ProcessSection'
import IndustriesSection from '@/components/sections/IndustriesSection'
import WhyPremieraSection from '@/components/sections/WhyPremieraSection'
import FounderLetterSection from '@/components/sections/FounderLetterSection'
import FinalCTASection from '@/components/sections/FinalCTASection'
// FooterSection lives in the layout

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
      <FourPillarsSection />
      <GoalPickerSection />
      <WorkSection />
      <AISystemsSection />
      <ProcessSection />
      <IndustriesSection />
      <WhyPremieraSection />
      <FounderLetterSection />
      <FinalCTASection />
    </>
  )
}
