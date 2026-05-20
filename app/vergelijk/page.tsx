'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';
import { getAlleProducten } from '@/lib/data';
import { suikerklontjes } from '@/lib/types';
import type { Product } from '@/lib/types';
import SuikerklontjesToren from '@/components/SuikerklontjesToren';
import GIBadge from '@/components/GIBadge';
import GLBadge from '@/components/GLBadge';
import SearchBar from '@/components/SearchBar';

const alleProducten = getAlleProducten();

function VergelijkInhoud() {
  const searchParams = useSearchParams();
  const idsParam = searchParams.get('ids') ?? '';
  const [selected, setSelected] = useState<Product[]>(() => {
    const ids = idsParam ? idsParam.split(',') : [];
    return ids
      .map((id) => alleProducten.find((p) => p.id === id))
      .filter(Boolean) as Product[];
  });

  const [zoekOpen, setZoekOpen] = useState(false);

  const addProduct = (product: Product) => {
    if (selected.length >= 3) return;
    if (selected.find((p) => p.id === product.id)) return;
    setSelected((prev) => [...prev, product]);
    setZoekOpen(false);
  };

  const removeProduct = (id: string) => {
    setSelected((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Terug naar zoeken
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">Vergelijken</h1>
      <p className="text-gray-500 mb-8">Zet 2–3 producten naast elkaar en zie het verschil.</p>

      {/* Add product */}
      {selected.length < 3 && (
        <div className="mb-8">
          {zoekOpen ? (
            <div>
              <SearchBar
                producten={alleProducten.filter((p) => !selected.find((s) => s.id === p.id))}
                onSelect={addProduct}
                placeholder="Zoek een product om toe te voegen…"
              />
              <button
                onClick={() => setZoekOpen(false)}
                className="mt-2 text-sm text-gray-400 hover:text-gray-600"
              >
                Annuleer
              </button>
            </div>
          ) : (
            <button
              onClick={() => setZoekOpen(true)}
              className="flex items-center gap-2 bg-white border-2 border-dashed border-[#e2e8f0] rounded-2xl px-5 py-3 text-sm font-medium text-gray-500 hover:border-[#0d9488] hover:text-[#0d9488] transition-colors"
            >
              <Search className="w-4 h-4" />
              Voeg product toe{selected.length === 0 ? '' : ` (${3 - selected.length} nog mogelijk)`}
            </button>
          )}
        </div>
      )}

      {selected.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-lg">Voeg producten toe om te vergelijken.</p>
          <p className="text-sm mt-2">Tip: ga naar een productpagina en klik "Voeg toe aan vergelijking"</p>
        </div>
      )}

      {/* Comparison grid */}
      {selected.length > 0 && (
        <div className={`grid gap-4 ${selected.length === 1 ? 'grid-cols-1 max-w-xs' : selected.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
          {selected.map((product) => {
            const klontjes = suikerklontjes(product);
            return (
              <div key={product.id} className="bg-white rounded-3xl border border-[#e2e8f0] overflow-hidden">
                <div className="p-5 border-b border-[#e2e8f0] relative">
                  <button
                    onClick={() => removeProduct(product.id)}
                    className="absolute top-3 right-3 text-gray-300 hover:text-red-400 transition-colors text-lg leading-none"
                    aria-label={`Verwijder ${product.naam}`}
                  >
                    ×
                  </button>
                  <div className="text-4xl mb-2 text-center">{product.emoji}</div>
                  <h2 className="font-semibold text-gray-900 text-center text-sm">{product.naam}</h2>
                  <p className="text-xs text-gray-400 text-center mt-0.5">{product.portieBeschrijving}</p>
                </div>

                {/* Klontjes count */}
                <div className="py-4 text-center border-b border-[#e2e8f0]">
                  <span className="text-5xl font-black text-gray-900">{klontjes}</span>
                  <span className="block text-xs text-gray-400 mt-1">klontjes</span>
                </div>

                {/* Mini tower */}
                <div className="py-4 px-3 flex justify-center border-b border-[#e2e8f0]">
                  <SuikerklontjesToren klontjes={klontjes} />
                </div>

                {/* Stats */}
                <div className="p-4 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Koolhydraten</span>
                    <span className="font-medium">{product.koolhydratenPerPortie}g</span>
                  </div>
                  {product.glycemischeIndex !== null && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">GI</span>
                      <GIBadge gi={product.glycemischeIndex} />
                    </div>
                  )}
                  {product.glycemischeLading !== null && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">GL</span>
                      <GLBadge gl={product.glycemischeLading} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Winner callout */}
      {selected.length >= 2 && (() => {
        const sorted = [...selected].sort((a, b) => suikerklontjes(a) - suikerklontjes(b));
        const winnaar = sorted[0];
        const verliezer = sorted[sorted.length - 1];
        const diff = suikerklontjes(verliezer) - suikerklontjes(winnaar);
        if (diff === 0) return null;
        return (
          <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-sm text-emerald-800">
            <strong>{winnaar.naam}</strong> heeft {diff} suikerklontje{diff !== 1 ? 's' : ''} minder dan{' '}
            <strong>{verliezer.naam}</strong> per portie.
          </div>
        );
      })()}
    </div>
  );
}

export default function VergelijkPagina() {
  return (
    <Suspense>
      <VergelijkInhoud />
    </Suspense>
  );
}
