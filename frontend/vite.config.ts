
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3001,
    strictPort: true,
    open: false,
    hmr: {
      host: 'localhost',
      port: 3001,
      protocol: 'ws',
      overlay: true,
    },
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
    headers: {
      'Content-Security-Policy': [
        "default-src 'self';",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval' http://localhost:* https://localhost:* https://apis.google.com https://*.google.com https://*.googleapis.com https://www.gstatic.com 'sha256-kPx0AsF0oz2kKiZ875xSvv693TBHkQ/0SkMJZnnNpnQ=';",
        "script-src-elem 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval' http://localhost:* https://localhost:* https://apis.google.com https://*.google.com https://*.googleapis.com https://www.gstatic.com;",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",
        "font-src 'self' https://fonts.gstatic.com data:;",
        "img-src 'self' data: blob: https://lovable.dev https://*.google.com https://*.googleapis.com https://www.gstatic.com;",
        "connect-src 'self' http://localhost:* https://localhost:* ws://localhost:* wss://localhost:* https://*.googleapis.com https://*.firebaseio.com https://*.firebase.com wss://*.firebaseio.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com;",
        "frame-src 'self' https://*.google.com https://accounts.google.com https://www.google.com https://apis.google.com;",
        "worker-src 'self' blob:;",
        "style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com;"
      ].join(' ')
    }
  },
  preview: {
    port: 3000,
    strictPort: true,
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer,
      ],
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    force: true,
  },
  clearScreen: false,
  logLevel: 'info',
});

