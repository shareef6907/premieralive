'use client'
import { useParams } from 'next/navigation'
export default function BrandMarqueeSection() {
  const locale = useParams().locale as string
  return (
    <section className="v2-section" style={{ paddingBlock: '4rem', overflow: 'hidden' }}>
      <div className="v2-container">
        <p className="v2-eyebrow">{locale === 'ar' ? 'وثقت بنا علامات عالمية' : 'TRUSTED BY GLOBAL BRANDS'}</p>
      </div>
    </section>
  )
}