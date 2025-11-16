import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), eslint({ exclude: ["/virtual:/**", "node_modules/**"] })],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/utils/test-setup/setupTests.ts",
  },
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
});
