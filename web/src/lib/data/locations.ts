import type { Location } from "./types";

/**
 * Mock location catalogue, structured the way the future locations table
 * will read (id, active flag, per-locale display text). The first
 * location is Assiut; the shape intentionally does not hard-code Assiut
 * anywhere outside this data file so more cities can be appended later.
 */
export const LOCATIONS: Location[] = [
  {
    id: "assiut",
    active: true,
    courtCount: 3,
    text: {
      en: { city: "Assiut", address: "Corniche El Nil, Assiut", state: "Open now" },
      ar: { city: "أسيوط", address: "كورنيش النيل، أسيوط", state: "مفتوح الآن" },
    },
  },
  {
    id: "newcairo",
    active: false,
    courtCount: 4,
    text: {
      en: { city: "New Cairo", address: "Fifth Settlement, Cairo", state: "Opening 2027" },
      ar: { city: "القاهرة الجديدة", address: "التجمع الخامس، القاهرة", state: "يفتح ٢٠٢٧" },
    },
  },
  {
    id: "alex",
    active: false,
    courtCount: 2,
    text: {
      en: { city: "Alexandria", address: "Smouha, Alexandria", state: "Opening 2027" },
      ar: { city: "الإسكندرية", address: "سموحة، الإسكندرية", state: "يفتح ٢٠٢٧" },
    },
  },
];
