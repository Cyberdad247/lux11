import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import '@typeform/embed/build/css/popup.css';

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
  description: 'Institutional command infrastructure for governed settlement, operator identity, live telemetry, and verifiable execution.',
  keywords: ['payment command center', 'institutional settlement', 'governed payment rails', 'enterprise payment telemetry'],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
