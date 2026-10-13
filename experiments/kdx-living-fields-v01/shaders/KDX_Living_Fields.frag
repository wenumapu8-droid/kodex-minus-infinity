
  precision highp float;
  uniform vec2 u_res;
  uniform float u_time,u_mode,u_resonance,u_turbulence,u_persistence,u_open,u_presence,u_seed;
  uniform vec2 u_pointer;
  uniform vec3 u_c0,u_c1,u_c2;
  uniform vec4 u_marks[12];
  const float PI=3.14159265359;
  float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}
  float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x),f.y);}
  float fbm(vec2 p){float a=.5,v=0.;for(int j=0;j<4;j++){v+=a*noise(p);p=mat2(1.6,1.2,-1.2,1.6)*p+3.7;a*=.5;}return v;}
  float bell(float v,float width){return exp(-v*v*width);}
  float particle(vec2 p, vec2 point,float size){return size/(size+dot(p-point,p-point));}
  void main(){
    vec2 uv=gl_FragCoord.xy/u_res;
    vec2 p=(gl_FragCoord.xy-.5*u_res)/min(u_res.x,u_res.y);
    vec2 mp=(u_pointer-.5)*u_res/min(u_res.x,u_res.y);
    float t=u_time*(.17+u_resonance*.47);
    float n1=fbm(p*3.05+vec2(t*.20+u_seed,-t*.16));
    float n2=fbm(p*5.40+vec2(-t*.24,n1*.84+t*.14)+u_seed*.5);
    float mouseField=exp(-dot(p-mp,p-mp)*7.0)*u_presence;
    vec2 displacement=u_turbulence*.115*vec2(n1-.48,n2-.47)+u_presence*.037*vec2(n2-.5,n1-.5)*exp(-dot(p-mp,p-mp)*14.0);
    vec2 q=p+displacement;
    float r=length(q),a=atan(q.y,q.x);
    float breathing=sin(t*.66)*.012;
    vec3 color=vec3(.008,.006,.016) + u_c2*.023 +u_c2*.028*(1.-smoothstep(.1,.94,r));
    // Disjoint field identities share organic domain warping but not geometry.
    if(u_mode<.5){
      float aperture=.253+.039*u_open+breathing;
      float wav=sin(a*9.0+t*.73)*.006+sin(a*17.-t*.9)*.004+(n1-.48)*.017*u_turbulence;
      float d=r-aperture-wav;
      float bright=bell(d,9000.)*.99+bell(d,560.)*.15;
      float outer=bell(r-(aperture+.065+sin(a*6.-t*.37)*.009),4300.)*.25;
      float outer2=bell(r-(aperture+.146+(n2-.5)*.016),1500.)*.11;
      float fil=pow(abs(sin(a*18.+r*28.-t*1.2+n1*4.)),22.)*smoothstep(.17,.37,r)*(1.-smoothstep(.49,.71,r));
      float plasma=bell(r-(aperture+.03),110.)*(.11+.3*n2)*(.5+.5*sin(a*6.-t*.5));
      float crossing=bell(q.y,5400.)*smoothstep(.25,.38,abs(q.x))*(1.-smoothstep(.65,.8,abs(q.x)))*.24;
      float iris=bell(r-.11,200.)*.025+bell(r-.023,400.)*(u_open*.21+.035);
      color+=u_c0*(bright*.72+outer*.45+fil*.23+plasma+crossing)+u_c1*(bright*.48+outer2+fil*.17+iris)+u_c2*bell(r-.47,18.)*.075;
      color+=u_c1*mouseField*(.05+.06*u_open);
      color*=1.-.37*smoothstep(aperture-.015,aperture+.009,r)*(1.-smoothstep(aperture+.095,aperture+.19,r));
    } else if(u_mode<1.5){
      float swirl=a+1.25/(r+.035)*.035+sin(r*17.-t*.55)*.05;
      float band=sin(r*78.-swirl*4.5+n1*5.-t*.8);
      float disk=smoothstep(.47,.24,r)*smoothstep(.075,.16,r);
      float marrow=pow(max(0.,band),15.)*disk;
      float rings=bell(sin(r*41.+n2*2.+t*.3),160.)*disk*.38;
      float petals=pow(abs(cos(7.*a+n1*2.1+t*.17)),16.)*bell(r-.31,120.)*.49;
      float core=bell(r-.14,2400.)*.80+bell(r-.34,3300.)*.53+bell(r-.415,2200.)*.22;
      float texture=bell(r-.26,21.)*(n1*n1)*.20;
      float thread=bell(sin(a*12.+r*18.+n2*5.-t*.4),700.)*bell(r-.35,80.)*.31;
      color+=u_c0*(marrow*.45+rings*.32+petals*.27+texture+core*.61+thread);
      color+=u_c1*(marrow*.17+core*.41+petals*.23+thread*.16);
      color+=u_c2*(disk*.15+bell(r-.58,38.)*.05);
      color+=u_c1*mouseField*.075;
    } else {
      float angle=a+sin(r*4.+t*.2)*.16;
      float arms=pow(abs(sin(angle*5.0 - log(r+.035)*2.5 + t*.24 + n1*2.6)),12.);
      float shell=bell(r-.29-sin(a*7.+t*.4)*.007,7000.)*.87;
      float shell2=bell(r-.37+sin(a*13.-t*.7)*.01,3100.)*.36;
      float corona=arms*bell(r-.37,24.)*.51;
      float fold=bell(sin((r+.02)*56.-a*2.+n2*4.-t*.37),110.)*bell(r-.35,53.)*.36;
      float star=bell(r,3500.)*.66+bell(r-.12,4000.)*.31;
      float grid=bell(sin(a*24.+t*.15),500.)*bell(r-.43,55.)*.19;
      color+=u_c0*(shell*.55+shell2*.35+corona*.44+grid+fold*.40+star*.33);
      color+=u_c1*(shell*.53+shell2*.21+corona*.21+fold*.21+star*.77);
      color+=u_c2*bell(r-.65,11.)*.08;
      color+=u_c1*mouseField*.065;
    }
    // A cross-mode memory field: signed timestamped imprints do not vanish on mode changes.
    for(int i=0;i<12;i++){
      vec4 mark=u_marks[i];
      float age=max(0.,u_time-mark.w);
      float strength=mark.z*exp(-age/(3.+u_persistence*240.));
      vec2 m=(mark.xy-.5)*u_res/min(u_res.x,u_res.y);
      float dr=length(p-m);
      float echo=bell(dr-(.025+age*.007),2100.)*.22+bell(dr-.011,9000.)*.20;
      float residue=exp(-dr*dr*70.)*.055;
      color+=u_c1*strength*(echo+residue);
    }
    // Stable technical reticle & controlled granular surface.
    float reticle=(bell(p.x,135000.)+bell(p.y,135000.))*(1.-smoothstep(.10,.13,r))*u_open*.20;
    color+=u_c1*reticle;
    float stardust=step(.997,hash(floor(p*265.+u_seed*37.)))*(.08+.04*max(0.,sin(t*.28+p.x*3.)));
    color+=u_c1*stardust*(1.-smoothstep(.62,.91,r));
    float vignette=1.-.50*smoothstep(.36,1.02,length(p));
    float grain=(hash(gl_FragCoord.xy+u_seed*17.)-.5)*.013;
    color=max(vec3(0.),color*vignette+grain);
    color=1.-exp(-color*1.55);
    color=pow(color,vec3(.90));
    gl_FragColor=vec4(color,1.);
  }
