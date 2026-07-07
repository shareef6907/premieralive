'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { useLocale } from 'next-intl';

interface VideoItem {
  file: string;
  title: string;
}

interface VideoCarouselProps {
  items: VideoItem[];
  folder: string;
  aspectRatio: '16/9' | '9/16';
  slideWidth?: string;      // e.g. '80vw' for brand films, '220px' for shorts
  visibleSlides?: number;  // for shorts: how many to show at once
  autoplayDelay?: number;  // ms between auto-advances
  eyebrow: string;
  heading: string;
  eyebrowAr: string;
  headingAr: string;
}

function VideoSlide({
  item,
  folder,
  isActive,
  isMuted,
  onUnmute,
  onPause,
  aspectRatio,
  slideWidth,
  index,
}: {
  item: VideoItem
  folder: string
  isActive: boolean
  isMuted: boolean
  onUnmute: () => void
  onPause: () => void
  aspectRatio: '16/9' | '9/16'
  slideWidth?: string
  index: number
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const src = `${folder}/${item.file}`;

  // Play/pause based on active state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isActive) {
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isActive]);

  // Sync muted state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = isMuted;
  }, [isMuted]);

  const handleClick = useCallback(() => {
    if (isMuted) {
      onUnmute();
    } else {
      onPause();
    }
  }, [isMuted, onUnmute, onPause]);

  return (
    <div
      data-slide-index={index}
      style={{
        flexShrink: 0,
        width: slideWidth ?? (aspectRatio === '16/9' ? '80vw' : '220px'),
        scrollSnapAlign: 'start',
        position: 'relative',
        borderRadius: '12px',
        overflow: 'hidden',
        background: '#16161B',
      }}
    >
      <video
        ref={videoRef}
        data-src={src}
        preload="none"
        muted
        playsInline
        loop
        onClick={handleClick}
        style={{
          width: '100%',
          aspectRatio,
          objectFit: 'cover',
          display: 'block',
          cursor: 'pointer',
        }}
      />

      {/* Unmute button — only on active slide */}
      {isActive && (
        <button
          onClick={handleClick}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
          style={{
            position: 'absolute',
            bottom: '1rem',
            right: '1rem',
            background: 'rgba(201,162,75,0.9)',
            border: 'none',
            borderRadius: '100px',
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
        >
          {isMuted ? (
            /* Sound off icon */
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0A0A0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            /* Sound on icon */
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0A0A0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          )}
        </button>
      )}

      {/* Title */}
      {item.title && (
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '2.5rem 1.25rem 1.25rem',
          background: 'linear-gradient(to top, rgba(10,10,11,0.9) 0%, transparent 100%)',
          fontFamily: 'var(--font-display)',
          fontSize: '0.9rem',
          letterSpacing: '0.08em',
          color: '#fff',
        }}>
          {item.title}
        </div>
      )}
    </div>
  );
}

