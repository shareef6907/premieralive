'use client';

import { useParams } from 'next/navigation';

export default function HeroSection() {
  const locale = useParams().locale as string;
  const isArabic = locale === 'ar';

  return (
    <section className="v2-section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'flex-end', paddingBottom: 'clamp(4rem, 8vw, 7rem)' }}>
      {/* Placeholder — full implementation in PR-2 */}
      <div className="v2-container" style={{ paddingBottom: '8rem' }}>
        <p className="v2-eyebrow">CREATIVE · TECHNOLOGY · AI · GROWTH</p>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--h1)',
          lineHeight: 0.95,
          textTransform: 'uppercase',
          color: 'var(--text)',
          marginBottom: '1.5rem',
        }}>
          {isArabic ? 'نصنع علاماتٍ لا تُنسى' : 'WE BUILD BRANDS PEOPLE REMEMBER'}
        </h1>
      </div>
    </section>
  );
}
