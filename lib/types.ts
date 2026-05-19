export type Product = {
  id: string;
  naam: string;
  categorie: 'fruit' | 'groente' | 'graan' | 'zuivel' | 'eiwit' | 'snack' | 'drank' | 'bereid';
  emoji: string;
  portieBeschrijving: string;
  portieGram: number;
  koolhydratenPerPortie: number;
  glycemischeIndex: number | null;
  glycemischeLading: number | null;
  rauwOfBereid: 'rauw' | 'bereid';
};

export function suikerklontjes(product: Product): number {
  return Math.round(product.koolhydratenPerPortie / 4);
}

export function koolhydraatLabel(klontjes: number): string {
  if (klontjes <= 2) return 'Koolhydraatarm vriendelijk';
  if (klontjes <= 6) return 'Met mate eten';
  return 'Dit zit vol koolhydraten';
}

export function giKlasse(gi: number): 'laag' | 'gemiddeld' | 'hoog' {
  if (gi <= 55) return 'laag';
  if (gi <= 69) return 'gemiddeld';
  return 'hoog';
}

export function glKlasse(gl: number): 'laag' | 'gemiddeld' | 'hoog' {
  if (gl <= 10) return 'laag';
  if (gl <= 19) return 'gemiddeld';
  return 'hoog';
}
