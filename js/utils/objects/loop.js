export class Loop {
  constructor(frameTime) {
    this.frameTime = frameTime;
    this.lastTime = 0;
    this.callbacks = [];
  }

  start() {
    this.lastTime = performance.now();
    requestAnimationFrame(this.#loop.bind(this));
  }

  addUpdateCallback(callback) {
    this.callbacks.push(callback);
  }

  #loop(now) {
    const elapsed = now - this.lastTime;

    if (elapsed >= this.frameTime) {
      this.#runCallbacks(elapsed);
      this.lastTime = now;
    }

    requestAnimationFrame(this.#loop.bind(this));
  }

  #runCallbacks(deltaTime) {
    for (const callback of this.callbacks) {
      callback(deltaTime);
    }
  }
}
