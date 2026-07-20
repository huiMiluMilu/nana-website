import { copyFileSync, mkdirSync } from 'node:fs';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'sites-worker-output',
      closeBundle() {
        mkdirSync('dist/server', { recursive: true });
        copyFileSync('hosting/worker.js', 'dist/server/index.js');
      }
    }
  ],
  build: {
    outDir: 'dist/client'
  }
});
