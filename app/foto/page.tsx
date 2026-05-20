'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Camera, Upload, ArrowLeft, Loader2, RefreshCw } from 'lucide-react';
import Fuse from 'fuse.js';
import { getAlleProducten } from '@/lib/data';
import { suikerklontjes } from '@/lib/types';
import type { Product } from '@/lib/types';
import SuikerklontjesToren from '@/components/SuikerklontjesToren';
import ProductIcon from '@/components/ProductIcon';

const producten = getAlleProducten();
const fuse = new Fuse(producten, { keys: ['naam'], threshold: 0.4, minMatchCharLength: 2 });

function matchProduct(naam: string): Product | null {
  const results = fuse.search(naam);
  return results.length > 0 ? results[0].item : null;
}

type HerkendProduct = {
  naam: string;
  match: Product | null;
};

export default function FotoPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<HerkendProduct[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);

  const compressAndSend = useCallback(async (file: File) => {
    setLoading(true);
    setError(null);
    setResults(null);

    const url = URL.createObjectURL(file);
    setPreview(url);

    try {
      const img = new Image();
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = url;
      });

      const MAX_SIZE = 1024;
      const scale = Math.min(1, MAX_SIZE / Math.max(img.width, img.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height);

      const blob = await new Promise<Blob>((resolve) =>
        canvas.toBlob((b) => resolve(b!), 'image/jpeg', 0.82)
      );

      const formData = new FormData();
      formData.append('image', blob, 'foto.jpg');

      const res = await fetch('/api/herken-foto', { method: 'POST', body: formData });
      const data: { producten?: string[]; error?: string } = await res.json();
      if (!res.ok) throw new Error(data.error || 'Herkenning mislukt');
      const herkend: HerkendProduct[] = (data.producten ?? []).map((naam) => ({
        naam,
        match: matchProduct(naam),
      }));
      setResults(herkend);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Er ging iets mis bij de herkenning. Probeer opnieuw.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) compressAndSend(file);
  };

  const reset = () => {
    setPreview(null);
    setResults(null);
    setError(null);
    if (fileRef.current) fileRef.current.value = '';
    if (cameraRef.current) cameraRef.current.value = '';
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Terug
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-2">Foto herkenning</h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm">
          Maak een foto van één of meerdere producten en AI herkent ze voor je.
        </p>
      </div>

      {/* Upload area */}
      {!preview && (
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => cameraRef.current?.click()}
            className="flex flex-col items-center gap-3 bg-white dark:bg-neutral-900 border border-dashed border-neutral-300 dark:border-neutral-700 rounded-xl p-8 hover:border-neutral-900 dark:hover:border-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
          >
            <Camera className="w-8 h-8 text-neutral-400 dark:text-neutral-500" />
            <span className="font-medium text-neutral-700 dark:text-neutral-300 text-sm">Camera</span>
            <input
              ref={cameraRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handleFileChange}
            />
          </button>

          <button
            onClick={() => fileRef.current?.click()}
            className="flex flex-col items-center gap-3 bg-white dark:bg-neutral-900 border border-dashed border-neutral-300 dark:border-neutral-700 rounded-xl p-8 hover:border-neutral-900 dark:hover:border-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
          >
            <Upload className="w-8 h-8 text-neutral-400 dark:text-neutral-500" />
            <span className="font-medium text-neutral-700 dark:text-neutral-300 text-sm">Uploaden</span>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </button>
        </div>
      )}

      {/* Preview */}
      {preview && (
        <div className="relative mb-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt="Geüploade foto"
            className="w-full rounded-xl object-contain max-h-72 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800"
          />
          {!loading && (
            <button
              onClick={reset}
              className="absolute top-3 right-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm text-neutral-700 dark:text-neutral-300 rounded-full px-3 py-1.5 text-sm font-medium flex items-center gap-1.5 shadow hover:bg-white dark:hover:bg-black transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Nieuwe foto
            </button>
          )}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center gap-3 py-10 text-neutral-500 dark:text-neutral-400">
          <Loader2 className="w-8 h-8 animate-spin" />
          <p className="text-sm">AI herkent producten…</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-4 text-sm mb-6">
          {error}
        </div>
      )}

      {/* Results */}
      {results && !loading && (
        <div>
          <h2 className="font-semibold text-sm text-neutral-900 dark:text-neutral-100 mb-4">
            {results.length === 0
              ? 'Geen producten herkend'
              : `${results.length} product${results.length === 1 ? '' : 'en'} herkend`}
          </h2>

          {results.length === 0 && (
            <p className="text-neutral-400 dark:text-neutral-500 text-sm mb-6">
              Probeer een duidelijkere foto met goed zichtbare verpakkingen of voedingsmiddelen.
            </p>
          )}

          <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
            {results.map((item, idx) => {
              if (item.match) {
                const klontjes = suikerklontjes(item.match);
                const labelKleur =
                  klontjes <= 2
                    ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                    : klontjes <= 6
                    ? 'text-yellow-700 bg-yellow-50 border-yellow-200'
                    : 'text-red-700 bg-red-50 border-red-200';

                return (
                  <Link
                    key={idx}
                    href={`/product/${item.match.id}`}
                    className={`bg-white dark:bg-neutral-900 p-4 flex items-center gap-4 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors ${idx < results.length - 1 ? 'border-b border-neutral-200 dark:border-neutral-800' : ''}`}
                  >
                    <ProductIcon categorie={item.match.categorie} size="md" />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-neutral-900 dark:text-neutral-100 tracking-tight">{item.match.naam}</div>
                      <div className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">Herkend als: {item.naam}</div>
                      <div className={`inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${labelKleur}`}>
                        {klontjes} suikerklontje{klontjes === 1 ? '' : 's'}
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <SuikerklontjesToren klontjes={Math.min(klontjes, 12)} small />
                    </div>
                  </Link>
                );
              }

              return (
                <div
                  key={idx}
                  className={`bg-white dark:bg-neutral-900 p-4 flex items-center gap-4 opacity-60 ${idx < results.length - 1 ? 'border-b border-neutral-200 dark:border-neutral-800' : ''}`}
                >
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">{item.naam}</div>
                    <div className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">Niet gevonden in database</div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={reset}
            className="mt-6 w-full flex items-center justify-center gap-2 bg-neutral-900 dark:bg-white text-white dark:text-black font-semibold py-3 rounded-full text-sm transition-colors"
          >
            <Camera className="w-5 h-5" />
            Nieuwe foto maken
          </button>
        </div>
      )}
    </div>
  );
}
