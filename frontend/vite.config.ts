
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import { fileURLToPath } from 'url';
import { generateCSP } from './src/config/csp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Development CSP - less restrictive for development
const devCSP = [
  "default-src 'self';",
  "connect-src 'self' http://localhost:* ws://localhost:* wss://localhost:* https://localhost:* https://*.paypal.com https://*.paypalobjects.com https://api-m.sandbox.paypal.com https://api-m.paypal.com https://*.firebaseapp.com https://*.firebaseio.com https://*.googleapis.com https://*.firebase.com https://*.firebasestorage.app https://securetoken.googleapis.com https://identitytoolkit.googleapis.com wss://*.firebaseio.com wss://*.firebase.com https://www.googleapis.com;",
  "img-src 'self' data: blob: https://*.paypal.com https://*.paypalobjects.com https://lovable.dev https://*.google.com https://*.googleapis.com https://www.gstatic.com https://*.firebaseapp.com https://*.firebaseio.com https://*.firebase.com https://*.firebasestorage.app https://lh3.googleusercontent.com https://*.youtube.com https://img.youtube.com;",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:* ws://localhost:* https://*.paypal.com https://*.paypalobjects.com https://www.paypal.com https://www.gstatic.com https://apis.google.com https://*.firebase.com https://*.firebaseio.com https://*.firebaseapp.com https://www.google.com https://www.gstatic.com/firebase/* https://*.firebasejs.com https://apis.google.com/js/platform.js https://www.gstatic.com/recaptcha/;",
  "style-src 'self' 'unsafe-inline' https://*.paypal.com https://*.paypalobjects.com https://fonts.googleapis.com https://*.googleapis.com https://*.firebase.com https://*.firebaseapp.com https://www.gstatic.com https://fonts.gstatic.com;",
  "frame-src 'self' https://*.paypal.com https://*.paypalobjects.com https://*.google.com https://accounts.google.com https://www.google.com https://apis.google.com https://securetoken.googleapis.com https://identitytoolkit.googleapis.com https://*.firebaseapp.com https://www.recaptcha.net https://www.gstatic.com/recaptcha/ https://www.youtube.com https://*.youtube.com https://www.youtube-nocookie.com;",
  "font-src 'self' data: https://*.paypal.com https://*.paypalobjects.com https://fonts.gstatic.com https://fonts.googleapis.com https://*.firebase.com https://*.firebaseapp.com https://themes.googleusercontent.com https://www.gstatic.com;",
  "worker-src 'self' blob:;"
].join(' ');

export default defineConfig(({ mode }) => {
  // Use development CSP in development, production CSP otherwise
  const csp = mode === 'development' ? devCSP : generateCSP();
  
  return {
    server: {
      host: '0.0.0.0',
      port: 3001,
      strictPort: true,
      open: false,
      headers: {
        'Content-Security-Policy': csp
      },
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
  };
});

