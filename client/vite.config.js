import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import lineClamp from '@tailwindcss/line-clamp'



// https://vitejs.dev/config/
export default defineConfig({
  server: {
  },
  plugins: [
    react(),
    lineClamp
  ],
})
