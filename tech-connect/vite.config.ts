import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Hiring-enquiry API (server/ at the repo root, `npm run dev` there). Same-origin in dev, so no CORS setup is needed.
    proxy: { '/api': { target: process.env.VITE_DEV_API_TARGET ?? 'http://localhost:4000', changeOrigin: true } },
  },
})
