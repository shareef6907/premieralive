"use client";

const BRANDS = [
  "BBC Studios", "McLaren F1", "Four Seasons", "HSBC",
  "Aston Martin", "Audi", "ALDO", "Calvin Klein",
  "Tommy Hilfiger", "Puma", "LC Waikiki", "Bahrain International Circuit",
];

export default function Marquee() {
  const list = [...BRANDS, ...BRANDS];

  return (
    <div className="group relative flex overflow-hidden py-6 bg-[#0A0A0B] border-t border-b border-white/5">
      <div className="flex animate-marquee shrink-0">
        {list.map((b, i) => (
          <span
            key={i}
            className="shrink-0 px-10 font-display text-2xl text-white/20 uppercase tracking-widest"
          >
            {b}
          </span>
        ))}
      </div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0A0A0B] to-transparent z-10" />
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0A0A0B] to-transparent z-10" />
    </div>
  );
}
