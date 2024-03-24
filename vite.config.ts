import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias:{
      "@":path.resolve(__dirname,'./src')//配置@别名
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: "@import './src/style/index.scss';"
      }
    }
  }
}
)

