'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import CompareBar, { useCompare } from '@/components/CompareBar';
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
    <div className="max-w-3xl mx-auto px-4 py-12 pb-28">
      {/* Hero */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-teal-50 border border-teal-100 mb-5">
          <svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="16,3 29,9 16,15 3,9" fill="#f0f9ff" stroke="#0d9488" strokeWidth="1"/>
            <polygon points="16,15 29,9 29,22 16,28" fill="#e0f2fe" stroke="#0d9488" strokeWidth="1"/>
            <polygon points="16,15 3,9 3,22 16,28" fill="#bae6fd" stroke="#0d9488" strokeWidth="1"/>
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-3 leading-tight tracking-tight">
          Hoeveel suikerklontjes<br />zit er in jouw eten?
        </h1>
        <p className="text-gray-500 text-base max-w-sm mx-auto">
          1 klontje = 4g koolhydraten. Zoek een product en zie het meteen.
        </p>
      </div>

      {/* Search */}
      <SearchBar producten={producten} onSelect={handleSelect} />

      {/* Quick picks */}
      <div className="mt-12">
        <p className="text-sm font-medium text-gray-400 mb-4 text-center uppercase tracking-wider">
          Populaire producten
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {uitgelicht.map((product) => {
            const klontjes = suikerklontjes(product);
            const inVergelijk = ids.includes(product.id);
            return (
              <div key={product.id} className="group relative">
                <Link
                  href={`/product/${product.id}`}
                  className="flex items-center gap-3 bg-white rounded-2xl border border-[#e2e8f0] p-4 hover:border-[#0d9488] hover:shadow-md transition-all block"
                >
                  <span className="text-3xl">{product.emoji}</span>
                  <div className="min-w-0">
                    <div className="font-medium text-gray-900 text-sm leading-tight truncate">{product.naam}</div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {klontjes} {klontjes === 1 ? 'klontje' : 'klontjes'}
                    </div>
                  </div>
                </Link>
                <button
                  onClick={() => toggle(product.id)}
                  className={`absolute top-2 right-2 text-xs px-1.5 py-0.5 rounded-lg transition-all ${
                    inVergelijk
                      ? 'bg-[#0d9488] text-white opacity-100'
                      : 'bg-gray-100 text-gray-400 hover:bg-gray-200 opacity-0 group-hover:opacity-100'
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

      {/* Promo blocks */}
      <div className="mt-10 grid sm:grid-cols-2 gap-4">
        <Link
          href="/regels"
          className="group bg-white rounded-2xl border border-[#e2e8f0] p-6 hover:border-teal-300 hover:shadow-sm transition-all"
        >
          <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center mb-3 group-hover:bg-teal-100 transition-colors">
            <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <h2 className="font-semibold text-gray-900 mb-1">7 Koolhydraatarme Basisregels</h2>
          <p className="text-sm text-gray-500">
            Lees ze in 90 seconden en weet wat je morgen anders kunt doen.
          </p>
        </Link>
        <Link
          href="/uitleg"
          className="group bg-white rounded-2xl border border-[#e2e8f0] p-6 hover:border-teal-300 hover:shadow-sm transition-all"
        >
          <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center mb-3 group-hover:bg-teal-100 transition-colors">
            <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h2 className="font-semibold text-gray-900 mb-1">Wat is de glycemische index?</h2>
          <p className="text-sm text-gray-500">
            GI en GL uitgelegd zonder jargon. Twee minuten lezen.
          </p>
        </Link>
      </div>

      <CompareBar producten={producten} ids={ids} onRemove={toggle} onClear={clear} />
    </div>
  );
}
