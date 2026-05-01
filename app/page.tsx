import { Suspense } from 'react';
import Hero from '@/components/Hero';
import VaultFeatures from '@/components/VaultFeatures';
import SpireFooter from '@/components/SpireFooter';
import SectionReveal from '@/components/SectionReveal';
import RefCapture from '@/components/RefCapture';

export default function Home() {
  return (
    <main className="bg-[var(--color-obsidian)]">
      <Suspense fallback={null}>
        <RefCapture />
      </Suspense>
      <Hero />
      <SectionReveal delay={0.05}>
        <VaultFeatures />
      </SectionReveal>
      <SectionReveal delay={0.05}>
        <SpireFooter />
      </SectionReveal>
    </main>
  );
}
