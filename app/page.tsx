'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import CompareBar, { useCompare } from '@/components/CompareBar';
import ProductIcon from '@/components/ProductIcon';
import { getAlleProducten } from '@/lib/data';
import { suikerklontjes } from '@/lib/types';
import type { Product } from '@/lib/types';

const producten = getAlleProducten();

const uitgelichtIds = ['banaan', 'witte-rijst', 'coca-cola', 'jus-doranje', 'pasta', 'patat'];

export default function HomePage() {
  const router = useRouter();
  const { ids, toggle, clear } = useCompare();

  const handleSelect = (product: Product) => {
    router.push(`/product/${product.id}`);
  };

  const uitgelicht = uitgelichtIds
    .map((id) => producten.find((p) => p.id === id))
    .filter(Boolean) as Product[];

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 pb-28">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2 leading-tight tracking-tight">
          Hoeveel suikerklontjes<br />zit er in jouw eten?
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm max-w-sm">
          1 klontje = 4g koolhydraten. Zoek een product en zie het meteen.
        </p>
      </div>

      <SearchBar producten={producten} onSelect={handleSelect} />

      <div className="mt-10">
        <p className="text-xs font-medium text-neutral-400 dark:text-neutral-500 mb-3 uppercase tracking-wider">
          Populaire producten
        </p>
        <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
          {uitgelicht.map((product, index) => {
            const klontjes = suikerklontjes(product);
            const inVergelijk = ids.includes(product.id);
            return (
              <div key={product.id} className={`group relative flex items-center ${index < uitgelicht.length - 1 ? 'border-b border-neutral-200 dark:border-neutral-800' : ''}`}>
                <Link
                  href={`/product/${product.id}`}
                  className="flex items-center gap-3 flex-1 px-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
                >
                  <ProductIcon categorie={product.categorie} size="sm" />
                  <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100 text-sm tracking-tight truncate">{product.naam}</span>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 tabular-nums">
                    {klontjes} {klontjes === 1 ? 'klontje' : 'klontjes'}
                  </span>
                </Link>
                <button
                  onClick={() => toggle(product.id)}
                  className={`mr-3 text-xs px-2 py-0.5 rounded-full border transition-all ${
                    inVergelijk
                      ? 'border-neutral-900 dark:border-neutral-100 bg-neutral-900 dark:bg-white text-white dark:text-black opacity-100'
                      : 'border-neutral-300 dark:border-neutral-700 text-neutral-400 hover:border-neutral-900 dark:hover:border-neutral-100 hover:text-neutral-900 dark:hover:text-neutral-100 opacity-0 group-hover:opacity-100'
                  }`}
                  title={inVergelijk ? 'Verwijder uit vergelijking' : 'Voeg toe aan vergelijking'}
                >
                  {inVergelijk ? '✓' : '+'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
        <Link
          href="/regels"
          className="flex items-center gap-4 px-4 py-4 border-b border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors group"
        >
          <div className="w-8 h-8 rounded-full border border-neutral-200 dark:border-neutral-800 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-neutral-600 dark:text-neutral-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-neutral-900 dark:text-neutral-100 text-sm tracking-tight">7 Koolhydraatarme Basisregels</div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Lees ze in 90 seconden en weet wat je morgen anders kunt doen.
            </div>
          </div>
          <span className="text-neutral-400 dark:text-neutral-500 text-sm">→</span>
        </Link>
        <Link
          href="/uitleg"
          className="flex items-center gap-4 px-4 py-4 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors group"
        >
          <div className="w-8 h-8 rounded-full border border-neutral-200 dark:border-neutral-800 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-neutral-600 dark:text-neutral-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-neutral-900 dark:text-neutral-100 text-sm tracking-tight">Wat is de glycemische index?</div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              GI en GL uitgelegd zonder jargon. Twee minuten lezen.
            </div>
          </div>
          <span className="text-neutral-400 dark:text-neutral-500 text-sm">→</span>
        </Link>
      </div>

      <CompareBar producten={producten} ids={ids} onRemove={toggle} onClear={clear} />
    </div>
  );
}
