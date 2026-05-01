'use client';

import { useEffect, useRef } from 'react';
import { animate, useInView } from 'framer-motion';
import GlassPanel from './GlassPanel';

const EASE_FLUID = [0.22, 1, 0.36, 1] as const;

function StatNumber({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const ctrl = animate(0, value, {
      duration: 2.2,
      ease: EASE_FLUID,
      onUpdate: (v) => {
        el.textContent = prefix + v.toFixed(decimals) + suffix;
      },
    });
    return () => ctrl.stop();
  }, [inView, value, prefix, suffix, decimals]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}

const STATS = [
  { value: 2.4,  prefix: '$', suffix: 'B+', decimals: 1, label: 'Transaction Volume',    sub: 'Across 47 supported chains' },
  { value: 0,    prefix: '',  suffix: '',   decimals: 0, label: 'Chargebacks',            sub: 'Blockchain finality is absolute' },
  { value: 60,   prefix: '<', suffix: 's',  decimals: 0, label: 'Settlement Window',      sub: 'Crypto → USD, same session' },
  { value: 99.99,prefix: '',  suffix: '%',  decimals: 2, label: 'Platform Uptime',        sub: 'Institutional SLA guaranteed' },
] as const;

const FEATURES = [
  {
    icon: '⬡',
    headline: 'Multi-Sig Custody',
    body: 'HSM-backed wallets with threshold signing. No single point of key compromise — ever.',
  },
  {
    icon: '◈',
    headline: 'Real-Time Compliance',
    body: 'Automated KYC, AML screening, and transaction reporting. Audit-ready from day one.',
  },
] as const;

const BADGES = ['SOC 2 TYPE II', 'MULTI-SIG', 'REAL-TIME AML', '47 CHAINS', 'HSM PROTECTED', 'ISO 27001'] as const;

export default function CommandCenter() {
  return (
    <section className="py-24 px-6 bg-[var(--color-obsidian)] grid-lines">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[9px] tracking-[0.5em] text-[var(--color-gold)] uppercase font-semibold mb-4">
            Institutional Infrastructure
          </p>
          <h2 className="text-elder-lg font-extralight text-white" style={{ letterSpacing: '0.22em' }}>
            COMMAND<br /><span className="text-[var(--color-gold)]">CENTER</span>
          </h2>
        </div>

        {/* Asymmetric stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">

          {/* Featured stat — spans 2 cols */}
          <GlassPanel
            delay={0}
            whileHover={{ scale: 1.015 }}
            className="col-span-2 flex flex-col justify-between gap-6 min-h-[160px] hover:border-[var(--color-gold)]/30 transition-colors duration-700"
          >
            <p className="text-[9px] tracking-[0.4em] text-[var(--color-gold)] uppercase font-semibold">
              Total Volume Processed
            </p>
            <div>
              <div className="text-elder-xl font-extralight text-[var(--color-gold)] leading-none" style={{ letterSpacing: '0.05em' }}>
                <StatNumber value={STATS[0].value} prefix={STATS[0].prefix} suffix={STATS[0].suffix} decimals={STATS[0].decimals} />
              </div>
              <p className="text-[10px] text-white/30 tracking-widest mt-2 uppercase">{STATS[0].sub}</p>
            </div>
          </GlassPanel>

          {/* Stat 2 */}
          {STATS.slice(1).map((s, i) => (
            <GlassPanel
              key={s.label}
              delay={(i + 1) * 0.07}
              whileHover={{ scale: 1.02 }}
              className="flex flex-col justify-between gap-3 min-h-[140px] hover:border-[var(--color-gold)]/25 transition-colors duration-700"
            >
              <p className="text-[9px] tracking-[0.35em] text-white/35 uppercase font-medium">{s.label}</p>
              <div>
                <div className="text-elder-lg font-extralight text-white leading-none" style={{ fontVariantNumeric: 'tabular-nums' }}>
                  <StatNumber value={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
                </div>
                <p className="text-[9px] text-white/25 tracking-wider mt-1">{s.sub}</p>
              </div>
            </GlassPanel>
          ))}
        </div>

        {/* Feature cards row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {FEATURES.map((f, i) => (
            <GlassPanel
              key={f.headline}
              delay={0.35 + i * 0.1}
              whileHover={{ scale: 1.015 }}
              className="group flex flex-col gap-4 hover:border-[var(--color-gold)]/30 transition-colors duration-700 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-px overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="shimmer absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent" />
              </div>
              <span className="text-xl text-[var(--color-gold)]">{f.icon}</span>
              <h3 className="text-sm font-semibold tracking-[0.2em] text-white uppercase">{f.headline}</h3>
              <p className="text-sm text-white/40 leading-relaxed font-light">{f.body}</p>
            </GlassPanel>
          ))}
        </div>

        {/* Badge rail */}
        <div className="flex flex-wrap justify-center gap-2">
          {BADGES.map((b) => (
            <div
              key={b}
              className="glass-3 rounded-full px-4 py-1.5 text-[8px] tracking-[0.35em] text-white/30 uppercase font-semibold border border-white/[0.06]"
            >
              {b}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
