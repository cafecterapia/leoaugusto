import { defineConfig } from 'vite'

export default defineConfig({
  base: '/leoaugusto/', // GitHub Pages base path
  root: '.', // Set the root to current directory
  publicDir: 'public', // Directory to serve as plain static assets
  build: {
    outDir: 'dist', // Output directory for build files
    assetsDir: 'assets', // Directory for generated assets
    rollupOptions: {
      input: {
        main: 'index.html'
      }
    }
  },
  server: {
    port: 3000, // Development server port
    open: true, // Automatically open browser
    host: true // Accept connections from any host (useful for dev containers)
  },
  preview: {
    port: 4173,
    host: true
  }
})
