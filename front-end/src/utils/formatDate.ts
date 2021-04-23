export function defaultPattern(date: Date): string {
  return new Intl.DateTimeFormat('en-us').format(date);
}
