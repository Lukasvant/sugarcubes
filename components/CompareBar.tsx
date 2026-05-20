'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { suikerklontjes } from '@/lib/types';
import { X, GitCompare } from 'lucide-react';
import ProductIcon from '@/components/ProductIcon';

export const COMPARE_KEY = 'vergelijk_ids';
export const MAX_COMPARE = 3;

export function useCompare() {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(COMPARE_KEY);
    if (stored) setIds(JSON.parse(stored));
  }, []);

  const toggle = (id: string) => {
    setIds((prev) => {
      let next: string[];
      if (prev.includes(id)) {
        next = prev.filter((x) => x !== id);
      } else if (prev.length < MAX_COMPARE) {
        next = [...prev, id];
      } else {
        next = prev;
      }
      localStorage.setItem(COMPARE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const clear = () => {
    setIds([]);
    localStorage.removeItem(COMPARE_KEY);
  };

  return { ids, toggle, clear };
}

interface CompareBarProps {
  producten: Product[];
  ids: string[];
  onRemove: (id: string) => void;
  onClear: () => void;
}

export default function CompareBar({ producten, ids, onRemove, onClear }: CompareBarProps) {
  if (ids.length === 0) return null;

  const selected = ids.map((id) => producten.find((p) => p.id === id)).filter(Boolean) as Product[];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-lg">
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 p-3 flex items-center gap-2">
        <div className="flex-1 flex items-center gap-2 overflow-hidden">
          {selected.map((p) => (
            <div key={p.id} className="flex items-center gap-1.5 bg-neutral-50 dark:bg-neutral-800 rounded-lg px-2 py-1 text-sm">
              <ProductIcon categorie={p.categorie} size="sm" className="w-5 h-5 rounded-md" />
              <span className="font-medium truncate max-w-[80px] text-neutral-900 dark:text-neutral-100">{p.naam}</span>
              <span className="text-neutral-500 dark:text-neutral-400 tabular-nums">{suikerklontjes(p)}</span>
              <button
                onClick={() => onRemove(p.id)}
                className="ml-0.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                aria-label={`Verwijder ${p.naam}`}
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {ids.length >= 2 && (
            <Link
              href={`/vergelijk?ids=${ids.join(',')}`}
              className="flex items-center gap-1.5 bg-neutral-900 dark:bg-white text-white dark:text-black text-sm font-medium px-3 py-1.5 rounded-full transition-colors"
            >
              <GitCompare className="w-4 h-4" />
              Vergelijk
            </Link>
          )}
          <button
            onClick={onClear}
            className="text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors px-1"
          >
            Wis alles
          </button>
        </div>
      </div>
    </div>
  );
}
