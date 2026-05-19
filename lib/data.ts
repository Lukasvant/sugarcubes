import producten from '@/data/producten.json';
import type { Product } from './types';

export function getAlleProducten(): Product[] {
  return producten as Product[];
}

export function getProductById(id: string): Product | undefined {
  return (producten as Product[]).find((p) => p.id === id);
}
