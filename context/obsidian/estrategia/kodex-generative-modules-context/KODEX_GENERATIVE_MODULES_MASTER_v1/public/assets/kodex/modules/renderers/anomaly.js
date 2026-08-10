
import {rgba,hash2} from '../utils.js';
export function renderAnomaly(ctx,e){
  const {w,h,t,a,s,p,m}=e;
  ctx.save();
  const bands=p.bands||16;
  for(let i=0;i<bands;i++){
    const y=i/bands*h;
    const n=hash2(i,Math.floor(t*a.speed*12));
    const hh=h/bands*(.2+.8*n);
    const shift=(n-.5)*w*.12*(.2+s.anomaly);
    ctx.fillStyle=rgba(i%2?a.accent:a.accent2,.03+.12*n);
    ctx.fillRect(shift,y,w,hh);
  }
  const grains=Math.floor(180*a.density);
  for(let i=0;i<grains;i++){
    const x=hash2(i,t|0)*w,y=hash2(i+99,(t*2)|0)*h;
    ctx.fillStyle=rgba(a.fg,.03+.08*hash2(i,3));ctx.fillRect(x,y,1,1);
  }
  if(m.id==='acid-flicker'){
    ctx.fillStyle=rgba(a.accent,.04+.08*(.5+.5*Math.sin(t*37)));ctx.fillRect(0,0,w,h);
  }
  ctx.restore();
}
