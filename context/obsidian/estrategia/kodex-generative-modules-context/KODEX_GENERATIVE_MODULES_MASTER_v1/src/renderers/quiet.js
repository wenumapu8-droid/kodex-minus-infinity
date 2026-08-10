
import {rgba,line} from '../core/utils.js';
export function renderQuiet(ctx,e){
  const {w,h,t,a,s,p,m}=e;
  ctx.save();
  const massW=w*(p.mass||.28),massH=h*(m.id==='threshold-card'?.42:.52);
  const left=m.id==='floating-note'?w*.56:w*.14,top=h*.2;
  ctx.fillStyle=rgba(a.fg,.055);ctx.fillRect(left,top,massW,massH);
  ctx.strokeStyle=rgba(a.fg,.28);ctx.strokeRect(left,top,massW,massH);
  if(['quiet-frame','monolith-page','threshold-card','archive-card','case-panel'].includes(m.id)){
    ctx.fillStyle=rgba(a.accent,.08);ctx.fillRect(left+massW*.1,top+massH*.12,massW*.72,massH*.68);
  }
  ctx.strokeStyle=rgba(a.fg,.55);ctx.lineWidth=a.line*5;
  if(m.id==='quiet-frame'||m.id==='split-image-panel'){
    for(let i=0;i<3;i++){const y=top+massH*(.16+i*.28);line(ctx,left-massW*.08,y,left+massW*.22,y);}
  }
  ctx.fillStyle=rgba(a.fg,.7);ctx.font=`${Math.max(10,w/100)}px ui-monospace`;
  ctx.fillText(m.code,left,top+massH+28);
  ctx.fillStyle=rgba(a.fg,.36);ctx.fillText(m.title,left,top+massH+48);
  ctx.save();ctx.translate(w*.9,h*.22);ctx.rotate(Math.PI/2);
  ctx.fillText(`${m.scene} / STATUS QUIET`,0,0);ctx.restore();
  ctx.restore();
}
