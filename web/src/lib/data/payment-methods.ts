export interface PaymentMethod {
  id: string;
  en: string;
  ar: string;
  handle: string;
}

export const PAYMENT_METHODS: PaymentMethod[] = [
  { id: "instapay", en: "InstaPay", ar: "إنستاباي", handle: "thefield@instapay" },
  { id: "vodafone", en: "Vodafone Cash", ar: "فودافون كاش", handle: "010 0000 0000" },
  { id: "orange", en: "Orange Cash", ar: "أورنج كاش", handle: "012 0000 0000" },
  { id: "etisalat", en: "Etisalat Cash", ar: "اتصالات كاش", handle: "011 0000 0000" },
  { id: "fawry", en: "Fawry", ar: "فوري", handle: "900 112 233" },
];

/** Placeholder support line — replace with the real WhatsApp Business number before launch. */
export const SUPPORT_WHATSAPP_NUMBER = "201000000000";

export const SESSION_TIMES = [
  "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00",
  "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00",
] as const;

export const SESSION_DURATIONS = [90, 120] as const;
export type SessionDuration = (typeof SESSION_DURATIONS)[number];

/** Minutes a HELD booking keeps its slot before payment must be submitted. */
export const HOLD_DURATION_SECONDS = 600;
