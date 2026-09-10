import type { Locale } from "./content/types";

const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";

export function toArabicDigits(value: string | number): string {
  return String(value).replace(/[0-9]/g, (d) => ARABIC_DIGITS[Number(d)]);
}

export function localizeNumber(value: string | number, locale: Locale): string {
  return locale === "ar" ? toArabicDigits(value) : String(value);
}

export function formatMoney(value: number, locale: Locale): string {
  return locale === "ar" ? `${toArabicDigits(value)} جنيه` : `${value} EGP`;
}

export function formatDuration(minutes: number, locale: Locale): string {
  return locale === "ar" ? `${toArabicDigits(minutes)} دقيقة` : `${minutes} min`;
}

const DOW_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DOW_AR = ["أحد", "إثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"];
const MON_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MON_AR = [
  "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
  "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر",
];

export function dayOfWeekLabel(date: Date, locale: Locale): string {
  return locale === "ar" ? DOW_AR[date.getDay()] : DOW_EN[date.getDay()];
}

export function monthLabel(date: Date, locale: Locale): string {
  return locale === "ar" ? MON_AR[date.getMonth()] : MON_EN[date.getMonth()];
}

export function dateLabel(date: Date, locale: Locale): string {
  return `${localizeNumber(date.getDate(), locale)} ${monthLabel(date, locale)} ${localizeNumber(date.getFullYear(), locale)}`;
}

export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
