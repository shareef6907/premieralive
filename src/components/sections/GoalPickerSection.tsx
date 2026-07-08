'use client'

import { useState } from 'react'
import { useLocale } from 'next-intl'
import Section from '../Section'

type GoalKey =
  | 'increaseSales'
  | 'generateLeads'
  | 'launchBrand'
  | 'automateBusiness'
  | 'betterContent'
  | 'buildWebsite'

type Goal = {
  key: GoalKey
  titleEn: string
  titleAr: string
  answerEn: string
  answerAr: string
  ctaEn: string
  ctaAr: string
  pillarTagsEn: string
  pillarTagsAr: string
  whatsappMsgEn: string
  whatsappMsgAr: string
}

const WHATSAPP_NUM = process.env.NEXT_PUBLIC_WHATSAPP ?? '966500000000'

const GOALS: Goal[] = [
  {
    key: 'increaseSales',
    titleEn: 'Increase Sales',
    titleAr: 'زد مبيعاتك',
    answerEn:
      'We combine conversion-focused websites, performance marketing, and AI sales automation so every riyal you spend is tracked to revenue. You\'ll see exactly what\'s working — and we cut what isn\'t.',
    answerAr:
      'نربط مواقع مصمّمة للتحويل بالتسويق الأدائي وأتمتة المبيعات الذكية، ليُقاس كل ريال تنفقه بأثره على الإيرادات. نُظهر لك ما ينجح، ونوقف ما لا يجدي.',
    ctaEn: 'Talk to us about this',
    ctaAr: 'حدّثنا عن هدفك',
    pillarTagsEn: 'Creative · Technology · AI & Growth',
    pillarTagsAr: 'الإبداع · التقنية · الذكاء الاصطناعي والنمو',
    whatsappMsgEn: "Hi, I'd like to talk about increasing sales.",
    whatsappMsgAr: 'أرغب في مناقشة زيادة المبيعات.',
  },
  {
    key: 'generateLeads',
    titleEn: 'Generate Leads',
    titleAr: 'اجذب عملاء محتملين',
    answerEn:
      'We build landing experiences, ad campaigns, and WhatsApp AI assistants that capture, qualify, and follow up with leads automatically — 24/7, in Arabic and English.',
    answerAr:
      'نصمم صفحات هبوط وحملات إعلانية ومساعدين أذكياء على واتساب يستقطبون العملاء ويصنّفونهم ويتابعونهم تلقائياً، على مدار الساعة وبالعربية والإنجليزية.',
    ctaEn: 'Talk to us about this',
    ctaAr: 'حدّثنا عن هدفك',
    pillarTagsEn: 'Creative · AI & Growth',
    pillarTagsAr: 'الإبداع · الذكاء الاصطناعي والنمو',
    whatsappMsgEn: "Hi, I'd like to talk about generating more leads.",
    whatsappMsgAr: 'أرغب في مناقشة استقطاب عملاء محتملين.',
  },
  {
    key: 'launchBrand',
    titleEn: 'Launch a New Brand',
    titleAr: 'أطلق علامتك الجديدة',
    answerEn:
      'We take you from name to market: identity, cinematic launch content, website, and the first 90 days of marketing — one team, one timeline, one standard.',
    answerAr:
      'نرافقك من الاسم إلى السوق: الهوية، ومحتوى الإطلاق السينمائي، والموقع، وأول 90 يوماً من التسويق — بفريق واحد وجدول واحد ومعيار واحد.',
    ctaEn: 'Talk to us about this',
    ctaAr: 'حدّثنا عن هدفك',
    pillarTagsEn: 'Creative · Content · Technology',
    pillarTagsAr: 'الإبداع · المحتوى · التقنية',
    whatsappMsgEn: "Hi, I'd like to talk about launching a new brand.",
    whatsappMsgAr: 'أرغب في مناقشة إطلاق علامة تجارية جديدة.',
  },
  {
    key: 'automateBusiness',
    titleEn: 'Automate My Business',
    titleAr: 'أتمت أعمالك',
    answerEn:
      'We build AI employees, internal chatbots, and document automation that remove repetitive work from your team\'s day — so headcount grows slower than revenue.',
    answerAr:
      'نطوّر موظفين رقميين وروبوتات محادثة داخلية وأتمتةً للمستندات تُزيل الأعمال المتكررة من يوم فريقك، فينمو دخلك أسرع من تكاليفك.',
    ctaEn: 'Talk to us about this',
    ctaAr: 'حدّثنا عن هدفك',
    pillarTagsEn: 'AI & Growth · Technology',
    pillarTagsAr: 'الذكاء الاصطناعي والنمو · التقنية',
    whatsappMsgEn: "Hi, I'd like to talk about automating my business.",
    whatsappMsgAr: 'أرغب في مناقشة أتمتة الأعمال.',
  },
  {
    key: 'betterContent',
    titleEn: 'Create Better Content',
    titleAr: 'طوّر محتواك',
    answerEn:
      'We shoot, edit, and animate at cinema grade — film, photography, 3D, and podcasts — then package it for every platform your customers actually use.',
    answerAr:
      'نصوّر وننفّذ ونحرّك بمستوى سينمائي — أفلاماً وصوراً وثلاثي الأبعاد وبودكاست — ثم نهيّئ المحتوى لكل منصة يستخدمها عملاؤك فعلاً.',
    ctaEn: 'Talk to us about this',
    ctaAr: 'حدّثنا عن هدفك',
    pillarTagsEn: 'Content · Creative',
    pillarTagsAr: 'المحتوى · الإبداع',
    whatsappMsgEn: "Hi, I'd like to talk about creating better content.",
    whatsappMsgAr: 'أرغب في مناقشة تطوير المحتوى.',
  },
  {
    key: 'buildWebsite',
    titleEn: 'Build a Website',
    titleAr: 'ابنِ موقعك الإلكتروني',
    answerEn:
      'We engineer websites like products: fast, bilingual, conversion-focused, and connected to booking, ordering, or CRM systems that run your operations.',
    answerAr:
      'نبني المواقع كما تُبنى المنتجات: سريعة، ثنائية اللغة، مصمّمة للتحويل، ومتصلة بأنظمة الحجز والطلبات وإدارة العملاء لتشغيل أعمالك.',
    ctaEn: 'Talk to us about this',
    ctaAr: 'حدّثنا عن هدفك',
    pillarTagsEn: 'Technology',
    pillarTagsAr: 'التقنية',
    whatsappMsgEn: "Hi, I'd like to talk about building a website.",
    whatsappMsgAr: 'أرغب في مناقشة بناء موقع إلكتروني.',
  },
]

