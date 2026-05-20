import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const regels = [
  {
    nummer: 1,
    titel: 'Sla de suiker over.',
    tekst:
      'Frisdrank, snoep, vruchtensap en de meeste toetjes zijn pure suikerklontjes in vermomming. Deze ene verandering doet meer dan welke andere ook.',
  },
  {
    nummer: 2,
    titel: 'Pas op met het witte spul.',
    tekst:
      'Brood, pasta, rijst, aardappelen en ontbijtgranen veranderen binnen minuten in suiker in je lichaam. Ze zijn niet "slecht" — ze zitten gewoon vol koolhydraten.',
  },
  {
    nummer: 3,
    titel: 'Eet echt eten.',
    tekst:
      'Vlees, vis, eieren, bovengrondse groente, noten, volle zuivel. Als er geen etiket op zit, zit je meestal goed.',
  },
  {
    nummer: 4,
    titel: 'Bessen boven bananen.',
    tekst:
      'Alle fruit bevat suiker, maar aardbeien, blauwe bessen en frambozen veel minder dan tropisch fruit.',
  },
  {
    nummer: 5,
    titel: 'Vet is niet de vijand.',
    tekst:
      'Olijfolie, roomboter, avocado, noten. Als je koolhydraten schrapt, is vet je brandstof — eet het zonder schuldgevoel.',
  },
  {
    nummer: 6,
    titel: 'Drink water, koffie of thee.',
    tekst:
      'Vloeibare koolhydraten (sap, frisdrank, zoete lattes, bier) sluipen sneller naar binnen dan wat dan ook. Je voelt je er niet vol van.',
  },
  {
    nummer: 7,
    titel: 'Lees het etiket, vind de koolhydraten.',
    tekst:
      'Zoek "koolhydraten" op het voedingswaardelabel. Deel door 4. Dat is hoeveel suikerklontjes er in één portie zitten.',
  },
];

export default function RegelsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Terug
      </Link>

      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-2">Koolhydraatarme Basisregels</h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm">Zeven simpele regels. Lees ze in 90 seconden.</p>
      </div>

      <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
        {regels.map((regel, idx) => (
          <div
            key={regel.nummer}
            className={`bg-white dark:bg-neutral-900 p-5 flex gap-4 ${idx < regels.length - 1 ? 'border-b border-neutral-200 dark:border-neutral-800' : ''}`}
          >
            <div className="flex-shrink-0 w-6 h-6 rounded-full border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-xs font-semibold text-neutral-500 dark:text-neutral-400">
              {regel.nummer}
            </div>
            <div>
              <h2 className="font-semibold text-sm text-neutral-900 dark:text-neutral-100 mb-1 tracking-tight">
                {regel.titel}
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">{regel.tekst}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6 text-center">
        <p className="text-sm text-neutral-700 dark:text-neutral-300 font-medium mb-3">Benieuwd hoeveel klontjes er in jouw eten zitten?</p>
        <Link
          href="/"
          className="inline-block bg-neutral-900 dark:bg-white text-white dark:text-black font-semibold px-6 py-2.5 rounded-full text-sm transition-colors"
        >
          Zoek een product
        </Link>
      </div>
    </div>
  );
}
