import {
  Cherry,
  Carrot,
  Wheat,
  Milk,
  Egg,
  Cookie,
  GlassWater,
  Utensils,
  ShoppingBag,
  type LucideIcon,
} from 'lucide-react';

type Categorie = 'fruit' | 'groente' | 'graan' | 'zuivel' | 'eiwit' | 'snack' | 'drank' | 'bereid';

const CONFIG: Record<Categorie, { icon: LucideIcon; bg: string; color: string }> = {
  fruit:    { icon: Cherry,      bg: 'bg-rose-50',    color: 'text-rose-500' },
  groente:  { icon: Carrot,      bg: 'bg-emerald-50', color: 'text-emerald-600' },
  graan:    { icon: Wheat,       bg: 'bg-amber-50',   color: 'text-amber-600' },
  zuivel:   { icon: Milk,        bg: 'bg-sky-50',     color: 'text-sky-500' },
  eiwit:    { icon: Egg,         bg: 'bg-slate-100',  color: 'text-slate-500' },
  snack:    { icon: Cookie,      bg: 'bg-orange-50',  color: 'text-orange-500' },
  drank:    { icon: GlassWater,  bg: 'bg-cyan-50',    color: 'text-cyan-600' },
  bereid:   { icon: Utensils,    bg: 'bg-violet-50',  color: 'text-violet-500' },
};

interface ProductIconProps {
  categorie: Categorie;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZE = {
  sm: { box: 'w-9 h-9 rounded-xl', icon: 'w-4 h-4' },
  md: { box: 'w-12 h-12 rounded-2xl', icon: 'w-5 h-5' },
  lg: { box: 'w-20 h-20 rounded-3xl', icon: 'w-9 h-9' },
};

export default function ProductIcon({ categorie, size = 'md', className = '' }: ProductIconProps) {
  const cfg = CONFIG[categorie];
  const s = SIZE[size];
  const Icon = cfg.icon;
  return (
    <div className={`flex-shrink-0 flex items-center justify-center ${cfg.bg} ${s.box} ${className}`}>
      <Icon className={`${s.icon} ${cfg.color}`} />
    </div>
  );
}

export function OFFIcon({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const s = SIZE[size];
  return (
    <div className={`flex-shrink-0 flex items-center justify-center bg-gray-100 ${s.box} ${className}`}>
      <ShoppingBag className={`${s.icon} text-gray-400`} />
    </div>
  );
}
