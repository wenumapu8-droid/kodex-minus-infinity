import type { KodexWorldState } from './scene-contract';

const KEY = 'kdx:world-memory:v1';

export interface PersistedKodexMemory {
  version: 1;
  updatedAt: string;
  visitedScenes: KodexWorldState['visitedScenes'];
  discoveredGlyphs: string[];
  archiveMemory: string[];
  sessionSeed: number;
  journeyCompleted: boolean;
}

export function loadKodexMemory(): PersistedKodexMemory | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PersistedKodexMemory;
    return parsed.version === 1 ? parsed : null;
  } catch {
    return null;
  }
}

export function saveKodexMemory(
  state: KodexWorldState,
  journeyCompleted = false,
): void {
  const data: PersistedKodexMemory = {
    version: 1,
    updatedAt: new Date().toISOString(),
    visitedScenes: state.visitedScenes,
    discoveredGlyphs: state.discoveredGlyphs,
    archiveMemory: state.archiveMemory,
    sessionSeed: state.sessionSeed,
    journeyCompleted,
  };
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function clearKodexMemory(): void {
  localStorage.removeItem(KEY);
}
