import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Add a proxy so that calls like `/api/letters` are forwarded to your backend when running the Vite dev server.
  // The backend URL can be customized via the VITE_API_URL env var; otherwise it falls back to localhost:3000.
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
