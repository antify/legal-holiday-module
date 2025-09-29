import {
  defineNuxtConfig,
} from 'nuxt/config';
import LegalHolidayModule from '../../../src/module';

export default defineNuxtConfig({
  ssr: false,
  modules: [
    LegalHolidayModule,
  ],
  legalHolidayModule: {
    dataHandler: './server/datasources/dataHandler',
  },
});
