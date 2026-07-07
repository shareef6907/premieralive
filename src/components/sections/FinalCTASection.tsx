// FinalCTASection placeholder — PR-6 will implement final CTA
export default function FinalCTASection() {
  return (
    <section
      id="contact"
      style={{ minHeight: '80vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 'var(--section-y) clamp(1.5rem, 5vw, 4rem)' }}
    >
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--h1)', color: 'var(--text)', letterSpacing: '0.01em', textTransform: 'uppercase', lineHeight: 0.95, marginBottom: '3rem' }}>
        READY TO BUILD SOMETHING EXTRAORDINARY?
      </h2>
      <div style={{ height: 60, width: 200, background: 'var(--gold)', borderRadius: 100, margin: '0 auto' }} />
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)', color: 'var(--text-faint)', marginTop: '1.5rem' }}>
        Replies within one business day.
      </p>
    </section>
  )
}
