import baseConfig from './base.config';
import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts'; // 把一些 TS 声明文件给打包出来

console.log(resolve(__dirname, '../packages/index.ts'))

export default defineConfig({
  ...baseConfig,
  build: { // https://cn.vitejs.dev/guide/build.html#library-mode
    outDir: 'dist',
    lib: {
      entry: resolve(__dirname, '../packages/index.ts'),
      name: 'MYKit',
      fileName: (format) => `my-kit.${format}.js`,
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  plugins: [
    ...(baseConfig as any).plugins,
    dts(),
  ]
});