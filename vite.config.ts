import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    allowedHosts: true,
  },
  build: {
    chunkSizeWarningLimit: 800,
    // Enable CSS code splitting for better caching
    cssCodeSplit: true,
    // Minify with esbuild (default, fast)
    minify: 'esbuild',
    rollupOptions: {
      output: {
        // Split chunks granularly so unused code is never loaded
        manualChunks(id) {
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
          // Three.js ecosystem — only used in 3D components, defer
          if (
            id.includes('node_modules/three') ||
            id.includes('node_modules/@react-three')
          ) {
            return 'three-vendor';
          }
          // Lucide icons — split out from main
          if (id.includes('node_modules/lucide-react')) {
            return 'icons-vendor';
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
