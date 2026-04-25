const prefixes = ['', 'K', 'M', 'B', 'T'];

export function formatNumber(number, precision = 1) {
  if (number < 1000) return String(number);

  const prefixeIndex = Math.floor(Math.log10(number) / 3);
  const scaled = number / Math.pow(1000, prefixeIndex);

  return `${scaled.toFixed(precision)}${prefixes[prefixeIndex]}`;
}
