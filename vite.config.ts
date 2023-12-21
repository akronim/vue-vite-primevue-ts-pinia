import { fileURLToPath, URL } from 'node:url'
import svgLoader from 'vite-svg-loader'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

const mode = process.env.NODE_ENV
mode && (process.env = { ...process.env, ...loadEnv(mode, process.cwd()) })

export default defineConfig({
  base: mode === `production` ? `/static/vueadmin/dist` : `/`, 
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
})
