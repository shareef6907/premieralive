import { useLocale } from 'next-intl'
import Section from '../Section'

export default function GoalPickerSection() {
  const locale = useLocale()
  const isArabic = locale === 'ar'

  return (
    <Section
      id="goal"
      eyebrow={isArabic ? 'ابدأ بهدفك' : 'START WITH YOUR GOAL'}
      title={isArabic ? 'ماذا تريد أن تحقق؟' : 'WHAT DO YOU WANT TO ACHIEVE?'}
    >
      <div style={{ color: 'var(--color-text-dim)', fontFamily: 'var(--font-body)' }}>
        Goal picker — PR-3
      </div>
    </Section>
  )
}
