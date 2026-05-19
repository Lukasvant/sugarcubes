import { giKlasse } from '@/lib/types';

const kleurMap = {
  laag: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  gemiddeld: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  hoog: 'bg-red-100 text-red-800 border-red-200',
};

const labelMap = {
  laag: 'Laag (≤55)',
  gemiddeld: 'Gemiddeld (56–69)',
  hoog: 'Hoog (≥70)',
};

export default function GIBadge({ gi }: { gi: number }) {
  const klasse = giKlasse(gi);
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${kleurMap[klasse]}`}>
      GI {gi} · {labelMap[klasse]}
    </span>
  );
}
