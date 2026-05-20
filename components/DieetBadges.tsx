import { isKeto, isLowCarb } from '@/lib/types';

interface DieetBadgesProps {
  koolhydratenPerPortie: number;
  size?: 'sm' | 'md';
}

export default function DieetBadges({ koolhydratenPerPortie, size = 'md' }: DieetBadgesProps) {
  const keto = isKeto(koolhydratenPerPortie);
  const lowCarb = isLowCarb(koolhydratenPerPortie);

  if (!keto && !lowCarb) return null;

  const base = size === 'sm'
    ? 'inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold'
    : 'inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm font-semibold';

  return (
    <div className="flex flex-wrap gap-2">
      {keto && (
        <span className={`${base} bg-emerald-700 text-white`}>
          ✓ Keto
        </span>
      )}
      {lowCarb && !keto && (
        <span className={`${base} bg-emerald-100 text-emerald-800 border border-emerald-200`}>
          ✓ Low carb
        </span>
      )}
      {keto && (
        <span className={`${base} bg-emerald-100 text-emerald-800 border border-emerald-200`}>
          ✓ Low carb
        </span>
      )}
    </div>
  );
}
