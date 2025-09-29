import {
  defineNuxtModule,
  createResolver,
} from '@nuxt/kit';

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
  defaults: {},
  setup(_options, _nuxt) {
    if (JSON.stringify(_options) === '{}') {
      return;
    }

    const resolver = createResolver(import.meta.url);
    const runtimeDir = resolver.resolve('runtime');

    _nuxt.options.build.transpile.push(runtimeDir);
    _nuxt.options.build.failOnWarn = false;

    _nuxt.hook('nitro:config', (nitroConfig) => {
      nitroConfig.alias = nitroConfig.alias || {};

      nitroConfig.alias['#legal-holiday-module'] = resolver.resolve(runtimeDir, 'server');
      nitroConfig.alias['#legal-holiday-module-data-handler'] = resolver.resolve(_nuxt.options.rootDir, _options.dataHandler);
    });
  },
});
