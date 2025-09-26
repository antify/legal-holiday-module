export default defineNuxtConfig({
  ssr: false,
  imports: {
    autoImport: false,
  },
  modules: [
    '@antify/ui-module',
    '../src/module',
  ],
  legalHolidayModule: {
    dataHandler: './server/datasources/dataHandler',
  },
  devtools: {
    enabled: true,
  },
});
