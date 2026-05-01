'use client';

export interface TickerItem {
  symbol: string;
  price: number;
  change24h: number;
}

export default function LiquidTicker({ tickers }: { tickers: TickerItem[] }) {
  if (!tickers?.length) return null;

  const items = [...tickers, ...tickers];

  return (
    <div className="relative w-full overflow-hidden bg-[var(--color-obsidian)] border-b border-white/[0.06] h-9 flex items-center">

      {/* Left badge */}
      <div className="absolute left-0 z-10 flex items-center gap-2 px-4 h-full bg-gradient-to-r from-[var(--color-obsidian)] via-[var(--color-obsidian)] to-transparent pr-8">
        <span className="block w-[5px] h-[5px] rounded-full bg-emerald-400 glow-pulse" />
        <span className="text-[8px] tracking-[0.35em] text-white/30 uppercase font-semibold">Live</span>
      </div>

      {/* Right fade */}
      <div className="absolute right-0 z-10 w-16 h-full bg-gradient-to-l from-[var(--color-obsidian)] to-transparent pointer-events-none" />

      <div className="flex items-center whitespace-nowrap animate-marquee pl-28">
        {items.map((t, i) => (
          <span key={i} className="flex items-center mx-7 gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--color-gold)]">
              {t.symbol}
            </span>
            <span className="text-[10px] font-mono text-white/80">
              ${t.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className={`text-[10px] font-mono ${t.change24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {t.change24h >= 0 ? '▲' : '▼'} {Math.abs(t.change24h).toFixed(2)}%
            </span>
            <span className="text-[var(--color-gold)]/25 mx-1 select-none">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
