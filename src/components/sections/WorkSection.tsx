import { useLocale } from 'next-intl'
import Section from '../Section'

export default function WorkSection() {
  const locale = useLocale()
  const isArabic = locale === 'ar'

  return (
    <Section
      id="work"
      eyebrow={isArabic ? 'أعمال مختارة' : 'SELECTED WORK'}
      title={isArabic ? 'نُثبت بالأعمال لا بالوعود.' : 'PROOF, NOT PROMISES.'}
    >
      {/* Work carousels — PR-4 */}
    </Section>
  )
}
