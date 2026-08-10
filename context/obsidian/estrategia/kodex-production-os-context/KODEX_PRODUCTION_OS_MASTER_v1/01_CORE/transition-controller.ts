export interface TransitionHooks {
  beforeExit?(): Promise<void> | void;
  afterExit?(): Promise<void> | void;
  beforeEnter?(): Promise<void> | void;
  afterEnter?(): Promise<void> | void;
}

export class KodexTransitionController {
  #active: AbortController | null = null;

  async run(hooks: TransitionHooks, duration = 900): Promise<void> {
    this.cancel();
    const controller = new AbortController();
    this.#active = controller;

    const sleep = (ms: number) => new Promise<void>((resolve, reject) => {
      const id = window.setTimeout(resolve, ms);
      controller.signal.addEventListener('abort', () => {
        clearTimeout(id);
        reject(new DOMException('Transition aborted', 'AbortError'));
      }, { once: true });
    });

    try {
      await hooks.beforeExit?.();
      await sleep(duration * 0.35);
      await hooks.afterExit?.();
      await hooks.beforeEnter?.();
      await sleep(duration * 0.65);
      await hooks.afterEnter?.();
    } finally {
      if (this.#active === controller) this.#active = null;
    }
  }

  cancel(): void {
    this.#active?.abort();
    this.#active = null;
  }
}
