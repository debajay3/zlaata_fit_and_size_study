export function formatAnswer(value: unknown): string {
  if (value === null || value === undefined || value === '') return '';
  if (Array.isArray(value)) return value.map(formatAnswer).join('; ');
  if (typeof value === 'object') return Object.entries(value).map(([key, v]) => `${key}: ${formatAnswer(v)}`).join('; ');
  return String(value);
}
export function csvCell(value: unknown): string {
  const text = formatAnswer(value);
  const safe = /^[\s]*[=+@-]/.test(text) ? `'${text}` : text;
  return `"${safe.replaceAll('"', '""')}"`;
}
