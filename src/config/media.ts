const _M = process.env.NEXT_PUBLIC_MEDIA_URL ?? '';
const M = _M.startsWith('http') ? _M : 'https://premiera-live-media.s3.us-east-1.amazonaws.com';
export const MEDIA_BASE = M;

export const IMAGES = {
  pillarCreative: `${M}/homepage-photos/pillar-creative.jpg`,
  pillarContent: `${M}/homepage-photos/pillar-content.jpg`,
  pillarTechnology: `${M}/homepage-photos/pillar-technology.jpg`,
  pillarAiGrowth: `${M}/homepage-photos/pillar-ai-growth.jpg`,
  aiSystemsBg: `${M}/homepage-photos/ai-systems-bg.jpg`,
  ogImage: `${M}/homepage-photos/og-image.jpg`,
};

export const HERO_VIDEO = '/hero-v2.mp4';
export const SCRUB_VIDEO   = `${M}/premiera-scrub-hq.mp4`;
export const CGI_SHOWREEL  = `${M}/work/AnimationShowcase-1080p.mp4`;
export const AI_BG_LOOP    = `${M}/Horizontal%20Videos/ai-systems-bg.mp4`;

export const PLATFORMS = {
  bahrainNights: {
    cover: `${M}/bahrainnights%20.png`,
    dashboard: `${M}/bahrainnights%20dashboard.png`,
    nameEn: 'BahrainNights.com',
    nameAr: 'BahrainNights.com',
    descEn: "Bahrain's events platform — venue directory, events engine, newsletters, and a full admin dashboard. 100% custom code, built and operated by our team.",
    descAr: "منصة الفعاليات في البحرين — دليل أماكن، ومحرك فعاليات، ونشرات بريدية، ولوحة تحكم كاملة. برمجناها بالكامل ونشغّلها بأنفسنا.",
  },
  studentPhotos: {
    cover: `${M}/Studentphotos.png`,
    dashboard: `${M}/studentphotos%20dashboard.png`,
    nameEn: 'StudentPhotos.com',
    nameAr: 'StudentPhotos.com',
    descEn: "A school-photography e-commerce platform — online galleries, secure payments, automated watermarking and digital delivery. Fully custom software, front to back.",
    descAr: "منصة تجارة إلكترونية لتصوير المدارس — معارض رقمية، ودفع آمن، وعلامات مائية وتسليم آلي. برمجية مخصصة بالكامل.",
  },
};

export const media = {
  folders: {
    horizontal:  `${M}/horizontal`,
    animations:  `${M}/animations`,
    reels:       `${M}/reels`,
    interviews:  `${M}/interviews`,
    posters:     `${M}/posters`,
    brand:       `${M}/brand`,
  },
  work: {
    horizontal:  [] as { file: string; title: string }[],
    animations:  [] as { file: string; title: string }[],
    reels:       [] as { file: string; title: string }[],
    interviews:  [] as { file: string; title: string }[],
  },
};

export const BRAND_FILMS: { src: string; title: string; poster?: string }[] = [
  {
    src: `${M}/work/Atme-Fintech-1080p.mp4`,
    title: 'Atme Press Conference',
    poster: `${M}/work/Atme-Fintech-poster.jpg`,
  },
  {
    src: `${M}/work/Empire-Limo-1080p.mp4`,
    title: 'Empire Limo',
    poster: `${M}/work/Empire-Limo-poster.jpg`,
  },
  {
    src: `${M}/work/Horse-Slowmo-1080p.mp4`,
    title: 'Horse Slow Mo',
    poster: `${M}/work/Horse-Slowmo-poster.jpg`,
  },
  {
    src: `${M}/work/MEOS-1080p.mp4`,
    title: 'MEOS Day 1',
    poster: `${M}/work/MEOS-poster.jpg`,
  },
];

export const SHORTS: { src: string; title: string; poster?: string }[] = [
  {
    src: `${M}/work/EmaadGrad-1080p.mp4`,
    title: 'Emaad Graduation',
    poster: `${M}/work/EmaadGrad-poster.jpg`,
  },
  {
    src: `${M}/work/BMW-1080p.mp4`,
    title: 'BMW',
    poster: `${M}/work/BMW-poster.jpg`,
  },
  {
    src: `${M}/work/LCWaikiki-1080p.mp4`,
    title: 'LC Waikiki',
    poster: `${M}/work/LCWaikiki-poster.jpg`,
  },
  {
    src: `${M}/work/MadoEid-1080p.mp4`,
    title: 'Mado Eid Box',
    poster: `${M}/work/MadoEid-poster.jpg`,
  },
  {
    src: `${M}/work/Sketchers-1080p.mp4`,
    title: 'Sketchers Bahrain Nights',
    poster: `${M}/work/Sketchers-poster.jpg`,
  },
  {
    src: `${M}/work/Interview-1080p.mp4`,
    title: 'Interview — 2nd Interview',
    poster: `${M}/work/Interview-poster.jpg`,
  },
  {
    src: `${M}/work/Womens-1080p.mp4`,
    title: "Women's Day — Apparel Group",
    poster: `${M}/work/Womens-poster.jpg`,
  },
];
