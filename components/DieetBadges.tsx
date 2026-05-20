import { isKeto, isLowCarb } from '@/lib/types';

interface DieetBadgesProps {
  koolhydratenPerPortie: number;
  size?: 'sm' | 'md';
  alwaysShow?: boolean;
}

export default function DieetBadges({ koolhydratenPerPortie, size = 'md', alwaysShow = false }: DieetBadgesProps) {
  const keto = isKeto(koolhydratenPerPortie);
  const lowCarb = isLowCarb(koolhydratenPerPortie);

  if (!keto && !lowCarb && !alwaysShow) return null;

  const base = size === 'sm'
    ? 'inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold'
    : 'inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm font-semibold';

  return (
    <div className="flex flex-wrap gap-2">
      <span className={`${base} ${keto ? 'bg-emerald-700 text-white' : 'bg-gray-100 text-gray-400 line-through'}`}>
        {keto ? '✓' : '✗'} Keto
      </span>
      <span className={`${base} ${lowCarb ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-gray-100 text-gray-400 line-through'}`}>
        {lowCarb ? '✓' : '✗'} Low carb
      </span>
    </div>
  );
}