export default function VideoCarousel({
  items,
  folder,
  aspectRatio,
  slideWidth,
  visibleSlides = 1,
  autoplayDelay = 8000,
  eyebrow,
  heading,
  eyebrowAr,
  headingAr,
}: VideoCarouselProps) {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const isArabic = locale === 'ar';

  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);   // all muted by default
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const autoplayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // IntersectionObserver — find which slide is most visible
  const setupObserver = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    if (observerRef.current) observerRef.current.disconnect();

    const slides = track.querySelectorAll('[data-slide-index]');

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.intersectionRatio > 0.3);
        if (visible.length === 0) return;
        // Pick the one with highest ratio
        const top = visible.reduce((a, b) => a.intersectionRatio >= b.intersectionRatio ? a : b);
        const idx = Number((top.target as HTMLElement).dataset.slideIndex);
        if (!isNaN(idx)) setActiveIndex(idx);
      },
      {
        root: track,
        threshold: [0.3, 0.6, 1.0],
      }
    );

    slides.forEach((slide) => observerRef.current!.observe(slide));
  }, []);

  useEffect(() => {
    if (items.length === 0) return;
    const timer = setTimeout(setupObserver, 100);
    return () => {
      clearTimeout(timer);
      observerRef.current?.disconnect();
      if (autoplayTimerRef.current) clearTimeout(autoplayTimerRef.current);
    };
  }, [items.length, setupObserver]);

  // Autoplay
  const scheduleNext = useCallback(() => {
    if (autoplayTimerRef.current) clearTimeout(autoplayTimerRef.current);
    if (!isAutoPlaying || hasInteracted) return;
    autoplayTimerRef.current = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, autoplayDelay);
  }, [isAutoPlaying, hasInteracted, items.length, autoplayDelay]);

  useEffect(() => {
    scheduleNext();
    return () => {
      if (autoplayTimerRef.current) clearTimeout(autoplayTimerRef.current);
    };
  }, [activeIndex, scheduleNext]);

  const handleManualAdvance = useCallback((direction: 1 | -1) => {
    setHasInteracted(true);
    setIsAutoPlaying(false);
    setActiveIndex((prev) => {
      const next = ((prev + direction) % items.length + items.length) % items.length;
      return next;
    });
  }, [items.length]);

  const handleUnmute = useCallback(() => {
    setIsMuted(false);
  }, []);

  const handlePause = useCallback(() => {
    setIsMuted(true);
  }, []);

  const scrollToIndex = useCallback((idx: number) => {
    const track = trackRef.current;
    if (!track) return;
    const slides = track.querySelectorAll('[data-slide-index]');
    const target = slides[idx] as HTMLElement;
    if (!target) return;
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: isRTL ? 'end' : 'start',
    });
  }, [isRTL]);

  // Scroll to active when index changes
  useEffect(() => {
    scrollToIndex(activeIndex);
  }, [activeIndex, scrollToIndex]);

  if (items.length === 0) return null;

  const visibleCount = Math.min(visibleSlides, items.length);

  return (
    <section style={{
      padding: 'clamp(4rem, 8vw, 7rem) 0',
      background: '#0A0A0B',
      borderTop: '1px solid rgba(255,255,255,0.03)',
      overflow: 'hidden',
    }}>
      <div style={{ padding: '0 clamp(1.5rem, 8vw, 8rem)' }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.75rem',
            letterSpacing: '0.3em',
            color: '#C9A24B',
            marginBottom: '1rem',
          }}
        >
          {isArabic ? eyebrowAr : eyebrow}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            color: '#fff',
            marginBottom: '2.5rem',
            lineHeight: 1.05,
          }}
        >
          {isArabic ? headingAr : heading}
        </motion.h2>
      </div>

      {/* Carousel controls */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '0 clamp(1.5rem, 8vw, 8rem)',
        marginBottom: '1.5rem',
      }}>
        <button
          onClick={() => handleManualAdvance(-1)}
          aria-label="Previous"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '50%',
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#fff',
            flexShrink: 0,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points={isRTL ? "9 18 15 12 9 6" : "15 18 9 12 15 6"} />
          </svg>
        </button>

        {/* Dots */}
        <div style={{ display: 'flex', gap: '6px', flex: 1, overflow: 'hidden' }}>
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => { setActiveIndex(i); setHasInteracted(true); setIsAutoPlaying(false); }}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width: i === activeIndex ? '28px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: i === activeIndex ? '#C9A24B' : 'rgba(255,255,255,0.2)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                flexShrink: 0,
              }}
            />
          ))}
        </div>

        <button
          onClick={() => handleManualAdvance(1)}
          aria-label="Next"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '50%',
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#fff',
            flexShrink: 0,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points={isRTL ? "15 18 9 12 15 6" : "9 18 15 12 9 6"} />
          </svg>
        </button>
      </div>

      {/* Slider track */}
      <div
        ref={trackRef}
        dir={isRTL ? 'rtl' : 'ltr'}
        style={{
          display: 'flex',
          gap: '1.25rem',
          overflowX: 'auto',
          scrollSnapType: `${isRTL ? 'x mandatory' : 'x mandatory'}`,
          scrollBehavior: 'smooth',
          padding: '0 clamp(1.5rem, 8vw, 8rem)',
          cursor: 'grab',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
        onMouseDown={() => { setHasInteracted(true); setIsAutoPlaying(false); }}
        onTouchStart={() => { setHasInteracted(true); setIsAutoPlaying(false); }}
      >
        <style>{`
          [data-slide-index]::-webkit-scrollbar { display: none; }
        `}</style>
        {items.map((item, i) => (
          <VideoSlide
            key={`${item.file}-${i}`}
            item={item}
            folder={folder}
            isActive={i === activeIndex}
            isMuted={isMuted}
            onUnmute={handleUnmute}
            onPause={handlePause}
            aspectRatio={aspectRatio}
            slideWidth={slideWidth}
            index={i}
          />
        ))}
      </div>

      {/* "X of Y" counter */}
      <div style={{
        textAlign: 'center',
        marginTop: '1.25rem',
        fontFamily: 'var(--font-display)',
        fontSize: '0.7rem',
        letterSpacing: '0.2em',
        color: 'rgba(255,255,255,0.25)',
      }}>
        {activeIndex + 1} / {items.length}
      </div>
    </section>
  );
}
