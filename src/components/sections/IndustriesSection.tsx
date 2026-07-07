// IndustriesSection placeholder — PR-5 will implement industries strip
export default function IndustriesSection() {
  return (
    <section
      id="industries"
      style={{ padding: '4rem clamp(1.5rem, 5vw, 4rem)', background: 'var(--bg)' }}
    >
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--eyebrow)', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '2rem' }}>
        INDUSTRIES
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} style={{ padding: '0.5rem 1rem', border: '1px solid var(--card-border)', borderRadius: '100px', height: 36 }} />
        ))}
      </div>
    </section>
  )
}
