'use client';

import { useState } from 'react';
import { openTypeform } from '@/lib/typeformPopup';

interface SpireButtonProps {
  label?: string;
  compact?: boolean;
}

export default function SpireButton({
  label   = 'CONNECT TO THE SPIRE',
  compact = false,
}: SpireButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (loading) return;
    setLoading(true);
    import('@typeform/embed');
    setTimeout(() => { setLoading(false); openTypeform(); }, 400);
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`
        relative inline-flex items-center justify-center gap-2.5 rounded-full
        border border-[var(--color-gold)] font-bold tracking-[0.3em] text-[var(--color-gold)]
        uppercase overflow-visible
        transition-colors duration-300
        hover:bg-[var(--color-gold)] hover:text-[var(--color-obsidian)]
        disabled:opacity-40 disabled:cursor-wait
        ${compact ? 'px-5 py-2 text-[9px]' : 'px-9 py-3.5 text-[11px]'}
      `}
    >
      {/* Biometric pulse rings — always active on primary (non-compact) */}
      {!compact && (
        <>
          <span className="bio-ring-1 absolute inset-0 rounded-full border border-[var(--color-gold)] pointer-events-none" />
          <span className="bio-ring-2 absolute inset-0 rounded-full border border-[var(--color-gold)] pointer-events-none" />
        </>
      )}

      {/* Fingerprint icon */}
      {!compact && (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0 opacity-70">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" strokeDasharray="3 3" />
          <path d="M12 6c-3.31 0-6 2.69-6 6" />
          <path d="M12 9c-1.66 0-3 1.34-3 3" />
          <circle cx="12" cy="12" r="1" fill="currentColor" />
        </svg>
      )}

      <span className="relative z-10">{loading ? 'OPENING…' : label}</span>
    </button>
  );
}
