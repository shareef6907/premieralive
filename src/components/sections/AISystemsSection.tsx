'use client'

import { useState, useRef, useEffect } from 'react'
import { useLocale } from 'next-intl'
import Section from '../Section'
import { IMAGES, PLATFORMS, AI_BG_LOOP } from '@/config/media'

// ---------------------------------------------------------------------------
// Video background with IntersectionObserver play/pause
// ---------------------------------------------------------------------------
interface VideoBgProps {
  src: string
  poster: string
  reducedMotion: boolean
}

function VideoBg({ src, poster, reducedMotion }: VideoBgProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (reducedMotion) return
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {})
          } else {
            video.pause()
          }
        })
      },
      { threshold: 0.25 }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [reducedMotion])

  if (reducedMotion) {
    // Static image only — no video element at all
    return (
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${poster})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
      />
    )
  }

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        onError={(e) => {
          // Fallback: if video errors, swap src to poster via background-image
          const target = e.currentTarget
          target.style.display = 'none'
          const parent = target.parentElement
          if (parent) {
            parent.style.backgroundImage = `url(${poster})`
            parent.style.backgroundSize = 'cover'
            parent.style.backgroundPosition = 'center'
          }
        }}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.4,
        }}
      />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Platform card with expandable dashboard
// ---------------------------------------------------------------------------
interface PlatformCardProps {
  cover: string
  dashboard: string
  nameEn: string
  nameAr: string
  descEn: string
  descAr: string
}

