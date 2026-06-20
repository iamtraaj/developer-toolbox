import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Ensure assets are inlined for smaller deploys
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        // Code-split vendor and tool pages
        manualChunks: (id) => {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/lucide-react') || id.includes('node_modules/react-hot-toast')) {
            return 'vendor-libs';
          }
          if (id.includes('node_modules/qrcode') || id.includes('node_modules/uuid') || id.includes('node_modules/jwt-decode')) {
            return 'vendor-tools';
          }
        },
      },
    },
  },
})
