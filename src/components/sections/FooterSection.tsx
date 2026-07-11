'use client'
import { useParams } from 'next/navigation'
export default function FooterSection() {
  const locale = useParams().locale as string
  return (
    <footer style={{
      background: 'var(--bg)',
      borderTop: '1px solid var(--card-border)',
      padding: '3rem 0',
    }}>
      <div className="v2-container" style={{ textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--gold)', letterSpacing: '0.02em' }}>P</span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--text)', letterSpacing: '0.1em' }}>PREMIERA LIVE</span>
        </div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)', color: 'var(--text-faint)', marginBottom: '1.5rem' }}>
          {locale === 'ar'
            ? 'تنطلق بريميرا لايف في السعودية — ونخدم عملاءنا في مختلف دول الخليج.'
            : 'Launching in Saudi Arabia — serving clients across the Gulf.'}
        </p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)', color: 'var(--text-faint)' }}>
          &copy; 2026 Premiera Live &middot; {locale === 'ar' ? 'العربية' : 'English'}
        </p>
      </div>
    </footer>
  )
}