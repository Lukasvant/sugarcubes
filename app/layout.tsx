import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import Link from 'next/link';
import { Camera, ScanBarcode, BarChart2 } from 'lucide-react';
import ServiceWorkerRegistrar from '@/components/ServiceWorkerRegistrar';
import ThemeToggle from '@/components/ThemeToggle';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Suikerklontjes — zie hoeveel koolhydraten je eet',
  description: 'Ontdek hoeveel suikerklontjes er in je eten zitten. Voor keto, low carb en diabetes.',
  manifest: '/manifest.json',
  openGraph: {
    title: 'Suikerklontjes',
    description: 'Zie hoeveel suikerklontjes er in jouw eten zitten. 1 klontje = 4g koolhydraten.',
    type: 'website',
    locale: 'nl_NL',
  },
  twitter: {
    card: 'summary',
    title: 'Suikerklontjes',
    description: 'Zie hoeveel suikerklontjes er in jouw eten zitten.',
  },
  appleWebApp: { capable: true, statusBarStyle: 'default', title: 'Suikerklontjes' },
  icons: { icon: '/icon.svg', apple: '/icon.svg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`${GeistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
        <header className="border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black sticky top-0 z-40">
          <nav className="max-w-5xl mx-auto px-4 h-12 flex items-center gap-4">
            <Link href="/" className="font-semibold text-sm tracking-tight text-neutral-900 dark:text-neutral-100">
              Suikerklontjes
            </Link>
            <div className="flex items-center gap-0.5 ml-auto text-xs font-medium">
              <Link href="/regels" className="px-2.5 py-1.5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">Regels</Link>
              <Link href="/uitleg" className="px-2.5 py-1.5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">Uitleg</Link>
              <Link href="/vergelijk" className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                <BarChart2 className="w-3.5 h-3.5" />
                <span>Vergelijk</span>
              </Link>
              <Link href="/foto" className="flex items-center gap-1.5 px-2.5 py-1.5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                <Camera className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Foto</span>
              </Link>
              <Link href="/scan" className="flex items-center gap-1.5 border border-neutral-900 dark:border-neutral-100 text-neutral-900 dark:text-neutral-100 px-3 py-1 rounded-full hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors ml-1">
                <ScanBarcode className="w-3.5 h-3.5" />
                <span>Scan</span>
              </Link>
              <ThemeToggle />
            </div>
          </nav>
        </header>
        <ServiceWorkerRegistrar />
        <main className="flex-1">
          {children}
        </main>
        <footer className="border-t border-neutral-200 dark:border-neutral-800 py-6 text-center text-xs text-neutral-400 dark:text-neutral-500">
          Waarden gebaseerd op NEVO, University of Sydney GI-database en USDA FoodData Central.
        </footer>
      </body>
    </html>
  );
}
