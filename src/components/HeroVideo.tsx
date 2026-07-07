'use client';
import { useRef, useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { media } from '@/config/media';

export default function HeroVideo({ locale }: { locale: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const isArabic = locale === 'ar';

  const handleToggle = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0A0A0B]">
      {/* Header video — preload=metadata so first paint is instant, bytes on demand */}
      <video
        ref={videoRef}
        src={media.heroHeader}
        poster={media.heroPoster}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="h-full w-full object-cover"
      />

      {/* Bottom gold gradient scrim for text contrast */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Left text block */}
      <div className="absolute inset-0 flex items-end pb-24 sm:pb-32 px-6 sm:px-16 lg:px-24">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-display text-xs sm:text-sm tracking-[0.3em] text-[#C9A24B] mb-4"
          >
            PREMIERA LIVE
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-display text-3xl sm:text-5xl lg:text-7xl text-white leading-tight max-w-3xl"
            style={{ textShadow: '0 4px 32px rgba(0,0,0,0.6)' }}
          >
            {isArabic
              ? 'نصنع علامات تجارية لا يمكن تجاهلها'
              : 'Marketing that makes your brand impossible to ignore.'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="mt-4 font-display text-sm sm:text-base tracking-[0.2em] text-white/60"
          >
            {isArabic ? 'قريباً في السعودية' : 'LAUNCHING IN SAUDI ARABIA'}
          </motion.p>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-8 flex items-center gap-3"
          >
            <div className="h-px w-8 bg-white/30" />
            <span className="font-display text-xs tracking-[0.25em] text-white/30 uppercase">Scroll</span>
          </motion.div>
        </div>
      </div>

      {/* Mute/unmute toggle — gold circle, bottom right */}
      <button
        onClick={handleToggle}
        aria-label={isMuted ? 'Unmute' : 'Mute'}
        className="absolute bottom-8 right-8 z-10 w-11 h-11 rounded-full bg-[rgba(201,162,75,0.88)] hover:bg-[#C9A24B] flex items-center justify-center transition-colors cursor-pointer"
      >
        {isMuted ? (
          /* Muted / sound off */
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0A0A0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          /* Unmuted / sound on */
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0A0A0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        )}
      </button>
    </section>
  );
}
