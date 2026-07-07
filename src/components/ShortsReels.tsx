'use client';
import { useTranslations } from 'next-intl';
import VideoCarousel from './VideoCarousel';
import { media } from '@/config/media';

export default function ShortsReels() {
  const t = useTranslations('shorts');
  return (
    <VideoCarousel
      items={media.work.shorts}
      folder={media.folders.shorts}
      aspectRatio="9/16"
      slideWidth="220px"
      visibleSlides={3}
      autoplayDelay={8000}
      eyebrow={t('eyebrow')}
      heading={t('heading')}
      eyebrowAr={t('eyebrowAr')}
      headingAr={t('headingAr')}
    />
  );
}
