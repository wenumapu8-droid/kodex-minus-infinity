
import * as RENDERERS from '../renderers/index.js';
import {getModule,getAtmosphere} from './registry.js';
import {createWorldState,mergeWorldState} from './state.js';
import {QUALITY_PROFILES,autoQuality} from './performance.js';
import {rgba} from './utils.js';

function resolve(value,label){
  if(typeof value==='string'){
    const el=document.querySelector(value);
    if(!el)throw new Error(`KODEX module: ${label} not found: ${value}`);
    return el;
  }
  if(!value)throw new Error(`KODEX module: ${label} is required`);
  return value;
}
export class KodexGenerativeModule{
  constructor(options={}){
    this.canvas=resolve(options.canvas,'canvas');
    this.ctx=this.canvas.getContext('2d',{alpha:false,desynchronized:true});
    if(!this.ctx)throw new Error('KODEX module: Canvas 2D unavailable');
    this.module=getModule(options.module||'observe-core');
    this.atmosphereName=options.atmosphere||'deep';
    this.atmosphere=getAtmosphere(this.atmosphereName);
    this.qualityName=options.quality||autoQuality();
    this.quality=QUALITY_PROFILES[this.qualityName]||QUALITY_PROFILES.balanced;
    this.state=createWorldState();
    this.running=false;this.last=0;this.raf=0;this.destroyed=false;
    this.metrics={fps:0,frameTime:0,droppedFrames:0,module:this.module.id,quality:this.qualityName};
    this.pointer={x:.5,y:.5,px:.5,py:.5};
    this.resizeObserver=new ResizeObserver(()=>this.resize());
    this.resizeObserver.observe(this.canvas.parentElement||this.canvas);
    this.onMove=e=>this.#pointer(e);
    this.canvas.addEventListener('pointermove',this.onMove);
    this.canvas.addEventListener('pointerenter',()=>this.state.pointer.active=true);
    this.canvas.addEventListener('pointerleave',()=>this.state.pointer.active=false);
    this.onVisibility=()=>document.hidden?this.stop():this.start();
    document.addEventListener('visibilitychange',this.onVisibility);
    this.resize();
    window.__KODEX_MODULE_METRICS__=this.metrics;
    if(options.autoStart!==false)this.start();
  }
  #pointer(e){
    const r=this.canvas.getBoundingClientRect();
    const x=(e.clientX-r.left)/Math.max(1,r.width),y=(e.clientY-r.top)/Math.max(1,r.height);
    this.state.pointer={x,y,vx:x-this.pointer.x,vy:y-this.pointer.y,active:true};
    this.pointer={x,y};
  }
  resize(){
    const host=this.canvas.parentElement||this.canvas;
    const r=host.getBoundingClientRect();
    const dpr=Math.min(devicePixelRatio||1,this.quality.dpr);
    const w=Math.max(2,Math.round(r.width*dpr*this.quality.scale));
    const h=Math.max(2,Math.round(r.height*dpr*this.quality.scale));
    if(this.canvas.width!==w||this.canvas.height!==h){this.canvas.width=w;this.canvas.height=h;}
  }
  setModule(id){this.module=getModule(id);this.metrics.module=id;}
  setAtmosphere(id){this.atmosphereName=id;this.atmosphere=getAtmosphere(id);}
  setQuality(id){
    if(!QUALITY_PROFILES[id])throw new Error(`Unknown quality: ${id}`);
    this.qualityName=id;this.quality=QUALITY_PROFILES[id];this.metrics.quality=id;this.resize();
  }
  setState(patch){this.state=mergeWorldState(this.state,patch);}
  start(){
    if(this.running||this.destroyed)return;
    this.running=true;this.last=performance.now();this.raf=requestAnimationFrame(t=>this.#frame(t));
  }
  stop(){this.running=false;if(this.raf)cancelAnimationFrame(this.raf);}
  #frame(now){
    if(!this.running||this.destroyed)return;
    const interval=1000/this.quality.fps;
    const dt=now-this.last;
    if(dt<interval){this.raf=requestAnimationFrame(t=>this.#frame(t));return;}
    this.last=now-(dt%interval);
    this.render(now*.001);
    const fps=1000/Math.max(.001,dt);
    this.metrics.fps=Math.round(this.metrics.fps*.85+fps*.15);
    this.metrics.frameTime=Number((this.metrics.frameTime*.85+dt*.15).toFixed(2));
    if(dt>interval*1.65)this.metrics.droppedFrames++;
    window.__KODEX_MODULE_METRICS__=this.metrics;
    this.raf=requestAnimationFrame(t=>this.#frame(t));
  }
  render(t){
    const ctx=this.ctx,w=this.canvas.width,h=this.canvas.height;
    const a=this.atmosphere,m=this.module,s=this.state,p=m.params,q=this.quality;
    ctx.fillStyle=a.bg;ctx.fillRect(0,0,w,h);
    const renderer=RENDERERS[m.renderer];
    if(!renderer)throw new Error(`Renderer not found: ${m.renderer}`);
    renderer(ctx,{w,h,t,a,s,p,m,q});
    this.#composite(w,h,t);
  }
  #composite(w,h,t){
    const ctx=this.ctx,a=this.atmosphere;
    if(a.noise>0){
      const n=Math.floor(80*a.density);
      for(let i=0;i<n;i++){
        const x=(Math.sin(i*91.17+t*7.1)*.5+.5)*w;
        const y=(Math.sin(i*37.91+t*5.3)*.5+.5)*h;
        ctx.fillStyle=rgba(a.fg,a.noise*.22);ctx.fillRect(x,y,1,1);
      }
    }
    const g=ctx.createRadialGradient(w/2,h/2,Math.min(w,h)*.18,w/2,h/2,Math.max(w,h)*.72);
    g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.58)');
    ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
  }
  destroy(){
    if(this.destroyed)return;this.destroyed=true;this.stop();
    this.resizeObserver.disconnect();this.canvas.removeEventListener('pointermove',this.onMove);
    document.removeEventListener('visibilitychange',this.onVisibility);
    if(window.__KODEX_MODULE_METRICS__===this.metrics)delete window.__KODEX_MODULE_METRICS__;
  }
}
export function mountKodexModule(options){return new KodexGenerativeModule(options);}
