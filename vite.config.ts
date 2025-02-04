import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        sw: './public/firebase-notifications-sw.js'
      }
    }
  }
});