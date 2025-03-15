import { sentryVitePlugin } from "@sentry/vite-plugin";
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 2432,
    strictPort: true
  },

  plugins: [vue(), vueDevTools(), sentryVitePlugin({
    org: "choccymilk",
    project: "fluxis-web",
    url: "https://sentry.flux.moe/"
  })],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
			'vue': "vue/dist/vue.esm-bundler.js"
    }
  },

  build: {
    sourcemap: true
  }
})