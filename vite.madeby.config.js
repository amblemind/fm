import { defineConfig } from 'vite';

/**
 * Second build pass: emits dist/madeby.js, the standalone script sites load
 * directly. Left unminified on purpose — people open this URL to read it.
 */
export default defineConfig({
  build: {
    emptyOutDir: false,
    minify: false,
    lib: {
      entry: 'src/madeby.js',
      formats: ['iife'],
      name: 'MadeByTag',
      fileName: () => 'madeby.js'
    }
  }
});
