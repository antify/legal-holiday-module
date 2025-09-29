import {
  useLegalHolidayClient,
} from '../useLegalHolidayClient';
import {
  CachedLegalHolidays, type LegalHoliday, State,
} from '../types';
import type {
  DataHandler,
} from '../dataHandler';
import defineDataHandler from '#legal-holiday-module-data-handler';
import {
  string,
  object,
  boolean,
  array,
  date,
  StringSchema,
} from 'yup';

const legalHolidaySchema = object({
  date: string().required(),
  name: string().required(),
  augsburg: boolean().required(),
  ...Object.values(State).reduce(
    (acc, state) => {
      acc[state] = string().required();

      return acc;
    },
    {} as Record<string, StringSchema>,
  ),
});

const yearCacheSchema = object({
  cacheDate: date().required(),
  legalHolidays: array().of(legalHolidaySchema).required(),
});

const cachedLegalHolidaysSchema = object().test(
  'cached-legal-holidays',
  'Invalid CachedLegalHolidays',
  async (value) => {
    if (!value || typeof value !== 'object') return false;

    for (const [
      key,
      entry,
    ] of Object.entries(value)) {
      try {
        await yearCacheSchema.validate(entry);
      } catch {
        return false;
      }
    }

    return true;
  },
);

export const useLegalHoliday = () => {
  return {
    getLegalHoliday: async (
      year: number,
      options?: {
        augsburg?: boolean;
        state?: State;
      },
    ): Promise<
      LegalHoliday[]
    > => {
      if (!year || isNaN(year)) {
        throw new Error('Argument year is missing or invalid');
      }

      options = {
        augsburg: options?.augsburg || false,
        state: options?.state,
      };

      let content: CachedLegalHolidays | null = null;

      /**
       * Get data from the data handler
       */
      const dataHandler = (defineDataHandler as DataHandler);
      const _data = await dataHandler.findData(year);
      if (_data !== null) {
        content = await cachedLegalHolidaysSchema.validate(_data);
      }

      /**
       * Fetch data if no data exist or cache date
       */
      const MAX_YEARS_IN_FUTURE = 2;

      if (
        !content ||
        (content[`${year}`].legalHolidays.length === 0 && year - new Date().getFullYear() <= MAX_YEARS_IN_FUTURE)
      ) {
        const legalHolidayClient = useLegalHolidayClient();
        content = await legalHolidayClient.getLegalHolidays(year);

        await dataHandler.saveData(content);
      }

      /**
       * Normalize and filter cacheData
       */
      const result: LegalHoliday[] = [];

      for (const legalHoliday of content[`${year}`].legalHolidays) {
        if (!options.augsburg) {
          if (legalHoliday.augsburg) {
            continue;
          }
        }

        if (options.state ) {
          if (legalHoliday[options.state] === '1') {
            result.push({
              date: legalHoliday.date,
              name: legalHoliday.name,
            });
          }

          continue;
        }

        result.push({
          date: legalHoliday.date,
          name: legalHoliday.name,
        });
      }

      return result;
    },
  };
};
