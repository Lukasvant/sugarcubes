import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { Camera, ScanBarcode, BarChart2 } from 'lucide-react';
import ServiceWorkerRegistrar from '@/components/ServiceWorkerRegistrar';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const viewport: Viewport = {
  themeColor: '#0d9488',
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
      <body className="min-h-full flex flex-col bg-[#f8fafc]">
        <header className="border-b border-[#1e3a5f] bg-[#0f2137] sticky top-0 z-40">
          <nav className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-6">
            <Link href="/" className="font-bold text-base tracking-tight text-white flex items-center gap-2">
              <span className="text-teal-400 font-black">SK</span>
              <span className="hidden sm:inline">Suikerklontjes</span>
            </Link>
            <div className="flex items-center gap-1 ml-auto text-sm font-medium">
              <Link href="/regels" className="px-3 py-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">Regels</Link>
              <Link href="/uitleg" className="px-3 py-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">Uitleg</Link>
              <Link href="/vergelijk" className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                <BarChart2 className="w-4 h-4" />
                <span>Vergelijk</span>
              </Link>
              <Link href="/foto" className="flex items-center gap-1.5 px-3 py-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                <Camera className="w-4 h-4" />
                <span className="hidden sm:inline">Foto</span>
              </Link>
              <Link href="/scan" className="flex items-center gap-1.5 bg-teal-600 text-white px-3 py-1.5 rounded-lg hover:bg-teal-500 transition-colors ml-1">
                <ScanBarcode className="w-4 h-4" />
                <span>Scan</span>
              </Link>
            </div>
          </nav>
        </header>
        <ServiceWorkerRegistrar />
        <main className="flex-1">
          {children}
        </main>
        <footer className="border-t border-[#e2e8f0] py-6 text-center text-sm text-gray-400">
          Waarden gebaseerd op NEVO, University of Sydney GI-database en USDA FoodData Central.
        </footer>
      </body>
    </html>
  );
}
