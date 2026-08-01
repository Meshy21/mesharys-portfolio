import type { Metadata } from 'next';
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${outfit.variable}`}>
      <body className="font-body antialiased bg-background text-foreground">
        {children}
        <Toaster />
        <Chatbot />
      </body>
    </html>
  );
}
