
export class KodexAudioProbe{
  constructor(){
    this.ctx=null;this.analyser=null;this.data=null;this.source=null;
  }
  async attachMedia(element){
    this.ctx ??= new AudioContext();
    this.source=this.ctx.createMediaElementSource(element);
    this.analyser=this.ctx.createAnalyser();
    this.analyser.fftSize=512;
    this.source.connect(this.analyser);this.analyser.connect(this.ctx.destination);
    this.data=new Uint8Array(this.analyser.frequencyBinCount);
    await this.ctx.resume();
  }
  read(){
    if(!this.analyser||!this.data)return {low:0,mid:0,high:0,rms:0,beat:false};
    this.analyser.getByteFrequencyData(this.data);
    const avg=(a,b)=>{let s=0;for(let i=a;i<b;i++)s+=this.data[i];return s/Math.max(1,b-a)/255};
    const low=avg(0,20),mid=avg(20,90),high=avg(90,this.data.length);
    const rms=(low*.5+mid*.35+high*.15);
    return {low,mid,high,rms,beat:low>.72};
  }
}
