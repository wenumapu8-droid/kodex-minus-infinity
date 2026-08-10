
import {rgba,line} from '../core/utils.js';
export function renderArchitecture(ctx,e){
  const {w,h,t,a,s,p,m}=e;
  const cx=w*(.5+(s.pointer.x-.5)*.12),cy=h*(.46+(s.pointer.y-.5)*.08);
  ctx.save();ctx.lineWidth=a.line;
  const depth=p.depth||9;
  for(let z=0;z<depth;z++){
    const u=z/(depth-1),scale=.08+u*.9;
    const ww=w*.68*scale,hh=h*.58*scale;
    ctx.strokeStyle=rgba(z%2?a.accent:a.accent2,.08+.48*u);
    const ox=Math.sin(t*a.speed*.25+z)*w*.015*(m.id==='wrinkled-reality'?3:1);
    ctx.strokeRect(cx-ww/2+ox,cy-hh/2,ww,hh);
  }
  ctx.strokeStyle=rgba(a.fg,.28);
  const corners=[[w*.16,h*.17],[w*.84,h*.17],[w*.16,h*.78],[w*.84,h*.78]];
  for(const [x,y] of corners)line(ctx,x,y,cx,cy);
  if(m.id==='split-corridor'||m.id==='double-face-form'){
    line(ctx,cx,cy,w*.28,h*.5);line(ctx,cx,cy,w*.72,h*.5);
  }
  if(m.id==='ripple-floor'){
    for(let i=0;i<18;i++){
      const y=h*(.55+i/18*.4);
      ctx.beginPath();
      for(let x=0;x<w;x+=8){const yy=y+Math.sin(x*.025+t*a.speed+i*.2)*8*(i/18);x?ctx.lineTo(x,yy):ctx.moveTo(x,yy);}
      ctx.stroke();
    }
  }
  ctx.restore();
}
