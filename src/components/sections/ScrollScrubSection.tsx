// ScrollScrubSection placeholder — PR-4 will implement scroll-scrub film
export default function ScrollScrubSection() {
  return (
    <section
      id="scrub"
      style={{ height: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--eyebrow)', letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '1rem' }}>
          SIGNATURE
        </p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--h2)', color: 'var(--text)', letterSpacing: '0.01em', textTransform: 'uppercase', lineHeight: 0.95 }}>
          SCROLL-SCRUB FILM — PR-4
        </h2>
      </div>
    </section>
  )
}
