import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { lookupBarcode } from '@/lib/openfoodfacts';
import SuikerklontjesToren from '@/components/SuikerklontjesToren';

export default async function OFFProductPage({ params }: { params: Promise<{ barcode: string }> }) {
  const { barcode } = await params;
  const product = await lookupBarcode(barcode);

  if (!product) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">🤷</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Product niet gevonden</h1>
        <p className="text-gray-500 mb-2">
          Barcode <span className="font-mono">{barcode}</span> staat niet in Open Food Facts.
        </p>
        <p className="text-sm text-gray-400 mb-6">
          Je kunt het zelf toevoegen op{' '}
          <a href="https://world.openfoodfacts.org" className="text-[#e07a5f] underline" target="_blank" rel="noopener noreferrer">
            openfoodfacts.org
          </a>
        </p>
        <Link href="/scan" className="inline-block bg-[#e07a5f] text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-[#c9694f] transition-colors">
          Probeer opnieuw
        </Link>
      </div>
    );
  }

  const klontjes = Math.round(product.koolhydratenPerPortie / 4);

  const label =
    klontjes <= 2
      ? 'Koolhydraatarm vriendelijk'
      : klontjes <= 6
      ? 'Met mate eten'
      : 'Dit zit vol koolhydraten';

  const labelKleur =
    klontjes <= 2
      ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
      : klontjes <= 6
      ? 'text-yellow-700 bg-yellow-50 border-yellow-200'
      : 'text-red-700 bg-red-50 border-red-200';

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link
        href="/scan"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Terug naar scanner
      </Link>

      {/* Header */}
      <div className="text-center mb-8">
        {product.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.imageUrl}
            alt={product.naam}
            className="w-28 h-28 object-contain mx-auto mb-4 rounded-2xl"
          />
        ) : (
          <div className="text-7xl mb-4">🛒</div>
        )}
        <h1 className="text-2xl font-bold text-gray-900">{product.naam}</h1>
        {product.merk && <p className="text-gray-400 text-sm mt-0.5">{product.merk}</p>}
        <p className="text-gray-500 mt-1">Per portie ({product.portieGram}g)</p>
      </div>

      {/* Hero number */}
      <div className="text-center mb-2">
        <span className="text-8xl font-black text-gray-900 leading-none tabular-nums">{klontjes}</span>
        <span className="block text-lg text-gray-500 mt-1">suikerklontjes per portie</span>
      </div>

      <div className="flex justify-center mb-8">
        <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold border ${labelKleur}`}>
          {label}
        </span>
      </div>

      {/* Tower */}
      <div className="bg-white rounded-3xl border border-[#e8e0d8] p-8 mb-6 flex flex-col items-center">
        <SuikerklontjesToren klontjes={klontjes} />
        <p className="text-xs text-gray-400 mt-4">1 klontje = 4g koolhydraten</p>
      </div>

      {/* Stats */}
      <div className="bg-white rounded-3xl border border-[#e8e0d8] divide-y divide-[#e8e0d8] mb-6">
        <div className="px-6 py-4 flex justify-between">
          <span className="text-gray-600">Koolhydraten per portie</span>
          <span className="font-semibold">{product.koolhydratenPerPortie}g</span>
        </div>
        <div className="px-6 py-4 flex justify-between">
          <span className="text-gray-600">Koolhydraten per 100g</span>
          <span className="font-semibold">{product.koolhydratenPer100g}g</span>
        </div>
        <div className="px-6 py-4 flex justify-between">
          <span className="text-gray-600">Portiegrootte</span>
          <span className="font-semibold">{product.portieGram}g</span>
        </div>
        <div className="px-6 py-4 text-sm text-gray-400">
          GI en GL niet beschikbaar via Open Food Facts.
        </div>
      </div>

      {/* OFF badge */}
      <div className="bg-gray-50 rounded-2xl border border-gray-200 p-4 text-sm text-gray-500 flex items-center gap-3">
        <span className="text-xl">🌍</span>
        <div>
          <p className="font-medium text-gray-700">Bron: Open Food Facts</p>
          <p>Barcode {barcode} · Gegevens van productetiket</p>
        </div>
      </div>
    </div>
  );
}
