import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite({ routesDirectory: 'src/apps/redux-variant/routes' })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@redux-variant': path.resolve(__dirname, './src/apps/redux-variant'),
      '@react-hooks': path.resolve(__dirname, './src/apps/react-hooks')
    }
  },
  server: {
    proxy: {
      '/api': 'http://localhost:31299'
    }
  }
});
