
export function createWorldState(){
  return {
    mode:'idle',
    signal:0.55,
    focus:0.5,
    anomaly:0.12,
    entropy:0.35,
    depth:0.4,
    progress:0,
    pointer:{x:0.5,y:0.5,vx:0,vy:0,active:false},
    audio:{low:0,mid:0,high:0,rms:0,beat:false},
  };
}
export function mergeWorldState(current, patch={}){
  const next={...current,...patch};
  if(patch.pointer)next.pointer={...current.pointer,...patch.pointer};
  if(patch.audio)next.audio={...current.audio,...patch.audio};
  return next;
}
