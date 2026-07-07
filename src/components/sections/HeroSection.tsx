// HeroSection placeholder — PR-2 will implement full hero
export default function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        height: '100vh',
        background: 'var(--bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--eyebrow)', letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '1rem' }}>
          CREATIVE &middot; TECHNOLOGY &middot; AI &middot; GROWTH
        </p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--h1)', color: 'var(--text)', lineHeight: 0.95, letterSpacing: '0.01em', textTransform: 'uppercase', maxWidth: 900, margin: '0 auto 1.5rem' }}>
          WE BUILD BRANDS PEOPLE REMEMBER
        </h1>
      </div>
    </section>
  )
}
