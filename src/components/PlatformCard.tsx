'use client'

interface PlatformCardProps {
  href: string
  imageSlot: React.ReactNode
  name: string
  description?: string
  linkLabel: string
  isArabic: boolean
}

export default function PlatformCard({
  href,
  imageSlot,
  name,
  description,
  linkLabel,
  isArabic,
}: PlatformCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--color-card)',
        border: '1px solid var(--color-card-border)',
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
        textDecoration: 'none',
        transition: 'border-color 0.3s, transform 0.3s',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'var(--color-gold-soft)'
        el.style.transform = 'translateY(-4px)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'var(--color-card-border)'
        el.style.transform = 'translateY(0)'
      }}
    >
      {/* Image slot */}
      <div style={{
        height: '200px',
        background: 'var(--color-bg-elevated)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: '1px solid var(--color-card-border)',
      }}>
        {imageSlot}
      </div>

      {/* Platform info */}
      <div style={{
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        flex: 1,
      }}>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1rem, 2vw, 1.375rem)',
          color: 'var(--color-text)',
          letterSpacing: '0.02em',
          lineHeight: 1.2,
        }}>
          {name}
        </p>

        {description ? (
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--body-sm)',
            color: 'var(--color-text-dim)',
            lineHeight: 1.6,
          }}>
            {description}
          </p>
        ) : null}

        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: 'auto',
          paddingTop: '0.75rem',
        }}>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem',
            color: 'var(--color-gold)',
            letterSpacing: '0.05em',
          }}>
            {linkLabel}
          </span>
        </div>
      </div>
    </a>
  )
}
