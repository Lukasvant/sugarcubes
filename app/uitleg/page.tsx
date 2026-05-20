import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function UitlegPage() {
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
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-2">GI en GL uitgelegd</h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm">Zonder jargon. In gewone taal.</p>
      </div>

      <div className="space-y-px border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
        {/* GI */}
        <div className="bg-white dark:bg-neutral-900 p-6 border-b border-neutral-200 dark:border-neutral-800">
          <h2 className="text-base font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-3">Wat is de glycemische index?</h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-3">
            Zie de glycemische index (GI) als een snelheidsmeter voor je bloedsuiker. Elk koolhydraatproduct
            laat je bloedsuiker stijgen — de GI zegt hoe snel dat gaat. Pure glucose is de referentie: GI = 100.
            Een hoge GI betekent een snelle, steile piek. Een lage GI betekent langzame, geleidelijke opname.
          </p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Langzame brandstof houdt je langer verzadigd en voorkomt de bekende &ldquo;suikerdip&rdquo; na een maaltijd.
            Linzen (GI ~28), havermout (GI ~55) en volkorenbrood (GI ~51) zijn voorbeelden van producten met
            een lage tot gemiddelde GI. Witbrood (GI ~75), cornflakes (GI ~81) en witte rijst (GI ~73) scoren hoog.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              { label: 'Laag ≤55', kleur: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
              { label: 'Gemiddeld 56–69', kleur: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
              { label: 'Hoog ≥70', kleur: 'bg-red-100 text-red-800 border-red-200' },
            ].map((item) => (
              <span key={item.label} className={`px-3 py-1 rounded-full text-xs font-medium border ${item.kleur}`}>
                {item.label}
              </span>
            ))}
          </div>
        </div>

        {/* GL */}
        <div className="bg-white dark:bg-neutral-900 p-6 border-b border-neutral-200 dark:border-neutral-800">
          <h2 className="text-base font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-3">Wat is de glycemische lading?</h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-3">
            De GI heeft een blinde vlek: hij houdt geen rekening met de portiegrootte. Neem watermeloen:
            die heeft een hoge GI (76), maar per plak zitten er maar 11g koolhydraten in. Eén plak watermeloen
            doet dus veel minder met je bloedsuiker dan een bord witte rijst, ook al is de GI hoog.
          </p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-3">
            De glycemische lading (GL) lost dit op. De formule is simpel:
          </p>
          <div className="bg-neutral-50 dark:bg-neutral-800 rounded-xl p-4 text-center font-mono text-sm text-neutral-700 dark:text-neutral-300 mb-3">
            GL = (GI × koolhydraten per portie in gram) ÷ 100
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            GL combineert snelheid én hoeveelheid. Het is de meest praktische maat om te weten wat een
            product écht met je bloedsuiker doet. Streef naar maaltijden met een lage tot gemiddelde GL.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              { label: 'Laag ≤10', kleur: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
              { label: 'Gemiddeld 11–19', kleur: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
              { label: 'Hoog ≥20', kleur: 'bg-red-100 text-red-800 border-red-200' },
            ].map((item) => (
              <span key={item.label} className={`px-3 py-1 rounded-full text-xs font-medium border ${item.kleur}`}>
                {item.label}
              </span>
            ))}
          </div>
        </div>

        {/* Suikerklontjes */}
        <div className="bg-white dark:bg-neutral-900 p-6">
          <h2 className="text-base font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-3">Waarom suikerklontjes?</h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            &ldquo;32 gram koolhydraten&rdquo; zegt weinig. &ldquo;8 suikerklontjes&rdquo; zegt alles. Eén standaard suikerklontje
            weegt ongeveer 4 gram. Voor je lichaam werkt 4 gram zetmeel uit rijst of brood ruwweg hetzelfde
            als 4 gram tafelsuiker: het wordt afgebroken tot glucose. Door alles in suikerklontjes uit te
            drukken, wordt de hoeveelheid koolhydraten onmiddellijk voelbaar.
          </p>
        </div>
      </div>

      <div className="mt-10 bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6 text-center">
        <p className="text-sm text-neutral-700 dark:text-neutral-300 font-medium mb-3">Ga nu opzoeken wat in jouw eten zit</p>
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
