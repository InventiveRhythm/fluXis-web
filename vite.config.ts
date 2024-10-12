import { sentryVitePlugin } from "@sentry/vite-plugin";
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 2432,
    strictPort: true
  },

  plugins: [vue(), sentryVitePlugin({
    org: "choccymilk",
    project: "fluxis-web",
    url: "https://sentry.flux.moe/"
  })],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  build: {
    sourcemap: true
  }
})