import { setRequestLocale } from 'next-intl/server'
import HeroVideo from '@/components/HeroVideo'
import ScrollScrubHero from '@/components/ScrollScrubHero'
import Marquee from '@/components/Marquee'
import Services from '@/components/Services'
import BrandFilms from '@/components/BrandFilms'
import ShortsReels from '@/components/ShortsReels'
import AnimationShowcase from '@/components/AnimationShowcase'
import WhyUs from '@/components/WhyUs'
import Contact from '@/components/Contact'

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <HeroVideo locale={locale} />
      <Marquee />
      <ScrollScrubHero locale={locale} />
      <Services />
      <BrandFilms />
      <ShortsReels />
      <AnimationShowcase />
      <WhyUs />
      <Contact />
    </>
  )
}
