import Image from 'next/image';
import SpireButton from './SpireButton';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[var(--color-obsidian)] px-6 py-24">

      {/* Elder Titan background — planetary shadow */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/hero-bg.png"
          alt=""
          fill
          priority
          className="object-cover object-center opacity-30 transition-all duration-1000 hover:opacity-40"
          sizes="100vw"
        />
        {/* Bottom fade to pure black */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-obsidian)]/30 to-[var(--color-obsidian)]" />
        {/* Top vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-obsidian)]/60 to-transparent" style={{ height: '30%' }} />
        {/* Planetary edge glow — top arc */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.25) 0%, transparent 70%)' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto gap-8">

        {/* Eyebrow */}
        <p
          className="fade-up text-[10px] tracking-[0.5em] text-[var(--color-gold)] uppercase font-semibold"
          style={{ animationDelay: '0.2s' }}
        >
          Luxora Payments
        </p>

        {/* H1 — Elder Scale, heavy letter-spacing */}
        <div className="overflow-hidden">
          <h1
            className="mask-reveal text-elder-xl font-extralight text-white"
            style={{ letterSpacing: '0.4em', animationDelay: '0.4s' }}
          >
            TRUST.<br />
            <span className="text-[var(--color-gold)]">SECURE.</span><br />
            PROSPER.
          </h1>
        </div>

        {/* Subtext */}
        <p
          className="fade-up text-elder-md text-white/40 font-light tracking-widest max-w-xl"
          style={{ animationDelay: '0.9s' }}
        >
          Institutional-grade crypto payments.<br />
          The heavy hand that closes what others cannot.
        </p>

        {/* CTA */}
        <div className="fade-up" style={{ animationDelay: '1.2s' }}>
          <SpireButton />
        </div>

        {/* Pillars */}
        <div
          className="fade-up flex flex-wrap justify-center gap-3 mt-8"
          style={{ animationDelay: '1.5s' }}
        >
          {['NO CHARGEBACKS', 'INSTANT SETTLEMENT', 'ZERO FRICTION', 'WHITE-GLOVE SETUP'].map((tag) => (
            <div
              key={tag}
              className="glass light-leak rounded-xl px-5 py-2.5 text-[9px] tracking-[0.35em] text-white/50 uppercase font-medium"
            >
              {tag}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <div className="w-px h-12 bg-gradient-to-b from-[var(--color-gold)] to-transparent" />
        <span className="text-[8px] tracking-[0.4em] text-white uppercase">Scroll</span>
      </div>
    </section>
  );
}
