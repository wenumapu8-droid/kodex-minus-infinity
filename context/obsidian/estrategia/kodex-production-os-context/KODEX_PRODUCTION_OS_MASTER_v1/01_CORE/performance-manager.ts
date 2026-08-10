import type { PerformanceProfile } from './scene-contract';

export interface PerformanceSnapshot {
  fps: number;
  averageFrameTime: number;
  droppedFrames: number;
  longTasks: number;
  profile: PerformanceProfile;
}

export class KodexPerformanceManager extends EventTarget {
  #profile: PerformanceProfile;
  #frames: number[] = [];
  #last = performance.now();
  #dropped = 0;
  #longTasks = 0;
  #observer?: PerformanceObserver;

  constructor(profile: PerformanceProfile = 'balanced') {
    super();
    this.#profile = profile;

    if ('PerformanceObserver' in window) {
      this.#observer = new PerformanceObserver((list) => {
        this.#longTasks += list.getEntries().length;
      });
      try {
        this.#observer.observe({ type: 'longtask', buffered: true });
      } catch {
        // Long Task API is not available in every browser.
      }
    }
  }

  frame(now = performance.now()): void {
    const delta = now - this.#last;
    this.#last = now;
    this.#frames.push(delta);
    if (this.#frames.length > 90) this.#frames.shift();

    const target = this.#profile === 'full' ? 16.7 : this.#profile === 'balanced' ? 33.3 : 41.7;
    if (delta > target * 1.65) this.#dropped += 1;

    const snapshot = this.snapshot;
    if (snapshot.fps < 26 && this.#profile !== 'low-power') {
      this.dispatchEvent(new CustomEvent('degrade', { detail: snapshot }));
    }
  }

  get snapshot(): PerformanceSnapshot {
    const avg = this.#frames.length
      ? this.#frames.reduce((sum, value) => sum + value, 0) / this.#frames.length
      : 0;
    return {
      fps: avg ? Math.round(1000 / avg) : 0,
      averageFrameTime: Number(avg.toFixed(2)),
      droppedFrames: this.#dropped,
      longTasks: this.#longTasks,
      profile: this.#profile,
    };
  }

  setProfile(profile: PerformanceProfile): void {
    this.#profile = profile;
  }

  destroy(): void {
    this.#observer?.disconnect();
  }
}
