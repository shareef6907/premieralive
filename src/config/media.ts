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

export const HERO_VIDEO = `${M}/Horizontal%20Videos/Hamra%20Jewellery%20new1.mp4`;
export const HERO_POSTER   = `${M}/hero-poster.jpg`;
export const SCRUB_VIDEO   = `${M}/premiera-scrub-hq.mp4`;
export const CGI_SHOWREEL  = `${M}/Animation/Premiera%20-%20animation%20showcase.mp4`;
export const BRAND_FILMS   = [] as string[];
export const SHORTS        = [] as string[];
