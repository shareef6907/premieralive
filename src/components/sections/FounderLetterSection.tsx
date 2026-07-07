// FounderLetterSection placeholder — PR-6 will implement founder letter
export default function FounderLetterSection() {
  return (
    <section
      id="founder"
      style={{ padding: 'var(--section-y) clamp(1.5rem, 5vw, 4rem)', background: 'var(--bg)' }}
    >
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--eyebrow)', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>
        FROM THE FOUNDER
      </p>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--h2)', color: 'var(--text)', letterSpacing: '0.01em', textTransform: 'uppercase', lineHeight: 0.95, marginBottom: '3rem' }}>
        FOUNDER LETTER — PR-6
      </h2>
      <div style={{ maxWidth: 640, fontFamily: 'var(--font-body)', fontSize: 'var(--body)', color: 'var(--text-dim)', lineHeight: 1.7 }}>
        <p>Most businesses don&apos;t need another agency. They need one partner who sees the whole picture...</p>
      </div>
    </section>
  )
}
