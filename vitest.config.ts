import {
  defineConfig,
} from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: [
      'test/**/*.test.ts',
    ],
    coverage: {
      reporter: [
        'text',
        'lcov',
      ],
    },
    hookTimeout: 10000,
  },
  resolve: {
    alias: {
      '#imports': `${__dirname}/.nuxt/imports.d.ts`,
    },
  },
  esbuild: {
    tsconfig: 'test/fixtures/basic/tsconfig.json',
  },
});
