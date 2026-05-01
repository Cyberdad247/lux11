import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import '@typeform/embed/build/css/popup.css';
import InfiniteBezel from '@/components/InfiniteBezel';
import GridOverlay from '@/components/GridOverlay';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Luxora — Integration Made Sovereign.',
  description: 'The institutional crypto payment infrastructure. Close any deal. Settle instantly. Prosper absolutely.',
  keywords: ['crypto payments', 'institutional payments', 'bitcoin settlement', 'enterprise crypto'],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <GridOverlay />
        <InfiniteBezel />
        {children}
      </body>
    </html>
  );
}
