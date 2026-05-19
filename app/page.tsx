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
        <div className="text-6xl mb-4">🍬</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-3 leading-tight">
          Hoeveel suikerklontjes<br />zit er in jouw eten?
        </h1>
        <p className="text-gray-500 text-lg max-w-md mx-auto">
          1 klontje = 4g koolhydraten. Typ een product en zie het meteen.
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
                  className="flex items-center gap-3 bg-white rounded-2xl border border-[#e8e0d8] p-4 hover:border-[#e07a5f] hover:shadow-md transition-all block"
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
                      ? 'bg-[#e07a5f] text-white opacity-100'
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
          className="bg-white rounded-2xl border border-[#e8e0d8] p-6 hover:border-[#e07a5f] hover:shadow-md transition-all"
        >
          <div className="text-2xl mb-2">📋</div>
          <h2 className="font-semibold text-gray-900 mb-1">7 Koolhydraatarme Basisregels</h2>
          <p className="text-sm text-gray-500">
            Lees ze in 90 seconden en weet wat je morgen anders kunt doen.
          </p>
        </Link>
        <Link
          href="/uitleg"
          className="bg-white rounded-2xl border border-[#e8e0d8] p-6 hover:border-[#e07a5f] hover:shadow-md transition-all"
        >
          <div className="text-2xl mb-2">🔬</div>
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
