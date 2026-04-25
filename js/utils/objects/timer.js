export class Timer {
  constructor(duration) {
    this.duration = duration;
    this.elapsed = 0;
  }

  update(deltaTime) {
    this.elapsed += deltaTime;
  }

  isReady() {
    const isReady = this.elapsed >= this.duration;
    if (isReady) this.elapsed = 0;
    return isReady;
  }
}
