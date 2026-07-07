'use client';
import { useEffect, useRef, useState } from 'react';
import { media } from '@/config/media';

const LABELS = [
  { s: 0.00, e: 0.10, en: 'Marketing that makes your brand impossible to ignore.',    ar: 'نصنع علامات تجارية لا يمكن تجاهلها' },
  { s: 0.10, e: 0.19, en: 'Marketing Retainers',                                        ar: 'عقود تسويق شهرية' },
  { s: 0.19, e: 0.28, en: 'Websites',                                                  ar: 'مواقع إلكترونية' },
  { s: 0.28, e: 0.37, en: 'Software & Apps',                                           ar: 'برمجيات وتطبيقات' },
  { s: 0.37, e: 0.46, en: 'Social Media Management',                                   ar: 'إدارة وسائل التواصل' },
  { s: 0.46, e: 0.55, en: 'Animation & 3D',                                           ar: 'أنيميشن وثري دي' },
  { s: 0.55, e: 0.64, en: 'Video Production & Photography',                            ar: 'إنتاج الفيديو والتصوير' },
  { s: 0.64, e: 0.73, en: 'Branding & Design',                                        ar: 'الهوية والتصميم' },
  { s: 0.73, e: 0.82, en: 'Podcast Filming',                                           ar: 'تصوير البودكاست' },
  { s: 0.82, e: 0.93, en: 'Multi-Camera Live Streaming',                               ar: 'بث مباشر متعدد الكاميرات' },
  { s: 0.93, e: 1.00, en: 'One team. Launching in Saudi Arabia.',                      ar: 'فريق واحد — قريباً في السعودية' },
];

function MobileHero({ locale }: { locale: string }) {
  const l = LABELS[0];
  return (
    <section className="relative h-screen overflow-hidden bg-[#0A0A0B]">
      <video
        src={media.heroScrub}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        poster={media.heroPoster}
        className="h-full w-full object-cover opacity-60"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />
      <div className="absolute inset-0 flex items-center justify-center">
        <h2 className="text-center font-display text-4xl text-[#C9A24B] drop-shadow-2xl md:text-7xl px-6">
          {locale === 'ar' ? l.ar : l.en}
        </h2>
      </div>
    </section>
  );
}

export default function ScrollScrubHero({ locale }: { locale: string }) {
  const sectionRef   = useRef<HTMLElement>(null);
  const videoRef     = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const labelRef     = useRef<HTMLDivElement>(null);
  const target       = useRef(0);
  const lastLabelIdx = useRef(-1);
  const [isMobile, setIsMobile] = useState(false);
  const lazyLoaded   = useRef(false);
  const isArabic     = locale === 'ar';

  useEffect(() => {
    setIsMobile(window.matchMedia('(max-width: 767px)').matches);
    const mq = window.matchMedia('(max-width: 767px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // ── IO: lazy-load scrub when approaching ──────────────────────────────────
  useEffect(() => {
    if (isMobile) return;
    const section = sectionRef.current;
    const video   = videoRef.current;
    if (!section || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !lazyLoaded.current) {
          lazyLoaded.current = true;
          video.preload = 'auto';
          video.play().catch(() => {});
        }
      },
      { rootMargin: '150% 0px' }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [isMobile]);

  // ── Scrub engine — DOM refs only, zero React re-renders ───────────────────
  useEffect(() => {
    if (isMobile) return;
    const video   = videoRef.current;
    const section = sectionRef.current;
    const bar     = progressBarRef.current;
    if (!video || !section || !bar) return;
    video.pause();

    const onScroll = () => {
      const scrollable = section.offsetHeight - window.innerHeight;
      target.current = Math.min(1, Math.max(0, -section.getBoundingClientRect().top / scrollable));
    };

    let raf = 0;
    const tick = () => {
      if (video.duration) {
        const want  = target.current * video.duration;
        const delta = want - video.currentTime;
        // Skip micro-seeks — round to 1/30s precision
        if (Math.abs(delta) > 1 / 30) {
          video.currentTime += delta * 0.18;
        }

        // Progress bar — cheap DOM write, no re-render
        const p = video.currentTime / video.duration;
        bar.style.width = `${p * 100}%`;

        // Active label — update DOM opacity only when index changes
        const idx = LABELS.findIndex(l => p >= l.s && p < l.e);
        if (idx !== lastLabelIdx.current) {
          lastLabelIdx.current = idx;
          const label = labelRef.current;
          if (label) {
            label.style.opacity = '0';
            // Force reflow so cross-fade is clean
            void label.offsetWidth;
            label.style.opacity = '1';
            label.textContent = isArabic
              ? LABELS[idx]?.ar ?? LABELS[0].ar
              : LABELS[idx]?.en ?? LABELS[0].en;
            // Swap font-size class via data-attr
            const isLarge = idx === 0 || idx === LABELS.length - 1;
            label.dataset.large = String(isLarge);
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };

    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    raf = requestAnimationFrame(tick);
    return () => {
      removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [isMobile, isArabic]);

  if (isMobile) return <MobileHero locale={locale} />;

  return (
    <section ref={sectionRef} id="scrub-section" className="relative h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-[#0A0A0B]">
        <video
          ref={videoRef}
          src={media.heroScrub}
          poster={media.heroPoster}
          muted
          playsInline
          preload="none"
          className="h-full w-full object-cover"
          style={{ transform: 'translateZ(0)' }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />

        {/* ── Single label DOM node — opacity toggled via ref, never unmounts ── */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h2
            ref={labelRef}
            className="text-center font-display text-[#C9A24B] text-3xl md:text-6xl lg:text-7xl transition-opacity duration-500"
            style={{
              textShadow: '0 2px 24px rgba(0,0,0,.85), 0 0 2px rgba(255,255,255,.35)',
              background: 'rgba(10,10,11,.28)',
              borderRadius: '0.15em',
              padding: '0.1em 0.35em',
              display: 'inline-block',
            }}
          >
            {isArabic ? LABELS[0].ar : LABELS[0].en}
          </h2>
        </div>

        {/* Gold progress bar */}
        <div className="absolute bottom-8 left-1/2 h-[2px] w-40 -translate-x-1/2 bg-white/15 overflow-hidden">
          <div ref={progressBarRef} className="h-full bg-[#C9A24B]" style={{ width: '0%' }} />
        </div>
      </div>
    </section>
  );
}
