import type { Metadata } from 'next';
import { Space_Mono, Syne } from 'next/font/google';
import './globals.css';

const spaceMono = Space_Mono({
  variable: '--font-space-mono',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

const syne = Syne({
  variable: '--font-syne',
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'LaunchPad AI — Stop guessing. Start launching.',
  description: 'AI-powered launch strategy for indie hackers and solo founders.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceMono.variable} ${syne.variable}`}
      style={{ background: '#0a0a0c', minHeight: '100vh' }}
    >
      <body style={{ background: '#0a0a0c', color: '#e8e8f0', minHeight: '100vh', fontFamily: 'var(--font-space-mono), monospace' }}>
        {children}
      </body>
    </html>
  );
}
