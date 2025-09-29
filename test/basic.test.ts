import {
  fileURLToPath,
} from 'node:url';
import {
  describe, it, expect,
} from 'vitest';
import {
  setup, $fetch,
} from '@nuxt/test-utils/e2e';

describe('legal holiday module', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
  });

  it('should get legal holidays', async () => {
    // TODO: Implement tests and mock api request
  });
});
