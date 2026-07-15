'use client'

import { CheckCircle2 } from 'lucide-react'
import type { MarketingTier } from '@/config/marketingServices'

export default function TierCard({ tier, index }: { tier: MarketingTier, index: number }) {
  const configs = [
    { accent: '#C9A24B', bg: 'rgba(201,162,75,0.08)',   border: 'rgba(201,162,75,0.4)',  labelColor: '#C9A24B', ctaSolid: false },
    { accent: '#FFFFFF', bg: 'rgba(255,255,255,0.04)',   border: 'rgba(255,255,255,0.15)', labelColor: 'rgba(245,244,240,0.9)', ctaSolid: true  },
    { accent: '#E8D5A3', bg: 'rgba(201,162,75,0.04)',   border: 'rgba(201,162,75,0.25)', labelColor: 'rgba(245,244,240,0.7)', ctaSolid: false },
  ]
  const c = configs[index]

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
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '0.7rem',
        letterSpacing: '0.2em',
        color: c.accent,
        marginBottom: '0.75rem',
      }}>
        {tier.name}
      </div>

      <p style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.25rem',
        color: c.labelColor,
        lineHeight: 1.2,
        marginBottom: '0.5rem',
      }}>
        {tier.taglineEn}
      </p>

      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--body-sm)',
        color: 'rgba(245,244,240,0.45)',
        marginBottom: '1.5rem',
        lineHeight: 1.5,
      }}>
        {tier.builtForEn}
      </p>

      <div style={{ flex: 1 }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
        {tier.deliverablesEn
          .filter(d => !d.category.startsWith('Everything in'))
          .map((del, i) => (
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
        {tier.deliverablesEn
          .filter(d => d.category.startsWith('Everything in'))
          .map((del, i) => (
            <p key={i} style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8125rem',
              color: 'var(--color-gold)',
              fontStyle: 'italic',
            }}>
              {del.category}
            </p>
          ))}
      </div>

      {tier.notIncludedEn && (
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.75rem',
          color: 'rgba(245,244,240,0.35)',
          lineHeight: 1.5,
          marginBottom: '1.5rem',
        }}>
          <strong>Not included:</strong> {tier.notIncludedEn}
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
        Call to Discuss
      </a>
    </div>
  )
}
