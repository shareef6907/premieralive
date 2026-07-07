import { useLocale } from 'next-intl'

export default function FounderLetterSection() {
  const locale = useLocale()
  const isArabic = locale === 'ar'

  return (
    <section style={{ padding: 'var(--section-y) var(--container)', maxWidth: '640px', margin: '0 auto' }}>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--eyebrow)', letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '2rem' }}>
        {isArabic ? 'رسالة المؤسس' : 'FROM THE FOUNDER'}
      </p>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: '1.25rem', lineHeight: 1.9, color: 'var(--text-dim)' }}>
        {isArabic
          ? <>لا تحتاج معظم الشركات إلى وكالة أخرى، بل إلى شريك واحد يرى الصورة كاملة — العلامة، والفيلم، والموقع، والنظام الذي يُنمّيها جميعاً.<br /><br />أمضيتُ أكثر من خمسة عشر عاماً في بناء حملات وأفلام ومنصات لعلامات تعرفها. وعلّمني كل مشروع الدرس نفسه: يتعثر الإبداع بلا تقنية، وتبقى التقنية بلا قصة غير مرئية.<br /><br />وُجدت بريميرا لايف لتجمع الاثنين — وحين تعمل معنا، تعمل معي مباشرة.</>
          : <>Most businesses don't need another agency. They need one partner who sees the whole picture — the brand, the film, the website, and the system underneath that makes it all grow.<br /><br />For more than fifteen years I've built campaigns, films, and platforms for brands you know. Every project taught me the same lesson: great creative without technology stalls, and technology without story is invisible.<br /><br />Premiera Live exists to do both — and when you work with us, you work with me.</>}
        <br /><br />
        <span style={{ color: 'var(--gold)' }}>— {isArabic ? 'شريف، المؤسس' : 'Shareef, Founder'}</span>
      </div>
    </section>
  )
}
