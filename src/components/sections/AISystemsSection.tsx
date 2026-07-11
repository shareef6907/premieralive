'use client'
import { useParams } from 'next/navigation'
export default function AISystemsSection() {
  const locale = useParams().locale as string
  return (
    <section className="v2-section">
      <div className="v2-container">
        <p className="v2-eyebrow">{locale === 'ar' ? 'أنظمة الذكاء الاصطناعي' : 'AI SYSTEMS'}</p>
        <h2 className="v2-title">{locale === 'ar' ? 'بدأ مستقبل التسويق يعمل هنا اليوم.' : 'THE FUTURE OF MARKETING IS ALREADY WORKING HERE.'}</h2>
      </div>
    </section>
  )
}