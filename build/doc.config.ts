import baseConfig from './vite.base.config';
import { defineConfig } from 'vite';

export default defineConfig({
  ...baseConfig,
  build: {
    outDir: 'docs',
  },
});
