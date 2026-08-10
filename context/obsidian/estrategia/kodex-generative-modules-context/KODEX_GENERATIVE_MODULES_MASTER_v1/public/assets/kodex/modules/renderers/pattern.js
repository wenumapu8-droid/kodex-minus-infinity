
import {TAU,rgba,circle} from '../utils.js';
export function renderPattern(ctx,e){
  const {w,h,t,a,s,p}=e,cx=w/2,cy=h/2,r=Math.min(w,h)*.34;
  ctx.save();ctx.translate(cx,cy);ctx.lineWidth=a.line;
  const sym=p.symmetry||6,cells=p.cells||18;
  for(let k=0;k<sym;k++){
    ctx.save();ctx.rotate(k*TAU/sym);
    for(let i=0;i<cells;i++){
      const u=i/cells,rr=r*u;
      const ang=Math.sin(u*TAU*2+t*a.speed)*.35;
      const x=Math.cos(ang)*rr,y=Math.sin(ang)*rr*.55;
      ctx.strokeStyle=rgba(i%3?a.accent:a.accent2,.12+.6*u);
      circle(ctx,x,y,4+16*u*(.4+s.signal),false);
    }
    ctx.restore();
  }
  ctx.restore();
}
