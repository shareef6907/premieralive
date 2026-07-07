// WhyPremieraSection placeholder — PR-6 will implement stats reprise
export default function WhyPremieraSection() {
  return (
    <section
      id="why"
      style={{ padding: 'var(--section-y) clamp(1.5rem, 5vw, 4rem)', background: 'var(--bg-elevated)', textAlign: 'center' }}
    >
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--body)', color: 'var(--text-faint)', marginBottom: '3rem' }}>
        Fifteen years. One standard.
      </p>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--h1)', color: 'var(--gold)', letterSpacing: '0.01em', lineHeight: 0.95 }}>
        15+ YEARS &middot; 1,000+ PROJECTS &middot; 20+ BRANDS &middot; 25+ PLATFORMS
      </h2>
    </section>
  )
}
