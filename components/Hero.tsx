'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import SpireButton from './SpireButton';
import MaterialAnchor from './MaterialAnchor';

const PILLARS = ['NO CHARGEBACKS', 'INSTANT SETTLEMENT', 'ZERO FRICTION', 'WHITE-GLOVE'] as const;

export default function Hero() {
  const ref       = useRef<HTMLElement>(null);
  const specRef   = useRef<HTMLDivElement>(null);
  const lastMouse = useRef({ x: 0, y: 0, t: 0 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY            = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY       = useTransform(scrollYProgress, [0, 0.6], ['0%', '6%']);

  /* Revolut Ultra Specular Map — delta-velocity tracking */
  useEffect(() => {
    const el   = ref.current;
    const spec = specRef.current;
    if (!el || !spec) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x    = ((e.clientX - rect.left) / rect.width) * 100;
      const y    = ((e.clientY - rect.top)  / rect.height) * 100;
      const now  = Date.now();
      const dt   = Math.max(1, now - lastMouse.current.t);
      const dx   = e.clientX - lastMouse.current.x;
      const dy   = e.clientY - lastMouse.current.y;
      const vel  = Math.sqrt(dx * dx + dy * dy) / dt;
      const inty = Math.min(0.13, 0.04 + vel * 0.07);
      spec.style.background = `radial-gradient(circle at ${x.toFixed(1)}% ${y.toFixed(1)}%, rgba(212,175,55,${inty.toFixed(3)}) 0%, transparent 52%)`;
      lastMouse.current = { x: e.clientX, y: e.clientY, t: now };
    };

    el.addEventListener('mousemove', onMove, { passive: true });
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-[var(--color-obsidian)]">

      {/* Parallax Elder Titan background */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <Image
          src="/assets/hero-bg.png"
          alt=""
          fill
          priority
          className="object-cover object-center opacity-20"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-obsidian)] via-[var(--color-obsidian)]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-obsidian)]/80 via-transparent to-[var(--color-obsidian)]" />
      </motion.div>

      {/* Revolut Ultra specular overlay */}
      <div ref={specRef} className="pointer-events-none absolute inset-0 z-10" />

      {/* Bugatti scan sweep */}
      <div
        className="scan-sweep absolute inset-y-0 left-0 w-[2px] z-20 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent 5%, rgba(212,175,55,0.9) 50%, transparent 95%)' }}
      />

      {/* 60 / 40 sovereign grid */}
      <motion.div
        className="relative z-10 grid lg:grid-cols-5 min-h-screen pt-20 max-w-7xl mx-auto px-6 lg:px-12"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        {/* ── Left 60% — typographic gravity ───────────────── */}
        <div className="lg:col-span-3 flex flex-col justify-center py-20 lg:py-32 pr-0 lg:pr-12">

          {/* Eyebrow pill */}
          <div className="fade-up mb-8" style={{ animationDelay: '0.15s' }}>
            <span className="glass-3 platinum-leak rounded-full px-5 py-1.5 text-[9px] tracking-[0.45em] text-[var(--color-gold)] uppercase font-semibold">
              Institutional Payments · Sovereign Grade
            </span>
          </div>

          {/* H1 — 0.8em tracking Old Money */}
          <div className="overflow-hidden mb-6">
            <h1
              className="mask-reveal text-elder-xl font-extralight text-white leading-[1.05]"
              style={{ letterSpacing: 'clamp(0.2em, 2vw, 0.8em)', animationDelay: '0.3s' }}
            >
              INTEGRATION<br />
              MADE{' '}
              <em className="not-italic text-[var(--color-gold)]">SOVEREIGN.</em><br />
              POWER MADE<br />
              <em className="not-italic text-[var(--color-gold)]">ABSOLUTE.</em>
            </h1>
          </div>

          {/* Sub */}
          <p
            className="fade-up text-elder-md text-white/40 font-light max-w-lg mb-10"
            style={{ letterSpacing: '0.06em', lineHeight: 1.7, animationDelay: '0.75s' }}
          >
            The institutional crypto payment gateway for visionary operators.
            Close any deal. Settle instantly. Prosper absolutely.
          </p>

          {/* CTA row */}
          <div className="fade-up flex flex-wrap items-center gap-4 mb-12" style={{ animationDelay: '1.0s' }}>
            <SpireButton label="INITIALIZE SYSTEM" />
            <button className="flex items-center gap-2 text-[10px] tracking-[0.25em] text-white/40 uppercase hover:text-white/70 transition-colors duration-300 font-medium">
              <span className="block w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-[8px]">▶</span>
              View Architecture
            </button>
          </div>

          {/* Pillar badges */}
          <div className="fade-up flex flex-wrap gap-2" style={{ animationDelay: '1.25s' }}>
            {PILLARS.map((tag) => (
              <div
                key={tag}
                className="glass-3 platinum-leak rounded-lg px-4 py-2 text-[8px] tracking-[0.3em] text-white/35 uppercase font-medium"
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* ── Right 40% — Material Anchor ─────────────────── */}
        <div className="hidden lg:flex lg:col-span-2 items-center justify-center py-32">
          <MaterialAnchor />
        </div>
      </motion.div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-20 z-10">
        <div className="w-px h-10 bg-gradient-to-b from-[var(--color-gold)] to-transparent" />
        <span className="text-[7px] tracking-[0.45em] text-white uppercase">Scroll</span>
      </div>
    </section>
  );
}
