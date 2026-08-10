import { mountKodexModule } from '../src/core/engine.js';
import { MODULES, ATMOSPHERES } from '../src/core/registry.js';

const moduleSelect=document.querySelector('#module');
const atmosphereSelect=document.querySelector('#atmosphere');
const qualitySelect=document.querySelector('#quality');
const metrics=document.querySelector('#metrics');

for(const m of MODULES){
  const o=document.createElement('option');o.value=m.id;o.textContent=`${String(m.index).padStart(2,'0')} · ${m.title}`;moduleSelect.appendChild(o);
}
for(const id of Object.keys(ATMOSPHERES)){
  const o=document.createElement('option');o.value=o.textContent=id;atmosphereSelect.appendChild(o);
}
moduleSelect.value='observe-core';atmosphereSelect.value='deep';

const engine=mountKodexModule({
  canvas:'#canvas',
  module:moduleSelect.value,
  atmosphere:atmosphereSelect.value,
  quality:qualitySelect.value,
});
moduleSelect.addEventListener('change',()=>engine.setModule(moduleSelect.value));
atmosphereSelect.addEventListener('change',()=>engine.setAtmosphere(atmosphereSelect.value));
qualitySelect.addEventListener('change',()=>engine.setQuality(qualitySelect.value));
document.querySelector('#random').addEventListener('click',()=>{
  const m=MODULES[Math.floor(Math.random()*MODULES.length)];
  const a=Object.keys(ATMOSPHERES)[Math.floor(Math.random()*Object.keys(ATMOSPHERES).length)];
  moduleSelect.value=m.id;atmosphereSelect.value=a;engine.setModule(m.id);engine.setAtmosphere(a);
});
setInterval(()=>{
  const m=window.__KODEX_MODULE_METRICS__;
  if(m)metrics.textContent=`${m.module} · ${m.quality} · ${m.fps} FPS · ${m.frameTime} ms`;
},500);
