'use client'
import { useParams } from 'next/navigation'
export default function FourPillarsSection() {
  const locale = useParams().locale as string
  return (
    <section className="v2-section" id="services">
      <div className="v2-container">
        <p className="v2-eyebrow">{locale === 'ar' ? 'ماذا نقدم' : 'WHAT WE DO'}</p>
        <h2 className="v2-title">{locale === 'ar' ? 'نجمع أربعة تخصصات تحت شريك واحد.' : 'ONE PARTNER. FOUR DISCIPLINES.'}</h2>
      </div>
    </section>
  )
}