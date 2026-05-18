'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Plus, Activity, Shield, Gem, Fingerprint } from 'lucide-react';
import { openTypeform } from '@/lib/typeformPopup';
import type { TickerItem } from './LiquidTicker';

const FEATURES = [
  {
    icon: <Shield size={18} className="text-[#D4AF37]" />,
    sym: '◎',
    title: 'POLICY-LOCKED RAILS',
    desc: 'Route payment commands through governed controls, deterministic approvals, and auditable settlement states.',
  },
  {
    icon: <Activity size={18} className="text-[#D4AF37]" />,
    sym: '⊕',
    title: 'REAL-TIME COMMAND CENTER',
    desc: 'Monitor liquidity, identity, oracle health, and routing posture from one institutional operating surface.',
  },
  {
    icon: <Gem size={18} className="text-[#D4AF37]" />,
    sym: '◈',
    title: 'TREASURY-GRADE INTEGRATION',
    desc: 'Connect enterprise payment flows without exposing custody keys, vendor secrets, or operator control planes.',
  },
  {
    icon: <Fingerprint size={18} className="text-[#D4AF37]" />,
    sym: '⬡',
    title: 'IDENTITY-AWARE ACCESS',
    desc: 'Bind high-trust operators, devices, and workflows to a traceable protocol before value moves.',
  },
];

const NAV = ['Protocol', 'Network', 'Terminal', 'Docs'];

function fmt(n: number) {
  return n > 1000 ? `$${(n / 1000).toFixed(1)}K` : `$${n.toFixed(2)}`;
}

