export enum State {
  all_states = 'all_states',
  bw = 'bw',
  by = 'by',
  be = 'be',
  bb = 'bb',
  hb = 'hb',
  hh = 'hh',
  he = 'he',
  mv = 'mv',
  ni = 'ni',
  nw = 'nw',
  rp = 'rp',
  sl = 'sl',
  sn = 'sn',
  st = 'st',
  sh = 'sh',
  th = 'th',
}

export type CachedLegalHolidays = Record<string, {
  cacheDate: Date;
  legalHolidays: ({
    date: string;
    name: string;
    augsburg: boolean;
  } & {
    [key in State]: string;
  })[];
}
>;

export type LegalHoliday = {
  date: string;
  name: string;
};

export type FetchedData = {
  status: string;
  feiertage: {
    date: string;
    fname: string;
    all_states: string;
    bw: string;
    by: string;
    be: string;
    bb: string;
    hb: string;
    hh: string;
    he: string;
    mv: string;
    ni: string;
    nw: string;
    rp: string;
    sl: string;
    sn: string;
    st: string;
    sh: string;
    th: string;
    comment: string | null;
    augsburg: string | null;
    katholisch: string | null;
  }[] | null;
  additional_note?: string;
};
