'use client';
import { useTranslations } from 'next-intl';
import VideoCarousel from './VideoCarousel';
import { media } from '@/config/media';

export default function BrandFilms() {
  const t = useTranslations('brandFilms');
  return (
    <VideoCarousel
      items={media.work.horizontal}
      folder={media.folders.horizontal}
      aspectRatio="16/9"
      slideWidth="80vw"
      visibleSlides={1}
      autoplayDelay={8000}
      eyebrow={t('eyebrow')}
      heading={t('heading')}
      eyebrowAr={t('eyebrowAr')}
      headingAr={t('headingAr')}
    />
  );
}
