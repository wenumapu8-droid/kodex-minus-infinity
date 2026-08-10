import type { KodexWorldState, SceneId, PerformanceProfile } from './scene-contract';

const DEFAULT_STATE: KodexWorldState = {
  scene: 'threshold',
  mode: 'latent',
  signal: 0,
  focus: 0,
  anomaly: 0,
  entropy: 0.15,
  depth: 0,
  sessionSeed: Date.now(),
  visitedScenes: [],
  discoveredGlyphs: [],
  archiveMemory: [],
  reducedMotion: false,
  audioEnabled: false,
  performanceProfile: 'balanced',
};

export type WorldPatch = Partial<KodexWorldState>;

export class KodexWorldStore extends EventTarget {
  #state: KodexWorldState;

  constructor(initial: WorldPatch = {}) {
    super();
    this.#state = {
      ...DEFAULT_STATE,
      ...initial,
      visitedScenes: [...(initial.visitedScenes ?? DEFAULT_STATE.visitedScenes)],
      discoveredGlyphs: [...(initial.discoveredGlyphs ?? DEFAULT_STATE.discoveredGlyphs)],
      archiveMemory: [...(initial.archiveMemory ?? DEFAULT_STATE.archiveMemory)],
    };
  }

  get snapshot(): Readonly<KodexWorldState> {
    return structuredClone(this.#state);
  }

  patch(patch: WorldPatch, source = 'unknown'): void {
    this.#state = { ...this.#state, ...patch };
    this.dispatchEvent(new CustomEvent('change', {
      detail: { state: this.snapshot, patch, source },
    }));
  }

  setScene(scene: SceneId, mode = 'idle'): void {
    const visited = new Set(this.#state.visitedScenes);
    visited.add(scene);
    this.patch({
      scene,
      mode,
      visitedScenes: [...visited],
    }, 'scene');
  }

  setProfile(profile: PerformanceProfile): void {
    this.patch({ performanceProfile: profile }, 'performance');
  }
}
