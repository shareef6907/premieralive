import { useLocale } from 'next-intl'
import Section from '../Section'

export default function ScrollScrubSection() {
  const locale = useLocale()
  const isArabic = locale === 'ar'

  return (
    <Section id="signature" eyebrow={isArabic ? 'مميز' : 'SIGNATURE'}>
      {/* Scroll-scrub film — PR-4 */}
    </Section>
  )
}
