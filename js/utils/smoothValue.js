import { TICK_TIME } from "../consts.js";
import { lerp, clamp } from "./mat.js";

export class SmoothValue {
  constructor(duration) {
    this.duration = duration;
    this.timeElapsed = 0;

    this.start = 0;
    this.target = 0;
  }

  update() {
    this.timeElapsed += TICK_TIME;
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