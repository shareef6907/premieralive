const _M = process.env.NEXT_PUBLIC_MEDIA_URL ?? '';
const M = _M.startsWith('http') ? _M : 'https://premiera-live-media.s3.us-east-1.amazonaws.com';

export const media = {
  heroHeader: `${M}/Horizontal%20Videos/Al%20Hamra%20Jewellery%20Final%20for%20Bn.MP4`,
  heroScrub: `${M}/premiera-scrub-hq.mp4`,
  heroPoster: `${M}/hero-poster.jpg`,
  folders: {
    horizontal:   `${M}/Horizontal%20Videos`,
    shorts:       `${M}/Shorts-reel`,
    animation3d:   `${M}/Animation`,
    animations:    `${M}/Animation`,
    reels:         `${M}/Shorts-reel`,
    interviews:    `${M}/interviews`,
    posters:       `${M}/posters`,
    brand:         `${M}/brand`,
  },
  work: {
    horizontal:   [] as { file: string; title: string }[],
    shorts:       [] as { file: string; title: string }[],
    animation3d:  [] as { file: string; title: string }[],
    animations:   [] as { file: string; title: string }[],
    reels:        [] as { file: string; title: string }[],
    interviews:   [] as { file: string; title: string }[],
  },
};
