
import {rgba,seededPoints,circle} from '../utils.js';
const cache=new Map();
export function renderParticles(ctx,e){
  const {w,h,t,a,s,p,m,q}=e;
  const count=Math.max(20,Math.floor((p.count||180)*q.particleScale*a.density));
  const key=m.id+count;let pts=cache.get(key);
  if(!pts){pts=seededPoints(count,m.index+7);cache.set(key,pts);}
  ctx.save();
  for(let i=0;i<count;i++){
    const pt=pts[i],speed=a.speed*(.08+.22*pt.z);
    let x=(pt.x*w + Math.sin(t*speed+pt.phase)*w*.05)%w;
    let y=(pt.y*h + t*speed*18*(m.id==='chill-drift'?.35:1))%h;
    if(m.id==='glyph-storm')y=(pt.y*h+t*speed*35)%h;
    ctx.fillStyle=rgba(i%5?a.accent:a.accent2,.12+.72*pt.z);
    if(m.id==='glyph-storm'){
      ctx.font=`${8+12*pt.z}px ui-monospace`;ctx.fillText(String.fromCharCode(0x25A0+(i%8)),x,y);
    }else circle(ctx,x,y,1+2.4*pt.z,true);
  }
  ctx.restore();
}
