const KEY = 'recent_producten';
const MAX = 8;

export function addToHistory(id: string): void {
  if (typeof window === 'undefined') return;
  const current: string[] = JSON.parse(localStorage.getItem(KEY) ?? '[]');
  const filtered = current.filter((x) => x !== id);
  localStorage.setItem(KEY, JSON.stringify([id, ...filtered].slice(0, MAX)));
}

export function getHistory(): string[] {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem(KEY) ?? '[]');
}
