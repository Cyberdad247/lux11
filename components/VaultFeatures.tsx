import GlassPanel from './GlassPanel';

const FEATURES = [
  {
    icon: '◈',
    headline: 'Instant USD Settlement',
    body: 'Crypto in. Dollars out. Same session. No 72-hour holds, no ACH delays — funds clear the moment the buyer confirms.',
  },
  {
    icon: '⬡',
    headline: 'Zero Chargeback Exposure',
    body: 'Blockchain transactions are final. The chargebacks that haunt card processors simply do not exist in our rails.',
  },
  {
    icon: '◉',
    headline: 'White-Glove Onboarding',
    body: 'A dedicated Luxora concierge handles compliance, wallet setup, and your first transaction — end to end.',
  },
  {
    icon: '⊕',
    headline: 'Institutional-Grade Security',
    body: 'Multi-sig custody, hardware security modules, and real-time fraud monitoring protect every transaction.',
  },
  {
    icon: '◎',
    headline: 'Multi-Chain Support',
    body: 'BTC, ETH, SOL, USDC, and more. Accept what your buyer has — convert to what you need.',
  },
  {
    icon: '⬢',
    headline: 'Compliance Built In',
    body: 'KYC, AML, and transaction reporting handled automatically. Stay audit-ready without the overhead.',
  },
];

export default function VaultFeatures() {
  return (
    <section className="py-24 px-6 bg-[var(--color-obsidian)]">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-[9px] tracking-[0.5em] text-[var(--color-gold)] uppercase font-semibold mb-4">
            The Infrastructure
          </p>
          <h2 className="text-elder-lg font-extralight text-white" style={{ letterSpacing: '0.2em' }}>
            BUILT FOR THE<br />
            <span className="text-[var(--color-gold)]">HEAVY HAND</span>
          </h2>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f, i) => (
            <GlassPanel
              key={f.headline}
              delay={i * 0.08}
              whileHover={{ scale: 1.02 }}
              className="group flex flex-col gap-4 hover:border-[var(--color-gold)]/40 transition-colors duration-700 relative overflow-hidden"
            >
              {/* Shimmer top strip */}
              <div className="absolute top-0 left-0 right-0 h-px overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="shimmer absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent" />
              </div>

              <span className="text-2xl text-[var(--color-gold)] leading-none">{f.icon}</span>
              <h3 className="text-sm font-semibold tracking-[0.2em] text-white uppercase">{f.headline}</h3>
              <p className="text-sm text-white/45 leading-relaxed font-light">{f.body}</p>
            </GlassPanel>
          ))}
        </div>
      </div>
    </section>
  );
}