function PlatformCard({ cover, dashboard, nameEn, nameAr, descEn, descAr }: PlatformCardProps) {
  const locale = useLocale()
  const isArabic = locale === 'ar'
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      style={{
        background: 'var(--color-card)',
        border: '1px solid var(--color-card-border)',
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
        flex: 1,
        minWidth: 0,
      }}
    >
      {/* Cover image */}
      <div
        style={{
          width: '100%',
          aspectRatio: '16 / 9',
          backgroundImage: `url(${cover})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          flexShrink: 0,
        }}
      />

      {/* Card body */}
      <div style={{ padding: '1.5rem' }}>
        <h3
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 600,
            fontSize: 'var(--h3)',
            color: 'var(--color-text)',
            marginBottom: '0.75rem',
          }}
        >
          {isArabic ? nameAr : nameEn}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--body-sm)',
            color: 'var(--color-text-dim)',
            lineHeight: 1.7,
            marginBottom: '1.25rem',
          }}
        >
          {isArabic ? descAr : descEn}
        </p>

        <button
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'none',
            border: '1px solid var(--color-card-border)',
            borderRadius: 'var(--radius)',
            padding: '0.5rem 1rem',
            cursor: 'pointer',
            color: 'var(--color-gold)',
            fontFamily: 'var(--font-body)',
            fontWeight: 500,
            fontSize: 'var(--body-sm)',
            transition: 'border-color 0.2s',
          }}
        >
          {isArabic ? 'عرض لوحة التحكم' : 'View dashboard'}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.25s',
            }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {expanded && (
          <div
            style={{
              marginTop: '1rem',
              borderRadius: 'var(--radius)',
              overflow: 'hidden',
              border: '1px solid var(--color-card-border)',
            }}
          >
            <img
              src={dashboard}
              alt={isArabic ? nameAr : nameEn}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// AI Systems section
// ---------------------------------------------------------------------------
export default function AISystemsSection() {
  const locale = useLocale()
  const isArabic = locale === 'ar'
  const [reducedMotion, setReducedMotion] = useState(false)

  // Detect prefers-reduced-motion once on mount
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const aiCards = [
    {
      titleEn: 'AI Employees',
      titleAr: 'موظفون رقميون',
      bodyEn: 'Trained on your business, answering customers 24/7.',
      bodyAr: 'يخدمون عملاءك على مدار الساعة بعد تدريبهم على أعمالك.',
    },
    {
      titleEn: 'WhatsApp AI Assistants',
      titleAr: 'مساعدو واتساب الأذكياء',
      bodyEn: 'Capture, qualify, and book — inside the app Saudis already use.',
      bodyAr: 'يستقبلون العملاء ويصنّفونهم ويحجزون المواعيد داخل التطبيق الأكثر استخداماً.',
    },
    {
      titleEn: 'Sales & Lead Automation',
      titleAr: 'أتمتة المبيعات',
      bodyEn: 'Follow-ups that never forget, pipelines that never sleep.',
      bodyAr: 'تُتابع كل عميل محتمل دون نسيان ودون توقف.',
    },
    {
      titleEn: 'Internal Knowledge Chatbots',
      titleAr: 'روبوتات المعرفة الداخلية',
      bodyEn: 'Your policies, products, and processes — answerable in seconds.',
      bodyAr: 'تجيب فريقك عن السياسات والمنتجات والإجراءات في ثوانٍ.',
    },
    {
      titleEn: 'AI Content & Commercials',
      titleAr: 'محتوى وإعلانات بالذكاء الاصطناعي',
      bodyEn: 'Concept to screen in days, not months.',
      bodyAr: ' ننقل الفكرة إلى الشاشة في أيام لا أشهر.',
    },
    {
      titleEn: 'Custom AI Systems',
      titleAr: 'أنظمة ذكاء اصطناعي مخصصة',
      bodyEn: "Built for your workflow when off-the-shelf won't do.",
      bodyAr: 'نصمّمها خصيصاً لسير عملك عندما لا تكفي الحلول الجاهزة.',
    },
  ]

  return (
    <Section
      id="ai"
      eyebrow={isArabic ? 'أنظمة الذكاء الاصطناعي' : 'AI SYSTEMS'}
      title={
        isArabic
          ? 'بدأ مستقبل التسويق يعمل هنا اليوم.'
          : 'THE FUTURE OF MARKETING IS ALREADY WORKING HERE.'
      }
    >
      {/* Background — video (IO play/pause) or static image (reduced-motion) */}
      <VideoBg
        src={AI_BG_LOOP}
        poster={IMAGES.aiSystemsBg}
        reducedMotion={reducedMotion}
      />

      {/* Content layer */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Intro */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--body)',
            color: 'var(--color-text-dim)',
            lineHeight: 1.7,
            maxWidth: '640px',
            marginBottom: '3rem',
          }}
        >
          {isArabic
            ? 'يتحدث كثيرون عن الذكاء الاصطناعي، ونحن نبنيه — أنظمة حقيقية تعمل لأعمال حقيقية.'
            : 'Most agencies talk about AI. We build it — real systems, deployed for real businesses.'}
        </p>

        {/* AI cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginBottom: 'clamp(4rem, 8vw, 8rem)',
          }}
        >
          {aiCards.map((card, i) => (
            <div
              key={i}
              style={{
                background: 'var(--color-card)',
                border: '1px solid var(--color-card-border)',
                borderRadius: 'var(--radius)',
                padding: '1.5rem',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  fontSize: 'var(--h3)',
                  color: 'var(--color-text)',
                  marginBottom: '0.5rem',
                }}
              >
                {isArabic ? card.titleAr : card.titleEn}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--body-sm)',
                  color: 'var(--color-text-dim)',
                  lineHeight: 1.6,
                }}
              >
                {isArabic ? card.bodyAr : card.bodyEn}
              </p>
            </div>
          ))}
        </div>

        {/* Platforms sub-section */}
        <div style={{ borderTop: '1px solid var(--color-card-border)', paddingTop: 'clamp(3rem, 6vw, 5rem)' }}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
              fontSize: 'var(--eyebrow)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--color-gold)',
              marginBottom: '1rem',
            }}
          >
            {isArabic ? 'منصات هندسناها بالكامل' : 'PLATFORMS WE ENGINEERED'}
          </p>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--body)',
              color: 'var(--color-text-dim)',
              lineHeight: 1.7,
              maxWidth: '640px',
              marginBottom: '2.5rem',
            }}
          >
            {isArabic
              ? 'نبني البرمجيات بأنفسنا لا نكتفي بالحديث عنها — هذه منصات حية صممناها وبرمجناها ونشغّلها بالكامل.'
              : "We don't just talk about software — we build it. These are live platforms we designed, coded, and operate end to end."}
          </p>

          {/* Platform cards */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              marginBottom: '2.5rem',
            }}
          >
            <PlatformCard
              cover={PLATFORMS.bahrainNights.cover}
              dashboard={PLATFORMS.bahrainNights.dashboard}
              nameEn={PLATFORMS.bahrainNights.nameEn}
              nameAr={PLATFORMS.bahrainNights.nameAr}
              descEn={PLATFORMS.bahrainNights.descEn}
              descAr={PLATFORMS.bahrainNights.descAr}
            />
            <PlatformCard
              cover={PLATFORMS.studentPhotos.cover}
              dashboard={PLATFORMS.studentPhotos.dashboard}
              nameEn={PLATFORMS.studentPhotos.nameEn}
              nameAr={PLATFORMS.studentPhotos.nameAr}
              descEn={PLATFORMS.studentPhotos.descEn}
              descAr={PLATFORMS.studentPhotos.descAr}
            />
          </div>

          {/* Closing line */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--body-sm)',
              color: 'var(--color-text-faint)',
              lineHeight: 1.7,
              maxWidth: '680px',
            }}
          >
            {isArabic
              ? 'تُقدَّر منصات بهذا الحجم عادةً بعشرات آلاف الدولارات وتستغرق فرق التطوير أشهراً لإنجازها. نصممها ونبرمجها ونطلقها في جزء من ذلك الوقت — والأنظمة نفسها تشغّل أعمالنا الخاصة.'
              : 'Platforms of this scope are typically quoted at tens of thousands of dollars and take a senior development team months to deliver. We design, code, and launch them in a fraction of that time — the same systems run our own businesses.'}
          </p>
        </div>
      </div>
    </Section>
  )
}
