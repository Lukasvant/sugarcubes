import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const SYSTEM_PROMPT = `Je bent een voedingsdeskundige AI die voedingsproducten herkent op foto's.
Geef ALLEEN een JSON-array terug met de namen van de herkende voedingsproducten in het Nederlands.
Gebruik korte, generieke namen (bijv. "banaan", "witte rijst", "appel", "melkchocolade").
Als er meerdere producten zichtbaar zijn, geef dan alle herkende producten terug.
Geef maximaal 10 producten terug.
Voorbeeld output: ["banaan", "volkoren brood", "melk"]
Geef ALLEEN de JSON-array terug, geen uitleg of andere tekst.`;

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'] as const;
type ImageMimeType = typeof ALLOWED_TYPES[number];

function toMimeType(type: string): ImageMimeType {
  return ALLOWED_TYPES.includes(type as ImageMimeType) ? (type as ImageMimeType) : 'image/jpeg';
}

export async function POST(req: NextRequest) {
  if (!process.env.GOOGLE_AI_API_KEY) {
    return NextResponse.json(
      { error: 'AI niet geconfigureerd — voeg GOOGLE_AI_API_KEY toe aan je omgevingsvariabelen.' },
      { status: 503 }
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get('image') as File | null;
    if (!file) {
      return NextResponse.json({ error: 'Geen afbeelding ontvangen' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString('base64');
    const mimeType = toMimeType(file.type);

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: SYSTEM_PROMPT,
    });

    const result = await model.generateContent([
      { inlineData: { data: base64, mimeType } },
      'Welke voedingsproducten zie je op deze foto?',
    ]);

    const text = result.response.text();

    let products: string[] = [];
    try {
      const match = text.match(/\[[\s\S]*\]/);
      if (match) products = JSON.parse(match[0]);
    } catch {
      products = [];
    }

    return NextResponse.json({ producten: products });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Onbekende fout';
    console.error('Foto herkenning fout:', msg);
    return NextResponse.json({ error: `Herkenning mislukt: ${msg}` }, { status: 500 });
  }
}
