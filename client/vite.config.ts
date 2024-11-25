/// <reference types="vitest" />
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    host: true,
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:80',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,
      },
    },
  },
  test: {
    css: false,
    globals: true,
    watch: false,
    environment: 'jsdom',
    setupFiles: './src/setup-test.ts',
  },
  build: {
    sourcemap: true,
  },
})
