"use client";
import { useEffect, useRef, useState } from "react";
import { media } from "@/config/media";

const LABELS = [
  { s: 0.00, e: 0.10, en: "Marketing that makes your brand impossible to ignore.", ar: "نصنع علامات تجارية لا يمكن تجاهلها" },
  { s: 0.10, e: 0.19, en: "Marketing Retainers",                                           ar: "عقود تسويق شهرية" },
  { s: 0.19, e: 0.28, en: "Websites",                                                       ar: "مواقع إلكترونية" },
  { s: 0.28, e: 0.37, en: "Software & Apps",                                                ar: "برمجيات وتطبيقات" },
  { s: 0.37, e: 0.46, en: "Social Media Management",                                       ar: "إدارة وسائل التواصل" },
  { s: 0.46, e: 0.55, en: "Animation & 3D",                                                ar: "أنيميشن وثري دي" },
  { s: 0.55, e: 0.64, en: "Video Production & Photography",                                 ar: "إنتاج الفيديو والتصوير" },
  { s: 0.64, e: 0.73, en: "Branding & Design",                                               ar: "الهوية والتصميم" },
  { s: 0.73, e: 0.82, en: "Podcast Filming",                                                ar: "تصوير البودكاست" },
  { s: 0.82, e: 0.93, en: "Multi-Camera Live Streaming",                                    ar: "بث مباشر متعدد الكاميرات" },
  { s: 0.93, e: 1.00, en: "One team. Launching in Saudi Arabia.",                           ar: "فريق واحد — قريباً في السعودية" },
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
        className="h-full w-full object-cover opacity-60"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />
      <div className="absolute inset-0 flex items-center justify-center">
        <h2 className="text-center font-display text-4xl text-[#C9A24B] drop-shadow-2xl md:text-7xl px-6">
          {locale === "ar" ? l.ar : l.en}
        </h2>
      </div>
    </section>
  );
}

export default function ScrollScrubHero({ locale }: { locale: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);
  const target     = useRef(0);
  const [progress, setProgress] = useState(0);
  const [mouse, setMouse]       = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 767px)").matches);
    const mq = window.matchMedia("(max-width: 767px)");
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const video  = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;
    video.pause();

    const onScroll = () => {
      const scrollable = section.offsetHeight - window.innerHeight;
      const p = Math.min(1, Math.max(0, -section.getBoundingClientRect().top / scrollable));
      target.current = p;
    };
    const onMouse = (e: MouseEvent) =>
      setMouse({ x: e.clientX / innerWidth - 0.5, y: e.clientY / innerHeight - 0.5 });

    let raf = 0;
    const tick = () => {
      if (video.duration) {
        const want  = target.current * video.duration;
        const delta  = want - video.currentTime;
        if (Math.abs(delta) > 0.02) video.currentTime += delta * 0.18;
        setProgress(video.currentTime / video.duration);
      }
      raf = requestAnimationFrame(tick);
    };
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("mousemove", onMouse, { passive: true });
    onScroll();
    raf = requestAnimationFrame(tick);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("mousemove", onMouse);
      cancelAnimationFrame(raf);
    };
  }, [isMobile]);

  if (isMobile) return <MobileHero locale={locale} />;

  return (
    <section ref={sectionRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-[#0A0A0B]">
        <video
          ref={videoRef}
          src={media.heroScrub}
          poster={media.heroPoster}
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover will-change-transform"
          style={{
            transform: `scale(1.06) translate(${mouse.x * -12}px, ${mouse.y * -8}px)`,
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />

        {LABELS.map((l, i) => {
          const active = progress >= l.s && progress < l.e;
          return (
            <div
              key={i}
              className="absolute inset-0 flex items-center justify-center transition-opacity duration-500"
              style={{
                opacity: active ? 1 : 0,
                transform: `translate(${mouse.x * 18}px, ${mouse.y * 12}px)`,
                transitionDelay: active ? "0ms" : "0ms",
              }}
            >
              <h2
                className={`text-center font-display text-[#C9A24B] drop-shadow-2xl ${
                  i === 0 || i === LABELS.length - 1
                    ? "max-w-5xl text-5xl md:text-8xl"
                    : "text-4xl md:text-7xl"
                }`}
              >
                {locale === "ar" ? l.ar : l.en}
              </h2>
            </div>
          );
        })}

        <div className="absolute bottom-8 left-1/2 h-[2px] w-40 -translate-x-1/2 bg-white/15">
          <div className="h-full bg-[#C9A24B]" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>
    </section>
  );
}
