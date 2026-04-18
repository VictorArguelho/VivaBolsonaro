import { TICK_TIME } from "../../consts.js";

export class Timer {
  constructor(duration) {
    this.duration = duration;
    this.elapsed = 0;
  }

  update() {
    this.elapsed += TICK_TIME;
  }

  isReady() {
    const isReady = this.elapsed >= this.duration;
    if (isReady) this.elapsed = 0;
    return isReady;
  }
}