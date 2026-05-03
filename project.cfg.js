import { getDataFn, getRouteFn } from './src/dynamic/node/handlers.js';

export default {
  dynamic: {
    port: 3000,
    routes: './src/dynamic/routes.js',
    baseDir: './src/dynamic/',
    getRouteFn,
    getDataFn,
  },
  static: {
    outputDir: './dist',
    sourceDir: './src/static',
  },
  ssr: {
    enabled: true,
    imports: [
      './src/components/server-only/exports.js',
      './src/components/iso/exports.js',
    ],
  },
  importmap: {
    packageList: ['@symbiotejs/symbiote'],
  },
};
