import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import lineClamp from '@tailwindcss/line-clamp'
import dotenv from 'dotenv'

dotenv.config()


// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: process.env.BACKEND_URL,
        secure: false,
        changeOrigin: true
      },
    },
  },
  plugins: [
    react(),
    lineClamp
  ],
  define: {
    'process.env.BACKEND_URL': JSON.stringify(process.env.BACKEND_URL),
},
})
