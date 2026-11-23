import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/lib/auth';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'One Last Cookie — Artisan Luxury Bakery',
  description: 'Handcrafted artisan cookies, celebration cakes, and morning delicacies of unparalleled quality.',
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/logo.jpeg', type: 'image/jpeg' },
    ],
    shortcut: '/favicon.png',
    apple: '/logo.jpeg',
  },
  openGraph: {
    title: 'One Last Cookie',
    description: 'Artisan luxury baked goods crafted with love.',
    type: 'website',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`} data-scroll-behavior="smooth">
      <body className="bg-[#FAF8F5] text-[#1C1008] antialiased selection:bg-[#C9A96E]/30 selection:text-[#1C1008]">
        <SessionProvider session={session} refetchOnWindowFocus={false} refetchInterval={0}>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
