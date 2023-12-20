import { fileURLToPath, URL } from 'node:url'
import svgLoader from 'vite-svg-loader'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  //base: `./`,
  plugins: [
    vue(),
    svgLoader({ defaultImport: `url` })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL(`./src`, import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `$demo-color: ${new Date().getMinutes() % 2 === 0 ? `crimson` : `royalblue`};`
      }
    }
  }
  // build: {
  //   manifest: true,
  //   chunkSizeWarningLimit: 1024,
  //   rollupOptions: {
  //     output: {
  //       dir: `dist/assets`,
  //       entryFileNames: `[name].js`,
  //       chunkFileNames: `[name].js`,
  //       assetFileNames: `[name].[ext]`
  //     }
  //   }
  // }
})
