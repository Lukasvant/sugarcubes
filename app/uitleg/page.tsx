import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function UitlegPage() {
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
        <div className="text-5xl mb-4">🔬</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">GI en GL uitgelegd</h1>
        <p className="text-gray-500">Zonder jargon. In gewone taal.</p>
      </div>

      <div className="space-y-6">
        {/* GI */}
        <div className="bg-white rounded-3xl border border-[#e2e8f0] p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-xl">
              ⚡
            </div>
            <h2 className="text-xl font-bold text-gray-900">Wat is de glycemische index?</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4">
            Zie de glycemische index (GI) als een snelheidsmeter voor je bloedsuiker. Elk koolhydraatproduct
            laat je bloedsuiker stijgen — de GI zegt hoe snel dat gaat. Pure glucose is de referentie: GI = 100.
            Een hoge GI betekent een snelle, steile piek. Een lage GI betekent langzame, geleidelijke opname.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Langzame brandstof houdt je langer verzadigd en voorkomt de bekende "suikerdip" na een maaltijd.
            Linzen (GI ~28), havermout (GI ~55) en volkorenbrood (GI ~51) zijn voorbeelden van producten met
            een lage tot gemiddelde GI. Witbrood (GI ~75), cornflakes (GI ~81) en witte rijst (GI ~73) scoren hoog.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              { label: 'Laag ≤55', kleur: 'bg-emerald-100 text-emerald-800' },
              { label: 'Gemiddeld 56–69', kleur: 'bg-yellow-100 text-yellow-800' },
              { label: 'Hoog ≥70', kleur: 'bg-red-100 text-red-800' },
            ].map((item) => (
              <span key={item.label} className={`px-3 py-1 rounded-full text-sm font-medium ${item.kleur}`}>
                {item.label}
              </span>
            ))}
          </div>
        </div>

        {/* GL */}
        <div className="bg-white rounded-3xl border border-[#e2e8f0] p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 flex items-center justify-center text-xl">
              ⚖️
            </div>
            <h2 className="text-xl font-bold text-gray-900">Wat is de glycemische lading?</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4">
            De GI heeft een blinde vlek: hij houdt geen rekening met de portiegrootte. Neem watermeloen:
            die heeft een hoge GI (76), maar per plak zitten er maar 11g koolhydraten in. Eén plak watermeloen
            doet dus veel minder met je bloedsuiker dan een bord witte rijst, ook al is de GI hoog.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            De glycemische lading (GL) lost dit op. De formule is simpel:
          </p>
          <div className="bg-gray-50 rounded-2xl p-4 text-center font-mono text-sm text-gray-700 mb-4">
            GL = (GI × koolhydraten per portie in gram) ÷ 100
          </div>
          <p className="text-gray-600 leading-relaxed">
            GL combineert snelheid én hoeveelheid. Het is de meest praktische maat om te weten wat een
            product écht met je bloedsuiker doet. Streef naar maaltijden met een lage tot gemiddelde GL.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              { label: 'Laag ≤10', kleur: 'bg-emerald-100 text-emerald-800' },
              { label: 'Gemiddeld 11–19', kleur: 'bg-yellow-100 text-yellow-800' },
              { label: 'Hoog ≥20', kleur: 'bg-red-100 text-red-800' },
            ].map((item) => (
              <span key={item.label} className={`px-3 py-1 rounded-full text-sm font-medium ${item.kleur}`}>
                {item.label}
              </span>
            ))}
          </div>
        </div>

        {/* Suikerklontjes */}
        <div className="bg-white rounded-3xl border border-[#e2e8f0] p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-[#f1f5f9] flex items-center justify-center text-xl">
              🍬
            </div>
            <h2 className="text-xl font-bold text-gray-900">Waarom suikerklontjes?</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            "32 gram koolhydraten" zegt weinig. "8 suikerklontjes" zegt alles. Eén standaard suikerklontje
            weegt ongeveer 4 gram. Voor je lichaam werkt 4 gram zetmeel uit rijst of brood ruwweg hetzelfde
            als 4 gram tafelsuiker: het wordt afgebroken tot glucose. Door alles in suikerklontjes uit te
            drukken, wordt de hoeveelheid koolhydraten onmiddellijk voelbaar.
          </p>
        </div>
      </div>

      <div className="mt-10 bg-[#f1f5f9] rounded-2xl border border-[#f0d8cf] p-6 text-center">
        <p className="text-gray-700 font-medium mb-3">Ga nu opzoeken wat in jouw eten zit</p>
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
