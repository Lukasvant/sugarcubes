'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ScanBarcode } from 'lucide-react';
import BarcodeScanner from '@/components/BarcodeScanner';

export default function ScanPage() {
  const router = useRouter();
  const [scanning, setScanning] = useState(false);
  const [manualCode, setManualCode] = useState('');

  const handleScan = (barcode: string) => {
    setScanning(false);
    router.push(`/product/off/${barcode}`);
  };

  const handleManual = (e: React.FormEvent) => {
    e.preventDefault();
    const code = manualCode.trim();
    if (code.length >= 8) router.push(`/product/off/${code}`);
  };

  return (
    <>
      {scanning && (
        <BarcodeScanner onScan={handleScan} onClose={() => setScanning(false)} />
      )}

      <div className="max-w-md mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Terug
        </Link>

        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-2">Barcode scannen</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Scan het EAN-streepjescode van elk supermarktproduct.
          </p>
        </div>

        <button
          onClick={() => setScanning(true)}
          className="w-full flex items-center justify-center gap-3 bg-neutral-900 dark:bg-white text-white dark:text-black font-semibold py-4 rounded-full transition-colors text-sm mb-8"
        >
          <ScanBarcode className="w-5 h-5" />
          Camera openen
        </button>

        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-200 dark:border-neutral-800" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white dark:bg-neutral-950 px-4 text-xs text-neutral-400 dark:text-neutral-500">of voer barcode handmatig in</span>
          </div>
        </div>

        <form onSubmit={handleManual} className="flex gap-2">
          <input
            type="number"
            value={manualCode}
            onChange={(e) => setManualCode(e.target.value)}
            placeholder="8710522005149"
            className="flex-1 px-4 py-3 rounded-full border border-neutral-300 dark:border-neutral-700 bg-transparent text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-100 transition-colors text-sm placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
            inputMode="numeric"
          />
          <button
            type="submit"
            disabled={manualCode.trim().length < 8}
            className="px-5 py-3 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-full font-medium text-sm disabled:opacity-40 transition-colors"
          >
            Zoek
          </button>
        </form>

        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
          <p className="font-semibold mb-1">Let op: GI en GL niet beschikbaar</p>
          <p>
            Open Food Facts bevat geen glycemische index-waarden. Je ziet wel het aantal
            suikerklontjes per portie op basis van de koolhydraten op het etiket.
          </p>
        </div>
      </div>
    </>
  );
}
