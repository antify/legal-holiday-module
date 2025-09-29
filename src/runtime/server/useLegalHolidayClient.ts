import {
  object,
  string,
  array,
} from 'yup';
import {
  CachedLegalHolidays,
  FetchedData,
} from './types';
import {
  $fetch,
} from 'ofetch';

export const fetchedDataSchema = object({
  status: string().required(),
  feiertage: array().required().of(object({
    date: string().required(),
    fname: string().required(),
    all_states: string().required(),
    bw: string().required(),
    by: string().required(),
    be: string().required(),
    bb: string().required(),
    hb: string().required(),
    hh: string().required(),
    he: string().required(),
    mv: string().required(),
    ni: string().required(),
    nw: string().required(),
    rp: string().required(),
    sl: string().required(),
    sn: string().required(),
    st: string().required(),
    sh: string().required(),
    th: string().required(),
    comment: string().nullable().default(null),
    augsburg: string().nullable().default(null),
    katholisch: string().nullable().default(null),
  })).nullable().default(null),
  additional_note: string().optional(),
}).required();

export const useLegalHolidayClient = () => {
  const fetchData = async (year: number = new Date().getFullYear()): Promise<FetchedData> => {
    const data: FetchedData = await $fetch(`https://get.api-feiertage.de?years=${year}&augsburg=1`);

    await fetchedDataSchema.validate(data);

    return data;
  };

  const createCacheData = (
    fetchedData: FetchedData,
    year: number,
  ): CachedLegalHolidays => ({
    [`${year}`]: {
      cacheDate: new Date(),
      legalHolidays: (fetchedData.feiertage || []).map((item) => ({
        date: item.date,
        name: item.fname,
        all_states: item.all_states,
        bw: item.bw,
        by: item.by,
        be: item.be,
        bb: item.bb,
        hb: item.hb,
        hh: item.hh,
        he: item.he,
        mv: item.mv,
        ni: item.ni,
        nw: item.nw,
        rp: item.rp,
        sl: item.sl,
        sn: item.sn,
        st: item.st,
        sh: item.sh,
        th: item.th,
        augsburg: !!item.augsburg,
      })) as unknown as CachedLegalHolidays[string]['legalHolidays'],
    },
  });

  return {
    getLegalHolidays: async (year: number) => {
      const fetchedData = await fetchData(year);

      return createCacheData(fetchedData, year);
    },
  };
};
