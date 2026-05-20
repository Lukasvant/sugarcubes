import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { lookupBarcode } from '@/lib/openfoodfacts';
import SuikerklontjesToren from '@/components/SuikerklontjesToren';
import { OFFIcon } from '@/components/ProductIcon';
import DieetBadges from '@/components/DieetBadges';

export default async function OFFProductPage({ params }: { params: Promise<{ barcode: string }> }) {
  const { barcode } = await params;
  const product = await lookupBarcode(barcode);

  if (!product) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-2">Product niet gevonden</h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">
          Barcode <span className="font-mono">{barcode}</span> staat niet in Open Food Facts.
        </p>
        <p className="text-xs text-neutral-400 dark:text-neutral-500 mb-6">
          Je kunt het zelf toevoegen op{' '}
          <a href="https://world.openfoodfacts.org" className="underline" target="_blank" rel="noopener noreferrer">
            openfoodfacts.org
          </a>
        </p>
        <Link href="/scan" className="inline-block border border-neutral-900 dark:border-neutral-100 text-neutral-900 dark:text-neutral-100 font-semibold px-6 py-2.5 rounded-full hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
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
        className="inline-flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors mb-8"
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
            className="w-28 h-28 object-contain mx-auto mb-4 rounded-xl border border-neutral-200 dark:border-neutral-800"
          />
        ) : (
          <div className="flex justify-center mb-4">
            <OFFIcon size="lg" />
          </div>
        )}
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">{product.naam}</h1>
        {product.merk && <p className="text-neutral-400 dark:text-neutral-500 text-sm mt-0.5">{product.merk}</p>}
        <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-1">Per portie ({product.portieGram}g)</p>
      </div>

      {/* Hero number */}
      <div className="text-center mb-2">
        <span className="text-8xl font-black text-neutral-900 dark:text-neutral-100 leading-none tabular-nums">{klontjes}</span>
        <span className="block text-lg text-neutral-500 dark:text-neutral-400 mt-1">suikerklontjes per portie</span>
      </div>

      <div className="flex flex-col items-center gap-3 mb-8">
        <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold border ${labelKleur}`}>
          {label}
        </span>
        <DieetBadges koolhydratenPerPortie={product.koolhydratenPerPortie} alwaysShow />
      </div>

      {/* Tower */}
      <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-8 mb-6 flex flex-col items-center">
        <SuikerklontjesToren klontjes={klontjes} />
        <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-4">1 klontje = 4g koolhydraten</p>
      </div>

      {/* Stats */}
      <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-800 mb-6">
        <div className="px-6 py-4 flex justify-between">
          <span className="text-sm text-neutral-600 dark:text-neutral-400">Koolhydraten per portie</span>
          <span className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">{product.koolhydratenPerPortie}g</span>
        </div>
        <div className="px-6 py-4 flex justify-between">
          <span className="text-sm text-neutral-600 dark:text-neutral-400">Koolhydraten per 100g</span>
          <span className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">{product.koolhydratenPer100g}g</span>
        </div>
        <div className="px-6 py-4 flex justify-between">
          <span className="text-sm text-neutral-600 dark:text-neutral-400">Portiegrootte</span>
          <span className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">{product.portieGram}g</span>
        </div>
        <div className="px-6 py-4 text-sm text-neutral-400 dark:text-neutral-500">
          GI en GL niet beschikbaar via Open Food Facts.
        </div>
      </div>

      {/* OFF badge */}
      <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 text-sm text-neutral-500 dark:text-neutral-400 flex items-center gap-3">
        <div>
          <p className="font-medium text-neutral-700 dark:text-neutral-300">Bron: Open Food Facts</p>
          <p className="text-xs mt-0.5">Barcode {barcode} · Gegevens van productetiket</p>
        </div>
      </div>
    </div>
  );
}
