import { SmoothValue } from "./smoothValue.js";

export class Value {
  constructor(smoothDuration, startValue) {
    this.smoothValue = new SmoothValue(smoothDuration);
    this.value = startValue;
    this.setValue(startValue);
  }

  update() {
    this.smoothValue.update();
  }

  getValue() {
    return this.value;
  }

  getSmoothedValue() {
    return this.smoothValue.getCurrent();
  }

  setValue(value) {
    this.value = value;
    this.smoothValue.setTarget(value);
  }

  addValue(value) {
    this.setValue(this.getValue() + value);
  }
}