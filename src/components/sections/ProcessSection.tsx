'use client'
import { useParams } from 'next/navigation'
export default function ProcessSection() {
  const locale = useParams().locale as string
  return (
    <section className="v2-section" id="process">
      <div className="v2-container">
        <p className="v2-eyebrow">{locale === 'ar' ? 'كيف نعمل' : 'HOW WE WORK'}</p>
        <h2 className="v2-title">{locale === 'ar' ? 'نتّبع منهجاً لا حظاً.' : 'A PROCESS, NOT A GAMBLE.'}</h2>
      </div>
    </section>
  )
}