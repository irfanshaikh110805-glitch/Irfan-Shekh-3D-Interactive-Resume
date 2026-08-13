import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    allowedHosts: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8787',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 600,
    // Enable CSS code splitting for better caching
    cssCodeSplit: true,
    // Use terser for better minification in production
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        // Split chunks granularly so unused code is never loaded
        manualChunks(id: string) {
          // Core React — always needed
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'react-vendor';
          }
          // Router — loaded at start but separate from React
          if (id.includes('node_modules/react-router')) {
            return 'router-vendor';
          }
          // Framer Motion — lazy-loaded animation, keep in its own chunk
          if (id.includes('node_modules/framer-motion')) {
            return 'animation-vendor';
          }
          // Lucide icons — split out from main
          if (id.includes('node_modules/lucide-react')) {
            return 'icons-vendor';
          }
          // React Icons - separate chunk
          if (id.includes('node_modules/react-icons')) {
            return 'react-icons-vendor';
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
