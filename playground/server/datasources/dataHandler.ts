import {
  CachedLegalHolidays,
  defineDataHandler,
} from '#legal-holiday-module';

const legalHoliday: CachedLegalHolidays = {};

export default defineDataHandler({
  findData: async function (year: number): Promise<CachedLegalHolidays | null> {
    if (!year) {
      throw new Error('Argument year must be provided');
    }

    if (!legalHoliday[`${year}`]) {
      return null;
    }

    return {
      [`${year}`]: legalHoliday[`${year}`],
    };
  },
  saveData(data: CachedLegalHolidays): Promise<CachedLegalHolidays | null> {
    if (!data) {
      throw new Error('Argument data must be provided');
    }

    Object.entries(data).forEach(([
      key,
      value,
    ]) => {
      legalHoliday[`${key}`] = value;
    });

    return data;
  },
});
