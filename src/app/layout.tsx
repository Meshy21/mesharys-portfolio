import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Plus_Jakarta_Sans, Outfit } from 'next/font/google';
import Chatbot from '@/components/Chatbot';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-headline',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Meshary A. Aquino | Computer Engineer & Full-Stack Developer',
  description:
    'Portfolio of Meshary A. Aquino, Computer Engineer specializing in backend APIs, mobile development, edge AI, and database architecture.',
};

const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || 'f54f12c9-a5ad-4282-a4d1-ad3621b88a8e';
const umamiScriptUrl = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL || 'https://cloud.umami.is/script.js';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${outfit.variable}`}>
      <body className="font-body antialiased bg-background text-foreground">
        {umamiWebsiteId && (
          <Script
            src={umamiScriptUrl}
            data-website-id={umamiWebsiteId}
            strategy="afterInteractive"
          />
        )}
        {children}
        <Toaster />
        <Chatbot />
      </body>
    </html>
  );
}
