
import {rgba,clamp} from '../utils.js';
export function renderField(ctx,e){
  const {w,h,t,a,s,p,m}=e;
  const step=Math.max(8,Math.floor(Math.min(w,h)/(p.resolution||34)));
  ctx.save();ctx.lineWidth=a.line*.75;
  for(let y=0;y<h;y+=step){
    ctx.beginPath();
    for(let x=0;x<w;x+=step){
      const nx=x/w-.5,ny=y/h-.5;
      const r=Math.hypot(nx,ny);
      const v=Math.sin(nx*16+t*a.speed)+Math.cos(ny*19-t*a.speed*.7)+Math.sin((nx+ny)*23+t*.4);
      const warp=Math.sin(r*42-t*a.speed*2)*step*(p.warp||.7);
      const yy=y+warp*(.35+.65*clamp(s.anomaly+.2));
      x===0?ctx.moveTo(x,yy):ctx.lineTo(x,yy);
    }
    ctx.strokeStyle=rgba((y/step)%3?a.accent:a.accent2,.05+.18*(1-y/h));
    ctx.stroke();
  }
  if(m.id==='acid-cellular'||m.id==='viral-bloom'||m.id==='noise-puddle'){
    const cells=28;
    for(let i=0;i<cells;i++){
      const x=w*(.1+((i*37)%100)/100*.8),y=h*(.12+((i*61)%100)/100*.76);
      const rr=(8+(i%7)*4)*(1+.2*Math.sin(t*a.speed+i));
      ctx.fillStyle=rgba(i%3?a.accent:a.accent2,.04+.08*(i%5));
      ctx.beginPath();ctx.ellipse(x,y,rr*1.8,rr,Math.sin(i)*1.2,0,Math.PI*2);ctx.fill();
    }
  }
  ctx.restore();
}
