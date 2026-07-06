import { setRequestLocale } from 'next-intl/server'
import Hero from '@/components/Hero'
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
      <Hero />
      <Services />
      <SelectedWork />
      <WhyUs />
      <Contact />
    </>
  )
}
