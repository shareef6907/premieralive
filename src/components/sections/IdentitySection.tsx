'use client'

import { useLocale } from 'next-intl'
import Section from '../Section'

const EN = 'Premiera Live is a film production company based in Al Khobar, Saudi Arabia. We produce commercial films, corporate videos, documentaries, professional photography, and animation for businesses across Riyadh, Jeddah, Dammam, Jubail, and the Eastern Province. Alongside production, we build custom-coded websites and digital platforms — so the team that tells your story also builds where it lives.'

const AR = 'بريمييرا لايف شركة إنتاج أفلام مقرها الخبر في السعودية. ننتج الأفلام التجارية وأفلام الشركات والوثائقيات والتصوير الاحترافي والرسوم المتحركة لعملاء في الرياض وجدة والدمام والجبيل والمنطقة الشرقية. وإلى جانب الإنتاج، نبني المواقع المخصصة والمنصات الرقمية — ليكون الفريق الذي يروي قصتك هو نفسه من يبني حضورك الرقمي.'

export default function IdentitySection() {
  const locale = useLocale()
  const isArabic = locale === 'ar'

  return (
    <Section>
      <div
        style={{
          maxWidth: '70ch',
          marginInline: 'auto',
          textAlign: 'center',
          direction: isArabic ? 'rtl' : 'ltr',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'var(--color-text-dim)',
            lineHeight: 1.8,
            margin: 0,
          }}
        >
          {isArabic ? AR : EN}
        </p>
      </div>
    </Section>
  )
}
