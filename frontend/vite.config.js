import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      // เมื่อไหร่ที่มีการเรียกใช้ path ที่ขึ้นต้นด้วย /api
      '/api': {
        target: 'http://localhost:3000', // ให้ส่งไปที่ Backend ในเครื่องเรา
        changeOrigin: true,
        secure: false,
      }
    }
  }
})