'use client';

import { useState } from 'react';
import { openTypeform } from '@/lib/typeformPopup';

interface SpireButtonProps {
  label?: string;
}

export default function SpireButton({ label = 'CONNECT TO THE SPIRE' }: SpireButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (loading) return;
    setLoading(true);
    import('@typeform/embed');
    setTimeout(() => {
      setLoading(false);
      openTypeform();
    }, 400);
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="relative inline-flex items-center justify-center gap-3 rounded-full border border-[var(--color-gold)] px-10 py-4 text-sm font-bold tracking-[0.35em] text-[var(--color-gold)] uppercase overflow-hidden transition-all duration-700 hover:bg-[var(--color-gold)] hover:text-[var(--color-obsidian)] glow-pulse disabled:opacity-40 disabled:cursor-wait"
    >
      <span className="relative z-10">
        {loading ? 'OPENING…' : label}
      </span>
    </button>
  );
}
