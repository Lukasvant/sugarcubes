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
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Terug
        </Link>

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">📷</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Barcode scannen</h1>
          <p className="text-gray-500">
            Scan het EAN-streepjescode van elk supermarktproduct.
          </p>
        </div>

        <button
          onClick={() => setScanning(true)}
          className="w-full flex items-center justify-center gap-3 bg-[#0d9488] text-white font-semibold py-4 rounded-2xl hover:bg-[#0f766e] transition-colors text-lg mb-8"
        >
          <ScanBarcode className="w-6 h-6" />
          Camera openen
        </button>

        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#e2e8f0]" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-[#f8fafc] px-4 text-sm text-gray-400">of voer barcode handmatig in</span>
          </div>
        </div>

        <form onSubmit={handleManual} className="flex gap-2">
          <input
            type="number"
            value={manualCode}
            onChange={(e) => setManualCode(e.target.value)}
            placeholder="8710522005149"
            className="flex-1 px-4 py-3 rounded-xl border-2 border-[#e2e8f0] focus:outline-none focus:border-[#0d9488] transition-colors text-base"
            inputMode="numeric"
          />
          <button
            type="submit"
            disabled={manualCode.trim().length < 8}
            className="px-5 py-3 bg-gray-900 text-white rounded-xl font-medium disabled:opacity-40 hover:bg-gray-700 transition-colors"
          >
            Zoek
          </button>
        </form>

        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-800">
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
