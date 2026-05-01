import SpireButton from './SpireButton';

export default function SpireFooter() {
  return (
    <footer className="relative py-24 px-6 bg-[var(--color-obsidian)] border-t border-white/5 overflow-hidden">

      {/* Ambient glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-64 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(212,175,55,0.08) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center text-center gap-10">

        {/* Brand */}
        <div>
          <p className="text-[9px] tracking-[0.5em] text-[var(--color-gold)] uppercase font-semibold mb-2">
            Luxora Payments
          </p>
          <h2 className="text-elder-lg font-extralight text-white" style={{ letterSpacing: '0.3em' }}>
            ENTER THE SPIRE
          </h2>
        </div>

        {/* Sub */}
        <p className="text-sm text-white/35 tracking-widest font-light max-w-sm">
          Ready to close high-value buyers with crypto? One conversation changes everything.
        </p>

        {/* CTA */}
        <SpireButton label="CONNECT NOW" />

        {/* Contact */}
        <div className="flex flex-col items-center gap-1">
          <a
            href="mailto:partners@luxorapayments.com"
            className="text-xs text-[var(--color-gold)]/60 hover:text-[var(--color-gold)] transition-colors duration-300 tracking-[0.2em]"
          >
            partners@luxorapayments.com
          </a>
        </div>

        {/* Divider */}
        <div className="w-24 h-px bg-white/10" />

        {/* Legal */}
        <p className="text-[9px] text-white/20 tracking-wider">
          © {new Date().getFullYear()} Luxora Payments. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
