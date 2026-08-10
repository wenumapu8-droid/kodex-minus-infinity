export type SceneId =
  | 'threshold'
  | 'observe'
  | 'descent'
  | 'archive'
  | 'machine'
  | 'cosmology'
  | 'return';

export type PerformanceProfile = 'full' | 'balanced' | 'low-power';

export interface ScenePerformanceBudget {
  full: number;
  balanced: number;
  lowPower: number;
}

export interface KodexSceneManifest {
  id: SceneId;
  index: number;
  title: string;
  route: string;
  verb: string;
  accent: string;
  heroModule: string;
  fallback: string;
  states: string[];
  primaryAction: string;
  completionEvent: string;
  memoryWrites: string[];
  performance: ScenePerformanceBudget;
}

export interface SceneLifecycle {
  enter(context: SceneContext): Promise<void> | void;
  activate(context: SceneContext): Promise<void> | void;
  pause(context: SceneContext): Promise<void> | void;
  exit(context: SceneContext): Promise<void> | void;
  destroy(): Promise<void> | void;
}

export interface SceneContext {
  manifest: KodexSceneManifest;
  world: KodexWorldState;
  signal: AbortSignal;
  profile: PerformanceProfile;
}

export interface KodexWorldState {
  scene: SceneId;
  mode: string;
  signal: number;
  focus: number;
  anomaly: number;
  entropy: number;
  depth: number;
  sessionSeed: number;
  visitedScenes: SceneId[];
  discoveredGlyphs: string[];
  archiveMemory: string[];
  reducedMotion: boolean;
  audioEnabled: boolean;
  performanceProfile: PerformanceProfile;
}
