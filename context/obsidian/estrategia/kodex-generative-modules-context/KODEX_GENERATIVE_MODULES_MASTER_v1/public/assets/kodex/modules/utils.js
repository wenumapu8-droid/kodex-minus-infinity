
export const TAU = Math.PI * 2;
export const clamp = (v, a=0, b=1) => Math.max(a, Math.min(b, v));
export const lerp = (a,b,t) => a + (b-a)*t;
export const map = (v,a,b,c,d) => c + (d-c) * ((v-a)/(b-a || 1));
export const fract = v => v - Math.floor(v);
export const hash = n => fract(Math.sin(n * 127.1) * 43758.5453123);
export const hash2 = (x,y) => hash(x*37.17 + y*91.7);
export const ease = t => t*t*(3-2*t);

export function hexToRgb(hex){
  const h = hex.replace('#','');
  const v = parseInt(h.length===3 ? h.split('').map(x=>x+x).join('') : h,16);
  return {r:(v>>16)&255,g:(v>>8)&255,b:v&255};
}
export function rgba(hex, a=1){
  const {r,g,b}=hexToRgb(hex);
  return `rgba(${r},${g},${b},${a})`;
}
export function withAlpha(ctx, alpha, fn){
  const prev = ctx.globalAlpha;
  ctx.globalAlpha = alpha;
  fn();
  ctx.globalAlpha = prev;
}
export function line(ctx, x1,y1,x2,y2){
  ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();
}
export function circle(ctx,x,y,r,fill=false){
  ctx.beginPath();ctx.arc(x,y,r,0,TAU);fill?ctx.fill():ctx.stroke();
}
export function polygon(ctx, pts, close=true){
  if(!pts.length)return;
  ctx.beginPath();ctx.moveTo(pts[0][0],pts[0][1]);
  for(let i=1;i<pts.length;i++)ctx.lineTo(pts[i][0],pts[i][1]);
  if(close)ctx.closePath();ctx.stroke();
}
export function seededPoints(count, seed=1){
  return Array.from({length:count},(_,i)=>({
    x:hash2(i+seed,1),y:hash2(i+seed,2),z:hash2(i+seed,3),
    phase:hash2(i+seed,4)*TAU
  }));
}
