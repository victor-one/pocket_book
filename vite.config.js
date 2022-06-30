import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react'
import styleImport from 'vite-plugin-style-import';
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1500,
  },
  plugins: [reactRefresh(), styleImport(
    {
      libs: [
        {
          libraryName: 'zarm',
          esModule: true,
          resolveStyle: (name) => {
            return `zarm/es/${name}/style/css`;
          },
        }
      ]
    }
  )],
  css: {
    modules: {
      localsConvention: 'dashesOnly'
    },
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://47.100.166.112:7001/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '') // 将/api重写为空
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // src
      'utils': path.resolve(__dirname, 'src/utils'), // src路径
      'config': path.resolve(__dirname, 'src/config')
    }
  },
})
