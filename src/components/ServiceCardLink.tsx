'use client'

import Link from 'next/link'

interface ServiceCardLinkProps {
  href: string
  name: string
  description: string
  isArabic?: boolean
}

export default function ServiceCardLink({ href, name, description, isArabic }: ServiceCardLinkProps) {
  return (
    <Link
      href={href}
      style={{
        padding: '1.5rem',
        background: 'var(--color-card)',
        border: '1px solid var(--color-card-border)',
        borderRadius: 'var(--radius)',
        textDecoration: 'none',
        transition: 'border-color 0.2s, transform 0.2s',
        display: 'block',
      }}
      onMouseEnter={(e) => {
        ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--color-gold-soft)'
        ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--color-card-border)'
        ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
      }}
    >
      <p style={{
        fontFamily: 'var(--font-body)',
        fontWeight: 600,
        fontSize: 'var(--body)',
        color: 'var(--color-text)',
        marginBottom: '0.5rem',
        textAlign: isArabic ? 'right' : 'left',
      }}>
        {name}
      </p>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--body-sm)',
        color: 'var(--color-text-faint)',
        lineHeight: 1.5,
        textAlign: isArabic ? 'right' : 'left',
      }}>
        {description}
      </p>
    </Link>
  )
}
