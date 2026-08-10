export interface KodexFeatureFlags {
  audio: boolean;
  asciiMode: boolean;
  crt: boolean;
  archiveCommerce: boolean;
  sessionArtifact: boolean;
  experimentalShaders: boolean;
}

export const DEFAULT_FLAGS: KodexFeatureFlags = {
  audio: false,
  asciiMode: true,
  crt: true,
  archiveCommerce: false,
  sessionArtifact: false,
  experimentalShaders: false,
};

export function readFeatureFlags(): KodexFeatureFlags {
  const params = new URLSearchParams(location.search);
  return {
    ...DEFAULT_FLAGS,
    audio: params.get('audio') === '1' || DEFAULT_FLAGS.audio,
    asciiMode: params.get('ascii') !== '0' && DEFAULT_FLAGS.asciiMode,
    crt: params.get('crt') !== '0' && DEFAULT_FLAGS.crt,
    archiveCommerce: params.get('commerce') === '1',
    sessionArtifact: params.get('artifact') === '1',
    experimentalShaders: params.get('experimental') === '1',
  };
}
