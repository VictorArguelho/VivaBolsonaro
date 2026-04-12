import { TICK_TIME } from "../consts.js";
import { Mat } from "./Mat.js";

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
    this.start = this.getCurrent();
    this.target = newTarget;
    this.timeElapsed = 0;
  }

  getCurrent() {
    return Math.round(Mat.lerp(this.start, this.target, this.#getDelta()));
  }

  #getDelta() {
    return Mat.clamp(this.timeElapsed / this.duration, 0, 1);
  }
}