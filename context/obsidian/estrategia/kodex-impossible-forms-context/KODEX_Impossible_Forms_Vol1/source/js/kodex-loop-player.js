export class KodexLoopPlayer {
  constructor(video, options = {}) {
    if (!(video instanceof HTMLVideoElement)) throw new TypeError("video must be an HTMLVideoElement");
    this.video = video;
    this.video.muted = true;
    this.video.loop = true;
    this.video.playsInline = true;
    this.setSpeed(options.speed ?? 1);
  }
  setSpeed(value) {
    const speed = Math.max(0.25, Math.min(2, Number(value)));
    this.video.playbackRate = speed;
    return speed;
  }
  async play() { await this.video.play(); }
  pause() { this.video.pause(); }
  toggle() { return this.video.paused ? this.play() : this.pause(); }
  setLoopSource(url) { this.video.src = url; this.video.load(); }
}
