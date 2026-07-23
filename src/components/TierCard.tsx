'use client'

import { CheckCircle2 } from 'lucide-react'
import type { MarketingTier } from '@/config/marketingServices'

export default function TierCard({ tier, index, isArabic }: { tier: MarketingTier, index: number, isArabic: boolean }) {
  const configs = [
    { accent: '#C9A24B', bg: 'rgba(201,162,75,0.08)',   border: 'rgba(201,162,75,0.4)',  labelColor: '#C9A24B', ctaSolid: false },
    { accent: '#FFFFFF', bg: 'rgba(255,255,255,0.04)',   border: 'rgba(255,255,255,0.15)', labelColor: 'rgba(245,244,240,0.9)', ctaSolid: true  },
    { accent: '#E8D5A3', bg: 'rgba(201,162,75,0.04)',   border: 'rgba(201,162,75,0.25)', labelColor: 'rgba(245,244,240,0.7)', ctaSolid: false },
  ]
  const c = configs[index]

  const tagline    = isArabic ? tier.taglineAr : tier.taglineEn
  const builtFor   = isArabic ? tier.builtForAr : tier.builtForEn
  const deliverables = isArabic ? tier.deliverablesAr : tier.deliverablesEn
  const notIncluded = isArabic ? tier.notIncludedAr : tier.notIncludedEn
  const ctaText = isArabic ? 'اتصل بنا للنقاش' : 'Call to Discuss'

  // LEAD-IN: "Everything in Foundation, plus:" / "كل ما في الأساس، إضافة إلى:"
  // Only present on GROWTH and SCALE cards.
  const leadIn = deliverables.find(d =>
    d.category.startsWith('Everything in') || d.category.startsWith('كل ما في')
  )

  // Category deliverables — filter out the lead-in row so it doesn't appear twice.
  const categoryItems = deliverables.filter(d =>
    !d.category.startsWith('Everything in') && !d.category.startsWith('كل ما في')
  )

  return (
    <div style={{
      background: c.bg,
      border: `1px solid ${c.border}`,
      borderRadius: '12px',
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column',
      flex: '1 1 260px',
      minWidth: '240px',
      maxWidth: '340px',
    }}>
      {/* Tier name: الأساس / النمو / الريادة */}
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(1.5rem, 2vw, 1.875rem)',
        fontWeight: 700,
        letterSpacing: '0.02em',
        color: c.accent,
        marginBottom: '0.75rem',
      }}>
        {isArabic ? tier.nameAr : tier.name}
      </div>

      {/* Tagline */}
      <p style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(1.125rem, 1.5vw, 1.375rem)',
        color: c.labelColor,
        lineHeight: 1.2,
        marginBottom: '0.5rem',
      }}>
        {tagline}
      </p>

      {/* Audience block — fixed min-height for card alignment */}
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--body-sm)',
        color: 'rgba(245,244,240,0.45)',
        marginBottom: '1.5rem',
        lineHeight: 1.5,
        minHeight: '3rem',
      }}>
        {builtFor}
      </p>

      {/* LEAD-IN: "Everything in Foundation, plus:" — appears only on GROWTH and SCALE */}
      {leadIn && (
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.125rem, 1.5vw, 1.375rem)',
          color: '#C9A24B',
          lineHeight: 1.2,
          marginBottom: '1.25rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid rgba(201,162,75,0.2)',
        }}>
          {leadIn.category}
        </p>
      )}

      {/* Category deliverables */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
        {categoryItems.map((del, i) => (
          <div key={i}>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'var(--color-gold)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '0.375rem',
            }}>
              {del.category}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {del.items.map((item, j) => (
                <div key={j} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                  <CheckCircle2 size={13} strokeWidth={1.5} style={{ color: c.accent, flexShrink: 0, marginTop: '2px' }} />
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8125rem',
                    color: 'rgba(245,244,240,0.6)',
                    lineHeight: 1.5,
                  }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {notIncluded && (
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.75rem',
          color: 'rgba(245,244,240,0.35)',
          lineHeight: 1.5,
          marginBottom: '1.5rem',
        }}>
          <strong>{isArabic ? 'غير مشمول:' : 'Not included:'}</strong> {notIncluded}
        </p>
      )}

      <a
        href="#contact"
        style={{
          display: 'block',
          textAlign: 'center',
          padding: '0.75rem 1rem',
          background: c.ctaSolid ? 'var(--color-gold)' : 'transparent',
          border: `1px solid ${c.ctaSolid ? 'var(--color-gold)' : c.border}`,
          borderRadius: '100px',
          fontFamily: 'var(--font-display)',
          fontSize: '0.8rem',
          letterSpacing: '0.08em',
          fontWeight: 700,
          color: c.ctaSolid ? '#0A0A0B' : c.accent,
          textDecoration: 'none',
          marginTop: 'auto',
        }}
      >
        {ctaText}
      </a>
    </div>
  )
}
