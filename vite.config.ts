import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    alias: {
      'framer-motion': fileURLToPath(new URL('./src/__mocks__/framer-motion.tsx', import.meta.url)),
    },
  },
})
