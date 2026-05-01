import SpireButton from './SpireButton';
import type { TickerItem } from './LiquidTicker';

const CHAINS = ['BTC', 'ETH', 'SOL', 'USDC', 'USDT', 'LTC', 'TRON', 'AVAX'] as const;

export default function SpireFooter({ tickers = [] }: { tickers?: TickerItem[] }) {
  const btc  = tickers.find(t => t.symbol === 'BTC');
  const eth  = tickers.find(t => t.symbol === 'ETH');

  return (
    <footer className="relative bg-[var(--color-obsidian)] overflow-hidden">

      {/* Main CTA section */}
      <div className="relative py-24 px-6 border-t border-white/[0.05]">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-64 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(212,175,55,0.07) 0%, transparent 70%)' }}
        />

        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center text-center gap-10">
          <div>
            <p className="text-[9px] tracking-[0.5em] text-[var(--color-gold)] uppercase font-semibold mb-3">
              Enter The Spire
            </p>
            <h2
              className="text-elder-lg font-extralight text-white"
              style={{ letterSpacing: '0.5em' }}
            >
              ENTER THE<br />
              <span className="text-[var(--color-gold)]">SOVEREIGN</span>
            </h2>
          </div>

          <p className="text-sm text-white/30 tracking-widest font-light max-w-sm">
            One conversation. Every deal closed.
          </p>

          <SpireButton label="INITIALIZE SYSTEM" />

          <a
            href="mailto:partners@luxorapayments.com"
            className="text-[10px] text-[var(--color-gold)]/50 hover:text-[var(--color-gold)] transition-colors duration-300 tracking-[0.25em]"
          >
            partners@luxorapayments.com
          </a>
        </div>
      </div>

      {/* ── Billboard Liquidity Oracle ─────────────────────── */}
      <div className="border-t border-white/[0.06] bg-[var(--color-obsidian-lift)]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Tagline */}
          <div className="flex items-center gap-3">
            <span className="block w-1.5 h-1.5 rounded-full bg-emerald-400 glow-pulse" />
            <p className="text-[8px] tracking-[0.45em] text-white/25 uppercase font-semibold">
              Built for the New Financial World
            </p>
          </div>

          {/* Live Oracle metrics */}
          <div className="flex items-center gap-6">
            {btc && (
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-semibold tracking-[0.2em] text-[var(--color-gold)] uppercase">BTC</span>
                <span className="text-[9px] font-mono text-white/60">
                  ${btc.price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </span>
                <span className={`text-[8px] font-mono ${btc.change24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {btc.change24h >= 0 ? '▲' : '▼'}{Math.abs(btc.change24h).toFixed(2)}%
                </span>
              </div>
            )}
            {eth && (
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-semibold tracking-[0.2em] text-[var(--color-gold)] uppercase">ETH</span>
                <span className="text-[9px] font-mono text-white/60">
                  ${eth.price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </span>
                <span className={`text-[8px] font-mono ${eth.change24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {eth.change24h >= 0 ? '▲' : '▼'}{Math.abs(eth.change24h).toFixed(2)}%
                </span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <span className="text-[8px] tracking-[0.15em] text-white/20 uppercase">Volume</span>
              <span className="text-[9px] font-mono font-semibold text-[var(--color-gold)]">$2.4B+</span>
            </div>
          </div>

          {/* Chain rail */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {CHAINS.map((c) => (
              <span
                key={c}
                className="text-[7px] tracking-[0.2em] text-white/20 uppercase font-mono px-2 py-1 border border-white/[0.05] rounded"
              >
                {c}
              </span>
            ))}
            <span className="text-[7px] tracking-[0.1em] text-white/15 uppercase font-mono">+39 MORE</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/[0.04] px-6 py-3 text-center">
          <p className="text-[8px] text-white/15 tracking-wider">
            © {new Date().getFullYear()} Luxora Payments · All rights reserved · No crypto-bro slang. Ever.
          </p>
        </div>
      </div>
    </footer>
  );
}
