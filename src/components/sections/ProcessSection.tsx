import { useLocale } from 'next-intl'
import Section from '../Section'

export default function ProcessSection() {
  const locale = useLocale()
  const isArabic = locale === 'ar'

  return (
    <Section
      id="process"
      eyebrow={isArabic ? 'كيف نعمل' : 'HOW WE WORK'}
      title={isArabic ? 'نتّبع منهجاً لا حظاً.' : 'A PROCESS, NOT A GAMBLE.'}
    >
      {/* Process timeline — PR-5 */}
    </Section>
  )
}
