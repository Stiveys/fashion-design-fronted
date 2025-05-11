import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  // Remove the proxy configuration for production deployment
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://fashion-design-backend-0jh8.onrender.com',
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //   },
  // },
})
