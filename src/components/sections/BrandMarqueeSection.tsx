// BrandMarqueeSection placeholder — PR-2 will implement brand marquee
export default function BrandMarqueeSection() {
  return (
    <section
      id="marquee"
      style={{
        padding: '2rem 0',
        background: 'var(--bg)',
        borderTop: '1px solid var(--card-border)',
        borderBottom: '1px solid var(--card-border)',
      }}
    >
      <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--eyebrow)', letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase', textAlign: 'center', marginBottom: '2rem' }}>
        TRUSTED BY GLOBAL BRANDS
      </p>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--h2)', color: 'var(--text)', textAlign: 'center', letterSpacing: '0.01em', textTransform: 'uppercase' }}>
        BRAND MARQUEE PLACEHOLDER
      </h2>
    </section>
  )
}
