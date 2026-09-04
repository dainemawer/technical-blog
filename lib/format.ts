export function formatPostDate(iso: string): string {
  const [year, month, day] = iso.split("-");
  return `${month} ${day} ${year}`;
}

export function formatArticleDate(iso: string): {
  day: string;
  month: string;
  year: string;
} {
  const [year, month, day] = iso.split("-");
  return { day, month, year };
}
