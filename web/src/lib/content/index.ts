import type { Locale, Translations } from "./types";
import { en } from "./en";
import { ar } from "./ar";

export type { Locale, Translations } from "./types";

export const dictionaries: Record<Locale, Translations> = { en, ar };

export function getDictionary(locale: Locale): Translations {
  return dictionaries[locale];
}
