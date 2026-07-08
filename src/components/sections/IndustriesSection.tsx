import { useLocale } from 'next-intl'
import Section from '../Section'

export default function IndustriesSection() {
  const locale = useLocale()
  const isArabic = locale === 'ar'

  return (
    <Section id="industries" eyebrow={isArabic ? 'القطاعات' : 'INDUSTRIES'}>
      {/* Industry chips — PR-5 */}
    </Section>
  )
}