export default function SovereignPage({ tickers }: { tickers: TickerItem[] }) {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [velocity, setVelocity] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [scanDone, setScanDone] = useState(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const velRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const btc = tickers.find(t => t.symbol === 'BTC');
  const eth = tickers.find(t => t.symbol === 'ETH');

  useEffect(() => {
    const timer = setTimeout(() => setScanDone(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    const dx = e.clientX - lastMouse.current.x;
    const dy = e.clientY - lastMouse.current.y;
    const speed = Math.sqrt(dx * dx + dy * dy);
    velRef.current = velRef.current * 0.88 + (speed / 100) * 0.12;
    setVelocity(velRef.current);
    setMousePos({ x, y });
    setCursorPos({ x: e.clientX, y: e.clientY });
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  // DNA spec: intensity_base=0.04, velocity_factor=0.07, intensity_max=0.13
  const specularIntensity = Math.min(0.04 + velocity * 0.07, 0.13);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen overflow-x-hidden [@media(pointer:fine)]:cursor-none"
      style={{ background: '#010101' }}
    >
      {/* ── Custom gold reticle cursor ── */}
      <div
        className="pointer-events-none fixed z-[9999] hidden -translate-x-1/2 -translate-y-1/2 transition-none [@media(pointer:fine)]:block"
        style={{ left: cursorPos.x, top: cursorPos.y }}
      >
        <div className="relative w-5 h-5">
          <div className="absolute inset-0 rounded-full border border-[#D4AF37]/70" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[3px] h-[3px] rounded-full bg-[#D4AF37]" />
        </div>
      </div>

      {/* ── Specular map ── */}
      <div
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{
          background: `radial-gradient(1400px circle at ${mousePos.x}% ${mousePos.y}%, rgba(212,175,55,${specularIntensity}) 0%, transparent 65%)`,
          transition: 'background 0.1s linear',
        }}
      />

      {/* ── 12-col grid ── */}
      <div className="pointer-events-none fixed inset-0 z-[2]" aria-hidden>
        <div className="mx-auto max-w-6xl h-full grid grid-cols-12 px-6">
          {Array.from({ length: 13 }).map((_, i) => (
            <div
              key={i}
              className="col-span-1 border-l border-white/[0.04] h-full"
              style={{ opacity: 0.15 }}
            />
          ))}
        </div>
      </div>

      {/* ── Full-bleed hero background ── */}
      <div className="absolute inset-0 z-[0]">
        {/* fetchPriority=high: LCP target < 1.2s — Scorpion Sting gate */}
        <Image
          src="/assets/horology.png"
          alt=""
          fill
          priority
          quality={90}
          className="object-cover object-center"
          sizes="100vw"
          fetchPriority="high"
        />
        {/* Left gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/72 to-transparent" />
        {/* Top + bottom vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/52 via-transparent to-black/78" />
        <div className="absolute inset-y-0 right-0 w-full md:w-[62%] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.16)_0%,rgba(212,175,55,0.05)_38%,transparent_70%)]" />
      </div>

      {/* ── Scan-sweep line ── */}
      {!scanDone && (
        <div
          className="pointer-events-none fixed top-0 bottom-0 z-[10] w-px"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(212,175,55,0.8) 50%, transparent 100%)',
            animation: 'scanLine 1.5s cubic-bezier(0.22,1,0.36,1) 1.0s both',
          }}
        />
      )}

      {/* ═══════════════════════════ CONTENT ═══════════════════════════ */}
      <div className="relative z-[5] flex flex-col min-h-screen">

        {/* ── InfiniteBezel Header ── */}
        <header className="sticky top-0 z-50 px-4 sm:px-6 py-4">
          <nav className="mx-auto max-w-6xl flex items-center justify-between gap-3">
            {/* Logo + wordmark */}
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9">
                <Image src="/assets/logo.png" alt="Luxora" fill className="object-contain" sizes="36px" />
              </div>
              <span className="hidden md:inline text-white font-extralight tracking-[0.3em] text-sm uppercase">
                Luxora Payments
              </span>
            </div>

            {/* Nav pill */}
            <div
              className="hidden md:flex items-center gap-1 px-2 py-1.5 rounded-full"
              style={{
                background: 'rgba(0,0,0,0.55)',
                border: '1px solid rgba(212,175,55,0.12)',
                backdropFilter: 'blur(48px) saturate(180%)',
              }}
            >
              {NAV.map(n => (
                <button
                  key={n}
                  className="px-4 py-1.5 text-[11px] font-light tracking-[0.2em] uppercase text-white/60 hover:text-white rounded-full transition-colors duration-200"
                >
                  {n}
                </button>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              <div className="hidden lg:flex flex-col items-end text-right">
                <span className="text-[9px] tracking-[0.28em] uppercase text-white/35">Instant global payments</span>
                <a href="mailto:partners@luxorapayments.com" className="text-[10px] tracking-[0.18em] text-[#D4AF37]">
                  partners@luxorapayments.com
                </a>
                <span className="text-[9px] tracking-[0.24em] uppercase text-white/30">Contact : partners@luxorapayments.com</span>
              </div>
              <a href="https://merchant.getbitflow.com/sign-upcode=BF-185C14" target="_blank" rel="noopener noreferrer" className="relative flex items-center gap-2 px-3 sm:px-5 py-2 rounded-full text-[10px] sm:text-[11px] font-light tracking-[0.12em] sm:tracking-[0.18em] uppercase text-black transition-all duration-300 hover:scale-105" style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #E8D48B 50%, #D4AF37 100%)' }}>
                <span className="sm:hidden">Apply</span>
                <span className="hidden sm:inline">Apply Now</span>
              </a>
            </div>
          </nav>
        </header>

        {/* ── Hero section ── */}
        <section className="flex-1 flex items-center px-4 sm:px-6 pt-10 sm:pt-12 pb-24">
          <div className="mx-auto max-w-6xl w-full grid grid-cols-12 gap-6">
            {/* Left — copy */}
            <div className="col-span-12 md:col-span-7 lg:col-span-6 flex max-w-[22rem] flex-col justify-center md:max-w-none">
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-8 animate-reveal-top">
                <div className="w-8 h-px bg-[#D4AF37]/60" />
                <span className="text-[10px] font-light tracking-[0.45em] uppercase text-[#D4AF37]/80">
                  Institutional Grade
                </span>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-light tracking-[0.2em] uppercase text-emerald-400/80">
                    Live
                  </span>
                </div>
              </div>

              {/* H1 */}
              <h1 className="animate-reveal-left font-extralight tracking-[0.06em] uppercase leading-[1.05] mb-8"
                style={{ fontSize: 'clamp(1.9rem, 5vw + 0.5rem, 5rem)' }}>
                <span className="text-white">Command Payment</span>
                <br />
                <span className="text-white">Infrastructure</span>
                <br />
                <em className="not-italic"
                  style={{ color: '#D4AF37', fontStyle: 'italic', letterSpacing: '0.08em' }}>
                  Like A System.
                </em>
              </h1>

              {/* Sub */}
              <div className="animate-reveal-bottom border-l-2 border-[#D4AF37]/40 pl-5 mb-10">
                <p className="font-light tracking-[0.06em] leading-relaxed text-white/70"
                  style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)' }}>
                  We assist businesses with onboarding and high-value transactions.
                  We can set up anyone in the world on any part of the globe. It pays to partner with Luxora.
                </p>
              </div>

              {/* CTA */}
              <div className="animate-reveal-bottom flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
                <a href="https://merchant.getbitflow.com/sign-upcode=BF-185C14" target="_blank" rel="noopener noreferrer" className="group relative flex w-full justify-center sm:w-auto items-center gap-3 px-6 sm:px-8 py-4 rounded-full font-light tracking-[0.14em] sm:tracking-[0.2em] uppercase text-xs sm:text-sm text-black transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]" style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #E8D48B 40%, #D4AF37 100%)' }}>
                  {/* Pulse ring */}
                  <span className="absolute inset-0 rounded-full animate-ping opacity-20"
                    style={{ background: 'rgba(212,175,55,0.5)', animationDuration: '2.2s' }} />
                  <Plus
                    size={16}
                    className="transition-transform duration-300 group-hover:rotate-90"
                  />
                  Apply Now
                </a>

                <button className="text-[11px] font-light tracking-[0.2em] uppercase text-white/40 hover:text-white/70 transition-colors duration-200">
                  View Protocol →
                </button>
              </div>

              {/* Trust strip */}
              <div className="animate-reveal-bottom mt-10 flex flex-wrap items-center gap-4 sm:gap-6">
                {[
                  { val: '$2.4B', label: 'Liquidity Pool' },
                  { val: '10.4ms', label: 'Route Latency' },
                  { val: '99.97%', label: 'Uptime' },
                ].map(({ val, label }) => (
                  <div key={label} className="flex flex-col gap-0.5">
                    <span className="text-[#D4AF37] font-extralight tracking-[0.1em] text-base">{val}</span>
                    <span className="text-white/35 text-[10px] font-light tracking-[0.2em] uppercase">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — floating data panel */}
            <div className="hidden md:flex md:col-span-5 lg:col-span-6 items-end justify-end pb-8">
              <div
                className="w-full max-w-64 p-5 rounded-2xl"
                style={{
                  background: 'rgba(0,0,0,0.6)',
                  border: '1px solid rgba(212,175,55,0.12)',
                  backdropFilter: 'blur(48px) saturate(180%)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 24px 64px rgba(0,0,0,0.6)',
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Activity size={13} className="text-[#D4AF37]" />
                    <span className="text-[10px] font-light tracking-[0.25em] uppercase text-white/50">
                      Network Velocity
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] text-emerald-400/80">10.4ms</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {[btc, eth].filter(Boolean).map(t => t && (
                    <div key={t.symbol} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                          <span className="text-[9px] font-light text-[#D4AF37]">{t.symbol[0]}</span>
                        </div>
                        <span className="text-[11px] font-light tracking-[0.15em] text-white/60">{t.symbol}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-[12px] font-light text-white">{fmt(t.price)}</div>
                        <div className={`text-[10px] font-light ${t.change24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {t.change24h >= 0 ? '+' : ''}{t.change24h.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-white/[0.06]">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-light tracking-[0.2em] uppercase text-white/30">
                      Settlement Mode
                    </span>
                    <span className="text-[10px] font-light text-[#D4AF37]/70">Instant USD</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Feature strip ── */}
        <section className="relative z-[5] px-4 sm:px-6 pb-24">
          <div className="mx-auto max-w-6xl">
            {/* Platinum leak separator */}
            <div className="platinum-leak w-full mb-12" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {FEATURES.map((f, i) => (
                <div
                  key={i}
                  className="group p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: 'rgba(0,0,0,0.5)',
                    border: '1px solid rgba(212,175,55,0.08)',
                    backdropFilter: 'blur(24px) saturate(200%)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 16px 48px rgba(0,0,0,0.5)',
                    transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)',
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center
                                    group-hover:bg-[#D4AF37]/20 transition-colors duration-300">
                      {f.icon}
                    </div>
                    <span className="text-[9px] font-light tracking-[0.35em] uppercase text-[#D4AF37]/60">
                      {f.sym}
                    </span>
                  </div>
                  <h3 className="text-[11px] font-light tracking-[0.25em] uppercase text-white mb-3">
                    {f.title}
                  </h3>
                  <p className="text-[12px] font-light leading-relaxed text-white/45">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-[5] px-4 sm:px-6 pb-16">
          <div className="mx-auto max-w-6xl rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6 sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
              <div className="space-y-4">
                <p className="text-[10px] tracking-[0.45em] uppercase text-[#D4AF37]/70">Speak with our team</p>
                <h2 className="text-2xl font-extralight uppercase tracking-[0.08em] text-white sm:text-4xl">
                  Trusted by businesses preparing for the next crypto wave
                </h2>
                <p className="max-w-2xl text-sm leading-7 text-white/55">
                  Built for high-value transactions, deal closing, secure payment processing infrastructure, and white-glove onboarding.
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-black/30 p-5">
                <p className="text-xs tracking-[0.35em] uppercase text-white/35">Contact us at</p>
                <div className="mt-4 space-y-3 text-sm">
                  <a href="mailto:partners@luxorapayments.com" className="block text-[#D4AF37] hover:underline">
                    partners@luxorapayments.com
                  </a>
                  <a href="mailto:onboarding@luxorapayments.com" className="block text-[#D4AF37] hover:underline">
                    onboarding@luxorapayments.com
                  </a>
                </div>
                <div className="mt-6 border-t border-white/[0.08] pt-4 text-xs tracking-[0.28em] uppercase text-white/30">
                  DONT MISS THE NEXT WAVE OF PAYMENTS
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Fixed bottom footer ticker ── */}
        <footer
          className="sticky bottom-0 z-50 px-6 py-3 border-t border-white/[0.06]"
          style={{
            background: 'rgba(1,1,1,0.85)',
            backdropFilter: 'blur(24px) saturate(180%)',
          }}
        >
          <div className="mx-auto max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Liquidity Pool', val: '$2.4B', sub: 'Protocol depth' },
              {
                label: 'BTC Oracle',
                val: btc ? fmt(btc.price) : '—',
                sub: btc
                  ? `${btc.change24h >= 0 ? '+' : ''}${btc.change24h.toFixed(2)}% 24h`
                  : 'Live',
              },
              { label: 'Integrity Check', val: 'Verifying', sub: 'Chain valid' },
              { label: 'Node', val: 'NY-04', sub: 'Latency 10.4ms' },
            ].map(({ label, val, sub }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span className="text-[9px] font-light tracking-[0.25em] uppercase text-white/30">{label}</span>
                <span className="text-[13px] font-light text-white tracking-[0.08em]">{val}</span>
                <span className="text-[9px] font-light text-white/25 tracking-[0.15em]">{sub}</span>
              </div>
            ))}
          </div>
        </footer>
      </div>

    </div>
  );
}
