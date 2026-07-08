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
  heroScrub: `${M}/premiera-scrub-optimized.mp4`,
  heroPoster: `${M}/hero-poster.jpg`,
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
