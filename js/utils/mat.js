export class Mat {
  static lerp(a, b, t) {
    return a + (b - a) * t;
  }

  static clamp(value, min, max) {
    if (value > max) return max;
    if (value < min) return min;
    return value;
  }
}