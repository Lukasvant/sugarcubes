'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Fuse from 'fuse.js';
import Link from 'next/link';
import { Search } from 'lucide-react';
import type { Product } from '@/lib/types';
import { suikerklontjes } from '@/lib/types';

interface SearchBarProps {
  producten: Product[];
  onSelect?: (product: Product) => void;
  placeholder?: string;
}

export default function SearchBar({ producten, onSelect, placeholder = 'Zoek een product, bijv. "banaan" of "pasta"…' }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const fuse = useRef(
    new Fuse(producten, {
      keys: ['naam', 'categorie'],
      threshold: 0.35,
      minMatchCharLength: 1,
    })
  );

  useEffect(() => {
    fuse.current = new Fuse(producten, {
      keys: ['naam', 'categorie'],
      threshold: 0.35,
      minMatchCharLength: 1,
    });
  }, [producten]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setQuery(val);
      setActiveIdx(-1);
      if (val.trim().length === 0) {
        setResults([]);
        setOpen(false);
        return;
      }
      const hits = fuse.current.search(val).slice(0, 6).map((r) => r.item);
      setResults(hits);
      setOpen(hits.length > 0);
    },
    []
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, -1));
    } else if (e.key === 'Escape') {
      setOpen(false);
    } else if (e.key === 'Enter' && activeIdx >= 0) {
      const product = results[activeIdx];
      if (onSelect) {
        onSelect(product);
        setQuery('');
        setOpen(false);
      }
    }
  };

  const handleSelect = (product: Product) => {
    if (onSelect) {
      onSelect(product);
      setQuery('');
      setOpen(false);
    }
  };

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
          onFocus={() => results.length > 0 && setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder={placeholder}
          autoComplete="off"
          className="w-full pl-12 pr-4 py-4 text-base rounded-2xl border-2 border-[#e8e0d8] bg-white shadow-sm focus:outline-none focus:border-[#e07a5f] transition-colors placeholder:text-gray-400"
        />
      </div>

      {open && (
        <ul
          ref={listRef}
          className="absolute z-50 w-full mt-2 bg-white rounded-2xl shadow-xl border border-[#e8e0d8] overflow-hidden"
          role="listbox"
        >
          {results.map((product, idx) => {
            const klontjes = suikerklontjes(product);
            return (
              <li key={product.id} role="option" aria-selected={idx === activeIdx}>
                {onSelect ? (
                  <button
                    onMouseDown={() => handleSelect(product)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-[#fdf5f0] ${idx === activeIdx ? 'bg-[#fdf5f0]' : ''}`}
                  >
                    <span className="text-2xl">{product.emoji}</span>
                    <span className="flex-1 font-medium text-gray-900">{product.naam}</span>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <span className="text-base">🍬</span>
                      {klontjes} {klontjes === 1 ? 'klontje' : 'klontjes'}
                    </span>
                  </button>
                ) : (
                  <Link
                    href={`/product/${product.id}`}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-[#fdf5f0] ${idx === activeIdx ? 'bg-[#fdf5f0]' : ''}`}
                  >
                    <span className="text-2xl">{product.emoji}</span>
                    <span className="flex-1 font-medium text-gray-900">{product.naam}</span>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <span className="text-base">🍬</span>
                      {klontjes} {klontjes === 1 ? 'klontje' : 'klontjes'}
                    </span>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
