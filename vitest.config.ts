import path from 'path';
import { defineConfig } from 'vitest/config';

console.log('app variant:', process.env.APP);
// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'import.meta.env.VITE_APP': JSON.stringify(process.env.APP)
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@redux-thunk-variant': path.resolve(__dirname, './src/apps/redux-thunk-variant'),
      '@redux-saga-variant': path.resolve(__dirname, './src/apps/redux-saga-variant'),
      '@react-hooks-variant': path.resolve(__dirname, './src/apps/react-hooks-variant'),
      '@reatom-variant': path.resolve(__dirname, './src/apps/reatom-variant')
    }
  },

  test: {
    root: './tests/unit',
    globals: true,
    environment: 'jsdom',
    maxWorkers: 1,
    minWorkers: 1
  }
});
