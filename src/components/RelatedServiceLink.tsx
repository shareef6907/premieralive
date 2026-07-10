'use client'

interface RelatedServiceLinkProps {
  href: string
  children: React.ReactNode
}

export default function RelatedServiceLink({ href, children }: RelatedServiceLinkProps) {
  return (
    <a
      href={href}
      style={{
        padding: '0.625rem 1.25rem',
        border: '1px solid var(--color-card-border)',
        borderRadius: 'var(--radius)',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--body-sm)',
        color: 'var(--color-text-dim)',
        textDecoration: 'none',
        transition: 'border-color 0.2s, color 0.2s',
      }}
      onMouseEnter={(e) => {
        ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--color-gold-soft)'
        ;(e.currentTarget as HTMLElement).style.color = 'var(--color-text)'
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--color-card-border)'
        ;(e.currentTarget as HTMLElement).style.color = 'var(--color-text-dim)'
      }}
    >
      {children}
    </a>
  )
}
