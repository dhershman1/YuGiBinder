import { sentryVitePlugin } from '@sentry/vite-plugin'
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import svgLoader from 'vite-svg-loader'

import { version } from './package.json'

// https://vite.dev/config/
export default defineConfig({
  define: {
    __VUE_APP_VERSION__: JSON.stringify(version)
  },
  build: {
    sourcemap: true
  },
  plugins: [
    vue(),
    vueDevTools(),
    svgLoader(),
    sentryVitePlugin({
      org: 'dustin-hershman',
      project: 'yugibinder'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: 'localhost',
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        rewrite: (path) => path.replace(/^\/api\//, '')
      }
    }
  }
})
