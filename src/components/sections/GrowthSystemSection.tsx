'use client'

import { useLocale } from 'next-intl'
import Section from '../Section'
import { Clapperboard, ShieldCheck, MousePointerClick, Search, TrendingUp, Layers } from 'lucide-react'

const CARDS = [
  {
    number: '01',
    icon: Clapperboard,
    titleEn: 'Create Attention',
    bodyEn: 'Beautiful filmmaking and photography that makes people stop scrolling.',
    titleAr: 'نصنع الانتباه',
    bodyAr: 'نصوّر أفلامًا وصورًا توقف الإصبع عن التمرير.',
  },
  {
    number: '02',
    icon: ShieldCheck,
    titleEn: 'Build Trust',
    bodyEn: 'A premium website that makes your business look like an industry leader.',
    titleAr: 'نبني الثقة',
    bodyAr: 'نبني موقعًا متقنًا يجعل عملك يبدو رائدًا في قطاعه.',
  },
  {
    number: '03',
    icon: MousePointerClick,
    titleEn: 'Convert Visitors',
    bodyEn: 'Landing pages and user journeys engineered to turn interest into enquiries.',
    titleAr: 'نحوّل الزوار',
    bodyAr: 'نهندس صفحات الهبوط ورحلات المستخدم لتحويل الاهتمام إلى طلبات.',
  },
  {
    number: '04',
    icon: Search,
    titleEn: 'Reach New Customers',
    bodyEn: 'Google Ads, SEO and targeted campaigns that put your business in front of people searching for your services.',
    titleAr: 'نصل إلى عملاء جدد',
    bodyAr: 'نضع عملك أمام من يبحث عن خدماتك عبر إعلانات Google وتحسين محركات البحث والحملات الموجّهة.',
  },
  {
    number: '05',
    icon: TrendingUp,
    titleEn: 'Optimise Performance',
    bodyEn: 'Every month we analyse, refine and improve every part of the customer journey.',
    titleAr: 'نحسّن الأداء',
    bodyAr: 'نحلل كل شهر ونصقل ونحسّن كل جزء من رحلة العميل.',
  },
  {
    number: '06',
    icon: Layers,
    titleEn: 'Scale',
    bodyEn: 'As your business grows, we expand your marketing, automate repetitive tasks and build systems that support long-term growth.',
    titleAr: 'نتوسّع',
    bodyAr: 'مع نمو عملك، نوسّع تسويقك، ونؤتمت المهام المتكررة، ونبني أنظمة تدعم النمو طويل الأمد.',
  },
]

export default function GrowthSystemSection() {
  const locale = useLocale()
  const isArabic = locale === 'ar'

  return (
    <Section>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--eyebrow)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--color-gold)',
          marginBottom: '0.75rem',
        }}>
          {isArabic ? 'كيف نبني النمو' : 'HOW WE BUILD GROWTH'}
        </p>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 4vw, 3.25rem)',
          color: 'var(--color-text)',
          lineHeight: 1.05,
        }}>
          {isArabic ? 'من الانطباع الأول إلى عميل دائم' : 'From First Impression to Loyal Customer'}
        </h2>
      </div>

      {/* Cards grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1.5rem',
        direction: isArabic ? 'rtl' : 'ltr',
      }}
        className="growth-cards-grid"
      >
        {CARDS.map((card, i) => {
          const Icon = card.icon
          return (
            <GrowthCard
              key={card.number}
              card={card}
              index={i}
              isArabic={isArabic}
              Icon={Icon}
            />
          )
        })}
      </div>

      <style>{`
        @media (max-width: 1023px) {
          .growth-cards-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 639px) {
          .growth-cards-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .growth-card-animate {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </Section>
  )
}

function GrowthCard({
  card,
  index,
  isArabic,
  Icon,
}: {
  card: typeof CARDS[number]
  index: number
  isArabic: boolean
  Icon: typeof CARDS[number]['icon']
}) {
  const title = isArabic ? card.titleAr : card.titleEn
  const body = isArabic ? card.bodyAr : card.bodyEn

  return (
    <div
      className="growth-card-animate"
      data-index={index}
      style={{
        background: '#16161B',
        border: '1px solid rgba(201,162,75,0.2)',
        borderRadius: '12px',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        opacity: 0,
        transform: 'translateY(20px)',
        transition: `opacity 0.6s ease-out ${index * 100}ms, transform 0.6s ease-out ${index * 100}ms`,
      }}
      ref={(el) => {
        if (!el) return
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                el!.style.opacity = '1'
                el!.style.transform = 'translateY(0)'
                observer.unobserve(el!)
              }
            })
          },
          { threshold: 0.15 }
        )
        observer.observe(el)
      }}
    >
      {/* Number + Icon row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.75rem',
          letterSpacing: '0.1em',
          color: 'var(--color-gold)',
        }}>
          {card.number}
        </span>
        <Icon
          size={28}
          strokeWidth={1.5}
          color="#C9A24B"
          aria-hidden="true"
        />
      </div>

      {/* Title */}
      <p style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(1.25rem, 1.6vw, 1.5rem)',
        fontWeight: 600,
        color: 'var(--color-text)',
        lineHeight: 1.2,
      }}>
        {title}
      </p>

      {/* Body */}
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--body)',
        color: 'var(--color-text-dim)',
        lineHeight: 1.6,
      }}>
        {body}
      </p>
    </div>
  )
}
