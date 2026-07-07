'use client';
import { useTranslations } from 'next-intl';
import VideoCarousel from './VideoCarousel';
import { media } from '@/config/media';

export default function AnimationShowcase() {
  const t = useTranslations('animation3d');
  return (
    <VideoCarousel
      items={media.work.animation3d}
      folder={media.folders.animation3d}
      aspectRatio="16/9"
      slideWidth="70vw"
      visibleSlides={1}
      autoplayDelay={8000}
      eyebrow={t('eyebrow')}
      heading={t('heading')}
      eyebrowAr={t('eyebrowAr')}
      headingAr={t('headingAr')}
    />
  );
}
