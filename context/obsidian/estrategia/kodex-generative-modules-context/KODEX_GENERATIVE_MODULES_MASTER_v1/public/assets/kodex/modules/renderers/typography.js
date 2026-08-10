
import {rgba,hash2,TAU} from '../utils.js';
const chars='KODEX0123456789∞△◇□○/\\\\|:+*';
export function renderTypography(ctx,e){
  const {w,h,t,a,s,p,m}=e;
  ctx.save();ctx.textAlign='center';ctx.textBaseline='middle';
  if(m.id==='character-halo'){
    const cx=w/2,cy=h/2,r=Math.min(w,h)*.28;
    ctx.font=`${Math.max(10,w/80)}px ui-monospace`;
    for(let i=0;i<28;i++){
      const ang=i/28*TAU+t*a.speed*.08;
      ctx.fillStyle=rgba(i%4?a.accent:a.accent2,.25+.55*(i%5)/5);
      ctx.fillText(chars[i%chars.length],cx+Math.cos(ang)*r,cy+Math.sin(ang)*r);
    }
  }else if(m.id==='modular-sigil-wordmark'){
    ctx.font=`700 ${Math.max(28,w/13)}px ui-monospace`;
    ctx.fillStyle=rgba(a.fg,.9);ctx.fillText('KODEX−∞',w/2,h/2);
    ctx.strokeStyle=rgba(a.accent,.5);ctx.strokeRect(w*.18,h*.36,w*.64,h*.28);
  }else{
    const cols=p.columns||18,rows=p.rows||12;
    ctx.font=`${Math.max(9,w/70)}px ui-monospace`;
    for(let y=0;y<rows;y++)for(let x=0;x<cols;x++){
      const n=hash2(x+y*cols,Math.floor(t*a.speed*(m.id==='linguistic-evolution'?2:8)));
      const ch=chars[Math.floor(n*chars.length)%chars.length];
      ctx.fillStyle=rgba(n>.78?a.accent:a.fg,.08+.62*n);
      const xx=w*(.08+x/(cols-1)*.84),yy=h*(.12+y/(rows-1)*.76);
      ctx.fillText(ch,xx,yy);
    }
  }
  ctx.restore();
}
