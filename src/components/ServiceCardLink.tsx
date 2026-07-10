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
      className="service-card-link"
      style={{
        padding: '1.5rem',
        background: 'var(--color-card)',
        border: '1px solid var(--color-card-border)',
        borderRadius: 'var(--radius)',
        textDecoration: 'none',
        transition: 'border-color 0.2s, transform 0.2s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
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
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="service-chevron"
        style={{
          flexShrink: 0,
          transform: isArabic ? 'rotate(180deg)' : 'none',
          marginLeft: isArabic ? 0 : 'auto',
          marginRight: isArabic ? 'auto' : 0,
        }}
      >
        <path
          d="M6 4L10 8L6 12"
          stroke="var(--color-gold)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {description && (
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--body-sm)',
          color: 'var(--color-text-faint)',
          lineHeight: 1.5,
          textAlign: isArabic ? 'right' : 'left',
        }}>
          {description}
        </p>
      )}

      <style>{`
        @media (max-width: 767px) {
          .service-card-link {
            background: transparent !important;
            border: none !important;
            border-radius: 0 !important;
            padding: 1.25rem 0 !important;
            min-height: 44px;
            align-items: center;
          }
          .service-card-link:hover {
            transform: none !important;
            border-color: transparent !important;
          }
          .service-card-link p {
            margin-bottom: 0 !important;
            font-size: 1.1rem !important;
            font-family: var(--font-display) !important;
            letter-spacing: 0.04em;
            color: #F5F4F0 !important;
          }
        }
      `}</style>
    </Link>
  )
}
