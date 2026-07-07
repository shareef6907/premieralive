// GoalPickerSection placeholder — PR-3 will implement goal picker
export default function GoalPickerSection() {
  return (
    <section
      id="goal"
      style={{ padding: 'var(--section-y) clamp(1.5rem, 5vw, 4rem)', background: 'var(--bg-elevated)' }}
    >
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--eyebrow)', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>
        START WITH YOUR GOAL
      </p>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--h2)', color: 'var(--text)', letterSpacing: '0.01em', textTransform: 'uppercase', lineHeight: 0.95, marginBottom: '3rem' }}>
        WHAT DO YOU WANT TO ACHIEVE?
      </h2>
      <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed var(--card-border)', borderRadius: 'var(--radius)' }}>
        <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-faint)' }}>Goal picker — PR-3</p>
      </div>
    </section>
  )
}
