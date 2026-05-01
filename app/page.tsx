import { Suspense } from 'react';
import RefCapture from '@/components/RefCapture';
import SovereignPage from '@/components/SovereignPage';
import VipSection from '@/components/VipSection';
import type { TickerItem } from '@/components/LiquidTicker';

const FALLBACK: TickerItem[] = [
  { symbol: 'BTC',  price: 0, change24h: 0 },
  { symbol: 'ETH',  price: 0, change24h: 0 },
  { symbol: 'SOL',  price: 0, change24h: 0 },
  { symbol: 'USDC', price: 1, change24h: 0 },
];

// ISR: revalidate 60s — LCP target < 1.2s, horology.png fetchPriority=high in SovereignPage
async function getTickers(): Promise<TickerItem[]> {
  try {
    const res = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,usd-coin&vs_currencies=usd&include_24hr_change=true',
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return FALLBACK;
    const d = await res.json();
    return [
      { symbol: 'BTC',  price: d.bitcoin?.usd      ?? 0, change24h: d.bitcoin?.usd_24h_change      ?? 0 },
      { symbol: 'ETH',  price: d.ethereum?.usd     ?? 0, change24h: d.ethereum?.usd_24h_change     ?? 0 },
      { symbol: 'SOL',  price: d.solana?.usd        ?? 0, change24h: d.solana?.usd_24h_change        ?? 0 },
      { symbol: 'USDC', price: d['usd-coin']?.usd  ?? 1, change24h: d['usd-coin']?.usd_24h_change  ?? 0 },
    ];
  } catch {
    return FALLBACK;
  }
}

export default async function Home() {
  const tickers = await getTickers();

  return (
    <main>
      <Suspense fallback={null}>
        <RefCapture />
      </Suspense>
      <SovereignPage tickers={tickers} />
      <VipSection />
    </main>
  );
}
