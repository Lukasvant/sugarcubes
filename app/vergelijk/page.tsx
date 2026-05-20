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
import ProductIcon from '@/components/ProductIcon';
import DieetBadges from '@/components/DieetBadges';

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
        className="inline-flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Terug naar zoeken
      </Link>

      <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-2">Vergelijken</h1>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8">Zet 2–3 producten naast elkaar en zie het verschil.</p>

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
                className="mt-2 text-sm text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
              >
                Annuleer
              </button>
            </div>
          ) : (
            <button
              onClick={() => setZoekOpen(true)}
              className="flex items-center gap-2 bg-white dark:bg-neutral-900 border border-dashed border-neutral-300 dark:border-neutral-700 rounded-full px-5 py-3 text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:border-neutral-900 dark:hover:border-neutral-100 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              <Search className="w-4 h-4" />
              Voeg product toe{selected.length === 0 ? '' : ` (${3 - selected.length} nog mogelijk)`}
            </button>
          )}
        </div>
      )}

      {selected.length === 0 && (
        <div className="text-center py-20 text-neutral-400 dark:text-neutral-500">
          <Search className="w-10 h-10 mx-auto mb-4 text-neutral-300 dark:text-neutral-700" />
          <p className="text-sm">Voeg producten toe om te vergelijken.</p>
          <p className="text-xs mt-2">Tip: ga naar een productpagina en klik &ldquo;Voeg toe aan vergelijking&rdquo;</p>
        </div>
      )}

      {/* Comparison grid */}
      {selected.length > 0 && (
        <div className={`grid gap-4 ${selected.length === 1 ? 'grid-cols-1 max-w-xs' : selected.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
          {selected.map((product) => {
            const klontjes = suikerklontjes(product);
            return (
              <div key={product.id} className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                <div className="p-5 border-b border-neutral-200 dark:border-neutral-800 relative">
                  <button
                    onClick={() => removeProduct(product.id)}
                    className="absolute top-3 right-3 text-neutral-300 dark:text-neutral-700 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors text-lg leading-none"
                    aria-label={`Verwijder ${product.naam}`}
                  >
                    ×
                  </button>
                  <div className="flex justify-center mb-2">
                    <ProductIcon categorie={product.categorie} size="sm" />
                  </div>
                  <h2 className="font-semibold text-neutral-900 dark:text-neutral-100 text-center text-sm tracking-tight">{product.naam}</h2>
                  <p className="text-xs text-neutral-400 dark:text-neutral-500 text-center mt-0.5">{product.portieBeschrijving}</p>
                </div>

                {/* Klontjes count */}
                <div className="py-4 text-center border-b border-neutral-200 dark:border-neutral-800">
                  <span className="text-5xl font-black text-neutral-900 dark:text-neutral-100">{klontjes}</span>
                  <span className="block text-xs text-neutral-400 dark:text-neutral-500 mt-1">klontjes</span>
                </div>

                {/* Mini tower */}
                <div className="py-4 px-3 flex justify-center border-b border-neutral-200 dark:border-neutral-800">
                  <SuikerklontjesToren klontjes={klontjes} />
                </div>

                {/* Stats */}
                <div className="p-4 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-neutral-500 dark:text-neutral-400">Koolhydraten</span>
                    <span className="font-medium text-neutral-900 dark:text-neutral-100">{product.koolhydratenPerPortie}g</span>
                  </div>
                  {product.glycemischeIndex !== null && (
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-500 dark:text-neutral-400">GI</span>
                      <GIBadge gi={product.glycemischeIndex} />
                    </div>
                  )}
                  {product.glycemischeLading !== null && (
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-500 dark:text-neutral-400">GL</span>
                      <GLBadge gl={product.glycemischeLading} />
                    </div>
                  )}
                  <div className="pt-1">
                    <DieetBadges koolhydratenPerPortie={product.koolhydratenPerPortie} size="sm" />
                  </div>
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
          <div className="mt-6 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 text-sm text-neutral-700 dark:text-neutral-300">
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
