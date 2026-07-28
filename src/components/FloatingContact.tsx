'use client';

import { usePathname } from 'next/navigation';

const PHONE = '966500440235';
const EMAIL = 'ceo@premieralive.com';

export default function FloatingContact() {
 const pathname = usePathname() ?? '';
 const isArabic = pathname.startsWith('/ar');

 const waText = isArabic
 ? encodeURIComponent('مرحبا، أبي أستفسر عن إنتاج فيديو')
 : encodeURIComponent("Hi, I'd like to ask about video production");

 const mailSubject = isArabic
 ? encodeURIComponent('استفسار عن إنتاج فيديو')
 : encodeURIComponent('Video Production Enquiry');

 const labels = isArabic
 ? { wa: 'تواصل عبر واتساب', mail: 'أرسل بريد إلكتروني', call: 'اتصل بنا' }
 : { wa: 'Contact us on WhatsApp', mail: 'Send us an email', call: 'Call us' };

 const base =
 'flex items-center justify-center rounded-full shadow-lg transition-transform ' +
 'duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/60 ' +
 'w-[52px] h-[52px] md:w-14 md:h-14';

 return (
 <div
 className="fixed right-4 z-[9999] flex flex-col gap-3 md:right-6"
 style={{ bottom: 'calc(1rem + env(safe-area-inset-bottom))' }}
 >
 {/* WhatsApp */}
 <a
 href={`https://wa.me/${PHONE}?text=${waText}`}
 target="_blank"
 rel="noopener noreferrer"
 aria-label={labels.wa}
 className={`${base} bg-[#25D366]`}
 >
 <svg
 viewBox="0 0 24 24"
 fill="currentColor"
 className="w-7 h-7 text-white"
 aria-hidden="true"
 >
 <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.896 9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.886-9.885 9.886m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.464 3.488" />
 </svg>
 </a>

 {/* Email */}
 <a
 href={`mailto:${EMAIL}?subject=${mailSubject}`}
 aria-label={labels.mail}
 className={`${base} bg-[#C9A24B]`}
 >
 <svg
 viewBox="0 0 24 24"
 fill="none"
 stroke="currentColor"
 strokeWidth="2"
 strokeLinecap="round"
 strokeLinejoin="round"
 className="w-6 h-6 text-black"
 aria-hidden="true"
 >
 <rect x="2" y="4" width="20" height="16" rx="2" />
 <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
 </svg>
 </a>

 {/* Call */}
 <a
 href={`tel:+${PHONE}`}
 aria-label={labels.call}
 className={`${base} bg-[#C9A24B]`}
 >
 <svg
 viewBox="0 0 24 24"
 fill="none"
 stroke="currentColor"
 strokeWidth="2"
 strokeLinecap="round"
 strokeLinejoin="round"
 className="w-6 h-6 text-black"
 aria-hidden="true"
 >
 <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
 </svg>
 </a>
 </div>
 );
}
