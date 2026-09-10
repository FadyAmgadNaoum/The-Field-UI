export type Locale = "en" | "ar";

export interface Translations {
  brand: string;
  markGlyph: string;
  brandTag: string;
  langSwitch: string;
  themeSwitchDark: string;
  themeSwitchLight: string;
  signIn: string;
  signOut: string;
  joinNow: string;
  nav: {
    home: string;
    courts: string;
    locations: string;
    booking: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    sub: string;
    tag: string;
    cta1: string;
    cta2: string;
    f1: string;
    f2: string;
    f3: string;
    scroll: string;
  };
  courts: {
    eyebrow: string;
    title: string;
    note: string;
    perHour: string;
    book: string;
    images: string;
  };
  loc: {
    eyebrow: string;
    title: string;
  };
  min: {
    l1: string;
    h1: string;
    p1: string;
    s1v: string;
    s1k: string;
    s2v: string;
    s2k: string;
    l2: string;
    h2: string;
    p2: string;
    s3v: string;
    s3k: string;
    s4v: string;
    s4k: string;
  };
  book: {
    eyebrow: string;
    title: string;
    s1: string;
    s2: string;
    s3: string;
    s4: string;
    duration: string;
    legendFree: string;
    legendTaken: string;
    sumCourt: string;
    sumWhen: string;
    sumTotal: string;
    cta: string;
    foot: string;
  };
  auth: {
    eyebrow: string;
    title: string;
    sub: string;
    email: string;
    password: string;
    cta: string;
    back: string;
  };
  co: {
    title: string;
    status: string;
    total: string;
    hold: string;
    back: string;
    payTitle: string;
    payNote: string;
    upTitle: string;
    upHint: string;
    submit: string;
    whatsapp: string;
    doneTitle: string;
    doneBody: string;
    doneRef: string;
    doneNext: string;
    rCourt: string;
    rLoc: string;
    rDate: string;
    rTime: string;
    rDur: string;
    rRef: string;
    pMethod: string;
    pSendTo: string;
    pName: string;
  };
  footer: {
    blurb: string;
    visit: string;
    addr1: string;
    addr2: string;
    contact: string;
    phone: string;
    email: string;
    hours: string;
    hoursVal: string;
    rights: string;
  };
  pre: {
    eyebrow: string;
    line: string;
    loading: string;
  };
  empty: string;
  pickFirst: string;
  receiptNone: string;
  receiptSet: string;
}
