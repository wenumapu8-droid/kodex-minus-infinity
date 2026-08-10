
import {TAU,rgba,circle,line,clamp} from '../utils.js';
export function renderOrbital(ctx,e){
  const {w,h,t,a,s,p}=e,cx=w*(.5+(s.pointer.x-.5)*.06),cy=h*(.5+(s.pointer.y-.5)*.06);
  const r=Math.min(w,h)*(p.radius||.28);
  ctx.save();ctx.translate(cx,cy);ctx.lineWidth=a.line;
  const rings=p.rings||5;
  for(let i=0;i<rings;i++){
    const rr=r*(.35+i/rings*.9);
    ctx.strokeStyle=rgba(i%2?a.accent:a.accent2,.26+.45*(i/rings));
    ctx.beginPath();
    ctx.ellipse(0,0,rr,rr*(.46+.12*Math.sin(t*.3+i)),t*a.speed*(i%2?1:-1)*.12+i*.3,0,TAU);
    ctx.stroke();
  }
  const nodes=p.nodes||8;
  for(let i=0;i<nodes;i++){
    const ang=i/nodes*TAU+t*a.speed*(i%2?1:-1)*.2;
    const rr=r*(.7+.2*Math.sin(i*2.7+t*.2));
    const x=Math.cos(ang)*rr,y=Math.sin(ang)*rr*.55;
    ctx.fillStyle=rgba(i%3?a.accent:a.fg,.65);
    circle(ctx,x,y,2.2+3*s.signal,true);
  }
  ctx.strokeStyle=rgba(a.fg,.65);line(ctx,-r,0,r,0);line(ctx,0,-r*.72,0,r*.72);
  ctx.fillStyle=rgba(a.accent,.9);circle(ctx,0,0,8+16*(.3+s.focus),true);
  ctx.restore();
}
