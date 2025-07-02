import { defineConfig } from 'vite'

export default defineConfig({
  base: '/', // Root path for Cloudflare Pages
  root: '.', // Set the root to current directory
  publicDir: 'public', // Directory to serve as plain static assets
  build: {
    outDir: 'dist', // Output directory for build files
    assetsDir: 'assets', // Directory for generated assets
    sourcemap: false, // Disable sourcemaps for production
    minify: 'esbuild', // Use esbuild for minification
    target: 'es2015', // Ensure compatibility
    rollupOptions: {
      input: './index.html', // Fix the input path
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
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
