'use client'
import { useParams } from 'next/navigation'
export default function WorkSection() {
  const locale = useParams().locale as string
  return (
    <section className="v2-section" id="work">
      <div className="v2-container">
        <p className="v2-eyebrow">{locale === 'ar' ? 'أعمال مختارة' : 'SELECTED WORK'}</p>
        <h2 className="v2-title">{locale === 'ar' ? 'نُثبت بالأعمال لا بالوعود.' : 'PROOF, NOT PROMISES.'}</h2>
      </div>
    </section>
  )
}