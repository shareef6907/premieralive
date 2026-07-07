'use client';

export default function TrustedBy({ locale }: { locale: string }) {
  return (
    <div className="bg-[#0A0A0B] pt-14 pb-2 px-8">
      <p className="font-display text-center text-xs tracking-[0.35em] text-[#C9A24B] uppercase">
        {locale === 'ar' ? 'يثقون بنا' : 'Trusted By'}
      </p>
    </div>
  );
}
