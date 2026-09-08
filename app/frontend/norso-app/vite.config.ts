import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { readFileSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'

function maplibreWorkerAsset(): Plugin {
  return {
    name: 'maplibre-worker-asset',
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'assets/maplibre-gl-worker.js',
        source: readFileSync(fileURLToPath(new URL('./node_modules/maplibre-gl/dist/maplibre-gl-worker.mjs', import.meta.url))),
      })
      this.emitFile({
        type: 'asset',
        fileName: 'assets/maplibre-gl-shared.mjs',
        source: readFileSync(fileURLToPath(new URL('./node_modules/maplibre-gl/dist/maplibre-gl-shared.mjs', import.meta.url))),
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), maplibreWorkerAsset()],
  server: {
    proxy: {
      '/api': 'http://localhost:5030',
    },
  },
  optimizeDeps: {
    exclude: ['maplibre-gl', 'maplibre-gl-worker'],
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
