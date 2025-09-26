import {
  defineNuxtModule,
  createResolver,
} from '@nuxt/kit';

// Module options TypeScript interface definition
export interface ModuleOptions {
  /**
   * Integration between the module and the project's user logic.
   * Must return a defineDataHandler();
   */
  dataHandler: string;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'legal-holiday-module',
    configKey: 'legalHolidayModule',
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(_options, _nuxt) {
    if (JSON.stringify(_options) === '{}') {
      // nuxt-module-build build --stub call this setup without any options. This would break the code.
      return;
    }

    const resolver = createResolver(import.meta.url);
    const runtimeDir = resolver.resolve('runtime');

    _nuxt.options.build.transpile.push(runtimeDir);

    _nuxt.hook('nitro:config', (nitroConfig) => {
      nitroConfig.alias = nitroConfig.alias || {};

      nitroConfig.alias['#legal-holiday-module'] = resolver.resolve(runtimeDir, 'server');
      nitroConfig.alias['#legal-holiday-module-data-handler'] = resolver.resolve(_nuxt.options.rootDir, _options.dataHandler);
    });
  },
});
