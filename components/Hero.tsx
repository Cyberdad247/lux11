'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import SpireButton from './SpireButton';

const PILLARS = ['NO CHARGEBACKS', 'INSTANT SETTLEMENT', 'ZERO FRICTION', 'WHITE-GLOVE SETUP'] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const bgY          = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const contentY     = useTransform(scrollYProgress, [0, 0.65], ['0%', '7%']);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[var(--color-obsidian)] px-6 py-24">

      {/* Parallax background */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <Image
          src="/assets/hero-bg.png"
          alt=""
          fill
          priority
          className="object-cover object-center opacity-[0.28]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-obsidian)]/20 to-[var(--color-obsidian)]" />
        <div className="absolute top-0 inset-x-0 h-[35%] bg-gradient-to-b from-[var(--color-obsidian)] to-transparent" />
      </motion.div>

      {/* Planetary arc glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 z-0 w-full max-w-5xl h-[2px] glow-pulse"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.45) 0%, transparent 65%)' }}
      />

      {/* Bugatti scan sweep — fires once at 1s */}
      <div
        className="scan-sweep absolute inset-y-0 left-0 w-[2px] z-20 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent 5%, rgba(212,175,55,0.9) 50%, transparent 95%)' }}
      />

      {/* Content — scroll-linked opacity/rise */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto gap-8"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <p className="fade-up text-[10px] tracking-[0.5em] text-[var(--color-gold)] uppercase font-semibold" style={{ animationDelay: '0.2s' }}>
          Luxora Payments
        </p>

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

        <p className="fade-up text-elder-md text-white/40 font-light tracking-widest max-w-xl" style={{ animationDelay: '0.9s' }}>
          Institutional-grade crypto payments.<br />
          The heavy hand that closes what others cannot.
        </p>

        <div className="fade-up" style={{ animationDelay: '1.2s' }}>
          <SpireButton />
        </div>

        <div className="fade-up flex flex-wrap justify-center gap-3 mt-6" style={{ animationDelay: '1.5s' }}>
          {PILLARS.map((tag) => (
            <div
              key={tag}
              className="glass-3 platinum-leak rounded-xl px-5 py-2.5 text-[9px] tracking-[0.35em] text-white/45 uppercase font-medium"
            >
              {tag}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-25">
        <div className="w-px h-10 bg-gradient-to-b from-[var(--color-gold)] to-transparent" />
        <span className="text-[8px] tracking-[0.4em] text-white uppercase">Scroll</span>
      </div>
    </section>
  );
}
