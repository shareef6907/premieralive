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
export const CGI_SHOWREEL  = `${M}/Animation/Premiera%20-%20animation%20showcase.mp4`;
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

export const BRAND_FILMS: { src: string; title: string }[] = [
  {
    src: `${M}/Horizontal%20Videos/Atme%20Press%20Conference%20-%20Fintech%20Forward.m4v`,
    title: 'Atme Press Conference',
  },
  {
    src: `${M}/Horizontal%20Videos/Empire%20Limo%20-%20Final%20Horizontal.M4V`,
    title: 'Empire Limo',
  },
  {
    src: `${M}/Horizontal%20Videos/Horse%20Slow%20mo.m4v`,
    title: 'Horse Slow Mo',
  },
  {
    src: `${M}/Horizontal+Videos/+MEOS%20Day%201%20-%20HDP%20Version.mp4`,
    title: 'MEOS Day 1',
  },
];

export const SHORTS: { src: string; title: string; posterTime?: number }[] = [
  {
    src: `${M}/Shorts-reel/EMAAD%20GRADUATION%20VIDEO.m4v`,
    title: 'Emaad Graduation',
  },
  {
    src: `${M}/Shorts-reel/bmw%20vertical.mp4`,
    title: 'BMW',
  },
  {
    src: `${M}/Shorts-reel/LC%20Waikiki.M4V`,
    title: 'LC Waikiki',
    posterTime: 2.0,
  },
  {
    src: `${M}/Shorts-reel/Mado%20Eid%20Box%20Final%206.m4v`,
    title: 'Mado Eid Box',
  },
  {
    src: `${M}/Shorts-reel/Sketchers%20Bahrain%20Nights%20FINAL%20T1.MP4`,
    title: 'Sketchers Bahrain Nights',
  },
  {
    src: `${M}/Shorts-reel/Interview%20Instagram%202nd%20interview%20.mp4`,
    title: 'Interview — 2nd Interview',
  },
  {
    src: `${M}/Shorts-reel/Womens%20Day%20%20-%20Apparel%20Group%20-%20T10%20with%20VO.mp4`,
    title: "Women's Day — Apparel Group",
  },
];
