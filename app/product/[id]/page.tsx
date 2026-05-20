'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ChevronDown, ChevronUp, PlusCircle, CheckCircle } from 'lucide-react';
import { getProductById, getAlleProducten } from '@/lib/data';
import { suikerklontjes, koolhydraatLabel } from '@/lib/types';
import SuikerklontjesToren from '@/components/SuikerklontjesToren';
import GIBadge from '@/components/GIBadge';
import GLBadge from '@/components/GLBadge';
import CompareBar, { useCompare } from '@/components/CompareBar';
import ProductIcon from '@/components/ProductIcon';

const alleProducten = getAlleProducten();

export default function ProductPagina({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = getProductById(id);
  const [uitlegOpen, setUitlegOpen] = useState(false);
  const { ids, toggle, clear } = useCompare();

  if (!product) return notFound();

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
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Terug naar zoeken
      </Link>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <ProductIcon categorie={product.categorie} size="lg" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">{product.naam}</h1>
        <p className="text-gray-500 mt-1">{product.portieBeschrijving}</p>
      </div>

      {/* Klontjes count — hero number */}
      <div className="text-center mb-2">
        <span className="text-8xl font-black text-gray-900 leading-none tabular-nums">{klontjes}</span>
        <span className="block text-lg text-gray-500 mt-1">
          suikerklontjes per portie
        </span>
      </div>

      {/* Label */}
      <div className="flex justify-center mb-8">
        <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold border ${labelKleur}`}>
          {label}
        </span>
      </div>

      {/* Sugar cube tower */}
      <div className="bg-white rounded-3xl border border-[#e2e8f0] p-8 mb-6 flex flex-col items-center">
        <SuikerklontjesToren klontjes={klontjes} />
        <p className="text-xs text-gray-400 mt-4">1 klontje = 4g koolhydraten</p>
      </div>

      {/* Stats */}
      <div className="bg-white rounded-3xl border border-[#e2e8f0] divide-y divide-[#e2e8f0] mb-6">
        <div className="px-6 py-4 flex justify-between items-center">
          <span className="text-gray-600">Koolhydraten per portie</span>
          <span className="font-semibold text-gray-900">{product.koolhydratenPerPortie}g</span>
        </div>
        <div className="px-6 py-4 flex justify-between items-center">
          <span className="text-gray-600">Portiegrootte</span>
          <span className="font-semibold text-gray-900">{product.portieGram}g</span>
        </div>
        <div className="px-6 py-4 flex justify-between items-center">
          <span className="text-gray-600">Portie</span>
          <span className="font-medium text-gray-700 text-right max-w-[60%]">{product.portieBeschrijving}</span>
        </div>
        {product.glycemischeIndex !== null && (
          <div className="px-6 py-4 flex justify-between items-center flex-wrap gap-2">
            <span className="text-gray-600">Glycemische index</span>
            <GIBadge gi={product.glycemischeIndex} />
          </div>
        )}
        {product.glycemischeLading !== null && (
          <div className="px-6 py-4 flex justify-between items-center flex-wrap gap-2">
            <span className="text-gray-600">Glycemische lading</span>
            <GLBadge gl={product.glycemischeLading} />
          </div>
        )}
        {product.glycemischeIndex === null && (
          <div className="px-6 py-4 text-sm text-gray-400">
            Geen GI/GL beschikbaar — dit product bevat nauwelijks koolhydraten.
          </div>
        )}
      </div>

      {/* Compare button */}
      <button
        onClick={() => toggle(product.id)}
        className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-medium transition-colors mb-6 ${
          inVergelijk
            ? 'bg-[#0d9488] text-white hover:bg-[#0f766e]'
            : 'bg-white border-2 border-[#0d9488] text-[#0d9488] hover:bg-[#f1f5f9]'
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

      {/* Uitleg inklapbaar */}
      <div className="bg-white rounded-3xl border border-[#e2e8f0] overflow-hidden">
        <button
          onClick={() => setUitlegOpen((v) => !v)}
          className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#f1f5f9] transition-colors"
        >
          <span className="font-semibold text-gray-900">Wat betekent dit?</span>
          {uitlegOpen ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </button>
        {uitlegOpen && (
          <div className="px-6 pb-6 space-y-4 text-sm text-gray-600 leading-relaxed">
            <div>
              <p className="font-semibold text-gray-800 mb-1">Suikerklontjes</p>
              <p>
                Eén standaard suikerklontje weegt ~4g. Voor je lichaam doet 4g zetmeel (uit brood, rijst of pasta)
                ruwweg hetzelfde als 4g suiker: het wordt omgezet in glucose. Suikerklontjes maken dat zichtbaar.
              </p>
            </div>
            {product.glycemischeIndex !== null && (
              <div>
                <p className="font-semibold text-gray-800 mb-1">Glycemische index (GI)</p>
                <p>
                  De GI zegt hoe snel dit product je bloedsuiker laat stijgen. Pure glucose heeft GI 100.
                  Hoe lager, hoe langzamer — en langzamer is beter: minder pieken, minder honger.
                </p>
              </div>
            )}
            {product.glycemischeLading !== null && (
              <div>
                <p className="font-semibold text-gray-800 mb-1">Glycemische lading (GL)</p>
                <p>
                  De GL houdt ook rekening met hoeveel koolhydraten er per portie in zitten. Watermeloen heeft
                  een hoge GI maar weinig koolhydraten per stuk, dus lage GL. GL is eerlijker dan GI alleen.
                </p>
              </div>
            )}
            <Link href="/uitleg" className="text-[#0d9488] hover:underline font-medium">
              Lees de volledige uitleg →
            </Link>
          </div>
        )}
      </div>

      <CompareBar producten={alleProducten} ids={ids} onRemove={toggle} onClear={clear} />
    </div>
  );
}
