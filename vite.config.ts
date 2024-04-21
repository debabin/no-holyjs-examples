import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite({ routesDirectory: 'src/apps/reatom-variant/routes' })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@redux-thunk-variant': path.resolve(__dirname, './src/apps/redux-thunk-variant'),
      '@redux-saga-variant': path.resolve(__dirname, './src/apps/redux-saga-variant'),
      '@react-hooks-variant': path.resolve(__dirname, './src/apps/react-hooks-variant'),
      '@reatom-variant': path.resolve(__dirname, './src/apps/reatom-variant')
    }
  },
  server: {
    proxy: {
      '/api': 'http://localhost:31299'
    }
  }
});
