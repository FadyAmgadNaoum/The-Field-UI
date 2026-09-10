/** The next 7 selectable booking days, starting today. */
export function upcomingDates(count = 7): Date[] {
  const today = new Date();
  const base = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return Array.from({ length: count }, (_, i) => new Date(base.getFullYear(), base.getMonth(), base.getDate() + i));
}
