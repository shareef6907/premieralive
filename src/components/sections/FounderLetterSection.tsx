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
            وُجدت بريمييرا لايف لتجمع الاثنين — وحين تعمل معنا، تعمل معي مباشرة.
          </>
        ) : (
          <>
            You don&apos;t need another agency. You need one partner who sees the whole picture — the film, the website it lives on, and the system underneath that makes them grow.
            <br /><br />
            Fifteen years across the Gulf as a filmmaker and web developer taught me the same lesson every time: a beautiful film nobody sees does nothing, and a website without proper architecture never gets found.
            <br /><br />
            Premiera Live does both. And you&apos;ll deal with me directly — not an account manager.
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
          — {isArabic ? 'شريف، المؤسس' : 'Shareef Ali, Founder'}
        </span>
      </div>
    </Section>
  )
}
