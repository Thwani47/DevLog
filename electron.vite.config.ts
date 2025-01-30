import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    resolve: {
      alias: {
        '@/lib': resolve('src/main/lib'),
        '@shared': resolve('src/shared')
      }
    },
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    assetsInclude: 'src/renderer/assets/**',
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@shared': resolve('src/shared'),
        '@/hooks': resolve('src/renderer/src/hooks'),
        '@/assets': resolve('src/renderer/src/assets'),
        '@/components': resolve('src/renderer/src/components'),
        '@/store': resolve('src/renderer/src/store'),
        '@/utils': resolve('src/renderer/src/utils'),
        '@/pages': resolve('src/renderer/src/pages')
      }
    },
    plugins: [react()]
  }
})
