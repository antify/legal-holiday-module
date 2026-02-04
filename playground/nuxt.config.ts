export default defineNuxtConfig({
  ssr: false,
  imports: {
    autoImport: false,
  },
  modules: [
    '@antify/template-module',
    '../src/module',
  ],
  legalHolidayModule: {
    dataHandler: './server/datasources/dataHandler',
  },
  devtools: {
    enabled: true,
  },
});
