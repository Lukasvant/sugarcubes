'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ChevronDown, ChevronUp, PlusCircle, CheckCircle } from 'lucide-react';
import { getProductById, getAlleProducten } from '@/lib/data';
import { addToHistory } from '@/lib/history';
import { suikerklontjes, koolhydraatLabel } from '@/lib/types';
import SuikerklontjesToren from '@/components/SuikerklontjesToren';
import GIBadge from '@/components/GIBadge';
import GLBadge from '@/components/GLBadge';
import CompareBar, { useCompare } from '@/components/CompareBar';
import ProductIcon from '@/components/ProductIcon';
import DieetBadges from '@/components/DieetBadges';

const alleProducten = getAlleProducten();

export default function ProductPagina({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = getProductById(id);
  const [uitlegOpen, setUitlegOpen] = useState(false);
  const { ids, toggle, clear } = useCompare();

  if (!product) return notFound();

  addToHistory(id);

  const klontjes = suikerklontjes(product);
  const label = koolhydraatLabel(klontjes);
  const inVergelijk = ids.includes(product.id);

  const labelKleur =
    klontjes <= 2
      ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
      : klontjes <= 6
      ? 'text-yellow-700 bg-yellow-50 border-yellow-200'
      : 'text-red-700 bg-red-50 border-red-200';

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 pb-28">
      {/* Back */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Terug naar zoeken
      </Link>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <ProductIcon categorie={product.categorie} size="lg" />
        </div>
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">{product.naam}</h1>
        <p className="text-neutral-500 dark:text-neutral-400 mt-1 text-sm">{product.portieBeschrijving}</p>
      </div>

      {/* Klontjes count — hero number */}
      <div className="text-center mb-2">
        <span className="text-8xl font-black text-neutral-900 dark:text-neutral-100 leading-none tabular-nums">{klontjes}</span>
        <span className="block text-lg text-neutral-500 dark:text-neutral-400 mt-1">
          suikerklontjes per portie
        </span>
      </div>

      {/* Label + dieet badges */}
      <div className="flex flex-col items-center gap-3 mb-8">
        <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold border ${labelKleur}`}>
          {label}
        </span>
        <DieetBadges koolhydratenPerPortie={product.koolhydratenPerPortie} alwaysShow />
      </div>

      {/* Sugar cube tower */}
      <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-8 mb-6 flex flex-col items-center">
        <SuikerklontjesToren klontjes={klontjes} />
        <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-4">1 klontje = 4g koolhydraten</p>
      </div>

      {/* Stats */}
      <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-800 mb-6">
        <div className="px-6 py-4 flex justify-between items-center">
          <span className="text-sm text-neutral-600 dark:text-neutral-400">Koolhydraten per portie</span>
          <span className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">{product.koolhydratenPerPortie}g</span>
        </div>
        <div className="px-6 py-4 flex justify-between items-center">
          <span className="text-sm text-neutral-600 dark:text-neutral-400">Portiegrootte</span>
          <span className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">{product.portieGram}g</span>
        </div>
        <div className="px-6 py-4 flex justify-between items-center">
          <span className="text-sm text-neutral-600 dark:text-neutral-400">Portie</span>
          <span className="font-medium text-sm text-neutral-700 dark:text-neutral-300 text-right max-w-[60%]">{product.portieBeschrijving}</span>
        </div>
        {product.glycemischeIndex !== null && (
          <div className="px-6 py-4 flex justify-between items-center flex-wrap gap-2">
            <span className="text-sm text-neutral-600 dark:text-neutral-400">Glycemische index</span>
            <GIBadge gi={product.glycemischeIndex} />
          </div>
        )}
        {product.glycemischeLading !== null && (
          <div className="px-6 py-4 flex justify-between items-center flex-wrap gap-2">
            <span className="text-sm text-neutral-600 dark:text-neutral-400">Glycemische lading</span>
            <GLBadge gl={product.glycemischeLading} />
          </div>
        )}
        {product.glycemischeIndex === null && (
          <div className="px-6 py-4 text-sm text-neutral-400 dark:text-neutral-500">
            Geen GI/GL beschikbaar — dit product bevat nauwelijks koolhydraten.
          </div>
        )}
      </div>

      {/* Compare button */}
      <button
        onClick={() => toggle(product.id)}
        className={`w-full flex items-center justify-center gap-2 py-3 rounded-full font-medium text-sm transition-colors mb-6 ${
          inVergelijk
            ? 'bg-neutral-900 dark:bg-white text-white dark:text-black'
            : 'bg-white dark:bg-neutral-900 border border-neutral-900 dark:border-neutral-100 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800'
        }`}
      >
        {inVergelijk ? (
          <>
            <CheckCircle className="w-5 h-5" />
            Toegevoegd aan vergelijking
          </>
        ) : (
          <>
            <PlusCircle className="w-5 h-5" />
            Voeg toe aan vergelijking
          </>
        )}
      </button>

      {/* Share button */}
      <button
        onClick={() => {
          if (navigator.share) {
            navigator.share({ title: product.naam, text: `${product.naam} bevat ${klontjes} suikerklontjes per portie`, url: window.location.href });
          } else {
            navigator.clipboard.writeText(window.location.href);
          }
        }}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-medium border border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 hover:border-neutral-400 transition-colors mb-6"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        Deel dit product
      </button>

      {/* Uitleg inklapbaar */}
      <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
        <button
          onClick={() => setUitlegOpen((v) => !v)}
          className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
        >
          <span className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">Wat betekent dit?</span>
          {uitlegOpen ? (
            <ChevronUp className="w-5 h-5 text-neutral-400 dark:text-neutral-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-neutral-400 dark:text-neutral-500" />
          )}
        </button>
        {uitlegOpen && (
          <div className="px-6 pb-6 space-y-4 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            <div>
              <p className="font-semibold text-neutral-800 dark:text-neutral-200 mb-1">Suikerklontjes</p>
              <p>
                Eén standaard suikerklontje weegt ~4g. Voor je lichaam doet 4g zetmeel (uit brood, rijst of pasta)
                ruwweg hetzelfde als 4g suiker: het wordt omgezet in glucose. Suikerklontjes maken dat zichtbaar.
              </p>
            </div>
            {product.glycemischeIndex !== null && (
              <div>
                <p className="font-semibold text-neutral-800 dark:text-neutral-200 mb-1">Glycemische index (GI)</p>
                <p>
                  De GI zegt hoe snel dit product je bloedsuiker laat stijgen. Pure glucose heeft GI 100.
                  Hoe lager, hoe langzamer — en langzamer is beter: minder pieken, minder honger.
                </p>
              </div>
            )}
            {product.glycemischeLading !== null && (
              <div>
                <p className="font-semibold text-neutral-800 dark:text-neutral-200 mb-1">Glycemische lading (GL)</p>
                <p>
                  De GL houdt ook rekening met hoeveel koolhydraten er per portie in zitten. Watermeloen heeft
                  een hoge GI maar weinig koolhydraten per stuk, dus lage GL. GL is eerlijker dan GI alleen.
                </p>
              </div>
            )}
            <Link href="/uitleg" className="text-neutral-900 dark:text-neutral-100 hover:underline font-medium">
              Lees de volledige uitleg →
            </Link>
          </div>
        )}
      </div>

      <CompareBar producten={alleProducten} ids={ids} onRemove={toggle} onClear={clear} />
    </div>
  );
}
