import {
  defineConfig,
} from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'node',
  },
  resolve: {
    alias: {
      '#legal-holiday-module': path.resolve(__dirname, 'src/runtime/server'),
      '#legal-holiday-module-data-handler': path.resolve(__dirname, 'test/fixtures/basic/server/datasources/dataHandler'),
    },
  },
});
