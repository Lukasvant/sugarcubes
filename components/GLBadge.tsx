import { glKlasse } from '@/lib/types';

const kleurMap = {
  laag: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  gemiddeld: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  hoog: 'bg-red-100 text-red-800 border-red-200',
};

const labelMap = {
  laag: 'Laag (≤10)',
  gemiddeld: 'Gemiddeld (11–19)',
  hoog: 'Hoog (≥20)',
};

export default function GLBadge({ gl }: { gl: number }) {
  const klasse = glKlasse(gl);
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${kleurMap[klasse]}`}>
      GL {gl} · {labelMap[klasse]}
    </span>
  );
}
