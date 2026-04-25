import { lerp, clamp } from '@utils/Mat.js';

export class SmoothValue {
  constructor(duration) {
    this.duration = duration;
    this.timeElapsed = 0;

    this.start = 0;
    this.target = 0;
  }

  update(deltaTime) {
    this.timeElapsed += deltaTime;
  }

  setTarget(newTarget) {
    if (newTarget === this.target) return;

    this.start = this.getCurrent();
    this.target = newTarget;
    this.timeElapsed = 0;
  }

  getCurrent() {
    return Math.round(lerp(this.start, this.target, this.#getDelta()));
  }

  #getDelta() {
    return clamp(this.timeElapsed / this.duration, 0, 1);
  }
}
