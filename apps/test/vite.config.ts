import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5174,
  },
  resolve: {
    alias: {
      '@maily-to/core': path.resolve(
        __dirname,
        '../packages/core/dist/index.mjs'
      ),
    },
  },
  plugins: [react(), tailwindcss()],
});
