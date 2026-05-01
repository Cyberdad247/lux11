import Image from 'next/image';

export default function MaterialAnchor() {
  return (
    <div className="gold-bleed-group relative w-full max-w-sm lg:max-w-md xl:max-w-lg aspect-square mx-auto cursor-default select-none">

      {/* Ambient depth shadow */}
      <div
        className="absolute inset-[-10%] rounded-full opacity-40 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(212,175,55,0.15) 0%, transparent 70%)' }}
      />

      {/* Watch image — grayscale base → gold-bleed on hover */}
      <div className="relative w-full h-full rounded-2xl overflow-hidden">
        <Image
          src="/assets/horology.png"
          alt="Macro horology detail — Luxora precision"
          fill
          priority
          className="gold-bleed-img object-cover object-center"
          sizes="(max-width: 1024px) 80vw, 40vw"
        />
        <div className="gold-bleed-overlay rounded-2xl" />

        {/* Inner vignette frame */}
        <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_60px_rgba(0,0,0,0.7)] pointer-events-none" />

        {/* Top-edge platinum leak (static version on anchor) */}
        <div
          className="absolute inset-x-0 top-0 h-px pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.5) 40%, rgba(232,228,217,0.8) 50%, rgba(212,175,55,0.5) 60%, transparent)' }}
        />
      </div>

      {/* Floating data label */}
      <div className="absolute bottom-4 left-4 right-4 glass-3 rounded-xl px-4 py-3 platinum-leak">
        <p className="text-[8px] tracking-[0.4em] text-[var(--color-gold)] uppercase font-semibold mb-1">Precision Verified</p>
        <p className="text-[10px] text-white/60 font-mono">$24,580.00 · CONFIRMED</p>
      </div>
    </div>
  );
}
