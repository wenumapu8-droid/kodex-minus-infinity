
import {TAU,rgba,line,clamp} from '../utils.js';
export function renderPortal(ctx,e){
  const {w,h,t,a,s,p}=e,cx=w/2,cy=h/2,r=Math.min(w,h)*.34;
  ctx.save();ctx.translate(cx,cy);ctx.lineWidth=a.line;
  const rings=p.rings||7;
  for(let j=0;j<rings;j++){
    const rr=r*(.22+j/rings*.95);
    const segs=p.segments||24;
    for(let i=0;i<segs;i++){
      const ang=i/segs*TAU+t*a.speed*(j%2?-.08:.08);
      const gap=.035+.03*Math.sin(t+i+j);
      ctx.strokeStyle=rgba((i+j)%4?a.accent:a.accent2,.18+.65*j/rings);
      ctx.beginPath();ctx.arc(0,0,rr,ang,ang+TAU/segs*(.62-gap));ctx.stroke();
    }
  }
  const open=clamp((p.open||.72)+s.signal*.2);
  ctx.strokeStyle=rgba(a.fg,.82);ctx.lineWidth=a.line*1.5;
  const arm=r*(.45+.45*open);
  for(let k=0;k<4;k++){ctx.save();ctx.rotate(k*TAU/4);line(ctx,arm*.35,0,arm,0);ctx.restore();}
  ctx.restore();
}
