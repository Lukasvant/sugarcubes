import { NextRequest, NextResponse } from 'next/server';
import { searchOFF } from '@/lib/openfoodfacts';

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') ?? '';
  if (!q.trim() || q.trim().length < 2) {
    return NextResponse.json([]);
  }
  const results = await searchOFF(q, 6);
  return NextResponse.json(results, {
    headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' },
  });
}
