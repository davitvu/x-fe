import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    // proxy: {
    //   '/api/v1/auth': {
    //     target: 'http://localhost:5001',
    //     // changeOrigin: true,
    //     // secure: false,
    //   },
    // }
  }
});
