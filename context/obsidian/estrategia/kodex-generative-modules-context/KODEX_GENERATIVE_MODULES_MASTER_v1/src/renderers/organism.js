
import {TAU,rgba,line,circle} from '../core/utils.js';
export function renderOrganism(ctx,e){
  const {w,h,t,a,s,p,m}=e,cx=w/2,cy=h/2;
  ctx.save();ctx.translate(cx,cy);ctx.lineWidth=a.line;
  const seg=p.segments||42;
  if(m.id==='moth-oracle'||m.id==='insect-choir'||m.id==='scarab-map'||m.id==='feather-array'){
    const wings=m.id==='insect-choir'?5:1;
    for(let q=0;q<wings;q++){
      ctx.save();ctx.translate((q-(wings-1)/2)*w*.12,Math.sin(q)*20);ctx.scale(wings>1?.45:1,wings>1?.45:1);
      for(const side of [-1,1]){
        ctx.beginPath();
        for(let i=0;i<seg;i++){
          const u=i/(seg-1),ang=-1.25+u*2.5;
          const rr=Math.min(w,h)*(.1+.22*Math.sin(u*Math.PI))*(1+.08*Math.sin(t*a.speed+u*9));
          const x=side*(Math.cos(ang)*rr+u*40),y=Math.sin(ang)*rr;
          i?ctx.lineTo(x,y):ctx.moveTo(x,y);
        }
        ctx.strokeStyle=rgba(side>0?a.accent:a.accent2,.62);ctx.stroke();
      }
      ctx.fillStyle=rgba(a.fg,.75);circle(ctx,0,0,5,true);ctx.restore();
    }
  } else if(m.id==='serpent-helix'){
    for(const side of [-1,1]){
      ctx.beginPath();
      for(let i=0;i<seg;i++){
        const u=i/(seg-1),y=(u-.5)*h*.62,x=side*Math.sin(u*TAU*3+t*a.speed)*w*.08;
        i?ctx.lineTo(x,y):ctx.moveTo(x,y);
      }
      ctx.strokeStyle=rgba(side>0?a.accent:a.accent2,.75);ctx.stroke();
    }
  } else if(m.id==='eye-cluster'){
    for(let i=0;i<11;i++){
      const ang=i/11*TAU,r=Math.min(w,h)*(.08+.2*(i%3)/3);
      const x=Math.cos(ang+t*.08)*r,y=Math.sin(ang+t*.08)*r*.65;
      ctx.strokeStyle=rgba(a.accent,.45);ctx.beginPath();ctx.ellipse(x,y,18,8,ang,0,TAU);ctx.stroke();
      ctx.fillStyle=rgba(a.fg,.75);circle(ctx,x,y,2.5,true);
    }
  } else {
    const breath=1+.08*Math.sin(t*a.speed);
    ctx.strokeStyle=rgba(a.accent,.62);
    for(let k=0;k<8;k++){
      ctx.beginPath();
      for(let i=0;i<seg;i++){
        const u=i/(seg-1),ang=u*TAU*2+k*TAU/8;
        const rr=Math.min(w,h)*(.04+.24*u)*breath;
        const x=Math.cos(ang)*rr,y=Math.sin(ang)*rr*.55;
        i?ctx.lineTo(x,y):ctx.moveTo(x,y);
      }
      ctx.stroke();
    }
    ctx.fillStyle=rgba(a.accent,.8);circle(ctx,0,0,10+18*s.focus,true);
  }
  ctx.restore();
}
