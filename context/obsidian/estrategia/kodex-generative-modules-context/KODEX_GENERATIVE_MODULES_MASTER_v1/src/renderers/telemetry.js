
import {TAU,rgba,line,circle,clamp} from '../core/utils.js';
export function renderTelemetry(ctx,e){
  const {w,h,t,a,s,p,m}=e;
  ctx.save();ctx.lineWidth=a.line;
  const title=m.title;
  if(m.id==='radar-sweep'||m.id==='relic-crosshair'){
    const cx=w/2,cy=h/2,r=Math.min(w,h)*.3;
    ctx.strokeStyle=rgba(a.accent,.45);
    for(let i=1;i<=4;i++)circle(ctx,cx,cy,r*i/4,false);
    line(ctx,cx-r,cy,cx+r,cy);line(ctx,cx,cy-r,cx,cy+r);
    const ang=t*a.speed*.7;
    const grd=ctx.createLinearGradient(cx,cy,cx+Math.cos(ang)*r,cy+Math.sin(ang)*r);
    grd.addColorStop(0,rgba(a.accent,.75));grd.addColorStop(1,rgba(a.accent,0));
    ctx.strokeStyle=grd;ctx.lineWidth=3;line(ctx,cx,cy,cx+Math.cos(ang)*r,cy+Math.sin(ang)*r);
  } else if(m.id==='scene-dots'||m.id==='protocol-tabs'){
    const n=m.id==='scene-dots'?7:5,y=h*.55;
    for(let i=0;i<n;i++){
      const x=w*(.18+i/(n-1)*.64);
      ctx.fillStyle=rgba(i<=Math.floor(s.progress*(n-1))?a.accent:a.fg,i<=Math.floor(s.progress*(n-1))?.9:.18);
      circle(ctx,x,y,m.id==='scene-dots'?5:8,true);
      if(m.id==='protocol-tabs'){ctx.strokeStyle=rgba(a.fg,.18);ctx.strokeRect(x-38,y-16,76,32);}
    }
  } else {
    const bars=p.bars||28,baseY=h*.58,left=w*.12,right=w*.88;
    for(let i=0;i<bars;i++){
      const x=left+i/(bars-1)*(right-left);
      const v=.2+.8*(.5+.5*Math.sin(i*.55+t*a.speed*2+s.signal*3));
      ctx.fillStyle=rgba(i%5?a.accent:a.accent2,.28+.62*v);
      ctx.fillRect(x,baseY-h*.18*v,Math.max(2,(right-left)/bars*.55),h*.18*v);
    }
    ctx.strokeStyle=rgba(a.fg,.28);line(ctx,left,baseY,right,baseY);
  }
  ctx.fillStyle=rgba(a.fg,.7);ctx.font=`${Math.max(10,w/95)}px ui-monospace`;
  ctx.fillText(`${m.code} / ${title}`,w*.06,h*.1);
  ctx.restore();
}
