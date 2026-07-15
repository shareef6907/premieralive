import { useLocale } from 'next-intl'
import Section from '../Section'

export default function FounderLetterSection() {
  const locale = useLocale()
  const isArabic = locale === 'ar'

  return (
    <Section id="founder" eyebrow={isArabic ? 'رسالة المؤسس' : 'FROM THE FOUNDER'}>
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1.25rem',
          lineHeight: 1.9,
          color: 'var(--color-text-dim)',
          maxWidth: '640px',
        }}
      >
        {isArabic ? (
          <>
            لا تحتاج معظم الشركات إلى وكالة أخرى، بل إلى شريك واحد يرى الصورة كاملة — العلامة، والفيلم، والموقع، والنظام الذي يُنمّيها جميعاً.
            <br /><br />
            أمضيتُ أكثر من خمسة عشر عاماً — من البحرين وعبر الخليج — في بناء حملات وأفلام ومنصات لعلامات تعرفها. وعلّمني كل مشروع الدرس نفسه: يتعثر الإبداع بلا تقنية، وتبقى التقنية بلا قصة غير مرئية.
            <br /><br />
            وُجدت بريميرا لايف لتجمع الاثنين — وحين تعمل معنا، تعمل معي مباشرة.
          </>
        ) : (
          <>
            Most businesses don&apos;t need another agency. They need one partner who sees the whole picture — the brand, the film, the website, and the system underneath that makes it all grow.
            <br /><br />
            For more than fifteen years — from Bahrain, across the Gulf — I&apos;ve built campaigns, films, and platforms for brands you know. Every project taught me the same lesson: great creative without technology stalls, and technology without story is invisible.
            <br /><br />
            Premiera Live exists to do both — and when you work with us, you work with me.
          </>
        )}
        <br /><br />
        <div
          aria-hidden="true"
          style={{
            width: '48px',
            height: '1px',
            background: 'var(--color-gold)',
            marginBottom: '1rem',
          }}
        />
        <span style={{ color: 'var(--color-gold)' }}>
          — {isArabic ? 'شريف، المؤسس' : 'Shareef, Founder'}
        </span>
      </div>
    </Section>
  )
}
