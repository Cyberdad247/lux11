'use client';

import { motion, type TargetAndTransition } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  whileHover?: TargetAndTransition;
}

const EASE_FLUID = [0.22, 1, 0.36, 1] as const;

export default function GlassPanel({ children, className, delay = 0, whileHover }: GlassPanelProps) {
  return (
    <motion.div
      className={cn('glass-3 platinum-leak rounded-2xl p-6', className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ type: 'spring', stiffness: 90, damping: 28, delay }}
      whileHover={whileHover}
    >
      {children}
    </motion.div>
  );
}
