export interface KodexEventMap {
  'scene:request': { scene: string; source: string };
  'scene:entered': { scene: string };
  'scene:completed': { scene: string };
  'state:changed': { scene: string; mode: string };
  'artifact:opened': { id: string };
  'artifact:collected': { id: string };
  'performance:degraded': { fps: number; profile: string };
  'runtime:error': { message: string; source?: string };
}

export class KodexEventBus extends EventTarget {
  emit<K extends keyof KodexEventMap>(type: K, detail: KodexEventMap[K]): void {
    this.dispatchEvent(new CustomEvent(String(type), { detail }));
  }

  on<K extends keyof KodexEventMap>(
    type: K,
    listener: (detail: KodexEventMap[K]) => void,
    signal?: AbortSignal,
  ): () => void {
    const handler = (event: Event) => listener((event as CustomEvent<KodexEventMap[K]>).detail);
    this.addEventListener(String(type), handler, { signal });
    return () => this.removeEventListener(String(type), handler);
  }
}
