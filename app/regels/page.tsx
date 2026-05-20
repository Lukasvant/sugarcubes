import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const regels = [
  {
    nummer: 1,
    titel: 'Sla de suiker over.',
    tekst:
      'Frisdrank, snoep, vruchtensap en de meeste toetjes zijn pure suikerklontjes in vermomming. Deze ene verandering doet meer dan welke andere ook.',
    emoji: '🥤',
  },
  {
    nummer: 2,
    titel: 'Pas op met het witte spul.',
    tekst:
      'Brood, pasta, rijst, aardappelen en ontbijtgranen veranderen binnen minuten in suiker in je lichaam. Ze zijn niet "slecht" — ze zitten gewoon vol koolhydraten.',
    emoji: '🍞',
  },
  {
    nummer: 3,
    titel: 'Eet echt eten.',
    tekst:
      'Vlees, vis, eieren, bovengrondse groente, noten, volle zuivel. Als er geen etiket op zit, zit je meestal goed.',
    emoji: '🥩',
  },
  {
    nummer: 4,
    titel: 'Bessen boven bananen.',
    tekst:
      'Alle fruit bevat suiker, maar aardbeien, blauwe bessen en frambozen veel minder dan tropisch fruit.',
    emoji: '🍓',
  },
  {
    nummer: 5,
    titel: 'Vet is niet de vijand.',
    tekst:
      'Olijfolie, roomboter, avocado, noten. Als je koolhydraten schrapt, is vet je brandstof — eet het zonder schuldgevoel.',
    emoji: '🥑',
  },
  {
    nummer: 6,
    titel: 'Drink water, koffie of thee.',
    tekst:
      'Vloeibare koolhydraten (sap, frisdrank, zoete lattes, bier) sluipen sneller naar binnen dan wat dan ook. Je voelt je er niet vol van.',
    emoji: '💧',
  },
  {
    nummer: 7,
    titel: 'Lees het etiket, vind de koolhydraten.',
    tekst:
      'Zoek "koolhydraten" op het voedingswaardelabel. Deel door 4. Dat is hoeveel suikerklontjes er in één portie zitten.',
    emoji: '🏷️',
  },
];

export default function RegelsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Terug
      </Link>

      <div className="text-center mb-10">
        <div className="text-5xl mb-4">📋</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Koolhydraatarme Basisregels</h1>
        <p className="text-gray-500">Zeven simpele regels. Lees ze in 90 seconden.</p>
      </div>

      <div className="space-y-4">
        {regels.map((regel) => (
          <div
            key={regel.nummer}
            className="bg-white rounded-2xl border border-[#e2e8f0] p-6 flex gap-4 hover:border-[#0d9488] transition-colors"
          >
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-2xl bg-[#f1f5f9] flex items-center justify-center text-xl">
                {regel.emoji}
              </div>
            </div>
            <div>
              <h2 className="font-bold text-gray-900 mb-1">
                {regel.nummer}. {regel.titel}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">{regel.tekst}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-[#f1f5f9] rounded-2xl border border-[#f0d8cf] p-6 text-center">
        <p className="text-gray-700 font-medium mb-3">Benieuwd hoeveel klontjes er in jouw eten zitten?</p>
        <Link
          href="/"
          className="inline-block bg-[#0d9488] text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-[#0f766e] transition-colors"
        >
          Zoek een product
        </Link>
      </div>
    </div>
  );
}
