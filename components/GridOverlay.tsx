'use client';

import { useEffect, useRef } from 'react';

const COLS = 12;

export default function GridOverlay() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      refs.current.forEach((col) => {
        if (!col) return;
        const rect = col.getBoundingClientRect();
        const colX = rect.left + rect.width / 2;
        const dist = Math.abs(e.clientX - colX);
        const glow = Math.max(0, 1 - dist / 100);
        col.style.opacity = String((0.06 + glow * 0.3).toFixed(3));
      });
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[5] flex items-stretch justify-center"
      aria-hidden
    >
      <div className="w-full max-w-6xl mx-auto px-6 grid grid-cols-12 gap-4">
        {Array.from({ length: COLS }, (_, i) => (
          <div key={i} className="relative">
            <div
              ref={(el) => { refs.current[i] = el; }}
              className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
              style={{
                background: 'linear-gradient(to bottom, transparent 0%, rgba(212,175,55,0.9) 20%, rgba(212,175,55,0.9) 80%, transparent 100%)',
                opacity: 0.06,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
