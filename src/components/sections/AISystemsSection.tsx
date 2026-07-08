import { useLocale } from 'next-intl'
import Section from '../Section'

export default function AISystemsSection() {
  const locale = useLocale()
  const isArabic = locale === 'ar'

  return (
    <Section
      id="ai"
      eyebrow={isArabic ? 'أنظمة الذكاء الاصطناعي' : 'AI SYSTEMS'}
      title={isArabic ? 'بدأ مستقبل التسويق يعمل هنا اليوم.' : 'THE FUTURE OF MARKETING IS ALREADY WORKING HERE.'}
    >
      {/* AI cards — PR-5 */}
    </Section>
  )
}
