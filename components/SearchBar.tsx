'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Fuse from 'fuse.js';
import Link from 'next/link';
import { Search, Loader2, Globe } from 'lucide-react';
import type { Product } from '@/lib/types';
import { suikerklontjes } from '@/lib/types';
import type { OFFSearchResult } from '@/lib/openfoodfacts';
import ProductIcon, { OFFIcon } from '@/components/ProductIcon';

interface SearchBarProps {
  producten: Product[];
  onSelect?: (product: Product) => void;
  placeholder?: string;
}

export default function SearchBar({ producten, onSelect, placeholder = 'Zoek een product, bijv. "banaan" of "pasta"…' }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [localResults, setLocalResults] = useState<Product[]>([]);
  const [offResults, setOffResults] = useState<OFFSearchResult[]>([]);
  const [offLoading, setOffLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const offDebounce = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const fuse = useRef(
    new Fuse(producten, { keys: ['naam', 'categorie'], threshold: 0.35, minMatchCharLength: 1 })
  );

  useEffect(() => {
    fuse.current = new Fuse(producten, { keys: ['naam', 'categorie'], threshold: 0.35, minMatchCharLength: 1 });
  }, [producten]);

  const allItems = [...localResults.map(p => ({ type: 'local' as const, item: p })),
                   ...offResults.map(p => ({ type: 'off' as const, item: p }))];

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setActiveIdx(-1);

    if (val.trim().length === 0) {
      setLocalResults([]);
      setOffResults([]);
      setOpen(false);
      return;
    }

    const hits = fuse.current.search(val).slice(0, 6).map(r => r.item);
    setLocalResults(hits);
    setOpen(true);

    // Fetch OFF only when local results are sparse
    if (offDebounce.current) clearTimeout(offDebounce.current);
    if (val.trim().length >= 3) {
      offDebounce.current = setTimeout(async () => {
        setOffLoading(true);
        try {
          const res = await fetch(`/api/search-off?q=${encodeURIComponent(val)}`);
          if (res.ok) {
            const data: OFFSearchResult[] = await res.json();
            // Filter out duplicates with local results
            const localNames = new Set(hits.map(p => p.naam.toLowerCase()));
            const filtered = data.filter(p => !localNames.has(p.naam.toLowerCase()));
            setOffResults(filtered.slice(0, 4));
          }
        } catch { /* ignore */ }
        setOffLoading(false);
      }, 500);
    } else {
      setOffResults([]);
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx(i => Math.min(i + 1, allItems.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, -1)); }
    else if (e.key === 'Escape') setOpen(false);
    else if (e.key === 'Enter' && activeIdx >= 0) {
      const entry = allItems[activeIdx];
      if (entry.type === 'local' && onSelect) {
        onSelect(entry.item as Product);
        setQuery(''); setOpen(false);
      }
    }
  };

  const handleSelectLocal = (product: Product) => {
    if (onSelect) { onSelect(product); setQuery(''); setOpen(false); }
  };

  const hasResults = localResults.length > 0 || offResults.length > 0 || offLoading;

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => hasResults && setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder={placeholder}
          autoComplete="off"
          className="w-full pl-12 pr-4 py-4 text-base rounded-2xl border-2 border-[#e2e8f0] bg-white shadow-sm focus:outline-none focus:border-[#0d9488] transition-colors placeholder:text-gray-400"
        />
      </div>

      {open && hasResults && (
        <ul className="absolute z-50 w-full mt-2 bg-white rounded-2xl shadow-xl border border-[#e2e8f0] overflow-hidden">
          {localResults.map((product, idx) => {
            const klontjes = suikerklontjes(product);
            return (
              <li key={product.id} role="option" aria-selected={idx === activeIdx}>
                {onSelect ? (
                  <button onMouseDown={() => handleSelectLocal(product)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[#f1f5f9] transition-colors ${idx === activeIdx ? 'bg-[#f1f5f9]' : ''}`}>
                    <ProductIcon categorie={product.categorie} size="sm" />
                    <span className="flex-1 font-medium text-gray-900">{product.naam}</span>
                    <span className="text-sm text-gray-500 tabular-nums">{klontjes} {klontjes === 1 ? 'klontje' : 'klontjes'}</span>
                  </button>
                ) : (
                  <Link href={`/product/${product.id}`}
                    className={`flex items-center gap-3 px-4 py-3 hover:bg-[#f1f5f9] transition-colors ${idx === activeIdx ? 'bg-[#f1f5f9]' : ''}`}>
                    <ProductIcon categorie={product.categorie} size="sm" />
                    <span className="flex-1 font-medium text-gray-900">{product.naam}</span>
                    <span className="text-sm text-gray-500 tabular-nums">{klontjes} {klontjes === 1 ? 'klontje' : 'klontjes'}</span>
                  </Link>
                )}
              </li>
            );
          })}

          {/* OFF results */}
          {(offResults.length > 0 || offLoading) && (
            <>
              <li className="px-4 py-2 bg-gray-50 border-t border-[#e2e8f0]">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                  {offLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Globe className="w-3 h-3" />}
                  {offLoading ? 'Zoeken in Open Food Facts…' : 'Open Food Facts'}
                </span>
              </li>
              {offResults.map((product, idx) => {
                const klontjes = Math.round(product.koolhydratenPerPortie / 4);
                const globalIdx = localResults.length + 1 + idx;
                return (
                  <li key={product.barcode} role="option" aria-selected={globalIdx === activeIdx}>
                    <Link href={`/product/off/${product.barcode}`}
                      className={`flex items-center gap-3 px-4 py-3 hover:bg-[#f1f5f9] transition-colors ${globalIdx === activeIdx ? 'bg-[#f1f5f9]' : ''}`}>
                      {product.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={product.imageUrl} alt={product.naam} className="w-9 h-9 rounded-xl object-contain bg-gray-50 border border-[#e2e8f0] flex-shrink-0" />
                      ) : (
                        <OFFIcon size="sm" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 truncate">{product.naam}</div>
                        {product.merk && <div className="text-xs text-gray-400 truncate">{product.merk}</div>}
                      </div>
                      <span className="text-sm text-gray-500 tabular-nums flex-shrink-0">
                        {klontjes} {klontjes === 1 ? 'klontje' : 'klontjes'}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </>
          )}
        </ul>
      )}
    </div>
  );
}
