// vite.config.js
import { fileURLToPath, URL } from "node:url"
import { defineConfig } from "vitest/config"

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@styles": fileURLToPath(new URL("./src/styles", import.meta.url)),
      "@components": fileURLToPath(
        new URL("./src/components", import.meta.url),
      ),
      "@utils": fileURLToPath(new URL("./src/utils", import.meta.url)),
      "@core": fileURLToPath(new URL("./src/core", import.meta.url)),
      "@layout": fileURLToPath(new URL("./src/layout", import.meta.url)),
    },
  },

  server: {
    open: true,
  },

  test: {
    environment: "jsdom",
    restoreMocks: true,
  },
})
