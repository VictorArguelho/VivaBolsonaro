const prefixes = ["", "K", "M", "B", "T"];

export function formatNumber(number, precision) {
  const length = number.toString().length;
  const prefixeIndex = Math.trunc((length - 1) / 3);
  const precisionPowered = Math.pow(10, precision);

  if (prefixeIndex === 0) {
    return number;
  }

  const trunced = Math.trunc(
    (number / Math.pow(1000, prefixeIndex)) * precisionPowered,
  );
  return `${trunced / precisionPowered}${prefixes[prefixeIndex]}`;
}