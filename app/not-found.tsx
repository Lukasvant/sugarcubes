import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center">
      <div className="text-6xl mb-4">🤷</div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Product niet gevonden</h1>
      <p className="text-gray-500 mb-6">Dit product staat nog niet in onze database.</p>
      <Link
        href="/"
        className="inline-block bg-[#0d9488] text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-[#0f766e] transition-colors"
      >
        Terug naar zoeken
      </Link>
    </div>
  );
}
