'use client';

import { useState, useEffect } from 'react';
import SpireButton from './SpireButton';

const NAV = [
  { label: 'Solutions',    href: '#command' },
  { label: 'Architecture', href: '#command' },
  { label: 'Pricing',      href: '#' },
  { label: 'Company',      href: '#' },
] as const;

export default function InfiniteBezel() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className="fixed top-4 left-1/2 z-50 w-full max-w-5xl -translate-x-1/2 px-4 transition-all duration-500"
      style={{ top: scrolled ? '0.5rem' : '1rem' }}
    >
      <div className="glass-bezel rounded-full flex items-center justify-between px-5 py-2.5">

        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 shrink-0">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
            <polygon points="14,2 26,9 26,19 14,26 2,19 2,9" stroke="#D4AF37" strokeWidth="1.2" fill="none" />
            <polygon points="14,7 21,11 21,17 14,21 7,17 7,11" stroke="#D4AF37" strokeWidth="0.6" fill="rgba(212,175,55,0.08)" />
            <line x1="14" y1="2" x2="14" y2="26" stroke="#D4AF37" strokeWidth="0.4" strokeOpacity="0.4" />
            <line x1="2" y1="9" x2="26" y2="19" stroke="#D4AF37" strokeWidth="0.4" strokeOpacity="0.4" />
            <line x1="26" y1="9" x2="2" y2="19" stroke="#D4AF37" strokeWidth="0.4" strokeOpacity="0.4" />
          </svg>
          <div className="hidden sm:block">
            <p className="text-[10px] font-bold tracking-[0.25em] text-white leading-none">LUXORA</p>
            <p className="text-[7px] tracking-[0.35em] text-white/40 uppercase leading-none mt-0.5">PAYMENTS</p>
          </div>
        </a>

        {/* Nav links */}
        <nav className="hidden lg:flex items-center gap-6">
          {NAV.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-[10px] tracking-[0.2em] text-white/45 uppercase hover:text-white/80 transition-colors duration-300 font-medium"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button className="hidden sm:block text-[10px] tracking-[0.2em] text-white/35 uppercase hover:text-white/60 transition-colors duration-300 font-medium px-2">
            Sign In
          </button>
          <SpireButton label="INITIALIZE SYSTEM" compact />
        </div>
      </div>
    </header>
  );
}
