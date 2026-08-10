
import {rgba,seededPoints,line,circle} from '../core/utils.js';
const cache=new Map();
export function renderNetwork(ctx,e){
  const {w,h,t,a,s,p,m}=e;
  const count=Math.max(8,Math.floor((p.nodes||22)*a.density));
  const key=m.id+count;let pts=cache.get(key);
  if(!pts){pts=seededPoints(count,m.index);cache.set(key,pts);}
  ctx.save();ctx.lineWidth=a.line*.75;
  for(let i=0;i<count;i++){
    const A=pts[i],x=w*(.12+A.x*.76)+Math.sin(t*.3+A.phase)*8,y=h*(.16+A.y*.68)+Math.cos(t*.25+A.phase)*8;
    for(let j=i+1;j<count;j++){
      const B=pts[j],x2=w*(.12+B.x*.76),y2=h*(.16+B.y*.68);
      const d=Math.hypot(x-x2,y-y2);
      if(d<Math.min(w,h)*.22){
        ctx.strokeStyle=rgba((i+j)%4?a.accent:a.accent2,.05+.18*(1-d/(Math.min(w,h)*.22)));
        line(ctx,x,y,x2,y2);
      }
    }
    ctx.fillStyle=rgba(i%4?a.accent:a.fg,.28+.5*A.z);circle(ctx,x,y,1.5+4*A.z,true);
  }
  if(m.id==='root-lattice'||m.id==='antler-signal'){
    ctx.strokeStyle=rgba(a.accent,.5);
    const cx=w/2,base=h*.82;
    for(let i=0;i<12;i++){
      const ang=-Math.PI*.85+i/11*Math.PI*.7;
      ctx.beginPath();ctx.moveTo(cx,base);
      ctx.quadraticCurveTo(cx+Math.cos(ang)*w*.16,h*.56,cx+Math.cos(ang)*w*.32,h*.2+Math.sin(i)*20);ctx.stroke();
    }
  }
  ctx.restore();
}
