import { defineConfig } from "vite";

export default defineConfig({
  publicDir: "public",
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    copyPublicDir: false,
    minify: false,
    lib: {
      entry: "src/koryoon.tsx",
      name: "Koryoon",
      fileName: "koryoon",
      formats: ["iife"],
    },
    rollupOptions: {
      output: {
        extend: true,
        inlineDynamicImports: true,
        entryFileNames: "koryoon.min.js",
      },
    },
    outDir: "dist",
    emptyOutDir: true,
  },
});
