import { setRequestLocale } from 'next-intl/server'
import ScrollScrubHero from '@/components/ScrollScrubHero'
import Marquee from '@/components/Marquee'
import Services from '@/components/Services'
import SelectedWork from '@/components/SelectedWork'
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
      <ScrollScrubHero locale={locale} />
      <Marquee />
      <Services />
      <SelectedWork />
      <WhyUs />
      <Contact />
    </>
  )
}
