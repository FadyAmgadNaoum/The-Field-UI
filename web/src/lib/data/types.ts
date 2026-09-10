import type { MediaKey } from "../media";

export interface LocaleText<T> {
  en: T;
  ar: T;
}

export interface Location {
  id: string;
  active: boolean;
  courtCount: number;
  text: LocaleText<{ city: string; address: string; state: string }>;
}

export interface Court {
  id: string;
  locationId: string;
  price: number;
  active: boolean;
  imageCount: number;
  cover: { key: MediaKey; size: string; position: string };
  text: LocaleText<{ name: string; description: string; amenities: string[] }>;
}
