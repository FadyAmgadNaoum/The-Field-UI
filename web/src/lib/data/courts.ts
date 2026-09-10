import type { Court } from "./types";

/**
 * Mock court catalogue, structured the way the future courts table will
 * read. Each cover crop is hand-picked to avoid the fake wordmark/nav
 * baked into the two prototype stills (see lib/media.ts).
 */
export const COURTS: Court[] = [
  {
    id: "c1",
    locationId: "assiut",
    price: 320,
    active: true,
    imageCount: 5,
    cover: { key: "court.close", size: "360% auto", position: "78% 97%" },
    text: {
      en: {
        name: "Court 01 — Centre",
        description: "Panoramic glass court under the main floodlight rig. The house court for match play.",
        amenities: ["Panoramic glass", "LED floodlights", "Showers"],
      },
      ar: {
        name: "الملعب ٠١ — المركزي",
        description: "ملعب زجاجي بانورامي تحت أعمدة الإضاءة الرئيسية. ملعب المباريات الأساسي.",
        amenities: ["زجاج بانورامي", "إضاءة LED", "دشات"],
      },
    },
  },
  {
    id: "c2",
    locationId: "assiut",
    price: 280,
    active: true,
    imageCount: 4,
    cover: { key: "court.wide", size: "340% auto", position: "98% 42%" },
    text: {
      en: {
        name: "Court 02 — North",
        description: "Shaded from the afternoon sun, with covered seating along the north wall.",
        amenities: ["Shaded", "Covered seating", "Parking"],
      },
      ar: {
        name: "الملعب ٠٢ — الشمالي",
        description: "مظلل من شمس العصر، بمقاعد مغطاة على الجدار الشمالي.",
        amenities: ["مظلل", "مقاعد مغطاة", "موقف سيارات"],
      },
    },
  },
  {
    id: "c3",
    locationId: "assiut",
    price: 350,
    active: true,
    imageCount: 6,
    cover: { key: "court.wide", size: "400% auto", position: "58% 96%" },
    text: {
      en: {
        name: "Court 03 — Panorama",
        description: "Full-glass back wall facing the river. Equipment rental at the court gate.",
        amenities: ["River view", "Equipment rental", "Showers"],
      },
      ar: {
        name: "الملعب ٠٣ — بانوراما",
        description: "جدار خلفي زجاجي كامل يواجه النيل. تأجير مضارب عند بوابة الملعب.",
        amenities: ["إطلالة على النيل", "تأجير مضارب", "دشات"],
      },
    },
  },
  {
    id: "c4",
    locationId: "newcairo",
    price: 420,
    active: true,
    imageCount: 3,
    cover: { key: "court.close", size: "300% auto", position: "80% 90%" },
    text: {
      en: {
        name: "Court 01 — Atrium",
        description: "Indoor court inside the New Cairo atrium. Opening 2027.",
        amenities: ["Indoor", "Climate control", "Parking"],
      },
      ar: {
        name: "الملعب ٠١ — الأتريوم",
        description: "ملعب مغلق داخل أتريوم القاهرة الجديدة. يفتح ٢٠٢٧.",
        amenities: ["مغلق", "تكييف", "موقف سيارات"],
      },
    },
  },
];
