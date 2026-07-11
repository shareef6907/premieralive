'use client'
import { useParams } from 'next/navigation'
export default function WhyPremieraSection() {
  const locale = useParams().locale as string
  return (
    <section className="v2-section v2-section--elevated">
      <div className="v2-container" style={{ textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--body)', color: 'var(--text-dim)', marginBottom: '3rem' }}>
          {locale === 'ar' ? 'نلتزم معياراً واحداً منذ خمسة عشر عاماً.' : 'Fifteen years. One standard.'}
        </p>
      </div>
    </section>
  )
}