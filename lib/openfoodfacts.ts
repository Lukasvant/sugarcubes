export interface OFFProduct {
  code: string;
  product_name: string;
  product_name_nl?: string;
  brands?: string | string[];
  image_front_small_url?: string;
  serving_quantity?: number;
  nutriments: {
    carbohydrates_100g?: number;
    carbohydrates_serving?: number;
  };
}

export interface OFFSearchResult {
  naam: string;
  merk?: string;
  barcode: string;
  koolhydratenPer100g: number;
  portieGram: number;
  koolhydratenPerPortie: number;
  imageUrl?: string;
}

const BASE = 'https://world.openfoodfacts.org';
const SEARCH_BASE = 'https://search.openfoodfacts.org';
const FIELDS = 'code,product_name,product_name_nl,brands,serving_quantity,nutriments,image_front_small_url';

function brandString(brands: string | string[] | undefined): string | undefined {
  if (!brands) return undefined;
  if (Array.isArray(brands)) return brands[0]?.trim() || undefined;
  return brands.split(',')[0].trim() || undefined;
}

function mapProduct(p: OFFProduct): OFFSearchResult | null {
  const naam = p.product_name_nl || p.product_name;
  if (!naam) return null;

  const carbs100 = p.nutriments?.carbohydrates_100g ?? null;
  if (carbs100 === null) return null;

  const portieGram = p.serving_quantity ?? 100;
  const carbsPortie = p.nutriments?.carbohydrates_serving
    ? Math.round(p.nutriments.carbohydrates_serving)
    : Math.round((carbs100 * portieGram) / 100);

  return {
    naam,
    merk: brandString(p.brands),
    barcode: p.code,
    koolhydratenPer100g: Math.round(carbs100),
    portieGram: Math.round(portieGram),
    koolhydratenPerPortie: carbsPortie,
    imageUrl: p.image_front_small_url,
  };
}

export async function searchOFF(query: string, max = 6): Promise<OFFSearchResult[]> {
  try {
    const url = `${SEARCH_BASE}/search?q=${encodeURIComponent(query)}&fields=${FIELDS}&page_size=20`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    const products: OFFProduct[] = data.hits ?? [];
    return products
      .map(mapProduct)
      .filter((p): p is OFFSearchResult => p !== null)
      .filter((p) => p.koolhydratenPerPortie >= 0)
      .slice(0, max);
  } catch {
    return [];
  }
}

export async function lookupBarcode(barcode: string): Promise<OFFSearchResult | null> {
  try {
    const url = `${BASE}/api/v2/product/${barcode}.json?fields=${FIELDS}`;
    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.status !== 1 || !data.product) return null;
    return mapProduct({ ...data.product, code: barcode });
  } catch {
    return null;
  }
}
