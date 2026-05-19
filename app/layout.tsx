import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import ServiceWorkerRegistrar from '@/components/ServiceWorkerRegistrar';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const viewport: Viewport = {
  themeColor: '#e07a5f',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Suikerklontjes — zie hoeveel koolhydraten je eet',
  description: 'Ontdek hoeveel suikerklontjes er in je eten zitten. Een koolhydraten-visualizer voor iedereen.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Suikerklontjes',
  },
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#fafaf7]">
        <header className="border-b border-[#e8e0d8] bg-white/80 backdrop-blur-sm sticky top-0 z-40">
          <nav className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-6">
            <Link href="/" className="font-bold text-lg tracking-tight text-gray-900 flex items-center gap-1.5">
              🍬 <span>Suikerklontjes</span>
            </Link>
            <div className="flex items-center gap-4 ml-auto text-sm font-medium text-gray-600">
              <Link href="/regels" className="hover:text-[#e07a5f] transition-colors">Regels</Link>
              <Link href="/uitleg" className="hover:text-[#e07a5f] transition-colors">Uitleg</Link>
              <Link href="/vergelijk" className="hover:text-[#e07a5f] transition-colors">Vergelijk</Link>
              <Link href="/scan" className="flex items-center gap-1.5 bg-[#e07a5f] text-white px-3 py-1.5 rounded-xl hover:bg-[#c9694f] transition-colors">
                📷 Scan
              </Link>
            </div>
          </nav>
        </header>
        <ServiceWorkerRegistrar />
        <main className="flex-1">
          {children}
        </main>
        <footer className="border-t border-[#e8e0d8] py-6 text-center text-sm text-gray-400">
          Waarden gebaseerd op NEVO, University of Sydney GI-database en USDA FoodData Central.
        </footer>
      </body>
    </html>
  );
}
