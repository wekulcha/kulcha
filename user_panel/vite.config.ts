import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    // ngrok / cloudflared: Host header is not localhost
    allowedHosts: true,
    proxy: {
      // initData login — Python auth_gateway; остальное — Spring
      '/api/v1/auth/webapp-user': {
        target: 'http://127.0.0.1:8090',
        changeOrigin: true,
      },
      '/api/v1/auth/webapp-admin': {
        target: 'http://127.0.0.1:8090',
        changeOrigin: true,
      },
      '/api': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
      },
    },
  },
})
