// ProcessSection placeholder — PR-5 will implement process timeline
export default function ProcessSection() {
  return (
    <section
      id="process"
      style={{ padding: 'var(--section-y) clamp(1.5rem, 5vw, 4rem)', background: 'var(--bg-elevated)' }}
    >
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--eyebrow)', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>
        HOW WE WORK
      </p>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--h2)', color: 'var(--text)', letterSpacing: '0.01em', textTransform: 'uppercase', lineHeight: 0.95, marginBottom: '4rem' }}>
        A PROCESS, NOT A GAMBLE.
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} style={{ background: 'var(--card)', border: '1px solid var(--card-border)', borderRadius: 'var(--radius)', height: 120 }} />
        ))}
      </div>
    </section>
  )
}
