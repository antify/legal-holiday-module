import {
  defineEventHandler,
  getQuery,
} from '#imports';
import {
  useLegalHoliday,
} from '#legal-holiday-module';

export default defineEventHandler(async (event) => {
  const {
    year,
    augsburg,
    state,
  } = getQuery(event);
  const legalHoliday = useLegalHoliday();

  return legalHoliday.getLegalHoliday(year, {
    state,
    augsburg: augsburg === 'true',
  });
});