export default function GoalPickerSection() {
  const locale = useLocale()
  const isArabic = locale === 'ar'
  const [selected, setSelected] = useState<GoalKey | null>(null)
  const selectedGoal = GOALS.find((g) => g.key === selected)

  const whatsappUrl = selectedGoal
    ? `https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(
        isArabic ? selectedGoal.whatsappMsgAr : selectedGoal.whatsappMsgEn
      )}`
    : null

  return (
    <Section
      id="goal"
      eyebrow={isArabic ? 'ابدأ بهدفك' : 'START WITH YOUR GOAL'}
      title={isArabic ? 'ماذا تريد أن تحقق؟' : 'WHAT DO YOU WANT TO ACHIEVE?'}
    >
      {/* Pill buttons */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.75rem',
          marginBottom: '2.5rem',
        }}
      >
        {GOALS.map((goal) => {
          const isActive = selected === goal.key
          return (
            <button
              key={goal.key}
              onClick={() => setSelected(isActive ? null : goal.key)}
              style={{
                padding: '0.625rem 1.25rem',
                borderRadius: '999px',
                border: `1px solid ${isActive ? 'var(--color-gold)' : 'var(--color-card-border)'}`,
                background: isActive ? 'var(--color-gold)' : 'transparent',
                color: isActive ? 'var(--color-bg)' : 'var(--color-text-dim)',
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                fontSize: 'var(--body-sm)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
              }}
            >
              {isArabic ? goal.titleAr : goal.titleEn}
            </button>
          )
        })}
      </div>

      {/* Answer panel */}
      {selectedGoal && (
        <div
          key={selectedGoal.key}
          className="goal-panel"
          style={{
            background: 'var(--color-card)',
            borderRadius: 'var(--radius)',
            padding: '2rem',
            borderLeft: '2px solid var(--color-gold)',
            maxWidth: '720px',
            animation: 'fadeRise 0.4s var(--ease-out) both',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--body)',
              color: 'var(--color-text-dim)',
              lineHeight: 1.8,
              marginBottom: '1.5rem',
            }}
          >
            {isArabic ? selectedGoal.answerAr : selectedGoal.answerEn}
          </p>

          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--eyebrow)',
              letterSpacing: '0.1em',
              color: 'var(--color-text-faint)',
              textTransform: 'uppercase',
              marginBottom: '1.25rem',
            }}
          >
            {isArabic ? selectedGoal.pillarTagsAr : selectedGoal.pillarTagsEn}
          </div>

          <a
            href={whatsappUrl ?? '#'}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              background: 'var(--color-gold)',
              color: 'var(--color-bg)',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: 'var(--body-sm)',
              borderRadius: 'var(--radius)',
              textDecoration: 'none',
              transition: 'opacity 0.2s',
            }}
          >
            {isArabic ? selectedGoal.ctaAr : selectedGoal.ctaEn}
          </a>
        </div>
      )}
    </Section>
  )
}
