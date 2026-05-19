'use client';

const CUBE_SIZE = 32;
const COLS = 5;

function SugarCube({ index }: { index: number }) {
  return (
    <div
      key={index}
      style={{ width: CUBE_SIZE, height: CUBE_SIZE }}
      className="relative flex-shrink-0"
      title="1 suikerklontje = 4g koolhydraten"
    >
      <svg
        width={CUBE_SIZE}
        height={CUBE_SIZE}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* top face */}
        <polygon
          points="16,3 29,9 16,15 3,9"
          fill="white"
          stroke="#d1d5db"
          strokeWidth="0.8"
        />
        {/* right face */}
        <polygon
          points="16,15 29,9 29,22 16,28"
          fill="#f0ede8"
          stroke="#d1d5db"
          strokeWidth="0.8"
        />
        {/* left face */}
        <polygon
          points="16,15 3,9 3,22 16,28"
          fill="#e8e3db"
          stroke="#d1d5db"
          strokeWidth="0.8"
        />
        {/* subtle shine on top */}
        <polygon
          points="16,4.5 26,9.5 16,13 6,8.5"
          fill="white"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}

export default function SuikerklontjesToren({ klontjes, small }: { klontjes: number; small?: boolean }) {
  const count = Math.max(0, klontjes);

  if (count === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-4">
        <span className="text-5xl">✨</span>
        <p className="text-sm text-gray-500">Vrijwel geen koolhydraten</p>
      </div>
    );
  }

  const displayCount = small ? Math.min(count, 10) : count;
  const cols = small ? 5 : COLS;
  const cubes = Array.from({ length: displayCount });
  const rows: typeof cubes[] = [];
  for (let i = 0; i < cubes.length; i += cols) {
    rows.push(cubes.slice(i, i + cols));
  }

  const scale = small ? 0.55 : 1;

  return (
    <div className="flex flex-col items-center gap-1" style={{ transform: `scale(${scale})`, transformOrigin: 'center top' }}>
      {rows.map((row, rowIdx) => (
        <div key={rowIdx} className="flex flex-row gap-1">
          {row.map((_, colIdx) => (
            <SugarCube key={colIdx} index={rowIdx * cols + colIdx} />
          ))}
        </div>
      ))}
    </div>
  );
}
