'use client'
import { useParams } from 'next/navigation'
export default function FinalCTASection() {
  const locale = useParams().locale as string
  return (
    <section className="v2-section" id="contact" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="v2-container" style={{ textAlign: 'center' }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--h1)',
          lineHeight: 0.95,
          textTransform: 'uppercase',
          color: 'var(--text)',
          marginBottom: '2.5rem',
        }}>
          {locale === 'ar' ? 'لنصنع معاً شيئاً استثنائياً' : 'READY TO BUILD SOMETHING EXTRAORDINARY?'}
        </h2>
      </div>
    </section>
  )
}