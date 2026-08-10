
export const QUALITY_PROFILES = {
  full:{dpr:1.75,fps:60,scale:1,particleScale:1},
  balanced:{dpr:1.25,fps:30,scale:.86,particleScale:.62},
  'low-power':{dpr:1,fps:24,scale:.68,particleScale:.34},
};
export function autoQuality(){
  const cores=navigator.hardwareConcurrency||4;
  const mobile=matchMedia('(max-width:720px)').matches;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduced||cores<=2)return 'low-power';
  if(mobile||cores<=6)return 'balanced';
  return 'full';
}
