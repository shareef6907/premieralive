'use client'
import { useParams } from 'next/navigation'
export default function FounderLetterSection() {
  const locale = useParams().locale as string
  return (
    <section className="v2-section">
      <div className="v2-container" style={{ maxWidth: '40rem' }}>
        <p className="v2-eyebrow">{locale === 'ar' ? 'رسالة المؤسس' : 'FROM THE FOUNDER'}</p>
      </div>
    </section>
  )
}