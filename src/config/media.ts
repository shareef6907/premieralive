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

export const HERO_VIDEO = `${M}/Horizontal%20Videos/Brand%20new%20header1.mp4`;
export const HERO_POSTER = `${M}/hero-poster.jpg?v=2`;
export const SCRUB_VIDEO   = `${M}/premiera-scrub-hq.mp4`;
export const CGI_SHOWREEL  = `${M}/Animation/Premiera%20-%20animation%20showcase.mp4`;
export const BRAND_FILMS: string[] = [
  `${M}/Horizontal%20Videos/Atme%20Press%20Conference%20-%20Fintech%20Forward.m4v`,
  `${M}/Horizontal%20Videos/Empire%20Limo%20-%20Final%20Horizontal.M4V`,
  `${M}/Horizontal%20Videos/Horse%20Slow%20mo.m4v`,
  `${M}/Horizontal+Videos/+MEOS%20Day%201%20-%20HDP%20Version.mp4`,
];

export const SHORTS: string[] = [
  `${M}/Shorts-reel/EMAAD%20GRADUATION%20VIDEO.m4v`,
  `${M}/Shorts-reel/bmw%20vertical.mp4`,
  `${M}/Shorts-reel/Apparel%20Group%20-%20Jamies%20Italian.MP4`,
  `${M}/Shorts-reel/LC%20Waikiki.M4V`,
  `${M}/Shorts-reel/Mado%20Eid%20Box%20Final%206.m4v`,
  `${M}/Shorts-reel/Manara%20Art%20-%20Road%20Map%20-%20T3.mp4`,
  `${M}/Shorts-reel/Noor%20Interview%20MYS%20for%20instagram.MP4`,
  `${M}/Shorts-reel/Sketchers%20Bahrain%20Nights%20FINAL%20T1.MP4`,
  `${M}/Shorts-reel/Interview%20Instagram%202nd%20interview%20.mp4`,
  `${M}/Shorts-reel/Womens%20Day%20%20-%20Apparel%20Group%20-%20T10%20with%20VO.mp4`,
];
