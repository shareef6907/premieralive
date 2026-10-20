"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n";

interface Props {
  locale: Locale;
}

interface Stat {
  end: number;
  labelEn: string;
  labelAr: string;
  suffix: string;
}

const STATS: Stat[] = [
  { end: 15, labelEn: "Years experience", labelAr: "سنوات خبرة", suffix: "+" },
  { end: 27, labelEn: "Models available offline", labelAr: "نموذج متاح دون اتصال", suffix: "" },
  { end: 0, labelEn: "Monthly subscriptions", labelAr: "اشتراكات شهرية", suffix: "" },
];

function useCountUp(target: number, active: boolean) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const DURATION = 1400;

  useEffect(() => {
    if (!active || target === 0) {
      setValue(target);
      return;
    }
    const animate = (ts: number) => {
      if (startRef.current === null) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const progress = Math.min(elapsed / DURATION, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      startRef.current = null;
    };
  }, [active, target]);

  return value;
}

function CountUpStat({ stat, isAr, active }: { stat: Stat; isAr: boolean; active: boolean }) {
  const value = useCountUp(stat.end, active);
  return (
    <div className="hero-stat">
      <span className="hero-stat-number">
        {value}{stat.suffix}
      </span>
      <span className="hero-stat-label">{isAr ? stat.labelAr : stat.labelEn}</span>
    </div>
  );
}

export default function HeroEffects({ locale }: Props) {
  const isAr = locale === "ar";
  const [statsActive, setStatsActive] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const signalRef = useRef<SVGSVGElement>(null);

  // Count-up on section visibility
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Signal-line loop animation (6s, 60% opacity)
  useEffect(() => {
    const path = signalRef.current?.querySelector("path");
    if (!path) return;

    // Kick off the CSS animation after initial draw
    const timeout = setTimeout(() => {
      path.style.animation = "signal-pulse 6s ease-in-out infinite";
    }, 3000); // after the initial 2.5s draw animation

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {/* Gradient orbs */}
      <div className="hero-gradient-bg" aria-hidden="true">
        <div className="hero-gradient-orb hero-gradient-orb-1" />
        <div className="hero-gradient-orb hero-gradient-orb-2" />
      </div>

      {/* Count-up stats */}
      <div className="hero-stats" ref={statsRef}>
        {STATS.map((stat) => (
          <CountUpStat key={stat.labelEn} stat={stat} isAr={isAr} active={statsActive} />
        ))}
      </div>

      {/* Invisible signal-line ref for JS animation control */}
      <svg
        ref={signalRef}
        className="signal-line"
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "40px", pointerEvents: "none" }}
        aria-hidden="true"
      >
        <path d="M0,20 Q150,5 300,20 T600,20 T900,20 T1200,20" />
      </svg>
    </>
  );
}
