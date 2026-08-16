import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'DRST Technologies | Digital Solutions. Real Transformation.',
  description: 'Premium website development, customized AI automation workflows, and elegant brand identity design. Discover digital solutions for real transformation.',
  // Note: System must support changing domain later. We configure metadataBase dynamically or via a fallback:
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://drst-technologies.vercel.app'),
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: 'DRST Technologies | Digital Solutions. Real Transformation.',
    description: 'Engineering professional websites, automation solutions, and distinct brand identities. High-end conversion-focused tech solutions.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'DRST Technologies Logo',
      },
    ],
    type: 'website',
    siteName: 'DRST Technologies',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DRST Technologies | Digital Solutions. Real Transformation.',
    description: 'Engineering professional websites, automation solutions, and distinct brand identities.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} scroll-smooth`}>
      <body className="bg-obsidian text-ivory font-sans flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
