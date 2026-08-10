import type { KodexSceneManifest, SceneLifecycle, SceneId } from './scene-contract';
import { KodexWorldStore } from './world-state';
import { KodexEventBus } from './event-bus';
import { KodexTransitionController } from './transition-controller';
import { KodexAccessibilityManager } from './accessibility-manager';

export class KodexRuntime {
  readonly world = new KodexWorldStore();
  readonly events = new KodexEventBus();
  readonly transitions = new KodexTransitionController();
  readonly accessibility = new KodexAccessibilityManager();

  #manifests = new Map<SceneId, KodexSceneManifest>();
  #scenes = new Map<SceneId, SceneLifecycle>();
  #activeScene: SceneId | null = null;
  #activeAbort: AbortController | null = null;

  registerManifest(manifest: KodexSceneManifest): void {
    this.#manifests.set(manifest.id, manifest);
  }

  registerScene(id: SceneId, lifecycle: SceneLifecycle): void {
    this.#scenes.set(id, lifecycle);
  }

  async goTo(id: SceneId): Promise<void> {
    const manifest = this.#manifests.get(id);
    const next = this.#scenes.get(id);
    if (!manifest || !next) throw new Error(`Scene not registered: ${id}`);

    const previousId = this.#activeScene;
    const previous = previousId ? this.#scenes.get(previousId) : undefined;
    this.#activeAbort?.abort();

    const controller = new AbortController();
    this.#activeAbort = controller;

    await this.transitions.run({
      beforeExit: async () => {
        if (previous && previousId) {
          const previousManifest = this.#manifests.get(previousId)!;
          await previous.exit({
            manifest: previousManifest,
            world: this.world.snapshot,
            signal: controller.signal,
            profile: this.world.snapshot.performanceProfile,
          });
        }
      },
      afterExit: () => previous?.pause({
        manifest: this.#manifests.get(previousId!)!,
        world: this.world.snapshot,
        signal: controller.signal,
        profile: this.world.snapshot.performanceProfile,
      }),
      beforeEnter: async () => {
        this.world.setScene(id);
        await next.enter({
          manifest,
          world: this.world.snapshot,
          signal: controller.signal,
          profile: this.world.snapshot.performanceProfile,
        });
      },
      afterEnter: async () => {
        await next.activate({
          manifest,
          world: this.world.snapshot,
          signal: controller.signal,
          profile: this.world.snapshot.performanceProfile,
        });
        this.#activeScene = id;
        this.events.emit('scene:entered', { scene: id });
      },
    });
  }

  async destroy(): Promise<void> {
    this.transitions.cancel();
    this.#activeAbort?.abort();
    for (const scene of this.#scenes.values()) await scene.destroy();
    this.#scenes.clear();
  }
}
