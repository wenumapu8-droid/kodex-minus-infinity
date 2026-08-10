export type KodexAnalyticsEvent =
  | 'kodex_enter'
  | 'scene_view'
  | 'scene_complete'
  | 'state_change'
  | 'index_open'
  | 'archive_open'
  | 'artifact_view'
  | 'artifact_collect'
  | 'commission_open'
  | 'license_open'
  | 'sound_enable'
  | 'webgl_fallback'
  | 'performance_degrade'
  | 'journey_complete';

export interface AnalyticsPayload {
  scene?: string;
  state?: string;
  artifactId?: string;
  profile?: string;
  fps?: number;
  source?: string;
  [key: string]: string | number | boolean | undefined;
}

export function trackKodexEvent(
  event: KodexAnalyticsEvent,
  payload: AnalyticsPayload = {},
): void {
  const detail = {
    event,
    timestamp: Date.now(),
    path: location.pathname + location.hash,
    ...payload,
  };

  window.dispatchEvent(new CustomEvent('kdx:analytics', { detail }));

  const queue = (window as typeof window & {
    dataLayer?: unknown[];
  }).dataLayer;
  queue?.push(detail);
}
