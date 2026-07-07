'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import { media } from '@/config/media';

export default function HeroVideo({ locale }: { locale: string }) {
  const t = useTranslations('hero');
  const isArabic = locale === 'ar';
  const isRTL = locale === 'ar';

  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const [isMuted, setIsMuted] = useState(true);
  const [hasUnmuted, setHasUnmuted] = useState(false);   // true once user ever unmuted
  const [isVisible, setIsVisible] = useState(true);       // hero in viewport
  const [showPulse, setShowPulse] = useState(true);       // pulsing sound pill

  // ── One-time global unmute on first user interaction ──────────────────────
  useEffect(() => {
    if (!isMuted) return; // already unmuted, skip

    const handler = () => {
      const v = videoRef.current;
      if (!v) return;
      // Fade volume 0 → 1 over 800ms
      v.muted = false;
      v.volume = 0;
      setIsMuted(false);
      setHasUnmuted(true);
      setShowPulse(false);

      let start: number | null = null;
      const fade = (ts: number) => {
        if (!start) start = ts;
        const prog = Math.min(1, (ts - start) / 800);
        v.volume = prog;
        if (prog < 1) requestAnimationFrame(fade);
      };
      requestAnimationFrame(fade);

      document.removeEventListener('click', handler, true);
      document.removeEventListener('touchstart', handler, true);
      document.removeEventListener('keydown', handler, true);
    };

    document.addEventListener('click', handler, true);
    document.addEventListener('touchstart', handler, true);
    document.addEventListener('keydown', handler, true);
    return () => {
      document.removeEventListener('click', handler, true);
      document.removeEventListener('touchstart', handler, true);
      document.removeEventListener('keydown', handler, true);
    };
  }, [isMuted]);

  // ── Auto-mute when hero scrolls out of view ───────────────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (!entry.isIntersecting && hasUnmuted) {
          const v = videoRef.current;
          if (v) v.muted = true;
          setIsMuted(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [hasUnmuted]);

  // ── Manual mute/unmute toggle ─────────────────────────────────────────────
  const handleToggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
    if (!v.muted) {
      setHasUnmuted(true);
      setShowPulse(false);
      // Restore volume if coming back from auto-mute
      if (v.volume === 0) v.volume = 1;
    }
  }, []);

  // ── Scroll to scrub section ───────────────────────────────────────────────
  const handleOurWork = useCallback(() => {
    document.getElementById('scrub-section')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP ?? '966500440235';

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-[#0A0A0B]">

      {/* ── Video ── */}
      <video
        ref={videoRef}
        src={media.heroHeader}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="h-full w-full object-cover"
      />

      {/* ── Cinematic scrims ── */}
      {/* Left-to-right: dark left side, opens to right */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: isRTL
            ? 'linear-gradient(to right, rgba(10,10,11,.75) 0%, rgba(10,10,11,.75) 55%, transparent 100%)'
            : 'linear-gradient(to left, rgba(10,10,11,.75) 0%, rgba(10,10,11,.75) 55%, transparent 100%)',
        }}
      />
      {/* Bottom-up scrim */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(10,10,11,.9) 0%, rgba(10,10,11,.55) 35%, transparent 60%)',
        }}
      />
      {/* Subtle bottom fade into next section */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32"
        style={{ background: 'linear-gradient(to bottom, transparent, #0A0A0B)' }}
      />

      {/* ── Content block — lower-left (EN) / lower-right (AR) ── */}
      <div
        className={`absolute bottom-0 flex flex-col gap-4 sm:gap-5 ${
          isRTL ? 'right-8 sm:right-16 lg:right-24 items-end text-right' : 'left-8 sm:left-16 lg:left-24 items-start text-left'
        }`}
        style={{ maxWidth: 'min(640px, 55vw)', paddingBottom: 'clamp(4rem, 10vh, 7rem)' }}
      >
        {/* Kicker */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-display text-xs sm:text-sm tracking-[0.3em] text-[#C9A24B] uppercase"
        >
          {isArabic ? t('eyebrow') : t('eyebrow')}
        </motion.p>

        {/* Headline — Bebas, white, tight leading */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.3 }}
          className="font-display text-white leading-[1.05] tracking-wide"
          style={{ fontSize: 'clamp(2.2rem, 5.5vw, 5.5rem)', textShadow: '0 4px 32px rgba(0,0,0,0.5)' }}
        >
          {isArabic ? t('headlineAr') : t('headline')}
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="font-display text-sm sm:text-base text-white/60 tracking-[0.18em] uppercase"
        >
          {isArabic ? t('subAr') : t('sub')}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className={`flex gap-3 mt-2 ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          <a
            href={`https://wa.me/${waNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#C9A24B] hover:bg-[#d4af5a] text-[#0A0A0B] font-display text-sm sm:text-base tracking-[0.1em] px-6 py-3 rounded-sm transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            {isArabic ? t('startProjectAr') : t('startProject')}
          </a>
          <button
            onClick={handleOurWork}
            className="inline-flex items-center border border-white/20 hover:border-white/40 text-white/80 hover:text-white font-display text-sm sm:text-base tracking-[0.1em] px-6 py-3 rounded-sm transition-colors bg-white/8 hover:bg-white/12 backdrop-blur-sm"
          >
            {isArabic ? t('ourWork') : t('ourWork')}
          </button>
        </motion.div>
      </div>

      {/* ── Sound pill — bottom right (EN) / bottom left (AR) ── */}
      <AnimatePresence>
        {showPulse && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`absolute bottom-8 ${isRTL ? 'left-8' : 'right-8'} z-10`}
          >
            {/* Pulsing ring */}
            <span
              className="absolute inset-0 rounded-full bg-[#C9A24B]/30 animate-ping"
              style={{ animationDuration: '2s' }}
            />
            {/* Button */}
            <button
              onClick={handleToggleMute}
              aria-label={isArabic ? t('soundOnAr') : t('soundOn')}
              className="relative flex items-center gap-2.5 border border-[#C9A24B] rounded-full px-5 py-2.5 bg-[rgba(10,10,11,0.6)] hover:bg-[rgba(201,162,75,0.15)] backdrop-blur-md transition-colors cursor-pointer"
            >
              {isMuted ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C9A24B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C9A24B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              )}
              <span className="font-display text-xs sm:text-sm tracking-[0.18em] text-[#C9A24B] uppercase whitespace-nowrap">
                {isArabic ? t('soundOnAr') : t('soundOn')}
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mute toggle (shown after unmuted) ── */}
      {!showPulse && (
        <button
          onClick={handleToggleMute}
          aria-label={isMuted ? (isArabic ? t('soundOnAr') : t('soundOn')) : (isArabic ? t('soundOffAr') : t('soundOff'))}
          className={`absolute bottom-8 ${isRTL ? 'left-8' : 'right-8'} z-10 w-11 h-11 rounded-full border border-white/20 hover:border-white/40 bg-white/8 hover:bg-white/12 backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer`}
        >
          {isMuted ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          )}
        </button>
      )}

    </section>
  );
}
