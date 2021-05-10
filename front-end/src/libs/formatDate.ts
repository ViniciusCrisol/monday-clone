export function defaultPattern(date: Date | string): string {
  return new Intl.DateTimeFormat('en-us').format(
    date instanceof Date ? date : Date.parse(date)
  );
}
