// AISystemsSection placeholder — PR-5 will implement AI systems
export default function AISystemsSection() {
  return (
    <section
      id="ai"
      style={{ padding: 'var(--section-y) clamp(1.5rem, 5vw, 4rem)', background: 'var(--bg)' }}
    >
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--eyebrow)', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>
        AI SYSTEMS
      </p>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--h2)', color: 'var(--text)', letterSpacing: '0.01em', textTransform: 'uppercase', lineHeight: 0.95, marginBottom: '3rem' }}>
        THE FUTURE OF MARKETING IS ALREADY WORKING HERE.
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} style={{ background: 'var(--card)', border: '1px solid var(--card-border)', borderRadius: 'var(--radius)', height: 160 }} />
        ))}
      </div>
    </section>
  )
}
