import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@/src": path.resolve(__dirname, "./src/"),
      "@/hooks": path.resolve(__dirname, "./src/hooks"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest-setup.js"],
  },
})
