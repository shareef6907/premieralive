'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { media } from '@/config/media';

export default function CgiAnimation({ locale }: { locale: string }) {
  const t = (key: string) => key; // resolved via data attributes below
  const isArabic = locale === 'ar';

  const videoRef  = useRef<HTMLVideoElement>(null);
  const wrapRef   = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted]       = useState(true);
  const [hasUnmuted, setHasUnmuted] = useState(false);
  const [isVisible, setIsVisible]   = useState(false);
  const [showPulse, setShowPulse]   = useState(true);

  // ── IO: play/pause with viewport ──────────────────────────────────────────
  useEffect(() => {
    const video  = videoRef.current;
    const wrap   = wrapRef.current;
    if (!video || !wrap) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(wrap);
    return () => observer.disconnect();
  }, []);

  // ── Auto-mute when out of view ───────────────────────────────────────────
  useEffect(() => {
    if (!isVisible && hasUnmuted) {
      const v = videoRef.current;
      if (v) { v.muted = true; setIsMuted(true); }
    }
  }, [isVisible, hasUnmuted]);

  // ── One-time global unmute ────────────────────────────────────────────────
  useEffect(() => {
    const handler = () => {
      const v = videoRef.current;
      if (!v || !isMuted) return;
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

  const handleToggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
    if (!v.muted) {
      setHasUnmuted(true);
      setShowPulse(false);
      if (v.volume === 0) v.volume = 1;
    }
  }, []);

  const eyebrow   = isArabic ? 'أنيميشن CGI واقعي' : 'REAL-LIFE CGI ANIMATION';
  const headingAr = 'عوالم لم تكن موجودة. مبنية إطاراً بإطار.';
  const heading   = 'Worlds that never existed. Built frame by frame.';

  return (
    <section
      ref={wrapRef}
      className="relative w-full py-24 md:py-32 bg-[#0A0A0B] overflow-hidden"
    >
      {/* Eyebrow */}
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="text-center font-display text-xs tracking-[0.35em] text-[#C9A24B] uppercase mb-6"
      >
        {eyebrow}
      </motion.p>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.65, delay: 0.1 }}
        className="text-center font-display text-white text-3xl md:text-5xl lg:text-6xl leading-tight mb-14 px-6"
        style={{ textShadow: '0 4px 24px rgba(0,0,0,0.5)' }}
      >
        {isArabic ? headingAr : heading}
      </motion.h2>

      {/* Video wrapper with gold border-glow frame */}
      <div className="relative mx-auto max-w-5xl px-6">
        <div
          className="relative overflow-hidden rounded-sm"
          style={{
            boxShadow: '0 0 0 1px rgba(201,162,75,0.25), 0 0 40px rgba(201,162,75,0.08)',
          }}
        >
          <video
            ref={videoRef}
            src={media.animationShowreel}
            muted
            loop
            playsInline
            preload="none"
            className="h-full w-full"
            style={{ aspectRatio: '16/9', display: 'block', width: '100%', background: '#000' }}
          />

          {/* Sound pill */}
          <AnimatePresence>
            {showPulse && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`absolute bottom-4 ${isArabic ? 'left-4' : 'right-4'}`}
              >
                <span
                  className="absolute inset-0 rounded-full bg-[#C9A24B]/30 animate-ping"
                  style={{ animationDuration: '2s' }}
                />
                <button
                  onClick={handleToggleMute}
                  className="relative flex items-center gap-2 border border-[#C9A24B] rounded-full px-4 py-2 bg-[rgba(10,10,11,0.7)] hover:bg-[rgba(201,162,75,0.15)] backdrop-blur-sm transition-colors cursor-pointer"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C9A24B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                  </svg>
                  <span className="font-display text-xs tracking-[0.15em] text-[#C9A24B] uppercase whitespace-nowrap">
                    {isArabic ? 'اضغط للصوت' : 'TAP FOR SOUND'}
                  </span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mute toggle (after unmuted) */}
          {!showPulse && (
            <button
              onClick={handleToggleMute}
              className={`absolute bottom-4 ${isArabic ? 'left-4' : 'right-4'} w-10 h-10 rounded-full border border-white/20 hover:border-white/40 bg-black/50 flex items-center justify-center transition-colors cursor-pointer`}
            >
              {isMuted ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

// Dummy import to verify AnimatePresence used
type _AnimatePresence = typeof AnimatePresence;
