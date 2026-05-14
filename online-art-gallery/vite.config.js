// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Use relative base so built assets are referenced relative to index.html
  // This avoids absolute /onlineartgallery/... paths which cause 404 when serving at root.
  base: './',
})
