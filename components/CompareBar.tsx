'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { suikerklontjes } from '@/lib/types';
import { X, GitCompare } from 'lucide-react';

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
      <div className="bg-white rounded-2xl shadow-2xl border border-[#e8e0d8] p-3 flex items-center gap-2">
        <div className="flex-1 flex items-center gap-2 overflow-hidden">
          {selected.map((p) => (
            <div key={p.id} className="flex items-center gap-1 bg-[#fdf5f0] rounded-lg px-2 py-1 text-sm">
              <span>{p.emoji}</span>
              <span className="font-medium truncate max-w-[80px]">{p.naam}</span>
              <span className="text-gray-500">{suikerklontjes(p)}🍬</span>
              <button
                onClick={() => onRemove(p.id)}
                className="ml-0.5 text-gray-400 hover:text-red-500 transition-colors"
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
              className="flex items-center gap-1.5 bg-[#e07a5f] text-white text-sm font-medium px-3 py-1.5 rounded-xl hover:bg-[#c9694f] transition-colors"
            >
              <GitCompare className="w-4 h-4" />
              Vergelijk
            </Link>
          )}
          <button
            onClick={onClear}
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors px-1"
          >
            Wis alles
          </button>
        </div>
      </div>
    </div>
  );
}
